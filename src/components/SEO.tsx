import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '@/config/seoConfig';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  structuredData?: object[];
}

export const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  noindex = false,
  structuredData = []
}: SEOProps) => {
  const pageTitle = title || SITE_CONFIG.defaultTitle;
  const pageDescription = description || SITE_CONFIG.defaultDescription;
  const pageUrl = canonical ? `${SITE_CONFIG.siteUrl}${canonical}` : SITE_CONFIG.siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={SITE_CONFIG.author} />
      <link rel="canonical" href={pageUrl} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_CONFIG.siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content={SITE_CONFIG.social.twitter} />
      <meta name="twitter:creator" content={SITE_CONFIG.social.twitter} />
      
      {/* Structured Data */}
      {structuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

// Helper function to generate LocalBusiness structured data
export const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': `${SITE_CONFIG.siteUrl}/#organization`,
  name: SITE_CONFIG.business.name,
  legalName: SITE_CONFIG.business.legalName,
  url: SITE_CONFIG.siteUrl,
  logo: `${SITE_CONFIG.siteUrl}/favicon.svg`,
  image: `${SITE_CONFIG.siteUrl}/assets/eldon-portrait.jpg`,
  description: SITE_CONFIG.defaultDescription,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  priceRange: SITE_CONFIG.business.priceRange,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.business.address.street,
    addressLocality: SITE_CONFIG.business.address.city,
    addressRegion: SITE_CONFIG.business.address.state,
    postalCode: SITE_CONFIG.business.address.zip,
    addressCountry: SITE_CONFIG.business.address.country
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE_CONFIG.business.coordinates.latitude,
    longitude: SITE_CONFIG.business.coordinates.longitude
  },
  areaServed: SITE_CONFIG.business.areaServed.map(area => ({
    '@type': 'City',
    name: area
  })),
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.business.coordinates.latitude,
      longitude: SITE_CONFIG.business.coordinates.longitude
    },
    geoRadius: '50000' // 50km radius
  },
  sameAs: [
    SITE_CONFIG.social.facebook,
    SITE_CONFIG.social.linkedin,
    SITE_CONFIG.social.twitter
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '16:00'
    }
  ]
});

// Helper function to generate Person (RealEstateAgent) structured data
export const getRealEstateAgentSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_CONFIG.siteUrl}/#person`,
  name: SITE_CONFIG.author,
  jobTitle: 'Real Estate Broker, REALTOR®',
  description: '10+ years of real estate experience with 300+ homes sold in Northeast Houston',
  image: `${SITE_CONFIG.siteUrl}/assets/eldon-portrait.jpg`,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  url: SITE_CONFIG.siteUrl,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.business.address.street,
    addressLocality: SITE_CONFIG.business.address.city,
    addressRegion: SITE_CONFIG.business.address.state,
    postalCode: SITE_CONFIG.business.address.zip,
    addressCountry: SITE_CONFIG.business.address.country
  },
  worksFor: {
    '@id': `${SITE_CONFIG.siteUrl}/#organization`
  },
  sameAs: [
    SITE_CONFIG.social.facebook,
    SITE_CONFIG.social.linkedin
  ]
});

// Helper function to generate BreadcrumbList structured data
export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_CONFIG.siteUrl}${item.url}`
  }))
});

// Helper function to generate FAQPage structured data
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

