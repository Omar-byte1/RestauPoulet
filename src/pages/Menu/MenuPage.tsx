import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ShoppingCart, Search, Drumstick, Beef, UtensilsCrossed, Sparkles, ChefHat } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import logoImg from '../../assets/logo-miam-poulet.png';
import pommesImg from '../../assets/pommes-de-terre.png';

const categories = [
  { id: 'all', name: 'Tout le Menu', icon: <UtensilsCrossed className="w-4 h-4" /> },
  { id: 'poulet', name: 'Poulet', icon: <Drumstick className="w-4 h-4" /> },
  { id: 'saucisse', name: 'Saucisses', icon: <Beef className="w-4 h-4" /> },
  { id: 'accompagnement', name: 'Accompagnements', icon: <ChefHat className="w-4 h-4" /> },
  { id: 'specialite', name: 'Spécialités', icon: <Sparkles className="w-4 h-4" /> },
];

const menuItems = [
  {
    id: 1, name: 'Poulet Entier', category: 'poulet', price: 7.50,
    desc: 'Un poulet entier rôti à la broche, doré et croustillant.',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    id: 2, name: 'Demi Poulet', category: 'poulet', price: 4.00,
    desc: 'Un demi poulet rôti, parfait pour un repas individuel.',
    image: 'https://images.unsplash.com/photo-1594221708779-94832f4320d1?auto=format&fit=crop&w=800&q=80',
    popular: false,
  },
  {
    id: 3, name: '1 Cuisse', category: 'poulet', price: 2.50,
    desc: 'Cuisse de poulet rôtie, tendre et juteuse.',
    image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=800&q=80',
    popular: false,
  },
  {
    id: 4, name: '5 Cuisses', category: 'poulet', price: 10.00,
    desc: 'Pack de 5 cuisses de poulet rôties — idéal pour la famille.',
    image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    id: 5, name: '1 Pilon', category: 'poulet', price: 1.00,
    desc: 'Pilon de poulet rôti, croustillant et savoureux.',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
    popular: false,
  },
  {
    id: 6, name: '3 Pilons', category: 'poulet', price: 2.50,
    desc: 'Lot de 3 pilons de poulet bien dorés.',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
    popular: false,
  },
  {
    id: 7, name: '1 Saucisse', category: 'saucisse', price: 1.00,
    desc: 'Saucisse grillée artisanale, bien assaisonnée.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    popular: false,
  },
  {
    id: 8, name: '6 Saucisses', category: 'saucisse', price: 5.00,
    desc: 'Pack de 6 saucisses grillées — parfait pour partager.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    id: 9, name: 'Riz Blanc', category: 'accompagnement', price: 3.50,
    desc: 'Riz blanc nature, léger et parfumé.',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=800&q=80',
    popular: false,
  },
  {
    id: 10, name: 'Riz Thaï au Poulet', category: 'accompagnement', price: 3.50,
    desc: 'Riz thaï sauté avec du poulet et des épices.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    id: 11, name: 'Pâtes au Poulet', category: 'accompagnement', price: 3.50,
    desc: 'Pâtes fraîches accompagnées de morceaux de poulet.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
    popular: false,
  },
  {
    id: 12, name: 'Pommes de Terre au Four', category: 'accompagnement', price: 3.50,
    desc: 'Pommes de terre cuites au four, dorées et fondantes.',
    image: pommesImg,
    popular: false,
  },
  {
    id: 13, name: 'Le Crousty', category: 'specialite', price: 8.50,
    desc: 'Notre spécialité maison ! Poulet croustillant avec garniture généreuse.',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    id: 14, name: 'Supplément Sauce', category: 'accompagnement', price: 0.20,
    desc: 'Sauce maison au choix pour accompagner votre repas.',
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=800&q=80',
    popular: false,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

export default function MenuPage() {
  useDocumentTitle('Notre Menu — Miam Poulet');
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const { addItem } = useCart();

  const filtered = menuItems.filter((item) => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <img src={logoImg} alt="Miam Poulet" className="w-24 h-24 mx-auto mb-4 object-contain rounded-full shadow-lg" />
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
            Ouvert 7/7
          </span>
          <h1 className="text-5xl font-black text-slate-900 mb-4">Notre Menu</h1>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Poulet rôti, saucisses grillées et accompagnements faits maison. Découvrez toutes nos spécialités !
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative max-w-md mx-auto mb-8"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un plat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all placeholder-slate-400"
          />
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-6 py-3 rounded-full font-bold transition-all text-sm flex items-center gap-2 ${activeCategory === cat.id
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Empty state */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-20">
              <p className="text-4xl mb-4">🍗</p>
              <p className="text-xl font-bold text-slate-700">Aucun résultat trouvé</p>
              <p className="text-slate-400 mt-2">Essayez un autre mot-clé ou une autre catégorie.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                layout
                key={item.id}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src =
                        'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22450%22 viewBox=%220 0 800 450%22%3E%3Crect width=%22800%22 height=%22450%22 fill=%22%23fb923c%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2232%22%3EImage indisponible%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  {item.popular && (
                    <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                      ⭐ Populaire
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                    <span className="text-orange-600 font-black text-xl ml-2 shrink-0">{item.price.toFixed(2)}€</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-5 leading-relaxed line-clamp-2">{item.desc}</p>
                  <button
                    onClick={() =>
                      addItem({ id: String(item.id), name: item.name, price: item.price, quantity: 1, image: item.image })
                    }
                    className="w-full flex items-center justify-center space-x-2 bg-slate-900 text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors active:scale-95"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Ajouter au panier</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Info banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-black mb-3">📍 Supplément sauce : 0,20€</h3>
          <p className="text-orange-100 text-lg">Sauce maison disponible à 0,65€ — Ouvert 7j/7 !</p>
        </motion.div>
      </div>
    </div>
  );
}
