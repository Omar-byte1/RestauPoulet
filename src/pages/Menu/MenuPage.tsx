import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Flame, ShoppingCart, Star, Search } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const categories = [
  { id: 'all', name: 'Tous les Plats' },
  { id: 'braise', name: 'Poulet Braisé' },
  { id: 'frit', name: 'Poulet Frit' },
  { id: 'burger', name: 'Burgers & Wraps' },
  { id: 'sides', name: 'Accompagnements' },
];

const menuItems = [
  {
    id: 1,
    name: 'Poulet Braisé Entier',
    category: 'braise',
    price: 18.50,
    desc: 'Mariné aux herbes de Provence et épices douces.',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    spicy: false,
    veggie: false,
  },
  {
    id: 2,
    name: 'Bucket Wings (12pcs)',
    category: 'frit',
    price: 15.90,
    desc: 'Ailes de poulet marinées et frites façon Kentucky.',
    image: 'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    spicy: true,
    veggie: false,
  },
  {
    id: 3,
    name: 'Le Chic Burger',
    category: 'burger',
    price: 12.90,
    desc: 'Filet de poulet croustillant, cheddar, sauce maison.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    spicy: false,
    veggie: false,
  },
  {
    id: 4,
    name: 'Tenders Maison (6pcs)',
    category: 'frit',
    price: 9.50,
    desc: 'Aiguillettes de poulet panées à la main.',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    spicy: false,
    veggie: false,
  },
  {
    id: 5,
    name: 'Frites Maison',
    category: 'sides',
    price: 4.50,
    desc: 'Pommes de terre fraîches coupées chaque matin.',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.6,
    spicy: false,
    veggie: true,
  },
  {
    id: 6,
    name: 'Salade César Poulet',
    category: 'braise',
    price: 13.50,
    desc: 'Poulet braisé, croûtons, parmesan, sauce césar.',
    image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    spicy: false,
    veggie: false,
  },
  {
    id: 7,
    name: 'Wrap Poulet Épicé',
    category: 'burger',
    price: 10.90,
    desc: 'Tortilla grillée, poulet pimenté, avocat, salade.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    spicy: true,
    veggie: false,
  },
  {
    id: 8,
    name: 'Coleslaw Maison',
    category: 'sides',
    price: 3.90,
    desc: 'Chou blanc et carotte en sauce crémeuse maison.',
    image: 'https://images.pexels.com/photos/4058516/pexels-photo-4058516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5,
    spicy: false,
    veggie: true,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

export default function MenuPage() {
  useDocumentTitle('Notre Menu — PouletChic');
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
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
            Fait maison chaque jour
          </span>
          <h1 className="text-5xl font-black text-slate-900 mb-4">Notre Menu</h1>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Découvrez nos spécialités préparées avec passion. Du poulet fermier, des épices authentiques et beaucoup d'amour.
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
              className={`relative px-6 py-3 rounded-full font-bold transition-all text-sm ${
                activeCategory === cat.id
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Empty state */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
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
                        'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22450%22 viewBox=%220 0 800 450%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%22 y1=%220%22 x2=%221%22 y2=%221%22%3E%3Cstop stop-color=%22%23fb923c%22/%3E%3Cstop offset=%221%22 stop-color=%22%230f172a%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22800%22 height=%22450%22 fill=%22url(%23g)%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2232%22%3EImage indisponible%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {item.spicy && (
                      <div className="bg-red-500 text-white p-2 rounded-full shadow-lg" title="Piquant">
                        <Flame className="w-4 h-4" />
                      </div>
                    )}
                    {item.veggie && (
                      <div className="bg-green-500 text-white px-2.5 py-1 rounded-full shadow-lg text-xs font-bold" title="Végétarien">
                        VEG
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                    <span className="text-orange-600 font-black text-lg ml-2 shrink-0">{item.price.toFixed(2)}€</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-5 leading-relaxed line-clamp-2">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold text-slate-500">{item.rating}</span>
                    </div>
                    <button
                      onClick={() =>
                        addItem({
                          id: String(item.id),
                          name: item.name,
                          price: item.price,
                          quantity: 1,
                          image: item.image,
                        })
                      }
                      className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors active:scale-95"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Ajouter</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
