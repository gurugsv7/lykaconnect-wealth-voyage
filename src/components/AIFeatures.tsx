import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="#FFF7E0"/>
        <path d="M11 16.5L15 20.5L21 12.5" stroke="#720D4C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Tamil Millionaire Journey",
    desc: "AI-powered rental income insights for Tamil investors.",
    button: "Analyze Income",
    route: "/tamil-investment-analysis"
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="#FFF7E0"/>
        <rect x="10" y="14" width="12" height="6" rx="2" fill="#E0A935" stroke="#720D4C" strokeWidth="1.5"/>
        <rect x="12" y="12" width="8" height="4" rx="1" fill="#E0A935" stroke="#720D4C" strokeWidth="1"/>
      </svg>
    ),
    title: "Mortgage & EMI Calculator",
    desc: "Instant mortgage & EMI estimates with risk analysis.",
    button: "Calculate EMI",
    route: "/mortgage-emi-calculator"
  },
  {
    icon: (
      <div className="w-8 h-8 rounded-md bg-yellow-400 flex items-center justify-center">
        <span className="text-black text-2xl font-bold">▲</span>
      </div>
    ),
    title: "Capital Appreciation Estimator",
    desc: "Predict future property values with AI-powered market analysis. Factor in infrastructure development, economic trends, and location dynamics for accurate forecasts.",
    bullets: [
      "5–10 year value projections",
      "Infrastructure impact analysis",
      "Market factor evaluation",
      "Risk scenario modeling",
    ],
    button: "Predict Property Value",
  },
  {
    icon: (
      <div className="w-8 h-8 rounded-md bg-yellow-400 flex items-center justify-center">
        <span className="text-black text-2xl font-bold">💡</span>
      </div>
    ),
    title: "Investment Risk Estimator",
    desc: "Estimate potential returns for low and high risk strategies. Get smart suggestions and see UAE visa eligibility based on your investment.",
    bullets: [
      "Low & high risk return estimates",
      "Smart budget suggestions",
      "Visa eligibility highlights",
      "Clear, mobile-friendly UI"
    ],
    button: "Calculate Investment Risk",
    route: "/real-estate-risk-calculator"
  },
  {
    icon: (
      <div className="w-8 h-8 rounded-md bg-yellow-400 flex items-center justify-center">
        <span className="text-black text-2xl font-bold">🔶</span>
      </div>
    ),
    title: "Portfolio Optimizer",
    desc: "AI-driven portfolio analysis and optimization recommendations. Maximize returns while minimizing risk through intelligent asset allocation strategies.",
    bullets: [
      "Diversification scoring",
      "Risk-return optimization",
      "Asset allocation strategy",
      "Performance enhancement",
    ],
    button: "Optimize Portfolio",
  },
  {
    icon: (
      <div className="w-8 h-8 rounded-md bg-yellow-400 flex items-center justify-center">
        <span className="text-black text-2xl font-bold">🔷</span>
      </div>
    ),
    title: "Smart Property Matching",
    desc: "AI-driven property recommendations based on your investment criteria. Input your budget and preferences to receive personalized property matches.",
    bullets: [
      "Budget-optimized recommendations",
      "Risk tolerance assessment",
      "ROI projections & analysis",
      "Portfolio optimization advice",
    ],
    button: "Find Properties",
  },
  // Premium Property Listings hidden as per user request
];

import { useState, useEffect } from "react";
const AIFeatures = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    let scrollHandler: any;
    if (isMobile && showAll) {
      scrollHandler = () => {
        // Find the next section after #tools
        const toolsSection = document.getElementById("tools");
        if (!toolsSection) return;
        // Assume the next sibling section is the next section
        let nextSection = toolsSection.nextElementSibling as HTMLElement | null;
        // If not found, fallback to a section with a known id (customize as needed)
        if (!nextSection) {
          nextSection = document.getElementById("blog") as HTMLElement | null;
        }
        if (nextSection) {
          const rect = nextSection.getBoundingClientRect();
          // If the top of the next section is at or above the top of the viewport
          if (rect.top <= 0) {
            setShowAll(false);
          }
        }
      };
      window.addEventListener("scroll", scrollHandler, { passive: true });
    }
    return () => {
      window.removeEventListener("resize", checkMobile);
      if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
    };
  }, [isMobile, showAll]);


const visibleFeatures = features.filter(
  f => f.title === "Tamil Millionaire Journey" || f.title === "Mortgage & EMI Calculator"
);

