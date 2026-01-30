import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { neighborhoods } from '@/data/neighborhoods';

// Contact information to be displayed on every PDF
const CONTACT_INFO = {
  name: 'Eldon Peterson',
  title: 'Real Estate Broker, REALTOR®',
  brokerage: 'Connect Realty',
  phone: '(409) 223-7288',
  office: '2170 Buckthorne Pl Suite #200, The Woodlands, TX 77380',
  trec: 'TREC# 675220'
};

// Brand colors (matching website theme)
const COLORS = {
  primary: [139, 115, 85], // Gold/brown
  secondary: [51, 51, 51], // Dark gray
  accent: [200, 170, 140], // Light gold
  text: [33, 33, 33]
};

// Add header with contact info to every page
const addHeader = (doc: jsPDF, pageNumber: number) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header background
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, pageWidth, 35, 'F');
  
  // Name and title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(CONTACT_INFO.name, 15, 15);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(CONTACT_INFO.title, 15, 22);
  doc.text(CONTACT_INFO.brokerage, 15, 28);
  
  // Contact info on right
  doc.setFontSize(9);
  doc.text(CONTACT_INFO.phone, pageWidth - 15, 15, { align: 'right' });
  doc.text(CONTACT_INFO.office, pageWidth - 15, 22, { align: 'right' });
  doc.text(CONTACT_INFO.trec, pageWidth - 15, 28, { align: 'right' });
};

// Add footer to every page
const addFooter = (doc: jsPDF, pageNumber: number, totalPages: number) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  doc.setFillColor(...COLORS.accent);
  doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
  
  doc.setTextColor(...COLORS.secondary);
  doc.setFontSize(8);
  doc.text(
    `© ${new Date().getFullYear()} ${CONTACT_INFO.name} | ${CONTACT_INFO.phone}`,
    pageWidth / 2,
    pageHeight - 7,
    { align: 'center' }
  );
  
  doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - 15, pageHeight - 7, { align: 'right' });
};

// Generate Market Report PDF
const generateMarketReport = (doc: jsPDF, neighborhoodId: string, title: string) => {
  const neighborhood = neighborhoods.find(n => n.id === neighborhoodId);
  if (!neighborhood) return;
  
  let yPos = 50;
  
  // Title
  doc.setTextColor(...COLORS.secondary);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 15, yPos);
  yPos += 10;
  
  // Subtitle
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`${neighborhood.name} - ZIP Code(s): ${neighborhood.zipCodes.join(', ')}`, 15, yPos);
  yPos += 15;
  
  // Market Statistics Table
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('Market Statistics', 15, yPos);
  yPos += 5;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Metric', 'Value']],
    body: [
      ['Median Home Price', neighborhood.marketStats.medianPrice],
      ['Average Days on Market', neighborhood.marketStats.daysOnMarket.toString()],
      ['Price per Square Foot', neighborhood.marketStats.pricePerSqFt],
      ['Year-over-Year Change', neighborhood.marketStats.yearOverYearChange],
      ['Market Inventory Level', neighborhood.marketStats.inventoryLevel],
      ['Active Listings', neighborhood.marketStats.activeListings.toString()]
    ],
    theme: 'striped',
    headStyles: { fillColor: COLORS.primary },
    margin: { left: 15, right: 15 }
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  // Neighborhood Highlights
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('Neighborhood Highlights', 15, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.text);
  
  neighborhood.highlights.forEach((highlight, index) => {
    if (yPos > 250) {
      doc.addPage();
      addHeader(doc, 2);
      yPos = 50;
    }
    doc.text(`• ${highlight}`, 20, yPos);
    yPos += 7;
  });
};

// Generate Buyer/Seller Guide PDF
const generateGuide = (doc: jsPDF, title: string, type: 'buyer' | 'seller') => {
  let yPos = 50;

  // Title
  doc.setTextColor(...COLORS.secondary);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 15, yPos);
  yPos += 15;

  const content = type === 'buyer' ? getBuyerGuideContent() : getSellerGuideContent();

  content.forEach((section) => {
    if (yPos > 250) {
      doc.addPage();
      addHeader(doc, 2);
      addFooter(doc, 2, 3);
      yPos = 50;
    }

    // Section heading
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.primary);
    doc.text(section.heading, 15, yPos);
    yPos += 8;

    // Section content
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.text);

    section.points.forEach((point) => {
      const lines = doc.splitTextToSize(`• ${point}`, 170);
      lines.forEach((line: string) => {
        if (yPos > 250) {
          doc.addPage();
          addHeader(doc, 2);
          addFooter(doc, 2, 3);
          yPos = 50;
        }
        doc.text(line, 20, yPos);
        yPos += 6;
      });
    });
    yPos += 5;
  });
};

