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
import { Wrench, DollarSign, Mail, Phone, AlertCircle, CheckCircle2 } from 'lucide-react';

const repairEstimatorSchema = z.object({
  roof: z.enum(['good', 'repair', 'replace']),
  hvac: z.enum(['good', 'repair', 'replace']),
  paint: z.enum(['good', 'touchup', 'full']),
  flooring: z.enum(['good', 'partial', 'full']),
  kitchen: z.enum(['good', 'minor', 'major']),
  bathrooms: z.enum(['good', 'minor', 'major']),
  foundation: z.enum(['none', 'minor', 'major']),
  other: z.string().optional(),
  zipCode: z.string().optional(),
  // Optional lead capture fields
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  phone: z.string().optional(),
});

type RepairEstimatorFormData = z.infer<typeof repairEstimatorSchema>;

interface RepairItem {
  category: string;
  condition: string;
  lowCost: number;
  highCost: number;
  priority: 'must-fix' | 'high-roi' | 'nice-to-have';
  roiImpact: string;
}

interface RepairEstimate {
  items: RepairItem[];
  totalLow: number;
  totalHigh: number;
  mustFixTotal: number;
  highRoiTotal: number;
}

const RepairCostEstimator = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [estimate, setEstimate] = useState<RepairEstimate | null>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<RepairEstimatorFormData>({
    resolver: zodResolver(repairEstimatorSchema),
    defaultValues: {
      roof: 'good',
      hvac: 'good',
      paint: 'good',
      flooring: 'good',
      kitchen: 'good',
      bathrooms: 'good',
      foundation: 'none',
    }
  });

  const watchedValues = watch();
  const zipCode = watch('zipCode');
  const neighborhood = zipCode ? getNeighborhoodByZip(zipCode) : null;

  // Northeast Houston market rates (2024)
  const repairCosts = {
    roof: { repair: [2000, 5000], replace: [8000, 15000] },
    hvac: { repair: [500, 2000], replace: [5000, 10000] },
    paint: { touchup: [500, 1500], full: [3000, 6000] },
    flooring: { partial: [2000, 5000], full: [5000, 12000] },
    kitchen: { minor: [5000, 15000], major: [25000, 60000] },
    bathrooms: { minor: [3000, 8000], major: [10000, 25000] },
    foundation: { minor: [3000, 8000], major: [10000, 30000] },
  };

  const calculateEstimate = (data: RepairEstimatorFormData): RepairEstimate => {
    const items: RepairItem[] = [];

    // Roof
    if (data.roof !== 'good') {
      const costs = repairCosts.roof[data.roof as 'repair' | 'replace'];
      items.push({
        category: 'Roof',
        condition: data.roof === 'repair' ? 'Needs Repair' : 'Needs Replacement',
        lowCost: costs[0],
        highCost: costs[1],
        priority: data.roof === 'replace' ? 'must-fix' : 'high-roi',
        roiImpact: data.roof === 'replace' ? 'Critical - Required for sale' : 'High - Prevents buyer concerns',
      });
    }

    // HVAC
    if (data.hvac !== 'good') {
      const costs = repairCosts.hvac[data.hvac as 'repair' | 'replace'];
      items.push({
        category: 'HVAC System',
        condition: data.hvac === 'repair' ? 'Needs Repair' : 'Needs Replacement',
        lowCost: costs[0],
        highCost: costs[1],
        priority: data.hvac === 'replace' ? 'must-fix' : 'high-roi',
        roiImpact: data.hvac === 'replace' ? 'Critical - Required for sale' : 'High - Prevents buyer concerns',
      });
    }

    // Paint
    if (data.paint !== 'good') {
      const costs = repairCosts.paint[data.paint as 'touchup' | 'full'];
      items.push({
        category: 'Interior Paint',
        condition: data.paint === 'touchup' ? 'Touch-up Needed' : 'Full Repaint',
        lowCost: costs[0],
        highCost: costs[1],
        priority: 'high-roi',
        roiImpact: 'Very High - Best ROI for resale',
      });
    }

    // Flooring
    if (data.flooring !== 'good') {
      const costs = repairCosts.flooring[data.flooring as 'partial' | 'full'];
      items.push({
        category: 'Flooring',
        condition: data.flooring === 'partial' ? 'Partial Replacement' : 'Full Replacement',
        lowCost: costs[0],
        highCost: costs[1],
        priority: 'high-roi',
        roiImpact: 'High - Significant visual impact',
      });
    }

    // Kitchen
    if (data.kitchen !== 'good') {
      const costs = repairCosts.kitchen[data.kitchen as 'minor' | 'major'];
      items.push({
        category: 'Kitchen',
        condition: data.kitchen === 'minor' ? 'Minor Update' : 'Major Remodel',
        lowCost: costs[0],
        highCost: costs[1],
        priority: data.kitchen === 'major' ? 'nice-to-have' : 'high-roi',
        roiImpact: data.kitchen === 'minor' ? 'Very High - Best ROI' : 'Medium - May not recoup full cost',
      });
    }

    // Bathrooms
    if (data.bathrooms !== 'good') {
      const costs = repairCosts.bathrooms[data.bathrooms as 'minor' | 'major'];
      items.push({
        category: 'Bathrooms',
        condition: data.bathrooms === 'minor' ? 'Minor Update' : 'Major Remodel',
        lowCost: costs[0],
        highCost: costs[1],
        priority: data.bathrooms === 'major' ? 'nice-to-have' : 'high-roi',
        roiImpact: data.bathrooms === 'minor' ? 'High - Good ROI' : 'Medium - May not recoup full cost',
      });
    }

    // Foundation
    if (data.foundation !== 'none') {
      const costs = repairCosts.foundation[data.foundation as 'minor' | 'major'];
      items.push({
        category: 'Foundation',
        condition: data.foundation === 'minor' ? 'Minor Issues' : 'Major Issues',
        lowCost: costs[0],
        highCost: costs[1],
        priority: 'must-fix',
        roiImpact: 'Critical - Required for sale',
      });
    }

    const totalLow = items.reduce((sum, item) => sum + item.lowCost, 0);
    const totalHigh = items.reduce((sum, item) => sum + item.highCost, 0);
    const mustFixTotal = items.filter(i => i.priority === 'must-fix').reduce((sum, item) => sum + item.lowCost, 0);
    const highRoiTotal = items.filter(i => i.priority === 'high-roi').reduce((sum, item) => sum + item.lowCost, 0);

    return {
      items,
      totalLow,
      totalHigh,
      mustFixTotal,
      highRoiTotal,
    };
  };

  const onCalculate = (data: RepairEstimatorFormData) => {
    const result = calculateEstimate(data);
    setEstimate(result);
    setShowResults(true);
  };

  const onEmailResults = async (data: RepairEstimatorFormData) => {
    if (!data.email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to receive the prioritized repair list.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const leadTag = neighborhood && zipCode
      ? `${zipCode}-${neighborhood.name}-Repair Estimator`
      : 'Repair Estimator';

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Repair Cost Estimator Lead:', {
      ...data,
      estimate,
      leadTag,
      timestamp: new Date().toISOString(),
    });

    toast({
      title: "Success!",
      description: `Prioritized repair list + contractor recommendations sent to ${data.email}`,
    });

    setIsSubmitting(false);
    setShowLeadCapture(false);
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Wrench className="h-6 w-6 text-primary" />
          Repair & Renovation Cost Estimator
        </CardTitle>
        <CardDescription>
          Estimate repair costs and prioritize for resale ROI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onCalculate)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Property Condition Assessment</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="roof">Roof Condition</Label>
                <Select
                  value={watchedValues.roof}
                  onValueChange={(value: 'good' | 'repair' | 'replace') => setValue('roof', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Good Condition</SelectItem>
                    <SelectItem value="repair">Needs Repair</SelectItem>
                    <SelectItem value="replace">Needs Replacement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="hvac">HVAC System</Label>
                <Select
                  value={watchedValues.hvac}
                  onValueChange={(value: 'good' | 'repair' | 'replace') => setValue('hvac', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Good Condition</SelectItem>
                    <SelectItem value="repair">Needs Repair</SelectItem>
                    <SelectItem value="replace">Needs Replacement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="paint">Interior Paint</Label>
                <Select
                  value={watchedValues.paint}
                  onValueChange={(value: 'good' | 'touchup' | 'full') => setValue('paint', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Good Condition</SelectItem>
                    <SelectItem value="touchup">Needs Touch-up</SelectItem>
                    <SelectItem value="full">Needs Full Repaint</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="flooring">Flooring</Label>
                <Select
                  value={watchedValues.flooring}
                  onValueChange={(value: 'good' | 'partial' | 'full') => setValue('flooring', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Good Condition</SelectItem>
                    <SelectItem value="partial">Partial Replacement</SelectItem>
                    <SelectItem value="full">Full Replacement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="kitchen">Kitchen</Label>
                <Select
                  value={watchedValues.kitchen}
                  onValueChange={(value: 'good' | 'minor' | 'major') => setValue('kitchen', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Good Condition</SelectItem>
                    <SelectItem value="minor">Minor Update Needed</SelectItem>
                    <SelectItem value="major">Major Remodel Needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Select
                  value={watchedValues.bathrooms}
                  onValueChange={(value: 'good' | 'minor' | 'major') => setValue('bathrooms', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Good Condition</SelectItem>
                    <SelectItem value="minor">Minor Update Needed</SelectItem>
                    <SelectItem value="major">Major Remodel Needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="foundation">Foundation Issues</Label>
              <Select
                value={watchedValues.foundation}
                onValueChange={(value: 'none' | 'minor' | 'major') => setValue('foundation', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Issues</SelectItem>
                  <SelectItem value="minor">Minor Issues</SelectItem>
                  <SelectItem value="major">Major Issues</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="other">Other Items (fence, landscaping, appliances, etc.)</Label>
              <Input
                id="other"
                {...register('other')}
                placeholder="Describe any other repairs needed"
              />
            </div>

            <div>
              <Label htmlFor="zipCode">ZIP Code (Optional for market context)</Label>
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
          </div>

          <Button type="submit" size="lg" className="w-full">
            <Wrench className="h-5 w-5 mr-2" />
            Calculate Repair Costs
          </Button>
        </form>

        {/* Results Display */}
        {showResults && estimate && (
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Estimated Repair Cost</p>
                  <p className="text-3xl font-bold text-primary">
                    ${estimate.totalLow.toLocaleString()} - ${estimate.totalHigh.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-destructive/10 rounded border border-destructive/20">
                  <p className="text-sm text-muted-foreground">Must-Fix Items</p>
                  <p className="text-xl font-bold text-destructive">
                    ${estimate.mustFixTotal.toLocaleString()}+
                  </p>
                </div>
                <div className="p-3 bg-green-500/10 rounded border border-green-500/20">
                  <p className="text-sm text-muted-foreground">High-ROI Items</p>
                  <p className="text-xl font-bold text-green-600">
                    ${estimate.highRoiTotal.toLocaleString()}+
                  </p>
                </div>
              </div>
            </div>

            {/* Itemized Breakdown */}
            {estimate.items.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Itemized Breakdown</h3>
                {estimate.items.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      item.priority === 'must-fix'
                        ? 'border-destructive/30 bg-destructive/5'
                        : item.priority === 'high-roi'
                        ? 'border-green-500/30 bg-green-500/5'
                        : 'border-muted bg-muted/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{item.category}</h4>
                          {item.priority === 'must-fix' && (
                            <span className="text-xs bg-destructive text-destructive-foreground px-2 py-0.5 rounded">
                              Must Fix
                            </span>
                          )}
                          {item.priority === 'high-roi' && (
                            <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">
                              High ROI
                            </span>
                          )}
                          {item.priority === 'nice-to-have' && (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                              Nice to Have
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.condition}</p>
                      </div>
                      <p className="font-bold text-lg">
                        ${item.lowCost.toLocaleString()} - ${item.highCost.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      {item.priority === 'must-fix' ? (
                        <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="text-muted-foreground">{item.roiImpact}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {estimate.items.length === 0 && (
              <div className="text-center p-6 bg-green-500/10 rounded-lg border border-green-500/20">
                <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <p className="text-lg font-semibold text-green-600">Great News!</p>
                <p className="text-sm text-muted-foreground">
                  Your property appears to be in good condition with no major repairs needed.
                </p>
              </div>
            )}

            {!showLeadCapture && (
              <div className="text-center p-6 bg-muted/50 rounded-lg border">
                <p className="text-lg font-semibold mb-2">Want a prioritized action plan?</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a detailed repair priority list + local contractor recommendations
                </p>
                <Button onClick={() => setShowLeadCapture(true)} size="lg">
                  <Mail className="h-5 w-5 mr-2" />
                  Get Contractor Recommendations
                </Button>
              </div>
            )}

            {showLeadCapture && (
              <div className="p-6 bg-card rounded-lg border-2 border-primary">
                <h3 className="font-semibold text-lg mb-4">Get Your Repair Action Plan</h3>
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
                    <Label htmlFor="phone">Phone (Optional for contractor referrals)</Label>
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
                    {isSubmitting ? 'Sending...' : 'Send Repair List + Contractor Recommendations'}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    You'll receive a prioritized repair list with ROI analysis and trusted local contractor recommendations.
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

export default RepairCostEstimator;

