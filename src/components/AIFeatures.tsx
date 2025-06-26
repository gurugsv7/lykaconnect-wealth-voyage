
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, TrendingUp, Calculator, ArrowRight } from "lucide-react";

const AIFeatures = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "24/7 AI Chatbot Support",
      description: "Get instant answers to your real estate queries with our intelligent assistant",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "AI Investment Recommendations",
      description: "Discover the best property investments based on market analysis and trends",
      color: "from-green-400 to-green-600"
    },
    {
      icon: Calculator,
      title: "Rental ROI Calculator",
      description: "Calculate precise rental returns and investment potential with AI precision",
      color: "from-amber-400 to-amber-600"
    }
  ];

  return (
    <section id="tools" className="py-20 bg-gradient-to-br from-slate-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI-Powered Real Estate
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Harness the power of artificial intelligence to make smarter property investment decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-amber-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <CardHeader>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="text-amber-400 hover:text-amber-300 p-0">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-500 hover:to-amber-700">
            Experience AI Tools
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
