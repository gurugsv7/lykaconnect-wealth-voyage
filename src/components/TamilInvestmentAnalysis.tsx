import React, { useState } from "react";
import { fetchGeminiAnswer } from "@/utils/geminiApi";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

/* Removed amenitiesList and all amenities logic as amenities are no longer part of the form */

const propertyTypes = [
  "Apartment", "Villa", "Townhouse", "Penthouse", "Duplex"
];

const TamilInvestmentAnalysis = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "",
    location: "",
    bedrooms: "",
    price: "",
  });
  const [loading, setLoading] = useState(false); // loading state
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // For price, allow commas in input, but store as plain number string
    if (name === "price") {
      // Remove all non-digit except commas, then remove commas for storage
      const formatted = value.replace(/[^0-9,]/g, "");
      setForm(prev => ({
        ...prev,
        [name]: formatted.replace(/,/g, ""),
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === "number" ? value.replace(/\D/, "") : value,
      }));
    }
  };

  // Removed handleAmenity and amenities logic as amenities are no longer part of the form

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // No restrictions on phone number
    setPhoneError("");
    // Save email and phone to localStorage
    localStorage.setItem("lykaconnect_email", form.email);
    localStorage.setItem("lykaconnect_phone", form.phone);
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
Phone: ${form.phone}
Property Type: ${form.propertyType}
Location: ${form.location}
Bedrooms: ${form.bedrooms}
Price: AED ${form.price}

--- MARKET DATA ---
Capital Appreciation: Use this based on location:
- Jumeirah Village Circle (JVC): 13%
- Dubai Marina: 11%
- Business Bay: 8%
- Downtown Dubai: 8%
- Jumeirah Lake Towers (JLT): 7%
- Palm Jumeirah: 10%
- Arabian Ranches: 9%
- Dubai Hills Estate: 10%
- Al Barsha: 6%
- Al Furjan: 8%
- Jumeirah Beach Residence (JBR): 10%
- DAMAC Hills: 8%
- Dubai Sports City: 7%
- Dubai Silicon Oasis: 6%
- Meydan: 8%
- Mirdif: 6%
- International City: 7%
- The Greens: 7%
- The Views: 7%
- Arjan: 8%
- Dubai Creek Harbour: 10%
- Town Square: 7%
- Bluewaters Island: 10%
- Dubai South: 9%
- Jumeirah Golf Estates: 9%
- Discovery Gardens: 7%
- Motor City: 8%
- IMPZ (Production City): 9%
- The Springs: 8%
- Al Quoz: 6%
- Al Khail Heights: 7%

Rental Yield Data (avg annual rent and monthly rent by bedroom):

Downtown Dubai:
- Studio: Annual AED 80,569, Monthly AED 6,714
- 1BR: Annual AED 120,039, Monthly AED 10,003
- 2BR: Annual AED 190,716, Monthly AED 15,893
- 3BR: Annual AED 275,000, Monthly AED 22,917
- 4BR: Annual AED 450,000, Monthly AED 37,500

Dubai Marina:
- Studio: Annual AED 69,716, Monthly AED 5,810
- 1BR: Annual AED 95,420, Monthly AED 7,952
- 2BR: Annual AED 141,739, Monthly AED 11,812
- 3BR: Annual AED 210,000, Monthly AED 17,500
- 4BR: Annual AED 337,000, Monthly AED 28,083

Business Bay:
- Studio: Annual AED 68,086, Monthly AED 5,674
- 1BR: Annual AED 91,901, Monthly AED 7,658
- 2BR: Annual AED 129,856, Monthly AED 10,821
- 3BR: Annual AED 190,000, Monthly AED 15,833
- 4BR: Annual AED 290,000, Monthly AED 24,167

Jumeirah Lake Towers (JLT):
- Studio: Annual AED 57,726, Monthly AED 4,811
- 1BR: Annual AED 81,965, Monthly AED 6,830
- 2BR: Annual AED 119,488, Monthly AED 9,957
- 3BR: Annual AED 175,000, Monthly AED 14,583
- 4BR: Annual AED 275,000, Monthly AED 22,917

Palm Jumeirah:
- Studio: Annual AED 104,908, Monthly AED 8,742
- 1BR: Annual AED 153,374, Monthly AED 12,781
- 2BR: Annual AED 233,420, Monthly AED 19,452
- 3BR: Annual AED 320,000, Monthly AED 26,667
- 4BR: Annual AED 550,000, Monthly AED 45,833

Jumeirah Beach Residence (JBR):
- Studio: Annual AED 69,716, Monthly AED 5,810
- 1BR: Annual AED 95,000, Monthly AED 7,917
- 2BR: Annual AED 140,000, Monthly AED 11,667
- 3BR: Annual AED 190,000, Monthly AED 15,833
- 4BR: Annual AED 300,000, Monthly AED 25,000

Dubai Hills Estate:
- Studio: Annual AED 56,819, Monthly AED 4,735
- 1BR: Annual AED 91,899, Monthly AED 7,658
- 2BR: Annual AED 146,361, Monthly AED 12,197
- 3BR: Annual AED 225,000, Monthly AED 18,750
- 4BR: Annual AED 325,000, Monthly AED 27,083

