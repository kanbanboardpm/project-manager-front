import { createBrowserRouter } from 'react-router-dom'

import Main from '@/components/Main'
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
        path: '/main',
        element: <Main />,
      },
    ],
  },
])

export default router
