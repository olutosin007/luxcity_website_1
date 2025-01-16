import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import HeroBackground from './HeroBackground';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <HeroBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 - Logo and Description */}
          <div className="space-y-6">
            <img 
              src="https://i.imgur.com/pXKE3pA.png" 
              alt="Luxcity Logo" 
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="text-gray-300">
              We are a PropTech company building AI-driven solutions for the modern real estate economy.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <nav className="space-y-4">
              <div>
                <Link to="/solutions" className="text-gray-300 hover:text-white transition-colors">
                  Solutions
                </Link>
              </div>
              <div>
                <Link to="/labs" className="text-gray-300 hover:text-white transition-colors">
                  Labs
                </Link>
              </div>
              <div>
                <Link to="/insights" className="text-gray-300 hover:text-white transition-colors">
                  Insights
                </Link>
              </div>
              <div>
                <Link to="/company" className="text-gray-300 hover:text-white transition-colors">
                  Company
                </Link>
              </div>
            </nav>
          </div>

          {/* Column 3 - Contact and Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Get in touch</h3>
              <a 
                href="mailto:contactus@luxcity.onmicrosoft.com" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                contactus@luxcity.onmicrosoft.com
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Sign up for our newsletter</h3>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-l-lg bg-white/10 backdrop-blur-strong text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#DC5F12] hover:bg-[#c45510] rounded-r-lg flex items-center transition-colors"
                  >
                    <Send className="h-5 w-5 text-white" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}