Dubai Creek Harbour:
- 1BR: Annual AED 95,966, Monthly AED 7,997
- 2BR: Annual AED 147,812, Monthly AED 12,318
- 3BR: Annual AED 200,000, Monthly AED 16,667
- 4BR: Annual AED 320,000, Monthly AED 26,667

Jumeirah Village Circle (JVC):
- Studio: Annual AED 47,562, Monthly AED 3,963
- 1BR: Annual AED 67,568, Monthly AED 5,631
- 2BR: Annual AED 95,807, Monthly AED 7,984
- 3BR: Annual AED 145,000, Monthly AED 12,083
- 4BR: Annual AED 212,500, Monthly AED 17,708

Al Furjan:
- Studio: Annual AED 75,000, Monthly AED 6,250
- 1BR: Annual AED 75,000, Monthly AED 6,250
- 2BR: Annual AED 75,000, Monthly AED 6,250
- 4BR: Annual AED 270,000, Monthly AED 22,500

Arabian Ranches:
- 3BR: Annual AED 210,000, Monthly AED 17,500
- 4BR: Annual AED 295,000, Monthly AED 24,583

Al Barsha:
- Studio: Annual AED 55,000, Monthly AED 4,583
- 1BR: Annual AED 80,000, Monthly AED 6,667
- 2BR: Annual AED 120,000, Monthly AED 10,000
- 4BR: Annual AED 255,000, Monthly AED 21,250

DAMAC Hills:
- 4BR: Annual AED 230,000, Monthly AED 19,167

Dubai Sports City:
- Studio: Annual AED 39,692, Monthly AED 3,308
- 1BR: Annual AED 53,717, Monthly AED 4,476
- 2BR: Annual AED 76,386, Monthly AED 6,365
- 3BR: Annual AED 110,000, Monthly AED 9,167
- 4BR: Annual AED 160,000, Monthly AED 13,333

Dubai Silicon Oasis:
- Studio: Annual AED 55,000, Monthly AED 4,583
- 1BR: Annual AED 55,000, Monthly AED 4,583
- 2BR: Annual AED 85,000, Monthly AED 7,083

Meydan:
- 2BR: Annual AED 100,000, Monthly AED 8,333
- 4BR: Annual AED 250,000, Monthly AED 20,833

Mirdif:
- Studio: Annual AED 55,000, Monthly AED 4,583
- 1BR: Annual AED 55,000, Monthly AED 4,583
- 2BR: Annual AED 55,000, Monthly AED 4,583
- 4BR: Annual AED 250,000, Monthly AED 20,833

International City:
- Studio: Annual AED 30,000, Monthly AED 2,500
- 1BR: Annual AED 40,000, Monthly AED 3,333
- 2BR: Annual AED 65,000, Monthly AED 5,417

The Greens:
- 1BR: Annual AED 90,000, Monthly AED 7,500
- 2BR: Annual AED 140,000, Monthly AED 11,667
- 4BR: Annual AED 250,000, Monthly AED 20,833

The Views:
- 1BR: Annual AED 90,000, Monthly AED 7,500
- 2BR: Annual AED 140,000, Monthly AED 11,667
- 4BR: Annual AED 250,000, Monthly AED 20,833

Arjan:
- Studio: Annual AED 55,000, Monthly AED 4,583
- 1BR: Annual AED 55,000, Monthly AED 4,583
- 2BR: Annual AED 100,000, Monthly AED 8,333
- 4BR: Annual AED 250,000, Monthly AED 20,833

Town Square:
- Studio: Annual AED 42,500, Monthly AED 3,542
- 1BR: Annual AED 65,000, Monthly AED 5,417
- 2BR: Annual AED 100,000, Monthly AED 8,333
- 4BR: Annual AED 240,000, Monthly AED 20,000

Bluewaters Island:
- Studio: Annual AED 69,716, Monthly AED 5,810
- 1BR: Annual AED 95,420, Monthly AED 7,952
- 2BR: Annual AED 141,739, Monthly AED 11,812
- 4BR: Annual AED 1,100,000, Monthly AED 91,667

Dubai South:
- 1BR: Annual AED 30,000, Monthly AED 2,500
- 4BR: Annual AED 240,000, Monthly AED 20,000

Jumeirah Golf Estates:
- 4BR: Annual AED 350,000, Monthly AED 29,167

Discovery Gardens:
- Studio: Annual AED 30,000, Monthly AED 2,500
- 1BR: Annual AED 50,000, Monthly AED 4,167
- 2BR: Annual AED 75,000, Monthly AED 6,250
- 4BR: Annual AED 250,000, Monthly AED 20,833

Motor City:
- Studio: Annual AED 31,500, Monthly AED 2,625
- 1BR: Annual AED 50,000, Monthly AED 4,167
- 2BR: Annual AED 80,000, Monthly AED 6,667
- 4BR: Annual AED 250,000, Monthly AED 20,833

