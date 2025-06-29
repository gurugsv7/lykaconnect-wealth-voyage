import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { fetchGeminiAnswer } from "@/utils/geminiApi";

const propertyTypes = ["Apartment", "Villa", "Townhouse", "Plot"];
const scenarios = ["Optimistic", "Realistic", "Conservative"];
const growthFactors = [
  "Infrastructure Development",
  "Metro Expansion",
  "Expo Legacy",
  "Population Growth",
  "Economic Diversification",
  "Tourism Growth",
  "Business Hub Development",
];

function parseGeminiResult(result: string) {
  let estimatedValue = "";
  let assumption = "";
  let location = "";
  let growthJustification = "";
  let chartData: { year: number; value: number }[] = [];

  const estMatch = result.match(/Estimated Future Value\s*[:\-]?\s*(.+)/i);
  if (estMatch) estimatedValue = estMatch[1].trim();

  const assumpMatch = result.match(/Assumption Adjustment\s*[:\-]?\s*(.+)/i);
  if (assumpMatch) assumption = assumpMatch[1].trim();

  const locMatch = result.match(/Location Insight\s*[:\-]?\s*(.+)/i);
  if (locMatch) location = locMatch[1].trim();

  const growthMatch = result.match(/Growth Justification\s*[:\-]?\s*([\s\S]*?)(?:\n[A-Z][a-z]+|$)/i);
  if (growthMatch) growthJustification = growthMatch[1].trim();

  const chartMatch = result.match(/Chart Data\s*[:\-]?\s*([\s\S]*)/i);
  if (chartMatch) {
    const lines = chartMatch[1].split("\n").filter(Boolean);
    chartData = lines
      .map(line => {
        const m = line.match(/(\d+)[^\d]+([\d,]+)/);
        if (m) {
          return { year: parseInt(m[1]), value: parseInt(m[2].replace(/,/g, "")) };
        }
        return null;
      })
      .filter(Boolean) as { year: number; value: number }[];
  }

  if (!chartData.length) {
    const arrMatch = result.match(/\[\s*{[\s\S]+}\s*\]/);
    if (arrMatch) {
      try {
        chartData = JSON.parse(arrMatch[0]);
      } catch {}
    }
  }

  return {
    estimatedValue,
    assumption,
    location,
    growthJustification,
    chartData,
  };
}

