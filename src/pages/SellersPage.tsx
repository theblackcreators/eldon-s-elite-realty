import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeValueEstimator from '@/components/HomeValueEstimator';
import SellerNetProceedsCalculator from '@/components/SellerNetProceedsCalculator';
import RecentlySold from '@/components/RecentlySold';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { SEO, getBreadcrumbSchema, getFAQSchema } from '@/components/SEO';
import {
  Home, DollarSign, Camera, TrendingUp, CheckCircle2, Handshake,
  FileText, Users, Phone, Download, Paintbrush, Sparkles, Target,
  BarChart3, Share2, Eye
} from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { generateResourcePDF } from '@/utils/pdfGenerator';

const sellerLeadSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  propertyAddress: z.string().min(1, 'Property address is required'),
  message: z.string().optional(),
});

type SellerLeadFormData = z.infer<typeof sellerLeadSchema>;

const SellersPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SellerLeadFormData>({
    resolver: zodResolver(sellerLeadSchema),
  });

  const onSubmit = async (data: SellerLeadFormData) => {
    setIsSubmitting(true);
    try {
      const leadTag = 'Sellers Page-Listing Consultation';
      console.log('Seller lead captured:', { ...data, tag: leadTag });

      toast({
        title: "Request Received!",
        description: "We'll contact you within 24 hours to discuss selling your home.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Please try again or call us at (409) 223-7288.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadSellerGuide = () => {
    try {
      generateResourcePDF(
        'seller-checklist',
        'Home Seller\'s Checklist',
        'Seller Guide'
      );

      toast({
        title: "Download Started!",
        description: "Your Seller Guide is downloading now.",
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "Download Error",
        description: "Please try again or contact us at (409) 223-7288.",
        variant: "destructive",
      });
    }
  };

  const sellerTestimonials = testimonials.filter(t => 
    t.type === 'seller' || t.type === 'both'
  ).slice(0, 3);

  const homePreparationChecklist = [
    { title: 'Declutter & Depersonalize', description: 'Remove personal items and excess furniture to help buyers envision themselves in the space' },
    { title: 'Deep Clean Everything', description: 'Professional cleaning makes a huge difference in first impressions' },
    { title: 'Make Minor Repairs', description: 'Fix leaky faucets, squeaky doors, and other small issues that could raise red flags' },
    { title: 'Enhance Curb Appeal', description: 'Fresh mulch, trimmed landscaping, and a clean exterior create a welcoming entrance' },
    { title: 'Fresh Paint', description: 'Neutral colors appeal to the widest range of buyers' },
    { title: 'Stage Key Rooms', description: 'Professional staging can increase perceived value and help homes sell faster' },
  ];

  const marketingPlan = [
    { icon: Camera, title: 'Professional Photography', description: 'High-quality photos that showcase your home\'s best features' },
    { icon: Eye, title: 'Virtual Tours', description: '3D walkthrough and video tours for remote buyers' },
    { icon: Share2, title: 'MLS & Syndication', description: 'Maximum exposure across all major real estate platforms' },
    { icon: Users, title: 'Social Media Marketing', description: 'Targeted ads on Facebook, Instagram, and other platforms' },
    { icon: Home, title: 'Open Houses', description: 'Strategic open house events to generate buyer interest' },
    { icon: FileText, title: 'Print Marketing', description: 'Professional brochures and flyers for your property' },
  ];

  const faqs = [
    {
      question: 'How do I determine the right listing price?',
      answer: 'We provide a comprehensive Comparative Market Analysis (CMA) that examines recent sales of similar homes in your area, current market conditions, and your home\'s unique features. Pricing strategically is crucial for attracting buyers and maximizing your sale price.'
    },
    {
      question: 'What are the costs of selling my home?',
      answer: 'Typical seller costs include real estate commission (usually 5-6% split between buyer and seller agents), title insurance, closing costs, and any agreed-upon repairs. Use our Net Proceeds Calculator below to estimate your costs and net proceeds.'
    },
    {
      question: 'How long will it take to sell my home?',
      answer: 'In the current Northeast Houston market, well-priced homes typically sell within 30-60 days. Factors affecting timeline include pricing, condition, location, and market conditions. We\'ll provide a realistic timeline based on your specific situation.'
    },
    {
      question: 'Should I make repairs before listing?',
      answer: 'Strategic repairs and updates can significantly increase your sale price and reduce time on market. We\'ll provide recommendations on which improvements offer the best return on investment for your specific property and price point.'
    },
  ];

  const structuredData = [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Sellers', url: '/sellers' }
    ]),
    getFAQSchema(faqs)
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Sell Your Home in Northeast Houston | Expert Listing Agent | Eldon Peterson"
        description="Sell your Northeast Houston home for top dollar. Expert pricing, professional marketing, and proven negotiation strategies. Get your free home valuation today."
        keywords="sell home Houston, list house Northeast Houston, home valuation, real estate agent, The Woodlands listing agent, sell house fast"
        canonical="/sellers"
        structuredData={structuredData}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent via-accent/95 to-accent/90 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 text-sm">
              Seller Resources
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Sell Your Northeast Houston Home for Top Dollar
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Expert pricing, professional marketing, and proven negotiation strategies to maximize your sale
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#valuation">
                <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
                  <TrendingUp className="h-5 w-5" />
                  Get Free Home Valuation
                </Button>
              </a>
              <a href="#consultation">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent border-white text-white hover:bg-white hover:text-accent w-full sm:w-auto">
                  <Phone className="h-5 w-5" />
                  Schedule Consultation
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Home Preparation Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Preparing Your Home for Sale
              </h2>
              <p className="text-lg text-muted-foreground">
                First impressions matter. Here's how to make your home shine
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {homePreparationChecklist.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Strategy Section */}
      <section id="valuation" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Strategic Pricing for Maximum Value
              </h2>
              <p className="text-lg text-muted-foreground">
                Get your free home valuation and understand your home's market value
              </p>
            </div>

            <div className="mb-12">
              <HomeValueEstimator />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <BarChart3 className="h-10 w-10 text-accent mb-3" />
                  <CardTitle>Comparative Market Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We analyze recent sales, active listings, and market trends to determine the optimal price for your home.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Target className="h-10 w-10 text-accent mb-3" />
                  <CardTitle>Pricing Psychology</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Strategic pricing attracts more buyers and can lead to multiple offers, driving up your final sale price.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-accent mb-3" />
                  <CardTitle>Market Timing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We'll advise on the best time to list based on seasonal trends and current market conditions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Plan Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comprehensive Marketing Plan
              </h2>
              <p className="text-lg text-muted-foreground">
                Maximum exposure to qualified buyers through proven marketing strategies
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketingPlan.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <item.icon className="h-10 w-10 text-accent mb-3" />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Net Proceeds Calculator */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Calculate Your Net Proceeds
              </h2>
              <p className="text-lg text-muted-foreground">
                Estimate what you'll walk away with after selling your home
              </p>
            </div>

            <SellerNetProceedsCalculator />
          </div>
        </div>
      </section>

      {/* Recently Sold Showcase */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Recently Sold Properties
              </h2>
              <p className="text-lg text-muted-foreground">
                See our track record of successful sales in Northeast Houston
              </p>
            </div>

            <RecentlySold />
          </div>
        </div>
      </section>

      {/* Seller Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Sellers Say
              </h2>
              <p className="text-lg text-muted-foreground">
                Hear from clients who successfully sold their homes with our help
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {sellerTestimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-accent text-xl">★</span>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Common questions from home sellers
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section id="consultation" className="py-20 bg-gradient-to-br from-accent via-accent/95 to-accent/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Sell Your Home?
                </h2>
                <p className="text-xl mb-6 opacity-90">
                  Schedule a free listing consultation to discuss your goals and get a personalized marketing plan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:4092237288">
                    <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
                      <Phone className="h-5 w-5" />
                      (409) 223-7288
                    </Button>
                  </a>
                  <Button
                    onClick={handleDownloadSellerGuide}
                    size="lg"
                    variant="outline"
                    className="gap-2 bg-transparent border-white text-white hover:bg-white hover:text-accent w-full sm:w-auto"
                  >
                    <Download className="h-5 w-5" />
                    Download Seller Guide
                  </Button>
                </div>
              </div>

              <Card className="bg-background text-foreground">
                <CardHeader>
                  <CardTitle>Schedule Your Listing Consultation</CardTitle>
                  <CardDescription>
                    Fill out the form and we'll contact you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" {...register('firstName')} placeholder="John" />
                        {errors.firstName && (
                          <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" {...register('lastName')} placeholder="Doe" />
                        {errors.lastName && (
                          <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" {...register('email')} placeholder="john.doe@example.com" />
                      {errors.email && (
                        <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" {...register('phone')} placeholder="(409) 223-7288" />
                      {errors.phone && (
                        <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="propertyAddress">Property Address</Label>
                      <Input id="propertyAddress" {...register('propertyAddress')} placeholder="123 Main St, Houston, TX 77380" />
                      {errors.propertyAddress && (
                        <p className="text-xs text-destructive mt-1">{errors.propertyAddress.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder="Tell us about your home and selling timeline..."
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Schedule Consultation'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SellersPage;

