import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Branding & TREC */}
          <div className="text-center md:text-left">
            <div className="font-serif text-2xl font-semibold text-primary-foreground mb-2">
              Eldon Peterson
            </div>
            <p className="text-primary-foreground/80 text-sm mb-1">
              Real Estate Broker, REALTOR®
            </p>
            <p className="text-primary-foreground/60 text-sm mb-3">
              Connect Realty TREC# 573369
            </p>
            <p className="text-primary-foreground/50 text-xs">
              TREC# 675220
            </p>
          </div>

          {/* Primary Office */}
          <div className="text-center md:text-left">
            <h3 className="text-primary-foreground font-semibold mb-3 flex items-center justify-center md:justify-start gap-2">
              <MapPin className="h-4 w-4" />
              Primary Office
            </h3>
            <p className="text-primary-foreground/80 text-sm mb-1">
              Connect Realty TREC# 573369
            </p>
            <p className="text-primary-foreground/70 text-sm">
              2170 Buckthorne Pl. #100
            </p>
            <p className="text-primary-foreground/70 text-sm mb-2">
              The Woodlands, TX 77380
            </p>
            <a
              href="tel:4092237288"
              className="text-accent hover:text-accent/80 transition-colors text-sm font-medium flex items-center justify-center md:justify-start gap-2"
            >
              <Phone className="h-4 w-4" />
              (409) 223-7288
            </a>
          </div>

          {/* Additional Office */}
          <div className="text-center md:text-left">
            <h3 className="text-primary-foreground font-semibold mb-3 flex items-center justify-center md:justify-start gap-2">
              <MapPin className="h-4 w-4" />
              Additional Office
            </h3>
            <p className="text-primary-foreground/70 text-sm">
              3560 Delaware St, Suite 308
            </p>
            <p className="text-primary-foreground/70 text-sm mb-2">
              Beaumont, TX 77706
            </p>
            <a
              href="tel:4092237288"
              className="text-accent hover:text-accent/80 transition-colors text-sm font-medium flex items-center justify-center md:justify-start gap-2"
            >
              <Phone className="h-4 w-4" />
              (409) 223-7288
            </a>
          </div>
        </div>

        {/* Assistance Notice */}
        <div className="bg-primary-foreground/5 rounded-lg p-4 mb-8 border border-primary-foreground/10">
          <p className="text-primary-foreground/80 text-sm text-center">
            Should you require assistance in navigating our website or searching for real estate,
            please contact our offices at{" "}
            <a href="tel:4092237288" className="text-accent hover:text-accent/80 font-medium">
              409-223-7288
            </a>
            .
          </p>
        </div>

        {/* Legal Section */}
        <div className="mb-8 pb-8 border-b border-primary-foreground/10">
          <h3 className="text-primary-foreground font-semibold mb-4 text-center">
            Legal Information
          </h3>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <Link
              to="/join-our-team"
              className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
            >
              Join Our Team
            </Link>
            <span className="text-primary-foreground/30">|</span>
            <Link
              to="/terms-of-use"
              className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
            >
              Terms of Use
            </Link>
            <span className="text-primary-foreground/30">|</span>
            <Link
              to="/privacy-policy"
              className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <span className="text-primary-foreground/30">|</span>
            <Link
              to="/accessibility"
              className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
            >
              Accessibility
            </Link>
            <span className="text-primary-foreground/30">|</span>
            <Link
              to="/fair-housing"
              className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
            >
              Fair Housing
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://www.trec.texas.gov/sites/default/files/pdf-forms/CN%201-4-1_1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-accent transition-colors text-sm underline"
            >
              TREC Consumer Protection Notice
            </a>
            <span className="text-primary-foreground/30">|</span>
            <a
              href="https://www.trec.texas.gov/information-about-brokerage-services-form"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-accent transition-colors text-sm underline"
            >
              Texas Real Estate Commission Information About Brokerage Services
            </a>
          </div>
        </div>

        {/* MLS Disclaimers - Collapsible */}
        <div className="mb-8">
          <h3 className="text-primary-foreground font-semibold mb-4 text-center">
            MLS Disclaimers
          </h3>
          <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
            {/* HAR Disclaimer */}
            <AccordionItem value="har" className="border-primary-foreground/20">
              <AccordionTrigger className="text-primary-foreground/80 hover:text-primary-foreground text-sm">
                Houston Association of REALTORS® (HAR)
              </AccordionTrigger>
              <AccordionContent className="text-primary-foreground/75 text-sm leading-loose">
                The information being provided by Houston Association of REALTORS, Inc. is for the consumer's personal,
                non-commercial use and may not be used for any purpose other than to identify prospective properties
                consumers may be interested in purchasing. Any information relating to real estate for sale referenced
                on this web site comes from the Internet Data Exchange (IDX) program of the Houston Association of
                REALTORS, Inc. This web site may reference real estate listing(s) held by a brokerage firm other than
                the broker and/or agent who owns this web site. The accuracy of all information, regardless of source,
                including but not limited to open house information, square footages and lot sizes, is deemed reliable
                but not guaranteed and should be personally verified through personal inspection by and/or with the
                appropriate professionals. The data contained herein is copyrighted by Houston Realtors Information
                Service, Inc. and is protected by all applicable copyright laws. Any unauthorized dissemination of this
                information is in violation of copyright laws and is strictly prohibited. Copyright {currentYear} Houston
                Association of REALTORS, Inc. All rights reserved.
              </AccordionContent>
            </AccordionItem>

            {/* LERA MLS Disclaimer */}
            <AccordionItem value="lera" className="border-primary-foreground/20">
              <AccordionTrigger className="text-primary-foreground/80 hover:text-primary-foreground text-sm">
                LERA MLS
              </AccordionTrigger>
              <AccordionContent className="text-primary-foreground/75 text-sm leading-loose">
                Information provided courtesy of LERA MLS. IDX information is provided exclusively for consumers'
                personal, non-commercial use and may not be used for any purpose other than to identify prospective
                properties consumers may be interested in purchasing. Information is believed to be accurate but not
                guaranteed. Provided courtesy of LERA MLS. Copyright {currentYear} LERA MLS, All Rights Reserved.
              </AccordionContent>
            </AccordionItem>

            {/* Beaumont Board Disclaimer */}
            <AccordionItem value="beaumont" className="border-primary-foreground/20">
              <AccordionTrigger className="text-primary-foreground/80 hover:text-primary-foreground text-sm">
                Beaumont Board of Realtors®
              </AccordionTrigger>
              <AccordionContent className="text-primary-foreground/75 text-sm leading-loose">
                The accuracy of all information, regardless of source, including but not limited to open house
                information, square footage(s) and lot size(s), is deemed reliable but not guaranteed and should be
                personally verified through personal inspection by and/or with the appropriate professionals. The data
                contained herein is copyrighted by Beaumont Board of Realtors® and is protected by all applicable
                copyright laws. Any unauthorized dissemination of this information is in violation of copyright laws
                and is strictly prohibited. Copyright {currentYear} Beaumont Board of Realtors® All rights reserved.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Copyright & Equal Housing */}
        <div className="text-center pt-8 border-t border-primary-foreground/10">
          <p className="text-primary-foreground/70 text-xs md:text-sm mb-2">
            © {currentYear} Eldon Peterson. All rights reserved.
          </p>
          <p className="text-primary-foreground/65 text-xs md:text-sm mb-2">
            REALTOR® is a registered trademark of the National Association of REALTORS®. Equal Housing Opportunity.
          </p>
          <p className="text-primary-foreground/65 text-xs md:text-sm">
            Designed by{" "}
            <a
              href="https://petersonproservices.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/90 transition-colors font-medium"
            >
              Peterson Pro Services
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
