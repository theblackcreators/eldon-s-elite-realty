import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import residentialImage from "@/assets/residential-property.jpg";
import commercialImage from "@/assets/commercial-property.jpg";
import landImage from "@/assets/land-property.jpg";

const Services = () => {
  const services = [
    {
      title: "Residential",
      description:
        "Find your dream home or sell your current property. From first-time buyers to luxury estates, I provide personalized guidance for every residential transaction.",
      image: residentialImage,
      features: ["Single Family Homes", "Condos & Townhomes", "Luxury Properties", "New Construction"],
    },
    {
      title: "Commercial",
      description:
        "Expert assistance for commercial real estate needs. Whether you're expanding your business or investing in commercial property, I deliver results.",
      image: commercialImage,
      features: ["Office Spaces", "Retail Properties", "Industrial Buildings", "Investment Properties"],
    },
    {
      title: "Land",
      description:
        "Discover prime land opportunities in the greater Houston area. From development plots to ranch properties, I help you find the perfect piece of Texas.",
      image: landImage,
      features: ["Development Land", "Ranch Properties", "Acreage", "Investment Parcels"],
    },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Expertise
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Comprehensive Real Estate Services
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Whether you're buying, selling, or investing, I provide expert guidance tailored to your unique goals and circumstances.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card rounded-lg overflow-hidden shadow-soft hover-lift border border-border"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a href="#contact">
                  <Button
                    variant="outline"
                    className="w-full group/btn border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
