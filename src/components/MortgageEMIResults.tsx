// MortgageEMIResults.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChartContainer } from "@/components/ui/chart";
import * as Recharts from "recharts";

const MortgageEMIResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0f1b] to-[#121826]">
        <div className="text-white text-xl mb-4">No result data found.</div>
        <Button onClick={() => navigate("/mortgage-emi-calculator")}>Back to Calculator</Button>
      </div>
    );
  }

  // Mortgage ineligibility conditions
  const isIneligible =
    (result.resident === "NRI" && result.businessOwner === true) ||
    Number(result.monthlyIncome) < 15000 ||
    result.age > (result.businessOwner ? 70 : 65) ||
    result.eligibleTenure <= 0 ||
    result.emi > Number(result.monthlyIncome) * 0.5 ||
    result.propertyValue < 500000;

  if (isIneligible) {
    // Build reasons array based on failed conditions
    const reasons = [];
    if (result.resident === "NRI" && result.businessOwner === true) {
      reasons.push("Business owners who are non-residents are not eligible for UAE mortgages.");
    }
    if (Number(result.monthlyIncome) < 15000) {
      reasons.push("Your monthly income is below the minimum required AED 15,000.");
    }
    if (result.age > (result.businessOwner ? 70 : 65)) {
      reasons.push(`Your age exceeds the UAE bank limit for mortgage applicants (${result.businessOwner ? "70" : "65"} years).`);
    }
    if (result.eligibleTenure <= 0) {
      reasons.push("Loan tenure is not possible based on your age and repayment limits.");
    }
    if (result.emi > Number(result.monthlyIncome) * 0.5) {
      reasons.push("Calculated EMI exceeds 50% of your monthly income.");
    }
    if (result.propertyValue < 500000) {
      reasons.push("Property value is below AED 500,000, which is the minimum for most UAE banks.");
    }

    return (
      <Dialog open>
        <DialogContent
          className="flex flex-col items-center justify-center"
          style={{
            background: "#3D0149",
            border: "4px solid #FFD300",
            color: "#FFFFFF",
            fontFamily: "'Poppins', 'Inter', sans-serif",
            maxWidth: "95vw",
            width: "100%",
            boxShadow: "0 0 32px 0 #3D0149",
            borderRadius: "2rem",
            padding: "2.5rem 1.5rem",
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            height: "auto",
            minHeight: "350px",
            ...(window.innerWidth < 640
              ? { height: "85vh", minHeight: "0", maxHeight: "85vh" }
              : {}),
          }}
        >
          <div className="w-full flex flex-col items-center justify-center">
            <div className="text-4xl mb-4" style={{ color: "#FFD300", fontWeight: "bold" }}>
              🚫 Not Eligible for Mortgage
            </div>
            <div className="text-lg mb-4 text-center font-semibold" style={{ color: "#FFFFFF" }}>
              We’re sorry! Based on your current inputs, you're not eligible for a mortgage in the UAE at this time.
            </div>
            {reasons.length > 0 && (
              <div className="text-base mb-4 text-left font-medium" style={{ color: "#FFD300", maxWidth: "500px" }}>
                Reason{reasons.length > 1 ? "s" : ""}:
                <ul className="list-disc ml-6 mt-2" style={{ color: "#FFD300" }}>
                  {reasons.map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="text-base mb-6 text-center font-medium" style={{ color: "#FFFFFF" }}>
              You may explore our other financing options or contact a Lyka Realty advisor for personalized assistance.
            </div>
            <div className="flex flex-col gap-3 w-full mt-2">
              <Button
                style={{
                  background: "#FFD300",
                  color: "#3D0149",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  borderRadius: "1rem",
                  padding: "0.75rem 1.5rem",
                }}
                onClick={() => window.location.href = "/mortgage-emi-calculator"}
              >
                🔁 Change Inputs
              </Button>
              <Button
                style={{
                  background: "#FFFFFF",
                  color: "#3D0149",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  borderRadius: "1rem",
                  padding: "0.75rem 1.5rem",
                  border: "2px solid #FFD300",
                }}
                onClick={() => window.open("https://wa.me/971501234567?text=Hi%20Lyka%20Realty%20Advisor,%20I%20need%20help%20with%20mortgage%20eligibility.", "_blank")}
              >
                💬 Talk to an Advisor
              </Button>
            </div>
          </div>
          <style>
            {`
              [data-radix-dialog-close] {
                display: none !important;
              }
              @media (max-width: 640px) {
                .radix-dialog-content {
                  height: 85vh !important;
                  max-height: 85vh !important;
                }
              }
            `}
          </style>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-start py-0 px-0 overflow-y-auto pb-24"
      style={{
        background: "linear-gradient(135deg, #f9f7fa 0%, #f4f0f7 100%)",
        fontFamily: "'Inter', 'Poppins', sans-serif",
      }}
    >
      {/* Top Section */}
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-0">
        <div className="flex items-center justify-between pt-6 pb-2 px-4">
          <Button
            variant="ghost"
            className="text-yellow-400 bg-transparent hover:bg-transparent px-0 py-0 text-base font-bold"
            style={{ boxShadow: "none", minWidth: 0 }}
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </Button>
        </div>
        {/* Important Notice Card (always first if present) */}
        {result.disclaimers && result.disclaimers.length > 0 && (
        <div
className="mb-2 bg-white border-2 border-[#E0A935] rounded-2xl shadow-lg p-6"
          style={{
            boxShadow: "0 4px 24px 0 rgba(224,169,53,0.08), 0 0 0 1.5px #E0A93522 inset",
            border: "1.5px solid #f4e8c7",
          }}
        >
            <div className="text-base font-bold mb-2 flex items-center gap-2" style={{ color: "#720D4C", fontFamily: "'Inter', 'Poppins', sans-serif" }}>
              <span>⚠️</span> Important Notice
            </div>
            <ul className="list-disc ml-6" style={{ color: "#E0A935", fontFamily: "'Inter', 'Poppins', sans-serif", fontWeight: 500 }}>
              {result.disclaimers.map((d: string, idx: number) => (
                <li key={idx}>{d}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Section 1: Mortgage Overview */}
        <div
className="mb-2 bg-white border-2 border-[#E0A935] rounded-2xl shadow-lg p-6"
          style={{
            boxShadow: "0 4px 24px 0 rgba(224,169,53,0.08), 0 0 0 1.5px #E0A93522 inset",
            border: "1.5px solid #f4e8c7",
          }}
        >
<div className="grid grid-cols-[minmax(100px,0.45fr)_1fr] gap-y-2 mb-2" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
            <div className="flex items-center gap-2">
              <span role="img" aria-label="house" style={{ fontSize: 22 }}>🏠</span>
              <span className="font-bold" style={{ fontSize: 18, color: "#720D4C" }}>Max Eligible Mortgage:</span>
            </div>
            <span className="font-bold text-right" style={{ fontSize: 18, color: "#E0A935" }}>
              AED {result.propertyValue?.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
            <div className="flex items-center gap-2">
              <span role="img" aria-label="down payment" style={{ fontSize: 22 }}>💰</span>
              <span className="font-bold" style={{ fontSize: 18, color: "#720D4C" }}>Required Down Payment:</span>
            </div>
<span className="font-bold text-right" style={{ fontSize: 18, color: "#E0A935" }}>
              AED {(result.propertyValue ? (result.propertyValue * 0.2).toLocaleString(undefined, { maximumFractionDigits: 0 }) : "0")}
            </span>
            <div className="flex items-center gap-2">
              <span role="img" aria-label="upfront" style={{ fontSize: 22 }}>💵</span>
              <span className="font-bold" style={{ fontSize: 18, color: "#720D4C" }}>Total Upfront Cash Needed:</span>
            </div>
            <span className="font-bold text-right" style={{ fontSize: 18, color: "#E0A935" }}>
{result.propertyValue
                ? `AED ${(result.propertyValue * 0.06).toLocaleString(undefined, { maximumFractionDigits: 0 })} – AED ${(result.propertyValue * 0.08).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                : "AED 0"}
            </span>
          </div>
        </div>
        {/* Section 2: Loan Terms */}
        <div
          className="mb-2 bg-white border-2 border-[#E0A935] rounded-2xl shadow-lg p-6"
          style={{
            boxShadow: "0 4px 24px 0 rgba(224,169,53,0.08), 0 0 0 1.5px #E0A93522 inset",
            border: "1.5px solid #f4e8c7",
          }}
        >
          <div className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: "#720D4C", fontFamily: "'Inter', 'Poppins', sans-serif" }}>
            <span role="img" aria-label="calendar">🗓️</span> Loan Terms
          </div>
<div className="grid grid-cols-[minmax(100px,0.45fr)_1fr] gap-y-2">
            <div className="flex items-center gap-2">
              <span role="img" aria-label="tenure">📅</span>
              <span className="font-semibold" style={{ color: "#1F1F1F", fontFamily: "'Inter', 'Poppins', sans-serif" }}>Eligible Loan Tenure:</span>
            </div>
            <span className="font-bold text-right" style={{ color: "#E0A935" }}>{result.eligibleTenure} years</span>
            <div className="flex items-center gap-2">
              <span role="img" aria-label="emi">💳</span>
              <span className="font-semibold" style={{ color: "#1F1F1F", fontFamily: "'Inter', 'Poppins', sans-serif" }}>Monthly EMI:</span>
            </div>
            <span className="font-bold text-right" style={{ color: "#E0A935" }}>AED {result.emi?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            <div className="flex items-center gap-2">
              <span role="img" aria-label="interest">📊</span>
              <span className="font-semibold" style={{ color: "#1F1F1F", fontFamily: "'Inter', 'Poppins', sans-serif" }}>Total Interest Payable:</span>
            </div>
            <span className="font-bold text-right" style={{ color: "#E0A935" }}>AED {result.totalInterest?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            <div className="flex items-center gap-2">
              <span role="img" aria-label="repayment">🧾</span>
              <span className="font-semibold" style={{ color: "#1F1F1F", fontFamily: "'Inter', 'Poppins', sans-serif" }}>Total Loan Repayment:</span>
            </div>
            <span className="font-bold text-right" style={{ color: "#E0A935" }}>AED {result.totalPayable?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
        </div>
        {/* Section 3: Repayment Breakdown Chart */}
        <div
className="mb-4 bg-white border-2 border-[#E0A935] rounded-2xl shadow-lg p-6"
          style={{
            boxShadow: "0 4px 24px 0 rgba(224,169,53,0.08), 0 0 0 1.5px #E0A93522 inset",
            border: "1.5px solid #f4e8c7",
          }}
        >
          <div className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: "#720D4C", fontFamily: "'Inter', 'Poppins', sans-serif" }}>
            <span role="img" aria-label="pie chart">📊</span> Repayment Breakdown
          </div>
          <div className="w-full flex flex-col items-center justify-center mb-2">
<ChartContainer
  config={{
    Principal: { label: "Principal", color: "#FFD700" },
    Interest: { label: "Interest", color: "#444" },
    Fees: { label: "Processing Fee", color: "#888" },
  }}
  className="w-full mx-auto"
>
<Recharts.ResponsiveContainer width="100%" height={320}>
  <Recharts.PieChart>
    <Recharts.Pie
      data={[
        { name: "Principal", value: result.principal || 0, fill: "#FFD700" },
        { name: "Interest", value: result.totalInterest || 0, fill: "#444" },
        { name: "Fees", value: result.procFee || 0, fill: "#888" },
      ]}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius="80%"
      paddingAngle={2}
      labelLine
      label={({ name, percent, x, y, fill }) => {
        // Choose contrasting color for label
        let labelColor = "#222";
        if (fill === "#444" || fill === "#888") labelColor = "#fff";
        if (fill === "#FFD700") labelColor = "#222";
        return percent > 0 ? (
          <text
            x={x}
            y={y}
            fill={labelColor}
            fontWeight="bold"
            fontSize={14}
            textAnchor="middle"
            dominantBaseline="central"
            stroke="#fff"
            strokeWidth={fill === "#FFD700" ? 0 : 0.5}
          >
            {`${name} ${(percent * 100).toFixed(0)}%`}
          </text>
        ) : null;
      }}
    >
      <Recharts.Cell fill="#FFD700" />
      <Recharts.Cell fill="#444" />
      <Recharts.Cell fill="#888" />
    </Recharts.Pie>
    <Recharts.Tooltip />
    <Recharts.Legend layout="horizontal" align="center" verticalAlign="bottom" iconType="circle" />
  </Recharts.PieChart>
</Recharts.ResponsiveContainer>
</ChartContainer>
          </div>
        </div>
        {/* Amortization Accordion */}
        <div className="bg-white rounded-2xl px-6 pt-4 pb-8 flex flex-col gap-4 shadow-lg mb-2 border-2 border-[#E0A935]"
          style={{
            boxShadow: "0 4px 24px 0 rgba(224,169,53,0.08), 0 0 0 1.5px #E0A93522 inset",
            border: "1.5px solid #f4e8c7",
          }}
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="amortization">
              <AccordionTrigger className="text-[#720D4C] font-bold text-lg">📊 View Amortization Schedule</AccordionTrigger>
              <AccordionContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs" style={{ color: "#1F1F1F" }}>
                    <thead>
                      <tr>
<th className="px-2 py-1 border-b border-[#E0A935]">Month</th>
<th className="px-2 py-1 border-b border-[#E0A935]">Principal</th>
<th className="px-2 py-1 border-b border-[#E0A935]">Interest</th>
<th className="px-2 py-1 border-b border-[#E0A935]">Amount to be Paid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.amortization && result.amortization.slice(0, 24).map((row: any, idx: number) => (
                        <tr key={idx}>
<td className="px-2 py-1 border-b border-gray-200">{row.month}</td>
<td className="px-2 py-1 border-b border-gray-200">{row.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
<td className="px-2 py-1 border-b border-gray-200">{row.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
<td className="px-2 py-1 border-b border-gray-200">{(row.principal + row.interest).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                        </tr>
                      ))}
                      {result.amortization && result.amortization.length > 24 && (
                        <tr>
<td colSpan={4} className="text-center text-[#E0A935] py-2">...showing first 24 months</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default MortgageEMIResults;
