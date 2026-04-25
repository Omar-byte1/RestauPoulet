import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-4">Contactez-nous</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Une question ? Une réservation ? Ou simplement envie de nous dire à quel point notre poulet est bon ? On vous écoute !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Téléphone</h3>
              <p className="text-slate-600">+33 1 23 45 67 89</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Email</h3>
              <p className="text-slate-600">contact@pouletchic.fr</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Adresse</h3>
              <p className="text-slate-600">123 Avenue du Poulet, 75011 Paris</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Nom Complet</label>
                    <input 
                      type="text" 
                      placeholder="Jean Dupont"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email</label>
                    <input 
                      type="email" 
                      placeholder="jean@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Sujet</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all">
                    <option>Question générale</option>
                    <option>Réservation de groupe</option>
                    <option>Réclamation</option>
                    <option>Recrutement</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Message</label>
                  <textarea 
                    rows={6}
                    placeholder="Votre message ici..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center transition-all group">
                  Envoyer le message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
