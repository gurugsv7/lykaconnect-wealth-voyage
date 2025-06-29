import React, { useState } from "react";
import { fetchGeminiAnswer } from "@/utils/geminiApi";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const amenitiesList = [
  "Swimming Pool", "Balcony", "Storage", "Gym",
  "Garden", "Elevator", "Parking", "Maid's Room",
  "Concierge", "Security", "Study Room", "Spa"
];

const propertyTypes = [
  "Apartment", "Villa", "Townhouse", "Penthouse", "Studio", "Loft", "Duplex"
];

const TamilInvestmentAnalysis = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    propertyType: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    price: "",
    yearBuilt: "",
    floorLevel: "",
    parkingSpaces: "",
    amenities: [] as string[],
  });
  const [loading, setLoading] = useState(false); // loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "number" ? value.replace(/\D/, "") : value,
    }));
  };

  const handleAmenity = (amenity: string) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // start loading
    const prompt = `
You are a Dubai property investment AI. Given the following property details and market data, answer ONLY these points:

1. Projected Rental Income
- Monthly Rent: ___
- Annual Rent: ___
- Total Rent Over 5 Years: ___

2. Capital Appreciation
- Capital Appreciation Rate: ___
- Projected Property Value in 5 Years: ___
- Gain from Appreciation: ___

3. ROI Summary
- Overall ROI (5 Years): ___
- Total Expected Return: ___

4. Millionaire Timeline
- You'll reach AED 3.67 million in: ___ years

5. Wealth Growth Chart (10 years)
- Table or list: Property Value, Cumulative Rent, Total Wealth for each year

6. Investment Score
- Score: High / Moderate / Low
- Reason: ___

7. AI Investment Summary
A short, warm message for the user, summarizing the above in English only.

--- PROPERTY DETAILS ---
Name: ${form.fullName}
Email: ${form.email}
Property Type: ${form.propertyType}
Location: ${form.location}
Bedrooms: ${form.bedrooms}
Bathrooms: ${form.bathrooms}
Area: ${form.area} sq ft
Price: AED ${form.price}
Year Built: ${form.yearBuilt}
Floor Level: ${form.floorLevel}
Parking Spaces: ${form.parkingSpaces}
Amenities: ${form.amenities.join(", ")}

--- MARKET DATA ---
Capital Appreciation: Use this based on location:
- Jumeirah Village Circle: 13%
- Dubai Marina: 11%
- Business Bay: 8%
- Downtown Dubai: 8%
- Jumeirah Lake Towers: 7%

Rental Yield Data (avg annual rent by bedroom):
Downtown Dubai:
- Studio: AED 80000
- 1BR: AED 120000
- 2BR: AED 180000

Jumeirah Village Circle:
- Studio: AED 35000
- 1BR: AED 55000
- 2BR: AED 80000

Dubai Marina:
- Studio: AED 50000
- 1BR: AED 90000
- 2BR: AED 140000

Business Bay:
- Studio: AED 45000
- 1BR: AED 85000
- 2BR: AED 130000

Jumeirah Lake Towers:
- Studio: AED 45000
- 1BR: AED 85000
- 2BR: AED 125000

--- INSTRUCTIONS ---
- Use only the numbers from the dataset above.
- Do NOT show any other information or explanation.
- Format your answer with clear section headings as above.
- Your answer must be in English only.
`;
    try {
      const answer = await fetchGeminiAnswer(prompt);
      setLoading(false); // stop loading
      navigate("/tamil-investment-results", { state: { form, aiResult: answer } });
    } catch (err) {
      setLoading(false); // stop loading
      navigate("/tamil-investment-results", { state: { form, aiResult: "Sorry, there was an error fetching your analysis." } });
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0f0f1b] py-10 px-2 flex flex-col items-center">
        {/* Loading overlay */}
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 border-solid mb-6"></div>
              <div className="text-yellow-300 text-xl font-bold">Generating your analysis...</div>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            navigate("/#tools");
            setTimeout(() => {
              const el = document.getElementById("tools");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          className="mb-8 self-start bg-[#FFD300] hover:bg-yellow-400 text-black font-bold px-6 py-2 rounded-lg shadow transition-all"
          style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
        >
          ← Back to Home
        </button>
        {/* Title and subtitle above border, centered */}
        <div className="w-full max-w-[1000px] mx-auto mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#FFD300] mb-2 tracking-wide uppercase" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
            Investment Analysis
          </h1>
          <p className="text-gray-300 text-lg">
            Specialized rental income prediction with community-specific insights
          </p>
        </div>
        <div
          className="w-full max-w-[1000px] bg-[#18192a] rounded-[20px] border border-yellow-400 p-8 md:p-10 mx-auto"
          style={{
            boxShadow: "0 4px 24px 0 rgba(20,20,40,0.25), 0 0 0 1px #23233a inset"
          }}
        >
          <form onSubmit={handleSubmit} autoComplete="off">
            {/* Full Name */}
            <div className="mb-5">
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full bg-[#111827] text-white rounded-[10px] border border-[#23233a] px-4 py-3 focus:outline-none focus:border-yellow-400 transition-all"
                placeholder="Enter your name"
              />
            </div>
            {/* Email Address */}
            <div className="mb-5">
              <label className="block text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-[#111827] text-white rounded-[10px] border border-[#23233a] px-4 py-3 focus:outline-none focus:border-yellow-400 transition-all"
                placeholder="Enter your email"
              />
            </div>
            {/* Property Type */}
            <div className="mb-5">
              <label className="block text-gray-300 mb-2">Property Type</label>
              <select
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                className="w-full bg-[#111827] text-white rounded-[10px] border border-[#23233a] px-4 py-3 focus:outline-none focus:border-yellow-400 transition-all"
              >
                <option value="">Select type</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            {/* Location in Dubai */}
            <div className="mb-5">
              <label className="block text-gray-300 mb-2">Location in Dubai</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full bg-[#111827] text-white rounded-[10px] border border-[#23233a] px-4 py-3 focus:outline-none focus:border-yellow-400 transition-all"
                placeholder="e.g., Downtown Dubai, JVC, etc."
              />
            </div>
            {/* Bedrooms */}
            <div className="mb-5">
              <label className="block text-gray-300 mb-2">Bedrooms</label>
              <select
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                className="w-full bg-[#111827] text-white rounded-[10px] border border-[#23233a] px-4 py-3 focus:outline-none focus:border-yellow-400 transition-all"
              >
                <option value="">Select</option>
                <option value="Studio">Studio</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5+">5+</option>
              </select>
            </div>
            {/* Price (AED) */}
            <div className="mb-8">
              <label className="block text-gray-300 mb-2">Price (AED)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min={0}
                className="w-full bg-[#111827] text-white rounded-[10px] border border-[#23233a] px-4 py-3 focus:outline-none focus:border-yellow-400 transition-all"
                placeholder="Property purchase price"
              />
            </div>
            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full md:w-auto px-10 py-3 bg-gradient-to-r from-[#FFD300] to-[#FFA500] text-black font-bold rounded-full shadow-md hover:shadow-yellow-300/40 transition-all text-lg"
                style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
              >
                Generate Income Analysis
              </button>
            </div>
          </form>
        </div>
        <style>{`
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
-webkit-appearance: none;
margin: 0;
}
input[type="number"] {
-moz-appearance: textfield;
}
/* Spinner animation */
@keyframes spin {
0% { transform: rotate(0deg);}
100% { transform: rotate(360deg);}
}
.animate-spin {
animation: spin 1s linear infinite;
}
`}</style>
      </div>
    </>
  );
};

export default TamilInvestmentAnalysis;
