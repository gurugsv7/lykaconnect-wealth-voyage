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
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('');
  const [preferredAreas, setPreferredAreas] = useState<string[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [minRoi, setMinRoi] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const { toast } = useToast();

  const areas = [
    'Dubai Marina', 'Downtown Dubai', 'Business Bay', 'JLT', 'DIFC', 
    'Palm Jumeirah', 'JBR', 'Dubai Hills', 'Arabian Ranches', 'Dubai South'
  ];

  const types = ['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Studio'];

  const handleAreaChange = (area: string, checked: boolean) => {
    if (checked) {
      setPreferredAreas([...preferredAreas, area]);
    } else {
      setPreferredAreas(preferredAreas.filter(a => a !== area));
    }
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setPropertyTypes([...propertyTypes, type]);
    } else {
      setPropertyTypes(propertyTypes.filter(t => t !== type));
    }
  };

  const mockRecommendations = [
    {
      id: 1,
      title: "Marina Heights Premium",
      location: "Dubai Marina",
      price: 2200000,
      monthlyRent: 14000,
      roi: 7.6,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
      matchScore: 95,
      whyMatched: "Perfect fit for your budget with high ROI potential"
    },
    {
      id: 2,
      title: "Business Bay Elite",
      location: "Business Bay",
      price: 1800000,
      monthlyRent: 12000,
      roi: 8.0,
      bedrooms: 1,
      bathrooms: 2,
      area: 900,
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=800&auto=format&fit=crop",
      matchScore: 92,
      whyMatched: "Exceeds your ROI expectations with growing area value"
    },
    {
      id: 3,
      title: "Downtown Luxury Suite",
      location: "Downtown Dubai",
      price: 2500000,
      monthlyRent: 16000,
      roi: 7.7,
      bedrooms: 2,
      bathrooms: 3,
      area: 1400,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop",
      matchScore: 88,
      whyMatched: "Premium location with stable rental demand"
    }
  ];

  const handleFindProperties = async () => {
    if (!investmentAmount || !riskTolerance) {
      toast({
        title: "Missing Information",
        description: "Please fill in your investment amount and risk tolerance.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const filteredRecommendations = mockRecommendations.filter(property => {
        const budget = parseInt(investmentAmount);
        const withinBudget = property.price <= budget * 1.1; // 10% flexibility
        const meetsRoi = parseFloat(minRoi) ? property.roi >= parseFloat(minRoi) : true;
        const inPreferredArea = preferredAreas.length === 0 || preferredAreas.some(area => property.location.includes(area));
        
        return withinBudget && meetsRoi && inPreferredArea;
      });

      setRecommendations(filteredRecommendations);
      setIsLoading(false);
      
      toast({
        title: "AI Analysis Complete",
        description: `Found ${filteredRecommendations.length} properties matching your criteria.`
      });
    }, 2000);
  };

  return (
    <section id="ai-matcher" className="py-12 md:py-20 bg-gradient-to-br from-black via-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            AI Investment
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Property Matcher
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Tell us your investment goals and let our AI find the perfect property for you
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Input Form */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center text-lg md:text-xl">
                  <Brain className="mr-2 h-5 w-5 text-amber-400" />
                  Your Investment Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="investment-amount" className="text-gray-300 text-sm md:text-base">Investment Amount (AED)</Label>
                  <Input
                    id="investment-amount"
                    type="number"
                    placeholder="e.g., 2000000"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300 text-sm md:text-base">Risk Tolerance</Label>
                  <Select value={riskTolerance} onValueChange={setRiskTolerance}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-12">
                      <SelectValue placeholder="Select your risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Conservative (Low Risk)</SelectItem>
                      <SelectItem value="medium">Moderate (Medium Risk)</SelectItem>
                      <SelectItem value="high">Aggressive (High Risk)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min-roi" className="text-gray-300 text-sm md:text-base">Minimum Expected ROI (%)</Label>
                  <Input
                    id="min-roi"
                    type="number"
                    placeholder="e.g., 7"
                    value={minRoi}
                    onChange={(e) => setMinRoi(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white h-12 text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-300 text-sm md:text-base">Preferred Areas</Label>
                  <ScrollArea className="h-32 w-full rounded-md border border-slate-600 bg-slate-700/50 p-3">
                    <div className="space-y-2">
                      {areas.map((area) => (
                        <div key={area} className="flex items-center space-x-2 p-1">
                          <Checkbox
                            id={area}
                            checked={preferredAreas.includes(area)}
                            onCheckedChange={(checked) => handleAreaChange(area, checked as boolean)}
                            className="h-4 w-4"
                          />
                          <Label htmlFor={area} className="text-sm text-gray-300 flex-1 cursor-pointer">{area}</Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-300 text-sm md:text-base">Property Types</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {types.map((type) => (
                      <div key={type} className="flex items-center space-x-2 p-2">
                        <Checkbox
                          id={type}
                          checked={propertyTypes.includes(type)}
                          onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                          className="h-4 w-4"
                        />
                        <Label htmlFor={type} className="text-sm text-gray-300 flex-1 cursor-pointer">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleFindProperties}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-500 hover:to-amber-700 h-12 text-base font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Brain className="mr-2 h-4 w-4 animate-spin" />
                      AI Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Find My Perfect Property
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-4 md:space-y-6">
              {recommendations.length === 0 && !isLoading && (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="flex items-center justify-center h-48 md:h-64">
                    <div className="text-center p-4">
                      <Brain className="h-10 w-10 md:h-12 md:w-12 text-amber-400 mx-auto mb-4" />
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Ready to Find Your Property?</h3>
                      <p className="text-gray-400 text-sm md:text-base">Fill in your investment profile and let our AI do the magic!</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {recommendations.map((property) => (
                <Card key={property.id} className="bg-slate-800/50 border-slate-700 hover:border-amber-600/50 transition-all duration-300">
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-40 md:h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 left-3 bg-amber-600 text-black text-xs md:text-sm">
                      {property.matchScore}% Match
                    </Badge>
                    <div className="absolute top-3 right-3 flex items-center bg-black/80 text-amber-400 px-2 py-1 rounded text-xs">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      AI Pick
                    </div>
                  </div>
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-1">{property.title}</h3>
                        <div className="flex items-center text-gray-400 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm md:text-base">{property.location}</span>
                        </div>
                        <p className="text-xs md:text-sm text-amber-400">{property.whyMatched}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <div className="text-xl md:text-2xl font-bold text-amber-400">
                            AED {property.price.toLocaleString()}
                          </div>
                          <div className="text-xs md:text-sm text-gray-400">
                            Monthly: AED {property.monthlyRent.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-base md:text-lg font-semibold text-green-400">
                            {property.roi}% ROI
                          </div>
                          <div className="text-xs md:text-sm text-gray-400">Annual Return</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-gray-400 text-sm">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {property.bedrooms} BR
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {property.bathrooms} BA
                        </div>
                        <div className="flex items-center">
                          <Square className="h-4 w-4 mr-1" />
                          {property.area} sq ft
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button className="flex-1 bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-500 hover:to-amber-700 h-10 text-sm font-semibold">
                          View Details
                        </Button>
                        <Button variant="outline" className="flex-1 sm:flex-none border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-black h-10 text-sm">
                          Get Report
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIInvestmentMatcher;
