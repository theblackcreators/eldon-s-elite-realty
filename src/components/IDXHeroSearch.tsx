import { IDX_CONFIG } from '@/config/idxConfig';
import IDXContainer from './IDXContainer';
import { Search } from 'lucide-react';

/**
 * OPTION A: Homepage Hero Search Widget
 * 
 * Prominent search bar in hero section for immediate property search.
 * Drives engagement and captures search intent immediately.
 */
const IDXHeroSearch = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-muted/20 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Search className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold">Find Your Dream Home</h2>
          </div>
          <p className="text-xl text-muted-foreground">
            Search live MLS listings across Northeast Houston neighborhoods
          </p>
        </div>

        {/* IDX Search Widget Container */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-lg shadow-xl p-6 border overflow-hidden">
            <IDXContainer
              embedCode={IDX_CONFIG.embedCodes.heroSearch}
              className="idx-hero-search"
            />
          </div>
        </div>

        {/* Quick Search Links */}
        <div className="max-w-5xl mx-auto mt-6">
          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-sm text-muted-foreground">Popular Searches:</span>
            <a href="/properties?neighborhood=atascocita" className="text-sm text-primary hover:underline">
              Atascocita Homes
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/properties?neighborhood=kingwood" className="text-sm text-primary hover:underline">
              Kingwood Homes
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/properties?neighborhood=humble" className="text-sm text-primary hover:underline">
              Humble Homes
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/properties?price=under-300k" className="text-sm text-primary hover:underline">
              Homes Under $300K
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/properties?price=luxury" className="text-sm text-primary hover:underline">
              Luxury Homes
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IDXHeroSearch;

