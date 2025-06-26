
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, TrendingUp } from "lucide-react";

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Dubai Real Estate Market Outlook 2024: AI Predictions",
      excerpt: "Our AI analysis reveals key trends shaping Dubai's property market in 2024...",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=800&auto=format&fit=crop",
      category: "Market Analysis",
      author: "Lykaconnect Research Team",
      date: "Dec 15, 2024",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "The Tamil Millionaire Success Stories: Real Client Journeys",
      excerpt: "Discover how our clients achieved millionaire status through strategic Dubai investments...",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=800&auto=format&fit=crop",
      category: "Success Stories",
      author: "Investment Advisory",
      date: "Nov 28, 2024",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "AI vs Traditional: Property Investment Analysis Comparison",
      excerpt: "How AI-powered analysis outperforms traditional methods in property selection...",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop",
      category: "Technology",
      author: "Tech Team",
      date: "Nov 20, 2024",
      readTime: "6 min read"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-slate-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Investment Insights
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              & Market Intelligence
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Stay ahead with expert analysis, market trends, and investment strategies powered by AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="bg-slate-800/50 border-slate-700 hover:border-amber-600/50 transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-amber-600/20 text-amber-400 border-amber-600/30">
                  {post.category}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-white text-lg line-clamp-2 group-hover:text-amber-400 transition-colors">
                  {post.title}
                </CardTitle>
                <p className="text-gray-400 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <span>{post.readTime}</span>
                </div>
                
                <Button variant="ghost" className="text-amber-400 hover:text-amber-300 hover:bg-amber-600/10 p-0 h-auto">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Section */}
        <Card className="bg-gradient-to-r from-amber-900/20 to-amber-800/20 border-amber-600/30 mb-12">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-amber-400 mr-2" />
                  <Badge className="bg-amber-600 text-black">Trending Now</Badge>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Weekly Market Report: AI-Generated Insights
                </h3>
                <p className="text-gray-300 mb-4">
                  Get personalized market analysis delivered to your inbox every week, 
                  powered by our advanced AI algorithms.
                </p>
              </div>
              <Button className="bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-500 hover:to-amber-700">
                Subscribe Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-black">
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
