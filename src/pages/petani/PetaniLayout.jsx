import { Outlet } from 'react-router-dom'
import BottomNav from '../../components/BottomNav'
import CriticalAlertOverlay from '../../components/CriticalAlertOverlay'
import { MAIN_PLOT_ID, usePlot } from '../../context/DemoContext'

export default function PetaniLayout() {
  const plot = usePlot(MAIN_PLOT_ID)

  return (
    <div className="min-h-dvh bg-neutral-50 pb-24 dark:bg-neutral-950">
      <Outlet />
      <BottomNav />
      {plot.attack && <CriticalAlertOverlay plot={plot} />}
    </div>
  )
}
