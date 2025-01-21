import { Outlet } from 'react-router-dom'

import { useLocation } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

export default function RootLayout() {
  const location = useLocation()
  const isMainRoute = ['/dashboard'].includes(location.pathname)

  return (
    <div className="bg-screenBg min-h-screen overflow-x-hidden">
      <Header />
      {isMainRoute ? (
        <div className="flex gap-3">
          <Sidebar />
          <main>
            <Outlet />
          </main>
        </div>
      ) : (
        <main>
          <Outlet />
        </main>
      )}
    </div>
  )
}
