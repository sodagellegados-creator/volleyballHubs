
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Volleyball, Calendar, Trophy, List, Menu, X } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Volleyball },
    { name: 'Matches', path: '/matches', icon: Calendar },
    { name: 'Leagues', path: '/leagues', icon: List },
    { name: 'Standings', path: '/standings', icon: Trophy },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd]">
      <nav className="bg-red-600 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="bg-white p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                  <Volleyball className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase italic">VolleyHub</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                      isActive 
                        ? 'bg-white text-red-600 shadow-lg' 
                        : 'hover:bg-red-500 text-white hover:shadow-md'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-white hover:bg-red-500 focus:outline-none transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-red-700 border-t border-red-500 animate-in slide-in-from-top duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-bold ${
                      isActive ? 'bg-white text-red-600' : 'text-white hover:bg-red-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-400">
          <div className="flex items-center space-x-2">
            <Volleyball className="w-5 h-5 text-red-600 opacity-50" />
            <span className="font-bold text-gray-900">VolleyHub</span>
          </div>
          <p className="text-sm font-medium">
            © {new Date().getFullYear()} Volleyball Hub.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
