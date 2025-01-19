import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout'
import MainLayout from '../layout/MainLayout'

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <div>HomePage</div>,
      },
      {
        path: '/login',
        element: <div>LoginPage</div>,
      },
      {
        path: '/signup',
        element: <div>SignupPage</div>,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/dashboard',
        element: <div>Dashboard Page</div>, // 회원 메인페이지
      },
    ],
  },
])

export default router
