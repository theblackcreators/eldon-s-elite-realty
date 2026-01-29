import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col">
            <span className="font-serif text-xl font-semibold text-foreground tracking-wide">
              Eldon Peterson
            </span>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">
              REALTOR® | Broker
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors duration-200 tracking-wide"
              >
                {link.name}
              </a>
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
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
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
