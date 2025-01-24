import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSidebarStore } from '@/store/sidebarStore'
import homeIcon from '@/assets/images/home.png'
import projectIcon from '@/assets/images/project.png'
import inboxIcon from '@/assets/images/inbox.png'
import profileIcon from '@/assets/images/profile.png'
import { Button } from '@/shared/ui/button'

export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebarStore()
  const navigate = useNavigate()
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 640
      setIsOpen(isDesktop)
    }
    // 초기 실행
    handleResize()
    // resize 이벤트 리스너 등록
    window.addEventListener('resize', handleResize)
    // cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsOpen])

  return (
    <aside
      className={`p-2 bg-gradient-to-b from-white to-screenBg rounded-tr-lg flex flex-col h-[calc(100vh-64px)] transition-all duration-300 ease-in-out text-sm font-pretendard
      ${isOpen ? 'w-64' : 'w-16 items-center'}`}
    >
      <div className="px-3 mb-2">
        <Button
          className={`transition-all duration-300 ${isOpen ? '' : 'w-7 h-7'}`}
          onClick={() => {
            navigate('/projects/create')
          }}
        >
          <div
            className={`flex items-center w-full justify-center overflow-hidden`}
          >
            <span
              className={`transition-all duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}
            >
              + 프로젝트
            </span>
            <span
              className={`transition-all duration-300 ${isOpen ? 'opacity-0 w-0' : 'opacity-100'}`}
            >
              +
            </span>
          </div>
        </Button>
      </div>

      {/* 메인 네비게이션 */}
      <nav className="flex-1">
        <ul className="space-y-1 px-3 border-b border-bodyBorder">
          <li>
            <Link
              to="/main"
              className={`flex items-center p-2 hover:bg-gray-100 rounded-lg 
              ${isOpen ? 'gap-3' : 'justify-center'} w-full`}
            >
              <img
                src={homeIcon}
                alt="홈"
                className="w-3.5 h-3.5 min-w-[14px]"
              />
              <span
                className={`transition-all duration-300 whitespace-nowrap overflow-hidden 
                ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
              >
                홈
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/inbox"
              className={`flex items-center p-2 hover:bg-gray-100 rounded-lg 
                ${isOpen ? 'gap-3' : 'justify-center'} w-full`}
            >
              <img
                src={inboxIcon}
                alt="수신함"
                className="w-3.5 h-3.5 min-w-[14px]"
              />
              <span
                className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
              >
                수신함
              </span>
            </Link>
          </li>
        </ul>

        {/* 프로젝트 리스트 */}
        <div
          className={`mt-1 px-3 transition-all duration-300 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
        >
          <div
            className={`flex items-center p-2  
                ${isOpen ? 'gap-3' : 'justify-center'} w-full`}
          >
            <img
              src={projectIcon}
              alt="프로젝트"
              className="w-3.5 h-3.5 min-w-[14px]"
            />
            <span
              className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
            >
              프로젝트
            </span>
          </div>
          {/* api 적용할때 반복문으로 수정 */}
          <div className="space-y-2">
            <Link
              to="/projects"
              className={`flex items-center  p-2 hover:bg-gray-100 rounded-lg cursor-pointer ${isOpen ? 'gap-2' : ''}`}
            >
              <div className="w-3.5 h-3.5 rounded-sm bg-red-500 min-w-[8px]"></div>
              <span
                className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
              >
                Project Manager
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 하단 프로필 영역 */}
      <div className={`p-4 border-t border-gray-200 `}>
        <div
          className={`flex items-center ${isOpen ? 'gap-3' : 'justify-center'}`}
        >
          <Link
            to="/profile"
            className={` ${isOpen ? 'w-14 h-14' : 'w-8 h-8'}`}
          >
            <img src={profileIcon} alt="프로필" />
          </Link>
          <div className={`${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
            <Link to="/profile" className="font-medium">
              강나연
            </Link>
            <div className={`text-xs text-gray-500 `}>yeonna18k@gmail.com</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
