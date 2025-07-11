// MortgageEMICalculator.tsx (Mobile-first, dark theme, yellow-accent UI)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const interestRanges = {
  Resident: [3.2, 4.3],
  NRI: [4.5, 5.0],
};

const minSalary = {
  Resident: 10000,
  NRI: 25000,
  NRI_Business: 40000,
};

const maxTenure = 25;

function calculateEMI(P: number, r: number, n: number) {
  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return emi;
}

function getRiskLevel(downPct: number, income: number, resident: string) {
  if (resident === "Resident") {
    if (downPct < 0.2 || income < minSalary.Resident) return "High Risk";
    if (downPct < 0.25 || income < minSalary.Resident * 1.2) return "Okay";
    return "Good";
  } else {
    if (downPct < 0.5 || income < minSalary.NRI) return "High Risk";
    if (downPct < 0.6 || income < minSalary.NRI_Business) return "Okay";
    return "Good";
  }
}

const MortgageEMICalculator = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    propertyPrice: "",
    downPayment: "",
    resident: "Resident",
    monthlyIncome: "",
    businessOwner: false,
    tenure: "",
    tenureType: "years",
    processingFee: "",
    age: "",
    currency: "AED",
  });

  // Interest rate auto-calculation
  const interest =
    form.resident === "Resident"
      ? interestRanges.Resident[0]
      : form.businessOwner
      ? interestRanges.NRI[1]
      : interestRanges.NRI[0];

  // Down payment percent
  const price = parseFloat(form.propertyPrice) || 0;
  const down = parseFloat(form.downPayment) || 0;
  const downPct = price ? down / price : 0;

  // Auto-calculate eligible tenure
  const age = form.age ? Number(form.age) : 0;
  const maxAgeLimit = form.businessOwner ? 70 : 65;
  const eligibleTenure = Math.min(maxTenure, maxAgeLimit - age);
  const tenureMonths = eligibleTenure > 0 ? eligibleTenure * 12 : 0;

  // Calculation handler
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const principal = price - down;
    const rate = interest / 12 / 100;
    const emi = tenureMonths > 0 ? calculateEMI(principal, rate, tenureMonths) : 0;
    const totalPayment = emi * tenureMonths;
    const totalInterest = totalPayment - principal;
    const procFee = form.processingFee ? (parseFloat(form.processingFee) / 100) * principal : 0;
    const totalPayable = totalPayment + procFee;
    let balance = principal;
    let amortization: any[] = [];
    for (let i = 1; i <= tenureMonths; i++) {
      const interestComp = balance * rate;
      const principalComp = emi - interestComp;
      balance -= principalComp;
      amortization.push({
        month: i,
        principal: principalComp > 0 ? principalComp : 0,
        interest: interestComp > 0 ? interestComp : 0,
        balance: balance > 0 ? balance : 0,
      });
    }
    const risk = getRiskLevel(downPct, parseFloat(form.monthlyIncome), form.resident);
    navigate("/mortgage-emi-results", {
      state: {
        emi,
        totalInterest,
        procFee,
        totalPayable,
        principal,
        down,
        downPct,
        tenureMonths,
        eligibleTenure,
        maxAgeLimit,
        amortization,
        risk,
        resident: form.resident,
        businessOwner: form.businessOwner,
        age: form.age,
        monthlyIncome: form.monthlyIncome,
      },
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-[#0f0f1b] to-[#121826] py-6 px-2" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      {/* Header Section */}
      <div className="w-full max-w-md mx-auto text-center mt-8 mb-6">
        <h2 className="text-2xl font-bold text-yellow-300 mb-2">Smart Mortgage & EMI Estimator</h2>
        <p className="text-base text-gray-300 font-medium">
          Personalized loan insights based on your resident status, income, and purchase type
        </p>
      </div>
      {/* Calculator Card */}
      <form
        onSubmit={handleCalculate}
        className="w-full max-w-md mx-auto rounded-2xl border border-yellow-400 bg-gradient-to-br from-[#181825] to-[#23233a] p-6 shadow-xl mb-6"
        style={{ borderWidth: 1, borderRadius: 16 }}
      >
        {/* Age Input */}
        <div className="mb-4">
          <Label htmlFor="age" className="block text-yellow-300 font-medium mb-1">Age</Label>
          <Input id="age" name="age" type="number" min={18} max={65} placeholder="e.g., 40" className="rounded-lg bg-[#181825] border border-yellow-400 text-white px-4 py-2" value={form.age || ""} onChange={e => setForm({ ...form, age: e.target.value })} required />
        </div>
        {/* Currency Toggle */}
        <div className="mb-4 flex items-center gap-4">
          <Label className="text-yellow-300 font-medium">Currency</Label>
          <Button type="button" className={`rounded-full px-4 py-2 font-bold shadow-md transition-all ${form.currency === "AED" ? "bg-yellow-400 text-black" : "bg-gray-700 text-yellow-300"}`} onClick={() => setForm({ ...form, currency: "AED" })}>AED</Button>
          <Button type="button" className={`rounded-full px-4 py-2 font-bold shadow-md transition-all ${form.currency === "INR" ? "bg-yellow-400 text-black" : "bg-gray-700 text-yellow-300"}`} onClick={() => setForm({ ...form, currency: "INR" })}>INR</Button>
        </div>
        <div className="mb-4">
          <Label htmlFor="propertyPrice" className="block text-yellow-300 font-medium mb-1">Property Price ({form.currency || "AED"})</Label>
          <Input id="propertyPrice" name="propertyPrice" type="number" min={0} placeholder={form.currency === "INR" ? "e.g., 2,20,00,000" : "e.g., 2000000"} className="rounded-lg bg-[#181825] border border-yellow-400 text-white px-4 py-2" value={form.propertyPrice} onChange={e => setForm({ ...form, propertyPrice: e.target.value })} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="downPayment" className="block text-yellow-300 font-medium mb-1">Down Payment ({form.currency || "AED"})</Label>
          <Input id="downPayment" name="downPayment" type="number" min={0} placeholder={form.currency === "INR" ? "e.g., 1,10,00,000" : "e.g., 400000"} className="rounded-lg bg-[#181825] border border-yellow-400 text-white px-4 py-2" value={form.downPayment} onChange={e => setForm({ ...form, downPayment: e.target.value })} required />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <Label className="text-yellow-300 font-medium">Resident Status</Label>
          <div className="flex items-center gap-2">
            <span className={form.resident === "Resident" ? "text-yellow-300 font-bold" : "text-gray-400"}>Resident</span>
            <Switch checked={form.resident === "NRI"} onCheckedChange={checked => setForm({ ...form, resident: checked ? "NRI" : "Resident", businessOwner: false })} className="data-[state=checked]:bg-yellow-400" />
            <span className={form.resident === "NRI" ? "text-yellow-300 font-bold" : "text-gray-400"}>Non-Resident</span>
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="monthlyIncome" className="block text-yellow-300 font-medium mb-1">Monthly Income ({form.currency || "AED"})</Label>
          <Input id="monthlyIncome" name="monthlyIncome" type="number" min={0} placeholder={form.currency === "INR" ? "e.g., 1,00,000" : "e.g., 25000"} className="rounded-lg bg-[#181825] border border-yellow-400 text-white px-4 py-2" value={form.monthlyIncome} onChange={e => setForm({ ...form, monthlyIncome: e.target.value })} required />
        </div>
        {form.resident === "NRI" && (
          <div className="mb-4 flex items-center gap-2">
            <Switch checked={form.businessOwner} onCheckedChange={checked => setForm({ ...form, businessOwner: checked })} className="data-[state=checked]:bg-yellow-400" />
            <Label className="text-yellow-300 font-medium">Business Owner (Self-Employed)</Label>
          </div>
        )}
        <div className="mb-4">
          <Label htmlFor="processingFee" className="block text-yellow-300 font-medium mb-1">Processing Fee % (optional)</Label>
          <Input id="processingFee" name="processingFee" type="number" step="0.01" min={0} placeholder="e.g., 1" className="rounded-lg bg-[#181825] border border-yellow-400 text-white px-4 py-2" value={form.processingFee} onChange={e => setForm({ ...form, processingFee: e.target.value })} />
        </div>
        <div className="mb-2">
          <Label className="block text-yellow-300 font-medium mb-1">Interest Rate (%)</Label>
          <Input id="interest" name="interest" type="number" step="0.01" min={0} className="rounded-lg bg-[#181825] border border-yellow-400 text-white px-4 py-2" value={interest} readOnly />
        </div>
        {/* Dynamic Disclaimers */}
        <div className="mb-4">
          {(() => {
            const age = form.age ? Number(form.age) : 0;
            const income = form.monthlyIncome ? Number(form.monthlyIncome) : 0;
            const principal = price - (form.downPayment ? Number(form.downPayment) : 0);
            const rate = interest / 12 / 100;
            const months = form.tenure ? Math.min(Number(form.tenure), maxTenure) * 12 : 60;
            const emi = principal > 0 && months > 0 && rate > 0 ? calculateEMI(principal, rate, months) : 0;
            let minIncome = form.resident === "Resident" ? minSalary.Resident : (form.businessOwner ? minSalary.NRI_Business : minSalary.NRI);
            let messages = [];
            if (income < minIncome) {
              messages.push(<div key="income" className="text-red-400 font-bold mb-1">Not eligible: Minimum monthly income is {minIncome.toLocaleString()} {form.currency}</div>);
            }
            if (age > 65) {
              messages.push(<div key="age" className="text-red-400 font-bold mb-1">Ineligible due to age (must be ≤ 65)</div>);
            }
            if (emi > income * 0.4) {
              messages.push(<div key="afford" className="text-yellow-300 font-bold mb-1">Warning: EMI exceeds 40% of monthly income</div>);
            }
            if (form.resident === "NRI") {
              messages.push(<div key="nri" className="text-yellow-300 font-medium mb-1">Note: Loan offers vary by bank for non-residents</div>);
            }
            return messages.length > 0 ? messages : null;
          })()}
        </div>
        <Button type="submit" className="w-full mt-4 px-8 py-3 rounded-full font-bold text-base bg-gradient-to-r from-yellow-400 to-yellow-300 text-black shadow-md hover:shadow-yellow-300/40 transition-all" style={{ boxShadow: "0 2px 16px 0 #FFD30033" }}>
          Calculate
        </Button>
      </form>
    </div>
  );
};

export default MortgageEMICalculator;
