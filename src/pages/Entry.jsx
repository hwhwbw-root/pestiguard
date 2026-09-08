import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sprout, User, Users2 } from 'lucide-react'
import { useDemoDispatch } from '../context/DemoContext'

const DEMO_NAMES = ['Ladang Pak Samad', 'Ladang Mak Aminah', 'Ladang Kak Siti']

export default function Entry() {
  const dispatch = useDemoDispatch()
  const navigate = useNavigate()
  const [farmName, setFarmName] = useState('')

  function choose(role) {
    dispatch({ type: 'SET_ROLE', role })
    if (farmName) dispatch({ type: 'SET_FARM_NAME', name: farmName })
    navigate(role === 'petani' ? '/petani' : '/admin')
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-white px-6 py-10 dark:from-neutral-950 dark:to-neutral-950">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
          <Sprout size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-100">PestiGuard</h1>
        <p className="max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
          Menjaga ladang anda seperti amanah — kesan awal, tindak balas pantas, racun yang lebih sedikit.
        </p>
      </div>

      <div className="mt-10 w-full max-w-sm">
        <label className="mb-2 block text-xs font-medium text-neutral-500">
          Nama ladang (pilihan, hiasan sahaja)
        </label>
        <input
          list="demo-farm-names"
          value={farmName}
          onChange={(e) => setFarmName(e.target.value)}
          placeholder="cth. Ladang Pak Samad"
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-emerald-500 dark:bg-neutral-900 dark:border-neutral-700"
        />
        <datalist id="demo-farm-names">
          {DEMO_NAMES.map((n) => (
            <option key={n} value={n} />
          ))}
        </datalist>
      </div>

      <div className="mt-6 flex w-full max-w-sm flex-col gap-4">
        <button
          onClick={() => choose('petani')}
          className="flex items-center gap-4 rounded-2xl border border-emerald-200 bg-white p-5 text-left shadow-sm transition active:scale-[0.98] dark:bg-neutral-900 dark:border-neutral-700"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            <User size={24} />
          </div>
          <div>
            <div className="font-bold text-neutral-900 dark:text-neutral-50">Saya Petani</div>
            <div className="text-xs text-neutral-500">Pantau ladang saya sendiri</div>
          </div>
        </button>

        <button
          onClick={() => choose('admin')}
          className="flex items-center gap-4 rounded-2xl border border-sky-200 bg-white p-5 text-left shadow-sm transition active:scale-[0.98] dark:bg-neutral-900 dark:border-neutral-700"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400">
            <Users2 size={24} />
          </div>
          <div>
            <div className="font-bold text-neutral-900 dark:text-neutral-50">Saya Koperasi / Admin</div>
            <div className="text-xs text-neutral-500">Selia beberapa ladang sekali gus</div>
          </div>
        </button>
      </div>

      <p className="mt-10 max-w-xs text-center text-[11px] text-neutral-400">
        Demo interaktif — semua data sensor dan AI adalah simulasi untuk tujuan pembentangan.
      </p>
    </div>
  )
}
