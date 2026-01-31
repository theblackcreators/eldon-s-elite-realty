export interface Testimonial {
  id: string;
  name: string;
  neighborhood: string;
  zipCode: string;
  rating: number;
  text: string;
  date: string;
  propertyType: 'Buyer' | 'Seller' | 'Both';
  type: 'buyer' | 'seller' | 'both';
  location?: string;
  source: 'Zillow' | 'Google' | 'Realtor.com';
  verified?: boolean;
  categories?: {
    localKnowledge?: number;
    processExpertise?: number;
    responsiveness?: number;
    negotiationSkills?: number;
    marketExpertise?: number;
    professionalismCommunication?: number;
  };
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Verified Buyer',
    neighborhood: 'Beaumont',
    zipCode: '77701',
    rating: 5,
    text: 'Mr. Eldon Peterson help us find our first home, we thought it will be difficult and stressful but he made it easy and fast as possible. He listened all our needs in a house and found a perfect match.',
    date: '2019-01-01',
    propertyType: 'Buyer',
    type: 'buyer',
    location: 'Beaumont, TX',
    source: 'Zillow',
    categories: {
      localKnowledge: 5,
      processExpertise: 5,
      responsiveness: 5,
      negotiationSkills: 5
    }
  },
  {
    id: '2',
    name: 'Verified Seller',
    neighborhood: 'Stafford',
    zipCode: '77477',
    rating: 5,
    text: 'Eldon Peterson not only helped me sell my house but also assisted in finding my new home for relocation. He is an awesome Realtor, very professional and answered all my questions and concerns.',
    date: '2017-01-01',
    propertyType: 'Both',
    type: 'both',
    location: 'Stafford, TX',
    source: 'Zillow',
    categories: {
      localKnowledge: 5,
      processExpertise: 5,
      responsiveness: 5,
      negotiationSkills: 5
    }
  },
  {
    id: '3',
    name: 'Sharon Billwilliams (Rev. Tommie and Sharon Williams Sr.)',
    neighborhood: 'Northeast Houston',
    zipCode: '77044',
    rating: 5,
    text: 'Special thank you to Mr. Eldon Peterson. An Excellent Realtor. ⭐️⭐️⭐️⭐️⭐️5 stars!!!! I was very nervous and hesitant when it came to choosing a Realtor because I don\'t easily trust people. After all, buying a home is the biggest purchase I will ever make in my life. First impressions are everything and with Eldon, from our first meeting I was at ease. He was professional, friendly and patient with us. He gave us an introduction of what to expect from beginning to the end. I loved how he used a visual aid (large computer screen), which gave us a better understanding of certain terms and the process of buying a home. He was very detailed, answered every question, keeping us up to date every step of the way. He was always available, phone, text, call, email and/or in person. One of the things that sticks out for me with Eldon, he knows how to negotiate and what to ask for when purchasing a home. With Eldon, I never doubted that my husband and I would find the home of our dreams. He worked hard and represented us. I am so appreciative of all his efforts. In closing, if you need a Realtor who is personal, very knowledgeable, has integrity, available for you and gets the job done, please call Eldon. I highly recommend him. I thank God for Eldon and wish him much success in helping others dream become a reality, becoming homeowners. ~Rev. Tommie and Sharon Williams Sr.',
    date: '2022-01-01',
    propertyType: 'Buyer',
    type: 'buyer',
    location: 'Northeast Houston, TX',
    source: 'Google'
  },
  {
    id: '4',
    name: 'Clint Troutman',
    neighborhood: 'Houston',
    zipCode: '77001',
    rating: 5,
    text: 'Went above & beyond to show me a property being rented out while also being sold, DIDN\'T have to explain the situation or help me, BUT he DID!',
    date: '2023-01-01',
    propertyType: 'Buyer',
    type: 'buyer',
    location: 'Houston, TX',
    source: 'Google'
  },
  {
    id: '5',
    name: 'Verified Seller',
    neighborhood: 'Beaumont',
    zipCode: '77701',
    rating: 5,
    text: 'Mr. Eldon Peterson help us find our first home, we thought it will be difficult and stressful but he made it easy and fast as possible. He listened all our needs in a house and found a perfect match.',
    date: '2023-02-13',
    propertyType: 'Seller',
    type: 'seller',
    location: 'Beaumont, TX',
    source: 'Realtor.com',
    verified: true,
    categories: {
      responsiveness: 5,
      marketExpertise: 5,
      negotiationSkills: 5,
      professionalismCommunication: 5
    }
  }
];

export interface RecentSale {
  id: string;
  address: string;
  neighborhood: string;
  zipCode: string;
  soldPrice: string;
  listPrice: string;
  daysOnMarket: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  soldDate: string;
  imageUrl?: string;
}

import residentialProperty from '@/assets/residential-property.jpg';

export const recentSales: RecentSale[] = [
  {
    id: '1',
    address: '18423 Timber Forest Dr',
    neighborhood: 'Atascocita',
    zipCode: '77346',
    soldPrice: '$425,000',
    listPrice: '$419,900',
    daysOnMarket: 8,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2850,
    soldDate: '2026-01-15',
    imageUrl: residentialProperty
  },
  {
    id: '2',
    address: '4210 Appalachian Trail',
    neighborhood: 'Kingwood',
    zipCode: '77339',
    soldPrice: '$565,000',
    listPrice: '$549,000',
    daysOnMarket: 12,
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 3420,
    soldDate: '2026-01-10',
    imageUrl: residentialProperty
  },
  {
    id: '3',
    address: '7834 Humble Westfield Rd',
    neighborhood: 'Humble',
    zipCode: '77338',
    soldPrice: '$298,000',
    listPrice: '$295,000',
    daysOnMarket: 15,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1850,
    soldDate: '2025-12-28',
    imageUrl: residentialProperty
  },
  {
    id: '4',
    address: '14502 Summerwood Lakes Dr',
    neighborhood: 'Summerwood',
    zipCode: '77044',
    soldPrice: '$335,000',
    listPrice: '$329,900',
    daysOnMarket: 10,
    bedrooms: 4,
    bathrooms: 2.5,
    squareFeet: 2450,
    soldDate: '2025-12-20',
    imageUrl: residentialProperty
  },
  {
    id: '5',
    address: '13910 Lake Livingston Dr',
    neighborhood: 'Fall Creek',
    zipCode: '77044',
    soldPrice: '$485,000',
    listPrice: '$475,000',
    daysOnMarket: 6,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 3100,
    soldDate: '2025-12-15',
    imageUrl: residentialProperty
  },
  {
    id: '6',
    address: '2314 Rusk St #401',
    neighborhood: 'EaDo',
    zipCode: '77003',
    soldPrice: '$525,000',
    listPrice: '$515,000',
    daysOnMarket: 5,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1650,
    soldDate: '2025-12-08',
    imageUrl: residentialProperty
  }
];
