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
    personalLoan: false,
    creditCardDues: false,
    investNow: "",
    seriousBuyer: false,
    interest: "",
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

    // Backend-only rule checks
    const disclaimers: string[] = [];
    // EMI-to-income ratio
    if (emi > 0 && parseFloat(form.monthlyIncome) > 0 && emi > parseFloat(form.monthlyIncome) * 0.4) {
      disclaimers.push("🔴 Your EMI exceeds 40% of income — high financial risk.");
    }
    // Tenure cap due to age
    if (eligibleTenure < maxTenure) {
      disclaimers.push(`🟠 Loan tenure capped due to age. Max possible: ${eligibleTenure} years.`);
    }
    // Minimum income for property price
    const minIncomeRequired = price * 0.004; // Example: 0.4% of property price per month
    if (parseFloat(form.monthlyIncome) < minIncomeRequired) {
      disclaimers.push("🔴 Minimum income not met for property price — try lower budget or longer tenure.");
    }
    // Personal loan/credit card risk
    if (form.personalLoan || form.creditCardDues) {
      disclaimers.push("🔴 High risk due to existing personal loans or credit card debt.");
    }
    // Final approval disclaimer
    disclaimers.push("🔴 Final approval subject to credit profile verification by banks.");

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
        disclaimers,
        propertyValue: price,
      },
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-[#0f0f1b] to-[#121826] py-6 px-2" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      {/* Headline + Intro */}
      <div className="w-full max-w-md mx-auto text-center mt-8 mb-6">
        <h2 className="text-2xl font-bold text-yellow-300 mb-2">Let’s personalize your Dubai property plan 🏡</h2>
        <p className="text-base text-gray-300 font-medium">
          We’ll instantly show your mortgage eligibility, upfront cost, EMI, and best-fit options — based on real rules.
        </p>
      </div>
      {/* Input Form (Card-Based, One Scroll) */}
      <form
        onSubmit={handleCalculate}
        className="w-full max-w-md mx-auto flex flex-col gap-4"
        style={{ borderRadius: 16 }}
      >
        {/* Property Value */}
        <div className="w-full rounded-2xl bg-[#181825] shadow-lg flex flex-col gap-2 px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-yellow-300">💰</span>
            <div className="flex-1">
              <Label htmlFor="propertyPrice" className="block text-white font-semibold mb-1">Property Value (AED)</Label>
              <Input id="propertyPrice" name="propertyPrice" type="number" min={0} placeholder="How much is the property you’re looking to buy?" className="rounded-lg bg-[#23233a] border border-yellow-400 text-white px-4 py-2 w-full" value={form.propertyPrice} onChange={e => setForm({ ...form, propertyPrice: e.target.value })} required />
            </div>
          </div>
          {/* Optional Serious Buyer Toggle */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xl text-yellow-300">🟢</span>
            <Label htmlFor="investNow" className="text-white font-semibold">I have X amount ready to invest now</Label>
            <Input id="investNow" name="investNow" type="text" placeholder="e.g., 2 Cr INR" className="rounded-lg bg-[#23233a] border border-yellow-400 text-white px-2 py-1 w-32" value={form.investNow} onChange={e => setForm({ ...form, investNow: e.target.value, seriousBuyer: !!e.target.value })} />
          </div>
          {/* Down Payment & Upfront Charges Card */}
          {form.propertyPrice && (
            <div className="w-full mt-4 rounded-xl bg-[#23233a] shadow-md px-4 py-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg text-yellow-300">✅</span>
                <span className="text-white font-semibold">
                  Required Minimum Down Payment:{" "}
                  <span className="text-yellow-300 font-bold">
                    {form.resident === "Resident"
                      ? `${(parseFloat(form.propertyPrice) * 0.2).toLocaleString(undefined, { maximumFractionDigits: 0 })} AED (20%)`
                      : `${(parseFloat(form.propertyPrice) * 0.5).toLocaleString(undefined, { maximumFractionDigits: 0 })} AED (50%)`}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg text-yellow-300">💸</span>
                <span className="text-white font-semibold">
                  Upfront Charges (Govt + Broker + Fees):{" "}
                  <span className="text-yellow-300 font-bold">
                    {`${(parseFloat(form.propertyPrice) * 0.12).toLocaleString(undefined, { maximumFractionDigits: 0 })}–${(parseFloat(form.propertyPrice) * 0.16).toLocaleString(undefined, { maximumFractionDigits: 0 })} AED (12–16%)`}
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
        {/* Age */}
        <div className="w-full rounded-2xl bg-[#181825] shadow-lg flex items-center gap-3 px-4 py-4">
          <span className="text-2xl text-yellow-300">🧍‍♂️</span>
          <div className="flex-1">
            <Label htmlFor="age" className="block text-white font-semibold mb-1">Your Age</Label>
            <Input id="age" name="age" type="number" min={21} max={70} placeholder="Enter your age (21–70)" className="rounded-lg bg-[#23233a] border border-yellow-400 text-white px-4 py-2 w-full" value={form.age || ""} onChange={e => setForm({ ...form, age: e.target.value })} required />
          </div>
        </div>
        {/* Resident/NRI Toggle */}
        <div className="w-full rounded-2xl bg-[#181825] shadow-lg flex items-center gap-3 px-4 py-4">
          <span className="text-2xl text-yellow-300">{form.resident === "Resident" ? "🏢" : "✈️"}</span>
          <div className="flex-1 flex items-center gap-4">
            <Label className="text-white font-semibold">Are you a Resident or NRI?</Label>
            <Switch checked={form.resident === "NRI"} onCheckedChange={checked => setForm({ ...form, resident: checked ? "NRI" : "Resident", businessOwner: false })} className="data-[state=checked]:bg-yellow-400" />
            <span className={form.resident === "Resident" ? "text-yellow-300 font-bold" : "text-gray-400"}>Resident</span>
            <span className={form.resident === "NRI" ? "text-yellow-300 font-bold" : "text-gray-400"}>NRI</span>
          </div>
        </div>
        {/* Monthly Income with Currency Toggle */}
        <div className="w-full rounded-2xl bg-[#181825] shadow-lg flex items-center gap-3 px-4 py-4">
          <span className="text-2xl text-yellow-300">🏦</span>
          <div className="flex-1">
            <Label htmlFor="monthlyIncome" className="block text-white font-semibold mb-1">Monthly Income</Label>
            <div className="flex gap-2">
              <Input id="monthlyIncome" name="monthlyIncome" type="number" min={0} placeholder="Enter your monthly income" className="rounded-lg bg-[#23233a] border border-yellow-400 text-white px-4 py-2 w-full" value={form.monthlyIncome} onChange={e => setForm({ ...form, monthlyIncome: e.target.value })} required />
              <Button type="button" className={`rounded-full px-4 py-2 font-bold shadow-md transition-all ${form.currency === "AED" ? "bg-yellow-400 text-black" : "bg-gray-700 text-yellow-300"}`} onClick={() => setForm({ ...form, currency: "AED" })}>AED</Button>
              <Button type="button" className={`rounded-full px-4 py-2 font-bold shadow-md transition-all ${form.currency === "INR" ? "bg-yellow-400 text-black" : "bg-gray-700 text-yellow-300"}`} onClick={() => setForm({ ...form, currency: "INR" })}>INR</Button>
            </div>
          </div>
        </div>
        {/* Interest Rate Range Display */}
        <div className="w-full rounded-2xl bg-[#181825] shadow-lg flex items-center gap-3 px-4 py-4">
          <span className="text-2xl text-yellow-300">📈</span>
          <div className="flex-1">
            <Label htmlFor="interest" className="block text-white font-semibold mb-1">
              Interest Rate (%)
              <span className="ml-2 text-yellow-300 font-medium">
                {form.resident === "Resident" ? "3.2–4.3%" : "4.5–5%"}
              </span>
            </Label>
            <Input
              id="interest"
              name="interest"
              type="number"
              step="0.01"
              min={0}
              className="rounded-lg bg-[#23233a] border border-yellow-400 text-white px-4 py-2 w-full"
              value={form.interest ?? interest}
              onChange={e => setForm({ ...form, interest: e.target.value })}
              placeholder={form.resident === "Resident" ? "3.2–4.3%" : "4.5–5%"}
            />
          </div>
        </div>
        {/* Business Owner Toggle (NRI only) */}
        {form.resident === "NRI" && (
          <div className="w-full rounded-2xl bg-[#181825] shadow-lg flex items-center gap-3 px-4 py-4">
            <span className="text-2xl text-yellow-300">📉</span>
            <div className="flex-1 flex items-center gap-4">
              <Label className="text-white font-semibold">Are you a Business Owner?</Label>
              <Switch checked={form.businessOwner} onCheckedChange={checked => setForm({ ...form, businessOwner: checked })} className="data-[state=checked]:bg-yellow-400" />
              <span className={form.businessOwner ? "text-yellow-300 font-bold" : "text-gray-400"}>Yes</span>
              <span className={!form.businessOwner ? "text-yellow-300 font-bold" : "text-gray-400"}>No</span>
            </div>
          </div>
        )}
        {/* Personal Loan Toggle */}
        <div className="w-full rounded-2xl bg-[#181825] shadow-lg flex items-center gap-3 px-4 py-4">
          <span className="text-2xl text-yellow-300">💳</span>
          <div className="flex-1 flex items-center gap-4">
            <Label className="text-white font-semibold">Do you have any active personal loans?</Label>
            <Switch checked={form.personalLoan || false} onCheckedChange={checked => setForm({ ...form, personalLoan: checked })} className="data-[state=checked]:bg-yellow-400" />
            <span className={form.personalLoan ? "text-yellow-300 font-bold" : "text-gray-400"}>Yes</span>
            <span className={!form.personalLoan ? "text-yellow-300 font-bold" : "text-gray-400"}>No</span>
          </div>
        </div>
        {/* Credit Card Dues Toggle */}
        <div className="w-full rounded-2xl bg-[#181825] shadow-lg flex items-center gap-3 px-4 py-4">
          <span className="text-2xl text-yellow-300">🧾</span>
          <div className="flex-1 flex items-center gap-4">
            <Label className="text-white font-semibold">Do you use credit card with EMIs or dues?</Label>
            <Switch checked={form.creditCardDues || false} onCheckedChange={checked => setForm({ ...form, creditCardDues: checked })} className="data-[state=checked]:bg-yellow-400" />
            <span className={form.creditCardDues ? "text-yellow-300 font-bold" : "text-gray-400"}>Yes</span>
            <span className={!form.creditCardDues ? "text-yellow-300 font-bold" : "text-gray-400"}>No</span>
          </div>
        </div>
        {/* Sticky CTA Button */}
        <div className="sticky bottom-0 w-full z-10">
          <Button
            type="submit"
            className="w-full px-8 py-4 rounded-full font-bold text-base bg-gradient-to-r from-yellow-400 to-yellow-300 text-black shadow-lg hover:shadow-yellow-300/40 transition-all"
            style={{ boxShadow: "0 2px 16px 0 #FFD30033" }}
            disabled={
              !form.propertyPrice ||
              !form.age ||
              !form.monthlyIncome ||
              (form.resident === "NRI" && typeof form.businessOwner === "undefined")
            }
          >
            📊 Show My Mortgage Plan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MortgageEMICalculator;
