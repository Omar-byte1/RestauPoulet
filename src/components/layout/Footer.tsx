import { Flame, Globe, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Contact"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
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
            <ul className="space-y-4 text-slate-400">
              <li>Lundi - Jeudi: 11h30 - 22h30</li>
              <li>Vendredi - Samedi: 11h30 - 23h30</li>
              <li>Dimanche: 12h00 - 22h00</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-slate-400">
              <li>123 Avenue du Poulet, Paris</li>
              <li>+33 1 23 45 67 89</li>
              <li>contact@pouletchic.fr</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} PouletChic. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

