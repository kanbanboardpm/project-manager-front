import { Link, Outlet, useLocation } from 'react-router-dom'
import logoText from '@/assets/images/logo-text.png'
import menuIcon from '@/assets/images/menu.png'
import { useSidebarStore } from '@/store/sidebarStore'
import Sidebar from './Sidebar'

export default function Header() {
  const location = useLocation()
  const { toggle } = useSidebarStore()
  const token = false

  // 사이드바가 필요한 메인 경로들
  const mainRoutes = ['/main', '/projects', '/inbox', '/profile']
  const isMainRoute = mainRoutes.some((route) =>
    location.pathname.startsWith(route),
  )

  // 랜딩 페이지
  if (location.pathname === '/') {
    return (
      <nav className="px-4 flex items-center justify-between">
        <Link to="/">
          <img src={logoText} className="w-2/3 md:w-auto h-auto" />
        </Link>

        {!token ? (
          <Link to="/login">로그인</Link>
        ) : (
          <Link to="/logout">로그아웃</Link>
        )}
      </nav>
    )
  }

  // 로그인, 회원가입 페이지
  if (['/login', '/signup'].includes(location.pathname)) {
    return (
      <nav className="px-4 flex">
        <Link to="/">
          <img src={logoText} className="w-2/3 md:w-auto h-auto" />
        </Link>
      </nav>
    )
  }

  // 메인 라우트 (대시보드, 프로젝트 등)
  if (isMainRoute) {
    return (
      <>
        <nav className="px-4 flex items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              className="p-2 hover:bg-white/60 rounded-lg transition-colors"
            >
              <img src={menuIcon} className="w-5 h-3.5" />
            </button>
            <div>
              <Link to="/">
                <img src={logoText} className="w-2/3 md:w-auto h-auto" />
              </Link>
            </div>
          </div>
        </nav>

        <div className="flex gap-3">
          <Sidebar />
          <main>
            <Outlet />
          </main>
        </div>
      </>
    )
  }
}
