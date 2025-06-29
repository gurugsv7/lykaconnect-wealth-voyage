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
    bathrooms: "",
    area: "",
    price: "",
    yearBuilt: "",
    floorLevel: "",
    parkingSpaces: "",
    amenities: [] as string[],
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

Rental Yield Data (avg annual rent and monthly rent by bedroom):

Downtown Dubai:
- Studio: Annual AED 1,039,198, Monthly AED 86,600
- 1BR: Annual AED 1,910,998, Monthly AED 159,250
- 2BR: Annual AED 2,927,997, Monthly AED 244,000
- 3BR: Annual AED 4,639,727, Monthly AED 386,644
- 4BR: Annual AED 16,021,799, Monthly AED 1,335,150

Dubai Marina:
- Studio: Annual AED 882,600, Monthly AED 73,550
- 1BR: Annual AED 1,285,199, Monthly AED 107,100
- 2BR: Annual AED 2,018,938, Monthly AED 168,245
- 3BR: Annual AED 3,106,199, Monthly AED 258,850
- 4BR: Annual AED 5,950,200, Monthly AED 495,850

Business Bay:
- Studio: Annual AED 963,538, Monthly AED 80,295
- 1BR: Annual AED 1,301,999, Monthly AED 108,500
- 2BR: Annual AED 1,872,599, Monthly AED 156,050
- 3BR: Annual AED 2,564,933, Monthly AED 213,744
- 4BR: Annual AED 5,494,999, Monthly AED 457,917

Palm Jumeirah:
- Studio: Annual AED 1,380,599, Monthly AED 115,050
- 1BR: Annual AED 2,255,998, Monthly AED 188,000
- 2BR: Annual AED 4,577,400, Monthly AED 381,450
- 3BR: Annual AED 4,547,969, Monthly AED 378,997
- 4BR: Annual AED 22,120,000, Monthly AED 1,843,333

Arabian Ranches:
- Studio: Annual AED 1,908,000, Monthly AED 159,000
- 1BR: Annual AED 1,908,000, Monthly AED 159,000
- 2BR: Annual AED 1,908,000, Monthly AED 159,000
- 3BR: Annual AED 1,908,000, Monthly AED 159,000
- 4BR: Annual AED 1,908,000, Monthly AED 159,000

Dubai Hills Estate:
- Studio: Annual AED 959,940, Monthly AED 79,995
- 1BR: Annual AED 1,225,200, Monthly AED 102,100
- 2BR: Annual AED 1,961,999, Monthly AED 163,500
- 3BR: Annual AED 3,599,999, Monthly AED 300,000
- 4BR: Annual AED 1,012,536, Monthly AED 84,378

Al Barsha:
- Studio: Annual AED 658,500, Monthly AED 54,875
- 1BR: Annual AED 896,400, Monthly AED 74,700
- 2BR: Annual AED 1,120,794, Monthly AED 93,400
- 3BR: Annual AED 1,691,700, Monthly AED 140,975
- 4BR: Annual AED 770,398, Monthly AED 64,200

Al Furjan:
- Studio: Annual AED 604,199, Monthly AED 50,350
- 1BR: Annual AED 1,085,338, Monthly AED 90,445
- 2BR: Annual AED 1,386,592, Monthly AED 115,549
- 3BR: Annual AED 1,856,698, Monthly AED 154,725
- 4BR: Annual AED 1,031,245, Monthly AED 85,937

DAMAC Hills:
- Studio: Annual AED 622,763, Monthly AED 51,897
- 1BR: Annual AED 923,345, Monthly AED 76,945
- 2BR: Annual AED 1,635,748, Monthly AED 136,312
- 3BR: Annual AED 2,379,998, Monthly AED 198,333
- 4BR: Annual AED 895,499, Monthly AED 74,625

Dubai Sports City:
- Studio: Annual AED 559,797, Monthly AED 46,650
- 1BR: Annual AED 814,796, Monthly AED 67,900
- 2BR: Annual AED 1,102,798, Monthly AED 91,900
- 3BR: Annual AED 1,481,247, Monthly AED 123,437
- 4BR: Annual AED 793,498, Monthly AED 66,125

Dubai Silicon Oasis:
- Studio: Annual AED 575,400, Monthly AED 47,950
- 1BR: Annual AED 737,999, Monthly AED 61,500
- 2BR: Annual AED 1,110,000, Monthly AED 92,500
- 3BR: Annual AED 1,607,998, Monthly AED 134,000
- 4BR: Annual AED 703,198, Monthly AED 58,600

Mirdif:
- Studio: Annual AED 697,500, Monthly AED 58,125
- 1BR: Annual AED 1,028,486, Monthly AED 85,707
- 2BR: Annual AED 1,446,000, Monthly AED 120,500
- 3BR: Annual AED 1,969,846, Monthly AED 164,154
- 4BR: Annual AED 2,714,998, Monthly AED 226,250

International City:
- Studio: Annual AED 457,799, Monthly AED 38,150
- 1BR: Annual AED 695,398, Monthly AED 57,950
- 2BR: Annual AED 962,998, Monthly AED 80,250
- 3BR: Annual AED 1,320,000, Monthly AED 110,000
- 4BR: Annual AED 506,400, Monthly AED 42,200

