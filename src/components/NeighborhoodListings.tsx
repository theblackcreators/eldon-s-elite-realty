import { getNeighborhoodIDX } from '@/config/idxConfig';
import IDXContainer from './IDXContainer';
import { MapPin, Home } from 'lucide-react';

interface NeighborhoodListingsProps {
  neighborhoodId: string;
  neighborhoodName: string;
  zipCodes: string[];
}

/**
 * OPTION D: Neighborhood-Specific Listings
 * 
 * Displays properties filtered by specific neighborhood ZIP codes.
 * Reinforces hyperlocal expertise on each neighborhood page.
 */
const NeighborhoodListings = ({ 
  neighborhoodId, 
  neighborhoodName, 
  zipCodes 
}: NeighborhoodListingsProps) => {
  const embedCode = getNeighborhoodIDX(neighborhoodId);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Home className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Available Homes in {neighborhoodName}</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse current MLS listings in {neighborhoodName} ({zipCodes.map(zip => `ZIP ${zip}`).join(', ')})
          </p>
        </div>

        {/* Neighborhood Benefits */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Why Work With a Local Expert?</h3>
                <p className="text-muted-foreground text-sm">
                  As a {neighborhoodName} specialist, I provide insider knowledge on schools, amenities, 
                  market trends, and neighborhood dynamics that you won't find in generic listings. 
                  Let me help you find the perfect home in this community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* IDX Neighborhood Listings Container */}
        <div className="bg-card rounded-lg shadow-lg p-6 border overflow-hidden">
          <IDXContainer
            embedCode={embedCode}
            className="idx-neighborhood-listings"
          />
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            Don't see what you're looking for? I have access to off-market listings and coming-soon properties.
          </p>
          <a 
            href="tel:4092237288" 
            className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
          >
            📞 Call (409) 223-7288 for exclusive {neighborhoodName} listings
          </a>
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodListings;

