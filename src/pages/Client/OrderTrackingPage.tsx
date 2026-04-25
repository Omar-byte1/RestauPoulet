import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Clock, CheckCircle, PackageOpen } from 'lucide-react';
import { useAdminStore } from '../../hooks/useAdminStore';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function OrderTrackingPage() {
  useDocumentTitle('Suivi Commande — PouletChic');
  const [orderCode, setOrderCode] = useState('');
  const [searched, setSearched] = useState(false);
  
  const { orders } = useAdminStore();
  const order = orders.find((o) => o.id.toUpperCase() === orderCode.toUpperCase());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderCode.trim()) return;
    setSearched(true);
  };

  const getStatusStep = (status: string) => {
    if (status === 'Nouvelle') return 1;
    if (status === 'En cours') return 2;
    if (status === 'Terminée') return 3;
    return 0;
  };

  const step = order ? getStatusStep(order.status) : 0;

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
            Suivi en temps réel
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Où est ma commande ?</h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            Entrez votre numéro de commande (ex: CMD-12345) pour suivre l'état d'avancement de votre repas.
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8"
        >
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={orderCode}
                onChange={(e) => {
                  setOrderCode(e.target.value);
                  setSearched(false);
                }}
                placeholder="N° de commande"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold outline-none focus:ring-2 focus:ring-orange-500 uppercase"
              />
            </div>
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-all active:scale-95"
            >
              Suivre
            </button>
          </form>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {searched && !order && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 bg-white rounded-3xl border border-slate-200"
            >
              <PackageOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Commande introuvable</h3>
              <p className="text-slate-500">Vérifiez le numéro saisi. Il ressemble généralement à CMD-12345.</p>
            </motion.div>
          )}

          {searched && order && (
            <motion.div
              key="found"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm overflow-hidden"
            >
              <div className="flex justify-between items-start mb-8 pb-8 border-b border-slate-100">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1">{order.id.toUpperCase()}</h3>
                  <p className="text-slate-500 font-medium">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-orange-600">{order.total.toFixed(2)}€</span>
                  <p className="text-sm text-slate-400 mt-1">{order.items.reduce((acc, i) => acc + i.quantity, 0)} article(s)</p>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="relative mb-8">
                <div className="absolute top-6 left-12 right-12 h-1 bg-slate-100 -z-10 rounded-full" />
                <div 
                  className="absolute top-6 left-12 h-1 bg-orange-500 -z-10 rounded-full transition-all duration-1000"
                  style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                />

                <div className="flex justify-between text-center relative z-10">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors duration-500 ${step >= 1 ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-white border-2 border-slate-200 text-slate-300'}`}>
                      <Package className="w-5 h-5" />
                    </div>
                    <span className={`text-sm font-bold ${step >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>Validée</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors duration-500 ${step >= 2 ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-white border-2 border-slate-200 text-slate-300'}`}>
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className={`text-sm font-bold ${step >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>En préparation</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors duration-500 ${step >= 3 ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-white border-2 border-slate-200 text-slate-300'}`}>
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className={`text-sm font-bold ${step >= 3 ? 'text-slate-900' : 'text-slate-400'}`}>Terminée</span>
                  </div>
                </div>
              </div>

              {/* Status Message */}
              <div className={`p-4 rounded-xl text-center font-medium ${
                step === 1 ? 'bg-blue-50 text-blue-800' : 
                step === 2 ? 'bg-orange-50 text-orange-800' : 
                'bg-green-50 text-green-800'
              }`}>
                {step === 1 && "Votre commande a été reçue et est en attente de préparation."}
                {step === 2 && "Ça chauffe ! Nos chefs préparent votre commande avec amour."}
                {step === 3 && (order.customerAddress === 'À emporter' 
                  ? "Votre commande est prête et vous attend au comptoir !" 
                  : "Votre commande est en route vers chez vous !")}
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
