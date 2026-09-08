import { useEffect } from 'react'
import { Droplets, ShieldCheck } from 'lucide-react'
import { MAIN_PLOT_ID, useDemoDispatch, usePlot } from '../../context/DemoContext'

const VALVE_META = {
  sedia: { label: 'Sedia', tone: 'text-emerald-600' },
  menyembur: { label: 'Menyembur', tone: 'text-sky-600' },
  tidak_aktif: { label: 'Tidak Aktif', tone: 'text-neutral-400' },
}

export default function ManualControl() {
  const plot = usePlot(MAIN_PLOT_ID)
  const dispatch = useDemoDispatch()
  const valve = VALVE_META[plot.valveStatus]
  const spraying = plot.valveStatus === 'menyembur'

  useEffect(() => {
    if (spraying && !plot.attack) {
      const t = setTimeout(() => dispatch({ type: 'VALVE_IDLE', plotId: MAIN_PLOT_ID }), 3000)
      return () => clearTimeout(t)
    }
  }, [spraying, plot.attack, dispatch])

  return (
    <div className="mx-auto max-w-md px-4 pt-[calc(env(safe-area-inset-top)+1.25rem)]">
      <h1 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-50">Kawalan Manual</h1>
      <p className="text-xs text-neutral-500">Anda sentiasa mempunyai kuasa penuh ke atas sistem ini.</p>

      <div className="mt-5 flex items-center justify-between rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:bg-neutral-900 dark:border-white/10">
        <div>
          <div className="text-sm font-bold text-neutral-900 dark:text-neutral-50">Sistem Semburan Automatik</div>
          <div className="text-xs text-neutral-500">AI akan bertindak balas sendiri apabila risiko kritikal</div>
        </div>
        <button
          onClick={() => dispatch({ type: 'TOGGLE_AUTO_SPRAY', plotId: MAIN_PLOT_ID })}
          className={`relative h-8 w-14 shrink-0 rounded-full transition ${
            plot.autoSprayEnabled ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-700'
          }`}
          aria-pressed={plot.autoSprayEnabled}
        >
          <span
            className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
              plot.autoSprayEnabled ? 'left-7' : 'left-1'
            }`}
          />
        </button>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:bg-neutral-900 dark:border-white/10">
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full border-4 ${
            spraying ? 'border-sky-400 bg-sky-50 dark:bg-sky-950' : 'border-neutral-200 bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700'
          }`}
        >
          <Droplets size={40} className={spraying ? 'animate-bounce text-sky-500' : 'text-neutral-400'} />
        </div>
        <div className={`text-sm font-bold ${valve.tone}`}>Status Injap: {valve.label}</div>

        <button
          onClick={() => dispatch({ type: 'MANUAL_SPRAY', plotId: MAIN_PLOT_ID })}
          disabled={spraying}
          className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-sm disabled:opacity-40"
        >
          Sembur Sekarang
        </button>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
        <ShieldCheck size={16} className="mt-0.5 shrink-0" />
        Sistem hanya membantu — keputusan akhir untuk menyembur atau tidak sentiasa di tangan anda.
      </div>
    </div>
  )
}
