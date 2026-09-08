import { useState } from 'react'
import { Bell } from 'lucide-react'
import { MAIN_PLOT_ID, useDemoDispatch, usePlot } from '../../context/DemoContext'

export default function Settings() {
  const plot = usePlot(MAIN_PLOT_ID)
  const dispatch = useDemoDispatch()
  const [notif, setNotif] = useState(true)
  const [waspada, setWaspada] = useState(plot.thresholds.waspada)
  const [kritikal, setKritikal] = useState(plot.thresholds.kritikal)

  function apply(next) {
    dispatch({ type: 'SET_THRESHOLDS', plotId: MAIN_PLOT_ID, thresholds: next })
  }

  return (
    <div className="mx-auto max-w-md px-4 pt-[calc(env(safe-area-inset-top)+1.25rem)]">
      <h1 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-50">Tetapan</h1>
      <p className="text-xs text-neutral-500">Sesuaikan ambang amaran mengikut ladang anda</p>

      <div className="mt-5 rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:bg-neutral-900 dark:border-white/10">
        <label className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Ambang Waspada — {waspada}%
        </label>
        <input
          type="range"
          min={20}
          max={70}
          value={waspada}
          onChange={(e) => {
            const v = Number(e.target.value)
            setWaspada(v)
            apply({ waspada: v, kritikal })
          }}
          className="mt-2 w-full accent-amber-500"
        />

        <label className="mt-4 block text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Ambang Kritikal — {kritikal}%
        </label>
        <input
          type="range"
          min={60}
          max={95}
          value={kritikal}
          onChange={(e) => {
            const v = Number(e.target.value)
            setKritikal(v)
            apply({ waspada, kritikal: v })
          }}
          className="mt-2 w-full accent-red-500"
        />
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:bg-neutral-900 dark:border-white/10">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          <Bell size={16} /> Notifikasi Tolak
        </div>
        <button
          onClick={() => setNotif((v) => !v)}
          className={`relative h-8 w-14 shrink-0 rounded-full transition ${notif ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-700'}`}
          aria-pressed={notif}
        >
          <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${notif ? 'left-7' : 'left-1'}`} />
        </button>
      </div>

      <p className="mt-6 text-center text-[11px] text-neutral-400">PestiGuard · Demo Pembentangan v1.0</p>
    </div>
  )
}
