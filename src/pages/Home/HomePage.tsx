import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Clock, Star, Leaf, ChefHat, Thermometer, ShoppingCart, Bike, UtensilsCrossed, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import heroVideo from '../../assets/hf_20260425_123354_9c4bbd51-2c0b-4a4e-95bf-3fd1284c2b9d.mp4';

const GALLERY_IMGS = [
  'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
  'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
];

const FEATURED = [
  {
    id: '1',
    title: 'Le Bucket XL',
    price: 24.90,
    desc: '12 pièces croustillantes avec 3 sauces maison au choix.',
    image: 'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?auto=format&fit=crop&w=1200&q=80',
    tag: 'Populaire',
  },
  {
    id: '2',
    title: 'Poulet Braisé Maison',
    price: 18.50,
    desc: 'Mariné 24h dans nos épices secrètes et cuit au feu de bois.',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80',
    tag: "Chef's Choice",
  },
  {
    id: '3',
    title: 'Le Chic Burger',
    price: 14.90,
    desc: 'Filet de poulet pané, cheddar fondu, oignons caramélisés.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
    tag: 'Nouveau',
  },
];

const TESTIMONIALS = [
  {
    name: 'Thomas D.',
    rating: 5,
    text: 'Le meilleur poulet que j\'ai mangé de ma vie. La panure est incroyable, croustillante à l\'extérieur et tendre à l\'intérieur !',
    location: 'Paris, 11e',
  },
  {
    name: 'Camille R.',
    rating: 5,
    text: 'Service rapide, accueil chaleureux et surtout un poulet braisé à tomber par terre. Je reviens chaque semaine !',
    location: 'Vincennes',
  },
  {
    name: 'Marc L.',
    rating: 5,
    text: 'Les frites maison sont une révélation. Tout est fait sur place, ça se sent vraiment dans le goût.',
    location: 'Paris, 12e',
  },
];

const FEATURES = [
  {
    icon: <Leaf className="w-6 h-6 text-orange-600" />,
    title: 'Produits Locaux',
    desc: 'Nous travaillons exclusivement avec des éleveurs français garantissant un poulet élevé en plein air.',
  },
  {
    icon: <ChefHat className="w-6 h-6 text-orange-600" />,
    title: 'Recette Secrète',
    desc: 'Notre mélange de 13 épices est préparé chaque matin dans nos cuisines pour une saveur inégalée.',
  },
  {
    icon: <Thermometer className="w-6 h-6 text-orange-600" />,
    title: 'Cuisson Maîtrisée',
    desc: 'À basse température puis saisi pour garder toute la tendreté et le croustillant.',
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
  useDocumentTitle('PouletChic — Le Meilleur Poulet de France');
  const { addItem } = useCart();

  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        {/* Dark gradient overlay so text stays legible */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/75 via-black/60 to-black/85" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block py-1 px-3 rounded-full bg-orange-600 text-white text-xs font-bold uppercase tracking-widest mb-6"
            >
              Nouveau à Paris
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              Le Meilleur Poulet <br />
              <span className="text-orange-500 italic">Croustillant</span> de France
            </h1>
            <p className="text-xl text-slate-200 mb-10 leading-relaxed max-w-lg">
              Braisé, frit ou mariné : une recette secrète transmise de génération en génération pour un goût unique et inoubliable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/menu"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all transform hover:scale-105 shadow-lg shadow-orange-900/40"
              >
                Découvrir le Menu
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all"
              >
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

      {/* ── Promo Banner ─────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="bg-orange-600 py-5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold text-lg text-center sm:text-left">
            🎉 <span className="font-black">Menu du Jour à 12€</span> — Boisson + Plat + Dessert · Lun–Ven 11h30–15h00
          </p>
          <Link
            to="/menu"
            className="shrink-0 bg-white text-orange-600 hover:bg-orange-50 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors"
          >
            En profiter →
          </Link>
        </div>
      </motion.section>

      {/* ── Featured Items ────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16"
          >
            <div>
              <h2 className="text-orange-600 font-bold uppercase tracking-widest mb-4">Nos Incontournables</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Les favoris de <br />nos clients
              </h3>
            </div>
            <Link to="/menu" className="mt-6 md:mt-0 text-orange-600 font-bold flex items-center hover:underline">
              Voir tout le menu <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {FEATURED.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                whileHover={{ y: -10 }}
                className="group bg-slate-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 uppercase">
                    {item.tag}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-bold text-slate-900">{item.title}</h4>
                    <span className="text-orange-600 font-black text-xl">{item.price.toFixed(2)}€</span>
                  </div>
                  <p className="text-slate-600 mb-8 leading-relaxed">{item.desc}</p>
                  <button
                    onClick={() =>
                      addItem({ id: item.id, name: item.title, price: item.price, quantity: 1, image: item.image })
                    }
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold group-hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Ajouter au panier
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Us ───────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-50" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl opacity-30" />
              <img
                src="https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=1200&q=80"
                alt="Chef préparant le poulet PouletChic"
                className="relative z-10 rounded-[40px] shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-[220px]">
                <div className="flex items-center space-x-1 text-orange-600 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 font-medium italic">
                  "Le meilleur poulet que j'ai mangé de ma vie !"
                </p>
                <p className="text-[10px] font-bold text-slate-900 mt-2">— Thomas D.</p>
              </div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
            >
              <motion.h2 variants={fadeUp} className="text-orange-600 font-bold uppercase tracking-widest mb-4">
                Pourquoi PouletChic ?
              </motion.h2>
              <motion.h3 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-10">
                La qualité sans <br />compromis.
              </motion.h3>

              <div className="space-y-8">
                {FEATURES.map((feature, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-start space-x-5">
                    <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
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

      {/* ── Gallery ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-orange-600 font-bold uppercase tracking-widest mb-4">Notre Univers</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Chaque plat, une œuvre
            </h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {GALLERY_IMGS.map((src, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className={`overflow-hidden rounded-2xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <img
                  src={src}
                  alt={`Plat PouletChic ${i + 1}`}
                  className={`w-full object-cover transition-transform duration-500 hover:scale-110 ${i === 0 ? 'h-64 md:h-full md:min-h-[340px]' : 'h-48'}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-orange-500 font-bold uppercase tracking-widest mb-4">Témoignages</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Ils nous font confiance
            </h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors"
              >
                <Quote className="w-8 h-8 text-orange-500 mb-4 opacity-60" />
                <p className="text-slate-300 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-slate-500 text-sm">{t.location}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-orange-500 fill-orange-500" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Delivery / Order ─────────────────────────────── */}
      <section className="py-24 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-orange-600 font-bold uppercase tracking-widest mb-4">Commander</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
              Livré chez vous <br />ou à emporter
            </h3>
            <p className="text-slate-600 max-w-xl mx-auto">
              Commandez en ligne via nos plateformes partenaires ou passez directement au restaurant.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { name: 'Uber Eats', icon: <Bike className="w-7 h-7" />, color: 'bg-black text-white hover:bg-gray-900' },
              { name: 'Deliveroo', icon: <Bike className="w-7 h-7" />, color: 'bg-teal-500 text-white hover:bg-teal-600' },
              { name: 'Sur place', icon: <UtensilsCrossed className="w-7 h-7" />, color: 'bg-orange-600 text-white hover:bg-orange-700', link: '/contact' },
            ].map((d, i) => (
              <motion.a
                key={i}
                href={d.link ?? '#'}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className={`${d.color} p-6 rounded-2xl flex flex-col items-center gap-3 font-bold text-lg transition-all shadow-md`}
              >
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
