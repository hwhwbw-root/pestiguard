import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import {
  ADMIN_PLOT_SEEDS,
  PEST_DIAGNOSES,
  calcRisk,
  clamp,
  createPlot,
  driftValue,
  nextId,
  riskStatus,
} from '../lib/simulation'

const DemoStateContext = createContext(null)
const DemoDispatchContext = createContext(null)

const MAIN_PLOT_ID = 'petani-main'

function initState() {
  const plots = {}
  plots[MAIN_PLOT_ID] = createPlot({ id: MAIN_PLOT_ID, name: 'Ladang Saya', location: 'Cameron Highlands, Pahang' })
  for (const seed of ADMIN_PLOT_SEEDS) {
    plots[seed.id] = createPlot(seed)
  }
  return {
    role: null, // 'petani' | 'admin'
    farmName: '',
    plots,
  }
}

function pushHistory(plot, entry) {
  const history = [{ id: nextId(), time: Date.now(), ...entry }, ...plot.history].slice(0, 60)
  return { ...plot, history }
}

function pushDetection(plot, entry) {
  const detections = [{ id: nextId(), time: Date.now(), ...entry }, ...plot.detections].slice(0, 30)
  return { ...plot, detections }
}

function driftPlot(plot) {
  if (plot.attack) return plot // frozen sensors during an attack sequence, driven by the attack ticker instead
  const temp = driftValue(plot.temp, { min: 26, max: 36, step: 0.6 })
  const humidity = driftValue(plot.humidity, { min: 60, max: 96, step: 1.5 })
  const soil = driftValue(plot.soil, { min: 30, max: 78, step: 1.2 })
  const risk = calcRisk({ temp, humidity, soil })
  return { ...plot, temp, humidity, soil, risk, lastUpdated: Date.now() }
}

function tickAttack(plot) {
  const attack = plot.attack
  if (!attack) return plot

  if (attack.phase === 'ramping') {
    const target = 92
    const risk = Math.round(clamp(plot.risk + rampStep(target - plot.risk), 0, 100))
    const temp = clamp(plot.temp + 0.4, 26, 38)
    const humidity = clamp(plot.humidity + 0.6, 60, 98)
    if (risk >= 88) {
      let next = { ...plot, risk, temp, humidity, attack: { ...attack, phase: 'critical', criticalAt: Date.now() } }
      next = pushDetection(next, {
        finding: `${attack.diagnosis.name} dikesan`,
        species: attack.diagnosis.species,
        confidence: Math.round(88 + Math.random() * 10),
        benign: false,
      })
      next = pushHistory(next, {
        type: 'alert',
        description: `Amaran kritikal — ${attack.diagnosis.name} (${attack.diagnosis.species}) dikesan`,
        outcome: `Risiko ${risk}%`,
      })
      return next
    }
    return { ...plot, risk, temp, humidity, attack }
  }

  if (attack.phase === 'critical') {
    // Wait for auto-response (if enabled) to kick in a couple seconds after reaching critical.
    const sinceCritical = Date.now() - (attack.criticalAt ?? attack.startedAt)
    if (plot.autoSprayEnabled && sinceCritical > 2200) {
      let next = { ...plot, valveStatus: 'menyembur', attack: { ...attack, phase: 'responding', respondingAt: Date.now(), auto: true } }
      next = pushHistory(next, {
        type: 'spray',
        description: 'Mod Tindak Balas Automatik diaktifkan — injap dibuka',
        outcome: 'Menyembur',
      })
      return next
    }
    return plot
  }

  if (attack.phase === 'responding') {
    const risk = Math.round(clamp(plot.risk - rampStep(plot.risk - 18), 0, 100))
    if (risk <= 22) {
      const saved = Math.round(65 + Math.random() * 10)
      let next = {
        ...plot,
        risk,
        valveStatus: 'sedia',
        attack: { ...attack, phase: 'resolved', pesticideSaved: saved },
      }
      next = pushHistory(next, {
        type: 'resolved',
        description: 'Ancaman dikawal — semburan sasaran selesai',
        outcome: `Jimat racun ~${saved}%`,
      })
      return next
    }
    return { ...plot, risk }
  }

  // 'resolved' — hold until the reviewer dismisses the alert.
  return plot
}

