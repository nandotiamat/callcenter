import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function PrivateOutlet() {
    const { user } = useContext(UserContext)
    return user ? <Outlet /> : <Navigate to="/login" />;
  }