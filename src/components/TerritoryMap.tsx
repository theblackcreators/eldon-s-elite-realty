import { useState } from 'react';
import { neighborhoods } from '@/data/neighborhoods';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, TrendingUp, Home, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const TerritoryMap = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);

  const selected = selectedNeighborhood 
    ? neighborhoods.find(n => n.id === selectedNeighborhood)
    : null;

  return (
    <section id="territory" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Northeast Houston Territory</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore my specialized coverage areas. Click on any neighborhood to see detailed market insights and local expertise.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Interactive Map Area */}
          <div className="relative">
            <div className="bg-card rounded-lg border p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-center">My Coverage Areas</h3>
              
              {/* Visual Map Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {neighborhoods.map((neighborhood) => (
                  <button
                    key={neighborhood.id}
                    onClick={() => setSelectedNeighborhood(neighborhood.id)}
                    className={`p-6 rounded-lg border-2 transition-all duration-300 text-left ${
                      selectedNeighborhood === neighborhood.id
                        ? 'border-primary bg-primary/10 shadow-lg scale-105'
                        : 'border-border hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <MapPin className={`h-5 w-5 mt-1 ${
                        selectedNeighborhood === neighborhood.id ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{neighborhood.name}</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {neighborhood.zipCodes.map(zip => (
                            <Badge key={zip} variant="secondary" className="text-xs">
                              {zip}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {neighborhood.tagline}
                    </p>
                  </button>
                ))}
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  <strong>6 Neighborhoods</strong> • <strong>7 ZIP Codes</strong> • <strong>Northeast Houston Core</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Market Stats Display */}
          <div className="lg:sticky lg:top-24">
            {selected ? (
              <Card className="shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-3xl">{selected.name}</CardTitle>
                      <CardDescription className="text-lg mt-2">
                        {selected.tagline}
                      </CardDescription>
                    </div>
                    <Badge variant="default" className="text-sm">
                      {selected.zipCodes.join(', ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Market Statistics */}
                  <div>
                    <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Current Market Stats
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Median Price</p>
                        <p className="text-2xl font-bold text-primary">{selected.marketStats.medianPrice}</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Days on Market</p>
                        <p className="text-2xl font-bold">{selected.marketStats.daysOnMarket}</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Price/Sq Ft</p>
                        <p className="text-2xl font-bold">{selected.marketStats.pricePerSqFt}</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">YoY Change</p>
                        <p className="text-2xl font-bold text-green-600">{selected.marketStats.yearOverYearChange}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                    <Home className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Active Listings</p>
                      <p className="text-xl font-semibold">{selected.marketStats.activeListings} homes</p>
                    </div>
                    <div className="ml-auto">
                      <Badge variant="outline">{selected.marketStats.inventoryLevel}</Badge>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="pt-4 space-y-3">
                    <Link 
                      to={`/neighborhoods/${selected.slug}`}
                      className="block w-full"
                    >
                      <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-6 rounded-lg font-semibold transition-colors">
                        Explore {selected.name} Details
                      </button>
                    </Link>
                    <p className="text-sm text-center text-muted-foreground">
                      View schools, amenities, and community insights
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle>Select a Neighborhood</CardTitle>
                  <CardDescription>
                    Click on any neighborhood to view detailed market statistics and local insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Choose a neighborhood from the map to see current market data
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerritoryMap;

