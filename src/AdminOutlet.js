import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function AdminOutlet() {
    const { user } = useContext(UserContext)
    console.log(user)
    return user.is_admin === 1 ? <Outlet /> : <Navigate to="/" />;
  }