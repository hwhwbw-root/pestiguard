import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DemoProvider } from './context/DemoContext'
import Entry from './pages/Entry'
import PetaniLayout from './pages/petani/PetaniLayout'
import Dashboard from './pages/petani/Dashboard'
import Detection from './pages/petani/Detection'
import ManualControl from './pages/petani/ManualControl'
import History from './pages/petani/History'
import Settings from './pages/petani/Settings'
import AdminLayout from './pages/admin/AdminLayout'
import Overview from './pages/admin/Overview'
import PlotDetailRoute from './pages/admin/PlotDetailRoute'
import ImpactStats from './pages/admin/ImpactStats'

export default function App() {
  return (
    <DemoProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Entry />} />

          <Route path="/petani" element={<PetaniLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="pengesanan" element={<Detection />} />
            <Route path="kawalan" element={<ManualControl />} />
            <Route path="sejarah" element={<History />} />
            <Route path="tetapan" element={<Settings />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Overview />} />
            <Route path="ladang/:plotId" element={<PlotDetailRoute />} />
            <Route path="impak" element={<ImpactStats />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </DemoProvider>
  )
}
