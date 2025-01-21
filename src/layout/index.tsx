import { Outlet } from 'react-router-dom'

import Header from './components/Header'

export default function RootLayout() {
  return (
    <div className="bg-screenBg min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
