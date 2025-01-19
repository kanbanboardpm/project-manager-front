import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function AuthLayout() {
  return (
    <div className="flex flex-col bg-screenBg min-h-screen ">
      <Header />
      <Outlet />
    </div>
  )
}
