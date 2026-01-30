import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { X, Home, Search, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';
import { neighborhoods, getNeighborhoodByZip } from '@/data/neighborhoods';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const leadSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  propertyAddress: z.string().optional(),
  zipCode: z.string().optional(),
  interest: z.enum(['buy', 'sell', 'both']),
});

type LeadFormData = z.infer<typeof leadSchema>;

const FloatingLeadWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      interest: 'buy',
    }
  });

  const watchedInterest = watch('interest');
  const watchedZipCode = watch('zipCode');
  const neighborhood = watchedZipCode ? getNeighborhoodByZip(watchedZipCode) : null;

  // Check localStorage for minimized state
  useEffect(() => {
    const minimized = localStorage.getItem('floatingWidgetMinimized');
    if (minimized === 'true') {
      setIsMinimized(true);
    }
  }, []);

  // Smart scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Hide on form pages to avoid duplication
  useEffect(() => {
    const formPages = ['/contact', '/tools'];
    const shouldHide = formPages.some(page => location.pathname.includes(page));
    if (shouldHide) {
      setIsVisible(false);
    }
  }, [location]);

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    
    try {
      // Determine page context for lead tagging
      const pageName = location.pathname.split('/').filter(Boolean).join('-') || 'home';
      const leadTag = `${watchedZipCode || 'Unknown'}-${neighborhood?.name || 'Unknown'}-Floating Widget-${pageName}`;
      
      console.log('Lead captured:', { ...data, tag: leadTag, source: 'Floating Widget' });
      
      toast({
        title: "Thank You!",
        description: "We'll be in touch shortly to help with your real estate needs.",
      });

      // Reset form and collapse widget
      reset();
      setIsExpanded(false);
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

  const handleMinimize = () => {
    setIsMinimized(true);
    setIsExpanded(false);
    localStorage.setItem('floatingWidgetMinimized', 'true');
  };

  const handleRestore = () => {
    setIsMinimized(false);
    localStorage.setItem('floatingWidgetMinimized', 'false');
  };

  // Don't render if minimized permanently or not visible
  if (isMinimized) {
    return (
      <button
        onClick={handleRestore}
        className="fixed bottom-4 right-4 z-50 p-3 bg-accent text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Restore lead capture widget"
      >
        <ChevronUp className="h-6 w-6" />
      </button>
    );
  }

  if (!isVisible) return null;

  // Context-aware CTA text
  const getCtaText = () => {
    if (location.pathname.includes('sell')) return 'Get Your Home Value';
    if (location.pathname.includes('buy')) return 'Start Your Search';
    if (location.pathname.includes('neighborhood')) return 'Explore This Area';
    return 'Get Started Today';
  };

  const getCtaIcon = () => {
    if (location.pathname.includes('sell')) return <TrendingUp className="h-5 w-5" />;
    if (location.pathname.includes('buy')) return <Search className="h-5 w-5" />;
    return <Home className="h-5 w-5" />;
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 md:right-4 md:bottom-4 max-md:right-0 max-md:left-0 max-md:mx-4 ${
        isExpanded ? 'w-full max-w-md max-md:max-w-full' : 'w-auto'
      }`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(150%)',
      }}
    >
      {/* Collapsed State - Compact CTA Button */}
      {!isExpanded && (
        <Button
          onClick={() => setIsExpanded(true)}
          size="lg"
          className="shadow-xl hover:shadow-2xl transition-all duration-300 bg-accent hover:bg-accent/90 text-white w-full md:w-auto"
          aria-label={getCtaText()}
        >
          {getCtaIcon()}
          <span className="ml-2 font-semibold">{getCtaText()}</span>
        </Button>
      )}

      {/* Expanded State - Full Lead Capture Form */}
      {isExpanded && (
        <Card className="shadow-2xl border-2 border-accent/20">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  {getCtaIcon()}
                  {getCtaText()}
                </CardTitle>
                <CardDescription className="mt-1">
                  Fill out the form below and we'll be in touch within 24 hours
                </CardDescription>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMinimize}
                  className="h-8 w-8"
                  aria-label="Minimize widget"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(false)}
                  className="h-8 w-8"
                  aria-label="Close widget"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName" className="text-sm">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    placeholder="John"
                    className="mt-1"
                  />
                  {errors.firstName && (
                    <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    placeholder="Doe"
                    className="mt-1"
                  />
                  {errors.lastName && (
                    <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-sm">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="john.doe@example.com"
                  className="mt-1"
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-sm">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder="(409) 223-7288"
                  className="mt-1"
                />
                {errors.phone && (
                  <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Property Address (Optional) */}
              <div>
                <Label htmlFor="propertyAddress" className="text-sm">
                  Property Address (Optional)
                </Label>
                <Input
                  id="propertyAddress"
                  {...register('propertyAddress')}
                  placeholder="123 Main St, Houston, TX"
                  className="mt-1"
                />
              </div>

              {/* ZIP Code Selection */}
              <div>
                <Label htmlFor="zipCode" className="text-sm">
                  ZIP Code (Optional)
                </Label>
                <Select onValueChange={(value) => setValue('zipCode', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your ZIP code" />
                  </SelectTrigger>
                  <SelectContent>
                    {neighborhoods.flatMap(n =>
                      n.zipCodes.map(zip => (
                        <SelectItem key={zip} value={zip}>
                          {zip} - {n.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Interest Selection */}
              <div>
                <Label className="text-sm">
                  I'm interested in <span className="text-destructive">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button
                    type="button"
                    variant={watchedInterest === 'buy' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setValue('interest', 'buy')}
                    className="w-full"
                  >
                    Buying
                  </Button>
                  <Button
                    type="button"
                    variant={watchedInterest === 'sell' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setValue('interest', 'sell')}
                    className="w-full"
                  >
                    Selling
                  </Button>
                  <Button
                    type="button"
                    variant={watchedInterest === 'both' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setValue('interest', 'both')}
                    className="w-full"
                  >
                    Both
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Get Started'}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By submitting, you agree to be contacted by Eldon Peterson Real Estate
              </p>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FloatingLeadWidget;

