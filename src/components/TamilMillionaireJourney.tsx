
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MapPin, Calculator, Star } from "lucide-react";

const TamilMillionaireJourney = () => {
  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    propertyValue: '',
    bedrooms: '',
    area: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate AI calculation
    setTimeout(() => {
      const baseRent = parseInt(formData.propertyValue) * 0.08; // 8% rental yield
      const locationMultiplier = formData.location === 'downtown' ? 1.2 : formData.location === 'marina' ? 1.15 : 1.0;
      const typeMultiplier = formData.propertyType === 'apartment' ? 1.0 : formData.propertyType === 'villa' ? 1.3 : 1.1;
      
      const annualRental = Math.round(baseRent * locationMultiplier * typeMultiplier);
      const monthlyRental = Math.round(annualRental / 12);
      
      setPrediction({
        annualRental,
        monthlyRental,
        roi: ((annualRental / parseInt(formData.propertyValue)) * 100).toFixed(2),
        millionaireYears: Math.ceil(1000000 / annualRental)
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-black via-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-amber-600/20 text-amber-400 border-amber-600/30 mb-4">
            Exclusive AI Tool
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Tamil Millionaire Journey
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our signature AI tool predicts your path to millionaire status through Dubai real estate investments
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Form */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calculator className="mr-2 h-6 w-6 text-amber-400" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="propertyType" className="text-gray-300">Property Type</Label>
                  <Select value={formData.propertyType} onValueChange={(value) => setFormData({...formData, propertyType: value})}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location" className="text-gray-300">Location</Label>
                  <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="downtown">Downtown Dubai</SelectItem>
                      <SelectItem value="marina">Dubai Marina</SelectItem>
                      <SelectItem value="jlt">Jumeirah Lake Towers</SelectItem>
                      <SelectItem value="business-bay">Business Bay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="propertyValue" className="text-gray-300">Property Value (AED)</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    value={formData.propertyValue}
                    onChange={(e) => setFormData({...formData, propertyValue: e.target.value})}
                    placeholder="e.g., 1500000"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bedrooms" className="text-gray-300">Bedrooms</Label>
                    <Select value={formData.bedrooms} onValueChange={(value) => setFormData({...formData, bedrooms: value})}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Beds" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="1">1 BR</SelectItem>
                        <SelectItem value="2">2 BR</SelectItem>
                        <SelectItem value="3">3 BR</SelectItem>
                        <SelectItem value="4+">4+ BR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="area" className="text-gray-300">Area (sq ft)</Label>
                    <Input
                      id="area"
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      placeholder="e.g., 1200"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-500 hover:to-amber-700"
                  disabled={loading}
                >
                  {loading ? 'Calculating...' : 'Predict My Millionaire Journey'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {prediction ? (
              <Card className="bg-gradient-to-br from-amber-900/20 to-amber-800/20 border-amber-600/30">
                <CardHeader>
                  <CardTitle className="text-amber-400 flex items-center">
                    <Star className="mr-2 h-6 w-6" />
                    Your Millionaire Prediction
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-amber-400">AED {prediction.monthlyRental.toLocaleString()}</div>
                      <div className="text-gray-400">Monthly Rental</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-amber-400">AED {prediction.annualRental.toLocaleString()}</div>
                      <div className="text-gray-400">Annual Rental</div>
                    </div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-r from-amber-600/20 to-amber-400/20 rounded-lg">
                    <div className="text-3xl font-bold text-amber-400 mb-2">{prediction.millionaireYears} Years</div>
                    <div className="text-gray-300">To Reach Millionaire Status</div>
                    <div className="text-sm text-gray-400 mt-2">ROI: {prediction.roi}% annually</div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-slate-800/30 border-slate-700 border-dashed">
                <CardContent className="text-center py-16">
                  <TrendingUp className="h-16 w-16 text-amber-400 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-400">Fill out the form to see your millionaire journey prediction</p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Why Tamil Millionaire Journey?</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  AI-powered market analysis using Dubai's historical data
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  Personalized investment timeline based on your property
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  Real-time rental yield calculations and ROI projections
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TamilMillionaireJourney;
