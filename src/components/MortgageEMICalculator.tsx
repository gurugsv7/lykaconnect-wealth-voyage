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
<div
      className="min-h-screen w-full flex flex-col items-center justify-start py-6 px-2"
      style={{
        background: "linear-gradient(135deg, #f9f7fa 0%, #f4f0f7 100%)",
        fontFamily: "'Inter', 'Poppins', sans-serif",
      }}
    >
      {/* Headline + Intro */}
      <div className="w-full max-w-md mx-auto text-center mt-4 mb-4 flex flex-col items-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-2 flex justify-center items-center gap-2 leading-tight"
          style={{
            color: "#720D4C",
            fontFamily: "'Inter', 'Poppins', sans-serif",
            letterSpacing: "-0.01em",
            marginTop: "0.5rem",
            textShadow: "0 2px 6px #E0A93533",
          }}
        >
          Let’s personalize your Dubai property plan 🏡
        </h2>
        <p className="text-base md:text-lg font-medium max-w-xl mx-auto mb-2 leading-snug" style={{ color: "#1F1F1F", fontWeight: 400 }}>
          We’ll instantly show your mortgage eligibility, upfront cost, EMI, and best-fit options — based on real rules.
        </p>
      </div>
      {/* Input Form (Card-Based, One Scroll) */}
      <div className="w-full max-w-md mx-auto" style={{ minHeight: "400px" }}>
        <form
          onSubmit={handleCalculate}
          className="flex flex-col gap-4 pb-24"
          style={{ borderRadius: 16 }}
        >
          {/* Property Value */}
        <div
          className="w-full rounded-2xl bg-white border-2 border-[#E0A935] shadow-lg flex flex-col gap-2 px-4 py-4"
          style={{
            boxShadow: "0 4px 24px 0 rgba(224,169,53,0.08), 0 0 0 1.5px #E0A93522 inset",
            border: "1.5px solid #f4e8c7",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl" style={{ color: "#E0A935" }}>💰</span>
            <div className="flex-1">
              <Label htmlFor="propertyPrice" className="block font-semibold mb-1" style={{ color: "#720D4C" }}>Property Value (AED)</Label>
              <Input id="propertyPrice" name="propertyPrice" type="number" min={0} placeholder="How much is the property you’re looking to buy?" className="rounded-lg bg-white border border-[#E0A935] text-[#18192a] px-4 py-2 w-full focus:outline-none focus:border-[#720D4C] transition-all" value={form.propertyPrice} onChange={e => setForm({ ...form, propertyPrice: e.target.value })} required />
            </div>
          </div>
          {/* Optional Serious Buyer Toggle */}
          {/* Removed "I have X amount" input */}
          {/* Down Payment & Upfront Charges Card */}
          {form.propertyPrice && (
            <div className="w-full mt-4 rounded-xl bg-[#f9f7fa] shadow-md px-4 py-3 flex flex-col gap-2 border border-[#E0A935]">
              <div className="flex items-center gap-2">
                <span className="text-lg" style={{ color: "#E0A935" }}>✅</span>
                <span className="font-semibold" style={{ color: "#720D4C" }}>
                  Required Minimum Down Payment:{" "}
                  <span className="font-bold" style={{ color: "#E0A935" }}>
                    {form.resident === "Resident"
                      ? `${(parseFloat(form.propertyPrice) * 0.2).toLocaleString(undefined, { maximumFractionDigits: 0 })} AED (20%)`
                      : `${(parseFloat(form.propertyPrice) * 0.5).toLocaleString(undefined, { maximumFractionDigits: 0 })} AED (50%)`}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg" style={{ color: "#E0A935" }}>💸</span>
                <span className="font-semibold" style={{ color: "#720D4C" }}>
                  Upfront Charges (Govt + Broker + Fees):{" "}
                  <span className="font-bold" style={{ color: "#E0A935" }}>
                    {`${(parseFloat(form.propertyPrice) * 0.12).toLocaleString(undefined, { maximumFractionDigits: 0 })}–${(parseFloat(form.propertyPrice) * 0.16).toLocaleString(undefined, { maximumFractionDigits: 0 })} AED (12–16%)`}
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
        {/* Age */}
        <div
          className="w-full rounded-2xl bg-white border-2 border-[#E0A935] shadow-lg flex items-center gap-3 px-4 py-4"
          style={{
            boxShadow: "0 4px 24px 0 rgba(224,169,53,0.08), 0 0 0 1.5px #E0A93522 inset",
            border: "1.5px solid #f4e8c7",
          }}
        >
          <span className="text-2xl" style={{ color: "#E0A935" }}>🧍‍♂️</span>
          <div className="flex-1">
            <Label htmlFor="age" className="block font-semibold mb-1" style={{ color: "#720D4C" }}>Your Age</Label>
            <Input id="age" name="age" type="number" min={21} max={70} placeholder="Enter your age (21–70)" className="rounded-lg bg-white border border-[#E0A935] text-[#18192a] px-4 py-2 w-full focus:outline-none focus:border-[#720D4C] transition-all" value={form.age || ""} onChange={e => setForm({ ...form, age: e.target.value })} required />
          </div>
        </div>
        {/* Resident/NRI Toggle */}
        <div
          className="w-full rounded-2xl bg-white border-2 border-[#E0A935] shadow-lg flex items-center gap-3 px-4 py-4"
          style={{
            boxShadow: "0 4px 24px 0 rgba(224,169,53,0.08), 0 0 0 1.5px #E0A93522 inset",
            border: "1.5px solid #f4e8c7",
          }}
        >
          <span className="text-2xl" style={{ color: "#E0A935" }}>{form.resident === "Resident" ? "🏢" : "✈️"}</span>
          <div className="flex-1 flex items-center gap-4">
            <Label className="font-semibold" style={{ color: "#720D4C" }}>Are you a Resident or NRI?</Label>
            <Switch checked={form.resident === "NRI"} onCheckedChange={checked => setForm({ ...form, resident: checked ? "NRI" : "Resident", businessOwner: false })} className="data-[state=checked]:bg-[#E0A935]" />
            <span className={form.resident === "Resident" ? "font-bold" : ""} style={{ color: form.resident === "Resident" ? "#E0A935" : "#888" }}>Resident</span>
            <span className={form.resident === "NRI" ? "font-bold" : ""} style={{ color: form.resident === "NRI" ? "#E0A935" : "#888" }}>NRI</span>
          </div>
        </div>
        {/* Monthly Income with Currency Toggle */}
        <div
          className="w-full rounded-2xl bg-white border-2 border-[#E0A935] shadow-lg flex items-center gap-3 px-4 py-4"
          style={{
            boxShadow: "0 4px 24px 0 rgba(224,169,53,0.08), 0 0 0 1.5px #E0A93522 inset",
            border: "1.5px solid #f4e8c7",
          }}
        >
          <span className="text-2xl" style={{ color: "#E0A935" }}>🏦</span>
          <div className="flex-1">
            <Label htmlFor="monthlyIncome" className="block font-semibold mb-1" style={{ color: "#720D4C" }}>Monthly Income</Label>
            <div className="flex gap-2">
              <Input id="monthlyIncome" name="monthlyIncome" type="number" min={0} placeholder="Enter your monthly income" className="rounded-lg bg-white border border-[#E0A935] text-[#18192a] px-4 py-2 w-full focus:outline-none focus:border-[#720D4C] transition-all" value={form.monthlyIncome} onChange={e => setForm({ ...form, monthlyIncome: e.target.value })} required />
              <Button type="button" className={`rounded-full px-4 py-2 font-bold shadow-md transition-all ${form.currency === "AED" ? "bg-[#E0A935] text-[#720D4C]" : "bg-gray-200 text-[#E0A935]"}`} onClick={() => setForm({ ...form, currency: "AED" })}>AED</Button>
              <Button type="button" className={`rounded-full px-4 py-2 font-bold shadow-md transition-all ${form.currency === "INR" ? "bg-[#E0A935] text-[#720D4C]" : "bg-gray-200 text-[#E0A935]"}`} onClick={() => setForm({ ...form, currency: "INR" })}>INR</Button>
            </div>
          </div>
        </div>
        {/* Interest Rate Display (Constant) */}
        <div
          className="w-full rounded-2xl bg-white border-2 border-[#E0A935] shadow-lg flex items-center gap-3 px-4 py-4"
          style={{
            boxShadow: "0 4px 24px 0 rgba(224,169,53,0.08), 0 0 0 1.5px #E0A93522 inset",
            border: "1.5px solid #f4e8c7",
          }}
        >
          <span className="text-2xl" style={{ color: "#E0A935" }}>📈</span>
          <div className="flex-1">
            <Label className="block font-semibold mb-1" style={{ color: "#720D4C" }}>
              Interest Rate (%)
              <span className="ml-2 font-medium" style={{ color: "#E0A935" }}>
                {form.resident === "Resident" ? "3.2%" : "4.5%"}
              </span>
            </Label>
          </div>
        </div>
        {/* CTA Button directly below Interest Rate */}
        <div className="w-full">
          <Button
            type="submit"
            className="w-full px-8 py-4 rounded-full font-bold text-base bg-gradient-to-r from-[#E0A935] to-[#720D4C] text-white shadow-lg hover:bg-[#e6c75a] hover:text-[#1F1F1F] transition-all mt-4"
            style={{ boxShadow: "0 2px 16px 0 #E0A93533" }}
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
        {/* Business Owner Toggle (NRI only) */}
        {form.resident === "NRI" && (
          <div
            className="w-full rounded-2xl bg-white border-2 border-[#E0A935] shadow-lg flex items-center gap-3 px-4 py-4"
            style={{
              boxShadow: "0 4px 24px 0 rgba(224,169,53,0.08), 0 0 0 1.5px #E0A93522 inset",
              border: "1.5px solid #f4e8c7",
            }}
          >
            <span className="text-2xl" style={{ color: "#E0A935" }}>📉</span>
            <div className="flex-1 flex items-center gap-4">
              <Label className="font-semibold" style={{ color: "#720D4C" }}>Are you a Business Owner?</Label>
              <Switch checked={form.businessOwner} onCheckedChange={checked => setForm({ ...form, businessOwner: checked })} className="data-[state=checked]:bg-[#E0A935]" />
              <span className={form.businessOwner ? "font-bold" : ""} style={{ color: form.businessOwner ? "#E0A935" : "#888" }}>Yes</span>
              <span className={!form.businessOwner ? "font-bold" : ""} style={{ color: !form.businessOwner ? "#E0A935" : "#888" }}>No</span>
            </div>
          </div>
        )}
        {/* Removed Personal Loan and EMI toggles */}
        </form>
      </div>
    </div>
  );
};

export default MortgageEMICalculator;
