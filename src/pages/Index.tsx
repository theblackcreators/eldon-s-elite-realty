import Header from "@/components/Header";
import VideoHero from "@/components/VideoHero";
import About from "@/components/About";
import Services from "@/components/Services";
import TerritoryMap from "@/components/TerritoryMap";
import HomeValuationTool from "@/components/HomeValuationTool";
import IDXHeroSearch from "@/components/IDXHeroSearch";
import TestimonialsSection from "@/components/TestimonialsSection";
import RecentlySold from "@/components/RecentlySold";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SEO, getLocalBusinessSchema, getRealEstateAgentSchema } from "@/components/SEO";
import { getWebSiteSchema, getServiceSchema } from "@/utils/structuredData";
import { PAGE_SEO } from "@/config/seoConfig";

const Index = () => {
  const structuredData = [
    getLocalBusinessSchema(),
    getRealEstateAgentSchema(),
    getWebSiteSchema(),
    getServiceSchema()
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        keywords={PAGE_SEO.home.keywords}
        canonical={PAGE_SEO.home.path}
        structuredData={structuredData}
      />
      <Header />
      <main>
        {/* Video Hero - Seller Lead Generation Focus */}
        <VideoHero />

        {/* TREC Required Notices - Prominent Placement for Compliance */}
        <section className="bg-muted/30 border-y border-border py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 text-xs md:text-sm">
              <span className="text-muted-foreground font-medium">Texas Real Estate Commission Required Notices:</span>
              <a
                href="https://www.trec.texas.gov/sites/default/files/pdf-forms/CN%201-4-1_1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent underline font-medium transition-colors"
              >
                TREC Consumer Protection Notice
              </a>
              <span className="text-muted-foreground hidden sm:inline">|</span>
              <a
                href="https://www.trec.texas.gov/information-about-brokerage-services-form"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent underline font-medium transition-colors"
              >
                Texas Real Estate Commission Information About Brokerage Services
              </a>
            </div>
          </div>
        </section>

        {/* Home Valuation Tool - Moved Up for Seller Lead Generation */}
        <div id="valuation">
          <HomeValuationTool />
        </div>

        {/* Community-First: Territory Map */}
        <TerritoryMap />

        {/* About Section with Video */}
        <About />

        {/* Services */}
        <Services />

        {/* Social Proof: Recently Sold */}
        <RecentlySold />

        {/* Social Proof: Testimonials */}
        <TestimonialsSection />

        {/* Property Search */}
        <IDXHeroSearch />

        {/* Contact Form */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
