import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600';
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[120px]">
          <Link to="/" className="flex items-center">
            <img src="https://i.imgur.com/pXKE3pA.png" alt="Luxcity Logo" className="h-12 w-auto" />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/solutions" className={`${isActive('/solutions')} transition-colors duration-200`}>Solutions</Link>
            <Link to="/labs" className={`${isActive('/labs')} transition-colors duration-200`}>Labs</Link>
            <Link to="/insights" className={`${isActive('/insights')} transition-colors duration-200`}>Insights</Link>
            <Link to="/company" className={`${isActive('/company')} transition-colors duration-200`}>Company</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}