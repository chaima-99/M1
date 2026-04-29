import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, HelpCircle, User, Sparkles } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Welcome', path: '/welcome', icon: Sparkles },
    { name: 'Quiz', path: '/quiz', icon: HelpCircle },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm font-roboto">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
              S
            </div>
            <span className="font-black text-xl tracking-tight text-[#9F449F]">StudyMate</span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#9D8CFF] text-white shadow-md' 
                      : 'text-gray-600 hover:bg-purple-50 hover:text-[#9F449F]'
                  }`}
                >
                  <Icon size={16} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Login Button */}
          <Link 
            to="/login"
            className="bg-[#9F449F] text-white px-5 py-2 rounded-xl text-[13px] font-bold hover:bg-[#833883] hover:shadow-lg transition-all flex items-center gap-2"
          >
            <User size={16} />
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
