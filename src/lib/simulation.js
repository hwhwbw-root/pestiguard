// Pure, client-side simulation helpers. No backend, no persistence beyond the tab.

export const clamp = (val, min, max) => Math.min(max, Math.max(min, val))

const rand = (min, max) => min + Math.random() * (max - min)

/** Bounded random walk: nudge a value by a small delta, keep it inside [min, max]. */
export function driftValue(value, { min, max, step }) {
  const delta = rand(-step, step)
  return clamp(value + delta, min, max)
}

export function calcRisk({ temp, humidity, soil }) {
  const noise = rand(-3, 3)
  const raw = (humidity - 60) * 1.0 + (temp - 28) * 2.2 + (soil - 55) * 0.15 + noise
  return clamp(Math.round(raw), 0, 100)
}

export function riskStatus(risk, thresholds = { waspada: 40, kritikal: 75 }) {
  if (risk >= thresholds.kritikal) return 'kritikal'
  if (risk >= thresholds.waspada) return 'waspada'
  return 'selamat'
}

export const STATUS_META = {
  selamat: { label: 'Selamat', color: 'emerald' },
  waspada: { label: 'Waspada', color: 'amber' },
  kritikal: { label: 'Kritikal', color: 'red' },
}

export const PEST_DIAGNOSES = [
  { species: 'Spodoptera litura', name: 'Ulat Grayak', kind: 'Serangga Perosak' },
  { species: 'Bemisia tabaci', name: 'Lalat Putih', kind: 'Serangga Perosak' },
  { species: 'Colletotrichum spp.', name: 'Antraknos (Penyakit Kulapuk)', kind: 'Penyakit Kulat' },
]

let uid = 1
export function nextId() {
  return `id-${uid++}-${Date.now().toString(36)}`
}

export function makeBaselineSensors() {
  return {
    temp: rand(28, 34),
    humidity: rand(70, 92),
    soil: rand(40, 70),
  }
}

export function makeSeedDetections(now = Date.now()) {
  return [
    {
      id: nextId(),
      time: now - 1000 * 60 * 60 * 6,
      finding: 'Tiada ancaman dikesan',
      confidence: 97,
      benign: true,
    },
    {
      id: nextId(),
      time: now - 1000 * 60 * 60 * 20,
      finding: 'Tiada ancaman dikesan',
      confidence: 95,
      benign: true,
    },
    {
      id: nextId(),
      time: now - 1000 * 60 * 60 * 30,
      finding: 'Tiada ancaman dikesan',
      confidence: 98,
      benign: true,
    },
  ]
}

export function makeSeedHistory(now = Date.now()) {
  return [
    {
      id: nextId(),
      time: now - 1000 * 60 * 60 * 6,
      type: 'detection',
      description: 'Imbasan AI dijalankan — tiada ancaman dikesan',
      outcome: 'Selamat',
    },
    {
      id: nextId(),
      time: now - 1000 * 60 * 60 * 24,
      type: 'system',
      description: 'Nod sensor dalam talian, kuasa solar aktif',
      outcome: 'Normal',
    },
  ]
}

export function createPlot({ id, name, location, critical = false }) {
  const now = Date.now()
  const sensors = makeBaselineSensors()
  const risk = critical ? Math.round(rand(82, 94)) : calcRisk(sensors)
  return {
    id,
    name,
    location,
    ...sensors,
    risk,
    autoSprayEnabled: true,
    valveStatus: 'sedia', // 'sedia' | 'menyembur' | 'tidak_aktif'
    thresholds: { waspada: 40, kritikal: 75 },
    attack: critical
      ? {
          phase: 'critical',
          diagnosis: PEST_DIAGNOSES[0],
          startedAt: now,
          pesticideSaved: null,
        }
      : null,
    detections: makeSeedDetections(now),
    history: makeSeedHistory(now),
    lastUpdated: now,
  }
}

export const ADMIN_PLOT_SEEDS = [
  { id: 'plot-samad', name: 'Ladang Pak Samad', location: 'Cameron Highlands, Pahang' },
  { id: 'plot-aminah', name: 'Ladang Mak Aminah', location: 'Kundasang, Sabah' },
  { id: 'plot-razak', name: 'Ladang Pak Razak', location: 'Kluang, Johor' },
  { id: 'plot-siti', name: 'Ladang Kak Siti', location: 'Jeli, Kelantan' },
  { id: 'plot-koperasi1', name: 'Plot Koperasi Sinar Tani', location: 'Tanah Rata, Pahang', critical: true },
]
