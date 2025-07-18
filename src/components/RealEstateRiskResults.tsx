import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: "1rem",
  padding: "1.5rem",
  margin: "1rem 0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  color: "#fff",
  maxWidth: 400,
  width: "100%",
};

const highlightStyle: React.CSSProperties = {
  background: "rgba(255, 215, 64, 0.15)",
  border: "1px solid #FFD740",
  borderRadius: "0.75rem",
  padding: "1rem",
  margin: "1rem 0",
  color: "#FFD740",
  fontWeight: 600,
  textAlign: "center",
};

const progressBarStyle = (percent: number): React.CSSProperties => ({
  width: "100%",
  background: "#23272f",
  borderRadius: "0.5rem",
  height: 18,
  margin: "1rem 0",
  overflow: "hidden",
  border: "1px solid #FFD740",
  position: "relative",
});
const progressFillStyle = (percent: number): React.CSSProperties => ({
  width: `${percent}%`,
  background: "linear-gradient(90deg,#FFD740,#FFA000)",
  height: "100%",
  borderRadius: "0.5rem 0 0 0.5rem",
  transition: "width 0.5s",
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const RealEstateRiskResults: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const investment = Number(query.get("investment")) || 0;
  const duration = Number(query.get("duration")) || 1;
  const focus = query.get("focus") || "";
  const risk = query.get("risk") || "";

  const highRisk = investment * 5;
  const lowRisk = investment * 3.5;
  const visaEligible = investment >= 750000;
  const visaPercent = Math.min((investment / 750000) * 100, 100);

  const ready =
    investment > 0 &&
    duration >= 1 &&
    focus &&
    risk;

  // Bar graph dimensions
  const barMax = Math.max(investment, highRisk);
  const invBar = barMax ? (investment / barMax) * 100 : 0;
  const highBar = barMax ? (highRisk / barMax) * 100 : 0;

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [showSafe, setShowSafe] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  const modalValid = !!email && !!phone && consent;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-0 px-0 overflow-y-auto pb-24"
      style={{
        background: "linear-gradient(135deg, #f9f7fa 0%, #f4f0f7 100%)",
        fontFamily: "'Inter', 'Poppins', sans-serif",
      }}
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-0">
        <div className="flex items-center justify-between pt-6 pb-2 px-4">
          <button
            onClick={() => navigate("/real-estate-risk-calculator")}
            className="text-yellow-400 bg-transparent hover:bg-transparent px-0 py-0 text-base font-bold"
            style={{
              boxShadow: "none",
              minWidth: 0,
              background: "none",
              border: "none",
              fontFamily: "'Inter', 'Poppins', sans-serif",
              cursor: "pointer"
            }}
          >
            ← Back to Calculator
          </button>
          
        </div>
        <div
          className="mb-4 bg-white border-2 border-[#E0A935] rounded-2xl shadow-lg p-4 sm:p-6 w-full"
          style={{
            boxShadow: "0 4px 24px 0 rgba(224,169,53,0.08), 0 0 0 1.5px #E0A93522 inset",
            border: "1.5px solid #f4e8c7",
            width: "100%",
            maxWidth: "100vw",
            margin: 0
          }}
        >
          <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: "#720D4C", fontFamily: "'Inter', 'Poppins', sans-serif" }}>
            Smart Investment Range Estimator
          </h2>
          {ready ? (
            <div className="flex flex-col gap-4">
              {/* Visa eligibility meter */}
              <div className="bg-[#F9F7FA] border border-[#E0A935] rounded-xl p-4 flex flex-col gap-2">
                <div className="text-base font-bold text-[#720D4C] mb-2 flex items-center gap-2">
                  <span role="img" aria-label="visa">🛂</span>
                  UAE Investor Visa Progress
                </div>
                {visaEligible ? (
                  <div className="bg-[#e6ffe6] border border-[#4ade80] rounded-xl p-3 text-[#4ade80] font-semibold text-center">
                    You're eligible for UAE Investor Visa (2–10 years residency)
                  </div>
                ) : (
                  <>
                    <div className="w-full h-4 bg-[#f4e8c7] rounded-lg overflow-hidden border border-[#E0A935] mb-2">
                      <div
                        className="h-4 rounded-lg"
                        style={{
                          width: Math.min((investment / 750000) * 100, 100) + "%",
                          background: "linear-gradient(90deg,#FFD740,#FFA000)",
                          transition: "width 0.5s"
                        }}
                      />
                    </div>
                    <div className="text-[#FFD740] font-semibold text-sm flex flex-wrap items-center">
                      Progress towards AED 750,000 minimum investment for UAE Residency
                      <a
                        href="/uae-investor-visa"
                        className="ml-2 underline text-[#FFD740] font-bold"
                        style={{ fontSize: "1.08rem", display: "inline-flex", alignItems: "center" }}
                      >
                        Know More about Investor Visa <span style={{ marginLeft: 4, fontSize: 18 }}>→</span>
                      </a>
                    </div>
                  </>
                )}
              </div>
              
              {/* Smart AI suggestion for low investment */}
              {investment > 0 && investment < 200000 && (
                <div className="bg-[#FFF3CD] border border-[#FFD740] rounded-xl p-3 text-[#FFD740] font-semibold text-center">
                  Your AED {investment.toLocaleString()} investment qualifies for high-risk properties.<br />
                  <span>
                    These typically start from AED 150,000+ in emerging areas and off-plan developments.
                  </span>
                  <div className="mt-2 text-[#FFD740] font-bold">
                    Consider increasing your investment to access lower-risk, ready properties with stable rental returns.
                  </div>
                </div>
              )}
              {/* Budget vs High Risk Limit */}
              <div className="bg-[#F9F7FA] border border-[#E0A935] rounded-xl p-4 flex flex-col gap-2">
                <div className="text-base font-bold text-[#720D4C] mb-2 flex items-center gap-2">
                  <span role="img" aria-label="bar">📊</span>
                  Your Budget vs Highest Risk Limit
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#4ade80] font-semibold">Your Budget</span>
                    <span className="text-[#4ade80] font-semibold">{investment.toLocaleString()} AED</span>
                  </div>
                  <div className="w-full h-4 bg-[#f4e8c7] rounded-lg overflow-hidden mb-2 border border-[#E0A935]">
                    <div
                      className="h-4 rounded-lg"
                      style={{
                        width: "100%",
                        background: "linear-gradient(90deg,#FFD740,#FFA000)",
                        transition: "width 0.5s"
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#FFD740] font-semibold">Highest Risk Limit</span>
                    <span className="text-[#FFD740] font-semibold">{(investment * 5).toLocaleString()} AED</span>
                  </div>
                  <div className="w-full h-4 bg-[#f4e8c7] rounded-lg overflow-hidden border border-[#E0A935]">
                    <div
                      className="h-4 rounded-lg"
                      style={{
                        width: "100%",
                        background: "linear-gradient(90deg,#FFD740,#FFA000)",
                        opacity: 0.5,
                        transition: "width 0.5s"
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Show Safest Risk Button or Value */}
              {!showSafe ? (
                <button
                  className="w-full bg-[#FFD740] text-[#720D4C] font-bold rounded-lg py-3 text-base shadow hover:bg-yellow-300 transition-all mt-2"
                  style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
                  onClick={() => setShowModal(true)}
                >
                  Show Safest Risk Limit
                </button>
              ) : (
                <div className="w-full bg-[#e6ffe6] border border-[#4ade80] rounded-lg py-3 text-base font-bold text-[#228B22] text-center mt-2">
                  Safest Risk Limit (3.5×): {(investment * 3.5).toLocaleString()} AED
                </div>
              )}
            </div>
          ) : (
            <div className="text-[#FFD740] font-bold text-center">
              Invalid or missing input. Please return to the calculator.
            </div>
          )}

        {/* Safe Return Modal */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.7)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setShowModal(false)}
          >
            <div
              style={{
                background: "#18181b",
                borderRadius: "1rem",
                padding: "2rem 1.5rem",
                maxWidth: 340,
                width: "90vw",
                boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
                position: "relative",
              }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  background: "none",
                  border: "none",
                  color: "#FFD740",
                  fontSize: 22,
                  cursor: "pointer",
                }}
                aria-label="Close"
              >
                ×
              </button>
              <h3 style={{ color: "#FFD740", fontWeight: 700, marginBottom: 16, fontSize: "1.2rem" }}>
                Get Your Safe Return Estimate
              </h3>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (modalValid) {
                    setShowModal(false);
                    setShowSafe(true);
                  }
                }}
              >
                <label style={{ display: "block", marginBottom: 8, color: "#fff" }}>
                  Email address
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "0.6rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #FFD740",
                      marginBottom: "1rem",
                      fontSize: "1rem",
                      background: "#23272f",
                      color: "#fff",
                      outline: "none",
                    }}
                  />
                </label>
                <label style={{ display: "block", marginBottom: 8, color: "#fff" }}>
                  Phone number
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "0.6rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #FFD740",
                      marginBottom: "1rem",
                      fontSize: "1rem",
                      background: "#23272f",
                      color: "#fff",
                      outline: "none",
                    }}
                  />
                </label>
                <label style={{ display: "flex", alignItems: "center", color: "#FFD740", fontWeight: 500 }}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                    required
                    style={{ marginRight: 8 }}
                  />
                  I consent to receive advisory updates from LykaConnect
                </label>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    background: "linear-gradient(90deg,#FFD740,#FFA000)",
                    color: "#23272f",
                    padding: "0.8rem",
                    borderRadius: "0.75rem",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    border: "none",
                    marginTop: "1rem",
                    cursor: "pointer",
                  }}
                  disabled={!modalValid}
                >
                  Show Safe Return
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Safe Return Output */}
        {showSafe && ready && (
          <div style={{ ...cardStyle, marginTop: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>
              Safe Zone starts from AED 200,000 (Ready units, rented, prime areas)
            </div>
          </div>
        )}
      </div>
      <style>
        {`
          @media (max-width: 600px) {
            div[style*="max-width: 480px"] {
              padding: 0.5rem !important;
              max-width: 100vw !important;
            }
            button, input[type="number"], select {
              font-size: 1rem !important;
            }
            h2 {
              font-size: 1.1rem !important;
            }
            label {
              font-size: 0.95rem !important;
            }
          }
        `}
      </style>
    </div>
    </div>
  );
};

export default RealEstateRiskResults;