The Greens:
- Studio: Annual AED 866,695, Monthly AED 72,225
- 1BR: Annual AED 1,223,400, Monthly AED 101,950
- 2BR: Annual AED 1,807,199, Monthly AED 150,600
- 3BR: Annual AED 2,676,000, Monthly AED 223,000
- 4BR: Annual AED 1,256,400, Monthly AED 104,700

The Views:
- Studio: Annual AED 921,540, Monthly AED 76,795
- 1BR: Annual AED 1,318,500, Monthly AED 109,875
- 2BR: Annual AED 2,103,299, Monthly AED 175,275
- 3BR: Annual AED 3,179,999, Monthly AED 265,000
- 4BR: Annual AED 1,587,600, Monthly AED 132,300

Arjan:
- Studio: Annual AED 635,399, Monthly AED 52,950
- 1BR: Annual AED 862,799, Monthly AED 71,900
- 2BR: Annual AED 1,285,194, Monthly AED 107,100
- 3BR: Annual AED 1,862,998, Monthly AED 155,250
- 4BR: Annual AED 901,193, Monthly AED 75,099

Dubai Creek Harbour:
- Studio: Annual AED 1,440,000, Monthly AED 120,000
- 1BR: Annual AED 1,414,139, Monthly AED 117,845
- 2BR: Annual AED 2,099,872, Monthly AED 174,989
- 3BR: Annual AED 3,197,999, Monthly AED 266,500
- 4BR: Annual AED 6,600,000, Monthly AED 550,000

Town Square:
- Studio: Annual AED 586,199, Monthly AED 48,850
- 1BR: Annual AED 760,799, Monthly AED 63,400
- 2BR: Annual AED 1,116,600, Monthly AED 93,050
- 3BR: Annual AED 1,535,992, Monthly AED 127,999
- 4BR: Annual AED 898,588, Monthly AED 74,882

Bluewaters Island:
- Studio: Annual AED 6,636,000, Monthly AED 553,000
- 1BR: Annual AED 3,519,898, Monthly AED 293,325
- 2BR: Annual AED 5,143,200, Monthly AED 428,600
- 3BR: Annual AED 7,152,000, Monthly AED 596,000
- 4BR: Annual AED 14,233,333, Monthly AED 1,186,111

Dubai South:
- Studio: Annual AED 515,939, Monthly AED 42,995
- 1BR: Annual AED 713,388, Monthly AED 59,449
- 2BR: Annual AED 1,005,534, Monthly AED 83,794
- 3BR: Annual AED 1,408,798, Monthly AED 117,400
- 4BR: Annual AED 848,968, Monthly AED 70,747

Jumeirah Golf Estates:
- Studio: Annual AED 1,864,800, Monthly AED 155,400
- 1BR: Annual AED 1,308,900, Monthly AED 109,075
- 2BR: Annual AED 1,592,400, Monthly AED 132,700
- 3BR: Annual AED 2,632,843, Monthly AED 219,404
- 4BR: Annual AED 2,161,332, Monthly AED 180,111

Discovery Gardens:
- Studio: Annual AED 635,399, Monthly AED 52,950
- 1BR: Annual AED 850,799, Monthly AED 70,900
- 2BR: Annual AED 1,269,600, Monthly AED 105,800
- 3BR: Annual AED 638,400, Monthly AED 53,200
- 4BR: Annual AED 638,400, Monthly AED 53,200

Motor City:
- Studio: Annual AED 731,333, Monthly AED 60,944
- 1BR: Annual AED 1,012,199, Monthly AED 84,350
- 2BR: Annual AED 1,676,998, Monthly AED 139,750
- 3BR: Annual AED 2,698,664, Monthly AED 224,889
- 4BR: Annual AED 996,000, Monthly AED 83,000

IMPZ (Production City):
- Studio: Annual AED 563,159, Monthly AED 46,930
- 1BR: Annual AED 758,394, Monthly AED 63,200
- 2BR: Annual AED 1,166,999, Monthly AED 97,250
- 3BR: Annual AED 1,404,000, Monthly AED 117,000
- 4BR: Annual AED 595,200, Monthly AED 49,600

The Springs:
- Studio: Annual AED 1,114,795, Monthly AED 92,900
- 1BR: Annual AED 1,114,795, Monthly AED 92,900
- 2BR: Annual AED 1,114,795, Monthly AED 92,900
- 3BR: Annual AED 1,114,795, Monthly AED 92,900
- 4BR: Annual AED 1,114,795, Monthly AED 92,900

Al Quoz:
- Studio: Annual AED 633,467, Monthly AED 52,789
- 1BR: Annual AED 829,200, Monthly AED 69,100
- 2BR: Annual AED 2,402,216, Monthly AED 200,185
- 3BR: Annual AED 1,483,743, Monthly AED 123,645
- 4BR: Annual AED 633,600, Monthly AED 52,800

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
                    ? Number(form.price.replace(/,/g, "")).toLocaleString("en-IN")
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

export default TamilInvestmentAnalysis;
