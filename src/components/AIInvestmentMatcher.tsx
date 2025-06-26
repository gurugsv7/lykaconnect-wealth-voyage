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

const AIInvestmentMatcher = () => {
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
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

    // Simulate AI-powered property matching
    setTimeout(() => {
      const matchedProperties = [
        {
          name: 'Luxury Apartment in Dubai Marina',
          location: 'Dubai Marina',
          price: 2500000,
          expectedROI: 7.5,
          bedrooms: '2',
          bathrooms: '3',
          area: 1500,
          amenities: ['Pool', 'Gym', 'Balcony'],
          matchScore: 92,
          matchReasons: ['Matches your preferred location', 'High ROI potential', 'Includes desired amenities'],
        },
        {
          name: 'Stunning Villa in Palm Jumeirah',
          location: 'Palm Jumeirah',
          price: 8000000,
          expectedROI: 6.8,
          bedrooms: '4',
          bathrooms: '5',
          area: 4000,
          amenities: ['Pool', 'Beach Access', 'Security'],
          matchScore: 88,
          matchReasons: ['Matches your property type preference', 'Located in a prime area', 'Offers high-end amenities'],
        },
        {
          name: 'Modern Townhouse in Arabian Ranches',
          location: 'Arabian Ranches',
          price: 3200000,
          expectedROI: 7.2,
          bedrooms: '3',
          bathrooms: '4',
          area: 2200,
          amenities: ['Park View', 'Security', 'Parking'],
          matchScore: 85,
          matchReasons: ['Matches your budget range', 'Family-friendly community', 'Good investment potential'],
        },
      ];

      setRecommendations(matchedProperties);
      setLoading(false);
      toast({
        title: "AI Recommendations Ready!",
        description: "Check out the properties our AI matched for you.",
      })
    }, 2500);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-950 via-black to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30 mb-4">
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
          {recommendations.length > 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">🎯 AI-Matched Properties</h3>
                <p className="text-gray-400">Based on your investment criteria</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {recommendations.map((property, index) => (
                  <Card key={index} className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-600/30 hover:border-blue-500/50 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-white text-lg">{property.name}</CardTitle>
                        <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                          {property.matchScore}% Match
                        </Badge>
                      </div>
                      <p className="text-blue-400 flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.location}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                          <div className="text-xl font-bold text-blue-400">AED {property.price.toLocaleString()}</div>
                          <div className="text-gray-400 text-xs">Property Price</div>
                        </div>
                        <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                          <div className="text-xl font-bold text-green-400">{property.expectedROI}%</div>
                          <div className="text-gray-400 text-xs">Expected ROI</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-300">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {property.bedrooms} BR
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {property.bathrooms} Bath
                        </div>
                        <div className="flex items-center">
                          <Square className="h-4 w-4 mr-1" />
                          {property.area} sq ft
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Why it matches:</span>
                          <div className="flex">
                            {[...Array(Math.floor(property.matchScore / 20))].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <ul className="text-xs text-gray-300 space-y-1">
                          {property.matchReasons.map((reason, i) => (
                            <li key={i} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-slate-800/30 border-slate-700">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-white mb-4">How Our AI Matching Works</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Brain className="h-6 w-6 text-blue-400" />
                        </div>
                        <h5 className="text-white font-medium mb-2">Smart Analysis</h5>
                        <p className="text-gray-400 text-sm">AI analyzes thousands of properties against your criteria</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <TrendingUp className="h-6 w-6 text-purple-400" />
                        </div>
                        <h5 className="text-white font-medium mb-2">Market Insights</h5>
                        <p className="text-gray-400 text-sm">Real-time market data and growth predictions</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Star className="h-6 w-6 text-green-400" />
                        </div>
                        <h5 className="text-white font-medium mb-2">Perfect Match</h5>
                        <p className="text-gray-400 text-sm">Scored recommendations tailored to your goals</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Empty State */}
          {recommendations.length === 0 && !loading && (
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
