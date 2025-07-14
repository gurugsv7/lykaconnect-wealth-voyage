// MortgageEMIResults.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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

  // ...existing results rendering code...
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#181825] to-[#23233a] py-12 px-2" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      {/* Back to Home Button in Results */}
      {/* ...rest of original code... */}
    </div>
  );
};

export default MortgageEMIResults;
