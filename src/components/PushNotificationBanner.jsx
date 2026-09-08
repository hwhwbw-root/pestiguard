import { useEffect } from 'react'
import { Sprout, X } from 'lucide-react'
import { useDemoDispatch, useDemoState } from '../context/DemoContext'
import { formatClock } from '../lib/format'

const TONE_RING = {
  critical: 'ring-2 ring-red-400',
  resolved: 'ring-2 ring-emerald-400',
  info: 'ring-2 ring-sky-400',
}

function Banner({ notification, index }) {
  const dispatch = useDemoDispatch()

  useEffect(() => {
    const t = setTimeout(() => dispatch({ type: 'DISMISS_NOTIFICATION', id: notification.id }), 5000)
    return () => clearTimeout(t)
  }, [notification.id, dispatch])

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 rounded-2xl bg-white/95 p-3 shadow-lg backdrop-blur dark:bg-neutral-900/95 ${TONE_RING[notification.tone] ?? ''}`}
      style={{ transform: `translateY(${index * 4}px)` }}
      role="alert"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
        <Sprout size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-neutral-500">{notification.title}</span>
          <span className="shrink-0 text-[10px] text-neutral-400">{formatClock(notification.time)}</span>
        </div>
        <div className="text-sm font-medium text-neutral-900 dark:text-neutral-50">{notification.body}</div>
      </div>
      <button
        onClick={() => dispatch({ type: 'DISMISS_NOTIFICATION', id: notification.id })}
        className="shrink-0 rounded-full p-1 text-neutral-400"
        aria-label="Tutup notifikasi"
      >
        <X size={14} />
      </button>
    </div>
  )
}

export default function PushNotificationBanner() {
  const { notifications } = useDemoState()

  if (notifications.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[env(safe-area-inset-top)] z-[60] flex flex-col gap-2 px-3 pt-2">
      {notifications.map((n, i) => (
        <Banner key={n.id} notification={n} index={i} />
      ))}
    </div>
  )
}
