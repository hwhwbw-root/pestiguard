import { Camera, CheckCircle2, Bug } from 'lucide-react'
import { MAIN_PLOT_ID, usePlot } from '../../context/DemoContext'
import { formatClock, timeAgo } from '../../lib/format'

export default function Detection() {
  const plot = usePlot(MAIN_PLOT_ID)

  return (
    <div className="mx-auto max-w-md px-4 pt-[calc(env(safe-area-inset-top)+1.25rem)]">
      <h1 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-50">Pengesanan / Kamera</h1>
      <p className="text-xs text-neutral-500">Nod kamera medan memantau ladang setiap masa</p>

      <div className="mt-4 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:bg-neutral-900 dark:border-white/10">
        <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-emerald-800 to-emerald-950 text-emerald-100">
          <Camera size={40} className="opacity-60" />
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[10px] font-semibold">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> LANGSUNG
          </span>
          <span className="absolute bottom-3 right-3 rounded-full bg-black/40 px-2 py-1 text-[10px]">
            Imej Terkini · {formatClock(Date.now())}
          </span>
        </div>
      </div>

      <h2 className="mt-6 mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Log Pengesanan AI</h2>
      <div className="flex flex-col gap-2">
        {plot.detections.map((d) => (
          <div
            key={d.id}
            className="flex items-center gap-3 rounded-xl border border-black/5 bg-white p-3 shadow-sm dark:bg-neutral-900 dark:border-white/10"
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                d.benign ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950' : 'bg-red-100 text-red-700 dark:bg-red-950'
              }`}
            >
              {d.benign ? <CheckCircle2 size={20} /> : <Bug size={20} />}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">{d.finding}</div>
              {d.species && <div className="text-[11px] italic text-neutral-500">{d.species}</div>}
              <div className="text-[11px] text-neutral-400">{timeAgo(d.time)} · Keyakinan {d.confidence}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
