import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, TrendingUp } from "lucide-react";

const BlogSection = () => {
  // Reorder so the third blog is first
  const blogPosts = [
    {
      id: 3,
      title: "AI vs Traditional: Property Investment Analysis Comparison",
      excerpt: "How AI-powered analysis outperforms traditional methods in property selection...",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop",
      category: "Technology",
      author: "Tech Team",
      date: "Nov 20, 2025",
      readTime: "6 min read"
    },
    {
      id: 1,
      title: "Dubai Real Estate Market Outlook 2024: AI Predictions",
      excerpt: "Our AI analysis reveals key trends shaping Dubai's property market in 2024...",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", // Burj Khalifa and Dubai skyline
      category: "Market Analysis",
      author: "Lykaconnect Research Team",
      date: "Dec 15, 2025",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "The Tamil Millionaire Success Stories: Real Client Journeys",
      excerpt: "Discover how our clients achieved millionaire status through strategic Dubai investments...",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80", // Burj Al Arab
      category: "Success Stories",
      author: "Investment Advisory",
      date: "Nov 28, 2025",
      readTime: "7 min read"
    }
  ];

  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    let scrollHandler: any;
    if (isMobile && showMore) {
      scrollHandler = () => {
        // Find the next section after #blog
        const blogSection = document.getElementById("blog");
        if (!blogSection) return;
        let nextSection = blogSection.nextElementSibling as HTMLElement | null;
        // Fallback: try to find a known section id (customize as needed)
        if (!nextSection) {
          nextSection = document.getElementById("footer") as HTMLElement | null;
        }
        if (nextSection) {
          const rect = nextSection.getBoundingClientRect();
          if (rect.top <= 0) {
            setShowMore(false);
          }
        }
      };
      window.addEventListener("scroll", scrollHandler, { passive: true });
    }
    return () => {
      window.removeEventListener("resize", checkMobile);
      if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
    };
  }, [isMobile, showMore]);

  let visiblePosts = blogPosts;
  if (isMobile && !showMore) {
    visiblePosts = [blogPosts[0]];
  } else if (isMobile && showMore) {
    visiblePosts = blogPosts;
  }

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
          {visiblePosts.map((post) => (
            <Card key={post.id} className="bg-slate-800/50 /*border-slate-700*/ hover:border-amber-600/50 transition-all duration-300 overflow-hidden group">
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
        {isMobile && !showMore && (
          <div className="flex justify-center mb-8">
            <Button
              className="bg-[#FFD300] text-black font-bold rounded-lg px-8 py-2 shadow-md hover:bg-yellow-300"
              onClick={() => setShowMore(true)}
            >
              Show More
            </Button>
          </div>
        )}

        {/* Featured Section */}
        <Card className="mb-12 bg-[#1f2937] bg-opacity-90 backdrop-blur-lg border border-yellow-500/20 rounded-lg shadow-lg max-w-[90vw] w-full mx-auto" style={{maxHeight: 300}}>
          <CardContent className="p-4 sm:p-6 flex flex-col items-center sm:items-start justify-center h-full">
            <div className="flex flex-col items-center sm:items-start w-full">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="px-3 py-1 rounded-full border border-yellow-400/60 bg-yellow-400/10 text-yellow-300 text-xs font-semibold tracking-wide">Trending</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-1 text-center sm:text-left">
                Weekly Market Report: AI-Generated Insights
              </h3>
              <p className="text-sm sm:text-base text-gray-300 mb-3 text-center sm:text-left">
                Get personalized market analysis delivered to your inbox every week, powered by our advanced AI algorithms.
              </p>
              <Button
                size="sm"
                className="w-full sm:w-auto bg-gradient-to-r from-[#facc15] to-[#f59e0b] text-black font-bold rounded-lg px-6 py-2 mt-2 shadow-md hover:from-yellow-400 hover:to-yellow-500"
                style={{ fontSize: "1rem" }}
              >
                Subscribe Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* View All Articles button removed */}
      </div>
    </section>
  );
};

export default BlogSection;
