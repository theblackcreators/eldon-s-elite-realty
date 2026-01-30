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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <span className="font-serif text-xl font-semibold text-foreground tracking-wide">
              Eldon Peterson
            </span>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">
              REALTOR® | Broker
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors duration-200 tracking-wide"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors duration-200 tracking-wide"
                >
                  {link.name}
                </a>
              )
            ))}
            <a href="tel:4092237288">
              <Button variant="gold" size="default" className="gap-2">
                <Phone className="h-4 w-4" />
                (409) 223-7288
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
              <a href="tel:4092237288">
                <Button variant="gold" size="default" className="w-full gap-2">
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
