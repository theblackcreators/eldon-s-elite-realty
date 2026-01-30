import { Calculator, Home, TrendingUp, Wrench, Target, DollarSign } from 'lucide-react';
import BuyerAffordabilityCalculator from '@/components/BuyerAffordabilityCalculator';
import MortgageCalculator from '@/components/MortgageCalculator';
import SellerNetProceedsCalculator from '@/components/SellerNetProceedsCalculator';
import HomeValueEstimator from '@/components/HomeValueEstimator';
import RepairCostEstimator from '@/components/RepairCostEstimator';
import OfferStrengthTool from '@/components/OfferStrengthTool';
import { SEO, getBreadcrumbSchema } from '@/components/SEO';
import { PAGE_SEO } from '@/config/seoConfig';

const ToolsPage = () => {
  const structuredData = [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Tools', url: '/tools' }
    ])
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <SEO
        title={PAGE_SEO.tools.title}
        description={PAGE_SEO.tools.description}
        keywords={PAGE_SEO.tools.keywords}
        canonical={PAGE_SEO.tools.path}
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Real Estate Tools & Calculators
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Professional-grade tools to help you make informed decisions whether you're buying, selling, or investing in Northeast Houston real estate.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Tool 1: Buyer Affordability Calculator */}
          <div id="affordability-calculator" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Buyer Affordability Calculator</h2>
                <p className="text-muted-foreground">
                  Calculate your monthly payment and see what you can afford
                </p>
              </div>
            </div>
            <BuyerAffordabilityCalculator />
          </div>

          {/* Tool 2: Mortgage Calculator */}
          <div id="mortgage-calculator" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-accent/10 rounded-lg">
                <DollarSign className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Mortgage Calculator</h2>
                <p className="text-muted-foreground">
                  Calculate monthly payments with detailed breakdown and amortization schedule
                </p>
              </div>
            </div>
            <MortgageCalculator />
          </div>

          {/* Tool 3: Home Value Estimator */}
          <div id="home-value-estimator" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Home Value Estimator</h2>
                <p className="text-muted-foreground">
                  Get an estimated value range and pricing strategy for your home
                </p>
              </div>
            </div>
            <HomeValueEstimator />
          </div>

          {/* Tool 4: Seller Net Proceeds Calculator */}
          <div id="net-proceeds-calculator" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Seller Net Proceeds Calculator</h2>
                <p className="text-muted-foreground">
                  Estimate your net proceeds from selling your home
                </p>
              </div>
            </div>
            <SellerNetProceedsCalculator />
          </div>

          {/* Tool 5: Repair Cost Estimator */}
          <div id="repair-cost-estimator" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Wrench className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Repair & Renovation Cost Estimator</h2>
                <p className="text-muted-foreground">
                  Estimate repair costs and prioritize for resale ROI
                </p>
              </div>
            </div>
            <RepairCostEstimator />
          </div>

          {/* Tool 6: Offer Strength Tool */}
          <div id="offer-strength-tool" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Offer Strength Builder</h2>
                <p className="text-muted-foreground">
                  Analyze offer strength (buyers) or compare multiple offers (sellers)
                </p>
              </div>
            </div>
            <OfferStrengthTool />
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need Personalized Guidance?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            These tools provide estimates, but every situation is unique. Let's discuss your specific needs and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:4092237288" 
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Call (409) 223-7288
            </a>
            <a 
              href="mailto:eldon@eldonpetersonrealestate.com" 
              className="inline-flex items-center justify-center px-8 py-3 bg-card border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
            >
              Email Me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToolsPage;

