import React from 'react';
import { Search, TrendingUp } from 'lucide-react';

const HomeSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen px-6 pt-8 pb-32 overflow-hidden flex flex-col justify-start"
      style={{ minHeight: "100dvh" }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/herobg.webm"
      />

      {/* White overlay */}
      <div className="absolute inset-0 bg-white/20 z-0 pointer-events-none" />

      {/* Centered Content */}
      <div className="max-w-md mx-auto text-center relative z-10 flex-1 flex flex-col items-center justify-start pt-4">
        {/* Logo */}
        <div className="mb-8">
          <img src="/logo.png" alt="Lykaconnect Logo" className="h-20 mx-auto mb-2" />
          <div className="w-16 h-1 bg-gradient-to-r from-[#720D4C] to-[#E0A935] mx-auto rounded-full"></div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-white mb-3 leading-tight drop-shadow-md">
          Unlock Dubai's Real Estate Gold with AI
        </h2>

        {/* Subtext */}
        <p
          className="text-base text-[#F5F5F5] mb-3"
          style={{ textShadow: "0 2px 6px rgba(0,0,0,0.4)" }}
        >
          AI-powered Dubai real estate for Indian investors
        </p>

        {/* Filler Line */}
        <p
          className="text-xl font-semibold text-[#FFD700] mb-6 tracking-wide"
          style={{ textShadow: "0 3px 6px rgba(0,0,0,0.5)" }}
        >
          Smarter AI. Better Deals. Proven ROI.
        </p>
      </div>

      {/* CTA Buttons Anchored Near Bottom */}
      <div className="max-w-md mx-auto w-full relative z-10 space-y-4">
        <button className="w-full bg-[#720D4C] text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg hover:bg-[#5a0a3c] transition-colors">
          <Search size={20} />
          Search Listings
        </button>

        <button className="w-full bg-[#E0A935] text-[#1F1F1F] py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg hover:bg-[#d19a2f] transition-colors">
          <TrendingUp size={20} />
          Millionaire Countdown
        </button>
      </div>
    </section>
  );
};

export default HomeSection;
