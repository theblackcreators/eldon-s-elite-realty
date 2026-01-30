/**
 * HAR IDX Configuration
 * 
 * This file centralizes all IDX embed codes and settings.
 * Replace the placeholder comments with your actual HAR IDX embed codes.
 */

export const IDX_CONFIG = {
  // Your HAR IDX Provider (e.g., 'IDX Broker', 'Showcase IDX', 'iHomefinder')
  provider: 'HAR (Houston Association of REALTORS®)',

  // Your HAR Member ID / Agent ID
  agentId: '675220',
  
  // IDX Embed Codes - HAR IDX System
  embedCodes: {
    // Homepage Hero Search Widget - HAR Quick Search
    heroSearch: `
      <iframe
        src="https://www.har.com/idx/quicksearch?sitetype=aws&cid=675220&allmls=y"
        width="100%"
        height="500"
        frameborder="0"
        style="border: none; border-radius: 8px;"
        title="HAR Quick Search"
      ></iframe>
    `,
    
    // Full Property Search Page - Advanced MLS Search
    fullSearch: `
      <iframe
        src="https://www.har.com/idx/mls/search?sitetype=aws&cid=675220&allmls=y&for_sale=1"
        width="100%"
        height="800"
        frameborder="0"
        style="border: none; border-radius: 8px;"
        title="HAR MLS Search"
      ></iframe>
    `,
    
    // Featured Listings Carousel - My Quick Search
    featuredListings: `
      <iframe
        src="https://www.har.com/idx/myquicksearch?sitetype=aws&cid=675220&allmls=n"
        width="100%"
        height="600"
        frameborder="0"
        style="border: none; border-radius: 8px;"
        title="HAR Featured Listings"
      ></iframe>
    `,
    
    // Neighborhood-Specific Listings - Neighborhood Search
    neighborhoodListings: (zipCodes: string[]) => `
      <iframe
        src="https://www.har.com/idx/neighborhood/search?sitetype=aws&cid=675220"
        width="100%"
        height="700"
        frameborder="0"
        style="border: none; border-radius: 8px;"
        title="HAR Neighborhood Search - ${zipCodes.join(', ')}"
      ></iframe>
    `,
  },
  
  // Additional HAR IDX Tools
  additionalTools: {
    schoolSearch: 'https://www.har.com/idx/school/search?sitetype=aws&cid=675220',
    leadForm: 'https://www.har.com/idx/leadform?sitetype=aws&cid=675220',
    homeValueSearch: 'https://www.har.com/idx/mls/homevalue/search?sitetype=aws&cid=675220',
  },

  // IDX Script URLs - HAR IDX uses iframes, no additional scripts needed
  scripts: [],
  
  // Neighborhood ZIP Code Mappings
  neighborhoodZips: {
    'the-woodlands': ['77380', '77381', '77382', '77384', '77385', '77386', '77389'],
    'atascocita': ['77346'],
    'humble': ['77338', '77369'],
    'kingwood': ['77339'],
    'summerwood': ['77044'],
    'fall-creek': ['77044'],
    'eado': ['77003']
  },
  
  // Lead capture settings
  leadCapture: {
    enabled: true,
    requireEmailForSavedSearches: true,
    requireEmailForPropertyDetails: false,
    autoTagLeads: true, // Auto-tag leads with neighborhood
  },
  
  // Display settings
  display: {
    showMap: true,
    showSchools: true,
    showNeighborhoodInfo: true,
    resultsPerPage: 12,
    defaultSort: 'newest',
  }
};

// Helper function to load IDX scripts
export const loadIDXScripts = () => {
  IDX_CONFIG.scripts.forEach(scriptUrl => {
    if (scriptUrl && !document.querySelector(`script[src="${scriptUrl}"]`)) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
    }
  });
};

// Helper function to get neighborhood-specific embed code
export const getNeighborhoodIDX = (neighborhoodId: string): string => {
  const zipCodes = IDX_CONFIG.neighborhoodZips[neighborhoodId as keyof typeof IDX_CONFIG.neighborhoodZips];
  if (!zipCodes) return '';
  return IDX_CONFIG.embedCodes.neighborhoodListings(zipCodes);
};

