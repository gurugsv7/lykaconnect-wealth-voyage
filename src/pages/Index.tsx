import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, TrendingUp, Calculator, MessageSquare, Star, Filter, Search } from "lucide-react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AIFeatures from "@/components/AIFeatures";
// import TamilMillionaireJourney from "@/components/TamilMillionaireJourney";
import BlogSection from "@/components/BlogSection";

const Index = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--background)",
        color: "var(--body)",
        minHeight: "100vh",
        fontFamily: "'Poppins', 'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* AI Features */}
      <AIFeatures />

      {/* Tamil Millionaire Journey */}
      {/* <TamilMillionaireJourney /> */}

      {/* Blog Section */}
      <BlogSection />
    </div>
  );
};

export default Index;
