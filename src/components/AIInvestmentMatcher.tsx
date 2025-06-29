import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, TrendingUp, MapPin, Bed, Bath, Square, Star, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { fetchGeminiAnswer } from "@/utils/geminiApi";

const AIInvestmentMatcher = () => {
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const { toast } = useToast();

  const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Land', 'Commercial'];
  const locations = ['Downtown Dubai', 'Dubai Marina', 'Palm Jumeirah', 'Jumeirah Village Circle', 'Business Bay', 'Arabian Ranches'];
  const bedroomOptions = ['Studio', '1', '2', '3', '4+'];
  const allAmenities = ['Pool', 'Gym', 'Beach Access', 'Park View', 'Balcony', 'Security', 'Parking'];

  const toggleAmenity = (amenity) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAiResult(null);

    // Construct the prompt for Gemini AI
    const prompt = `
You are a Dubai property investment AI. Given the following criteria, recommend 3 properties with name, location, price, expected ROI, and a brief reason for each match:
Property Type: ${propertyType}
Location: ${location}
Budget: AED ${minBudget} - AED ${maxBudget}
Bedrooms: ${bedrooms}
Area: ${minArea} - ${maxArea} sq ft
Amenities: ${amenities.join(", ")}
Respond as a list of property recommendations.`;

    try {
      const answer = await fetchGeminiAnswer(prompt);
      setAiResult(answer);
    } catch (err) {
      setAiResult("Sorry, there was an error fetching your recommendations.");
    }
    setLoading(false);
    toast({
      title: "AI Recommendations Ready!",
      description: "Check out the properties our AI matched for you.",
    })
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-950 via-black to-slate-900 relative">
      {/* Back to Home Button */}
      <Button
        variant="ghost"
        className="absolute top-6 left-6 z-10 bg-black/40 text-blue-300 hover:bg-black/70"
        onClick={() => {
          navigate("/#tools");
          setTimeout(() => {
            const el = document.getElementById("tools");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
      >
        ← Back to Home
      </Button>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-blue-600/20 text-blue-400 mb-4">
            AI-Powered Matching
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Investment Matcher
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tell us your investment criteria and our AI will find the perfect Dubai properties for you
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Investment Form */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Brain className="mr-2 h-6 w-6 text-blue-400" />
                Investment Criteria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="propertyType" className="text-gray-300">Property Type</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location" className="text-gray-300">Location</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minBudget" className="text-gray-300">Min Budget (AED)</Label>
                    <Input
                      id="minBudget"
                      type="number"
                      value={minBudget}
                      onChange={(e) => setMinBudget(e.target.value)}
                      placeholder="e.g., 500000"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxBudget" className="text-gray-300">Max Budget (AED)</Label>
                    <Input
                      id="maxBudget"
                      type="number"
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(e.target.value)}
                      placeholder="e.g., 1500000"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bedrooms" className="text-gray-300">Bedrooms</Label>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      {bedroomOptions.map((beds) => (
                        <SelectItem key={beds} value={beds}>{beds} BR</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minArea" className="text-gray-300">Min Area (sq ft)</Label>
                    <Input
                      id="minArea"
                      type="number"
                      value={minArea}
                      onChange={(e) => setMinArea(e.target.value)}
                      placeholder="e.g., 800"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxArea" className="text-gray-300">Max Area (sq ft)</Label>
                    <Input
                      id="maxArea"
                      type="number"
                      value={maxArea}
                      onChange={(e) => setMaxArea(e.target.value)}
                      placeholder="e.g., 2000"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Amenities</Label>
                  <ScrollArea className="rounded-md border bg-slate-700 border-slate-600 p-4 h-32">
                    <div className="grid grid-cols-2 gap-2">
                      {allAmenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity}
                            checked={amenities.includes(amenity)}
                            onCheckedChange={() => toggleAmenity(amenity)}
                            className="border-slate-500 text-blue-500 focus:ring-blue-500"
                          />
                          <Label htmlFor={amenity} className="text-sm text-gray-300">{amenity}</Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                  disabled={loading}
                >
                  {loading ? 'Finding Matches...' : 'Find My Investment Match'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* AI Recommendations - Full Width */}
          {aiResult && (
            <Card className="bg-slate-800/30 border-slate-700">
              <CardContent className="p-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-white mb-4">Gemini AI Recommendations</h4>
                  <div className="text-yellow-300 whitespace-pre-line">{aiResult}</div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {!aiResult && !loading && (
            <Card className="bg-slate-800/30 border-slate-700 border-dashed">
              <CardContent className="text-center py-16">
                <Brain className="h-16 w-16 text-blue-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400 text-lg">Fill out your investment criteria to get AI-powered property recommendations</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIInvestmentMatcher;
