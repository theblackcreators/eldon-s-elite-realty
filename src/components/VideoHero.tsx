import { Button } from "@/components/ui/button";
import { ArrowRight, Home, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-woodlands.jpg";

interface VideoHeroProps {
  videoSrc?: string;
  youtubeId?: string;
  vimeoId?: string;
  posterImage?: string;
}

/**
 * VideoHero Component
 * 
 * Full-screen hero section with video background
 * Optimized for seller lead generation with prominent CTAs
 * Falls back to static image if no video provided
 * Mobile-optimized with responsive design
 */
const VideoHero = ({
  videoSrc,
  youtubeId,
  vimeoId,
  posterImage = heroImage
}: VideoHeroProps) => {
  const hasVideo = videoSrc || youtubeId || vimeoId;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video or Image Background */}
      <div className="absolute inset-0">
        {hasVideo ? (
          <>
            {/* Self-hosted video */}
            {videoSrc && (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                poster={posterImage}
              >
                <source src={videoSrc} type="video/mp4" />
                <track kind="captions" />
              </video>
            )}
            
            {/* YouTube background (for desktop only) */}
            {youtubeId && !videoSrc && (
              <div className="hidden md:block w-full h-full">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=${youtubeId}`}
                  className="absolute inset-0 w-[100vw] h-[100vh] pointer-events-none"
                  style={{ transform: 'scale(1.5)' }}
                  allow="autoplay"
                  title="Hero background video"
                />
              </div>
            )}
            
            {/* Mobile fallback to image */}
            <div className="md:hidden w-full h-full">
              <img
                src={posterImage}
                alt="Northeast Houston luxury real estate"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </>
        ) : (
          /* Static image fallback */
          <img
            src={posterImage}
            alt="Northeast Houston luxury real estate - The Woodlands master-planned community"
            className="w-full h-full object-cover"
            loading="eager"
          />
        )}
        
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Seller-Focused Tagline */}
          <p className="animate-fade-up text-accent font-semibold tracking-[0.3em] uppercase text-sm md:text-base mb-6 text-shadow-md">
            Sell Your Home for Top Dollar
          </p>

          {/* Heading - Seller Lead Generation Focus */}
          <h1 className="animate-fade-up-delay font-serif text-4xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground leading-tight mb-6 text-shadow-lg">
            Northeast Houston's{" "}
            <span className="text-accent drop-shadow-lg">Premier</span> Listing Agent
          </h1>

          {/* Subtitle - Community-First Positioning */}
          <p className="animate-fade-up-delay-2 text-lg md:text-xl text-primary-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-shadow-md">
            Expert local knowledge of The Woodlands, Atascocita, Humble, Kingwood & surrounding communities. 
            Get your home sold fast and for the best price.
          </p>

          {/* Seller-Focused CTAs */}
          <div className="animate-fade-up-delay-2 flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#valuation">
              <Button variant="gold" size="xl" className="group">
                <Home className="h-5 w-5 mr-2" />
                Get Your Home's Value
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#contact">
              <Button variant="heroOutline" size="xl" className="group">
                <TrendingUp className="h-5 w-5 mr-2" />
                Schedule Listing Consultation
              </Button>
            </a>
          </div>

          {/* Stats - Seller Trust Indicators */}
          <div className="animate-fade-up-delay-2 mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground text-shadow-md">300+</div>
              <div className="text-sm md:text-base text-primary-foreground/90 mt-1 font-medium text-shadow-sm">Homes Sold</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground text-shadow-md">500+</div>
              <div className="text-sm md:text-base text-primary-foreground/90 mt-1 font-medium text-shadow-sm">Sides Closed</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground text-shadow-md">98%</div>
              <div className="text-sm md:text-base text-primary-foreground/90 mt-1 font-medium text-shadow-sm">List-to-Sale Ratio</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground text-shadow-md">21</div>
              <div className="text-sm md:text-base text-primary-foreground/90 mt-1 font-medium text-shadow-sm">Avg Days on Market</div>
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

export default VideoHero;

