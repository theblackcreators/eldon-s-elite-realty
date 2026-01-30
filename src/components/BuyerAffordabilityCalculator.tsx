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
import { DollarSign, Home, Calculator, TrendingUp, Mail, Phone } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const calculatorSchema = z.object({
  purchasePrice: z.string().min(1, 'Purchase price is required'),
  downPayment: z.string().min(1, 'Down payment is required'),
  downPaymentType: z.enum(['dollar', 'percent']),
  interestRate: z.string().min(1, 'Interest rate is required'),
  loanTerm: z.enum(['15', '20', '30']),
  propertyTaxes: z.string().optional(),
  homeInsurance: z.string().optional(),
  hoaFees: z.string().optional(),
  pmi: z.string().optional(),
  mortgagePoints: z.string().optional(),
  zipCode: z.string().optional(),
  // Optional lead capture fields
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  phone: z.string().optional(),
});

type CalculatorFormData = z.infer<typeof calculatorSchema>;

interface PaymentBreakdown {
  principalAndInterest: number;
  propertyTaxes: number;
  homeInsurance: number;
  hoaFees: number;
  pmi: number;
  totalMonthly: number;
  loanAmount: number;
  downPaymentAmount: number;
  cashToClose: number;
}

const BuyerAffordabilityCalculator = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [breakdown, setBreakdown] = useState<PaymentBreakdown | null>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      downPaymentType: 'percent',
      loanTerm: '30',
      interestRate: '7.0',
    }
  });

  const watchedValues = watch();
  const zipCode = watch('zipCode');
  const neighborhood = zipCode ? getNeighborhoodByZip(zipCode) : null;

  const calculatePayment = (data: CalculatorFormData): PaymentBreakdown => {
    const price = parseFloat(data.purchasePrice);
    let downPaymentAmount: number;
    
    if (data.downPaymentType === 'percent') {
      downPaymentAmount = price * (parseFloat(data.downPayment) / 100);
    } else {
      downPaymentAmount = parseFloat(data.downPayment);
    }

    const loanAmount = price - downPaymentAmount;
    const monthlyRate = parseFloat(data.interestRate) / 100 / 12;
    const numPayments = parseInt(data.loanTerm) * 12;

    // Calculate P&I using mortgage formula
    const principalAndInterest = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const propertyTaxes = data.propertyTaxes ? parseFloat(data.propertyTaxes) / 12 : 0;
    const homeInsurance = data.homeInsurance ? parseFloat(data.homeInsurance) / 12 : 0;
    const hoaFees = data.hoaFees ? parseFloat(data.hoaFees) : 0;
    
    // PMI if down payment < 20%
    const downPaymentPercent = (downPaymentAmount / price) * 100;
    let pmi = 0;
    if (downPaymentPercent < 20) {
      pmi = data.pmi ? parseFloat(data.pmi) : loanAmount * 0.005 / 12; // Default 0.5% annually
    }

    const totalMonthly = principalAndInterest + propertyTaxes + homeInsurance + hoaFees + pmi;
    
    // Estimate cash to close (down payment + closing costs ~3%)
    const closingCosts = price * 0.03;
    const cashToClose = downPaymentAmount + closingCosts;

    return {
      principalAndInterest,
      propertyTaxes,
      homeInsurance,
      hoaFees,
      pmi,
      totalMonthly,
      loanAmount,
      downPaymentAmount,
      cashToClose,
    };
  };

  const onCalculate = (data: CalculatorFormData) => {
    const result = calculatePayment(data);
    setBreakdown(result);
    setShowResults(true);
  };

  const onEmailResults = async (data: CalculatorFormData) => {
    if (!data.email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to receive the full breakdown.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Create lead tag
    const leadTag = neighborhood && zipCode
      ? `${zipCode}-${neighborhood.name}-Affordability Calculator`
      : 'Affordability Calculator';

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Affordability Calculator Lead:', {
      ...data,
      breakdown,
      leadTag,
      timestamp: new Date().toISOString(),
    });

    toast({
      title: "Success!",
      description: `Full breakdown + loan scenarios sent to ${data.email}`,
    });

    setIsSubmitting(false);
    setShowLeadCapture(false);
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          Buyer Affordability + Payment Calculator
        </CardTitle>
        <CardDescription>
          Calculate your monthly payment and see what you can afford
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onCalculate)} className="space-y-6">
          {/* Purchase Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Purchase Details</h3>

            <div>
              <Label htmlFor="purchasePrice" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Purchase Price <span className="text-destructive">*</span>
              </Label>
              <Input
                id="purchasePrice"
                type="number"
                step="1000"
                {...register('purchasePrice')}
                placeholder="350000"
              />
              {errors.purchasePrice && (
                <p className="text-sm text-destructive mt-1">{errors.purchasePrice.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="downPayment">
                  Down Payment <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="downPayment"
                  type="number"
                  step="0.01"
                  {...register('downPayment')}
                  placeholder={watchedValues.downPaymentType === 'percent' ? '20' : '70000'}
                />
                {errors.downPayment && (
                  <p className="text-sm text-destructive mt-1">{errors.downPayment.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="downPaymentType">Down Payment Type</Label>
                <Select
                  value={watchedValues.downPaymentType}
                  onValueChange={(value: 'dollar' | 'percent') => setValue('downPaymentType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percent">Percentage (%)</SelectItem>
                    <SelectItem value="dollar">Dollar Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="interestRate">
                  Interest Rate (%) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.125"
                  {...register('interestRate')}
                  placeholder="7.0"
                />
                {errors.interestRate && (
                  <p className="text-sm text-destructive mt-1">{errors.interestRate.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="loanTerm">Loan Term</Label>
                <Select
                  value={watchedValues.loanTerm}
                  onValueChange={(value: '15' | '20' | '30') => setValue('loanTerm', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 Years</SelectItem>
                    <SelectItem value="20">20 Years</SelectItem>
                    <SelectItem value="30">30 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Additional Costs */}
          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-semibold text-lg">Additional Monthly Costs</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertyTaxes">Property Taxes (Annual)</Label>
                <Input
                  id="propertyTaxes"
                  type="number"
                  step="100"
                  {...register('propertyTaxes')}
                  placeholder="5000"
                />
              </div>

              <div>
                <Label htmlFor="homeInsurance">Home Insurance (Annual)</Label>
                <Input
                  id="homeInsurance"
                  type="number"
                  step="100"
                  {...register('homeInsurance')}
                  placeholder="1500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hoaFees">HOA Fees (Monthly)</Label>
                <Input
                  id="hoaFees"
                  type="number"
                  step="10"
                  {...register('hoaFees')}
                  placeholder="150"
                />
              </div>

              <div>
                <Label htmlFor="pmi">PMI (Monthly, if applicable)</Label>
                <Input
                  id="pmi"
                  type="number"
                  step="10"
                  {...register('pmi')}
                  placeholder="Auto-calculated if down < 20%"
                />
              </div>
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
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Payment
          </Button>
        </form>

        {/* Results Display */}
        {showResults && breakdown && (
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary">
              <div className="flex items-center gap-3 mb-4">
                <Home className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Monthly Payment</p>
                  <p className="text-4xl font-bold text-primary">
                    ${breakdown.totalMonthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Principal & Interest:</span>
                  <span className="font-semibold">${breakdown.principalAndInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                {breakdown.propertyTaxes > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property Taxes:</span>
                    <span className="font-semibold">${breakdown.propertyTaxes.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                )}
                {breakdown.homeInsurance > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Home Insurance:</span>
                    <span className="font-semibold">${breakdown.homeInsurance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                )}
                {breakdown.hoaFees > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">HOA Fees:</span>
                    <span className="font-semibold">${breakdown.hoaFees.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                )}
                {breakdown.pmi > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PMI:</span>
                    <span className="font-semibold">${breakdown.pmi.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-lg border">
                <p className="text-sm text-muted-foreground mb-1">Loan Amount</p>
                <p className="text-2xl font-bold">${breakdown.loanAmount.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <p className="text-sm text-muted-foreground mb-1">Down Payment</p>
                <p className="text-2xl font-bold">${breakdown.downPaymentAmount.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <p className="text-sm text-muted-foreground mb-1">Est. Cash to Close</p>
                <p className="text-2xl font-bold">${breakdown.cashToClose.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <p className="text-sm text-muted-foreground mb-1">Loan Term</p>
                <p className="text-2xl font-bold">{watchedValues.loanTerm} Years</p>
              </div>
            </div>

            {!showLeadCapture && (
              <div className="text-center p-6 bg-muted/50 rounded-lg border">
                <p className="text-lg font-semibold mb-2">Want a detailed breakdown?</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a full amortization schedule, loan scenarios, and rate watch alerts
                </p>
                <Button onClick={() => setShowLeadCapture(true)} size="lg">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Me Full Breakdown
                </Button>
              </div>
            )}

            {showLeadCapture && (
              <div className="p-6 bg-card rounded-lg border-2 border-primary">
                <h3 className="font-semibold text-lg mb-4">Get Your Full Breakdown</h3>
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
                    <Label htmlFor="phone">Phone (Optional for text alerts)</Label>
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
                    {isSubmitting ? 'Sending...' : 'Send Full Breakdown + Loan Scenarios'}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    You'll receive a detailed amortization schedule, multiple loan scenarios, and rate watch alerts.
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

export default BuyerAffordabilityCalculator;