import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Camera, SlidersHorizontal, History, Settings } from 'lucide-react'

const ITEMS = [
  { to: '/petani', label: 'Papan Pemuka', icon: LayoutDashboard, end: true },
  { to: '/petani/pengesanan', label: 'Kamera', icon: Camera },
  { to: '/petani/kawalan', label: 'Kawalan', icon: SlidersHorizontal },
  { to: '/petani/sejarah', label: 'Sejarah', icon: History },
  { to: '/petani/tetapan', label: 'Tetapan', icon: Settings },
]

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-black/5 bg-white/95 backdrop-blur dark:bg-neutral-950/95 dark:border-white/10 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-md justify-between px-2">
        {ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium ${
                isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-400'
              }`
            }
          >
            <Icon size={20} strokeWidth={2.2} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
