import React from "react"
import { Navigate, Outlet} from "react-router-dom"
import useAuth from "./hooks/useAuth"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext)
  const { user, isLoading } = useAuth()
  return ( !isLoading && user ? <Outlet /> : <Navigate to="/login" />)
}
