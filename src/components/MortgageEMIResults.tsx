// MortgageEMIResults.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

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

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#181825] to-[#23233a] py-12 px-2" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      {/* Back to Home Button in Results */}
      <Button
        variant="ghost"
        className="absolute top-6 left-6 z-10 bg-black/40 text-yellow-300 hover:bg-black/70"
        onClick={() => {
          window.location.href = "/#tools";
        }}
      >
        ← Back to Home
      </Button>
      <div className="w-full max-w-[1000px] mx-auto p-0 md:p-4">
        {/* Smart Summary Box */}
        <div className="w-full mb-4">
          <div className="shadow-lg rounded-2xl px-5 py-4 flex flex-col gap-2 items-start font-semibold text-base md:text-lg"
            style={{ background: "rgba(24,24,37,0.98)", border: "none" }}>
            <span className="text-white flex items-center gap-2">
              <span className="inline-block text-lg">🧑‍💼</span>
              {`${result.age || "N/A"}-year-old ${result.resident.toLowerCase()} buying a `}
              <span className="inline-block text-lg">🏠</span>
              {`${result.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })} AED property.`}
            </span>
            <span className="text-white flex items-center gap-2">
              <span className="inline-block text-lg">🧾</span>
              {`Eligible for ${result.eligibleTenure > 0 ? `${result.eligibleTenure}-year loan (up to ${result.resident === "Resident" ? "80%" : "50–60%"})` : "no mortgage"}.`}
            </span>
            <span className="text-white flex items-center gap-2">
              <span className="inline-block text-lg">💰</span>
              {(() => {
                const AEDtoINR = 22;
                const chargesPct = result.resident === "Resident" ? 0.14 : 0.14;
                const upfrontMin = result.down + result.principal * chargesPct;
                const upfrontMax = result.down + result.principal * (chargesPct + 0.02);
                return `Needs ${upfrontMin.toLocaleString(undefined, { maximumFractionDigits: 0 })}–${upfrontMax.toLocaleString(undefined, { maximumFractionDigits: 0 })} AED upfront.`;
              })()}
            </span>
            <span className="text-white flex items-center gap-2">
              <span className="inline-block text-lg">💸</span>
              {`EMI: ${result.emi.toLocaleString(undefined, { maximumFractionDigits: 0 })} AED @ ${result.resident === "Resident" ? "3.2–4.3%" : "4.5–5%"}.`}
            </span>
          </div>
        </div>
        {/* Risk Box */}
        {(result.emi > Number(result.monthlyIncome) * 0.4 || result.eligibleTenure < 1) && (
          <div className="w-full mb-4">
            <div className="rounded-xl border border-red-400 bg-white/80 shadow px-4 py-3 font-semibold text-base flex items-center gap-2 text-red-700">
              <span className="inline-block text-lg">⚠️</span>
              <span>
                {result.emi > Number(result.monthlyIncome) * 0.4
                  ? "Your EMI exceeds 40% of income — high financial risk. Lenders may reject or charge higher interest."
                  : "High Risk: EMI/income ratio, down payment, or non-resident status may reduce mortgage approval chances."}
              </span>
            </div>
          </div>
        )}
        {/* Loan Summary Card */}
        <div className="w-full mb-4">
          <div className="bg-[#181825] rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-gray-200">Max Eligible Mortgage:</div>
              <div className="text-yellow-300 font-bold">{(() => {
                const AEDtoINR = 22;
                const maxMortgagePct = result.resident === "Resident" ? 0.8 : 0.6;
                const maxMortgage = result.principal * maxMortgagePct;
                const maxMortgageINR = maxMortgage * AEDtoINR;
                return `${maxMortgage.toLocaleString(undefined, { maximumFractionDigits: 0 })} AED / ₹${maxMortgageINR.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
              })()}</div>
            </div>
            <div>
              <div className="text-gray-200">Required Down Payment:</div>
              <div className="text-yellow-300 font-bold">{(() => {
                const AEDtoINR = 22;
                const downPaymentINR = result.down * AEDtoINR;
                return `${result.down.toLocaleString(undefined, { maximumFractionDigits: 0 })} AED / ₹${downPaymentINR.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
              })()}</div>
            </div>
            <div>
              <div className="text-gray-200">Total Upfront Cash Needed:</div>
              <div className="text-yellow-300 font-bold">{(() => {
                const AEDtoINR = 22;
                const chargesPct = result.resident === "Resident" ? 0.14 : 0.14;
                const upfrontMin = result.down + result.principal * chargesPct;
                const upfrontMax = result.down + result.principal * (chargesPct + 0.02);
                const upfrontMinINR = upfrontMin * AEDtoINR;
                const upfrontMaxINR = upfrontMax * AEDtoINR;
                return `${upfrontMin.toLocaleString(undefined, { maximumFractionDigits: 0 })}–${upfrontMax.toLocaleString(undefined, { maximumFractionDigits: 0 })} AED / ₹${upfrontMinINR.toLocaleString(undefined, { maximumFractionDigits: 0 })}–₹${upfrontMaxINR.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
              })()}</div>
            </div>
            <div>
              <div className="text-gray-200">Eligible Loan Tenure:</div>
              <div className="text-yellow-300 font-bold">{result.eligibleTenure > 0 ? `${result.eligibleTenure} years` : "Ineligible"}</div>
            </div>
            <div>
              <div className="text-gray-200">EMI (Monthly):</div>
              <div className="text-yellow-300 font-bold">{result.emi.toLocaleString(undefined, { maximumFractionDigits: 2 })} AED</div>
            </div>
            <div>
              <div className="text-gray-200">Total Interest Payable:</div>
              <div className="text-yellow-300 font-bold">{result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })} AED</div>
            </div>
            <div>
              <div className="text-gray-200">Processing Fee:</div>
              <div className="text-yellow-300 font-bold">{result.procFee.toLocaleString(undefined, { maximumFractionDigits: 2 })} AED</div>
            </div>
            <div>
              <div className="text-gray-200">Total Payable:</div>
              <div className="text-yellow-300 font-bold">{result.totalPayable.toLocaleString(undefined, { maximumFractionDigits: 2 })} AED</div>
            </div>
          </div>
        </div>
        {/* Tenure Eligibility Message */}
        <div className="mt-2 text-base text-yellow-300 font-semibold">
          {result.eligibleTenure > 0
            ? `Based on your age of ${result.age}, and your employment type (${result.resident}, ${result.businessOwner ? "Business Owner" : "Employed"}), your maximum eligible loan tenure is ${result.eligibleTenure} years. UAE banks require all loans to be repaid before age ${result.maxAgeLimit}.`
            : `⚠️ You are not eligible for a mortgage. UAE banks require full loan repayment before age ${result.maxAgeLimit}, depending on employment status.`}
        </div>
        {/* Disclaimers */}
        <div className="mt-4">
          {(() => {
            const income = result.monthlyIncome ? Number(result.monthlyIncome) : 0;
            const minIncome = result.resident === "Resident" ? 10000 : (result.businessOwner ? 40000 : 25000);
            const age = result.age ? Number(result.age) : 0;
            const emi = result.emi || 0;
            let disclaimers = [];
            if (income < minIncome) {
              disclaimers.push(<div key="income" className="text-red-400 font-bold mb-1">🔴 You may not qualify for a mortgage with this income.</div>);
            }
            if (emi > income * 0.4) {
              disclaimers.push(<div key="afford" className="text-yellow-300 font-bold mb-1">🟠 Your EMI exceeds 40% of your income — high financial risk.</div>);
            }
            if (age > 65) {
              disclaimers.push(<div key="age" className="text-red-400 font-bold mb-1">🔴 Mortgage not available beyond age 65.</div>);
            }
            if (result.resident === "NRI") {
              disclaimers.push(<div key="nri" className="text-yellow-300 font-medium mb-1">⚠️ Note: Banks may vary in terms for NRIs. Final approval depends on individual lender policies.</div>);
            }
            return disclaimers.length > 0 ? disclaimers : null;
          })()}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="mb-2 text-white">Monthly EMI: <span className="text-yellow-300 font-bold">{result.emi.toLocaleString(undefined, { maximumFractionDigits: 2 })} AED</span></div>
            <div className="mb-2 text-white">Total Interest: <span className="text-yellow-300">{result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })} AED</span></div>
            <div className="mb-2 text-white">Processing Fee: <span className="text-yellow-300">{result.procFee.toLocaleString(undefined, { maximumFractionDigits: 2 })} AED</span></div>
            <div className="mb-2 text-white">Total Payable: <span className="text-yellow-300">{result.totalPayable.toLocaleString(undefined, { maximumFractionDigits: 2 })} AED</span></div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {/* Donut Chart */}
            <div className="relative w-40 h-40 mb-2">
              <svg width="160" height="160" viewBox="0 0 40 40">
                <circle r="16" cx="20" cy="20" fill="none" stroke="#FFD300" strokeWidth="6" strokeDasharray={`${(result.principal / result.totalPayable) * 100} ${100 - (result.principal / result.totalPayable) * 100}`} strokeDashoffset="25" />
                <circle r="16" cx="20" cy="20" fill="none" stroke="#FF4F00" strokeWidth="6" strokeDasharray={`${(result.totalInterest / result.totalPayable) * 100} ${100 - (result.totalInterest / result.totalPayable) * 100}`} strokeDashoffset={25 + (result.principal / result.totalPayable) * 100} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-yellow-300 font-bold text-lg">{Math.round((result.principal / result.totalPayable) * 100)}%</span>
                <span className="text-xs text-gray-400">Loan</span>
                <span className="text-orange-400 font-bold text-lg">{Math.round((result.totalInterest / result.totalPayable) * 100)}%</span>
                <span className="text-xs text-gray-400">Interest</span>
              </div>
            </div>
          </div>
        </div>
        {/* Amortization Table Accordion */}
        <div className="mb-6">
          <div className="w-full">
            <div className="md:hidden text-center text-yellow-300 mb-2">Tap to View Payment Schedule</div>
            <Accordion type="single" collapsible defaultValue="amortization">
              <AccordionItem value="amortization">
                <AccordionTrigger className="text-lg font-semibold text-yellow-300 bg-[#23233a] px-4 rounded-xl">
                  Amortization Table (First 12 Months)
                </AccordionTrigger>
                <AccordionContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-white border border-yellow-400 rounded-lg">
                      <thead>
                        <tr className="bg-[#23233a] text-yellow-300">
                          <th className="px-2 py-1">Month</th>
                          <th className="px-2 py-1">Principal</th>
                          <th className="px-2 py-1">Interest</th>
                          <th className="px-2 py-1">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.amortization.slice(0, 12).map((row: any) => (
                          <tr key={row.month} className="border-b border-yellow-900">
                            <td className="px-2 py-1">{row.month}</td>
                            <td className="px-2 py-1">{row.principal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                            <td className="px-2 py-1">{row.interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                            <td className="px-2 py-1">{row.balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        {/* Disclaimer Box */}
        <div className={`rounded-xl p-4 mt-4 ${result.risk === "Good" ? "bg-green-900/60 border-green-400 text-green-200" : result.risk === "Okay" ? "bg-yellow-900/60 border-yellow-400 text-yellow-200" : "bg-red-900/60 border-red-400 text-red-200"} border-2 shadow-inner`}>
          <span className="font-bold">{result.risk} Risk:</span>{" "}
          {result.risk === "Good" && "Your EMI and down payment are at healthy levels for your income and status."}
          {result.risk === "Okay" && "Caution: Your EMI or down payment is borderline. Consider increasing your down payment or reducing loan amount."}
          {result.risk === "High Risk" && "Warning: Your EMI-to-income ratio, down payment, or non-resident status indicates high risk. Lenders may reject or offer higher rates."}
        </div>
        {/* UAE Rules FAQ Accordion */}
        <div className="mb-8">
          <Accordion type="multiple">
            <AccordionItem value="rule1">
              <AccordionTrigger className="text-lg font-semibold text-yellow-300 bg-[#23233a] px-4 rounded-xl">
                🏦 Loan tenure capped at age 65/70
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-gray-200">UAE banks require all mortgages to be repaid before age 65 (employed) or 70 (self-employed).</span>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="rule2">
              <AccordionTrigger className="text-lg font-semibold text-yellow-300 bg-[#23233a] px-4 rounded-xl">
                💰 Minimum income rules
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-gray-200">Residents: AED 10,000/month minimum. NRIs: AED 25,000–40,000/month depending on employment.</span>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="rule3">
              <AccordionTrigger className="text-lg font-semibold text-yellow-300 bg-[#23233a] px-4 rounded-xl">
                📋 Upfront charges = 12–16%
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-gray-200">Expect 12–16% of property value as additional fees and charges, including registration, insurance, and processing.</span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex justify-center mt-8">
          <Button onClick={() => navigate("/mortgage-emi-calculator")}>Back to Calculator</Button>
        </div>
      </div>
   
  )
};

export default MortgageEMIResults;