const getBuyerGuideContent = () => [
  {
    heading: 'Getting Pre-Approved',
    points: [
      'Contact a mortgage lender to determine your budget',
      'Gather financial documents (pay stubs, tax returns, bank statements)',
      'Get pre-approval letter before house hunting',
      'Understand different loan types (FHA, VA, Conventional)'
    ]
  },
  {
    heading: 'Finding Your Home',
    points: [
      'Define your must-haves vs. nice-to-haves',
      'Research neighborhoods and school districts',
      'Consider commute times and local amenities',
      'Tour homes with your agent and take detailed notes'
    ]
  },
  {
    heading: 'Making an Offer',
    points: [
      'Review comparable sales in the area',
      'Determine your offer price and terms',
      'Include contingencies (inspection, appraisal, financing)',
      'Be prepared to negotiate with the seller'
    ]
  },
  {
    heading: 'Closing Process',
    points: [
      'Schedule home inspection within option period',
      'Review inspection report and negotiate repairs',
      'Finalize mortgage and complete appraisal',
      'Conduct final walkthrough before closing',
      'Sign closing documents and receive keys!'
    ]
  }
];

const getSellerGuideContent = () => [
  {
    heading: 'Preparing Your Home',
    points: [
      'Declutter and deep clean every room',
      'Make necessary repairs and touch-ups',
      'Consider professional staging',
      'Enhance curb appeal (landscaping, paint, lighting)',
      'Complete pre-listing inspection to identify issues'
    ]
  },
  {
    heading: 'Pricing Strategy',
    points: [
      'Review comparative market analysis (CMA)',
      'Consider current market conditions',
      'Price competitively to attract buyers',
      'Avoid overpricing which can lead to longer market time'
    ]
  },
  {
    heading: 'Marketing Your Home',
    points: [
      'Professional photography and virtual tours',
      'MLS listing with detailed description',
      'Social media and online marketing',
      'Open houses and private showings',
      'Targeted marketing to qualified buyers'
    ]
  },
  {
    heading: 'Negotiating Offers',
    points: [
      'Review all offers with your agent',
      'Consider price, terms, and buyer qualifications',
      'Negotiate repairs after inspection',
      'Stay flexible but protect your interests',
      'Work toward mutual agreement'
    ]
  }
];

// Generate Neighborhood Guide PDF
const generateNeighborhoodGuide = (doc: jsPDF, title: string, neighborhoodId?: string) => {
  let yPos = 50;

  doc.setTextColor(...COLORS.secondary);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 15, yPos);
  yPos += 15;

  if (neighborhoodId) {
    const neighborhood = neighborhoods.find(n => n.id === neighborhoodId);
    if (neighborhood) {
      // Description
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...COLORS.text);
      const descLines = doc.splitTextToSize(neighborhood.description, 170);
      descLines.forEach((line: string) => {
        doc.text(line, 15, yPos);
        yPos += 6;
      });
      yPos += 10;

      // Schools section
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...COLORS.primary);
      doc.text('Top-Rated Schools', 15, yPos);
      yPos += 5;

      autoTable(doc, {
        startY: yPos,
        head: [['School Name', 'Type', 'Rating', 'District']],
        body: neighborhood.schools.map(school => [
          school.name,
          school.type,
          school.rating,
          school.district
        ]),
        theme: 'striped',
        headStyles: { fillColor: COLORS.primary },
        margin: { left: 15, right: 15 }
      });

      yPos = (doc as any).lastAutoTable.finalY + 15;

      // Amenities
      if (yPos > 200) {
        doc.addPage();
        addHeader(doc, 2);
        yPos = 50;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...COLORS.primary);
      doc.text('Local Amenities', 15, yPos);
      yPos += 8;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...COLORS.text);

      neighborhood.amenities.forEach((amenity) => {
        if (yPos > 250) {
          doc.addPage();
          addHeader(doc, 3);
          yPos = 50;
        }
        doc.text(`• ${amenity.name} - ${amenity.type}`, 20, yPos);
        yPos += 6;
      });
    }
  }
};

// Main export function
export const generateResourcePDF = (resourceId: string, resourceTitle: string, category: string, neighborhoodId?: string) => {
  const doc = new jsPDF();

  // Add header to first page
  addHeader(doc, 1);

  // Generate content based on category
  if (category === 'Market Report' && neighborhoodId) {
    generateMarketReport(doc, neighborhoodId, resourceTitle);
  } else if (category === 'Buyer Guide') {
    generateGuide(doc, resourceTitle, 'buyer');
  } else if (category === 'Seller Guide') {
    generateGuide(doc, resourceTitle, 'seller');
  } else if (category === 'Neighborhood Guide') {
    generateNeighborhoodGuide(doc, resourceTitle, neighborhoodId);
  }

  // Add footer to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc, i, totalPages);
  }

  // Download the PDF
  const fileName = `${resourceId}.pdf`;
  doc.save(fileName);

  return fileName;
};

