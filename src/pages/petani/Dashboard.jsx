import { Thermometer, Droplet, Sprout, Bug } from 'lucide-react'
import SensorCard from '../../components/SensorCard'
import RiskGauge from '../../components/RiskGauge'
import PowerStatus from '../../components/PowerStatus'
import { MAIN_PLOT_ID, useDemoDispatch, useDemoState, usePlot, usePlotStatus } from '../../context/DemoContext'

export default function Dashboard({ plotId = MAIN_PLOT_ID, adminView = false }) {
  const plot = usePlot(plotId)
  const status = usePlotStatus(plot)
  const dispatch = useDemoDispatch()
  const { farmName } = useDemoState()
  const displayName = adminView ? plot.name : farmName || plot.name

  return (
    <div className="mx-auto max-w-md px-4 pt-[calc(env(safe-area-inset-top)+1.25rem)]">
      <div className="flex items-start justify-between">
        <div>
          {adminView && <div className="text-xs font-medium text-sky-600">Melihat sebagai Koperasi</div>}
          <h1 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-50">{displayName}</h1>
          <p className="text-xs text-neutral-500">{plot.location}</p>
        </div>
        <PowerStatus />
      </div>

      <div className="mt-6 flex justify-center rounded-3xl border border-black/5 bg-white py-6 shadow-sm dark:bg-neutral-900 dark:border-white/10">
        <RiskGauge risk={plot.risk} status={status} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <SensorCard icon={Thermometer} label="Suhu" value={plot.temp.toFixed(1)} unit="°C" tint="amber" />
        <SensorCard icon={Droplet} label="Kelembapan Udara" value={plot.humidity.toFixed(0)} unit="%" tint="sky" />
        <SensorCard icon={Sprout} label="Kelembapan Tanah" value={plot.soil.toFixed(0)} unit="%" tint="emerald" />
      </div>

      {!adminView && (
        <button
          onClick={() => dispatch({ type: 'START_ATTACK', plotId })}
          disabled={!!plot.attack}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-red-300 bg-red-50 py-4 text-sm font-bold text-red-700 disabled:opacity-40 dark:bg-red-950/30 dark:border-red-900"
        >
          <span className="rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white">
            Mod Demo
          </span>
          <Bug size={16} />
          Simulasikan Serangan Ulat
        </button>
      )}

      <p className="mt-6 text-center text-[11px] text-neutral-400">
        Kemas kini terakhir: {new Date(plot.lastUpdated).toLocaleTimeString('ms-MY')}
      </p>
    </div>
  )
}
