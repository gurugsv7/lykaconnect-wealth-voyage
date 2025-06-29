import { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Bed, Bath, Square, Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchGeminiAnswer } from "@/utils/geminiApi";

const PropertyListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [aiResult, setAiResult] = useState<string | null>(null);
  const navigate = useNavigate();

  const properties = [
    {
      id: 4,
      title: "Sobha Solis - Luxury Waterfront Living",
      location: "Sobha Hartland 2, Dubai",
      price: "AED 1,590,000+",
      monthlyRent: "On Request",
      roi: "N/A",
      bedrooms: 1,
      bathrooms: 1,
      area: 732,
      image: "https://www.sobharealty.com/wp-content/uploads/2024/06/Solis-Exterior-Lagoon-View.jpg",
      features: [
        "Direct Lagoon Access",
        "Sky Gardens & Rooftop Lounges",
        "Infinity Pool with Pool Deck"
      ],
      isRecommended: true
    },
    {
      id: 1,
      title: "Luxury Marina Apartment",
      location: "Dubai Marina",
      price: "AED 2,500,000",
      monthlyRent: "AED 15,000",
      roi: "7.2%",
      bedrooms: 2,
      bathrooms: 3,
      area: 1450,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
      features: ["Sea View", "Furnished", "Parking"],
      isRecommended: true
    },
    {
      id: 2,
      title: "Downtown Premium Villa",
      location: "Downtown Dubai",
      price: "AED 4,200,000",
      monthlyRent: "AED 25,000",
      roi: "7.1%",
      bedrooms: 4,
      bathrooms: 5,
      area: 2800,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop",
      features: ["Private Pool", "Garden", "Maid's Room"],
      isRecommended: false
    },
    {
      id: 3,
      title: "Business Bay Penthouse",
      location: "Business Bay",
      price: "AED 3,800,000",
      monthlyRent: "AED 22,000",
      roi: "6.9%",
      bedrooms: 3,
      bathrooms: 4,
      area: 2200,
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=800&auto=format&fit=crop",
      features: ["Burj Khalifa View", "Balcony", "Premium Finish"],
      isRecommended: true
    }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleGeminiSearch = async () => {
    setAiResult(null);
    const prompt = `
You are a Dubai property listing AI. Given the following filters, recommend 3 premium properties with name, location, price, monthly rent, ROI, and a short reason for each:
Search: ${searchTerm}
Price Range: ${priceRange}
Property Type: ${propertyType}
Respond as a list.`;
    try {
      const answer = await fetchGeminiAnswer(prompt);
      setAiResult(answer);
    } catch (err) {
      setAiResult("Sorry, there was an error fetching property suggestions.");
    }
  };

  return (
    <section id="properties" className="py-20 bg-gradient-to-br from-slate-900 to-black">
      <div className="container mx-auto px-4">
      {/* (Removed duplicate Back to Home Button at top) */}

        {/* Heading and description can be kept or removed as desired for the page */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Premium Property
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Listings
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover hand-picked properties with AI-calculated investment potential
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/50 /*border border-slate-700*/ rounded-xl p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search location or property..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2m">AED 1M - 2M</SelectItem>
                <SelectItem value="2-3m">AED 2M - 3M</SelectItem>
                <SelectItem value="3-5m">AED 3M - 5M</SelectItem>
                <SelectItem value="5m+">AED 5M+</SelectItem>
              </SelectContent>
            </Select>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-500 hover:to-amber-700"
              onClick={handleGeminiSearch}
            >
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* AI Result Display */}
        {aiResult && (
          <div className="my-8 text-center text-lg text-yellow-300 font-semibold bg-[#181825] rounded-xl p-6 border border-yellow-900/30">
            {aiResult}
          </div>
        )}

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="bg-slate-800/50 /*border-slate-700*/ hover:border-amber-600/50 transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {property.isRecommended && (
                  <Badge className="absolute top-4 left-4 bg-amber-600 text-black">
                    AI Recommended
                  </Badge>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-4 right-4 text-white hover:text-amber-400"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <div className="absolute bottom-4 right-4 bg-black/80 text-amber-400 px-2 py-1 rounded text-sm font-semibold">
                  ROI: {property.roi}
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{property.title}</h3>
                    <div className="flex items-center text-gray-400 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-2xl font-bold text-amber-400">{property.price}</div>
                      <div className="text-sm text-gray-400">Monthly: {property.monthlyRent}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-gray-400">
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

                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="border-amber-600/30 text-amber-400">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-500 hover:to-amber-700">
                      View Details
                    </Button>
                    <Button variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-black">
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-black">
            View All Properties
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertyListings;
