import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BuyerAffordabilityCalculator from '@/components/BuyerAffordabilityCalculator';
import MortgageCalculator from '@/components/MortgageCalculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { SEO, getBreadcrumbSchema, getFAQSchema } from '@/components/SEO';
import { PAGE_SEO } from '@/config/seoConfig';
import {
  Home, DollarSign, FileText, Search, CheckCircle2, Key,
  TrendingUp, Shield, Clock, Users, Phone, Mail, Download,
  Calculator, Building2, Handshake
} from 'lucide-react';
import { testimonials } from '@/data/testimonials';

const buyerLeadSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  message: z.string().optional(),
});

type BuyerLeadFormData = z.infer<typeof buyerLeadSchema>;

const BuyersPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BuyerLeadFormData>({
    resolver: zodResolver(buyerLeadSchema),
  });

  const onSubmit = async (data: BuyerLeadFormData) => {
    setIsSubmitting(true);
    try {
      const leadTag = 'Buyers Page-Consultation Request';
      console.log('Buyer lead captured:', { ...data, tag: leadTag });
      
      toast({
        title: "Request Received!",
        description: "We'll contact you within 24 hours to discuss your home buying goals.",
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

  const buyerTestimonials = testimonials.filter(t => 
    t.type === 'buyer' || t.type === 'both'
  ).slice(0, 3);

  const buyingProcessSteps = [
    { step: 1, title: 'Get Pre-Approved', description: 'Secure financing and know your budget before you start shopping', icon: DollarSign },
    { step: 2, title: 'Search for Homes', description: 'Tour properties that match your criteria and lifestyle needs', icon: Search },
    { step: 3, title: 'Make an Offer', description: 'Submit a competitive offer with guidance from your agent', icon: FileText },
    { step: 4, title: 'Home Inspection', description: 'Professional inspection to identify any issues with the property', icon: CheckCircle2 },
    { step: 5, title: 'Appraisal & Financing', description: 'Lender appraisal and final loan approval process', icon: Building2 },
    { step: 6, title: 'Close & Move In', description: 'Sign documents, get your keys, and move into your new home!', icon: Key },
  ];

  const hiddenCosts = [
    'Home Inspection ($400-$600)',
    'Appraisal Fee ($500-$700)',
    'Title Insurance & Closing Costs (2-5% of purchase price)',
    'Homeowners Insurance (varies by property)',
    'Property Taxes (prorated at closing)',
    'HOA Fees (if applicable)',
    'Moving Costs',
    'Immediate Repairs or Upgrades',
  ];

  const faqs = [
    {
      question: 'How much do I need for a down payment?',
      answer: 'Down payment requirements vary by loan type. Conventional loans typically require 3-20%, FHA loans as low as 3.5%, and VA loans may require 0% down for qualified veterans. We can connect you with lenders to explore your options.'
    },
    {
      question: 'What credit score do I need to buy a home?',
      answer: 'Most conventional loans require a minimum credit score of 620, while FHA loans may accept scores as low as 580. However, higher credit scores typically result in better interest rates and loan terms.'
    },
    {
      question: 'How long does the home buying process take?',
      answer: 'From offer acceptance to closing typically takes 30-45 days. However, the entire process from pre-approval to move-in can take 2-6 months depending on market conditions and your specific situation.'
    },
    {
      question: 'Should I buy new construction or an existing home?',
      answer: 'Both have advantages. New construction offers modern features, warranties, and customization, but may cost more. Existing homes offer established neighborhoods, mature landscaping, and potentially more negotiating room. We can help you evaluate both options.'
    },
  ];

  const structuredData = [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Buyers', url: '/buyers' }
    ]),
    getFAQSchema(faqs)
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Home Buyers Guide - Northeast Houston Real Estate | Eldon Peterson"
        description="Complete guide to buying a home in Northeast Houston. Expert advice on financing, home search, offers, inspections, and closing. Start your home buying journey today."
        keywords="buy home Houston, first time home buyer, home buying process, mortgage pre-approval, Northeast Houston homes, The Woodlands real estate"
        canonical="/buyers"
        structuredData={structuredData}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 text-sm">
              Buyer Resources
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Your Complete Guide to Buying in Northeast Houston
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              From pre-approval to closing, we'll guide you through every step of your home buying journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#consultation">
                <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
                  <Phone className="h-5 w-5" />
                  Schedule Consultation
                </Button>
              </a>
              <a href="#calculators">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto">
                  <Calculator className="h-5 w-5" />
                  Calculate Affordability
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mortgage & Financing Section */}
      <section id="financing" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Mortgage & Financing
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Understanding your financing options is the first step to homeownership
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <DollarSign className="h-10 w-10 text-accent mb-3" />
                  <CardTitle>Get Pre-Approved</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Pre-approval shows sellers you're a serious buyer and helps you understand your budget.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Know your exact budget</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Stronger negotiating position</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Faster closing process</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="h-10 w-10 text-accent mb-3" />
                  <CardTitle>Loan Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Different loan programs offer various benefits depending on your situation.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Conventional (3-20% down)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>FHA (3.5% down)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>VA (0% down for veterans)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-accent mb-3" />
                  <CardTitle>Lender Partners</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We work with trusted local lenders who offer competitive rates and excellent service.
                  </p>
                  <Button variant="outline" className="w-full mt-2">
                    Get Lender Referrals
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Calculators Section */}
      <section id="calculators" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Budgeting & Affordability Tools
              </h2>
              <p className="text-lg text-muted-foreground">
                Use our calculators to understand what you can afford
              </p>
            </div>

            {/* Affordability Calculator */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calculator className="h-6 w-6 text-primary" />
                Affordability Calculator
              </h3>
              <BuyerAffordabilityCalculator />
            </div>

            {/* Mortgage Calculator */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-primary" />
                Mortgage Calculator
              </h3>
              <MortgageCalculator />
            </div>

            {/* Hidden Costs Checklist */}
            <Card className="bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Shield className="h-6 w-6 text-accent" />
                  Hidden Costs Checklist
                </CardTitle>
                <CardDescription>
                  Don't forget to budget for these additional expenses beyond your down payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {hiddenCosts.map((cost, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{cost}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Buying Process */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The Home Buying Process
              </h2>
              <p className="text-lg text-muted-foreground">
                A step-by-step guide to your home buying journey
              </p>
            </div>

            <div className="space-y-6">
              {buyingProcessSteps.map((step, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <step.icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="secondary">Step {step.step}</Badge>
                          <h3 className="text-xl font-bold">{step.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Buyer Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Success Stories from Our Buyers
              </h2>
              <p className="text-lg text-muted-foreground">
                Hear from clients who found their dream homes with our help
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {buyerTestimonials.map((testimonial, index) => (
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
                Common questions from first-time and experienced buyers
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
      <section id="consultation" className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Start Your Home Search?
                </h2>
                <p className="text-xl mb-6 opacity-90">
                  Schedule a free consultation to discuss your home buying goals and get personalized guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:4092237288">
                    <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
                      <Phone className="h-5 w-5" />
                      (409) 223-7288
                    </Button>
                  </a>
                  <a href="#buyer-guide">
                    <Button size="lg" variant="outline" className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto">
                      <Download className="h-5 w-5" />
                      Download Buyer Guide
                    </Button>
                  </a>
                </div>
              </div>

              <Card className="bg-background text-foreground">
                <CardHeader>
                  <CardTitle>Schedule Your Consultation</CardTitle>
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
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder="Tell us about your home buying goals..."
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

export default BuyersPage;

