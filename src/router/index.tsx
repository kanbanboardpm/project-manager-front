import { createBrowserRouter } from 'react-router-dom'

import ProjectMainSection from '@/components/projectMain/ProjectMainSection'
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
        element: <ProjectMainSection />,
      },
    ],
  },
])

export default router
