import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, Bot, User } from "lucide-react";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hello! I'm your AI real estate assistant. How can I help you with your Dubai property investment today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        message: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('property') || input.includes('investment')) {
      return "I can help you find the perfect investment property! Based on current market data, Dubai Marina and Downtown Dubai are showing strong ROI potential. Would you like me to show you specific properties or calculate potential returns?";
    } else if (input.includes('roi') || input.includes('return')) {
      return "Our AI analysis shows average ROI in Dubai ranges from 6-8% annually. I can run a personalized calculation using our Tamil Millionaire Journey tool. What's your budget range?";
    } else if (input.includes('tamil') || input.includes('millionaire')) {
      return "The Tamil Millionaire Journey is our signature tool! It uses AI to predict your path to millionaire status through Dubai real estate. Would you like me to start a calculation for you?";
    } else if (input.includes('location') || input.includes('area')) {
      return "Popular investment areas include Dubai Marina (7.2% avg ROI), Downtown Dubai (6.8% avg ROI), and Business Bay (7.0% avg ROI). Each area has unique advantages. Which interests you most?";
    } else {
      return "I'm here to help with all your Dubai real estate questions! I can assist with property searches, ROI calculations, market analysis, and our exclusive Tamil Millionaire Journey predictions. What would you like to explore?";
    }
  };

  return (
    <>
      {/* Chat Button + Bubble */}
      {!isOpen && (
        <div className="fixed bottom-6 right-0 z-50 flex flex-row-reverse items-end gap-2 sm:static">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-36 h-36 rounded-full bg-transparent shadow-none flex items-center justify-center p-0 hover:bg-transparent focus:bg-transparent active:bg-transparent"
          >
            <img
              src="/src/chatboticon.png"
              alt="Chatbot"
              className="w-32 h-32"
              style={{ display: "block", margin: "0 auto" }}
            />
          </Button>
          <div className="mb-10 bg-gradient-to-r from-amber-400 to-amber-600 text-black px-4 py-3 rounded-2xl shadow-xl flex flex-col items-start animate-fade-in border border-amber-500 max-w-xs">
            <span className="font-semibold leading-tight">Hi, I'm LykaBot!</span>
            <span className="hidden sm:inline text-sm leading-tight">Your Dubai real estate AI assistant.</span>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-slate-800 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-amber-400 to-amber-600 text-black p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6" />
                <CardTitle className="text-lg">AI Assistant</CardTitle>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-black hover:bg-black/10 p-1"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="text-sm opacity-90">24/7 Real Estate Support</div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-[400px]">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-amber-600 text-black'
                          : 'bg-slate-700 text-white'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {msg.type === 'bot' && <Bot className="h-4 w-4 mt-0.5 text-amber-400 flex-shrink-0" />}
                        {msg.type === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                        <div className="text-sm">{msg.message}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about properties, ROI, investments..."
                  className="bg-slate-700 border-slate-600 text-white flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-500 hover:to-amber-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AIChatbot;
