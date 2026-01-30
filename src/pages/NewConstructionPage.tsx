import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Home, MapPin, Sparkles } from 'lucide-react';
import { SEO, getBreadcrumbSchema } from '@/components/SEO';
import { PAGE_SEO } from '@/config/seoConfig';

/**
 * New Construction Search Page
 *
 * Displays the Builders Update search widget for new construction homes
 */
const NewConstructionPage = () => {
  const structuredData = [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'New Construction', url: '/new-construction' }
    ])
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={PAGE_SEO.newConstruction.title}
        description={PAGE_SEO.newConstruction.description}
        keywords={PAGE_SEO.newConstruction.keywords}
        canonical={PAGE_SEO.newConstruction.path}
        structuredData={structuredData}
      />
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-muted/20 py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">New Construction Homes</h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Search brand new homes from top builders in Northeast Houston
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 bg-card p-4 rounded-lg border">
              <Home className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold">Brand New Homes</h3>
                <p className="text-sm text-muted-foreground">Never lived in, latest features</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-card p-4 rounded-lg border">
              <MapPin className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold">Top Builders</h3>
                <p className="text-sm text-muted-foreground">Trusted construction companies</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-card p-4 rounded-lg border">
              <Sparkles className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold">Modern Designs</h3>
                <p className="text-sm text-muted-foreground">Latest floor plans & amenities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Construction Search Widget */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold mb-2">Search New Construction</h2>
            <p className="text-muted-foreground text-lg">
              Browse available new construction homes and communities in the Houston area
            </p>
          </div>

          {/* Builders Update Widget with Luxury Styling */}
          <div className="idx-new-construction">
            <iframe
              src="https://eldonpeterson.buildersupdate.com/search/searchbu.aspx"
              width="100%"
              height="1200"
              frameBorder="0"
              style={{ border: 'none', borderRadius: '8px' }}
              title="New Construction Search"
              className="w-full min-h-[1200px]"
            />
          </div>
        </div>
      </section>

      {/* Why New Construction CTA */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose New Construction?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-8">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-bold mb-2">Warranty Protection</h3>
              <p className="text-sm text-muted-foreground">
                New homes come with builder warranties for peace of mind
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-bold mb-2">Energy Efficient</h3>
              <p className="text-sm text-muted-foreground">
                Modern construction means lower utility bills
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-bold mb-2">Customization</h3>
              <p className="text-sm text-muted-foreground">
                Choose finishes, colors, and upgrades to suit your style
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-bold mb-2">No Repairs Needed</h3>
              <p className="text-sm text-muted-foreground">
                Move in ready with everything brand new
              </p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let me help you navigate the new construction process and find the perfect builder and community for your needs.
          </p>
          <a href="tel:4092237288" className="inline-block">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Call (409) 223-7288
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewConstructionPage;

