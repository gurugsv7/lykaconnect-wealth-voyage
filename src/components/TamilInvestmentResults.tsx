import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const GOLD = "#FFD300";
const NAVY = "#0f0f1b";
const CARD_BG = "#18192a";
const CARD_INNER_BG = "#23243a";
const FADED_LINE = "#FFD70044";

const TamilInvestmentResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const form = location.state?.form;
  const aiResult = location.state?.aiResult;

  if (!form) {
    navigate("/tamil-investment-analysis");
    return null;
  }

  // Slider state
  const [years, setYears] = useState(6);

  // Currency state and conversion rates
  type Currency = "AED" | "USD" | "INR";
  const [currency, setCurrency] = useState<Currency>("AED");
  const conversionRates: Record<Currency, number> = {
    AED: 1,
    USD: 0.272,
    INR: 22.36,
  };
  const currencySymbols: Record<Currency, string> = {
    AED: "AED",
    USD: "$",
    INR: "₹",
  };
  // Format numbers per currency
  function formatCurrency(value: number, curr: Currency = currency) {
    let formatted: string;
    if (curr === "AED") {
      formatted = `${currencySymbols[curr]} ${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
    } else if (curr === "USD") {
      formatted = `${currencySymbols[curr]}${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
    } else if (curr === "INR") {
      // Indian numbering system
      formatted = `${currencySymbols[curr]}${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
    } else {
      formatted = value.toString();
    }
    return formatted;
  }
  function convert(value: number, curr: Currency = currency) {
    return Math.round(value * conversionRates[curr]);
  }

  // Get user input price and location
  const initialValue = form?.price ? parseFloat(form.price.toString().replace(/,/g, "")) : 100000;

  // Capital appreciation rates per location
  const appreciationRates: Record<string, number> = {
    "Jumeirah Village Circle (JVC)": 0.13,
    "Dubai Marina": 0.11,
    "Business Bay": 0.08,
    "Downtown Dubai": 0.08,
    "Jumeirah Lake Towers (JLT)": 0.07,
    "Palm Jumeirah": 0.10,
    "Arabian Ranches": 0.09,
    "Dubai Hills Estate": 0.10,
    "Al Barsha": 0.06,
    "Al Furjan": 0.08,
    "Jumeirah Beach Residence (JBR)": 0.10,
    "DAMAC Hills": 0.08,
    "Dubai Sports City": 0.07,
    "Dubai Silicon Oasis": 0.06,
    "Meydan": 0.08,
    "Mirdif": 0.06,
    "International City": 0.07,
    "The Greens": 0.07,
    "The Views": 0.07,
    "Arjan": 0.08,
    "Dubai Creek Harbour": 0.10,
    "Town Square": 0.07,
    "Bluewaters Island": 0.10,
    "Dubai South": 0.09,
    "Jumeirah Golf Estates": 0.09,
    "Discovery Gardens": 0.07,
    "Motor City": 0.08,
    "IMPZ (Production City)": 0.09,
    "The Springs": 0.08,
    "Al Quoz": 0.06,
    "Al Khail Heights": 0.07,
  };
  // Use user's selected location for appreciation rate, fallback to 8%
  const appreciationRate =
    appreciationRates[form?.location?.trim()] ?? 0.08;

  // Extract Annual Rent from aiResult
  let annualRent = 30000; // fallback default
  if (aiResult) {
    const match = aiResult.match(/Annual Rent:\s*AED\s*([\d,]+)/i);
    if (match) {
      annualRent = parseInt(match[1].replace(/,/g, ""), 10);
    }
  }
  const monthlyRent = Math.round(annualRent / 12);
  const totalRent = annualRent * years;
  const appreciatedValue = initialValue * Math.pow(1 + appreciationRate, years);
  const totalGain = appreciatedValue - initialValue;
  const roi = ((totalGain + totalRent) / initialValue) * 100;

  // Always show 10 years on the X axis
  // Calculate property value, cumulative rent, and total wealth for each year
  const allWealthData = Array.from({ length: 10 }, (_, i) => {
    const year = i + 1;
    const propertyValue = Math.round(initialValue * Math.pow(1 + appreciationRate, year));
    const cumulativeRent = annualRent * year;
    const totalWealth = propertyValue + cumulativeRent;
    return {
      year,
      value: propertyValue,
      cumulativeRent,
      totalWealth,
    };
  });
  // Data for the animated yellow line (up to selected year)
  const activeWealthData = allWealthData.slice(0, years);

  // Find the first year when total wealth >= 3.67 million
  const millionaireTarget = 3670000;
  const millionaireYearObj = allWealthData.find(y => y.totalWealth >= millionaireTarget);
  const millionaireYear = millionaireYearObj ? millionaireYearObj.year : null;
  const millionaireWealth = millionaireYearObj ? millionaireYearObj.totalWealth : null;
  // Progress should use the current year's total wealth (as shown in the chart)
  const currentTotalWealth = allWealthData[years - 1]?.totalWealth ?? 0;
  const millionaireProgress = Math.min(100, Math.round((currentTotalWealth / millionaireTarget) * 100));

  // Extract Millionaire Timeline and AI Investment Summary from aiResult
  let millionaireTimeline = null;
  let aiSummary = null;
  if (aiResult) {
    // Robustly extract the full AI Investment Summary section (Tamil + English)
    const summaryMatch = aiResult.match(/AI Investment Summary[\s\S]*?(?=\n\d+\.\s|$)/i);
    if (summaryMatch) {
      aiSummary = summaryMatch[0]
        .replace(/^7\.\s*AI Investment Summary\s*/i, "")
        .replace(/^AI Investment Summary\s*/i, "")
        .trim();
    }
    // Robustly extract Millionaire Timeline section
    const timelineMatch = aiResult.match(/Millionaire Timeline[\s\S]*?(?=\n\d+\.\s|$)/i);
    if (timelineMatch) {
      millionaireTimeline = timelineMatch[0]
        .replace(/^4\.\s*Millionaire Timeline\s*/i, "")
        .replace(/^Millionaire Timeline\s*/i, "")
        .trim();
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0f0f1b] py-10 px-2 flex flex-col items-center font-sans">
        <Button
          onClick={() => navigate("/tamil-investment-analysis")}
          className="mb-8 self-start bg-[#FFD300] hover:bg-yellow-400 text-black font-bold px-6 py-2 rounded-lg shadow transition-all"
          style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
        >
          ← Back to Analysis
        </Button>

      {/* Results Header */}
      <div className="w-full max-w-4xl flex flex-col gap-6">
        {/* Currency Toggle */}
        <div className="flex flex-row justify-end items-center gap-2 mb-2">
          <span className="text-[#FFD700] font-bold text-lg">Currency:</span>
          <Select value={currency} onValueChange={v => setCurrency(v as Currency)}>
            <SelectTrigger className="w-28 bg-[#23243a] border-[#FFD700] text-[#FFD700] font-bold rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#23243a] border-[#FFD700] text-[#FFD700]">
              <SelectItem value="AED">AED</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="INR">INR</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#FFD300] mb-2 tracking-wide uppercase" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
            Investment Results
          </h1>
        </div>
        {/* Millionaire Timeline */}
        <Card className="mb-2 bg-[#18192a] border-2 border-[#FFD700] rounded-2xl shadow w-full">
          <CardContent className="p-8">
            <div className="text-2xl font-bold text-[#FFD700] mb-2">Millionaire Timeline</div>
            <div className="text-lg text-[#fffbe6] mb-4" style={{ lineHeight: 1.7 }}>
              {convert(allWealthData[0].totalWealth) >= convert(millionaireTarget) ? (
                <span>
                  <span className="font-bold text-[#FFD700]">You're already a millionaire!</span>
                  <br />
                  Starting wealth: <span className="text-[#FFD700] font-semibold">{formatCurrency(convert(allWealthData[0].totalWealth))}</span>
                </span>
              ) : millionaireYear ? (
                <>
                  You will reach <span className="font-bold text-[#FFD700]">{formatCurrency(convert(millionaireTarget))}</span> in total wealth (property value + cumulative rent) in <span className="font-bold text-[#FFD700]">Year {millionaireYear}</span>.
                  <br />
                  <span className="text-[#FFD700] font-semibold">Projected Wealth: {formatCurrency(convert(millionaireWealth ?? 0))}</span>
                </>
              ) : (
                <>
                  You will not reach {formatCurrency(convert(millionaireTarget))} in total wealth within 10 years.
                  <br />
                  <span className="text-[#FFD700] font-semibold">Projected Wealth after 10 years: {formatCurrency(convert(allWealthData[allWealthData.length - 1].totalWealth))}</span>
                </>
              )}
            </div>
            
          </CardContent>
        </Card>

        {/* Line Chart Section */}
        <div className="bg-[#18192a] border-2 border-[#FFD700] rounded-2xl px-2 py-4 mb-4 shadow-lg mt-6 max-w-full" style={{ paddingLeft: 24 }}>
          <div className="text-lg sm:text-2xl font-bold text-[#FFD700] mb-4 text-center tracking-wide uppercase">
            Wealth Growth Over Time
          </div>
          <div className="w-full flex justify-center items-center px-1 sm:px-4"
            style={{
              height: "min(260px, 70vw)",
              maxHeight: 340,
              minHeight: 180,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={allWealthData}
                margin={{
                  top: 24,
                  right: 16,
                  left: 32,
                  bottom: 24,
                }}
              >
                <CartesianGrid stroke="#FFD70033" strokeDasharray="4 4" />
                <XAxis
                  dataKey="year"
                  stroke={GOLD}
                  tick={{
                    fill: "#FFD700",
                    fontWeight: 900,
                    fontSize: 14,
                  }}
                  label={{
                    value: "Years",
                    position: "insideBottom",
                    fill: "#FFD700",
                    fontWeight: 900,
                    fontSize: 16,
                    dy: 18,
                    textAnchor: "middle",
                  }}
                  domain={[1, 10]}
                  type="number"
                  allowDecimals={false}
                  ticks={[1,2,3,4,5,6,7,8,9,10]}
                  tickLine={false}
                  axisLine={{ stroke: GOLD }}
                  allowDataOverflow={false}
                  padding={{ left: 8, right: 8 }}
                  interval={0}
                  minTickGap={0}
                />
                <YAxis
                  stroke={GOLD}
                  width={48}
                  tick={{
                    fill: "#FFD700",
                    fontWeight: 900,
                    fontSize: 13,
                  }}
                  label={{
                    value: "Property Value (AED)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#FFD700",
                    fontWeight: 900,
                    fontSize: 15,
                    dx: -80,
                    dy: 64,
                    textAnchor: "middle",
                  }}
                  tickLine={false}
                  axisLine={{ stroke: GOLD }}
                  domain={[0, Math.ceil(initialValue * 2.5 / 10000) * 10000]}
                  ticks={
                    (() => {
                      const max = Math.ceil(initialValue * 2.5 / 10000) * 10000;
                      let step = 50000;
                      if (max > 1000000) step = 250000;
                      else if (max > 500000) step = 100000;
                      else if (max > 200000) step = 50000;
                      else if (max > 100000) step = 25000;
                      else if (max > 50000) step = 10000;
                      const ticks = [];
                      for (let v = 0; v <= max; v += step) {
                        ticks.push(v);
                      }
                      if (ticks[ticks.length - 1] !== max) ticks.push(max);
                      return ticks;
                    })()
                  }
                  tickFormatter={val =>
                    formatCurrency(convert(val))
                  }
                  allowDataOverflow={false}
                  padding={{ top: 18, bottom: 32 }}
                  tickMargin={12}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload || !payload.length) return null;
                    const year = payload[0].payload.year;
                    const value = payload[0].payload.value;
                    return (
                      <div
                        className="rounded-xl bg-[#18192a] border-2 border-[#FFD700] px-4 py-3 text-center shadow-lg"
                        style={{
                          minWidth: 120,
                          color: "#FFD700",
                          fontWeight: 900,
                          fontSize: 18,
                          zIndex: 50,
                          margin: "0 auto",
                        }}
                      >
                        <div style={{ fontSize: 16, fontWeight: 700 }}>
                          Year {year}: {formatCurrency(convert(value))}
                        </div>
                      </div>
                    );
                  }}
                  wrapperStyle={{
                    pointerEvents: "auto",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                  cursor={{ stroke: GOLD, strokeWidth: 2, strokeDasharray: "3 5" }}
                  isAnimationActive={true}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={GOLD}
                  strokeWidth={3}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={700}
                  strokeDasharray="5 6"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  style={{
                    filter: "drop-shadow(0 0 10px #FFD70088)",
                  }}
                />
                {/* Highlight active year dot */}
                {years > 0 && (
                  <Line
                    type="monotone"
                    dataKey="value"
                    data={activeWealthData}
                    stroke="none"
                    dot={(props) =>
                      props.index === activeWealthData.length - 1 ? (
                        <g>
                          <circle
                            cx={props.cx}
                            cy={props.cy}
                            r={9}
                            fill="#FFD700"
                            filter="drop-shadow(0 0 12px #FFD70088)"
                          />
                          <text
                            x={props.cx}
                            y={props.cy - 16}
                            textAnchor="middle"
                            fontSize={13}
                            fontWeight="bold"
                            fill="#FFD700"
                            stroke="#18192a"
                            strokeWidth="0.5"
                          >
                            {formatCurrency(convert(props.payload.value))}
                          </text>
                        </g>
                      ) : null
                    }
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col items-center mt-4 px-2">
            <label htmlFor="yearRange" className="text-sm font-semibold mb-2 flex items-center text-white">
              <span>Year:</span>
              <span className="ml-2 text-[#FFD700] text-lg font-bold">{years}</span>
            </label>
            <input
              id="yearRange"
              type="range"
              min={1}
              max={10}
              value={years}
              onChange={e => setYears(Number(e.target.value))}
              className="w-full accent-[#FFD700] h-3 rounded-lg outline-none"
              style={{
                maxWidth: 420,
                background: "linear-gradient(90deg, #FFD700 60%, #fffbe6 100%)",
                touchAction: "pan-x",
              }}
            />
          </div>
        </div>

        {/* Slider Section - moved below chart */}
        {/* (removed, now inside chart card) */}

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          {/* Projected Rental Income */}
          <div className="rounded-2xl bg-[#18192a] border-2 border-[#FFD300] shadow flex flex-col">
            <div className="text-[#FFD300] text-lg font-bold px-6 pt-6 pb-2">Projected Rental Income</div>
            <div className="px-6 pb-6 pt-2 text-base text-[#fff] flex flex-col gap-2">
              <ul className="list-disc list-inside text-[#fffbe6] space-y-1">
                <li>Monthly Rent: <span className="font-semibold text-[#FFD300]">{formatCurrency(convert(monthlyRent))}</span></li>
                <li>Annual Rent: <span className="font-semibold text-[#FFD300]">{formatCurrency(convert(annualRent))}</span></li>
                <li>Total Rent ({years} yrs): <span className="font-semibold text-[#FFD300]">{formatCurrency(convert(totalRent))}</span></li>
              </ul>
            </div>
          </div>
          {/* Capital Appreciation */}
          <div className="rounded-2xl bg-[#18192a] border-2 border-[#FFD300] shadow flex flex-col">
            <div className="text-[#FFD300] text-lg font-bold px-6 pt-6 pb-2">Capital Appreciation</div>
            <div className="px-6 pb-6 pt-2 text-base text-[#fff] flex flex-col gap-2">
              <ul className="list-disc list-inside text-[#fffbe6] space-y-1">
                <li>Appreciation Rate: <span className="font-semibold text-[#FFD300]">{(appreciationRate * 100).toFixed(2)}% / year</span></li>
                <li>Value in {years} yrs: <span className="font-semibold text-[#FFD300]">{formatCurrency(convert(allWealthData[years-1]?.value ?? 0))}</span></li>
                <li>Total Gain: <span className="font-semibold text-[#FFD300]">{formatCurrency(convert((allWealthData[years-1]?.value ?? 0) - initialValue))}</span></li>
              </ul>
            </div>
          </div>
          {/* ROI Summary */}
          <div className="rounded-2xl bg-[#18192a] border-2 border-[#FFD300] shadow flex flex-col">
            <div className="text-[#FFD300] text-lg font-bold px-6 pt-6 pb-2">ROI Summary</div>
            <div className="px-6 pb-6 pt-2 text-base text-[#fff] flex flex-col gap-2">
              <ul className="list-disc list-inside text-[#fffbe6] space-y-1">
                <li>Overall ROI: <span className="font-semibold text-[#FFD300]">{roi.toFixed(2)}%</span></li>
                <li>Total Expected Return: <span className="font-semibold text-[#FFD300]">{formatCurrency(convert(Math.round(totalGain + totalRent)))}</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* AI Investment Summary ONLY */}
        <div className="w-full flex flex-col gap-6 mt-8">
          {aiSummary && (
            <Card className="mb-6 bg-[#18192a] border-2 border-[#FFD700] rounded-2xl shadow w-full">
              <CardContent className="p-8">
                <div className="text-2xl font-bold text-[#FFD700] mb-4">AI Investment Summary</div>
                <div className="bg-[#fffbe6] rounded-xl p-6 mb-2 shadow-inner">
                  <div className="text-[#18192a] text-lg leading-relaxed">
                    {aiSummary
                      .replace(/\*/g, "")
                      .replace(/\(Tamil\s*\+\s*English\)/gi, "")
                      .replace(/English:/gi, "")
                      .replace(/Tamil:.*/gis, "")
                      .trim()}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default TamilInvestmentResults;
