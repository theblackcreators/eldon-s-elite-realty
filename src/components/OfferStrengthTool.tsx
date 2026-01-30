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
import { Target, TrendingUp, Mail, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const buyerOfferSchema = z.object({
  offerPrice: z.string().min(1, 'Offer price is required'),
  listPrice: z.string().min(1, 'List price is required'),
  downPaymentPercent: z.string().min(1, 'Down payment is required'),
  financingType: z.enum(['conventional', 'fha', 'va', 'cash']),
  appraisalGap: z.string().optional(),
  optionPeriod: z.string().optional(),
  closingDays: z.string().optional(),
  concessions: z.string().optional(),
  zipCode: z.string().optional(),
  // Optional lead capture fields
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  phone: z.string().optional(),
});

const sellerOfferSchema = z.object({
  offers: z.array(z.object({
    buyerName: z.string(),
    offerPrice: z.string(),
    downPaymentPercent: z.string(),
    financingType: z.string(),
    appraisalGap: z.string(),
    closingDays: z.string(),
    concessions: z.string(),
  })),
  zipCode: z.string().optional(),
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  phone: z.string().optional(),
});

type BuyerOfferFormData = z.infer<typeof buyerOfferSchema>;
type SellerOfferFormData = z.infer<typeof sellerOfferSchema>;

interface OfferScore {
  totalScore: number;
  breakdown: {
    priceScore: number;
    downPaymentScore: number;
    financingScore: number;
    appraisalGapScore: number;
    timelineScore: number;
    concessionsScore: number;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

const OfferStrengthTool = () => {
  const [mode, setMode] = useState<'buyer' | 'seller'>('buyer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [offerScore, setOfferScore] = useState<OfferScore | null>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<BuyerOfferFormData>({
    resolver: zodResolver(buyerOfferSchema),
    defaultValues: {
      financingType: 'conventional',
      optionPeriod: '7',
      closingDays: '30',
    }
  });

  const watchedValues = watch();
  const zipCode = watch('zipCode');
  const neighborhood = zipCode ? getNeighborhoodByZip(zipCode) : null;

  const calculateOfferScore = (data: BuyerOfferFormData): OfferScore => {
    const offerPrice = parseFloat(data.offerPrice);
    const listPrice = parseFloat(data.listPrice);
    const downPayment = parseFloat(data.downPaymentPercent);
    const appraisalGap = data.appraisalGap ? parseFloat(data.appraisalGap) : 0;
    const closingDays = data.closingDays ? parseInt(data.closingDays) : 30;
    const concessions = data.concessions ? parseFloat(data.concessions) : 0;

    // Price Score (0-30 points)
    const priceRatio = offerPrice / listPrice;
    let priceScore = 0;
    if (priceRatio >= 1.05) priceScore = 30;
    else if (priceRatio >= 1.0) priceScore = 28;
    else if (priceRatio >= 0.98) priceScore = 25;
    else if (priceRatio >= 0.95) priceScore = 20;
    else priceScore = 15;

    // Down Payment Score (0-20 points)
    let downPaymentScore = 0;
    if (downPayment >= 20) downPaymentScore = 20;
    else if (downPayment >= 10) downPaymentScore = 15;
    else if (downPayment >= 5) downPaymentScore = 10;
    else downPaymentScore = 5;

    // Financing Score (0-20 points)
    const financingScores = {
      'cash': 20,
      'conventional': 18,
      'va': 15,
      'fha': 12,
    };
    const financingScore = financingScores[data.financingType];

    // Appraisal Gap Score (0-15 points)
    let appraisalGapScore = 0;
    if (appraisalGap >= 10000) appraisalGapScore = 15;
    else if (appraisalGap >= 5000) appraisalGapScore = 12;
    else if (appraisalGap > 0) appraisalGapScore = 8;
    else appraisalGapScore = 0;

    // Timeline Score (0-10 points)
    let timelineScore = 0;
    if (closingDays <= 21) timelineScore = 10;
    else if (closingDays <= 30) timelineScore = 8;
    else if (closingDays <= 45) timelineScore = 6;
    else timelineScore = 4;

    // Concessions Score (0-5 points) - lower is better
    let concessionsScore = 0;
    if (concessions === 0) concessionsScore = 5;
    else if (concessions <= 2000) concessionsScore = 3;
    else concessionsScore = 1;

    const totalScore = priceScore + downPaymentScore + financingScore + appraisalGapScore + timelineScore + concessionsScore;

    // Determine strengths and weaknesses
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const recommendations: string[] = [];

    if (priceScore >= 28) strengths.push('Strong offer price');
    else if (priceScore < 20) {
      weaknesses.push('Below-market offer price');
      recommendations.push('Consider increasing offer price to be more competitive');
    }

    if (downPaymentScore >= 15) strengths.push('Strong down payment');
    else {
      weaknesses.push('Low down payment');
      recommendations.push('Increase down payment if possible to strengthen offer');
    }

    if (financingScore >= 18) strengths.push('Strong financing');
    else {
      weaknesses.push('Weaker financing type');
      recommendations.push('Consider pre-approval letter or proof of funds');
    }

    if (appraisalGapScore >= 12) strengths.push('Appraisal gap coverage');
    else recommendations.push('Consider adding appraisal gap coverage');

    if (timelineScore >= 8) strengths.push('Flexible closing timeline');
    else recommendations.push('Offer flexible closing date to match seller needs');

    if (concessionsScore >= 3) strengths.push('Minimal concessions requested');
    else {
      weaknesses.push('High concessions requested');
      recommendations.push('Reduce concession requests to strengthen offer');
    }

    return {
      totalScore,
      breakdown: {
        priceScore,
        downPaymentScore,
        financingScore,
        appraisalGapScore,
        timelineScore,
        concessionsScore,
      },
      strengths,
      weaknesses,
      recommendations,
    };
  };

  const onCalculate = (data: BuyerOfferFormData) => {
    const result = calculateOfferScore(data);
    setOfferScore(result);
    setShowResults(true);
  };

  const onEmailResults = async (data: BuyerOfferFormData) => {
    if (!data.email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to receive the offer strategy guide.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const leadTag = neighborhood && zipCode
      ? `${zipCode}-${neighborhood.name}-Offer Strategy Tool`
      : 'Offer Strategy Tool';

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Offer Strength Tool Lead:', {
      ...data,
      offerScore,
      mode,
      leadTag,
      timestamp: new Date().toISOString(),
    });

    toast({
      title: "Success!",
      description: `Offer strategy guide sent to ${data.email}`,
    });

    setIsSubmitting(false);
    setShowLeadCapture(false);
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          Offer Strength Builder + Comparison Tool
        </CardTitle>
        <CardDescription>
          Analyze offer strength (buyers) or compare multiple offers (sellers)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={mode} onValueChange={(value) => setMode(value as 'buyer' | 'seller')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="buyer">Buyer Mode</TabsTrigger>
            <TabsTrigger value="seller">Seller Mode</TabsTrigger>
          </TabsList>

          <TabsContent value="buyer">
            <form onSubmit={handleSubmit(onCalculate)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Offer Details</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="listPrice">
                      List Price <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="listPrice"
                      type="number"
                      step="1000"
                      {...register('listPrice')}
                      placeholder="400000"
                    />
                    {errors.listPrice && (
                      <p className="text-sm text-destructive mt-1">{errors.listPrice.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="offerPrice">
                      Your Offer Price <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="offerPrice"
                      type="number"
                      step="1000"
                      {...register('offerPrice')}
                      placeholder="405000"
                    />
                    {errors.offerPrice && (
                      <p className="text-sm text-destructive mt-1">{errors.offerPrice.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="downPaymentPercent">
                      Down Payment (%) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="downPaymentPercent"
                      type="number"
                      step="0.5"
                      {...register('downPaymentPercent')}
                      placeholder="20"
                    />
                    {errors.downPaymentPercent && (
                      <p className="text-sm text-destructive mt-1">{errors.downPaymentPercent.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="financingType">
                      Financing Type <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={watchedValues.financingType}
                      onValueChange={(value: 'conventional' | 'fha' | 'va' | 'cash') => setValue('financingType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="conventional">Conventional</SelectItem>
                        <SelectItem value="va">VA Loan</SelectItem>
                        <SelectItem value="fha">FHA Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="appraisalGap">Appraisal Gap Coverage ($)</Label>
                    <Input
                      id="appraisalGap"
                      type="number"
                      step="1000"
                      {...register('appraisalGap')}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="optionPeriod">Option Period (days)</Label>
                    <Input
                      id="optionPeriod"
                      type="number"
                      {...register('optionPeriod')}
                      placeholder="7"
                    />
                  </div>

                  <div>
                    <Label htmlFor="closingDays">Closing Timeline (days)</Label>
                    <Input
                      id="closingDays"
                      type="number"
                      {...register('closingDays')}
                      placeholder="30"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="concessions">Seller Concessions Requested ($)</Label>
                  <Input
                    id="concessions"
                    type="number"
                    step="100"
                    {...register('concessions')}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="zipCode">ZIP Code (Optional)</Label>
                  <Select onValueChange={(value) => setValue('zipCode', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ZIP for market context" />
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
              </div>

              <Button type="submit" size="lg" className="w-full">
                <Target className="h-5 w-5 mr-2" />
                Calculate Offer Strength
              </Button>
            </form>

            {/* Results Display */}
            {showResults && offerScore && (
              <div className="mt-8 space-y-6">
                <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Offer Strength Score</p>
                      <p className="text-4xl font-bold text-primary">
                        {offerScore.totalScore}/100
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {offerScore.totalScore >= 85 ? 'Very Strong' :
                         offerScore.totalScore >= 70 ? 'Strong' :
                         offerScore.totalScore >= 55 ? 'Competitive' : 'Needs Improvement'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <div className="p-2 bg-card rounded">
                      <p className="text-muted-foreground">Price</p>
                      <p className="font-semibold">{offerScore.breakdown.priceScore}/30</p>
                    </div>
                    <div className="p-2 bg-card rounded">
                      <p className="text-muted-foreground">Down Payment</p>
                      <p className="font-semibold">{offerScore.breakdown.downPaymentScore}/20</p>
                    </div>
                    <div className="p-2 bg-card rounded">
                      <p className="text-muted-foreground">Financing</p>
                      <p className="font-semibold">{offerScore.breakdown.financingScore}/20</p>
                    </div>
                    <div className="p-2 bg-card rounded">
                      <p className="text-muted-foreground">Appraisal Gap</p>
                      <p className="font-semibold">{offerScore.breakdown.appraisalGapScore}/15</p>
                    </div>
                    <div className="p-2 bg-card rounded">
                      <p className="text-muted-foreground">Timeline</p>
                      <p className="font-semibold">{offerScore.breakdown.timelineScore}/10</p>
                    </div>
                    <div className="p-2 bg-card rounded">
                      <p className="text-muted-foreground">Concessions</p>
                      <p className="font-semibold">{offerScore.breakdown.concessionsScore}/5</p>
                    </div>
                  </div>
                </div>

                {/* Strengths */}
                {offerScore.strengths.length > 0 && (
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      Strengths
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {offerScore.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weaknesses */}
                {offerScore.weaknesses.length > 0 && (
                  <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      Areas to Improve
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {offerScore.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-destructive">•</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {offerScore.recommendations.length > 0 && (
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Recommendations
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {offerScore.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {!showLeadCapture && (
                  <div className="text-center p-6 bg-muted/50 rounded-lg border">
                    <p className="text-lg font-semibold mb-2">Want a detailed offer strategy?</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get a personalized offer strategy guide + market insights
                    </p>
                    <Button onClick={() => setShowLeadCapture(true)} size="lg">
                      <Mail className="h-5 w-5 mr-2" />
                      Email My Offer Strategy
                    </Button>
                  </div>
                )}

                {showLeadCapture && (
                  <div className="p-6 bg-card rounded-lg border-2 border-primary">
                    <h3 className="font-semibold text-lg mb-4">Get Your Offer Strategy Guide</h3>
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
                        <Label htmlFor="phone">Phone (Optional for strategy consultation)</Label>
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
                        {isSubmitting ? 'Sending...' : 'Send Offer Strategy + Market Insights'}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        You'll receive a detailed offer strategy guide with market insights and negotiation tips.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="seller">
            <div className="text-center p-12 bg-muted/50 rounded-lg border">
              <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Seller Mode: Compare Multiple Offers</h3>
              <p className="text-muted-foreground mb-6">
                This feature allows you to compare up to 5 offers side-by-side with detailed scoring and recommendations.
              </p>
              <Button size="lg" onClick={() => setShowLeadCapture(true)}>
                <Mail className="h-5 w-5 mr-2" />
                Request Offer Comparison Analysis
              </Button>

              {showLeadCapture && (
                <div className="mt-6 p-6 bg-card rounded-lg border-2 border-primary text-left">
                  <h3 className="font-semibold text-lg mb-4">Get Personalized Offer Analysis</h3>
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
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone <span className="text-destructive">*</span></Label>
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
                      {isSubmitting ? 'Sending...' : 'Request Offer Comparison Analysis'}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      I'll personally review your offers and provide a detailed comparison with recommendations.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OfferStrengthTool;

