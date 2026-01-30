export interface MarketStats {
  medianPrice: string;
  daysOnMarket: number;
  inventoryLevel: string;
  pricePerSqFt: string;
  yearOverYearChange: string;
  activeListings: number;
}

export interface School {
  name: string;
  type: 'Elementary' | 'Middle' | 'High' | 'Private';
  rating?: string;
  district: string;
}

export interface Amenity {
  name: string;
  category: 'Park' | 'Shopping' | 'Dining' | 'Recreation' | 'Healthcare' | 'Entertainment';
  description?: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  zipCodes: string[];
  tagline: string;
  description: string;
  heroImage?: string;
  marketStats: MarketStats;
  schools: School[];
  amenities: Amenity[];
  highlights: string[];
  demographics: {
    population: string;
    medianAge: string;
    medianIncome: string;
  };
  communityFeatures: string[];
  whyLiveHere: string[];
}

export const neighborhoods: Neighborhood[] = [
  {
    id: 'the-woodlands',
    name: 'The Woodlands',
    slug: 'the-woodlands',
    zipCodes: ['77380', '77381', '77382', '77384', '77385', '77386', '77389'],
    tagline: 'Premier Master-Planned Community Excellence',
    description: 'The Woodlands is one of America\'s most prestigious master-planned communities, offering an unparalleled lifestyle with luxury homes, world-class amenities, and a thriving business district. Nestled among towering pines and lush greenery, this 28,000-acre community seamlessly blends nature with modern sophistication, featuring over 220 parks, 100+ miles of trails, championship golf courses, upscale shopping and dining, and top-rated schools.',
    marketStats: {
      medianPrice: '$525,000',
      daysOnMarket: 28,
      inventoryLevel: 'Competitive',
      pricePerSqFt: '$185',
      yearOverYearChange: '+6.2%',
      activeListings: 385
    },
    schools: [
      { name: 'The Woodlands High School', type: 'High', rating: '9/10', district: 'Conroe ISD' },
      { name: 'The Woodlands College Park High School', type: 'High', rating: '9/10', district: 'Conroe ISD' },
      { name: 'McCullough Junior High', type: 'Middle', rating: '9/10', district: 'Conroe ISD' },
      { name: 'Knox Junior High', type: 'Middle', rating: '9/10', district: 'Conroe ISD' },
      { name: 'Buckalew Elementary', type: 'Elementary', rating: '10/10', district: 'Conroe ISD' },
      { name: 'Deretchin Elementary', type: 'Elementary', rating: '10/10', district: 'Conroe ISD' },
      { name: 'The Woodlands Preparatory School', type: 'Private', district: 'Private' },
      { name: 'The John Cooper School', type: 'Private', district: 'Private' }
    ],
    amenities: [
      { name: 'The Woodlands Mall', category: 'Shopping', description: 'Premier shopping destination with 160+ stores' },
      { name: 'Market Street', category: 'Shopping', description: 'Upscale outdoor shopping and dining district' },
      { name: 'Hughes Landing', category: 'Entertainment', description: 'Waterfront dining and entertainment' },
      { name: 'The Cynthia Woods Mitchell Pavilion', category: 'Entertainment', description: 'World-class outdoor amphitheater' },
      { name: 'Waterway Square', category: 'Dining', description: 'Waterfront restaurants and nightlife' },
      { name: 'Memorial Hermann The Woodlands Medical Center', category: 'Healthcare', description: 'Full-service hospital and medical campus' },
      { name: 'Texas Children\'s Hospital The Woodlands', category: 'Healthcare', description: 'Pediatric specialty care' },
      { name: 'Rob Fleming Park', category: 'Park', description: 'Aquatic center, sports fields, and trails' },
      { name: 'Northshore Park', category: 'Park', description: 'Waterfront park with events and activities' },
      { name: 'The Woodlands Waterway', category: 'Recreation', description: '1.3-mile waterway with gondola rides' },
      { name: 'The Club at Carlton Woods', category: 'Recreation', description: 'Championship golf courses' },
      { name: 'The Woodlands Country Club', category: 'Recreation', description: 'Multiple golf courses and tennis facilities' }
    ],
    highlights: [
      'Over 220 parks and 100+ miles of hike and bike trails',
      'Top-rated Conroe ISD schools and prestigious private schools',
      'World-class shopping at The Woodlands Mall and Market Street',
      'Championship golf courses and country clubs',
      'The Cynthia Woods Mitchell Pavilion for concerts and events',
      'Major corporate headquarters (ExxonMobil, Huntsman, Anadarko)',
      'Award-winning healthcare facilities',
      'Extensive waterway system with gondola rides',
      'Low crime rates and family-friendly environment',
      'Easy access to IAH Airport and downtown Houston'
    ],
    demographics: {
      population: '115,000+',
      medianAge: '38',
      medianIncome: '$115,000'
    },
    communityFeatures: [
      '28,000-acre master-planned community',
      'Over 220 parks and green spaces',
      '100+ miles of pathways and trails',
      'Multiple community pools and recreation centers',
      '8 championship golf courses',
      'The Woodlands Waterway with gondola service',
      'Extensive retail and dining options',
      'Corporate business district with major employers',
      'Award-winning community events and festivals',
      'Active homeowners associations'
    ],
    whyLiveHere: [
      'Nationally recognized as one of the best places to live in America',
      'Exceptional schools with high academic achievement',
      'Abundant outdoor recreation with extensive trail systems',
      'Upscale shopping, dining, and entertainment options',
      'Strong sense of community with year-round events',
      'Low crime rates and safe, family-friendly neighborhoods',
      'Proximity to major employers and business opportunities',
      'World-class healthcare facilities',
      'Beautiful natural setting with mature trees and green spaces',
      'Strong property values and excellent investment potential'
    ]
  },
  {
    id: 'atascocita',
    name: 'Atascocita',
    slug: 'atascocita',
    zipCodes: ['77346'],
    tagline: 'Family-Friendly Living with Lake Houston Access',
    description: 'Atascocita offers a perfect blend of suburban comfort and natural beauty, with easy access to Lake Houston and top-rated schools. This master-planned community features excellent amenities, parks, and a strong sense of community.',
    marketStats: {
      medianPrice: '$385,000',
      daysOnMarket: 35,
      inventoryLevel: 'Balanced',
      pricePerSqFt: '$145',
      yearOverYearChange: '+8.5%',
      activeListings: 142
    },
    schools: [
      { name: 'Atascocita High School', type: 'High', rating: '8/10', district: 'Humble ISD' },
      { name: 'Timbers Elementary', type: 'Elementary', rating: '9/10', district: 'Humble ISD' },
      { name: 'Creekwood Middle School', type: 'Middle', rating: '8/10', district: 'Humble ISD' }
    ],
    amenities: [
      { name: 'Lake Houston', category: 'Recreation', description: 'Boating, fishing, and water sports' },
      { name: 'Atascocita Park', category: 'Park', description: 'Community park with sports fields' },
      { name: 'Atascocita Town Center', category: 'Shopping', description: 'Shopping and dining hub' },
      { name: 'Memorial Hermann Northeast', category: 'Healthcare', description: 'Full-service hospital' }
    ],
    highlights: [
      'Lake Houston waterfront access',
      'Top-rated Humble ISD schools',
      'Master-planned community amenities',
      'Easy access to IAH Airport',
      'Growing retail and dining options'
    ],
    demographics: {
      population: '65,000+',
      medianAge: '35',
      medianIncome: '$85,000'
    },
    communityFeatures: [
      'Multiple community pools',
      'Extensive trail systems',
      'Golf courses nearby',
      'Active HOA and community events'
    ],
    whyLiveHere: [
      'Excellent schools with strong academic programs',
      'Family-oriented community with safe neighborhoods',
      'Abundant outdoor recreation at Lake Houston',
      'Convenient location between Houston and Kingwood',
      'Strong property values and appreciation'
    ]
  },
  {
    id: 'humble',
    name: 'Humble',
    slug: 'humble',
    zipCodes: ['77338', '77369'],
    tagline: 'Historic Charm Meets Modern Convenience',
    description: 'Humble combines small-town charm with big-city amenities. Located near IAH Airport and major employment centers, Humble offers diverse housing options, excellent schools, and a vibrant downtown area.',
    marketStats: {
      medianPrice: '$325,000',
      daysOnMarket: 32,
      inventoryLevel: 'Seller\'s Market',
      pricePerSqFt: '$135',
      yearOverYearChange: '+9.2%',
      activeListings: 186
    },
    schools: [
      { name: 'Humble High School', type: 'High', rating: '7/10', district: 'Humble ISD' },
      { name: 'Lakeland Elementary', type: 'Elementary', rating: '8/10', district: 'Humble ISD' },
      { name: 'Ross Sterling Middle School', type: 'Middle', rating: '7/10', district: 'Humble ISD' }
    ],
    amenities: [
      { name: 'Old Town Humble', category: 'Shopping', description: 'Historic downtown with shops and restaurants' },
      { name: 'Humble Civic Center', category: 'Entertainment', description: 'Community events and activities' },
      { name: 'Deerbrook Mall', category: 'Shopping', description: 'Major shopping destination' },
      { name: 'Jesse H. Jones Park', category: 'Park', description: 'Nature trails and historical exhibits' }
    ],
    highlights: [
      'Historic downtown district',
      'Close proximity to IAH Airport',
      'Diverse housing options',
      'Growing job market',
      'Affordable family living'
    ],
    demographics: {
      population: '16,000+',
      medianAge: '33',
      medianIncome: '$72,000'
    },
    communityFeatures: [
      'Annual Humble Rodeo',
      'Historic preservation district',
      'Community farmers market',
      'Youth sports programs'
    ],
    whyLiveHere: [
      'Affordable housing with strong appreciation potential',
      'Rich history and community pride',
      'Excellent location for airport workers',
      'Growing retail and restaurant scene',
      'Small-town feel with city amenities'
    ]
  },
  {
    id: 'kingwood',
    name: 'Kingwood',
    slug: 'kingwood',
    zipCodes: ['77339'],
    tagline: 'The Livable Forest - Premier Master-Planned Community',
    description: 'Known as "The Livable Forest," Kingwood is one of Houston\'s most prestigious master-planned communities. With lush greenery, top-rated schools, and exceptional amenities, Kingwood offers an unparalleled quality of life.',
    marketStats: {
      medianPrice: '$425,000',
      daysOnMarket: 28,
      inventoryLevel: 'Competitive',
      pricePerSqFt: '$165',
      yearOverYearChange: '+7.8%',
      activeListings: 98
    },
    schools: [
      { name: 'Kingwood High School', type: 'High', rating: '9/10', district: 'Humble ISD' },
      { name: 'Creekwood Middle School', type: 'Middle', rating: '9/10', district: 'Humble ISD' },
      { name: 'Elm Grove Elementary', type: 'Elementary', rating: '10/10', district: 'Humble ISD' },
      { name: 'The Woodlands Christian Academy', type: 'Private', district: 'Private' }
    ],
    amenities: [
      { name: 'Kingwood Country Club', category: 'Recreation', description: 'Golf and country club' },
      { name: 'Town Center Park', category: 'Park', description: 'Central community gathering space' },
      { name: 'Kingwood Medical Center', category: 'Healthcare', description: 'Full-service hospital' },
      { name: 'Kingwood Town Center', category: 'Shopping', description: 'Upscale shopping and dining' }
    ],
    highlights: [
      'Nationally recognized master-planned community',
      'Highest-rated schools in Humble ISD',
      'Extensive greenbelt and trail system',
      'Country club lifestyle',
      'Strong property values'
    ],
    demographics: {
      population: '75,000+',
      medianAge: '38',
      medianIncome: '$105,000'
    },
    communityFeatures: [
      'Over 70 miles of hike and bike trails',
      'Multiple golf courses',
      'Community pools and parks',
      'Active civic clubs and organizations'
    ],
    whyLiveHere: [
      'Premier schools with exceptional ratings',
      'Beautiful tree-lined streets and natural setting',
      'Strong sense of community and safety',
      'Excellent resale value and appreciation',
      'Resort-style amenities and lifestyle'
    ]
  },
  {
    id: 'summerwood',
    name: 'Summerwood',
    slug: 'summerwood',
    zipCodes: ['77044'],
    tagline: 'Affordable Family Living Near Lake Houston',
    description: 'Summerwood is a thriving master-planned community offering affordable homes, excellent schools, and abundant amenities. Located near Lake Houston, it provides easy access to outdoor recreation and major employment centers.',
    marketStats: {
      medianPrice: '$295,000',
      daysOnMarket: 30,
      inventoryLevel: 'Balanced',
      pricePerSqFt: '$125',
      yearOverYearChange: '+10.5%',
      activeListings: 124
    },
    schools: [
      { name: 'Summerwood Elementary', type: 'Elementary', rating: '8/10', district: 'Humble ISD' },
      { name: 'River Pines Elementary', type: 'Elementary', rating: '8/10', district: 'Humble ISD' },
      { name: 'Summer Creek High School', type: 'High', rating: '8/10', district: 'Humble ISD' }
    ],
    amenities: [
      { name: 'Lake Houston Wilderness Park', category: 'Park', description: 'Hiking, biking, and nature trails' },
      { name: 'Summerwood Town Center', category: 'Shopping', description: 'Retail and dining options' },
      { name: 'Generation Park', category: 'Recreation', description: 'Mixed-use development nearby' },
      { name: 'Community Pools', category: 'Recreation', description: 'Multiple neighborhood pools' }
    ],
    highlights: [
      'Affordable master-planned living',
      'Lake Houston recreation access',
      'New and growing community',
      'Strong school performance',
      'Family-friendly amenities'
    ],
    demographics: {
      population: '35,000+',
      medianAge: '32',
      medianIncome: '$78,000'
    },
    communityFeatures: [
      'Community splash pads and pools',
      'Extensive parks and playgrounds',
      'Youth sports leagues',
      'HOA-maintained common areas'
    ],
    whyLiveHere: [
      'Best value for new construction homes',
      'Rapidly appreciating property values',
      'Young, growing community with families',
      'Close to Lake Houston outdoor activities',
      'Easy commute to IAH and Generation Park jobs'
    ]
  },
  {
    id: 'fall-creek',
    name: 'Fall Creek',
    slug: 'fall-creek',
    zipCodes: ['77044'],
    tagline: 'Lakeside Living with Resort-Style Amenities',
    description: 'Fall Creek is a premier lakeside community featuring resort-style amenities and beautiful homes. With direct access to Lake Houston and top-notch facilities, it offers an exceptional lifestyle for families and retirees alike.',
    marketStats: {
      medianPrice: '$415,000',
      daysOnMarket: 26,
      inventoryLevel: 'Low Inventory',
      pricePerSqFt: '$155',
      yearOverYearChange: '+9.8%',
      activeListings: 45
    },
    schools: [
      { name: 'Fall Creek Elementary', type: 'Elementary', rating: '9/10', district: 'Humble ISD' },
      { name: 'Riverwood Middle School', type: 'Middle', rating: '8/10', district: 'Humble ISD' },
      { name: 'Summer Creek High School', type: 'High', rating: '8/10', district: 'Humble ISD' }
    ],
    amenities: [
      { name: 'Fall Creek Amenity Center', category: 'Recreation', description: 'Resort-style pool, fitness center, and clubhouse' },
      { name: 'Lake Houston Marina', category: 'Recreation', description: 'Boat launch and marina access' },
      { name: 'Hike and Bike Trails', category: 'Park', description: 'Miles of scenic trails' },
      { name: 'Tennis and Sports Courts', category: 'Recreation', description: 'Community sports facilities' }
    ],
    highlights: [
      'Direct Lake Houston access',
      'Resort-style amenity center',
      'Gated community sections',
      'Premium home designs',
      'Strong HOA and community standards'
    ],
    demographics: {
      population: '12,000+',
      medianAge: '40',
      medianIncome: '$115,000'
    },
    communityFeatures: [
      'Private boat ramps and marina',
      'Olympic-size swimming pool',
      'State-of-the-art fitness center',
      'Community events and social clubs'
    ],
    whyLiveHere: [
      'Exclusive lakeside lifestyle',
      'Resort-quality amenities included in HOA',
      'Beautiful custom and semi-custom homes',
      'Safe, gated community options',
      'Excellent schools and family environment'
    ]
  },
  {
    id: 'eado',
    name: 'EaDo (East Downtown Houston)',
    slug: 'eado',
    zipCodes: ['77003'],
    tagline: 'Urban Living in Houston\'s Hottest Neighborhood',
    description: 'EaDo (East Downtown) is Houston\'s trendiest urban neighborhood, featuring modern lofts, townhomes, and condos. With walkable streets, vibrant nightlife, and proximity to downtown, it\'s perfect for young professionals and urban enthusiasts.',
    marketStats: {
      medianPrice: '$485,000',
      daysOnMarket: 22,
      inventoryLevel: 'Very Competitive',
      pricePerSqFt: '$285',
      yearOverYearChange: '+12.5%',
      activeListings: 38
    },
    schools: [
      { name: 'KIPP East End Primary', type: 'Elementary', district: 'KIPP Charter' },
      { name: 'YES Prep East End', type: 'High', district: 'YES Prep Charter' },
      { name: 'Rusk Elementary', type: 'Elementary', district: 'HISD' }
    ],
    amenities: [
      { name: 'Minute Maid Park', category: 'Entertainment', description: 'Home of the Houston Astros' },
      { name: 'BBVA Stadium', category: 'Entertainment', description: 'Houston Dynamo soccer stadium' },
      { name: 'Truck Yard', category: 'Dining', description: 'Popular outdoor bar and food truck park' },
      { name: 'Navigation Esplanade', category: 'Park', description: 'Waterfront park along Buffalo Bayou' }
    ],
    highlights: [
      'Walkable urban lifestyle',
      'Thriving restaurant and bar scene',
      'Minutes from downtown Houston',
      'Modern lofts and townhomes',
      'Rapidly developing neighborhood'
    ],
    demographics: {
      population: '8,000+',
      medianAge: '29',
      medianIncome: '$95,000'
    },
    communityFeatures: [
      'Weekly farmers markets',
      'Art galleries and studios',
      'Live music venues',
      'Craft breweries and coffee shops'
    ],
    whyLiveHere: [
      'Ultimate urban convenience and walkability',
      'Vibrant nightlife and entertainment',
      'Strong investment and appreciation potential',
      'Diverse dining and cultural experiences',
      'Perfect for young professionals and empty nesters'
    ]
  }
];

export const getNeighborhoodBySlug = (slug: string): Neighborhood | undefined => {
  return neighborhoods.find(n => n.slug === slug);
};

export const getNeighborhoodByZip = (zip: string): Neighborhood | undefined => {
  return neighborhoods.find(n => n.zipCodes.includes(zip));
};

