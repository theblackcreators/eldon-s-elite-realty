import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: "Neighborhoods", href: isHomePage ? "#territory" : "/#territory" },
    { name: "About", href: isHomePage ? "#about" : "/#about" },
    { name: "Services", href: isHomePage ? "#services" : "/#services" },
    { name: "Search Properties", href: "/properties", isRoute: true },
    { name: "New Construction", href: "/new-construction", isRoute: true },
    { name: "Buyers", href: "/buyers", isRoute: true },
    { name: "Sellers", href: "/sellers", isRoute: true },
    { name: "Tools", href: "/tools", isRoute: true },
    { name: "Resources", href: "/resources", isRoute: true },
    { name: "Contact", href: isHomePage ? "#contact" : "/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background via-background to-background/98 backdrop-blur-md border-b-2 border-accent/20 shadow-sm">
      <div className="container mx-auto px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex items-center justify-between">
          {/* Logo - Elite Luxury Branding */}
          <Link to="/" className="flex flex-col gap-1 group">
            <span className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight hover:text-accent transition-all duration-300">
              Eldon Peterson
            </span>
            <span className="text-sm md:text-base text-muted-foreground tracking-[0.2em] uppercase font-light">
              REALTOR® | Broker
            </span>
          </Link>

          {/* Desktop Navigation - Refined Spacing */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-foreground/70 hover:text-accent transition-all duration-300 tracking-wide relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full pb-1"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-foreground/70 hover:text-accent transition-all duration-300 tracking-wide relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full pb-1"
                >
                  {link.name}
                </a>
              )
            ))}
            <a href="tel:4092237288">
              <Button variant="gold" size="default" className="gap-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Phone className="h-4 w-4" />
                (409) 223-7288
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button - Premium Design */}
          <button
            className="lg:hidden p-3 rounded-lg hover:bg-accent/10 transition-all duration-300 border border-transparent hover:border-accent/30"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground transition-transform duration-300 rotate-90" />
            ) : (
              <Menu className="h-6 w-6 text-foreground transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Premium Slide-In Animation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-6 pb-6 border-t-2 border-accent/20 pt-6 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-base font-medium text-foreground/80 hover:text-accent transition-all duration-300 hover:translate-x-2 py-2 border-l-2 border-transparent hover:border-accent pl-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-base font-medium text-foreground/80 hover:text-accent transition-all duration-300 hover:translate-x-2 py-2 border-l-2 border-transparent hover:border-accent pl-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
              <a href="tel:4092237288" className="mt-2">
                <Button variant="gold" size="default" className="w-full gap-2 shadow-md hover:shadow-lg transition-all duration-300">
                  <Phone className="h-4 w-4" />
                  (409) 223-7288
                </Button>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
