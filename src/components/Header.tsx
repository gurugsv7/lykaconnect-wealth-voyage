import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50 bg-black/90 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">L</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Lykaconnect
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#properties" className="text-gray-300 hover:text-amber-400 transition-colors">Properties</a>
            <a href="#tools" className="text-gray-300 hover:text-amber-400 transition-colors">AI Tools</a>
            <a href="#dashboard" className="text-gray-300 hover:text-amber-400 transition-colors">Dashboard</a>
            <a href="#blog" className="text-gray-300 hover:text-amber-400 transition-colors">Insights</a>
            <Button variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-black">
              Talk to Advisor
            </Button>
            <Button className="bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-500 hover:to-amber-700">
              List Your Property
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-amber-600/20">
            <nav className="flex flex-col space-y-4">
              <a href="#properties" className="text-gray-300 hover:text-amber-400 transition-colors">Properties</a>
              <a href="#tools" className="text-gray-300 hover:text-amber-400 transition-colors">AI Tools</a>
              <a href="#dashboard" className="text-gray-300 hover:text-amber-400 transition-colors">Dashboard</a>
              <a href="#blog" className="text-gray-300 hover:text-amber-400 transition-colors">Insights</a>
              <Button variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-black w-full">
                Talk to Advisor
              </Button>
              <Button className="bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-500 hover:to-amber-700 w-full">
                List Your Property
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

