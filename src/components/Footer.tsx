import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#003450] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
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
              <h3 className="text-lg font-semibold mb-4">Get in touch</h3>
              <a 
                href="mailto:contactus@luxcity.onmicrosoft.com" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                contactus@luxcity.onmicrosoft.com
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Sign up for our newsletter</h3>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-r-lg flex items-center transition-colors"
                  >
                    <Send className="h-5 w-5" />
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