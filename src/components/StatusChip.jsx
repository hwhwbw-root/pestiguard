const STYLES = {
  selamat: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  waspada: 'bg-amber-100 text-amber-800 border-amber-300',
  kritikal: 'bg-red-100 text-red-800 border-red-300 animate-pulse',
}

const LABELS = {
  selamat: '● Selamat',
  waspada: '▲ Waspada',
  kritikal: '⛔ Kritikal',
}

export default function StatusChip({ status, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${STYLES[status]} ${className}`}
    >
      {LABELS[status]}
    </span>
  )
}
