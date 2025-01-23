import { createBrowserRouter } from 'react-router-dom'

import Modal from '@/components/Modal'
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
        element: (
          <div>
            Main Page
            <Modal />
          </div>
        ),
      },
    ],
  },
])

export default router
