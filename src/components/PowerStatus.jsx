import { Sun, BatteryFull } from 'lucide-react'

export default function PowerStatus() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400">
      <Sun size={14} />
      <BatteryFull size={14} />
      <span>Bekalan Kuasa Aktif</span>
    </div>
  )
}
