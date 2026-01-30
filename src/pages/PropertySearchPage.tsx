import { IDX_CONFIG } from '@/config/idxConfig';
import IDXContainer from '@/components/IDXContainer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter, Home, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO, getBreadcrumbSchema } from '@/components/SEO';
import { PAGE_SEO } from '@/config/seoConfig';

/**
 * OPTION B: Dedicated Property Search Page
 *
 * Full-featured property search with advanced filters, map view, and save search functionality.
 * This is the main property search destination.
 */
const PropertySearchPage = () => {
  const structuredData = [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Property Search', url: '/properties' }
    ])
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={PAGE_SEO.properties.title}
        description={PAGE_SEO.properties.description}
        keywords={PAGE_SEO.properties.keywords}
        canonical={PAGE_SEO.properties.path}
        structuredData={structuredData}
      />
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-muted/20 py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Search className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">Property Search</h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Search live MLS listings across Northeast Houston
            </p>
            
            {/* Quick Neighborhood Links */}
            <div className="flex flex-wrap justify-center gap-2">
              <Link to="/neighborhoods/atascocita">
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  Atascocita (77346)
                </Badge>
              </Link>
              <Link to="/neighborhoods/humble">
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  Humble (77338, 77369)
                </Badge>
              </Link>
              <Link to="/neighborhoods/kingwood">
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  Kingwood (77339)
                </Badge>
              </Link>
              <Link to="/neighborhoods/summerwood">
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  Summerwood (77044)
                </Badge>
              </Link>
              <Link to="/neighborhoods/fall-creek">
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  Fall Creek (77044)
                </Badge>
              </Link>
              <Link to="/neighborhoods/eado">
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  EaDo (77003)
                </Badge>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Features */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 bg-card p-4 rounded-lg border">
              <Filter className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold">Advanced Filters</h3>
                <p className="text-sm text-muted-foreground">Price, beds, baths, sqft & more</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-card p-4 rounded-lg border">
              <MapPin className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold">Map View</h3>
                <p className="text-sm text-muted-foreground">See properties on interactive map</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-card p-4 rounded-lg border">
              <Home className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold">Save Searches</h3>
                <p className="text-sm text-muted-foreground">Get alerts for new listings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IDX Full Search Container */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-lg shadow-xl p-6 border overflow-hidden">
            <IDXContainer
              embedCode={IDX_CONFIG.embedCodes.fullSearch}
              className="idx-full-search"
            />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Finding the Perfect Home?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            As a Northeast Houston specialist, I have access to off-market listings, coming-soon properties, 
            and insider knowledge that can give you a competitive edge.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:4092237288">
              <Button size="lg" className="gap-2">
                <Phone className="h-5 w-5" />
                Call (409) 223-7288
              </Button>
            </a>
            <Link to="/#contact">
              <Button size="lg" variant="outline" className="gap-2">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertySearchPage;

