import StatusChip from './StatusChip'

const COLORS = {
  selamat: '#059669',
  waspada: '#d97706',
  kritikal: '#dc2626',
}

export default function RiskGauge({ risk, status, size = 176 }) {
  const radius = size / 2 - 12
  const circumference = Math.PI * radius // half-circle arc
  const progress = Math.min(1, Math.max(0, risk / 100))
  const dash = circumference * progress

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 16} viewBox={`0 0 ${size} ${size / 2 + 16}`}>
        <path
          d={`M 12 ${size / 2 + 4} A ${radius} ${radius} 0 0 1 ${size - 12} ${size / 2 + 4}`}
          fill="none"
          stroke="currentColor"
          className="text-neutral-200 dark:text-neutral-800"
          strokeWidth={14}
          strokeLinecap="round"
        />
        <path
          d={`M 12 ${size / 2 + 4} A ${radius} ${radius} 0 0 1 ${size - 12} ${size / 2 + 4}`}
          fill="none"
          stroke={COLORS[status]}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          style={{ transition: 'stroke-dasharray 0.8s ease, stroke 0.5s ease' }}
        />
      </svg>
      <div className="-mt-14 flex flex-col items-center">
        <div className="text-4xl font-extrabold tabular-nums text-neutral-900 dark:text-neutral-50">{risk}%</div>
        <div className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">Skor Risiko</div>
        <StatusChip status={status} className="mt-2" />
      </div>
    </div>
  )
}
