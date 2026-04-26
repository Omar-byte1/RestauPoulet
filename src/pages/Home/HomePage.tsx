import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Clock, Star, Leaf, ChefHat, Thermometer, ShoppingCart, Bike, UtensilsCrossed, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import logoImg from '../../assets/logo-miam-poulet.png';
import pommesImg from '../../assets/pommes-de-terre.png';
import heroVideo from '../../assets/hf_20260425_123354_9c4bbd51-2c0b-4a4e-95bf-3fd1284c2b9d.mp4';

const GALLERY_IMGS = [
  'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80',
  pommesImg,
  'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80',
];

const FEATURED = [
  {
    id: 'poulet-entier',
    title: 'Poulet Entier',
    price: 7.50,
    desc: 'Poulet entier rôti à la broche, doré et croustillant. Notre best-seller !',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1200&q=80',
    tag: 'Populaire',
  },
  {
    id: 'le-crousty',
    title: 'Le Crousty',
    price: 8.50,
    desc: 'Notre spécialité maison ! Poulet croustillant avec garniture généreuse.',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1200&q=80',
    tag: 'Spécialité',
  },
  {
    id: '5-cuisses',
    title: '5 Cuisses',
    price: 10.00,
    desc: 'Pack de 5 cuisses de poulet rôties — idéal pour la famille.',
    image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=1200&q=80',
    tag: 'Pack Famille',
  },
];

const TESTIMONIALS = [
  {
    name: 'Thomas D.',
    rating: 5,
    text: 'Le meilleur poulet rôti que j\'ai mangé ! Croustillant dehors, tendre dedans. Et le prix est imbattable.',
    location: 'Paris, 11e',
  },
  {
    name: 'Camille R.',
    rating: 5,
    text: 'Le Crousty est une tuerie ! Et les saucisses grillées sont incroyables. Je reviens chaque semaine !',
    location: 'Vincennes',
  },
  {
    name: 'Marc L.',
    rating: 5,
    text: 'Le riz thaï au poulet est un régal. Tout est frais et fait sur place, on sent la différence.',
    location: 'Paris, 12e',
  },
];