const extraFeatures = features.filter(
  f =>
    f.title !== "Tamil Millionaire Journey" &&
    f.title !== "Mortgage & EMI Calculator" &&
    f.title !== "Portfolio Optimizer" &&
    f.title !== "Smart Property Matching"
);

  return (
    <section
      id="tools"
      className="py-20"
      style={{
        background: "linear-gradient(135deg, #f9f7fa 0%, #f4f0f7 100%)",
        fontFamily: "'Inter', 'Poppins', sans-serif",
      }}
    >
      <div className="max-w-[768px] mx-auto px-4 flex flex-col items-center">
        <div className="w-full text-center mb-8 flex flex-col items-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-2 flex justify-center items-center gap-2"
            style={{
              fontFamily: "'Inter', 'Poppins', sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ color: "#720D4C" }}>AI-</span>
            <span
              className="bg-gradient-to-r from-[#E0A935] to-[#FFD300] bg-clip-text text-transparent"
              style={{ fontWeight: "bold" }}
            >
              FEATURES
            </span>
          </h2>
          <p className="text-base md:text-lg font-medium max-w-xl mx-auto" style={{ color: "#1F1F1F" }}>
            Unlock smarter Dubai real estate decisions with AI.
          </p>
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-stretch mb-4">
          {visibleFeatures.map((f, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-between rounded-2xl shadow-md px-4 py-5${i <= 1 ? " ml-2 sm:ml-0" : ""}`}
              style={{
                background: "#fff",
                border: "1.5px solid #E0A935",
                boxShadow: "0 2px 12px 0 #E0A93522",
                minWidth: 0,
                maxWidth: 340,
                width: "100%",
                minHeight: 170,
                height: "auto",
              }}
            >
              <div className="flex justify-center items-center mb-2">
                {f.icon}
              </div>
              <div
                className="font-bold text-base mb-1 text-center"
                style={{ color: "#720D4C", fontFamily: "'Inter', 'Poppins', sans-serif" }}
              >
                {f.title}
              </div>
              <div
                className="text-xs mb-3 text-center"
                style={{ color: "#1F1F1F", maxWidth: "90%", margin: "0 auto", minHeight: "1.5em" }}
              >
                {f.desc}
              </div>
              <Button
                className="w-full bg-[#E0A935] text-[#720D4C] font-bold rounded-lg py-2 text-sm shadow hover:bg-[#e6c75a] hover:text-[#1F1F1F] transition-all"
                style={{
                  boxShadow: "0 2px 8px 0 #E0A93533",
                  fontFamily: "'Inter', 'Poppins', sans-serif",
                  marginTop: "auto"
                }}
                onClick={() => navigate(f.route)}
              >
                {f.button}
              </Button>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center mt-2">
          <Button
            className="bg-[#FFD300] text-[#720D4C] font-bold rounded-lg px-6 py-2 shadow hover:bg-yellow-300"
            style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? "Hide Extra Features" : "Show More Features"}
          </Button>
        </div>
        {showAll && (
          <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-stretch mt-4">
            {extraFeatures.map((f, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-between rounded-2xl shadow-md px-4 py-5${i === 0 ? " ml-2 sm:ml-0" : ""}`}
                style={{
                  background: "#fff",
                  border: "1.5px solid #E0A935",
                  boxShadow: "0 2px 12px 0 #E0A93522",
                  minWidth: 0,
                  maxWidth: 340,
                  width: "100%",
                  minHeight: 170,
                  height: "auto",
                }}
              >
                <div className="flex justify-center items-center mb-2">
                  {f.icon}
                </div>
                <div
                  className="font-bold text-base mb-1 text-center"
                  style={{ color: "#720D4C", fontFamily: "'Inter', 'Poppins', sans-serif" }}
                >
                  {f.title}
                </div>
                <div
                  className="text-xs mb-3 text-center"
                  style={{ color: "#1F1F1F", maxWidth: "90%", margin: "0 auto", minHeight: "1.5em" }}
                >
                  {f.desc}
                </div>
                <Button
                  className="w-full bg-[#E0A935] text-[#720D4C] font-bold rounded-lg py-2 text-sm shadow hover:bg-[#e6c75a] hover:text-[#1F1F1F] transition-all"
                  style={{
                    boxShadow: "0 2px 8px 0 #E0A93533",
                    fontFamily: "'Inter', 'Poppins', sans-serif",
                    marginTop: "auto"
                  }}
                  onClick={() => navigate(f.route)}
                >
                  {f.button}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AIFeatures;
