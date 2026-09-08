import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Dashboard from '../petani/Dashboard'

export default function PlotDetailRoute() {
  const { plotId } = useParams()
  const navigate = useNavigate()

  return (
    <div>
      <div className="mx-auto max-w-md px-4 pt-[calc(env(safe-area-inset-top)+0.75rem)]">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-1 text-xs font-medium text-sky-600"
        >
          <ArrowLeft size={14} /> Kembali ke Ikhtisar
        </button>
      </div>
      <Dashboard plotId={plotId} adminView />
    </div>
  )
}
