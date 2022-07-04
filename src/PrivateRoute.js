import React from "react"
import { Route, Navigate, Outlet} from "react-router-dom"

export default function PrivateRoute({ component: Component, ...rest }) {
  return ( false ? <Outlet /> : <Navigate to="/login" />)
}