const FEATURES = [
  {
    icon: <Leaf className="w-6 h-6 text-orange-600" />,
    title: 'Produits Frais',
    desc: 'Poulet frais et ingrédients de qualité sélectionnés chaque jour.',
  },
  {
    icon: <ChefHat className="w-6 h-6 text-orange-600" />,
    title: 'Savoir-Faire Artisanal',
    desc: 'Rôti à la broche avec notre recette secrète pour un goût incomparable.',
  },
  {
    icon: <Thermometer className="w-6 h-6 text-orange-600" />,
    title: 'Cuisson Parfaite',
    desc: 'Cuit lentement pour garder toute la tendreté et le croustillant.',
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const Home = () => {
  useDocumentTitle('Miam Poulet — Le Meilleur Poulet Rôti');
  const { addItem } = useCart();

  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <video src={heroVideo} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/75 via-black/60 to-black/85" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.5 }} className="mb-6">
              <img src={logoImg} alt="Miam Poulet" className="w-28 h-28 object-contain rounded-full shadow-2xl border-4 border-orange-500/50" />
            </motion.div>
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="inline-block py-1 px-3 rounded-full bg-orange-600 text-white text-xs font-bold uppercase tracking-widest mb-6">
              Ouvert 7/7
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              Miam <span className="text-orange-500 italic">Poulet</span>
            </h1>
            <p className="text-xl text-slate-200 mb-10 leading-relaxed max-w-lg">
              Poulet rôti à la broche, saucisses grillées et accompagnements faits maison. Le goût authentique, tous les jours !
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/menu" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all transform hover:scale-105 shadow-lg shadow-orange-900/40">
                Découvrir le Menu <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all">
                Nous Trouver
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-8 text-white/60">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
            <span className="text-sm font-medium">4.9/5 sur Google</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium">Ouvert 7j/7</span>
          </div>
        </div>
      </section>

      {/* ── Promo Banner ─────────────────────── */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={fadeUp} className="bg-orange-600 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold text-lg text-center sm:text-left">
            🍗 <span className="font-black">Poulet Entier à 7,50€</span> — Saucisses, Riz, Pâtes et plus encore !
          </p>
          <Link to="/menu" className="shrink-0 bg-white text-orange-600 hover:bg-orange-50 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors">
            Voir le menu →
          </Link>
        </div>
      </motion.section>

      {/* ── Featured Items ────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="text-orange-600 font-bold uppercase tracking-widest mb-4">Nos Incontournables</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Les favoris de <br />nos clients</h3>
            </div>
            <Link to="/menu" className="mt-6 md:mt-0 text-orange-600 font-bold flex items-center hover:underline">
              Voir tout le menu <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {FEATURED.map((item) => (
              <motion.div key={item.id} variants={fadeUp} whileHover={{ y: -10 }} className="group bg-slate-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100">
                <div className="relative h-64 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 uppercase">{item.tag}</div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-bold text-slate-900">{item.title}</h4>
                    <span className="text-orange-600 font-black text-xl">{item.price.toFixed(2)}€</span>
                  </div>
                  <p className="text-slate-600 mb-8 leading-relaxed">{item.desc}</p>
                  <button
                    onClick={() => addItem({ id: item.id, name: item.title, price: item.price, quantity: 1, image: item.image })}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold group-hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" /> Ajouter au panier
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Us ────────────────────────────── */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-50" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl opacity-30" />
              <img src="https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=1200&q=80" alt="Chef préparant le poulet Miam Poulet" className="relative z-10 rounded-[40px] shadow-2xl w-full object-cover aspect-[4/3]" />
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-[220px]">
                <div className="flex items-center space-x-1 text-orange-600 mb-2">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />))}
                </div>
                <p className="text-xs text-slate-500 font-medium italic">"Le meilleur poulet que j'ai mangé !"</p>
                <p className="text-[10px] font-bold text-slate-900 mt-2">— Thomas D.</p>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="text-orange-600 font-bold uppercase tracking-widest mb-4">Pourquoi Miam Poulet ?</motion.h2>
              <motion.h3 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-10">La qualité sans <br />compromis.</motion.h3>
              <div className="space-y-8">
                {FEATURES.map((feature, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-start space-x-5">
                    <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-1">{feature.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-orange-600 font-bold uppercase tracking-widest mb-4">Notre Univers</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Chaque plat, une œuvre</h3>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMGS.map((src, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ scale: 1.03 }} className={`overflow-hidden rounded-2xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <img src={src} alt={`Plat Miam Poulet ${i + 1}`} className={`w-full object-cover transition-transform duration-500 hover:scale-110 ${i === 0 ? 'h-64 md:h-full md:min-h-[340px]' : 'h-48'}`} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────── */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-orange-500 font-bold uppercase tracking-widest mb-4">Témoignages</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">Ils nous font confiance</h3>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
                <Quote className="w-8 h-8 text-orange-500 mb-4 opacity-60" />
                <p className="text-slate-300 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-slate-500 text-sm">{t.location}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(t.rating)].map((_, j) => (<Star key={j} className="w-4 h-4 text-orange-500 fill-orange-500" />))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Delivery / Order ─────────────────── */}
      <section className="py-24 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-orange-600 font-bold uppercase tracking-widest mb-4">Commander</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">Livré chez vous <br />ou à emporter</h3>
            <p className="text-slate-600 max-w-xl mx-auto">Commandez en ligne ou passez directement au restaurant. Ouvert 7j/7 !</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { name: 'Uber Eats', icon: <Bike className="w-7 h-7" />, color: 'bg-black text-white hover:bg-gray-900' },
              { name: 'Deliveroo', icon: <Bike className="w-7 h-7" />, color: 'bg-teal-500 text-white hover:bg-teal-600' },
              { name: 'Sur place', icon: <UtensilsCrossed className="w-7 h-7" />, color: 'bg-orange-600 text-white hover:bg-orange-700', link: '/contact' },
            ].map((d, i) => (
              <motion.a key={i} href={d.link ?? '#'} variants={fadeUp} whileHover={{ y: -4 }} className={`${d.color} p-6 rounded-2xl flex flex-col items-center gap-3 font-bold text-lg transition-all shadow-md`}>
                {d.icon}
                {d.name}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
