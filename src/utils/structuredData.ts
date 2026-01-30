import { SITE_CONFIG } from '@/config/seoConfig';

// Generate FAQPage structured data
export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

// Generate Review/AggregateRating structured data for testimonials
export const getAggregateRatingSchema = (
  ratingValue: number,
  reviewCount: number,
  bestRating: number = 5
) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_CONFIG.siteUrl}/#organization`,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: ratingValue.toString(),
    reviewCount: reviewCount.toString(),
    bestRating: bestRating.toString(),
    worstRating: '1'
  }
});

// Generate individual Review structured data
export const getReviewSchema = (reviews: {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}[]) => reviews.map(review => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'RealEstateAgent',
    name: SITE_CONFIG.author,
    '@id': `${SITE_CONFIG.siteUrl}/#person`
  },
  author: {
    '@type': 'Person',
    name: review.author
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: review.rating.toString(),
    bestRating: '5',
    worstRating: '1'
  },
  reviewBody: review.reviewBody,
  datePublished: review.datePublished
}));

// Generate Service structured data for real estate services
export const getServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Real Estate Services',
  provider: {
    '@id': `${SITE_CONFIG.siteUrl}/#organization`
  },
  areaServed: SITE_CONFIG.business.areaServed.map(area => ({
    '@type': 'City',
    name: area
  })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Real Estate Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Buyer Representation',
          description: 'Expert buyer agent services for home purchases in Northeast Houston'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Seller Representation',
          description: 'Professional listing services to sell your home for top dollar'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'New Construction Representation',
          description: 'Expert guidance for new construction home purchases'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Investment Property Consulting',
          description: 'Real estate investment advice and property analysis'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Home Valuation',
          description: 'Free comparative market analysis and home value estimates'
        }
      }
    ]
  }
});

// Generate Place structured data for neighborhoods
export const getNeighborhoodSchema = (neighborhood: {
  name: string;
  slug: string;
  description: string;
  zipCodes: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Place',
  name: neighborhood.name,
  description: neighborhood.description,
  url: `${SITE_CONFIG.siteUrl}/neighborhoods/${neighborhood.slug}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: neighborhood.name,
    addressRegion: 'TX',
    postalCode: neighborhood.zipCodes.join(', '),
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoShape',
    postalCode: neighborhood.zipCodes.join(', ')
  }
});

// Generate WebSite structured data with search action
export const getWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_CONFIG.siteUrl}/#website`,
  url: SITE_CONFIG.siteUrl,
  name: SITE_CONFIG.siteName,
  description: SITE_CONFIG.defaultDescription,
  publisher: {
    '@id': `${SITE_CONFIG.siteUrl}/#organization`
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_CONFIG.siteUrl}/properties?search={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
});

// Generate ItemList structured data for property listings
export const getPropertyListSchema = (properties: {
  name: string;
  url: string;
  image?: string;
  price?: string;
}[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: properties.map((property, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Product',
      name: property.name,
      url: property.url,
      image: property.image,
      offers: property.price ? {
        '@type': 'Offer',
        price: property.price,
        priceCurrency: 'USD'
      } : undefined
    }
  }))
});

