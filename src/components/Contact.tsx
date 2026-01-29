import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "(409) 223-7288",
      href: "tel:4092237288",
    },
    {
      icon: Mail,
      label: "Email",
      value: "Contact via phone",
      href: "tel:4092237288",
    },
    {
      icon: MapPin,
      label: "Office",
      value: "2170 Buckthorne Pl Suite #200, The Woodlands, TX 77380",
      href: "https://maps.google.com/?q=2170+Buckthorne+Pl+Suite+200+The+Woodlands+TX+77380",
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Monday - Friday: 8AM - 4:30PM",
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-24 bg-hero-gradient">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div>
            <p className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-4">
              Get in Touch
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-6">
              Ready to Begin Your Real Estate Journey?
            </h2>
            <p className="text-primary-foreground/70 leading-relaxed mb-10 max-w-md">
              Whether you're buying your first home, selling a property, or exploring investment opportunities, I'm here to help you navigate every step with confidence.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-3 bg-primary-foreground/10 rounded-lg">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-primary-foreground/60 text-sm mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-primary-foreground hover:text-accent transition-colors flex items-center gap-2"
                      >
                        {item.value}
                        {item.href.startsWith("http") && (
                          <ExternalLink className="h-4 w-4" />
                        )}
                      </a>
                    ) : (
                      <p className="text-primary-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <a href="tel:4092237288">
                <Button variant="gold" size="xl" className="gap-2">
                  <Phone className="h-5 w-5" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column - Map or Additional Info */}
          <div className="bg-primary-foreground/5 rounded-lg p-8 border border-primary-foreground/10">
            <h3 className="font-serif text-2xl font-semibold text-primary-foreground mb-6">
              Connect Realty
            </h3>
            <p className="text-primary-foreground/70 leading-relaxed mb-6">
              Eldon Peterson is a proud member of Connect Realty, a leading real estate agency in The Woodlands, Texas. With a commitment to excellence and client satisfaction, we're here to help you achieve your real estate goals.
            </p>

            {/* Map Embed */}
            <div className="aspect-video rounded-lg overflow-hidden bg-primary-foreground/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.038392833654!2d-95.46239792396576!3d30.142833574838394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8647312da69b8f75%3A0x1e0c2c54b00e8c7d!2s2170%20Buckthorne%20Pl%20%23200%2C%20The%20Woodlands%2C%20TX%2077380!5e0!3m2!1sen!2sus!4v1704067200000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            </div>

            <a
              href="https://maps.google.com/?q=2170+Buckthorne+Pl+Suite+200+The+Woodlands+TX+77380"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mt-4 text-sm font-medium"
            >
              Get Directions
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