IMPZ (Production City):
- Studio: Annual AED 31,500, Monthly AED 2,625
- 1BR: Annual AED 50,000, Monthly AED 4,167
- 2BR: Annual AED 80,000, Monthly AED 6,667
- 4BR: Annual AED 250,000, Monthly AED 20,833

The Springs:
- 4BR: Annual AED 300,000, Monthly AED 25,000

Al Quoz:
- Studio: Annual AED 55,000, Monthly AED 4,583
- 1BR: Annual AED 55,000, Monthly AED 4,583
- 2BR: Annual AED 55,000, Monthly AED 4,583
- 4BR: Annual AED 250,000, Monthly AED 20,833

Al Khail Heights:
- 2BR: Annual AED 140,000, Monthly AED 11,667
- 4BR: Annual AED 275,000, Monthly AED 22,917



--- INSTRUCTIONS ---
- Use only the numbers from the dataset above.
- Do NOT show any other information or explanation.
- Format your answer with clear section headings as above.
- Your answer must be in English only.
- IMPORTANT: Never use values outside the dataset above. If a value is not present, do not estimate or invent it. Only use the provided numbers for all calculations and outputs.
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
          <LoadingOverlay />
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
            {/* Phone Number */}
            <div className="mb-5">
              <label className="block text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-[#111827] text-white rounded-[10px] border border-[#23233a] px-4 py-3 focus:outline-none focus:border-yellow-400 transition-all"
                placeholder="Phone number"
                autoComplete="off"
                required
              />
              {phoneError && (
                <div className="text-red-500 text-sm mt-1">{phoneError}</div>
              )}
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
            <div className="mb-5 relative">
              <label className="block text-gray-300 mb-2">Location in Dubai</label>
              <SearchableLocationDropdown
                value={form.location}
                onChange={loc => setForm(prev => ({ ...prev, location: loc }))}
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
                type="text"
                name="price"
                value={
                  form.price
                    ? Number(form.price.replace(/,/g, "")).toLocaleString("en-US")
                    : ""
                }
                onChange={handleChange}
                inputMode="numeric"
                min={0}
                className="w-full bg-[#111827] text-white rounded-[10px] border border-[#23233a] px-4 py-3 focus:outline-none focus:border-yellow-400 transition-all"
                placeholder="Property purchase price"
                autoComplete="off"
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

const dubaiLocations = [
  "Downtown Dubai",
  "Jumeirah Village Circle (JVC)",
  "Dubai Marina",
  "Business Bay",
  "Jumeirah Lake Towers (JLT)",
  "Palm Jumeirah",
  "Arabian Ranches",
  "Dubai Hills Estate",
  "Al Barsha",
  "Al Furjan",
  "Jumeirah Beach Residence (JBR)",
  "DAMAC Hills",
  "Dubai Sports City",
  "Dubai Silicon Oasis",
  "Meydan",
  "Mirdif",
  "International City",
  "The Greens",
  "The Views",
  "Arjan",
  "Dubai Creek Harbour",
  "Town Square",
  "Bluewaters Island",
  "Dubai South",
  "Jumeirah Golf Estates",
  "Discovery Gardens",
  "Motor City",
  "IMPZ (Production City)",
  "The Springs",
  "Al Quoz",
  "Al Khail Heights"
];

// Simple searchable dropdown component
function SearchableLocationDropdown({
  value,
  onChange
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = dubaiLocations.filter(loc =>
    loc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onChange={e => {
          setSearch(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Type to search location..."
        className="w-full bg-[#111827] text-white rounded-[10px] border border-[#23233a] px-4 py-3 focus:outline-none focus:border-yellow-400 transition-all"
        autoComplete="off"
      />
      {open && (
        <div className="absolute z-20 left-0 right-0 bg-[#18192a] border border-yellow-400 rounded-[10px] mt-1 max-h-56 overflow-y-auto shadow-lg">
          {filtered.length === 0 && (
            <div className="px-4 py-2 text-gray-400">No matches</div>
          )}
          {filtered.map(loc => (
            <div
              key={loc}
              className={`px-4 py-2 cursor-pointer hover:bg-yellow-400 hover:text-black transition-all ${
                value === loc ? "bg-yellow-400 text-black" : "text-white"
              }`}
              onMouseDown={() => {
                onChange(loc);
                setSearch(loc);
                setOpen(false);
              }}
            >
              {loc}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LoadingOverlay() {
  const loadingMessages = [
    "Generating your analysis...",
    "Crunching Dubai property data...",
    "Calculating rental yields...",
    "Estimating capital appreciation...",
    "Building your wealth forecast...",
    "AI is working on your results...",
    "Almost there, preparing insights...",
    "Finding the best investment numbers...",
    "Analyzing market trends...",
    "Finalizing your personalized report..."
  ];
  const [msgIdx, setMsgIdx] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % loadingMessages.length);
    }, 3500); // Slower: 3.5 seconds per message
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 border-solid mb-6"></div>
        <div className="text-yellow-300 text-xl font-bold" style={{minHeight: 40}}>
          {loadingMessages[msgIdx]}
        </div>
      </div>
    </div>
  );
}

export default TamilInvestmentAnalysis;
