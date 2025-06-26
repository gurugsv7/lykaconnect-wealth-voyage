
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-amber-600/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">L</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Lykaconnect
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Dubai's premier AI-powered real estate platform, connecting investors with their millionaire journey.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2 text-amber-400" />
                Dubai Marina, UAE
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2 text-amber-400" />
                +971 50 123 4567
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2 text-amber-400" />
                info@lykaconnect.ae
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Property Investment</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">AI Market Analysis</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Portfolio Management</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Tamil Millionaire Journey</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">ROI Calculator</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">24/7 AI Support</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Investment Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Market Reports</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Property Trends</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Get weekly AI-powered market insights and investment opportunities.
            </p>
            <div className="space-y-3">
              <Input
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-white"
              />
              <Button className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-500 hover:to-amber-700">
                Subscribe
              </Button>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-amber-400 p-2">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-amber-400 p-2">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-amber-400 p-2">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-amber-400 p-2">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-amber-600/20 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2024 Lykaconnect. All rights reserved. | Powered by AI Innovation
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
