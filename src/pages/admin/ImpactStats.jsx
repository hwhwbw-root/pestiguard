import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Droplets, AlertTriangle, Sprout, Timer } from 'lucide-react'
import { ADMIN_PLOT_SEEDS } from '../../lib/simulation'
import { useDemoState } from '../../context/DemoContext'

const TREND = [
  { bulan: 'Apr', jimat: 52 },
  { bulan: 'Mei', jimat: 58 },
  { bulan: 'Jun', jimat: 61 },
  { bulan: 'Jul', jimat: 66 },
  { bulan: 'Ogo', jimat: 69 },
  { bulan: 'Sep', jimat: 71 },
]

function StatCard({ icon: Icon, label, value, tint }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:bg-neutral-900 dark:border-white/10">
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tint}`}>
        <Icon size={18} />
      </div>
      <div className="mt-1 text-2xl font-extrabold text-neutral-900 dark:text-neutral-50">{value}</div>
      <div className="text-xs font-medium text-neutral-500">{label}</div>
    </div>
  )
}

export default function ImpactStats() {
  const state = useDemoState()
  const plots = ADMIN_PLOT_SEEDS.map((s) => state.plots[s.id])
  const alertsThisMonth = useMemo(
    () => plots.reduce((sum, p) => sum + p.history.filter((h) => h.type === 'alert').length + 6, 0),
    [plots],
  )

  return (
    <div className="mx-auto max-w-md px-4 pt-[calc(env(safe-area-inset-top)+1.25rem)]">
      <h1 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-50">Statistik Impak</h1>
      <p className="text-xs text-neutral-500">Ringkasan prestasi merentas semua ladang</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <StatCard icon={Droplets} label="Racun Dijimatkan" value="71%" tint="bg-emerald-100 text-emerald-700 dark:bg-emerald-950" />
        <StatCard icon={AlertTriangle} label="Amaran Bulan Ini" value={alertsThisMonth} tint="bg-amber-100 text-amber-700 dark:bg-amber-950" />
        <StatCard icon={Sprout} label="Ladang Aktif" value={plots.length} tint="bg-sky-100 text-sky-700 dark:bg-sky-950" />
        <StatCard icon={Timer} label="Purata Masa Tindak Balas" value="8 saat" tint="bg-violet-100 text-violet-700 dark:bg-violet-950" />
      </div>

      <div className="mt-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:bg-neutral-900 dark:border-white/10">
        <div className="mb-2 text-sm font-bold text-neutral-800 dark:text-neutral-200">Trend Jimat Racun (%)</div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={TREND} margin={{ top: 5, right: 8, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200 dark:stroke-neutral-800" />
              <XAxis dataKey="bulan" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="jimat" stroke="#059669" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
