/**
 * SEO Configuration
 * Centralized SEO settings for meta tags, structured data, and optimization
 */

export const SITE_CONFIG = {
  siteName: 'Eldon Peterson Real Estate',
  siteUrl: 'https://eldonpetersonrealestatebroker.netlify.app',
  defaultTitle: 'Eldon Peterson | Real Estate Broker, REALTOR® | Northeast Houston, TX',
  defaultDescription: 'Eldon Peterson is a seasoned Real Estate Broker and REALTOR® serving Northeast Houston. Specializing in The Woodlands, Atascocita, Humble, Kingwood, Summerwood, Fall Creek, and EaDo properties with 10+ years experience, 300+ homes sold, and over 500+ sides closed.',
  author: 'Eldon Peterson',
  trecNumber: '675220',
  phone: '(409) 223-7288',
  email: 'eldon@connectrealty.com',
  
  // Business Information
  business: {
    name: 'Eldon Peterson - Connect Realty TREC# 573369',
    legalName: 'Connect Realty TREC# 573369',
    address: {
      street: '2170 Buckthorne Pl Suite #200',
      city: 'The Woodlands',
      state: 'TX',
      zip: '77380',
      country: 'US'
    },
    coordinates: {
      latitude: '30.1588',
      longitude: '-95.4613'
    },
    priceRange: '$$',
    areaServed: [
      'The Woodlands, TX',
      'Atascocita, TX',
      'Humble, TX',
      'Kingwood, TX',
      'Summerwood, TX',
      'Fall Creek, TX',
      'EaDo, Houston, TX',
      'Northeast Houston, TX'
    ],
    serviceAreaZips: [
      '77380', '77381', '77382', '77384', '77385', '77386', '77389', // The Woodlands
      '77346', // Atascocita
      '77338', '77369', // Humble
      '77339', // Kingwood
      '77044', // Summerwood & Fall Creek
      '77003'  // EaDo
    ]
  },
  
  // Social Media
  social: {
    twitter: '@EldonPeterson',
    facebook: 'https://facebook.com/eldonpetersonrealtor',
    linkedin: 'https://linkedin.com/in/eldonpeterson',
    instagram: '@eldonpetersonrealtor'
  },
  
  // Keywords
  keywords: {
    primary: [
      'Northeast Houston real estate',
      'Houston realtor',
      'The Woodlands homes for sale',
      'Atascocita real estate agent',
      'Humble TX realtor',
      'Kingwood homes',
      'real estate broker Houston'
    ],
    secondary: [
      'luxury homes Houston',
      'new construction Houston',
      'home buyer agent',
      'listing agent Houston',
      'property search Houston',
      'real estate tools'
    ]
  }
};

// Page-specific SEO metadata
export const PAGE_SEO = {
  home: {
    title: 'Eldon Peterson | Real Estate Broker & REALTOR® | Northeast Houston, TX',
    description: 'Expert real estate services in Northeast Houston. Specializing in The Woodlands, Atascocita, Humble, Kingwood, Summerwood, Fall Creek & EaDo. 10+ years experience, 300+ homes sold, over 500+ sides closed. TREC# 675220.',
    keywords: 'Northeast Houston real estate, Houston realtor, The Woodlands homes, Atascocita real estate, Humble TX homes, Kingwood realtor, real estate broker Houston',
    path: '/'
  },
  resources: {
    title: 'Real Estate Resources & Guides | Eldon Peterson | Northeast Houston',
    description: 'Free real estate resources, buyer/seller guides, market reports, and neighborhood insights for Northeast Houston. Expert advice from experienced REALTOR® Eldon Peterson.',
    keywords: 'real estate resources, buyer guide, seller guide, market reports, Houston real estate tips, home buying checklist',
    path: '/resources'
  },
  properties: {
    title: 'Property Search | Homes for Sale | Northeast Houston | Eldon Peterson',
    description: 'Search homes for sale in Northeast Houston including The Woodlands, Atascocita, Humble, Kingwood, Summerwood, Fall Creek & EaDo. MLS listings updated daily.',
    keywords: 'homes for sale Houston, MLS search, property search, Northeast Houston listings, The Woodlands homes',
    path: '/properties'
  },
  newConstruction: {
    title: 'New Construction Homes | Northeast Houston | Eldon Peterson REALTOR®',
    description: 'Explore new construction homes in Northeast Houston. Expert representation for new home buyers in The Woodlands, Atascocita, Humble, Kingwood & surrounding areas.',
    keywords: 'new construction Houston, new homes, home builders Houston, new construction The Woodlands, new homes Atascocita',
    path: '/new-construction'
  },
  tools: {
    title: 'Real Estate Tools & Calculators | Eldon Peterson | Northeast Houston',
    description: 'Free real estate calculators and tools: affordability calculator, home value estimator, net proceeds calculator, repair cost estimator, and offer strength tool.',
    keywords: 'mortgage calculator, home value estimator, affordability calculator, real estate tools, home buying calculator',
    path: '/tools'
  },
  buyers: {
    title: 'Home Buyers Guide - Northeast Houston Real Estate | Eldon Peterson',
    description: 'Complete guide to buying a home in Northeast Houston. Expert advice on financing, home search, offers, inspections, and closing. Mortgage calculators and buyer resources.',
    keywords: 'buy home Houston, first time home buyer, home buying process, mortgage pre-approval, Northeast Houston homes, The Woodlands real estate, buyer agent',
    path: '/buyers'
  },
  sellers: {
    title: 'Sell Your Home in Northeast Houston | Expert Listing Agent | Eldon Peterson',
    description: 'Sell your Northeast Houston home for top dollar. Expert pricing, professional marketing, and proven negotiation strategies. Free home valuation and net proceeds calculator.',
    keywords: 'sell home Houston, list house Northeast Houston, home valuation, real estate agent, The Woodlands listing agent, sell house fast, home marketing',
    path: '/sellers'
  },
  recruiting: {
    title: 'Join Our Team - Real Estate Careers | Connect Realty',
    description: 'Join Northeast Houston\'s elite real estate team. Competitive commission splits, cutting-edge technology, comprehensive training, and ongoing support. Apply today!',
    keywords: 'real estate agent jobs, realtor careers Houston, real estate brokerage, agent recruiting, Northeast Houston real estate jobs, Connect Realty careers',
    path: '/join-our-team'
  }
};

