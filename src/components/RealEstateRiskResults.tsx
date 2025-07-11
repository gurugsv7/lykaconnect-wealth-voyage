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
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #18181b 0%, #23272f 60%, #1e293b 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem 1rem",
      }}
    >
      <button
        onClick={() => navigate("/real-estate-risk-calculator")}
        style={{
          background: "linear-gradient(90deg,#FFD740,#FFA000)",
          color: "#23272f",
          padding: "0.7rem 1.5rem",
          borderRadius: "0.75rem",
          fontWeight: 700,
          fontSize: "1rem",
          border: "none",
          marginBottom: "1.5rem",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "background 0.2s",
          alignSelf: "flex-start",
          marginLeft: 0,
        }}
      >
        ← Back to Calculator
      </button>
      <button
        onClick={() => navigate("/")}
        style={{
          background: "#23272f",
          color: "#FFD740",
          padding: "0.7rem 1.5rem",
          borderRadius: "0.75rem",
          fontWeight: 700,
          fontSize: "1rem",
          border: "1px solid #FFD740",
          marginBottom: "1.5rem",
          marginLeft: "1rem",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "background 0.2s",
          alignSelf: "flex-start",
        }}
      >
        ← Back to Home
      </button>
      <div style={{ ...cardStyle, width: "100%", maxWidth: 480 }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
          Smart Investment Range Estimator
        </h2>
        {ready ? (
          <>
            <div style={cardStyle}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>
                {investment > 0 && investment < 200000 ? (
                  <>
                    Your AED {investment.toLocaleString()} investment qualifies for high-risk properties.<br />
                    <span style={{ color: "#FFD740", fontWeight: 700 }}>
                      These typically start from AED 150,000+ in emerging areas and off-plan developments.
                    </span>
                  </>
                ) : (
                  <>
                    Your AED {investment.toLocaleString()} investment qualifies for Dubai's investable property market.
                  </>
                )}
              </div>
              {/* Smart AI suggestion for low investment */}
              {investment > 0 && investment < 200000 && (
                <div style={{
                  background: "rgba(255, 215, 64, 0.15)",
                  border: "1px solid #FFD740",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  margin: "1rem 0",
                  color: "#FFD740",
                  fontWeight: 600,
                  textAlign: "center",
                }}>
                  Consider increasing your investment to access lower-risk, ready properties with stable rental returns.
                </div>
              )}
              {/* Bar graph */}
              <div style={{ margin: "1.5rem 0" }}>
                <div style={{ fontSize: "0.95rem", color: "#FFD740", marginBottom: 4 }}>
                  ✅ Your Budget vs Recommended Safe Investment Range
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 600 }}>
                      ✅ Your Budget: {investment.toLocaleString()} AED
                    </div>
                    <div style={progressBarStyle(100)}>
                      <div style={progressFillStyle(invBar)} />
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "#FFD740", fontWeight: 600 }}>
                      ✅ Lowest Safe Zone: 200,000 AED
                    </div>
                    <div style={progressBarStyle(100)}>
                      <div style={progressFillStyle(100)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              style={{
                width: "100%",
                background: "#23272f",
                color: "#FFD740",
                padding: "0.9rem",
                borderRadius: "0.75rem",
                fontWeight: 700,
                fontSize: "1.1rem",
                border: "1px solid #FFD740",
                marginTop: "0.5rem",
                cursor: "pointer",
                marginBottom: "1rem",
              }}
              onClick={() => setShowModal(true)}
            >
              ✅ See Safe Investment Range
            </button>
            {/* Visa eligibility meter */}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>
                ✅ UAE Investor Visa Progress
              </div>
              {visaEligible ? (
                <div style={{ ...highlightStyle, color: "#4ade80", border: "1px solid #4ade80" }}>
                  ✅ You're eligible for UAE Investor Visa (2–10 years residency)
                </div>
              ) : (
                <>
                  <div style={progressBarStyle(100)}>
                    <div style={progressFillStyle(visaPercent)} />
                  </div>
                  <div style={{ color: "#FFD740", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                    {visaPercent.toFixed(0)}% of AED 750,000 minimum investment for UAE Residency
                    <a
                      href="/uae-investor-visa"
                      style={{
                        marginLeft: 10,
                        color: "#FFD740",
                        fontWeight: 700,
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontSize: "1.08rem",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      Know More about Investor Visa <span style={{ marginLeft: 4, fontSize: 18 }}>→</span>
                    </a>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div style={{ color: "#FFD740", fontWeight: 600 }}>
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
  );
};

export default RealEstateRiskResults;
