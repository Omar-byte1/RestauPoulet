import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X, ChevronLeft, MapPin, Store } from 'lucide-react'

import { useCart } from '../../hooks/useCart'
import { useAdminStore } from '../../hooks/useAdminStore'
import { toast } from 'sonner'

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, total, clearCart } = useCart()
  const { addOrder } = useAdminStore()
  
  const [isCheckout, setIsCheckout] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    deliveryMode: 'delivery' as 'delivery' | 'takeaway',
    address: ''
  })
  const [phoneError, setPhoneError] = useState(false)

  // Reset checkout state when closing cart
  const handleClose = () => {
    closeCart();
    setTimeout(() => {
      setIsCheckout(false);
      setFormData({ firstName: '', lastName: '', phone: '', deliveryMode: 'delivery', address: '' });
      setPhoneError(false);
    }, 300);
  }

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    // Validate phone (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setPhoneError(true);
      return;
    }
    
    const customerFullName = `${formData.firstName} ${formData.lastName}`.trim();
    const finalAddress = formData.deliveryMode === 'takeaway' ? 'À emporter' : formData.address;

    const orderId = `CMD-${Math.floor(10000 + Math.random() * 90000)}`;

    addOrder({
      id: orderId,
      customerName: customerFullName,
      customerAddress: finalAddress,
      customerPhone: formData.phone,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: total
    });

    toast.success('Commande validée !', {
      description: `Votre numéro de suivi est : ${orderId}`
    });
    
    clearCart();
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              {isCheckout ? (
                <div className="flex items-center space-x-3">
                  <button onClick={() => setIsCheckout(false)} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6 text-slate-500" />
                  </button>
                  <h2 className="text-xl font-black text-slate-900">Paiement</h2>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="w-6 h-6 text-orange-600" />
                  <h2 className="text-xl font-black text-slate-900">Votre Panier</h2>
                  <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
                    {items.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </div>
              )}
              <button onClick={handleClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              {isCheckout ? (
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase">Prénom</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase">Nom</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase">Téléphone</label>
                    <input 
                      required 
                      type="tel" 
                      placeholder="0612345678"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({...formData, phone: e.target.value});
                        setPhoneError(false);
                      }}
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-3 outline-none transition-all ${phoneError ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-slate-200 focus:ring-2 focus:ring-orange-500'}`} 
                    />
                    {phoneError && <p className="text-red-500 text-xs font-medium mt-1">Le numéro doit contenir exactement 10 chiffres.</p>}
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <label className="text-xs font-bold text-slate-700 uppercase">Mode de retrait</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, deliveryMode: 'delivery'})}
                        className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all ${formData.deliveryMode === 'delivery' ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-slate-100 bg-white text-slate-500'}`}
                      >
                        <MapPin className="w-5 h-5 mr-2" />
                        <span className="font-bold text-sm">Livraison</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, deliveryMode: 'takeaway'})}
                        className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all ${formData.deliveryMode === 'takeaway' ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-slate-100 bg-white text-slate-500'}`}
                      >
                        <Store className="w-5 h-5 mr-2" />
                        <span className="font-bold text-sm">À emporter</span>
                      </button>
                    </div>
                  </div>

                  {formData.deliveryMode === 'delivery' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase">Adresse de livraison</label>
                      <textarea 
                        required 
                        rows={3}
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 resize-none" 
                      />
                    </motion.div>
                  )}
                </form>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-slate-300" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">Votre panier est vide</p>
                    <p className="text-slate-500 text-sm">Il est temps de goûter à notre poulet !</p>
                  </div>
                  <button onClick={closeCart} className="text-orange-600 font-bold hover:underline">
                    Retourner au menu
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex space-x-4 group">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-slate-900 text-sm leading-tight">{item.name}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-orange-600 font-bold text-sm mb-3">{item.price.toFixed(2)}€</p>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-100">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-white rounded-md transition-colors"
                            >
                              <Minus className="w-3 h-3 text-slate-600" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-white rounded-md transition-colors"
                            >
                              <Plus className="w-3 h-3 text-slate-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-500 font-medium">Total</span>
                  <span className="text-2xl font-black text-slate-900">{total.toFixed(2)}€</span>
                </div>
                {isCheckout ? (
                  <button 
                    type="submit"
                    form="checkout-form"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-200 transition-all transform active:scale-[0.98]"
                  >
                    Valider la commande ({total.toFixed(2)}€)
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsCheckout(true)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-200 transition-all transform active:scale-[0.98]"
                  >
                    Commander maintenant
                  </button>
                )}
                <p className="text-center text-xs text-slate-400 mt-4">Livraison gratuite à partir de 30€</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

