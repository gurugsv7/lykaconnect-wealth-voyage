import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, TrendingUp, X } from "lucide-react";

const BlogSection = () => {
  const blogPosts = [
    {
      id: 3,
      title: "AI vs Traditional: Property Investment Analysis Comparison",
      excerpt: "How AI-powered analysis outperforms traditional methods in property selection...",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop",
      category: "Technology",
      author: "Tech Team",
      date: "June 20, 2025",
      readTime: "6 min read"
    },
    {
      id: 1,
      title: "Dubai Real Estate Market Outlook 2024: AI Predictions",
      excerpt: "Our AI analysis reveals key trends shaping Dubai's property market in 2024...",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      category: "Market Analysis",
      author: "Lykaconnect Research Team",
      date: "April 15, 2025",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "The Tamil Millionaire Success Stories: Real Client Journeys",
      excerpt: "Discover how our clients achieved millionaire status through strategic Dubai investments...",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
      category: "Success Stories",
      author: "Investment Advisory",
      date: "Nov 28, 2023",
      readTime: "7 min read"
    }
  ];

  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    let scrollHandler;
    if (isMobile && showMore) {
      scrollHandler = () => {
        const blogSection = document.getElementById("blog");
        if (!blogSection) return;
        let nextSection = blogSection.nextElementSibling;
        if (!nextSection) {
          nextSection = document.getElementById("footer");
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
  if (!showMore) {
    visiblePosts = blogPosts.slice(0, 2);
  } else {
    visiblePosts = blogPosts;
  }

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-[#fff7e6] via-[#fdf6e3] to-[#ffe9c7]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight text-[#720D4C] line-clamp-2" style={{marginTop: "0.5rem"}}>
            Investment Insights & Market Intelligence
          </h2>
          <p className="text-base text-[#222] font-normal max-w-xl mx-auto mb-2 leading-snug" style={{color: "#444", fontWeight: 400}}>
            AI-powered Dubai property trends and strategies for smart investors.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          {visiblePosts.slice(0, 2).map((post) => (
            <Card key={post.id} className="bg-white/80 border border-[#E0A935]/30 rounded-2xl shadow-md transition-all duration-300 overflow-hidden group px-2 py-2">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-32 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 left-2 bg-[#E0A935]/20 text-[#720D4C] border-[#E0A935]/30 text-xs px-2 py-1">
                  {post.category}
                </Badge>
              </div>
              
              <CardHeader className="py-2 px-2">
                <CardTitle className="text-[#720D4C] text-base font-bold line-clamp-2 group-hover:text-[#E0A935] transition-colors leading-tight">
                  {post.title}
                </CardTitle>
                <p className="text-[#333333] text-xs line-clamp-2 leading-snug">
                  {post.excerpt}
                </p>
              </CardHeader>
              
              <CardContent className="py-1 px-2">
                <div className="flex items-center justify-between text-xs text-[#720D4C] mb-2">
                  <div className="flex items-center space-x-2">
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
                
                <Button variant="ghost" className="text-[#E0A935] hover:text-[#720D4C] hover:bg-[#E0A935]/10 p-0 h-auto font-bold text-xs">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {isMobile && !showMore && (
          <div className="flex justify-center mb-8">
            <Button
              className="bg-[#FFD300] text-[#720D4C] font-bold rounded-lg px-8 py-2 shadow-md hover:bg-[#E0A935]"
              onClick={() => setShowMore(true)}
            >
              Show More
            </Button>
          </div>
        )}
        {showMore && (
          <div className="grid grid-cols-1 gap-4 mb-4">
            {visiblePosts.slice(2).map((post) => (
              <Card key={post.id} className="bg-white/80 border border-[#E0A935]/30 rounded-2xl shadow-md transition-all duration-300 overflow-hidden group px-2 py-2">
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-32 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-[#E0A935]/20 text-[#720D4C] border-[#E0A935]/30 text-xs px-2 py-1">
                    {post.category}
                  </Badge>
                </div>
                
                <CardHeader className="py-2 px-2">
                  <CardTitle className="text-[#720D4C] text-base font-bold line-clamp-2 group-hover:text-[#E0A935] transition-colors leading-tight">
                    {post.title}
                  </CardTitle>
                  <p className="text-[#333333] text-xs line-clamp-2 leading-snug">
                    {post.excerpt}
                  </p>
                </CardHeader>
                
                <CardContent className="py-1 px-2">
                  <div className="flex items-center justify-between text-xs text-[#720D4C] mb-2">
                    <div className="flex items-center space-x-2">
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
                  
                  <Button variant="ghost" className="text-[#E0A935] hover:text-[#720D4C] hover:bg-[#E0A935]/10 p-0 h-auto font-bold text-xs">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card className="mb-12 bg-[#E0A935]/10 border border-[#E0A935]/30 rounded-3xl shadow-lg max-w-[90vw] w-full mx-auto">
          <CardContent className="p-4 sm:p-6 flex flex-col items-center sm:items-start justify-center h-full">
            <div className="flex flex-col items-center sm:items-start w-full">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-[#E0A935] mr-2" />
                <span className="px-3 py-1 rounded-full border border-[#E0A935]/60 bg-[#E0A935]/10 text-[#720D4C] text-xs font-semibold tracking-wide">Trending</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#720D4C] mb-1 text-center sm:text-left">
                Weekly Market Report: AI-Generated Insights
              </h3>
              <p className="text-base sm:text-lg text-[#333333] mb-3 text-center sm:text-left">
                Get personalized market analysis delivered to your inbox every week, powered by our advanced AI algorithms.
              </p>
              <Button
                size="sm"
                className="w-full sm:w-auto bg-gradient-to-r from-[#E0A935] to-[#FFD300] text-[#720D4C] font-bold rounded-lg px-6 py-2 mt-2 shadow-md hover:from-[#FFD300] hover:to-[#E0A935]"
                style={{ fontSize: "1rem" }}
                onClick={() => setShowSubscribe(true)}
              >
                Subscribe Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {showSubscribe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative bg-white border-2 border-[#E0A935] rounded-3xl shadow-xl p-8 w-full max-w-md mx-auto flex flex-col items-center">
            <button
              className="absolute top-3 right-3 text-[#E0A935] hover:text-[#720D4C]"
              onClick={() => {
                setShowSubscribe(false);
                setSubscribed(false);
                setEmail("");
                setEmailError("");
              }}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            {!subscribed ? (
              <>
                <h2 className="text-2xl font-bold text-[#720D4C] mb-2 text-center">Subscribe to Weekly Trends</h2>
                <p className="text-[#333333] mb-4 text-center">
                  Get the latest AI-powered market insights delivered to your inbox.
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#fff7e6] text-[#720D4C] rounded-lg border border-[#E0A935] px-4 py-3 mb-2 focus:outline-none focus:border-[#FFD300] transition-all"
                  autoFocus
                />
                {emailError && <div className="text-red-400 text-sm mb-2">{emailError}</div>}
                <Button
                  className="w-full bg-gradient-to-r from-[#E0A935] to-[#FFD300] text-[#720D4C] font-bold rounded-lg px-6 py-2 mt-2 shadow-md hover:from-[#FFD300] hover:to-[#E0A935]"
                  onClick={() => {
                    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
                      setEmailError("Please enter a valid email address.");
                      return;
                    }
                    setSubscribed(true);
                  }}
                >
                  Subscribe
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="text-3xl mb-2 text-[#720D4C] font-bold">Thanks for Subscribing</div>
                <div className="text-[#333333] text-lg text-center">You'll receive weekly market insights in your inbox.</div>
                <Button
                  className="mt-6 bg-gradient-to-r from-[#E0A935] to-[#FFD300] text-[#720D4C] font-bold rounded-lg px-8 py-2 shadow-md hover:from-[#FFD300] hover:to-[#E0A935]"
                  onClick={() => {
                    setShowSubscribe(false);
                    setSubscribed(false);
                    setEmail("");
                    setEmailError("");
                  }}
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
