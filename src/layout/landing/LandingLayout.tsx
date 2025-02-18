import logoText from '@/assets/images/logo-text.png'
import useSessionStore from '@/store/useSessionStore'
import { Link, Outlet } from 'react-router-dom'

export default function LandingLayout() {
  const { access_token } = useSessionStore.getState()
  console.log(access_token)
  // const logout = useSessionStore((state) => state.logout)
  // const navigate = useNavigate()
  // const handleLogout = async () => {
  //   try {
  //     await postLogout()
  //     logout()
  //     navigate('/')
  //   } catch (error) {
  //     console.error('로그아웃 실패:', error)
  //     navigate('/')
  //   }
  // }
  return (
    <div className="min-h-screen">
      <nav className="bg-screenBg h-14 lg:h-[70px] pl-10 md:pl-12 lg:pl-[60px] content-center">
        <Link to="/">
          <img src={logoText} className="w-[100px] lg:w-[160px] h-auto" />
        </Link>

        {/* {!access_token ? (
          <Link to="/login">로그인</Link>
        ) : (
          <button onClick={handleLogout}>로그아웃</button>
        )} */}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
