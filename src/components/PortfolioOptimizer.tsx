import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { fetchGeminiAnswer } from "@/utils/geminiApi";

const goalsList = [
  "Maximize Rental Income",
  "Capital Appreciation",
  "Portfolio Diversification",
  "Risk Mitigation",
  "Long-term Wealth",
  "Tax Optimization",
];

const PortfolioOptimizer = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "5000000",
    risk: "Moderate",
    horizon: "10",
    goals: [] as string[],
  });
  const [result, setResult] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGoalChange = (goal: string) => {
    setForm((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    const prompt = `
You are an AI portfolio optimizer for Dubai real estate. Given the following user profile, analyze and recommend an optimal investment portfolio allocation and strategy:
Name: ${form.name}
Email: ${form.email}
Budget: AED ${form.budget}
Risk Tolerance: ${form.risk}
Investment Horizon: ${form.horizon} years
Goals: ${form.goals.join(", ")}
Respond with a recommended allocation and a brief explanation.`;
    try {
      setResult("Analyzing...");
      const answer = await fetchGeminiAnswer(prompt);
      setResult(answer);
    } catch (err) {
      setResult("Sorry, there was an error fetching your portfolio analysis.");
    }
  };

  return (
    <section className="py-16 min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-800 flex items-center justify-center">
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
      <div className="w-full max-w-xl bg-slate-900 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          AI Portfolio Optimizer
        </h2>
        <p className="text-gray-400 mb-8">
          Intelligent portfolio analysis and optimization recommendations
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-1">Full Name</label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Email Address</label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">
              Total Investment Budget (AED)
            </label>
            <Input
              name="budget"
              type="number"
              value={form.budget}
              onChange={handleChange}
              required
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Risk Tolerance</label>
            <RadioGroup
              value={form.risk}
              onValueChange={(val) => setForm({ ...form, risk: val })}
              className="flex space-x-6"
            >
              <RadioGroupItem value="Low" id="risk-low" />
              <label htmlFor="risk-low" className="text-gray-400 mr-4">Low</label>
              <RadioGroupItem value="Moderate" id="risk-moderate" />
              <label htmlFor="risk-moderate" className="text-gray-400 mr-4">Moderate</label>
              <RadioGroupItem value="High" id="risk-high" />
              <label htmlFor="risk-high" className="text-gray-400">High</label>
            </RadioGroup>
          </div>
          <div>
            <label className="block text-gray-300 mb-1">
              Investment Horizon (Years)
            </label>
            <Input
              name="horizon"
              type="number"
              value={form.horizon}
              onChange={handleChange}
              required
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Investment Goals</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {goalsList.map((goal) => (
                <label key={goal} className="flex items-center space-x-2 text-gray-400">
                  <Checkbox
                    checked={form.goals.includes(goal)}
                    onCheckedChange={() => handleGoalChange(goal)}
                  />
                  <span>{goal}</span>
                </label>
              ))}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold rounded-lg py-2 text-base shadow-md hover:from-amber-500 hover:to-amber-700"
          >
            Analyze Portfolio
          </Button>
        </form>
        {result && (
          <div className="mt-6 text-center text-lg text-yellow-300 font-semibold bg-[#181825] rounded-xl p-6 border border-yellow-900/30">
            {result}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioOptimizer;
