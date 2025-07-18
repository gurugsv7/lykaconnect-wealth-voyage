import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const RealEstateRiskCalculator: React.FC = () => {
  const [investment, setInvestment] = useState<number | "">("");
  const [duration, setDuration] = useState<number | "">("");
  const [focus, setFocus] = useState<"Rental Income" | "Resale">("Rental Income");
  const [risk, setRisk] = useState<"Low" | "Moderate" | "High">("High");
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const ready =
    typeof investment === "number" &&
    investment > 0 &&
    typeof duration === "number" &&
    duration >= 1;

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
            onClick={() => navigate("/")}
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
            ← Back to Home
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
            Investment Risk Estimator
          </h2>
          <div className="text-sm mb-4 text-center" style={{ color: "#1F1F1F", fontFamily: "'Inter', 'Poppins', sans-serif" }}>
            Estimate potential returns for low and high risk strategies.
          </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (ready) {
              const params = new URLSearchParams({
                investment: investment.toString(),
                duration: duration.toString(),
                focus,
                risk,
              }).toString();
              navigate(`/real-estate-risk-results?${params}`);
            } else {
              setTouched(true);
            }
          }}
        >
          <label htmlFor="investment" style={{ fontWeight: 500, marginBottom: 8, display: "block" }}>
            Investment amount (AED)
          </label>
          <input
            id="investment"
            type="number"
            min={0}
            placeholder="Enter amount in AED"
            value={investment}
            onChange={e => {
              setTouched(false);
              const val = e.target.value;
              setInvestment(val === "" ? "" : Math.max(0, Number(val)));
            }}
            className="w-full px-4 py-3 rounded-lg border-2 border-[#E0A935] mb-5 text-base focus:outline-none focus:ring-2 focus:ring-[#FFD300] bg-[#f9f7fa] text-[#720D4C] font-semibold transition-all"
            style={{
              fontFamily: "'Inter', 'Poppins', sans-serif",
              boxShadow: "0 1px 4px 0 #E0A93511",
            }}
          />

          <label htmlFor="duration" style={{ fontWeight: 500, marginBottom: 8, display: "block" }}>
            Goal duration
          </label>
          <select
            id="duration"
            value={duration}
            onChange={e => {
              setTouched(false);
              setDuration(e.target.value === "" ? "" : Number(e.target.value));
            }}
            className="w-full px-4 py-3 rounded-lg border-2 border-[#E0A935] mb-5 text-base focus:outline-none focus:ring-2 focus:ring-[#FFD300] bg-[#f9f7fa] text-[#720D4C] font-semibold transition-all"
            style={{
              fontFamily: "'Inter', 'Poppins', sans-serif",
              boxShadow: "0 1px 4px 0 #E0A93511",
            }}
          >
            <option value="">Select duration</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} year{i === 0 ? "" : "s"}
              </option>
            ))}
            <option value={15}>15+ years</option>
          </select>

          <label style={{ fontWeight: 500, marginBottom: 8, display: "block" }}>
            Investment focus
          </label>
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <button
              type="button"
              onClick={() => {
                setFocus("Rental Income");
                setTouched(false);
              }}
              style={{
                flex: 1,
                background: focus === "Rental Income" ? "linear-gradient(90deg,#FFD740,#FFA000)" : "#23272f",
                color: focus === "Rental Income" ? "#23272f" : "#FFD740",
                border: focus === "Rental Income" ? "none" : "1px solid #FFD740",
                borderRadius: "0.5rem",
                fontWeight: 700,
                padding: "0.7rem 0",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "background 0.2s",
              }}
            >
              Rental Income
            </button>
            <button
              type="button"
              onClick={() => {
                setFocus("Resale");
                setTouched(false);
              }}
              style={{
                flex: 1,
                background: focus === "Resale" ? "linear-gradient(90deg,#FFD740,#FFA000)" : "#23272f",
                color: focus === "Resale" ? "#23272f" : "#FFD740",
                border: focus === "Resale" ? "none" : "1px solid #FFD740",
                borderRadius: "0.5rem",
                fontWeight: 700,
                padding: "0.7rem 0",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "background 0.2s",
              }}
            >
              Resale
            </button>
          </div>

          <label style={{ fontWeight: 500, marginBottom: 8, display: "block" }}>
            Risk appetite
          </label>
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            {["Low", "Moderate", "High"].map(opt => (
              <label
                key={opt}
                style={{
                  flex: 1,
                  cursor: "pointer",
                  background: risk === opt ? "#FFF9E5" : "#f9f7fa",
                  border: risk === opt ? "2px solid #FFD740" : "1.5px solid #E0A935",
                  borderRadius: "0.5rem",
                  padding: "0.6rem 0.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  color: risk === opt ? "#FFD740" : "#720D4C",
                  fontFamily: "'Inter', 'Poppins', sans-serif",
                  fontSize: "1rem",
                  transition: "all 0.2s"
                }}
              >
                <input
                  type="radio"
                  name="risk"
                  value={opt}
                  checked={risk === opt}
                  onChange={() => {
                    setRisk(opt as "Low" | "Moderate" | "High");
                    setTouched(false);
                  }}
                  style={{ marginRight: 6, accentColor: "#FFD740" }}
                />
                <span>
                  {opt}
                </span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(90deg,#FFD740,#FFA000)",
              color: "#23272f",
              padding: "0.9rem",
              borderRadius: "0.75rem",
              fontWeight: 700,
              fontSize: "1.1rem",
              border: "none",
              marginTop: "0.5rem",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "background 0.2s",
            }}
          >
            Calculate
          </button>
        </form>
        {touched && !ready && (
          <div style={{ color: "#FFD740", fontWeight: 600, marginTop: 16 }}>
            Please fill all fields to continue.
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
  )
}

export default RealEstateRiskCalculator;
