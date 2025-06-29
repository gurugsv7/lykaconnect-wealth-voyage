import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calculator, GitCompare, PieChart, ArrowUp, ArrowDown } from "lucide-react";

const ClientDashboard = () => {
  const portfolioData = {
    totalValue: 8500000,
    monthlyIncome: 45000,
    properties: 3,
    roi: 6.35,
    growth: 12.5
  };

  const properties = [
    { name: "Marina Apartment", value: 2500000, income: 15000, roi: 7.2, change: 5.2 },
    { name: "Downtown Villa", value: 4200000, income: 25000, roi: 7.1, change: -2.1 },
    { name: "Business Bay Penthouse", value: 1800000, income: 5000, roi: 3.3, change: 8.7 }
  ];

  return (
    <section id="dashboard" className="py-20 bg-gradient-to-br from-black via-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Client Investment
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Track your portfolio performance with real-time analytics and AI insights
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-slate-800/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-400">Total Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  AED {portfolioData.totalValue.toLocaleString()}
                </div>
                <div className="flex items-center text-green-400 text-sm">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +{portfolioData.growth}% this year
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-400">Monthly Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-400 mb-2">
                  AED {portfolioData.monthlyIncome.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">
                  From {portfolioData.properties} properties
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-400">Average ROI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {portfolioData.roi}%
                </div>
                <div className="text-sm text-gray-400">
                  Above market average
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-400">Millionaire Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">85%</div>
                <Progress value={85} className="h-2 bg-slate-700">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" style={{width: '85%'}} />
                </Progress>
                <div className="text-sm text-gray-400 mt-1">2.3 years to go</div>
              </CardContent>
            </Card>
          </div>

          {/* Property Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <PieChart className="mr-2 h-5 w-5 text-amber-400" />
                  Property Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.map((property, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div>
                        <div className="font-semibold text-white">{property.name}</div>
                        <div className="text-sm text-gray-400">AED {property.value.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-amber-400 font-semibold">{property.roi}% ROI</div>
                        <div className={`text-sm flex items-center ${property.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {property.change > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                          {Math.abs(property.change)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calculator className="mr-2 h-5 w-5 text-amber-400" />
                  ROI Calculator & Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    <Calculator className="mr-2 h-4 w-4" />
                    ROI Calculator
                  </Button>
                  <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                    <GitCompare className="mr-2 h-4 w-4" />
                    Compare Properties
                  </Button>
                </div>
                
                <div className="p-4 bg-amber-600/10 border border-amber-600/30 rounded-lg">
                  <h4 className="text-amber-400 font-semibold mb-2">AI Recommendation</h4>
                  <p className="text-sm text-gray-300">
                    Based on current market trends, consider diversifying into Business Bay area 
                    for potentially higher returns.
                  </p>
                  <Button size="sm" className="mt-2 bg-amber-600 text-black hover:bg-amber-700">
                    View Recommendations
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">This Month's Performance</span>
                    <span className="text-green-400">+AED 3,200</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Projected Annual Income</span>
                    <span className="text-amber-400">AED 540,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax Optimization Savings</span>
                    <span className="text-blue-400">AED 15,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-500 hover:to-amber-700 mr-4">
              Access Full Dashboard
            </Button>
            <Button size="lg" variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-black">
              Schedule Portfolio Review
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientDashboard;
