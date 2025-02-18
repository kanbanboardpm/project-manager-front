import logoText from '@/assets/images/logo-text.png'
import ModalController from '@/components/modal/ModalController'
import { Icon } from '@/shared/ui/Icon'
import { useSidebarStore } from '@/store/sidebarStore'
import { Link, Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function MainLayout() {
  const { toggle } = useSidebarStore()
  return (
    <div className="bg-screenBg flex flex-col">
      <nav className="h-14 lg:h-[70px] pl-6 content-center">
        <div className="flex items-center gap-1 lg:gap-3">
          <button
            onClick={toggle}
            className="p-2 hover:bg-white/60 rounded-lg transition-colors"
          >
            <Icon icon="Menu" size={20} />
          </button>
          <div>
            <Link to="/">
              <img src={logoText} className="w-[100px] lg:w-[160px] h-auto" />
            </Link>
          </div>
        </div>
      </nav>
      <div className="flex gap-3 h-[calc(100vh-56px)] lg:h-[calc(100vh-70px)]">
        <Sidebar />
        <main className="flex grow overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      <ModalController />
    </div>
  )
}
