import { createBrowserRouter } from 'react-router-dom'

import CreateCardModal from '@/components/CreateCardModal'
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
            <CreateCardModal />
          </div>
        ),
      },
    ],
  },
])

export default router
