import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// SVG Gold Icons (smaller)
const GoldIcon = ({ type }: { type: string }) => {
  const iconProps = {
    style: {
      filter: "drop-shadow(0 0 4px #FFD70066)",
      marginRight: 8,
      verticalAlign: "middle",
      minWidth: 20,
      minHeight: 20,
      width: 20,
      height: 20,
      maxWidth: 20,
      maxHeight: 20,
      display: "inline-block",
    },
    width: 20,
    height: 20,
    fill: "none",
    stroke: "#FFD700",
    strokeWidth: 1.5,
    strokeLinecap: "round" as "round",
    strokeLinejoin: "round" as "round",
  };
  switch (type) {
    case "value":
      return (
        <svg {...iconProps} viewBox="0 0 28 28">
          <ellipse cx="14" cy="18" rx="10" ry="5" fill="#FFD700" fillOpacity="0.18" />
          <rect x="6" y="8" width="16" height="10" rx="4" stroke="#FFD700" strokeWidth="1.5" fill="#FFD70022" />
          <path d="M10 14h8M14 10v8" stroke="#FFD700" strokeWidth="1.5" />
        </svg>
      );
    case "assumption":
      return (
        <svg {...iconProps} viewBox="0 0 28 28">
          <path d="M6 18l8-8 8 8" />
        </svg>
      );
    case "location":
      return (
        <svg {...iconProps} viewBox="0 0 28 28">
          <circle cx="14" cy="12" r="4" />
          <path d="M14 2v4M14 22v4M2 14h4M22 14h4" />
        </svg>
      );
    case "growth":
      return (
        <svg {...iconProps} viewBox="0 0 28 28">
          <path d="M7 21l7-7 7 7" />
          <circle cx="14" cy="10" r="3" />
        </svg>
      );
    case "chart":
      return (
        <svg {...iconProps} viewBox="0 0 28 28">
          <rect x="4" y="16" width="4" height="8" rx="2" />
          <rect x="12" y="10" width="4" height="14" rx="2" />
          <rect x="20" y="6" width="4" height="18" rx="2" />
        </svg>
      );
    default:
      return null;
  }
};

const GOLD = "#FFD700";
const DARK_BG = "#18192a";
const CARD_BG = "linear-gradient(135deg, #18192a 60%, #23243a 100%)";
const GLOW = "0 0 6px 1px #FFD70033, 0 0 0 1px #FFD70022 inset";

const CARD_MIN_HEIGHT = 300; // px
const CARD_MAX_WIDTH = 450; // px

