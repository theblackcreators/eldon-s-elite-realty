const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Info */}
          <div className="text-center md:text-left">
            <div className="font-serif text-xl font-semibold text-primary-foreground mb-2">
              Eldon Peterson
            </div>
            <p className="text-primary-foreground/60 text-sm">
              Real Estate Broker, REALTOR® | Connect Realty
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            <a
              href="#about"
              className="text-primary-foreground/60 hover:text-accent transition-colors text-sm"
            >
              About
            </a>
            <a
              href="#services"
              className="text-primary-foreground/60 hover:text-accent transition-colors text-sm"
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-primary-foreground/60 hover:text-accent transition-colors text-sm"
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="text-primary-foreground/40 text-sm">
            © {currentYear} Eldon Peterson. All rights reserved.
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-primary-foreground/40 text-xs max-w-2xl mx-auto">
            REALTOR® is a registered trademark of the National Association of REALTORS®. Equal Housing Opportunity.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
