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
import { Calculator, DollarSign, TrendingUp, Mail, Phone, Home } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mortgageSchema = z.object({
  homePrice: z.string().min(1, 'Home price is required'),
  downPayment: z.string().min(1, 'Down payment is required'),
  downPaymentType: z.enum(['dollar', 'percent']),
  interestRate: z.string().min(1, 'Interest rate is required'),
  loanTerm: z.enum(['15', '20', '30']),
  propertyTaxes: z.string().optional(),
  homeInsurance: z.string().optional(),
  hoaFees: z.string().optional(),
  pmi: z.string().optional(),
  zipCode: z.string().optional(),
  // Lead capture fields
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  phone: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

type MortgageFormData = z.infer<typeof mortgageSchema>;

interface MortgageBreakdown {
  principal: number;
  interest: number;
  propertyTaxes: number;
  homeInsurance: number;
  hoaFees: number;
  pmi: number;
  totalMonthly: number;
  loanAmount: number;
  downPaymentAmount: number;
  totalInterest: number;
  totalPayment: number;
}

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

const MortgageCalculator = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [breakdown, setBreakdown] = useState<MortgageBreakdown | null>(null);
  const [amortization, setAmortization] = useState<AmortizationRow[]>([]);
  const [showAmortization, setShowAmortization] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparison, setComparison] = useState<MortgageBreakdown | null>(null);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<MortgageFormData>({
    resolver: zodResolver(mortgageSchema),
    defaultValues: {
      downPaymentType: 'percent',
      loanTerm: '30',
      interestRate: '7.0',
    }
  });

  const watchedValues = watch();
  const zipCode = watch('zipCode');
  const neighborhood = zipCode ? getNeighborhoodByZip(zipCode) : null;

  const calculateMortgage = (data: MortgageFormData): MortgageBreakdown => {
    const price = parseFloat(data.homePrice);
    let downPaymentAmount: number;
    
    if (data.downPaymentType === 'percent') {
      downPaymentAmount = price * (parseFloat(data.downPayment) / 100);
    } else {
      downPaymentAmount = parseFloat(data.downPayment);
    }

    const loanAmount = price - downPaymentAmount;
    const monthlyRate = parseFloat(data.interestRate) / 100 / 12;
    const numPayments = parseInt(data.loanTerm) * 12;

    // Calculate monthly P&I using mortgage formula
    const monthlyPI = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const principal = monthlyPI / (1 + monthlyRate * numPayments / (Math.pow(1 + monthlyRate, numPayments) - 1));
    const interest = monthlyPI - principal;

    const propertyTaxes = data.propertyTaxes ? parseFloat(data.propertyTaxes) / 12 : 0;
    const homeInsurance = data.homeInsurance ? parseFloat(data.homeInsurance) / 12 : 0;
    const hoaFees = data.hoaFees ? parseFloat(data.hoaFees) : 0;
    
    // PMI if down payment < 20%
    const downPaymentPercent = (downPaymentAmount / price) * 100;
    let pmi = 0;
    if (downPaymentPercent < 20) {
      pmi = data.pmi ? parseFloat(data.pmi) : loanAmount * 0.005 / 12; // Default 0.5% annually
    }

    const totalMonthly = monthlyPI + propertyTaxes + homeInsurance + hoaFees + pmi;
    const totalInterest = (monthlyPI * numPayments) - loanAmount;
    const totalPayment = monthlyPI * numPayments;

    return {
      principal,
      interest,
      propertyTaxes,
      homeInsurance,
      hoaFees,
      pmi,
      totalMonthly,
      loanAmount,
      downPaymentAmount,
      totalInterest,
      totalPayment,
    };
  };

  const generateAmortizationSchedule = (data: MortgageFormData): AmortizationRow[] => {
    const price = parseFloat(data.homePrice);
    let downPaymentAmount: number;
    
    if (data.downPaymentType === 'percent') {
      downPaymentAmount = price * (parseFloat(data.downPayment) / 100);
    } else {
      downPaymentAmount = parseFloat(data.downPayment);
    }

    const loanAmount = price - downPaymentAmount;
    const monthlyRate = parseFloat(data.interestRate) / 100 / 12;
    const numPayments = parseInt(data.loanTerm) * 12;

    const monthlyPayment = loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const schedule: AmortizationRow[] = [];
    let balance = loanAmount;

    for (let month = 1; month <= numPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      // Only add every 12th month to keep schedule manageable
      if (month % 12 === 0 || month === 1) {
        schedule.push({
          month,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance),
        });
      }
    }

    return schedule;
  };

  const onSubmit = async (data: MortgageFormData) => {
    setIsSubmitting(true);

    try {
      const result = calculateMortgage(data);
      setBreakdown(result);
      setShowResults(true);

      // Generate amortization schedule
      const schedule = generateAmortizationSchedule(data);
      setAmortization(schedule);

      // If email provided, capture lead
      if (data.email) {
        const leadTag = `${zipCode || 'Unknown'}-${neighborhood?.name || 'Unknown'}-Mortgage Calculator`;
        console.log('Lead captured:', { ...data, tag: leadTag });

        toast({
          title: "Calculation Complete!",
          description: "Your mortgage breakdown is ready. Check your email for pre-approval options.",
        });
      } else {
        toast({
          title: "Calculation Complete!",
          description: "Your mortgage breakdown is ready below.",
        });
      }
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Please check your inputs and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompare = () => {
    if (breakdown) {
      setComparison(breakdown);
      setComparisonMode(true);
      setShowResults(false);
      setBreakdown(null);
      toast({
        title: "Comparison Mode Activated",
        description: "Adjust the values to compare with your first scenario.",
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Calculator className="h-10 w-10 text-accent" />
              <h2 className="text-4xl font-bold">Mortgage Calculator</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Calculate your monthly mortgage payment and see a detailed breakdown of principal, interest, taxes, and insurance
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Home className="h-6 w-6 text-primary" />
                  Loan Details
                </CardTitle>
                <CardDescription>
                  Enter your loan information to calculate monthly payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Home Price */}
                  <div>
                    <Label htmlFor="homePrice" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Home Price <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="homePrice"
                      type="number"
                      step="1000"
                      {...register('homePrice')}
                      placeholder="425000"
                    />
                    {errors.homePrice && (
                      <p className="text-sm text-destructive mt-1">{errors.homePrice.message}</p>
                    )}
                  </div>

                  {/* Down Payment */}
                  <div>
                    <Label htmlFor="downPayment">
                      Down Payment <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="downPayment"
                        type="number"
                        step="0.01"
                        {...register('downPayment')}
                        placeholder="20"
                        className="flex-1"
                      />
                      <Select
                        value={watchedValues.downPaymentType}
                        onValueChange={(value) => setValue('downPaymentType', value as 'dollar' | 'percent')}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percent">%</SelectItem>
                          <SelectItem value="dollar">$</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.downPayment && (
                      <p className="text-sm text-destructive mt-1">{errors.downPayment.message}</p>
                    )}
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <Label htmlFor="interestRate">
                      Interest Rate (%) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.01"
                      {...register('interestRate')}
                      placeholder="7.0"
                    />
                    {errors.interestRate && (
                      <p className="text-sm text-destructive mt-1">{errors.interestRate.message}</p>
                    )}
                  </div>

                  {/* Loan Term */}
                  <div>
                    <Label htmlFor="loanTerm">
                      Loan Term <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={watchedValues.loanTerm}
                      onValueChange={(value) => setValue('loanTerm', value as '15' | '20' | '30')}
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

                  {/* Property Taxes (Annual) */}
                  <div>
                    <Label htmlFor="propertyTaxes">
                      Property Taxes (Annual)
                    </Label>
                    <Input
                      id="propertyTaxes"
                      type="number"
                      step="100"
                      {...register('propertyTaxes')}
                      placeholder="6000"
                    />
                  </div>

                  {/* Home Insurance (Annual) */}
                  <div>
                    <Label htmlFor="homeInsurance">
                      Home Insurance (Annual)
                    </Label>
                    <Input
                      id="homeInsurance"
                      type="number"
                      step="100"
                      {...register('homeInsurance')}
                      placeholder="1500"
                    />
                  </div>

                  {/* HOA Fees (Monthly) */}
                  <div>
                    <Label htmlFor="hoaFees">
                      HOA Fees (Monthly)
                    </Label>
                    <Input
                      id="hoaFees"
                      type="number"
                      step="10"
                      {...register('hoaFees')}
                      placeholder="150"
                    />
                  </div>

                  {/* PMI (Monthly) */}
                  <div>
                    <Label htmlFor="pmi">
                      PMI (Monthly) - Optional
                    </Label>
                    <Input
                      id="pmi"
                      type="number"
                      step="10"
                      {...register('pmi')}
                      placeholder="Auto-calculated if down payment < 20%"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Leave blank to auto-calculate based on down payment
                    </p>
                  </div>

                  {/* ZIP Code */}
                  <div>
                    <Label htmlFor="zipCode">ZIP Code (Optional)</Label>
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
                  </div>

                  {/* Lead Capture Toggle */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox
                        id="leadCapture"
                        checked={showLeadCapture}
                        onCheckedChange={(checked) => setShowLeadCapture(checked as boolean)}
                      />
                      <Label htmlFor="leadCapture" className="text-sm font-normal cursor-pointer">
                        Get pre-approved! Enter your contact info for personalized mortgage options
                      </Label>
                    </div>

                    {showLeadCapture && (
                      <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" {...register('firstName')} placeholder="John" />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" {...register('lastName')} placeholder="Doe" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email
                          </Label>
                          <Input id="email" type="email" {...register('email')} placeholder="john.doe@example.com" />
                          {errors.email && (
                            <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="phone" className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone
                          </Label>
                          <Input id="phone" type="tel" {...register('phone')} placeholder="(409) 223-7288" />
                        </div>
                      </div>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      'Calculating...'
                    ) : (
                      <>
                        <Calculator className="h-5 w-5 mr-2" />
                        Calculate Payment
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results Display */}
            {showResults && breakdown && (
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-accent" />
                    Monthly Payment Breakdown
                  </CardTitle>
                  <CardDescription>
                    Your estimated monthly mortgage payment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Total Monthly Payment */}
                  <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary">
                    <p className="text-sm text-muted-foreground mb-1">Total Monthly Payment</p>
                    <p className="text-4xl font-bold text-primary">
                      ${breakdown.totalMonthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>

                  {/* Payment Breakdown */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Payment Breakdown</h3>

                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Principal & Interest</span>
                      <span className="font-semibold">
                        ${(breakdown.principal + breakdown.interest).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    {breakdown.propertyTaxes > 0 && (
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-muted-foreground">Property Taxes</span>
                        <span className="font-semibold">
                          ${breakdown.propertyTaxes.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    )}

                    {breakdown.homeInsurance > 0 && (
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-muted-foreground">Home Insurance</span>
                        <span className="font-semibold">
                          ${breakdown.homeInsurance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    )}

                    {breakdown.hoaFees > 0 && (
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-muted-foreground">HOA Fees</span>
                        <span className="font-semibold">
                          ${breakdown.hoaFees.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    )}

                    {breakdown.pmi > 0 && (
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-muted-foreground">PMI</span>
                        <span className="font-semibold">
                          ${breakdown.pmi.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Loan Summary */}
                  <div className="space-y-3 pt-4 border-t">
                    <h3 className="font-semibold text-lg">Loan Summary</h3>

                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Loan Amount</span>
                      <span className="font-semibold">
                        ${breakdown.loanAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Down Payment</span>
                      <span className="font-semibold">
                        ${breakdown.downPaymentAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Total Interest</span>
                      <span className="font-semibold">
                        ${breakdown.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Total Payment</span>
                      <span className="font-semibold">
                        ${breakdown.totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowAmortization(!showAmortization)}
                    >
                      {showAmortization ? 'Hide' : 'Show'} Amortization
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCompare}
                    >
                      Compare Scenarios
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comparison Display */}
            {comparisonMode && comparison && breakdown && (
              <Card className="shadow-xl lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Scenario Comparison</CardTitle>
                  <CardDescription>
                    Compare two different loan scenarios side-by-side
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Scenario 1</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Monthly Payment:</span>
                          <span className="font-semibold">${comparison.totalMonthly.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Interest:</span>
                          <span className="font-semibold">${comparison.totalInterest.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Scenario 2</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Monthly Payment:</span>
                          <span className="font-semibold">${breakdown.totalMonthly.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Interest:</span>
                          <span className="font-semibold">${breakdown.totalInterest.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Amortization Schedule */}
          {showAmortization && amortization.length > 0 && (
            <Card className="mt-8 shadow-xl">
              <CardHeader>
                <CardTitle>Amortization Schedule</CardTitle>
                <CardDescription>
                  Year-by-year breakdown of your loan payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Year</th>
                        <th className="text-right p-2">Payment</th>
                        <th className="text-right p-2">Principal</th>
                        <th className="text-right p-2">Interest</th>
                        <th className="text-right p-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortization.map((row) => (
                        <tr key={row.month} className="border-b">
                          <td className="p-2">{Math.ceil(row.month / 12)}</td>
                          <td className="text-right p-2">${row.payment.toFixed(2)}</td>
                          <td className="text-right p-2">${row.principal.toFixed(2)}</td>
                          <td className="text-right p-2">${row.interest.toFixed(2)}</td>
                          <td className="text-right p-2">${row.balance.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;

