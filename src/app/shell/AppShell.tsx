import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AnimatePresence, motion } from 'framer-motion'

import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import CartDrawer from '../../components/cart/CartDrawer'
import FloatingWhatsApp from '../../components/layout/FloatingWhatsApp'

export function AppShell() {
  const location = useLocation()

  return (
    <div className="app-shell">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            borderRadius: '14px',
            background: '#fff',
            color: '#0f172a',
            border: '1px solid #fed7aa',
          },
        }}
      />
      <Navbar />
      <CartDrawer />
      <main className="app-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  )
}

