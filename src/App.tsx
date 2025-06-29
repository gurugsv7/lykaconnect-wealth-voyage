import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import AIWealthForecast from "./pages/AIWealthForecast";
import TamilInvestmentAnalysis from "./components/TamilInvestmentAnalysis";
import TamilInvestmentResults from "./components/TamilInvestmentResults";
import AIFeatures from "./components/AIFeatures";
import AIInvestmentMatcher from "./components/AIInvestmentMatcher";
import PortfolioOptimizer from "./components/PortfolioOptimizer";
import CapitalAppreciationEstimator from "./components/CapitalAppreciationEstimator";
import CapitalAppreciationResults from "./components/CapitalAppreciationResults";
import BlogSection from "./components/BlogSection";
import PropertyListings from "./components/PropertyListings";
import AIChatbot from "./components/AIChatbot";
import Footer from "./components/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter basename="/lykaconnect-wealth-voyage">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/ai-wealth-forecast" element={<AIWealthForecast />} />
        <Route path="/tamil-investment-analysis" element={<TamilInvestmentAnalysis />} />
        <Route path="/tamil-investment-results" element={<TamilInvestmentResults />} />
        <Route path="/ai-features" element={<AIFeatures />} />
        <Route path="/ai-investment-matcher" element={<AIInvestmentMatcher />} />
        <Route path="/portfolio-optimizer" element={<PortfolioOptimizer />} />
        <Route path="/capital-appreciation-estimator" element={<CapitalAppreciationEstimator />} />
        <Route path="/capital-appreciation-results" element={<CapitalAppreciationResults />} />
        <Route path="/blog" element={<BlogSection />} />
        <Route path="/property-listings" element={<PropertyListings />} />
        <Route path="/ai-chatbot" element={<AIChatbot />} />
        {/* Add other routes as needed */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
