import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Bug, Droplets, ShieldCheck, X } from 'lucide-react'
import { useDemoDispatch } from '../context/DemoContext'

export default function CriticalAlertOverlay({ plot }) {
  const dispatch = useDemoDispatch()
  const navigate = useNavigate()
  const { attack } = plot
  if (!attack || attack.phase === 'ramping') return null

  const isResponding = attack.phase === 'responding'
  const isResolved = attack.phase === 'resolved'
  const awaitingManual = attack.phase === 'critical' && !plot.autoSprayEnabled

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-red-950 text-white">
      <div className="flex items-center justify-between px-5 pt-[calc(env(safe-area-inset-top)+1.25rem)]">
        <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide">
          Amaran Kritikal
        </span>
        {isResolved && (
          <button
            onClick={() => dispatch({ type: 'DISMISS_ATTACK', plotId: plot.id })}
            className="rounded-full bg-white/10 p-2"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
        <div className={`flex h-24 w-24 items-center justify-center rounded-full bg-red-600/30 ${!isResolved ? 'animate-pulse' : ''}`}>
          {isResolved ? <ShieldCheck size={44} /> : <AlertTriangle size={44} />}
        </div>

        <div>
          <div className="text-6xl font-extrabold tabular-nums">{plot.risk}%</div>
          <div className="mt-1 text-sm uppercase tracking-wide text-red-200">Skor Risiko</div>
        </div>

        <div className="w-full max-w-xs rounded-2xl bg-white/10 p-4 text-left">
          <div className="flex items-center gap-2 text-sm font-semibold text-red-100">
            <Bug size={16} /> Diagnosis AI
          </div>
          <div className="mt-1 text-lg font-bold">{attack.diagnosis.name}</div>
          <div className="text-xs italic text-red-200">{attack.diagnosis.species}</div>
          <div className="text-xs text-red-200">{attack.diagnosis.kind}</div>
        </div>

        <div className="w-full max-w-xs rounded-2xl border border-white/15 p-4 text-sm">
          {isResolved ? (
            <div>
              <div className="flex items-center justify-center gap-2 font-semibold text-emerald-300">
                <ShieldCheck size={16} /> Ancaman Dikawal
              </div>
              <div className="mt-1 text-emerald-200">Jimat Racun ~{attack.pesticideSaved}% berbanding semburan menyeluruh</div>
            </div>
          ) : isResponding ? (
            <div className="flex items-center justify-center gap-2 font-semibold text-sky-300">
              <Droplets size={16} className="animate-bounce" /> Injap Dibuka — Sedang Menyembur…
            </div>
          ) : awaitingManual ? (
            <div className="text-amber-300">
              Mod automatik dimatikan. Sila pergi ke Kawalan Manual untuk menyembur.
            </div>
          ) : (
            <div className="font-semibold text-red-100">Mod Tindak Balas Automatik Diaktifkan…</div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 px-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
        {awaitingManual && (
          <button
            onClick={() => {
              dispatch({ type: 'MANUAL_SPRAY', plotId: plot.id })
              navigate('/petani/kawalan')
            }}
            className="rounded-xl bg-white py-3 text-sm font-bold text-red-800"
          >
            Ke Kawalan Manual
          </button>
        )}
        {isResolved && (
          <button
            onClick={() => dispatch({ type: 'DISMISS_ATTACK', plotId: plot.id })}
            className="rounded-xl bg-white py-3 text-sm font-bold text-red-800"
          >
            Kembali ke Papan Pemuka
          </button>
        )}
      </div>
    </div>
  )
}
