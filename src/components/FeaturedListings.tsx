import { IDX_CONFIG } from '@/config/idxConfig';
import IDXContainer from './IDXContainer';
import { Star, TrendingUp, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

/**
 * OPTION C: Featured Listings Showcase
 *
 * Rotating carousel of hand-picked properties on homepage.
 * Highlights "Just Listed", "Price Reduced", and premium properties.
 */
const FeaturedListings = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="h-8 w-8 text-primary fill-primary" />
            <h2 className="text-4xl font-bold">Featured Properties</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hand-picked listings across Northeast Houston neighborhoods
          </p>
        </div>

        {/* Featured Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-lg p-6 border text-center hover:shadow-lg transition-shadow">
            <Clock className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Just Listed</h3>
            <p className="text-muted-foreground text-sm">
              Fresh on the market - be the first to see these new listings
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border text-center hover:shadow-lg transition-shadow">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Price Reduced</h3>
            <p className="text-muted-foreground text-sm">
              Motivated sellers - great opportunities for buyers
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border text-center hover:shadow-lg transition-shadow">
            <Star className="h-12 w-12 text-primary mx-auto mb-3 fill-primary" />
            <h3 className="text-xl font-bold mb-2">Premium Homes</h3>
            <p className="text-muted-foreground text-sm">
              Luxury properties and exclusive listings
            </p>
          </div>
        </div>

        {/* IDX Featured Listings Container */}
        <div className="bg-card rounded-lg shadow-xl p-6 border overflow-hidden">
          <IDXContainer
            embedCode={IDX_CONFIG.embedCodes.featuredListings}
            className="idx-featured-listings"
          />
        </div>

        {/* CTA to Full Search */}
        <div className="text-center mt-8">
          <Link to="/properties">
            <Button size="lg" className="gap-2">
              View All Properties
              <TrendingUp className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;

