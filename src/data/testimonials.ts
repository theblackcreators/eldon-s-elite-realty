export interface Testimonial {
  id: string;
  name: string;
  neighborhood: string;
  zipCode: string;
  rating: number;
  text: string;
  date: string;
  propertyType: 'Buyer' | 'Seller' | 'Both';
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah & Michael Johnson',
    neighborhood: 'Atascocita',
    zipCode: '77346',
    rating: 5,
    text: 'Eldon helped us find our dream home in Atascocita! His knowledge of the area and the local schools was invaluable. He was patient, professional, and always available to answer our questions.',
    date: '2025-12-15',
    propertyType: 'Buyer'
  },
  {
    id: '2',
    name: 'Robert Chen',
    neighborhood: 'Kingwood',
    zipCode: '77339',
    rating: 5,
    text: 'We sold our Kingwood home in just 12 days thanks to Eldon\'s expert marketing strategy. He priced it perfectly and brought multiple offers. Highly recommend!',
    date: '2025-11-20',
    propertyType: 'Seller'
  },
  {
    id: '3',
    name: 'Jennifer Martinez',
    neighborhood: 'Humble',
    zipCode: '77338',
    rating: 5,
    text: 'As a first-time homebuyer, I was nervous about the process. Eldon walked me through every step and helped me find an amazing home in Humble within my budget. Couldn\'t be happier!',
    date: '2025-10-08',
    propertyType: 'Buyer'
  },
  {
    id: '4',
    name: 'David & Lisa Thompson',
    neighborhood: 'Summerwood',
    zipCode: '77044',
    rating: 5,
    text: 'Eldon helped us both sell our old home and buy a new one in Summerwood. His coordination and expertise made what could have been stressful completely seamless.',
    date: '2025-09-25',
    propertyType: 'Both'
  },
  {
    id: '5',
    name: 'Amanda Rodriguez',
    neighborhood: 'Fall Creek',
    zipCode: '77044',
    rating: 5,
    text: 'We wanted a lakeside property and Eldon knew exactly where to look. He found us the perfect home in Fall Creek with amazing amenities. His local knowledge is unmatched!',
    date: '2025-08-12',
    propertyType: 'Buyer'
  },
  {
    id: '6',
    name: 'Marcus Williams',
    neighborhood: 'EaDo',
    zipCode: '77003',
    rating: 5,
    text: 'Eldon helped me invest in an EaDo loft. His understanding of the urban market and appreciation potential was spot-on. Great investment thanks to his guidance!',
    date: '2025-07-30',
    propertyType: 'Buyer'
  },
  {
    id: '7',
    name: 'Patricia & James Anderson',
    neighborhood: 'Kingwood',
    zipCode: '77339',
    rating: 5,
    text: 'After 20 years in our Kingwood home, we decided to downsize. Eldon handled everything professionally and got us top dollar. He truly cares about his clients.',
    date: '2025-06-18',
    propertyType: 'Seller'
  },
  {
    id: '8',
    name: 'Kevin Nguyen',
    neighborhood: 'Atascocita',
    zipCode: '77346',
    rating: 5,
    text: 'Eldon\'s expertise in the Atascocita market is incredible. He knew the neighborhoods, the schools, and helped us find exactly what we were looking for. 10/10 experience!',
    date: '2025-05-22',
    propertyType: 'Buyer'
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
