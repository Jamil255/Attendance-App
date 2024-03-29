import React from 'react'
import { Navigate, Outlet, json } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import StudentLayout from '../../components/StdLayout'

const AdminProtectedRoute = () => {
  return localStorage.getItem('uid') ? (
    JSON.parse(localStorage.getItem('user')).type == 'admin' ? (
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    ) : (
      <Navigate to={'/portal'} />
    )
  ) : (
    <Navigate to={'/'} />
  )
}
const StdProtectedRoute = () => {
  return localStorage.getItem('uid') ? (
    JSON.parse(localStorage.getItem('user')).type == 'std' ? (
      <StudentLayout>
        <Outlet />
      </StudentLayout>
    ) : (
      <Navigate to={'/dashboard'} />
    )
  ) : (
    <Navigate to={'/'} />
  )
}

export default AdminProtectedRoute
export { StdProtectedRoute }