const SectionCard = ({
  icon,
  title,
  value,
  description,
  subheading,
  progress,
  collapseOnMobile,
}: {
  icon: string;
  title: string;
  value: string;
  description?: string;
  subheading?: string;
  progress?: number;
  collapseOnMobile?: boolean;
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const shouldCollapse = collapseOnMobile && isMobile && description && description.length > 80;

  return (
    <div
      className="rounded-[10px] p-4 mb-4 shadow-sm flex flex-col justify-between items-start bg-clip-padding"
      style={{
        background: CARD_BG,
        boxShadow: "0 0 4px 0 #FFD70022",
        border: `1px solid ${GOLD}33`,
        maxWidth: CARD_MAX_WIDTH,
        margin: "0 auto",
        flex: "1 1 0",
        height: "auto",
      }}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center mb-1 whitespace-nowrap">
          <GoldIcon type={icon} />
          <span
            className="text-[16px] sm:text-[18px] uppercase tracking-wide text-yellow-400 ml-1 font-semibold"
            style={{
              letterSpacing: "0.08em",
              fontFamily: "'Inter', 'Poppins', sans-serif",
              fontWeight: 600,
            }}
          >
            {title}
          </span>
        </div>
        {progress !== undefined && (
          <div className="w-full h-1 rounded-full bg-[#FFD70022] mb-2 overflow-hidden">
            <div
              className="h-1 rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #FFD700 60%, #fffbe6 100%)",
                boxShadow: "0 0 4px #FFD70066",
                transition: "width 0.7s cubic-bezier(.23,1.01,.32,1)",
              }}
            />
          </div>
        )}
        <div className="text-[13px] sm:text-[15px] font-semibold text-white mb-1">
          {value}
        </div>
        {subheading && (
          <div className="text-xs md:text-sm text-gray-400 font-medium mb-1 uppercase tracking-wider">
            {subheading}
          </div>
        )}
        {description && (
          <div className="text-[13px] sm:text-[14px] text-white/80 leading-relaxed text-left w-full px-0 py-1">
            {shouldCollapse && collapsed ? (
              <>
                {description.slice(0, 80)}...
                <button
                  className="ml-2 text-[#FFD700] underline text-xs"
                  onClick={() => setCollapsed(false)}
                >
                  Read more
                </button>
              </>
            ) : (
              description
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function CapitalAppreciationResults() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#18192a]">
        <div className="text-2xl text-yellow-400 font-bold mb-4">No Results</div>
        <div className="text-lg text-white mb-4">No results found. Please try again from the estimator.</div>
        <button
          className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold shadow hover:shadow-yellow-400/40 transition-all"
          onClick={() => navigate("/capital-appreciation-estimator")}
        >
          ← Back to Estimator
        </button>
      </div>
    );
  }

  const {
    estimatedValue,
    assumption,
    location: loc,
    growthJustification,
    chartData,
    error,
  } = location.state;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#18192a]">
        <div className="text-2xl text-yellow-400 font-bold mb-4">Error</div>
        <div className="text-lg text-white">{error}</div>
        <button
          className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold shadow hover:shadow-yellow-400/40 transition-all"
          onClick={() => navigate("/capital-appreciation-estimator")}
        >
          ← Back to Estimator
        </button>
      </div>
    );
  }

  // Defensive: If all values are missing, show error
  if (!estimatedValue && !assumption && !loc && !growthJustification && (!chartData || !Array.isArray(chartData) || chartData.length === 0)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#18192a]">
        <div className="text-2xl text-yellow-400 font-bold mb-4">No Results</div>
        <div className="text-lg text-white mb-4">No results found. Please try again from the estimator.</div>
        <button
          className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold shadow hover:shadow-yellow-400/40 transition-all"
          onClick={() => navigate("/capital-appreciation-estimator")}
        >
          ← Back to Estimator
        </button>
      </div>
    );
  }

  // Responsive 2-column layout for cards, compact and balanced, fixed height
  return (
    <div className="min-h-screen py-8 px-2 flex flex-col items-center" style={{ background: DARK_BG }}>
      <div className="w-full flex justify-start mb-4">
        <button
          className="px-6 py-2 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold shadow hover:shadow-yellow-400/40 transition-all text-sm"
          onClick={() => navigate("/capital-appreciation-estimator")}
        >
          ← Back to Estimator
        </button>
      </div>
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Estimated Future Value */}
        {estimatedValue && (
          <SectionCard
            icon="value"
            title="Estimated Future Value"
            value={estimatedValue}
            description="Projected property value after 4 years based on current trends."
            subheading="AI-PROJECTED"
            progress={100}
            collapseOnMobile
          />
        )}
        {/* Assumption Adjustment */}
        {assumption && (
          <SectionCard
            icon="assumption"
            title="Assumption Adjustment"
            value={assumption}
            description="You can adjust this rate in the estimator for more personalized results."
            subheading="SCENARIO"
            progress={80}
            collapseOnMobile
          />
        )}
        {/* Location Insight */}
        {loc && (
          <SectionCard
            icon="location"
            title="Location Insight"
            value={loc}
            description="Prime location with strong historical appreciation and demand."
            subheading="LOCATION"
            progress={60}
            collapseOnMobile
          />
        )}
        {/* Growth Justification */}
        {growthJustification && (
          <SectionCard
            icon="growth"
            title="Growth Justification"
            value=""
            description={growthJustification}
            subheading="WHY THIS PROPERTY"
            progress={40}
            collapseOnMobile
          />
        )}
        {/* Chart Section */}
        {Array.isArray(chartData) && chartData.length > 0 && (
          <div
            className="rounded-2xl p-5 mb-4 shadow animate-fade-in-up col-span-full w-full"
            style={{
              background: CARD_BG,
              boxShadow: GLOW,
              border: `1px solid ${GOLD}33`,
              minHeight: CARD_MIN_HEIGHT,
              gridColumn: "1 / -1",
              width: "100%",
              margin: 0,
            }}
          >
            <div className="flex items-center mb-2">
              <GoldIcon type="chart" />
              <span className="text-sm md:text-base font-semibold uppercase tracking-widest" style={{
                color: "#FFE066",
                letterSpacing: "0.08em",
                fontFamily: "'Inter', 'Poppins', sans-serif",
              }}>
                Projected Value Growth (4 Years)
              </span>
            </div>
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid stroke="#FFD70022" strokeDasharray="6 6" />
                  <XAxis
                    dataKey="year"
                    stroke={GOLD}
                    tick={{ fill: "#fffbe6", fontWeight: 700, fontSize: 12 }}
                    label={{
                      value: "Year",
                      position: "insideBottom",
                      fill: GOLD,
                      fontWeight: 700,
                      fontSize: 12,
                      dy: 16,
                    }}
                    ticks={chartData.map((d: any) => d.year)}
                    domain={[0, Math.max(...chartData.map((d: any) => d.year))]}
                    type="number"
                    allowDecimals={false}
                    axisLine={{ stroke: GOLD }}
                    tickLine={false}
                  />
                  <YAxis
                    stroke={GOLD}
                    tick={{
                      fill: GOLD,
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                    tickFormatter={val =>
                      "AED " +
                      val.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })
                    }
                    domain={[
                      Math.floor(chartData[0].value * 0.95),
                      Math.ceil(chartData[chartData.length - 1].value * 1.05),
                    ]}
                    axisLine={{ stroke: GOLD }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#23243a",
                      borderColor: GOLD,
                      borderRadius: 12,
                      color: GOLD,
                      boxShadow: "0 4px 24px #FFD70033",
                    }}
                    labelStyle={{ color: GOLD, fontWeight: 700, fontSize: 12 }}
                    itemStyle={{ color: "#fffbe6", fontWeight: 700, fontSize: 12 }}
                    formatter={(value: number) => `AED ${value.toLocaleString()}`}
                    cursor={{ stroke: GOLD, strokeWidth: 2, strokeDasharray: "4 4" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={GOLD}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={true}
                    animationDuration={800}
                    activeDot={{
                      r: 6,
                      fill: GOLD,
                      stroke: "#fffbe6",
                      strokeWidth: 2,
                      style: { filter: "drop-shadow(0 0 4px #FFD70088)" },
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(.23,1.01,.32,1) both;
        }
      `}</style>
    </div>
  );
}
