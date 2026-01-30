import { useParams, Link } from 'react-router-dom';
import { getNeighborhoodBySlug } from '@/data/neighborhoods';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NeighborhoodListings from '@/components/NeighborhoodListings';
import LocalInsights from '@/components/LocalInsights';
import NeighborhoodComparison from '@/components/NeighborhoodComparison';
import NeighborhoodFAQ from '@/components/NeighborhoodFAQ';
import VideoPlayer from '@/components/VideoPlayer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MapPin, TrendingUp, Home, School, Building2, Trees,
  Users, DollarSign, Calendar, ArrowLeft, Phone, Mail, Play
} from 'lucide-react';
import { SEO, getBreadcrumbSchema } from '@/components/SEO';
import { getNeighborhoodSchema } from '@/utils/structuredData';
import { NEIGHBORHOOD_SEO } from '@/config/seoConfig';
import { getNeighborhoodThemeClass, getNeighborhoodVisualIdentity } from '@/utils/neighborhoodThemes';

const NeighborhoodPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const neighborhood = slug ? getNeighborhoodBySlug(slug) : null;

  if (!neighborhood) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Neighborhood Not Found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const seoData = NEIGHBORHOOD_SEO[slug as keyof typeof NEIGHBORHOOD_SEO];
  const structuredData = [
    getNeighborhoodSchema(neighborhood),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Neighborhoods', url: '/#neighborhoods' },
      { name: neighborhood.name, url: `/neighborhoods/${slug}` }
    ])
  ];

  const visualIdentity = getNeighborhoodVisualIdentity(slug || '');

  return (
    <div className={`min-h-screen bg-background ${getNeighborhoodThemeClass(slug || '')}`}>
      <SEO
        title={seoData?.title}
        description={seoData?.description}
        keywords={seoData?.keywords}
        canonical={`/neighborhoods/${slug}`}
        structuredData={structuredData}
      />
      <Header />

      {/* Hero Section with Neighborhood Theme */}
      <section className="relative neighborhood-bg py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to All Neighborhoods
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {visualIdentity && (
                <span className="text-4xl mr-2">{visualIdentity.icon}</span>
              )}
              {neighborhood.zipCodes.map(zip => (
                <Badge key={zip} variant="secondary" className="text-sm neighborhood-border">
                  ZIP {zip}
                </Badge>
              ))}
            </div>
            <h1 className="text-5xl font-bold mb-4 neighborhood-accent">{neighborhood.name}</h1>
            <p className="text-2xl text-muted-foreground mb-6">{neighborhood.tagline}</p>
            <p className="text-lg leading-relaxed">{neighborhood.description}</p>

            {visualIdentity && (
              <div className="mt-6 p-4 bg-background/50 rounded-lg border neighborhood-border">
                <p className="text-sm text-muted-foreground italic">
                  {visualIdentity.inspiration}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 mt-8">
              <a href="#contact">
                <Button size="lg" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Schedule Consultation
                </Button>
              </a>
              <a href="#market-stats">
                <Button size="lg" variant="outline" className="gap-2 neighborhood-border">
                  <TrendingUp className="h-4 w-4" />
                  View Market Data
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Video Tour Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 neighborhood-accent">
              Explore {neighborhood.name}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take a virtual tour of {neighborhood.name} and discover what makes this community special.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <VideoPlayer
                poster={neighborhood.heroImage}
                autoPlay={false}
                muted={false}
                controls={true}
                className="shadow-2xl"
                title={`${neighborhood.name} Neighborhood Tour`}
              />

              {/* Placeholder overlay when no video is provided */}
              <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-primary/70 transition-colors">
                <div className="text-center text-primary-foreground">
                  <div className="w-20 h-20 mx-auto mb-4 neighborhood-bg rounded-full flex items-center justify-center border-4 border-primary-foreground/20">
                    <Play className="h-10 w-10 text-primary-foreground ml-1" />
                  </div>
                  <p className="text-lg font-semibold mb-2">Neighborhood Tour Coming Soon</p>
                  <p className="text-sm opacity-90">
                    Video tour of {neighborhood.name} will be available here
                  </p>
                </div>
              </div>
            </div>

            {/* Video CTA */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Interested in {neighborhood.name}? Let's schedule a personal tour of available homes.
              </p>
              <a href="#contact" className="neighborhood-accent hover:opacity-80 font-semibold underline">
                Schedule Your Personal Tour →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Market Statistics */}
      <section id="market-stats" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            Current Market Statistics
          </h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Median Price</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{neighborhood.marketStats.medianPrice}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Days on Market</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{neighborhood.marketStats.daysOnMarket}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Price/Sq Ft</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{neighborhood.marketStats.pricePerSqFt}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">YoY Change</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">{neighborhood.marketStats.yearOverYearChange}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Active Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{neighborhood.marketStats.activeListings}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Market Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="default" className="text-sm">{neighborhood.marketStats.inventoryLevel}</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Live Here */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Why Live in {neighborhood.name}?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhood.whyLiveHere.map((reason, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <p className="text-lg">{reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Schools */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <School className="h-8 w-8 text-primary" />
            Local Schools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhood.schools.map((school, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{school.name}</CardTitle>
                    {school.rating && (
                      <Badge variant="secondary">{school.rating}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-semibold">Type:</span> {school.type}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">District:</span> {school.district}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            Local Amenities
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {neighborhood.amenities.map((amenity, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{amenity.name}</CardTitle>
                    <Badge variant="outline">{amenity.category}</Badge>
                  </div>
                </CardHeader>
                {amenity.description && (
                  <CardContent>
                    <p className="text-muted-foreground">{amenity.description}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Highlights */}
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Trees className="h-8 w-8 text-primary" />
                Community Highlights
              </h2>
              <ul className="space-y-3">
                {neighborhood.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-lg">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Demographics */}
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                Demographics
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Population</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{neighborhood.demographics.population}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Median Age</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{neighborhood.demographics.medianAge}</p>
                  </CardContent>
                </Card>
                <Card className="col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Median Income</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{neighborhood.demographics.medianIncome}</p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-semibold mb-4">Community Features</h3>
              <ul className="space-y-2">
                {neighborhood.communityFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhood-Specific IDX Listings - Option D */}
      <NeighborhoodListings
        neighborhoodId={neighborhood.id}
        neighborhoodName={neighborhood.name}
        zipCodes={neighborhood.zipCodes}
      />

      {/* Local Insights Section */}
      <LocalInsights neighborhoodName={neighborhood.name} />

      {/* Neighborhood Comparison Tool */}
      <NeighborhoodComparison currentNeighborhood={neighborhood} />

      {/* Neighborhood FAQ Section */}
      <NeighborhoodFAQ
        neighborhoodName={neighborhood.name}
        zipCodes={neighborhood.zipCodes}
      />

      {/* Contact CTA */}
      <section id="contact" className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Explore {neighborhood.name}?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your real estate goals in this amazing community
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:4092237288">
              <Button size="lg" variant="secondary" className="gap-2">
                <Phone className="h-5 w-5" />
                (409) 223-7288
              </Button>
            </a>
            <Link to="/#contact">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
                Contact Form
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NeighborhoodPage;

