import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: (
      <div className="w-8 h-8 rounded-md bg-yellow-400 flex items-center justify-center">
        <span className="text-black text-2xl font-bold">🟨</span>
      </div>
    ),
    title: "Tamil Investment Analysis",
    desc: "Specialized rental income predictions with community-specific insights for Tamil investors. Get detailed market analysis and investment scoring for any Dubai property.",
    bullets: [
      "Monthly & Annual rental projections",
      "Community-specific market insights",
      "Investment scoring system",
      "Location analysis & recommendations",
    ],
    button: "Analyze Property Income",
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
  {
    icon: (
      <div className="w-8 h-8 rounded-md bg-yellow-400 flex items-center justify-center">
        <span className="text-black text-2xl font-bold">🟡</span>
      </div>
    ),
    title: "Premium Property Listings",
    desc: "Curated selection of luxury properties across Dubai’s prime locations. From Marina apartments to Emirates Hills villas with detailed investment analysis.",
    bullets: [
      "Luxury apartments & villas",
      "Prime Dubai locations",
      "Comprehensive property details",
      "Investment potential ratings",
    ],
    button: "Browse Properties",
  },
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

  const filteredFeatures = features.filter(
    f => f.title !== "Portfolio Optimizer" && f.title !== "Smart Property Matching"
  );
  const visibleFeatures = isMobile && !showAll ? [filteredFeatures[0]] : filteredFeatures;

  return (
    <section
      id="tools"
      className="py-20"
      style={{
        background: "linear-gradient(135deg, #0f0f1b 0%, #121826 100%)",
        fontFamily: "'Inter', 'Poppins', sans-serif",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
          >
            Complete Investment Intelligence Platform
          </h2>
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto">
            Five powerful AI-driven tools to maximize your Dubai real estate
            investment success
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6">
          {visibleFeatures.map((f, i) => (
            <div
              key={i}
              className="flex flex-col h-full bg-[#0f0f1b] rounded-2xl shadow-lg p-6"
              style={{
                minHeight: 370,
                boxShadow:
                  "0 4px 24px 0 rgba(20,20,40,0.25), 0 0 0 1px #23233a inset",
              }}
            >
              <div className="mb-4">{f.icon}</div>
              <div
                className="text-yellow-400 font-bold text-lg mb-2"
                style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
              >
                {f.title}
              </div>
              <div
                className="text-gray-300 text-sm mb-4"
                style={{ minHeight: 60 }}
              >
                {f.desc}
              </div>
              <ul className="mb-6 space-y-1">
                {f.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="text-gray-200 text-xs flex items-start"
                  >
                    <span className="mr-2 mt-0.5 text-yellow-300">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {/* Button navigation logic */}
              {f.title === "AI Wealth Forecast" ? (
                <Button
                  className="mt-auto w-full bg-[#FFD300] text-black font-bold rounded-lg py-2 text-base shadow-md hover:bg-yellow-300 hover:shadow-yellow-200/60 transition-all"
                  style={{
                    boxShadow: "0 2px 8px 0 #FFD30033",
                    fontFamily: "'Inter', 'Poppins', sans-serif",
                  }}
                  onClick={() => navigate("/ai-wealth-forecast")}
                >
                  {f.button}
                </Button>
              ) : f.title === "Capital Appreciation Estimator" ? (
                <Button
                  className="mt-auto w-full bg-[#FFD300] text-black font-bold rounded-lg py-2 text-base shadow-md hover:bg-yellow-300 hover:shadow-yellow-200/60 transition-all"
                  style={{
                    boxShadow: "0 2px 8px 0 #FFD30033",
                    fontFamily: "'Inter', 'Poppins', sans-serif",
                  }}
                  onClick={() => navigate("/capital-appreciation-estimator")}
                >
                  {f.button}
                </Button>
              ) : f.title === "Smart Property Matching" ? (
                <Button
                  className="mt-auto w-full bg-[#FFD300] text-black font-bold rounded-lg py-2 text-base shadow-md hover:bg-yellow-300 hover:shadow-yellow-200/60 transition-all"
                  style={{
                    boxShadow: "0 2px 8px 0 #FFD30033",
                    fontFamily: "'Inter', 'Poppins', sans-serif",
                  }}
                  onClick={() => navigate("/ai-investment-matcher")}
                >
                  {f.button}
                </Button>
              ) : f.title === "Portfolio Optimizer" ? (
                <Button
                  className="mt-auto w-full bg-[#FFD300] text-black font-bold rounded-lg py-2 text-base shadow-md hover:bg-yellow-300 hover:shadow-yellow-200/60 transition-all"
                  style={{
                    boxShadow: "0 2px 8px 0 #FFD30033",
                    fontFamily: "'Inter', 'Poppins', sans-serif",
                  }}
                  onClick={() => navigate("/portfolio-optimizer")}
                >
                  {f.button}
                </Button>
              ) : f.title === "Tamil Investment Analysis" ? (
                <Button
                  className="mt-auto w-full bg-[#FFD300] text-black font-bold rounded-lg py-2 text-base shadow-md hover:bg-yellow-300 hover:shadow-yellow-200/60 transition-all"
                  style={{
                    boxShadow: "0 2px 8px 0 #FFD30033",
                    fontFamily: "'Inter', 'Poppins', sans-serif",
                  }}
                  onClick={() => navigate("/tamil-investment-analysis")}
                >
                  {f.button}
                </Button>
              ) : f.title === "Premium Property Listings" ? (
                <Button
                  className="mt-auto w-full bg-[#FFD300] text-black font-bold rounded-lg py-2 text-base shadow-md hover:bg-yellow-300 hover:shadow-yellow-200/60 transition-all"
                  style={{
                    boxShadow: "0 2px 8px 0 #FFD30033",
                    fontFamily: "'Inter', 'Poppins', sans-serif",
                  }}
                  onClick={() => navigate("/properties")}
                >
                  {f.button}
                </Button>
              ) : (
                <Button
                  className="mt-auto w-full bg-[#FFD300] text-black font-bold rounded-lg py-2 text-base shadow-md hover:bg-yellow-300 hover:shadow-yellow-200/60 transition-all"
                  style={{
                    boxShadow: "0 2px 8px 0 #FFD30033",
                    fontFamily: "'Inter', 'Poppins', sans-serif",
                  }}
                >
                  {f.button}
                </Button>
              )}
            </div>
          ))}
        </div>
        {isMobile && !showAll && (
          <div className="flex justify-center mt-8">
            <Button
              className="bg-[#FFD300] text-black font-bold rounded-lg px-8 py-2 shadow-md hover:bg-yellow-300"
              onClick={() => setShowAll(true)}
            >
              Show More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIFeatures;
