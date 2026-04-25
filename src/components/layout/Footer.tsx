import { Flame, Camera, Users, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Newsletter banner */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
              Recevez nos offres exclusives
            </h3>
            <p className="text-orange-100 text-sm">Promos, nouveautés et événements — directement dans votre boîte mail.</p>
          </div>
          <form
            className="flex w-full md:w-auto gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="votre@email.fr"
              className="flex-1 md:w-64 px-4 py-3 rounded-xl text-slate-900 font-medium outline-none focus:ring-2 focus:ring-white/60 placeholder-slate-400 text-sm"
            />
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors whitespace-nowrap"
            >
              S'abonner
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Flame className="w-8 h-8 text-orange-500 fill-orange-500" />
              <span className="text-2xl font-black tracking-tighter">
                POULET<span className="text-orange-500">CHIC</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Le meilleur poulet croustillant et braisé de France. Une recette secrète, des ingrédients frais et une passion pour le goût.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Instagram"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Facebook"
              >
                <Users className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Twitter / X"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Accueil</Link></li>
              <li><Link to="/menu" className="hover:text-orange-500 transition-colors">Notre Menu</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
              <li><Link to="#" className="hover:text-orange-500 transition-colors">Mentions Légales</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Horaires</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex justify-between gap-4"><span>Lun – Jeu</span><span className="text-white font-medium">11h30 – 22h30</span></li>
              <li className="flex justify-between gap-4"><span>Ven – Sam</span><span className="text-white font-medium">11h30 – 23h30</span></li>
              <li className="flex justify-between gap-4"><span>Dimanche</span><span className="text-white font-medium">12h00 – 22h00</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>123 Avenue du Poulet<br /><span className="text-white font-medium">75011 Paris</span></li>
              <li>
                <a href="tel:+33123456789" className="hover:text-orange-500 transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li>
                <a href="mailto:contact@pouletchic.fr" className="hover:text-orange-500 transition-colors">
                  contact@pouletchic.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} PouletChic. Tous droits réservés.
          </p>
          <p className="text-slate-600 text-xs">
            Fait avec ❤️ à Paris
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

