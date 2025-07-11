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
        onClick={() => navigate("/")}
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
        ← Back to Home
      </button>
      <div style={{ ...cardStyle, width: "100%", maxWidth: 480 }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
          Investment Risk Estimator
        </h2>
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
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #FFD740",
              marginBottom: "1.25rem",
              fontSize: "1.1rem",
              background: "#23272f",
              color: "#fff",
              outline: "none",
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
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #FFD740",
              marginBottom: "1.25rem",
              fontSize: "1.1rem",
              background: "#23272f",
              color: "#fff",
              outline: "none",
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
              <label key={opt} style={{ flex: 1, cursor: "pointer" }}>
                <input
                  type="radio"
                  name="risk"
                  value={opt}
                  checked={risk === opt}
                  onChange={() => {
                    setRisk(opt as "Low" | "Moderate" | "High");
                    setTouched(false);
                  }}
                  style={{ marginRight: 6 }}
                />
                <span style={{ color: risk === opt ? "#FFD740" : "#fff", fontWeight: 600 }}>
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
  );
};

export default RealEstateRiskCalculator;
