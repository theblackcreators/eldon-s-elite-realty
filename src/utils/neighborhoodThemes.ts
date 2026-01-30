/**
 * Neighborhood Theme Utilities
 * 
 * Provides hyperlocal branding and visual identity for each Northeast Houston neighborhood
 */

export interface NeighborhoodTheme {
  slug: string;
  name: string;
  themeClass: string;
  primaryColor: string;
  description: string;
  visualIdentity: {
    icon: string; // Emoji or icon identifier
    pattern: string; // Visual pattern description
    inspiration: string; // What inspired the color/theme
  };
}

export const neighborhoodThemes: Record<string, NeighborhoodTheme> = {
  'the-woodlands': {
    slug: 'the-woodlands',
    name: 'The Woodlands',
    themeClass: 'theme-woodlands',
    primaryColor: 'hsl(142 45% 35%)', // Forest Green
    description: 'Lush forest canopy and master-planned excellence',
    visualIdentity: {
      icon: '🌲',
      pattern: 'Forest canopy with dappled sunlight',
      inspiration: 'The 28,000 acres of preserved forest and green spaces that define The Woodlands'
    }
  },
  'atascocita': {
    slug: 'atascocita',
    name: 'Atascocita',
    themeClass: 'theme-atascocita',
    primaryColor: 'hsl(200 65% 45%)', // Lake Blue
    description: 'Lakeside living and waterfront community',
    visualIdentity: {
      icon: '🏞️',
      pattern: 'Rippling water and lakeside reflections',
      inspiration: 'Lake Houston and the abundant waterfront properties'
    }
  },
  'humble': {
    slug: 'humble',
    name: 'Humble',
    themeClass: 'theme-humble',
    primaryColor: 'hsl(25 55% 50%)', // Warm Terracotta
    description: 'Historic charm meets modern growth',
    visualIdentity: {
      icon: '🏛️',
      pattern: 'Brick and terracotta architectural elements',
      inspiration: 'Historic downtown Humble and the warm, welcoming community spirit'
    }
  },
  'kingwood': {
    slug: 'kingwood',
    name: 'Kingwood',
    themeClass: 'theme-kingwood',
    primaryColor: 'hsl(160 50% 40%)', // Pine Green
    description: 'Livable forest community with natural beauty',
    visualIdentity: {
      icon: '🌳',
      pattern: 'Pine trees and nature trails',
      inspiration: 'The "Livable Forest" designation and extensive trail system'
    }
  },
  'summerwood': {
    slug: 'summerwood',
    name: 'Summerwood',
    themeClass: 'theme-summerwood',
    primaryColor: 'hsl(45 75% 55%)', // Sunny Gold
    description: 'Family-friendly neighborhoods with sunny disposition',
    visualIdentity: {
      icon: '☀️',
      pattern: 'Bright sunshine and open spaces',
      inspiration: 'The warm, family-oriented community and abundant parks'
    }
  },
  'fall-creek': {
    slug: 'fall-creek',
    name: 'Fall Creek',
    themeClass: 'theme-fallcreek',
    primaryColor: 'hsl(195 60% 50%)', // Creek Blue
    description: 'Serene creekside living and natural landscapes',
    visualIdentity: {
      icon: '🌊',
      pattern: 'Flowing creek water and natural landscapes',
      inspiration: 'The creeks and natural water features throughout the community'
    }
  },
  'eado': {
    slug: 'eado',
    name: 'EaDo',
    themeClass: 'theme-eado',
    primaryColor: 'hsl(280 50% 45%)', // Urban Purple
    description: 'Urban energy and downtown Houston living',
    visualIdentity: {
      icon: '🏙️',
      pattern: 'Urban skyline and vibrant street art',
      inspiration: 'The vibrant arts scene and urban renaissance of East Downtown'
    }
  }
};

/**
 * Get theme class for a neighborhood slug
 */
export const getNeighborhoodThemeClass = (slug: string): string => {
  return neighborhoodThemes[slug]?.themeClass || '';
};

/**
 * Get theme color for a neighborhood slug
 */
export const getNeighborhoodColor = (slug: string): string => {
  return neighborhoodThemes[slug]?.primaryColor || 'hsl(38 70% 50%)'; // Default to gold accent
};

/**
 * Get visual identity for a neighborhood
 */
export const getNeighborhoodVisualIdentity = (slug: string) => {
  return neighborhoodThemes[slug]?.visualIdentity || null;
};

/**
 * Get all neighborhood themes
 */
export const getAllNeighborhoodThemes = (): NeighborhoodTheme[] => {
  return Object.values(neighborhoodThemes);
};

