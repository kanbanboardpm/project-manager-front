import { createBrowserRouter } from 'react-router-dom'

import ProjectMainSection from '@/components/projectMain/ProjectMainSection'
import RootLayout from '@/layout'
import LoginPage from '@/components/auth/Login'
import SignupPage from '@/components/auth/Signup'
import HomePage from '@/components/home/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <div>Landing Page</div>,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/main',
        element: <ProjectMainSection />,
      },
    ],
  },
])

export default router
