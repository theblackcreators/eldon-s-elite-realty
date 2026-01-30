import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-woodlands.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="The Woodlands Texas real estate - luxury homes and master-planned community in Northeast Houston"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-overlay-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Tagline */}
          <p className="animate-fade-up text-accent font-semibold tracking-[0.3em] uppercase text-sm md:text-base mb-6 text-shadow-md">
            Real Estate Excellence Since 2016
          </p>

          {/* Heading */}
          <h1 className="animate-fade-up-delay font-serif text-4xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground leading-tight mb-6 text-shadow-lg">
            Your Trusted Guide to{" "}
            <span className="text-accent drop-shadow-lg">Greater Houston</span> Real Estate
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up-delay-2 text-lg md:text-xl text-primary-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-shadow-md">
            Specializing in residential, commercial, and land properties throughout The Woodlands and the greater Houston area.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up-delay-2 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact">
              <Button variant="gold" size="xl" className="group">
                Schedule a Consultation
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#services">
              <Button variant="heroOutline" size="xl">
                Explore Services
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-up-delay-2 mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground text-shadow-md">10+</div>
              <div className="text-sm md:text-base text-primary-foreground/90 mt-1 font-medium text-shadow-sm">Years Experience</div>
            </div>
            <div className="text-center border-x border-primary-foreground/20 px-4">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground text-shadow-md">300+</div>
              <div className="text-sm md:text-base text-primary-foreground/90 mt-1 font-medium text-shadow-sm">Homes Sold</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground text-shadow-md">5★</div>
              <div className="text-sm md:text-base text-primary-foreground/90 mt-1 font-medium text-shadow-sm">Client Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
