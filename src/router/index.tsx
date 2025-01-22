import { createBrowserRouter } from 'react-router-dom'

import RootLayout from '@/layout'
import LoginPage from '@/pages/Auth/Login'
import SignupPage from '@/pages/Auth/Signup'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <div>HomePage</div>,
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
        path: '/main',
        element: <div>Main Page</div>,
      },
    ],
  },
])

export default router
