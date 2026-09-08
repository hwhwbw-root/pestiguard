import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { ADMIN_PLOT_SEEDS, riskStatus } from '../../lib/simulation'
import { useDemoState } from '../../context/DemoContext'
import StatusChip from '../../components/StatusChip'

function PlotRow({ plot }) {
  const navigate = useNavigate()
  const status = riskStatus(plot.risk, plot.thresholds)
  return (
    <button
      onClick={() => navigate(`/admin/ladang/${plot.id}`)}
      className="flex w-full items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 text-left shadow-sm dark:bg-neutral-900 dark:border-white/10"
    >
      <div className="flex-1">
        <div className="text-sm font-bold text-neutral-900 dark:text-neutral-50">{plot.name}</div>
        <div className="text-[11px] text-neutral-500">{plot.location}</div>
        <div className="mt-1.5 flex items-center gap-2">
          <StatusChip status={status} />
          <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">{plot.risk}% risiko</span>
        </div>
      </div>
      <ChevronRight size={18} className="text-neutral-300" />
    </button>
  )
}

export default function Overview() {
  const state = useDemoState()
  const plots = ADMIN_PLOT_SEEDS.map((s) => state.plots[s.id])

  return (
    <div className="mx-auto max-w-md px-4 pt-[calc(env(safe-area-inset-top)+1.25rem)]">
      <h1 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-50">Ikhtisar Semua Ladang</h1>
      <p className="text-xs text-neutral-500">{plots.length} ladang di bawah selian koperasi anda</p>

      <div className="mt-4 flex flex-col gap-3">
        {plots.map((p) => (
          <PlotRow key={p.id} plot={p} />
        ))}
      </div>
    </div>
  )
}
