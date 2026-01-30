import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { neighborhoods, getNeighborhoodByZip } from '@/data/neighborhoods';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Home, MapPin, TrendingUp, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const valueEstimatorSchema = z.object({
  address: z.string().min(5, 'Address is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  squareFeet: z.string().min(1, 'Square footage is required'),
  bedrooms: z.string().min(1, 'Bedrooms required'),
  bathrooms: z.string().min(1, 'Bathrooms required'),
  yearBuilt: z.string().optional(),
  condition: z.enum(['excellent', 'good', 'fair', 'needs-work']),
  timeline: z.enum(['asap', '1-3-months', '3-6-months', 'exploring']),
  upgrades: z.object({
    kitchen: z.boolean().optional(),
    bath: z.boolean().optional(),
    flooring: z.boolean().optional(),
    hvac: z.boolean().optional(),
    roof: z.boolean().optional(),
  }).optional(),
  // Optional lead capture fields
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  phone: z.string().optional(),
});

type ValueEstimatorFormData = z.infer<typeof valueEstimatorSchema>;

interface ValueEstimate {
  lowEstimate: number;
  midEstimate: number;
  highEstimate: number;
  suggestedStrategy: 'aggressive' | 'market' | 'test-high';
  strategyDescription: string;
  confidence: 'high' | 'medium' | 'low';
}

const HomeValueEstimator = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [estimate, setEstimate] = useState<ValueEstimate | null>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [upgrades, setUpgrades] = useState({
    kitchen: false,
    bath: false,
    flooring: false,
    hvac: false,
    roof: false,
  });
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ValueEstimatorFormData>({
    resolver: zodResolver(valueEstimatorSchema),
    defaultValues: {
      condition: 'good',
      timeline: 'exploring',
    }
  });

  const watchedValues = watch();
  const zipCode = watch('zipCode');
  const neighborhood = zipCode ? getNeighborhoodByZip(zipCode) : null;

  const calculateEstimate = (data: ValueEstimatorFormData): ValueEstimate => {
    const sqft = parseInt(data.squareFeet);
    const pricePerSqFt = neighborhood 
      ? parseInt(neighborhood.marketStats.pricePerSqFt.replace('$', ''))
      : 150;
    
    let baseValue = sqft * pricePerSqFt;

    // Adjust for condition
    const conditionMultipliers = {
      'excellent': 1.10,
      'good': 1.00,
      'fair': 0.95,
      'needs-work': 0.85,
    };
    baseValue *= conditionMultipliers[data.condition];

    // Adjust for upgrades
    const upgradeBonus = Object.values(data.upgrades || {}).filter(Boolean).length * 0.02;
    baseValue *= (1 + upgradeBonus);

    // Calculate range
    const variance = baseValue * 0.12;
    const lowEstimate = Math.round((baseValue - variance) / 1000) * 1000;
    const midEstimate = Math.round(baseValue / 1000) * 1000;
    const highEstimate = Math.round((baseValue + variance) / 1000) * 1000;

    // Determine strategy based on timeline and market
    let suggestedStrategy: 'aggressive' | 'market' | 'test-high' = 'market';
    let strategyDescription = '';

    if (data.timeline === 'asap') {
      suggestedStrategy = 'aggressive';
      strategyDescription = 'Price below market for quick sale (7-14 days)';
    } else if (data.timeline === '1-3-months') {
      suggestedStrategy = 'market';
      strategyDescription = 'Price at market value for optimal balance';
    } else {
      suggestedStrategy = 'test-high';
      strategyDescription = 'Price above market to test demand, adjust if needed';
    }

    const confidence = neighborhood ? 'high' : 'medium';

    return {
      lowEstimate,
      midEstimate,
      highEstimate,
      suggestedStrategy,
      strategyDescription,
      confidence,
    };
  };

  const onCalculate = (data: ValueEstimatorFormData) => {
    const result = calculateEstimate(data);
    setEstimate(result);
    setShowResults(true);
  };

  const onEmailResults = async (data: ValueEstimatorFormData) => {
    if (!data.email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to receive the full pricing strategy.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const leadTag = neighborhood && zipCode
      ? `${zipCode}-${neighborhood.name}-Home Value Estimator`
      : 'Home Value Estimator';

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Home Value Estimator Lead:', {
      ...data,
      estimate,
      leadTag,
      timestamp: new Date().toISOString(),
    });

    toast({
      title: "Success!",
      description: `Full pricing strategy + CMA report sent to ${data.email}`,
    });

    setIsSubmitting(false);
    setShowLeadCapture(false);
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Home className="h-6 w-6 text-primary" />
          Home Value Range + Price Confidence Estimator
        </CardTitle>
        <CardDescription>
          Get an estimated value range and pricing strategy for your home
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onCalculate)} className="space-y-6">
          {/* Property Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Property Information</h3>

            <div>
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Property Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="address"
                {...register('address')}
                placeholder="123 Main Street"
              />
              {errors.address && (
                <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="zipCode">
                ZIP Code <span className="text-destructive">*</span>
              </Label>
              <Select onValueChange={(value) => setValue('zipCode', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ZIP code" />
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
              <input type="hidden" {...register('zipCode')} />
              {errors.zipCode && (
                <p className="text-sm text-destructive mt-1">{errors.zipCode.message}</p>
              )}
            </div>

            {neighborhood && (
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm font-semibold mb-1">Market Area: {neighborhood.name}</p>
                <p className="text-sm text-muted-foreground">
                  Median Price: {neighborhood.marketStats.medianPrice} |
                  Price/Sq Ft: {neighborhood.marketStats.pricePerSqFt}
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="squareFeet">
                  Square Feet <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="squareFeet"
                  type="number"
                  {...register('squareFeet')}
                  placeholder="2000"
                />
                {errors.squareFeet && (
                  <p className="text-sm text-destructive mt-1">{errors.squareFeet.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="bedrooms">
                  Bedrooms <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(value) => setValue('bedrooms', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" {...register('bedrooms')} />
                {errors.bedrooms && (
                  <p className="text-sm text-destructive mt-1">{errors.bedrooms.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="bathrooms">
                  Bathrooms <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(value) => setValue('bathrooms', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5+'].map(num => (
                      <SelectItem key={num} value={num}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" {...register('bathrooms')} />
                {errors.bathrooms && (
                  <p className="text-sm text-destructive mt-1">{errors.bathrooms.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearBuilt">Year Built</Label>
                <Input
                  id="yearBuilt"
                  type="number"
                  {...register('yearBuilt')}
                  placeholder="2010"
                />
              </div>

              <div>
                <Label htmlFor="condition">
                  Property Condition <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={watchedValues.condition}
                  onValueChange={(value: 'excellent' | 'good' | 'fair' | 'needs-work') => setValue('condition', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="needs-work">Needs Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Recent Upgrades */}
          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-semibold text-lg">Recent Upgrades (Last 5 Years)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries({
                kitchen: 'Kitchen Remodel',
                bath: 'Bathroom Remodel',
                flooring: 'New Flooring',
                hvac: 'HVAC System',
                roof: 'New Roof',
              }).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={upgrades[key as keyof typeof upgrades]}
                    onCheckedChange={(checked) => {
                      const newUpgrades = { ...upgrades, [key]: checked };
                      setUpgrades(newUpgrades);
                      setValue('upgrades', newUpgrades);
                    }}
                  />
                  <Label htmlFor={key} className="cursor-pointer">{label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Selling Timeline */}
          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-semibold text-lg">Selling Timeline</h3>
            <Select
              value={watchedValues.timeline}
              onValueChange={(value: 'asap' | '1-3-months' | '3-6-months' | 'exploring') => setValue('timeline', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asap">ASAP (Need to sell quickly)</SelectItem>
                <SelectItem value="1-3-months">1-3 Months</SelectItem>
                <SelectItem value="3-6-months">3-6 Months</SelectItem>
                <SelectItem value="exploring">Just Exploring</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" size="lg" className="w-full">
            <TrendingUp className="h-5 w-5 mr-2" />
            Get Value Estimate
          </Button>
        </form>

        {/* Results Display */}
        {showResults && estimate && (
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary">
              <div className="flex items-center gap-3 mb-4">
                <Home className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Value Range</p>
                  <p className="text-3xl font-bold text-primary">
                    ${estimate.lowEstimate.toLocaleString()} - ${estimate.highEstimate.toLocaleString()}
                  </p>
                  <p className="text-lg text-muted-foreground mt-1">
                    Mid-Point: ${estimate.midEstimate.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">
                  Confidence Level: <span className="font-semibold capitalize">{estimate.confidence}</span>
                </span>
              </div>
            </div>

            {/* Pricing Strategy */}
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold text-lg mb-4">Suggested Pricing Strategy</h3>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border-2 ${
                  estimate.suggestedStrategy === 'aggressive' ? 'border-primary bg-primary/5' : 'border-muted'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Aggressive Pricing</span>
                    {estimate.suggestedStrategy === 'aggressive' && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Recommended</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ${estimate.lowEstimate.toLocaleString()} - Price below market for quick sale (7-14 days)
                  </p>
                </div>

                <div className={`p-4 rounded-lg border-2 ${
                  estimate.suggestedStrategy === 'market' ? 'border-primary bg-primary/5' : 'border-muted'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Market Pricing</span>
                    {estimate.suggestedStrategy === 'market' && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Recommended</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ${estimate.midEstimate.toLocaleString()} - Price at market value for optimal balance
                  </p>
                </div>

                <div className={`p-4 rounded-lg border-2 ${
                  estimate.suggestedStrategy === 'test-high' ? 'border-primary bg-primary/5' : 'border-muted'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Test-High Pricing</span>
                    {estimate.suggestedStrategy === 'test-high' && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Recommended</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ${estimate.highEstimate.toLocaleString()} - Price above market to test demand, adjust if needed
                  </p>
                </div>
              </div>
            </div>

            {!showLeadCapture && (
              <div className="text-center p-6 bg-muted/50 rounded-lg border">
                <p className="text-lg font-semibold mb-2">Want the full pricing strategy?</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a detailed CMA report with comparable sales and market analysis
                </p>
                <Button onClick={() => setShowLeadCapture(true)} size="lg">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Full CMA Report
                </Button>
              </div>
            )}

            {showLeadCapture && (
              <div className="p-6 bg-card rounded-lg border-2 border-primary">
                <h3 className="font-semibold text-lg mb-4">Get Your Full CMA Report</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone (Optional for CMA discussion)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      placeholder="(409) 223-7288"
                    />
                  </div>

                  <Button
                    onClick={handleSubmit(onEmailResults)}
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Full CMA Report + Pricing Strategy'}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    You'll receive a detailed comparative market analysis with recent sales data and pricing recommendations.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HomeValueEstimator;

