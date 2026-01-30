import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send, Phone, Mail, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { neighborhoods } from '@/data/neighborhoods';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface LeadCapture {
  name?: string;
  email?: string;
  phone?: string;
  zipCode?: string;
  neighborhood?: string;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadData, setLeadData] = useState<LeadCapture>({});
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when chat opens
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Hello! I'm Eldon Peterson's AI Assistant. I specialize in Northeast Houston real estate, covering Atascocita, Humble, Kingwood, Summerwood, Fall Creek, and EaDo.\n\nI can help you with:\n• Information about buying or selling in Northeast Houston\n• Neighborhood insights and market data\n• Texas real estate process and regulations\n• Scheduling a consultation with Eldon\n\nHow can I assist you today?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // This is a mock AI response system. In production, replace with OpenAI/Claude API
    const lowerMessage = userMessage.toLowerCase();

    // Neighborhood-specific responses
    if (lowerMessage.includes('atascocita')) {
      return `Atascocita (77346) is a master-planned community known for excellent schools and family-friendly amenities. The median home price is around $385,000 with an average of $145/sq ft.\n\nKey highlights:\n• Top-rated Humble ISD schools\n• Lake Houston access\n• Parks, trails, and recreation centers\n• Growing retail and dining options\n\nWould you like to schedule a consultation to discuss Atascocita properties? I can connect you with Eldon directly.`;
    }

    if (lowerMessage.includes('humble')) {
      return `Humble (77338, 77369) offers diverse housing options from starter homes to luxury estates. It's one of the fastest-growing areas in Northeast Houston.\n\nKey highlights:\n• Excellent schools (Humble ISD)\n• Close to IAH Airport and major employers\n• Affordable compared to inner Houston\n• Strong appreciation potential\n\nInterested in exploring Humble? I can help you schedule a call with Eldon to discuss your specific needs.`;
    }

    if (lowerMessage.includes('kingwood')) {
      return `Kingwood (77339) is known as the "Livable Forest" - a prestigious master-planned community with tree-lined streets and excellent amenities.\n\nKey highlights:\n• Top-rated schools\n• Golf courses and country clubs\n• Extensive trail system\n• Strong community feel\n• Median price: $425,000\n\nWant to learn more about Kingwood properties? Let me connect you with Eldon for a personalized consultation.`;
    }

    if (lowerMessage.includes('summerwood')) {
      return `Summerwood (77044) is a family-oriented community with newer construction and modern amenities.\n\nKey highlights:\n• Affordable new construction\n• Excellent schools\n• Community pools and parks\n• Easy access to Beltway 8\n• Median price: $340,000\n\nInterested in Summerwood? I can help you schedule a showing with Eldon.`;
    }

    if (lowerMessage.includes('fall creek')) {
      return `Fall Creek (77044) offers resort-style living with exceptional amenities and newer homes.\n\nKey highlights:\n• Luxury amenities (pools, fitness centers)\n• Newer construction\n• Family-friendly community\n• Strong HOA maintaining property values\n• Median price: $365,000\n\nWould you like to explore Fall Creek properties? Let me connect you with Eldon.`;
    }

    if (lowerMessage.includes('eado') || lowerMessage.includes('east downtown')) {
      return `EaDo (East Downtown, 77003) is Houston's hottest urban neighborhood with a vibrant arts and dining scene.\n\nKey highlights:\n• Walkable urban lifestyle\n• Trendy restaurants and bars\n• Close to downtown Houston\n• Strong appreciation potential\n• Mix of condos, townhomes, and lofts\n\nInterested in urban living? Eldon specializes in EaDo properties. Let's schedule a consultation.`;
    }

    // Buying process questions
    if (lowerMessage.includes('buy') || lowerMessage.includes('buying') || lowerMessage.includes('purchase')) {
      return `The home buying process in Texas typically involves:\n\n1. **Get Pre-Approved** - Know your budget\n2. **Find Your Home** - Work with Eldon to search properties\n3. **Make an Offer** - Negotiate terms and price\n4. **Option Period** - 7-10 days for inspections\n5. **Financing** - Finalize your loan\n6. **Closing** - Sign documents and get keys!\n\nTexas is unique with our option period and title companies handling closings. Eldon can guide you through every step.\n\nReady to start? I can help you schedule a buyer consultation.`;
    }

    // Selling process questions
    if (lowerMessage.includes('sell') || lowerMessage.includes('selling') || lowerMessage.includes('list')) {
      return `Selling your home in Northeast Houston? Here's the process:\n\n1. **Home Valuation** - Get a CMA from Eldon\n2. **Prepare Your Home** - Repairs, staging, photos\n3. **List on MLS** - Maximum exposure\n4. **Showings & Offers** - Review and negotiate\n5. **Under Contract** - Navigate inspections\n6. **Closing** - Transfer ownership\n\nEldon's hyperlocal expertise in Northeast Houston ensures you get top dollar. Our average days on market is just 18 days!\n\nWant a free home valuation? Let me connect you with Eldon.`;
    }

    // Scheduling/contact questions
    if (lowerMessage.includes('schedule') || lowerMessage.includes('appointment') || lowerMessage.includes('call') || lowerMessage.includes('meet')) {
      setShowLeadCapture(true);
      return `I'd be happy to help you schedule time with Eldon!\n\nYou can reach him directly:\n📞 Phone: (409) 223-7288\n📧 Email: eldon@eldonpetersonrealestate.com\n\nOr provide your contact information below and Eldon will reach out within 24 hours to schedule a consultation.`;
    }

    // Market questions
    if (lowerMessage.includes('market') || lowerMessage.includes('prices') || lowerMessage.includes('value')) {
      return `The Northeast Houston market is strong in 2024:\n\n• Median home prices: $340K - $425K (varies by neighborhood)\n• Average days on market: 18-25 days\n• Inventory: Balanced market with opportunities\n• Appreciation: 4-6% annually\n\nEach neighborhood has unique characteristics. Eldon's hyperlocal expertise covers all 6 Northeast Houston areas.\n\nWant a detailed market analysis for a specific neighborhood? I can connect you with Eldon for personalized insights.`;
    }

    // Default response
    return `That's a great question! While I can provide general information about Northeast Houston real estate, Eldon Peterson can give you personalized guidance based on your specific situation.\n\nEldon is a licensed Real Estate Broker (TREC# 675220) with deep expertise in:\n• Atascocita, Humble, Kingwood, Summerwood, Fall Creek, and EaDo\n• Buyer and seller representation\n• Investment properties\n• New construction\n\nWould you like to schedule a consultation? You can:\n📞 Call: (409) 223-7288\n📧 Email: eldon@eldonpetersonrealestate.com\n\nOr I can help you schedule a call - just let me know!`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));

    const aiResponse = await generateAIResponse(inputValue);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleLeadSubmit = () => {
    if (!leadData.email && !leadData.phone) {
      toast({
        title: "Contact Information Required",
        description: "Please provide at least an email or phone number.",
        variant: "destructive",
      });
      return;
    }

    const neighborhood = leadData.zipCode
      ? neighborhoods.find(n => n.zipCodes.includes(leadData.zipCode!))
      : null;

    const leadTag = leadData.zipCode && neighborhood
      ? `${leadData.zipCode}-${neighborhood.name}-AI Assistant`
      : 'AI Assistant';

    console.log('AI Assistant Lead Capture:', {
      ...leadData,
      leadTag,
      conversationHistory: messages,
      timestamp: new Date().toISOString(),
    });

    toast({
      title: "Thank You!",
      description: `Eldon will contact you at ${leadData.email || leadData.phone} within 24 hours.`,
    });

    setShowLeadCapture(false);

    const confirmationMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Perfect! I've sent your information to Eldon. He'll reach out to you within 24 hours to schedule a consultation. In the meantime, feel free to ask me any other questions!`,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, confirmationMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 bg-primary hover:bg-primary/90"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-accent animate-pulse" />
          </div>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[380px] h-[600px] shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-primary/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-primary"></div>
              </div>
              <div>
                <h3 className="font-semibold">Eldon's AI Assistant</h3>
                <p className="text-xs opacity-90">Northeast Houston Expert</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Lead Capture Form */}
          {showLeadCapture && (
            <div className="p-4 bg-card border-t">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Schedule a Consultation
              </h4>
              <div className="space-y-3">
                <Input
                  placeholder="Your Name"
                  value={leadData.name || ''}
                  onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={leadData.email || ''}
                  onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                />
                <Input
                  type="tel"
                  placeholder="Phone"
                  value={leadData.phone || ''}
                  onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                />
                <Input
                  placeholder="ZIP Code (Optional)"
                  value={leadData.zipCode || ''}
                  onChange={(e) => setLeadData({...leadData, zipCode: e.target.value})}
                  maxLength={5}
                />
                <Button onClick={handleLeadSubmit} className="w-full">
                  Submit
                </Button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Northeast Houston real estate..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" asChild className="flex-1">
                <a href="tel:4092237288">
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="flex-1">
                <a href="mailto:eldon@eldonpetersonrealestate.com">
                  <Mail className="h-3 w-3 mr-1" />
                  Email
                </a>
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default AIAssistant;