const CapitalAppreciationEstimator = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    propertyType: "",
    location: "",
    currentPrice: "",
    area: "",
    horizon: "",
    scenario: "",
    factors: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFactorChange = (factor: string) => {
    setForm((prev) => ({
      ...prev,
      factors: prev.factors.includes(factor)
        ? prev.factors.filter((f) => f !== factor)
        : [...prev.factors, factor],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const prompt = `
You are a Dubai real estate AI. Given the following property details, estimate the property's value after ${form.horizon} years under a ${form.scenario} scenario. 
Respond ONLY in this format:

Estimated Future Value: (eg. AED 2,150,000)
Assumption Adjustment: (eg. Annual appreciation rate assumed: 8%)
Location Insight: (eg. Downtown Dubai - prime location, high demand)
Growth Justification: (eg. Ongoing infrastructure, premium amenities, Expo legacy)
Chart Data:
Year 0: (current price)
Year 1: (value)
Year 2: (value)
Year 3: (value)
Year 4: (value)

--- PROPERTY DETAILS ---
Name: ${form.name}
Email: ${form.email}
Property Type: ${form.propertyType}
Location: ${form.location}
Current Price: AED ${form.currentPrice}
Area: ${form.area} sq ft
Growth Factors: ${form.factors.join(", ")}

Respond ONLY in the above format. Do not add any extra explanation or summary.
`;
    try {
      const answer = await fetchGeminiAnswer(prompt);
      console.log("Gemini raw answer:", answer);
      setLoading(false);
      const parsed = parseGeminiResult(answer);
      navigate("/capital-appreciation-results", { state: { ...parsed } });
    } catch (err) {
      setLoading(false);
      navigate("/capital-appreciation-results", { state: { error: "Sorry, there was an error fetching your estimate." } });
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0f1b] to-[#121826] py-12 px-2"
      style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
    >
      {/* Back to Home Button */}
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
      {/* Title and subtitle above border, centered */}
      <div className="w-full max-w-[1000px] mx-auto mb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Capital Appreciation Estimator
        </h2>
        <p className="text-lg text-gray-300 font-medium">
          AI-powered property value forecasting with market analysis
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[1000px] mx-auto rounded-2xl border border-yellow-400 bg-gradient-to-br from-[#0f0f1b] to-[#121826] p-8 md:p-12 shadow-xl"
        style={{ borderWidth: 1, borderRadius: 16 }}
      >
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-white font-medium mb-2" htmlFor="name">
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="rounded-[10px] bg-[#181825] border border-[#FFD300] text-white placeholder:text-gray-400 px-4 py-3"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@email.com"
              className="rounded-[10px] bg-[#181825] border border-[#FFD300] text-white placeholder:text-gray-400 px-4 py-3"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-white font-medium mb-2" htmlFor="propertyType">
              Property Type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              className="rounded-[10px] bg-[#181825] border border-[#FFD300] text-white px-4 py-3 w-full"
              value={form.propertyType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select property type
              </option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-white font-medium mb-2" htmlFor="location">
              Location
            </label>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="e.g., Dubai Marina"
              className="rounded-[10px] bg-[#181825] border border-[#FFD300] text-white placeholder:text-gray-400 px-4 py-3"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* Third Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div>
            <label className="block text-white font-medium mb-2" htmlFor="currentPrice">
              Current Price (AED)
            </label>
            <Input
              id="currentPrice"
              name="currentPrice"
              type="number"
              min={0}
              placeholder="e.g., 1500000"
              className="rounded-[10px] bg-[#181825] border border-[#FFD300] text-white placeholder:text-gray-400 px-4 py-3"
              value={form.currentPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2" htmlFor="area">
              Area (sq ft)
            </label>
            <Input
              id="area"
              name="area"
              type="number"
              min={0}
              placeholder="e.g., 1200"
              className="rounded-[10px] bg-[#181825] border border-[#FFD300] text-white placeholder:text-gray-400 px-4 py-3"
              value={form.area}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2" htmlFor="horizon">
              Time Horizon (Years)
            </label>
            <Input
              id="horizon"
              name="horizon"
              type="number"
              min={1}
              placeholder="e.g., 5"
              className="rounded-[10px] bg-[#181825] border border-[#FFD300] text-white placeholder:text-gray-400 px-4 py-3"
              value={form.horizon}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2" htmlFor="scenario">
              Economic Scenario
            </label>
            <select
              id="scenario"
              name="scenario"
              className="rounded-[10px] bg-[#181825] border border-[#FFD300] text-white px-4 py-3 w-full"
              value={form.scenario}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select scenario
              </option>
              {scenarios.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Market Growth Factors */}
        <div className="mb-8">
          <label className="block text-white font-medium mb-3">
            Market Growth Factors
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {growthFactors.map((factor) => (
              <label
                key={factor}
                className="flex items-center space-x-2 text-gray-200 text-sm"
              >
                <Checkbox
                  checked={form.factors.includes(factor)}
                  onCheckedChange={() => handleFactorChange(factor)}
                  className="border-yellow-400 text-yellow-400 focus:ring-yellow-400"
                />
                <span>{factor}</span>
              </label>
            ))}
          </div>
        </div>
        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-full md:w-auto px-8 py-3 rounded-full font-bold text-base bg-gradient-to-r from-[#FFD300] to-[#FFA500] text-black shadow-md hover:shadow-yellow-300/40 transition-all"
            style={{
              boxShadow: "0 2px 16px 0 #FFD30033",
              fontFamily: "'Inter', 'Poppins', sans-serif",
            }}
            disabled={loading}
          >
            {loading ? "Calculating..." : "Calculate Future Value"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CapitalAppreciationEstimator;
