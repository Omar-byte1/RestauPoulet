import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, X, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const { items, openCart } = useCart();
  
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Flame className="w-8 h-8 text-orange-600 fill-orange-600" />
            <span className="text-2xl font-black text-slate-900 tracking-tighter">
              POULET<span className="text-orange-600">CHIC</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  location.pathname === link.path
                    ? 'text-orange-600'
                    : 'text-slate-600 hover:text-orange-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={openCart}
              className="relative p-2 text-slate-700 hover:text-orange-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={openCart}
              className="relative p-2 text-slate-700"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-700 p-2"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-orange-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-4 text-base font-bold text-slate-700 hover:text-orange-600 border-b border-slate-50 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;