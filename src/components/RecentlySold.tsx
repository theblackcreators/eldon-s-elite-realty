import { useState } from 'react';
import { recentSales } from '@/data/testimonials';
import { neighborhoods } from '@/data/neighborhoods';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, Bed, Bath, Ruler, Calendar, TrendingUp, Clock } from 'lucide-react';
import residentialProperty from '@/assets/residential-property.jpg';

const RecentlySold = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');

  const filteredSales = selectedNeighborhood === 'all'
    ? recentSales
    : recentSales.filter(sale => {
        const neighborhood = neighborhoods.find(n => n.name === sale.neighborhood);
        return neighborhood?.id === selectedNeighborhood;
      });

  const calculatePercentage = (sold: string, list: string): string => {
    const soldNum = parseInt(sold.replace(/[$,]/g, ''));
    const listNum = parseInt(list.replace(/[$,]/g, ''));
    const percentage = ((soldNum - listNum) / listNum) * 100;
    return percentage >= 0 ? `+${percentage.toFixed(1)}%` : `${percentage.toFixed(1)}%`;
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Recently Sold Properties</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            See recent successful sales across Northeast Houston neighborhoods
          </p>
          
          <div className="max-w-xs mx-auto">
            <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
              <SelectTrigger>
                <SelectValue placeholder="All Neighborhoods" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Neighborhoods</SelectItem>
                {neighborhoods.map(n => (
                  <SelectItem key={n.id} value={n.id}>{n.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSales.map((sale) => {
            const percentage = calculatePercentage(sale.soldPrice, sale.listPrice);
            const isAboveList = percentage.startsWith('+');
            
            return (
              <Card key={sale.id} className="hover:shadow-xl transition-shadow overflow-hidden">
                {sale.imageUrl ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={sale.imageUrl}
                      alt={`${sale.address} - ${sale.neighborhood}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Home className="h-20 w-20 text-primary/40" />
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{sale.address}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary">{sale.neighborhood}</Badge>
                        <Badge variant="outline">{sale.zipCode}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Price Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Sold Price</p>
                      <p className="text-2xl font-bold text-primary">{sale.soldPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">List Price</p>
                      <p className="text-lg font-semibold">{sale.listPrice}</p>
                    </div>
                  </div>

                  {/* Performance Badge */}
                  <div className={`p-3 rounded-lg ${isAboveList ? 'bg-green-50 dark:bg-green-950' : 'bg-muted'}`}>
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`h-4 w-4 ${isAboveList ? 'text-green-600' : 'text-muted-foreground'}`} />
                      <span className={`font-semibold ${isAboveList ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {percentage} {isAboveList ? 'above' : 'of'} list price
                      </span>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <Bed className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{sale.bedrooms} BD</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{sale.bathrooms} BA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{sale.squareFeet.toLocaleString()} SF</span>
                    </div>
                  </div>

                  {/* Days on Market */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{sale.daysOnMarket} days on market</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(sale.soldDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredSales.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No recent sales found for this neighborhood.
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to know what your home could sell for?
          </p>
          <a href="#valuation">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-8 rounded-lg font-semibold transition-colors">
              Get Free Home Valuation
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecentlySold;

