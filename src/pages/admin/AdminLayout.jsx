import { NavLink, Outlet } from 'react-router-dom'
import { LayoutGrid, BarChart3 } from 'lucide-react'

export default function AdminLayout() {
  return (
    <div className="min-h-dvh bg-neutral-50 pb-24 dark:bg-neutral-950">
      <Outlet />
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-black/5 bg-white/95 backdrop-blur dark:bg-neutral-950/95 dark:border-white/10 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-md justify-center gap-10 px-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium ${
                isActive ? 'text-sky-600 dark:text-sky-400' : 'text-neutral-400'
              }`
            }
          >
            <LayoutGrid size={20} strokeWidth={2.2} />
            Ikhtisar Ladang
          </NavLink>
          <NavLink
            to="/admin/impak"
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium ${
                isActive ? 'text-sky-600 dark:text-sky-400' : 'text-neutral-400'
              }`
            }
          >
            <BarChart3 size={20} strokeWidth={2.2} />
            Statistik Impak
          </NavLink>
        </div>
      </nav>
    </div>
  )
}
