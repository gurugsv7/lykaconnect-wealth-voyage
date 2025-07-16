import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, TrendingUp, Calculator, MessageSquare, Star, Filter, Search } from "lucide-react";
import HomeSection from "@/components/HomeSection";
import AIFeatures from "@/components/AIFeatures";
// import TamilMillionaireJourney from "@/components/TamilMillionaireJourney";
import BlogSection from "@/components/BlogSection";

const Index = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#fff7e6] via-[#fdf6e3] to-[#ffe9c7] text-[#720D4C] font-poppins"
      style={{
        minHeight: "100vh",
        fontFamily: "'Poppins', 'Inter', sans-serif",
      }}
    >
      {/* Home Section */}
      <HomeSection />
    </div>
  );
};

export default Index;
