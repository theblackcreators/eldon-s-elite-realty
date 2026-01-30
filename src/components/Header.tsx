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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[80px] sm:min-h-[88px] lg:min-h-[96px] py-3 sm:py-4">
          {/* Logo - iOS Liquid Glass Design */}
          <Link to="/" className="flex flex-col gap-0.5 sm:gap-1 group flex-shrink-0 py-2">
            <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-foreground tracking-tight hover:text-accent transition-all duration-300 leading-tight">
              Eldon Peterson
            </span>
            <span className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground tracking-[0.15em] sm:tracking-[0.2em] uppercase font-light leading-tight whitespace-nowrap">
              REALTOR® | Broker
            </span>
          </Link>

          {/* Desktop Navigation - iOS Liquid Glass */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-accent transition-all duration-200 tracking-wide relative whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-accent transition-all duration-200 tracking-wide relative whitespace-nowrap"
                >
                  {link.name}
                </a>
              )
            ))}
            <a href="tel:4092237288">
              <Button variant="gold" size="default" className="gap-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm whitespace-nowrap">
                <Phone className="h-4 w-4" />
                (409) 223-7288
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button - iOS Liquid Glass */}
          <button
            className="lg:hidden p-2.5 rounded-xl bg-accent/5 hover:bg-accent/10 active:bg-accent/15 transition-all duration-200 border border-white/10 hover:border-accent/20 backdrop-blur-sm flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-foreground transition-transform duration-200" />
            ) : (
              <Menu className="h-5 w-5 text-foreground transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - iOS Liquid Glass */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-white/10 pt-4 animate-in slide-in-from-top duration-200 bg-background/40 backdrop-blur-xl rounded-b-2xl -mx-4 px-4 sm:-mx-6 sm:px-6">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-sm font-medium text-foreground/80 hover:text-accent active:text-accent transition-all duration-200 py-2.5 px-4 rounded-xl hover:bg-accent/5 active:bg-accent/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-foreground/80 hover:text-accent active:text-accent transition-all duration-200 py-2.5 px-4 rounded-xl hover:bg-accent/5 active:bg-accent/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
              <a href="tel:4092237288" className="mt-2">
                <Button variant="gold" size="default" className="w-full gap-2 shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm">
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
