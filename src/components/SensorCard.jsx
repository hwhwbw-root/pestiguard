const TINTS = {
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  sky: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
}

export default function SensorCard({ icon: Icon, label, value, unit, tint = 'emerald' }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:bg-neutral-900 dark:border-white/10">
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${TINTS[tint]}`}>
        <Icon size={18} strokeWidth={2.2} />
      </div>
      <div className="mt-1 text-2xl font-bold tabular-nums text-neutral-900 dark:text-neutral-50">
        {value}
        <span className="ml-0.5 text-sm font-medium text-neutral-400">{unit}</span>
      </div>
      <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{label}</div>
    </div>
  )
}
