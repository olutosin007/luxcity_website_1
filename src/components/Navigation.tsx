import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600';
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[80px] md:h-[120px]">
          <Link to="/" className="flex items-center">
            <img 
              src="/images/luxcity_logo_clr_6.png" 
              alt="Luxcity Logo" 
              className="h-8 md:h-12 w-auto" 
            />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-3 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/solutions" className={`${isActive('/solutions')} transition-colors duration-200`}>Solutions</Link>
            <Link to="/labs" className={`${isActive('/labs')} transition-colors duration-200`}>Labs</Link>
            <Link to="/insights" className={`${isActive('/insights')} transition-colors duration-200`}>Insights</Link>
            <Link to="/company" className={`${isActive('/company')} transition-colors duration-200`}>Company</Link>
            <Link to="/contact" className={`${isActive('/contact')} transition-colors duration-200`}>Contact</Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link 
                to="/solutions" 
                className={`${isActive('/solutions')} block px-3 py-3 sm:py-4 text-base font-medium transition-colors duration-200`}
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                Solutions
              </Link>
              <Link 
                to="/labs" 
                className={`${isActive('/labs')} block px-3 py-3 sm:py-4 text-base font-medium transition-colors duration-200`}
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                Labs
              </Link>
              <Link 
                to="/insights" 
                className={`${isActive('/insights')} block px-3 py-3 sm:py-4 text-base font-medium transition-colors duration-200`}
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                Insights
              </Link>
              <Link 
                to="/company" 
                className={`${isActive('/company')} block px-3 py-3 sm:py-4 text-base font-medium transition-colors duration-200`}
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                Company
              </Link>
              <Link 
                to="/contact" 
                className={`${isActive('/contact')} block px-3 py-3 sm:py-4 text-base font-medium transition-colors duration-200`}
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}