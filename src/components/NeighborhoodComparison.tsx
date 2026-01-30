import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { neighborhoods, Neighborhood } from '@/data/neighborhoods';
import { ArrowRight, TrendingUp, Home, DollarSign, Calendar } from 'lucide-react';

interface NeighborhoodComparisonProps {
  currentNeighborhood: Neighborhood;
}

const NeighborhoodComparison = ({ currentNeighborhood }: NeighborhoodComparisonProps) => {
  const [compareNeighborhood, setCompareNeighborhood] = useState<Neighborhood | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const availableNeighborhoods = neighborhoods.filter(n => n.slug !== currentNeighborhood.slug);

  const handleCompare = () => {
    if (compareNeighborhood) {
      setShowComparison(true);
    }
  };

  const ComparisonRow = ({ 
    label, 
    value1, 
    value2, 
    icon: Icon 
  }: { 
    label: string; 
    value1: string | number; 
    value2: string | number; 
    icon: any;
  }) => (
    <div className="grid grid-cols-3 gap-4 py-4 border-b last:border-b-0">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="font-medium">{label}</span>
      </div>
      <div className="text-center font-semibold">{value1}</div>
      <div className="text-center font-semibold">{value2}</div>
    </div>
  );

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Compare Neighborhoods
            </h2>
            <p className="text-lg text-muted-foreground">
              See how {currentNeighborhood.name} stacks up against other Northeast Houston communities
            </p>
          </div>

          {/* Comparison Selector */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Select a Neighborhood to Compare</CardTitle>
              <CardDescription>
                Choose another neighborhood to see a side-by-side comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Select onValueChange={(slug) => {
                    const selected = neighborhoods.find(n => n.slug === slug);
                    setCompareNeighborhood(selected || null);
                    setShowComparison(false);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a neighborhood..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableNeighborhoods.map(n => (
                        <SelectItem key={n.slug} value={n.slug}>
                          {n.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleCompare} 
                  disabled={!compareNeighborhood}
                  className="gap-2"
                >
                  Compare Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Results */}
          {showComparison && compareNeighborhood && (
            <Card className="shadow-xl">
              <CardHeader>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-2">Current</Badge>
                    <h3 className="text-xl font-bold">{currentNeighborhood.name}</h3>
                  </div>
                  <div className="text-center text-muted-foreground">
                    <span className="text-sm font-medium">VS</span>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="mb-2">Comparing</Badge>
                    <h3 className="text-xl font-bold">{compareNeighborhood.name}</h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  <ComparisonRow
                    label="Median Price"
                    value1={currentNeighborhood.marketStats.medianPrice}
                    value2={compareNeighborhood.marketStats.medianPrice}
                    icon={DollarSign}
                  />
                  <ComparisonRow
                    label="Days on Market"
                    value1={currentNeighborhood.marketStats.daysOnMarket}
                    value2={compareNeighborhood.marketStats.daysOnMarket}
                    icon={Calendar}
                  />
                  <ComparisonRow
                    label="Price per Sq Ft"
                    value1={currentNeighborhood.marketStats.pricePerSqFt}
                    value2={compareNeighborhood.marketStats.pricePerSqFt}
                    icon={Home}
                  />
                  <ComparisonRow
                    label="YoY Change"
                    value1={currentNeighborhood.marketStats.yearOverYearChange}
                    value2={compareNeighborhood.marketStats.yearOverYearChange}
                    icon={TrendingUp}
                  />
                  <ComparisonRow
                    label="Active Listings"
                    value1={currentNeighborhood.marketStats.activeListings}
                    value2={compareNeighborhood.marketStats.activeListings}
                    icon={Home}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodComparison;

