
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, TrendingUp, Calculator, MessageSquare, Star, Filter, Search } from "lucide-react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AIFeatures from "@/components/AIFeatures";
import TamilMillionaireJourney from "@/components/TamilMillionaireJourney";
import PropertyListings from "@/components/PropertyListings";
import ClientDashboard from "@/components/ClientDashboard";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* AI Features */}
      <AIFeatures />
      
      {/* Tamil Millionaire Journey */}
      <TamilMillionaireJourney />
      
      {/* Property Listings */}
      <PropertyListings />
      
      {/* Client Dashboard Preview */}
      <ClientDashboard />
      
      {/* Blog Section */}
      <BlogSection />
      
      {/* Footer */}
      <Footer />
      
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default Index;
