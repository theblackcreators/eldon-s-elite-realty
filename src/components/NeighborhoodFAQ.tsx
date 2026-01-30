import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface NeighborhoodFAQProps {
  neighborhoodName: string;
  zipCodes: string[];
}

const NeighborhoodFAQ = ({ neighborhoodName, zipCodes }: NeighborhoodFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQ[] = [
    {
      question: `What is the average home price in ${neighborhoodName}?`,
      answer: `Home prices in ${neighborhoodName} vary based on size, age, and specific location within the community. Current market data shows a range from starter homes to luxury estates. Contact Eldon Peterson at (409) 223-7288 for the most current pricing information and available listings in ZIP codes ${zipCodes.join(', ')}.`
    },
    {
      question: `What school districts serve ${neighborhoodName}?`,
      answer: `${neighborhoodName} is served by highly-rated school districts offering excellent educational opportunities from elementary through high school. Many schools in the area have received state and national recognition for academic excellence. Specific school assignments depend on your exact address within ${neighborhoodName}.`
    },
    {
      question: `What amenities are available in ${neighborhoodName}?`,
      answer: `Residents of ${neighborhoodName} enjoy access to numerous amenities including parks, shopping centers, dining options, recreational facilities, and community events. The area features a mix of local businesses and national retailers, providing convenient access to daily necessities and entertainment.`
    },
    {
      question: `How is the commute from ${neighborhoodName} to downtown Houston?`,
      answer: `${neighborhoodName} offers convenient access to major highways and thoroughfares, making commutes to downtown Houston, The Woodlands, and other employment centers manageable. Typical commute times vary based on traffic conditions and your specific destination. Many residents also work locally in the thriving Northeast Houston business corridor.`
    },
    {
      question: `Is ${neighborhoodName} a good investment?`,
      answer: `${neighborhoodName} has shown consistent appreciation and strong market fundamentals, making it an attractive option for both homeowners and investors. The area benefits from ongoing development, excellent schools, and a growing job market. For detailed investment analysis and market projections, contact Eldon Peterson for a personalized consultation.`
    },
    {
      question: `What types of homes are available in ${neighborhoodName}?`,
      answer: `${neighborhoodName} offers diverse housing options including single-family homes, townhomes, and luxury estates. You'll find both new construction and established homes with various architectural styles, lot sizes, and price points to suit different preferences and budgets.`
    },
    {
      question: `Are there HOA fees in ${neighborhoodName}?`,
      answer: `HOA fees vary by specific subdivision within ${neighborhoodName}. Some communities have mandatory HOAs that maintain common areas, amenities, and enforce deed restrictions, while others do not. HOA fees typically range from minimal to moderate depending on the amenities provided. Specific HOA information is available for each listing.`
    },
    {
      question: `What is the property tax rate in ${neighborhoodName}?`,
      answer: `Property taxes in ${neighborhoodName} are determined by multiple taxing entities including the county, school district, and municipal utility districts. Rates vary by specific location within ZIP codes ${zipCodes.join(', ')}. Contact Eldon Peterson for detailed tax information on specific properties you're considering.`
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <HelpCircle className="h-10 w-10 text-accent" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about living in {neighborhoodName}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card 
                key={index} 
                className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <CardContent className="p-0">
                  <button
                    className="w-full text-left p-6 flex items-center justify-between gap-4"
                    aria-expanded={openIndex === index}
                  >
                    <h3 className="text-lg font-semibold pr-4">
                      {faq.question}
                    </h3>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-accent flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  
                  {openIndex === index && (
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20">
            <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-6">
              Get personalized answers about {neighborhoodName} from a local expert
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:4092237288"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-semibold"
              >
                Call (409) 223-7288
              </a>
              <a 
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodFAQ;

