import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { neighborhoods, getNeighborhoodByZip } from '@/data/neighborhoods';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, TrendingUp, Calculator, Mail, Phone } from 'lucide-react';

const netProceedsSchema = z.object({
  salePrice: z.string().min(1, 'Sale price is required'),
  mortgageBalance: z.string().optional(),
  commissionRate: z.string().optional(),
  closingCosts: z.string().optional(),
  repairCredits: z.string().optional(),
  liens: z.string().optional(),
  zipCode: z.string().optional(),
  // Optional lead capture fields
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  phone: z.string().optional(),
});

type NetProceedsFormData = z.infer<typeof netProceedsSchema>;

interface NetProceeds {
  salePrice: number;
  totalDeductions: number;
  netProceeds: number;
  breakdown: {
    commission: number;
    closingCosts: number;
    mortgagePayoff: number;
    repairCredits: number;
    liens: number;
  };
}

const SellerNetProceedsCalculator = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [proceeds, setProceeds] = useState<NetProceeds | null>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<NetProceedsFormData>({
    resolver: zodResolver(netProceedsSchema),
    defaultValues: {
      commissionRate: '6',
      closingCosts: '2',
    }
  });

  const watchedValues = watch();
  const zipCode = watch('zipCode');
  const neighborhood = zipCode ? getNeighborhoodByZip(zipCode) : null;

  const calculateNetProceeds = (data: NetProceedsFormData): NetProceeds => {
    const salePrice = parseFloat(data.salePrice);
    const commissionRate = data.commissionRate ? parseFloat(data.commissionRate) : 6;
    const closingCostsRate = data.closingCosts ? parseFloat(data.closingCosts) : 2;
    
    const commission = salePrice * (commissionRate / 100);
    const closingCosts = salePrice * (closingCostsRate / 100);
    const mortgagePayoff = data.mortgageBalance ? parseFloat(data.mortgageBalance) : 0;
    const repairCredits = data.repairCredits ? parseFloat(data.repairCredits) : 0;
    const liens = data.liens ? parseFloat(data.liens) : 0;

    const totalDeductions = commission + closingCosts + mortgagePayoff + repairCredits + liens;
    const netProceeds = salePrice - totalDeductions;

    return {
      salePrice,
      totalDeductions,
      netProceeds,
      breakdown: {
        commission,
        closingCosts,
        mortgagePayoff,
        repairCredits,
        liens,
      }
    };
  };

  const onCalculate = (data: NetProceedsFormData) => {
    const result = calculateNetProceeds(data);
    setProceeds(result);
    setShowResults(true);
  };

  const onEmailResults = async (data: NetProceedsFormData) => {
    if (!data.email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to receive your net sheet PDF.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const leadTag = neighborhood && zipCode
      ? `${zipCode}-${neighborhood.name}-Net Proceeds Calculator`
      : 'Net Proceeds Calculator';

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Net Proceeds Calculator Lead:', {
      ...data,
      proceeds,
      leadTag,
      timestamp: new Date().toISOString(),
    });

    toast({
      title: "Success!",
      description: `Net sheet PDF + pricing strategy call scheduled. Check ${data.email}`,
    });

    setIsSubmitting(false);
    setShowLeadCapture(false);
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Seller Net Proceeds Calculator
        </CardTitle>
        <CardDescription>
          Estimate your net proceeds from selling your home
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onCalculate)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Sale Information</h3>
            
            <div>
              <Label htmlFor="salePrice" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Expected Sale Price <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="salePrice" 
                type="number"
                step="1000"
                {...register('salePrice')} 
                placeholder="400000"
              />
              {errors.salePrice && (
                <p className="text-sm text-destructive mt-1">{errors.salePrice.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="mortgageBalance">Current Mortgage Payoff Balance</Label>
              <Input
                id="mortgageBalance"
                type="number"
                step="1000"
                {...register('mortgageBalance')}
                placeholder="250000"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="commissionRate">Real Estate Commission (%)</Label>
                <Input
                  id="commissionRate"
                  type="number"
                  step="0.5"
                  {...register('commissionRate')}
                  placeholder="6"
                />
                <p className="text-xs text-muted-foreground mt-1">Default: 6%</p>
              </div>

              <div>
                <Label htmlFor="closingCosts">Estimated Closing Costs (%)</Label>
                <Input
                  id="closingCosts"
                  type="number"
                  step="0.5"
                  {...register('closingCosts')}
                  placeholder="2"
                />
                <p className="text-xs text-muted-foreground mt-1">Default: 2%</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="repairCredits">Repair Credits/Concessions</Label>
                <Input
                  id="repairCredits"
                  type="number"
                  step="100"
                  {...register('repairCredits')}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="liens">Outstanding Liens/HOA Dues</Label>
                <Input
                  id="liens"
                  type="number"
                  step="100"
                  {...register('liens')}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Net Proceeds
          </Button>
        </form>

        {/* Results Display */}
        {showResults && proceeds && (
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Net Proceeds</p>
                  <p className="text-4xl font-bold text-primary">
                    ${proceeds.netProceeds.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Sale Price:</span>
                  <span>${proceeds.salePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Commission ({watchedValues.commissionRate}%):</span>
                  <span>-${proceeds.breakdown.commission.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Closing Costs ({watchedValues.closingCosts}%):</span>
                  <span>-${proceeds.breakdown.closingCosts.toLocaleString()}</span>
                </div>
                {proceeds.breakdown.mortgagePayoff > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Mortgage Payoff:</span>
                    <span>-${proceeds.breakdown.mortgagePayoff.toLocaleString()}</span>
                  </div>
                )}
                {proceeds.breakdown.repairCredits > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Repair Credits:</span>
                    <span>-${proceeds.breakdown.repairCredits.toLocaleString()}</span>
                  </div>
                )}
                {proceeds.breakdown.liens > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Liens/HOA Dues:</span>
                    <span>-${proceeds.breakdown.liens.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-destructive border-t pt-2">
                  <span>Total Deductions:</span>
                  <span>-${proceeds.totalDeductions.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {!showLeadCapture && (
              <div className="text-center p-6 bg-muted/50 rounded-lg border">
                <p className="text-lg font-semibold mb-2">Want a detailed net sheet?</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a PDF net sheet + schedule a pricing strategy call
                </p>
                <Button onClick={() => setShowLeadCapture(true)} size="lg">
                  <Mail className="h-5 w-5 mr-2" />
                  Send My Net Sheet PDF
                </Button>
              </div>
            )}

            {showLeadCapture && (
              <div className="p-6 bg-card rounded-lg border-2 border-primary">
                <h3 className="font-semibold text-lg mb-4">Get Your Net Sheet PDF</h3>
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
                    <Label htmlFor="phone">Phone (Optional for pricing strategy call)</Label>
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
                    {isSubmitting ? 'Sending...' : 'Send Net Sheet + Schedule Strategy Call'}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    You'll receive a detailed net sheet PDF and I'll reach out to discuss pricing strategy.
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

export default SellerNetProceedsCalculator;

