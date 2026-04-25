import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ShoppingCart, Star } from 'lucide-react';

import { useCart } from '../../hooks/useCart';

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
    name: "Poulet Braisé Entier",
    category: "braise",
    price: 18.50,
    desc: "Mariné aux herbes de Provence et épices douces.",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80",
    spicy: false,
    veggie: false,
  },
  {
    id: 2,
    name: "Bucket Wings (12pcs)",
    category: "frit",
    price: 15.90,
    desc: "Ailes de poulet marinées et frites façon Kentucky.",
    image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?auto=format&fit=crop&w=1200&q=80",
    spicy: true,
    veggie: false,
  },
  {
    id: 3,
    name: "Le Chic Burger",
    category: "burger",
    price: 12.90,
    desc: "Filet de poulet croustillant, cheddar, sauce maison.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
    spicy: false,
    veggie: false,
  },
  {
    id: 4,
    name: "Tenders Maison (6pcs)",
    category: "frit",
    price: 9.50,
    desc: "Aiguillettes de poulet panées à la main.",
    image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    spicy: false,
    veggie: false,
  },
  {
    id: 5,
    name: "Frites Maison",
    category: "sides",
    price: 4.50,
    desc: "Pommes de terre fraîches coupées chaque matin.",
    image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    spicy: false,
    veggie: true,
  },
  {
    id: 6,
    name: "Salade César Poulet",
    category: "braise",
    price: 13.50,
    desc: "Poulet braisé, croûtons, parmesan, sauce césar.",
    image: "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    spicy: false,
    veggie: false,
  }
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { addItem } = useCart();

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-4">Notre Menu</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Découvrez nos spécialités préparées avec passion. Du poulet fermier, des épices authentiques et beaucoup d'amour.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src =
                        'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22450%22 viewBox=%220 0 800 450%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%22 y1=%220%22 x2=%221%22 y2=%221%22%3E%3Cstop stop-color=%22%23fb923c%22/%3E%3Cstop offset=%221%22 stop-color=%22%230f172a%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22800%22 height=%22450%22 fill=%22url(%23g)%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22system-ui,Segoe UI,Roboto%22 font-size=%2232%22%3EImage indisponible%3C/text%3E%3C/svg%3E'
                    }}
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {item.spicy && (
                      <div className="bg-red-500 text-white p-2 rounded-full shadow-lg" title="Piquant">
                        <Flame className="w-4 h-4" />
                      </div>
                    )}
                    {item.veggie && (
                      <div className="bg-green-500 text-white p-2 rounded-full shadow-lg" title="Végétarien">
                        <span className="text-xs font-bold px-1">VEG</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                    <span className="text-orange-600 font-black">{item.price.toFixed(2)}€</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold text-slate-400">4.8</span>
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
                      className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-xl font-bold hover:bg-orange-600 transition-colors"
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

