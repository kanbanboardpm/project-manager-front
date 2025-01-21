import { createBrowserRouter } from 'react-router-dom'

import RootLayout from '@/layout'

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
        element: <div>LoginPage</div>,
      },
      {
        path: '/signup',
        element: <div>SignupPage</div>,
      },
      {
        path: '/dashboard',
        element: <div>Dashboard Page</div>,
      },
    ],
  },
])

export default router
