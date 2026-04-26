import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  // Numéro par défaut (à changer plus tard par le client)
  const phoneNumber = "33600000000"; 
  const message = "Bonjour Miam Poulet ! Je voudrais commander : ";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl shadow-green-500/30 hover:bg-[#128C7E] transition-colors group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      aria-label="Commander sur WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      
      {/* Tooltip */}
      <div className="absolute left-full ml-4 px-3 py-1.5 bg-white text-slate-800 text-sm font-bold rounded-xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-slate-100">
        Commander via WhatsApp
        <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-l border-b border-slate-100"></div>
      </div>
    </motion.a>
  );
}
