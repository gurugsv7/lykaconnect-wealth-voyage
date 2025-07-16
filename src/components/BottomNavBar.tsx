import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Brain, BookOpen, Archive, MessageCircle } from 'lucide-react';

const navItems = [
  { id: 'home', icon: Home, label: 'Home', path: '/' },
  { id: 'ai-features', icon: Brain, label: 'AI Features', path: '/ai-features' },
  { id: 'blogs', icon: BookOpen, label: 'Blogs', path: '/blog' },
  { id: 'archives', icon: Archive, label: 'Archives', path: '/archives' },
  { id: 'contact', icon: MessageCircle, label: 'Contact', path: '/contact' },
];

const BottomNavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active section by path
  const activeSection = navItems.find(item => item.path === location.pathname)?.id || 'home';

  const handleNavClick = (item: typeof navItems[0]) => {
    if (location.pathname !== item.path) {
      navigate(item.path);
    } else {
      // Optional: scroll to section if already on page
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-50 shadow-[0_-4px_20px_rgba(114,13,76,0.1)]">
      <div className="flex justify-around items-center py-2 px-1">
        {navItems.map(({ id, icon: Icon, label, path }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => handleNavClick({ id, icon: Icon, label, path })}
              className="flex flex-col items-center justify-center p-2 min-w-0 flex-1 relative"
            >
              {isActive && (
                <div className="absolute inset-0 rounded-full bg-gradient-radial from-[#E0A935]/20 to-transparent"></div>
              )}
              <Icon 
                size={20} 
                className={`mb-1 ${isActive ? 'text-[#720D4C]' : 'text-[#999999] hover:text-[#720D4C] transition-colors'}`}
              />
              <span className={`text-xs font-medium ${isActive ? 'text-[#720D4C]' : 'text-[#999999] group-hover:text-[#720D4C]'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar;
