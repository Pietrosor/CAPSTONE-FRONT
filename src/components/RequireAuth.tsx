import { useAuth } from "../context/AuthContext"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function RequireAuth({ roles }: { roles?: string[] }) {
  const { user } = useAuth()
  const loc = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: loc }} replace />
  }
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}
