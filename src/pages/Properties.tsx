// filepath: c:\Users\gurug\OneDrive\Desktop\web apps\lykaconnect-wealth-voyage\src\pages\Properties.tsx
import PropertyListings from "@/components/PropertyListings";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Properties = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/properties") {
      navigate("/properties#listings", { replace: true });
    }
  }, [navigate, pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white">
      <button
        onClick={() => {
          navigate("/#tools");
          setTimeout(() => {
            const el = document.getElementById("tools");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
        className="mb-8 bg-amber-400 hover:bg-amber-500 text-black font-bold px-6 py-2 rounded-lg shadow transition-all"
        style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
      >
        ← Back to Home
      </button>
      <PropertyListings />
    </div>
  );
};

export default Properties;
