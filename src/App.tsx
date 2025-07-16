import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import AIWealthForecast from "./pages/AIWealthForecast";
import TamilInvestmentAnalysis from "./components/TamilInvestmentAnalysis";
import TamilInvestmentResults from "./components/TamilInvestmentResults";
import AIFeatures from "./components/AIFeatures";
import PortfolioOptimizer from "./components/PortfolioOptimizer";
import CapitalAppreciationEstimator from "./components/CapitalAppreciationEstimator";
import CapitalAppreciationResults from "./components/CapitalAppreciationResults";
import BlogSection from "./components/BlogSection";
import RealEstateRiskCalculator from "./components/RealEstateRiskCalculator";
import RealEstateRiskResults from "./components/RealEstateRiskResults";
import UAEInvestorVisaInfo from "./components/UAEInvestorVisaInfo";
import MortgageEMICalculator from "./components/MortgageEMICalculator";
import MortgageEMIResults from "./components/MortgageEMIResults";
import BottomNavBar from "./components/BottomNavBar";
import Archives from "./pages/Archives";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div
      style={{
        background: "var(--background)",
        color: "var(--body)",
        minHeight: "100vh",
        fontFamily: "'Poppins', 'Inter', sans-serif",
      }}
      className="bg-[var(--background)] text-[var(--body)] min-h-screen"
    >
      <BrowserRouter basename="/">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/ai-wealth-forecast" element={<AIWealthForecast />} />
          <Route path="/tamil-investment-analysis" element={<TamilInvestmentAnalysis />} />
          <Route path="/tamil-investment-results" element={<TamilInvestmentResults />} />
          <Route path="/ai-features" element={<AIFeatures />} />
          <Route path="/portfolio-optimizer" element={<PortfolioOptimizer />} />
          <Route path="/capital-appreciation-estimator" element={<CapitalAppreciationEstimator />} />
          <Route path="/capital-appreciation-results" element={<CapitalAppreciationResults />} />
          <Route path="/blog" element={<BlogSection />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/real-estate-risk-calculator" element={<RealEstateRiskCalculator />} />
          <Route path="/real-estate-risk-results" element={<RealEstateRiskResults />} />
          <Route path="/uae-investor-visa" element={<UAEInvestorVisaInfo />} />
          <Route path="/mortgage-emi-calculator" element={<MortgageEMICalculator />} />
          <Route path="/mortgage-emi-results" element={<MortgageEMIResults />} />
          {/* Add other routes as needed */}
        </Routes>
        <BottomNavBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
