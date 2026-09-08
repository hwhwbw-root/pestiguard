import { AlertTriangle, Droplets, ShieldCheck, Info, Bug } from 'lucide-react'
import { MAIN_PLOT_ID, usePlot } from '../../context/DemoContext'
import { formatClock, timeAgo } from '../../lib/format'

const ICONS = {
  alert: { Icon: AlertTriangle, tone: 'bg-red-100 text-red-700 dark:bg-red-950' },
  spray: { Icon: Droplets, tone: 'bg-sky-100 text-sky-700 dark:bg-sky-950' },
  resolved: { Icon: ShieldCheck, tone: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950' },
  detection: { Icon: Bug, tone: 'bg-amber-100 text-amber-700 dark:bg-amber-950' },
  system: { Icon: Info, tone: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800' },
}

export default function History() {
  const plot = usePlot(MAIN_PLOT_ID)

  return (
    <div className="mx-auto max-w-md px-4 pt-[calc(env(safe-area-inset-top)+1.25rem)]">
      <h1 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-50">Sejarah / Log</h1>
      <p className="text-xs text-neutral-500">Rekod amaran, pengesanan dan semburan</p>

      <div className="mt-4 flex flex-col gap-2">
        {plot.history.map((h) => {
          const meta = ICONS[h.type] ?? ICONS.system
          const { Icon, tone } = meta
          return (
            <div
              key={h.id}
              className="flex items-start gap-3 rounded-xl border border-black/5 bg-white p-3 shadow-sm dark:bg-neutral-900 dark:border-white/10"
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tone}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">{h.description}</div>
                <div className="text-[11px] text-neutral-400">
                  {formatClock(h.time)} · {timeAgo(h.time)}
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-1 text-[10px] font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                {h.outcome}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
