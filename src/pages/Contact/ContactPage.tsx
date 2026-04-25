import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Clock, CheckCircle } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAdminStore } from '../../hooks/useAdminStore';

const HOURS = [
  { days: 'Lundi – Jeudi', time: '11h30 – 22h30' },
  { days: 'Vendredi – Samedi', time: '11h30 – 23h30' },
  { days: 'Dimanche', time: '12h00 – 22h00' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export function ContactPage() {
  useDocumentTitle('Contactez-nous — PouletChic');

  const [form, setForm] = useState({ name: '', email: '', subject: 'Question générale', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { addFeedback } = useAdminStore();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Le nom est requis.';
    if (!form.email.trim()) e.email = "L'email est requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide.';
    if (!form.message.trim()) e.message = 'Le message est requis.';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    
    // Add to admin store
    addFeedback({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });

    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
            On vous répond sous 24h
          </span>
          <h1 className="text-5xl font-black text-slate-900 mb-4">Contactez-nous</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Une question ? Une réservation ? Ou simplement envie de nous dire à quel point notre poulet est bon ? On vous écoute !
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info + Hours Cards */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="lg:col-span-1 space-y-5"
          >
            {/* Phone */}
            <motion.div variants={fadeUp} className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-5">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Téléphone</h3>
                <a href="tel:+33123456789" className="text-slate-600 hover:text-orange-600 transition-colors font-medium">
                  +33 1 23 45 67 89
                </a>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp} className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-5">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Email</h3>
                <a href="mailto:contact@pouletchic.fr" className="text-slate-600 hover:text-orange-600 transition-colors font-medium">
                  contact@pouletchic.fr
                </a>
              </div>
            </motion.div>

            {/* Address */}
            <motion.div variants={fadeUp} className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-5">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Adresse</h3>
                <p className="text-slate-600 font-medium">123 Avenue du Poulet<br />75011 Paris</p>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div variants={fadeUp} className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Horaires</h3>
              </div>
              <ul className="space-y-3">
                {HOURS.map((h, i) => (
                  <li key={i} className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">{h.days}</span>
                    <span className="font-bold text-slate-900">{h.time}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16 gap-4"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Message envoyé !</h3>
                  <p className="text-slate-500 max-w-sm">
                    Merci de nous avoir contactés. Nous vous répondrons dans les 24h.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: 'Question générale', message: '' }); }}
                    className="mt-4 text-orange-600 font-bold hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                        Nom Complet
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jean Dupont"
                        className={`w-full bg-slate-50 border rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all ${errors.name ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs font-medium">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jean@example.com"
                        className={`w-full bg-slate-50 border rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                      />
                      {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                      Sujet
                    </label>
                    <select
                      id="contact-subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    >
                      <option>Question générale</option>
                      <option>Réservation de groupe</option>
                      <option>Réclamation</option>
                      <option>Recrutement</option>
                      <option>Partenariat</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Votre message ici..."
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none ${errors.message ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                    />
                    {errors.message && <p className="text-red-500 text-xs font-medium">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center transition-all group active:scale-[0.98]"
                  >
                    Envoyer le message
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 rounded-3xl overflow-hidden border border-slate-200 shadow-sm"
            >
              <iframe
                title="PouletChic sur la carte"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9915668890726!2d2.376!3d48.857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzI1LjIiTiAywrAyMic1My42IkU!5e0!3m2!1sfr!2sfr!4v1700000000000"
                width="100%"
                height="260"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
