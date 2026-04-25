import { Outlet } from 'react-router-dom'

import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import CartDrawer from '../../components/cart/CartDrawer'

export function AppShell() {
  return (
    <div className="app-shell">
      <Navbar />
      <CartDrawer />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

