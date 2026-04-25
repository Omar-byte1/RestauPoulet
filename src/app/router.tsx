import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AppShell } from './shell/AppShell'
import ContactPage from '../pages/Contact/ContactPage'
import HomePage from '../pages/Home/HomePage'
import MenuPage from '../pages/Menu/MenuPage'
import OrderTrackingPage from '../pages/Client/OrderTrackingPage'
import AdminLogin from '../pages/Admin/AdminLogin'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import { useAuth } from '../hooks/useAuth'

// Protected Route Wrapper for Admin
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />
  return <>{children}</>
}

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'menu', element: <MenuPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'suivi', element: <OrderTrackingPage /> },
    ],
  },
  {
    path: '/admin',
    children: [
      { index: true, element: <Navigate to="/admin/login" replace /> },
      { path: 'login', element: <AdminLogin /> },
      { 
        path: 'dashboard', 
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ) 
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> }
])

