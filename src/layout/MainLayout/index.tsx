import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function MainLayout() {
  return (
    <div className="bg-screenBg min-h-screen overflow-x-hidden">
      <Header />
      <div className="flex gap-3">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