// Neighborhood-specific SEO
export const NEIGHBORHOOD_SEO = {
  'the-woodlands': {
    title: 'The Woodlands Real Estate | Homes for Sale | Eldon Peterson REALTOR®',
    description: 'The Woodlands TX real estate expert. Search homes for sale in 77380, 77381, 77382, 77384, 77385, 77386, 77389. Premier master-planned community with luxury homes, top schools, and world-class amenities.',
    keywords: 'The Woodlands real estate, The Woodlands homes for sale, The Woodlands realtor, The Woodlands TX homes, luxury homes The Woodlands'
  },
  'atascocita': {
    title: 'Atascocita Real Estate | Homes for Sale 77346 | Eldon Peterson REALTOR®',
    description: 'Atascocita TX real estate expert. Search homes for sale in 77346. Family-friendly community with Lake Houston access, top-rated Humble ISD schools, and master-planned amenities.',
    keywords: 'Atascocita real estate, Atascocita homes for sale, Atascocita realtor, 77346 homes, Lake Houston homes'
  },
  'humble': {
    title: 'Humble Real Estate | Homes for Sale 77338, 77369 | Eldon Peterson REALTOR®',
    description: 'Humble TX real estate expert. Search homes for sale in 77338 and 77369. Historic charm meets modern convenience with excellent schools and easy access to Houston.',
    keywords: 'Humble real estate, Humble TX homes for sale, Humble realtor, 77338 homes, 77369 homes'
  },
  'kingwood': {
    title: 'Kingwood Real Estate | Homes for Sale 77339 | Eldon Peterson REALTOR®',
    description: 'Kingwood TX real estate expert. Search homes for sale in 77339. "Livable Forest" community with extensive trails, top schools, and family-friendly neighborhoods.',
    keywords: 'Kingwood real estate, Kingwood homes for sale, Kingwood realtor, 77339 homes, Kingwood TX'
  },
  'summerwood': {
    title: 'Summerwood Real Estate | Homes for Sale 77044 | Eldon Peterson REALTOR®',
    description: 'Summerwood TX real estate expert. Search homes for sale in 77044. Master-planned community with resort-style amenities, parks, and excellent schools.',
    keywords: 'Summerwood real estate, Summerwood homes for sale, Summerwood realtor, 77044 homes'
  },
  'fall-creek': {
    title: 'Fall Creek Real Estate | Homes for Sale 77044 | Eldon Peterson REALTOR®',
    description: 'Fall Creek TX real estate expert. Search homes for sale in 77044. Peaceful community with parks, trails, and family-friendly atmosphere.',
    keywords: 'Fall Creek real estate, Fall Creek homes for sale, Fall Creek realtor, 77044 homes'
  },
  'eado': {
    title: 'EaDo Real Estate | Homes for Sale 77003 | Eldon Peterson REALTOR®',
    description: 'EaDo Houston real estate expert. Search homes for sale in 77003. Urban living with trendy restaurants, breweries, and proximity to downtown Houston.',
    keywords: 'EaDo real estate, EaDo homes for sale, EaDo Houston, 77003 homes, East Downtown Houston'
  }
};

