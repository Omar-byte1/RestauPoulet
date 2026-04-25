import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AppShell } from './shell/AppShell'
import ContactPage from '../pages/Contact/ContactPage'
import HomePage from '../pages/Home/HomePage'
import MenuPage from '../pages/Menu/MenuPage'

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'menu', element: <MenuPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

