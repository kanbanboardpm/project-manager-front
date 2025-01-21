import { Link, useLocation } from 'react-router-dom'
import logoText from '@/assets/images/logo-text.png'
import menuIcon from '@/assets/images/menu.png'
import { useSidebarStore } from '@/store/sidebarStore'
export default function Header() {
  const location = useLocation()
  const toggle = useSidebarStore((state) => state.toggle)
  const token = false

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

  if (location.pathname === '/login') {
    return (
      <nav className="px-4">
        <Link to="/">
          <img src={logoText} className="w-2/3 md:w-auto h-auto" />
        </Link>
      </nav>
    )
  }

  return (
    <nav className="px-4  flex items-center ">
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            toggle()
          }}
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
  )
}
