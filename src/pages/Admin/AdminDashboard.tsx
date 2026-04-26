import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, MessageSquare, ShoppingBag, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAdminStore } from '../../hooks/useAdminStore';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function AdminDashboard() {
  useDocumentTitle('Tableau de Bord — Miam Poulet');
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { feedbacks, orders, markFeedbackRead, updateOrderStatus, deleteOrder, deleteFeedback } = useAdminStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'feedbacks'>('orders');

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const pendingOrders = orders.filter((o) => o.status !== 'Terminée').length;
  const unreadFeedbacks = feedbacks.filter((f) => !f.isRead).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-950 text-white flex flex-col shrink-0">
        <div className="p-6">
          <div className="text-2xl font-black tracking-tighter mb-8">
            POULET<span className="text-orange-500">ADMIN</span>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-colors ${
                activeTab === 'orders' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center">
                <ShoppingBag className="w-5 h-5 mr-3" />
                Commandes
              </div>
              {pendingOrders > 0 && (
                <span className="bg-white text-orange-600 text-xs px-2 py-0.5 rounded-full">{pendingOrders}</span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('feedbacks')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-colors ${
                activeTab === 'feedbacks' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-3" />
                Messages
              </div>
              {unreadFeedbacks > 0 && (
                <span className="bg-white text-orange-600 text-xs px-2 py-0.5 rounded-full">{unreadFeedbacks}</span>
              )}
            </button>
          </nav>
        </div>
        <div className="mt-auto p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl font-bold transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-auto h-screen">
        <h2 className="text-3xl font-black text-slate-900 mb-8">
          {activeTab === 'orders' ? 'Gestion des Commandes' : 'Messages Clients'}
        </h2>

        <AnimatePresence mode="wait">
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
                  <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">Aucune commande pour le moment.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-slate-100 gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-lg font-black text-slate-900">Commande #{order.id.toUpperCase()}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === 'Nouvelle' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'En cours' ? 'bg-orange-100 text-orange-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-slate-500 text-sm">
                          {new Date(order.date).toLocaleString('fr-FR')} — <strong>{order.customerName}</strong>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {order.status === 'Nouvelle' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'En cours')}
                            className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-4 py-2 rounded-xl text-sm font-bold flex items-center transition-colors"
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            Préparer
                          </button>
                        )}
                        {(order.status === 'Nouvelle' || order.status === 'En cours') && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'Terminée')}
                            className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-xl text-sm font-bold flex items-center transition-colors"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Terminer
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
                              deleteOrder(order.id);
                            }
                          }}
                          className="bg-red-50 text-red-500 hover:bg-red-100 px-3 py-2 rounded-xl text-sm font-bold flex items-center transition-colors ml-2"
                          title="Supprimer la commande"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Articles</h4>
                        <ul className="space-y-3">
                          {order.items.map((item) => (
                            <li key={item.id} className="flex justify-between items-center text-sm">
                              <span className="font-medium text-slate-700">
                                <span className="text-slate-400 mr-2">{item.quantity}x</span>
                                {item.name}
                              </span>
                              <span className="text-slate-500 font-medium">{(item.price * item.quantity).toFixed(2)}€</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                          <span className="font-bold text-slate-900">Total</span>
                          <span className="text-xl font-black text-orange-600">{order.total.toFixed(2)}€</span>
                        </div>
                      </div>
                      <div className="w-full md:w-64 shrink-0 bg-slate-50 p-4 rounded-2xl border border-slate-100 h-fit">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Livraison</h4>
                        <p className="text-sm text-slate-700 font-medium mb-1">{order.customerName}</p>
                        <p className="text-sm text-slate-500 mb-2">{order.customerAddress}</p>
                        <p className="text-sm text-slate-500 flex items-center">
                          📞 {order.customerPhone}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'feedbacks' && (
            <motion.div
              key="feedbacks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {feedbacks.length === 0 ? (
                <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-slate-200">
                  <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">Aucun message pour le moment.</p>
                </div>
              ) : (
                feedbacks.map((fb) => (
                  <div key={fb.id} className={`bg-white p-6 rounded-3xl border shadow-sm flex flex-col ${!fb.isRead ? 'border-orange-200' : 'border-slate-200'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-slate-900">{fb.subject}</h3>
                        <p className="text-xs text-slate-500 mt-1">{new Date(fb.date).toLocaleDateString('fr-FR')} par {fb.name}</p>
                        <a href={`mailto:${fb.email}`} className="text-xs text-orange-600 hover:underline">{fb.email}</a>
                      </div>
                      {!fb.isRead && (
                        <span className="w-3 h-3 bg-orange-500 rounded-full shrink-0"></span>
                      )}
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl text-sm text-slate-700 mb-4 flex-1">
                      {fb.message}
                    </div>
                    <div className="flex gap-2">
                      {!fb.isRead && (
                        <button
                          onClick={() => markFeedbackRead(fb.id)}
                          className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-colors"
                        >
                          Marquer comme lu
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
                            deleteFeedback(fb.id);
                          }
                        }}
                        className="py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-bold transition-colors"
                        title="Supprimer le message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
