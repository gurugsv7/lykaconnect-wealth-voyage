import React from "react";

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: "1rem",
  padding: "1.5rem",
  margin: "1rem 0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  color: "#fff",
  maxWidth: 600,
  width: "100%",
};

const UAEInvestorVisaInfo: React.FC = () => (
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
    <div style={{ ...cardStyle, width: "100%", maxWidth: 600 }}>
      <h2 style={{ fontSize: "1.7rem", fontWeight: 700, marginBottom: "1rem", color: "#FFD740" }}>
        UAE Investor Visa: Process, Requirements & Benefits
      </h2>
      <p style={{ marginBottom: "1rem", color: "#fff" }}>
        The UAE Investor Visa offers 2–10 year residency, family sponsorship, and access to banking and business opportunities. Here’s what you need to know:
      </p>
      <ul style={{ marginBottom: "1rem", color: "#FFD740", fontWeight: 500 }}>
        <li>• Minimum investment: AED 750,000 in real estate</li>
        <li>• Valid for 2, 5, or 10 years (renewable)</li>
        <li>• Sponsor spouse, children, and dependents</li>
        <li>• Access to UAE banking, driving license, and business setup</li>
        <li>• No personal income tax</li>
      </ul>
      <h3 style={{ color: "#FFD740", fontWeight: 600, marginBottom: 8 }}>Process:</h3>
      <ol style={{ color: "#fff", marginBottom: "1rem" }}>
        <li>1. Purchase property worth AED 750,000 or more</li>
        <li>2. Obtain title deed and no-objection certificate</li>
        <li>3. Apply for visa through Dubai Land Department or relevant authority</li>
        <li>4. Complete medical and background checks</li>
        <li>5. Receive residency visa and Emirates ID</li>
      </ol>
      <h3 style={{ color: "#FFD740", fontWeight: 600, marginBottom: 8 }}>Benefits:</h3>
      <ul style={{ color: "#fff" }}>
        <li>• Long-term residency and stability</li>
        <li>• Family sponsorship</li>
        <li>• Access to UAE services and lifestyle</li>
        <li>• Pathway to business and investment opportunities</li>
      </ul>
      <div style={{ marginTop: "2rem", color: "#FFD740", fontWeight: 600 }}>
        For personalized guidance, contact LykaConnect advisory team.
      </div>
    </div>
  </div>
);

export default UAEInvestorVisaInfo;
