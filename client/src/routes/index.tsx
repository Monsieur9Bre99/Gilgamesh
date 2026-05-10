import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Pages
import SignIn from '@/pages/auth/login'
import SignUp from '@/pages/auth/register'
import Dashboard from '@/pages/dashboard'
import CV from '@/pages/cv'
import Letters from '@/pages/letters'
import Notes from '@/pages/notes'
import Files from '@/pages/files'

// Guards
import RequireAuth from '@/guards/RequireAuth'

// Layout (vide pour l’instant)
function AppLayout() {
  return <div className="min-h-screen w-full">Layout</div>
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: '/cv',
        element: (
          <RequireAuth>
            <CV />
          </RequireAuth>
        ),
      },
      {
        path: '/letters',
        element: (
          <RequireAuth>
            <Letters />
          </RequireAuth>
        ),
      },
      {
        path: '/notes',
        element: (
          <RequireAuth>
            <Notes />
          </RequireAuth>
        ),
      },
      {
        path: '/files',
        element: (
          <RequireAuth>
            <Files />
          </RequireAuth>
        ),
      },
    ],
  },

  // Auth routes
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/register',
    element: <SignUp />,
  },
])

export default function AppRoutes() {
  return <RouterProvider router={router} />
}
