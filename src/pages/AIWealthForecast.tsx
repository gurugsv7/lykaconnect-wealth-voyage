import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Download, RefreshCw } from "lucide-react";

const WealthForecastResult = () => {
  const navigate = useNavigate();

  // Demo values; in a real app, pass these via state or context
  const name = "guruhari";
  const targetWealth = "AED 10,000,000";
  const estimatedYears = "7.2 years";
  const monthlyInvestment = "AED 50,000";
  const strategy = "surprise me";
  const risk = "Moderate";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-2 py-10 bg-gradient-to-br from-[#0f0f1b] to-[#121826]"
      style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
    >
      {/* Back to Home/Tools */}
      <Button
        variant="ghost"
        className="absolute top-6 left-6 z-10 bg-black/40 text-yellow-300 hover:bg-black/70"
        onClick={() => {
          navigate("/#tools");
          setTimeout(() => {
            const el = document.getElementById("tools");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
      >
        ← Back to Home
      </Button>

      {/* Page Title and Subtitle moved above border */}
      <div className="w-full max-w-2xl mx-auto mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          🎉 Your Millionaire Timeline Forecast
        </h1>
        <p className="text-lg text-gray-300 font-medium">
          Here’s what our AI predicts based on your investment strategy
        </p>
      </div>

      {/* Wealth Summary Box (bordered card, no title/subtitle inside) */}
      <div className="w-full max-w-xl mx-auto rounded-2xl border border-yellow-400 bg-gradient-to-br from-[#181825] to-[#23233a] p-8 mb-10 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-gray-400 mb-1">📍 Name</div>
            <div className="text-xl font-bold text-yellow-300 mb-4">{name}</div>
            <div className="text-gray-400 mb-1">🎯 Target Wealth</div>
            <div className="text-xl font-bold text-yellow-300 mb-4">{targetWealth}</div>
            <div className="text-gray-400 mb-1">📅 Estimated Time to Reach Target</div>
            <div className="text-xl font-bold text-yellow-300 mb-4">{estimatedYears}</div>
          </div>
          <div>
            <div className="text-gray-400 mb-1">💼 Monthly Investment</div>
            <div className="text-xl font-bold text-yellow-300 mb-4">{monthlyInvestment}</div>
            <div className="text-gray-400 mb-1">📊 Strategy</div>
            <div className="text-xl font-bold text-yellow-300 mb-4">{`"${strategy}"`}</div>
            <div className="text-gray-400 mb-1">⚖️ Risk Tolerance</div>
            <div className="text-xl font-bold text-yellow-300">{risk}</div>
          </div>
        </div>
      </div>

      {/* Wealth Growth Timeline (Visualization Placeholder) */}
      <div className="w-full max-w-xl mx-auto mb-10">
        <h3 className="text-xl font-semibold text-white mb-4 text-center">
          Projected Net Worth Over Time
        </h3>
        <div className="h-56 rounded-xl bg-gradient-to-br from-[#181825] to-[#23233a] flex items-center justify-center shadow-inner border border-yellow-900/20 mb-2">
          {/* Placeholder for area chart */}
          <svg width="90%" height="80%" viewBox="0 0 400 160">
            <defs>
              <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#glow)"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
              points="0,150 40,140 80,120 120,100 160,80 200,60 240,50 280,40 320,30 360,25 400,20"
              filter="url(#glow-shadow)"
            />
            <text x="10" y="155" fill="#FFD700" fontSize="12">Age/Years</text>
            <text x="320" y="30" fill="#FFD700" fontSize="12">Wealth</text>
          </svg>
        </div>
      </div>

      {/* AI Summary Insights */}
      <div className="w-full max-w-xl mx-auto mb-10">
        <ul className="space-y-3 text-lg text-gray-200">
          <li>
            <span className="mr-2">🔍</span>
            <span>You're expected to hit millionaire status by age <span className="text-yellow-300 font-bold">27.2</span></span>
          </li>
          <li>
            <span className="mr-2">💸</span>
            <span>Your investment plan offers <span className="text-yellow-300 font-bold">strong returns</span> with moderate risk</span>
          </li>
          <li>
            <span className="mr-2">🚀</span>
            <span>Consider <span className="text-yellow-300 font-bold">reinvesting rental income</span> for faster growth</span>
          </li>
        </ul>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
        <Button
          className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-lg py-3 shadow-md hover:from-yellow-300 hover:to-yellow-400"
        >
          <Download className="mr-2 h-5 w-5" />
          Download PDF Forecast
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-yellow-400 text-yellow-300 font-bold rounded-lg py-3 hover:bg-yellow-400/10"
          onClick={() => navigate("/ai-wealth-forecast")}
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Recalculate Forecast
        </Button>
      </div>
    </div>
  );
};

export default WealthForecastResult;
