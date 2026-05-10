import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = false

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