function rampStep(gap) {
  const dir = Math.sign(gap) || 1
  const mag = Math.min(Math.abs(gap), 14)
  return dir * Math.max(3, mag * 0.35)
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.role }
    case 'SET_FARM_NAME':
      return { ...state, farmName: action.name }
    case 'TICK': {
      const plots = {}
      for (const [id, plot] of Object.entries(state.plots)) {
        plots[id] = plot.attack ? tickAttack(plot) : driftPlot(plot)
      }
      return { ...state, plots }
    }
    case 'START_ATTACK': {
      const plot = state.plots[action.plotId]
      if (!plot || plot.attack) return state
      const diagnosis = PEST_DIAGNOSES[Math.floor(Math.random() * PEST_DIAGNOSES.length)]
      const nextPlot = {
        ...plot,
        attack: { phase: 'ramping', diagnosis, startedAt: Date.now() },
      }
      return { ...state, plots: { ...state.plots, [action.plotId]: nextPlot } }
    }
    case 'DISMISS_ATTACK': {
      const plot = state.plots[action.plotId]
      if (!plot) return state
      return { ...state, plots: { ...state.plots, [action.plotId]: { ...plot, attack: null } } }
    }
    case 'TOGGLE_AUTO_SPRAY': {
      const plot = state.plots[action.plotId]
      if (!plot) return state
      let next = { ...plot, autoSprayEnabled: !plot.autoSprayEnabled }
      next = pushHistory(next, {
        type: 'system',
        description: `Sistem semburan automatik ${next.autoSprayEnabled ? 'diaktifkan' : 'dimatikan'}`,
        outcome: next.autoSprayEnabled ? 'Auto ON' : 'Auto OFF',
      })
      return { ...state, plots: { ...state.plots, [action.plotId]: next } }
    }
    case 'MANUAL_SPRAY': {
      const plot = state.plots[action.plotId]
      if (!plot) return state
      let next = { ...plot, valveStatus: 'menyembur' }
      if (next.attack && next.attack.phase === 'critical') {
        next = { ...next, attack: { ...next.attack, phase: 'responding', respondingAt: Date.now(), auto: false } }
      }
      next = pushHistory(next, {
        type: 'spray',
        description: 'Semburan manual dijalankan oleh petani',
        outcome: 'Menyembur',
      })
      return { ...state, plots: { ...state.plots, [action.plotId]: next } }
    }
    case 'VALVE_IDLE': {
      const plot = state.plots[action.plotId]
      if (!plot || plot.attack) return state
      return { ...state, plots: { ...state.plots, [action.plotId]: { ...plot, valveStatus: 'sedia' } } }
    }
    case 'SET_THRESHOLDS': {
      const plot = state.plots[action.plotId]
      if (!plot) return state
      return { ...state, plots: { ...state.plots, [action.plotId]: { ...plot, thresholds: action.thresholds } } }
    }
    default:
      return state
  }
}

export function DemoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, initState)

  useEffect(() => {
    const interval = setInterval(() => dispatch({ type: 'TICK' }), 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <DemoStateContext.Provider value={state}>
      <DemoDispatchContext.Provider value={dispatch}>{children}</DemoDispatchContext.Provider>
    </DemoStateContext.Provider>
  )
}

export function useDemoState() {
  const ctx = useContext(DemoStateContext)
  if (!ctx) throw new Error('useDemoState must be used within DemoProvider')
  return ctx
}

export function useDemoDispatch() {
  const ctx = useContext(DemoDispatchContext)
  if (!ctx) throw new Error('useDemoDispatch must be used within DemoProvider')
  return ctx
}

export function usePlot(plotId) {
  const state = useDemoState()
  return state.plots[plotId]
}

export function usePlotStatus(plot) {
  return useMemo(() => riskStatus(plot.risk, plot.thresholds), [plot.risk, plot.thresholds])
}

export { MAIN_PLOT_ID }
