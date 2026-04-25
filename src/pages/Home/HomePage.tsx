import { motion } from 'framer-motion';
import { ArrowRight, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HERO_IMG =
  'https://images.unsplash.com/photo-1604908554162-45b1baf0f6f0?auto=format&fit=crop&w=2400&q=80';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_IMG}
            alt="Poulet croustillant" 
            className="w-full h-full object-cover brightness-[0.4]"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-orange-600 text-white text-xs font-bold uppercase tracking-widest mb-6">
              Nouveau à Paris
            </span>
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
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all transform hover:scale-105"
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

      {/* Featured Items */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="text-orange-600 font-bold uppercase tracking-widest mb-4">Nos Incontournables</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Les favoris de <br />nos clients
              </h3>
            </div>
            <Link to="/menu" className="mt-6 md:mt-0 text-orange-600 font-bold flex items-center hover:underline">
              Voir tout le menu <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Le Bucket XL",
                price: "24.90€",
                desc: "12 pièces croustillantes avec 3 sauces maison au choix.",
                image:
                  "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?auto=format&fit=crop&w=1200&q=80",
                tag: "Populaire"
              },
              {
                title: "Poulet Braisé Maison",
                price: "18.50€",
                desc: "Mariné 24h dans nos épices secrètes et cuit au feu de bois.",
                image:
                  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80",
                tag: "Chef's Choice"
              },
              {
                title: "Le Chic Burger",
                price: "14.90€",
                desc: "Filet de poulet pané, cheddar fondu, oignons caramélisés.",
                image:
                  "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
                tag: "Nouveau"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
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
                    <span className="text-orange-600 font-black text-xl">{item.price}</span>
                  </div>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    {item.desc}
                  </p>
                  <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold group-hover:bg-orange-600 transition-colors">
                    Ajouter au panier
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl opacity-30"></div>
              <img 
                src="/images/hero-poulet.jpg" 
                alt="Cooking" 
                className="relative z-10 rounded-[40px] shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-[200px]">
                <div className="flex items-center space-x-2 text-orange-600 mb-2">
                  <Star className="w-5 h-5 fill-orange-600" />
                  <span className="font-bold">Excellent</span>
                </div>
                <p className="text-xs text-slate-500 font-medium italic">
                  "Le meilleur poulet que j'ai mangé de ma vie. La panure est incroyable !"
                </p>
                <p className="text-[10px] font-bold text-slate-900 mt-2">— Thomas D.</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-orange-600 font-bold uppercase tracking-widest mb-4">Pourquoi PouletChic ?</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
                La qualité sans <br />compromis.
              </h3>
              
              <div className="space-y-8">
                {[
                  {
                    title: "Produits Locaux",
                    desc: "Nous travaillons exclusivement avec des éleveurs français garantissant un poulet élevé en plein air."
                  },
                  {
                    title: "Recette Secrète",
                    desc: "Notre mélange de 13 épices est préparé chaque matin dans nos cuisines pour une saveur inégalée."
                  },
                  {
                    title: "Cuisson Maîtrisée",
                    desc: "À basse température puis saisi pour garder toute la tendreté et le croustillant."
                  }
                ].map((feature, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


