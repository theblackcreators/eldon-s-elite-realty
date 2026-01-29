import { Award, Users, MapPin, Briefcase } from "lucide-react";
import eldonPortrait from "@/assets/eldon-portrait.jpg";

const About = () => {
  const highlights = [
    {
      icon: Award,
      title: "Licensed Since 2016",
      description: "Seasoned professional with years of market expertise",
    },
    {
      icon: Users,
      title: "Client-Focused",
      description: "Dedicated to guiding you every step of the way",
    },
    {
      icon: MapPin,
      title: "Local Expert",
      description: "Deep knowledge of The Woodlands & Greater Houston",
    },
    {
      icon: Briefcase,
      title: "Connect Realty",
      description: "Backed by a trusted, established agency",
    },
  ];

  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-elevated">
              <img
                src={eldonPortrait}
                alt="Eldon Peterson - REALTOR®"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-lg -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-accent rounded-lg -z-10" />
          </div>

          {/* Content */}
          <div>
            <p className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-4">
              About Eldon
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 line-accent pb-4">
              A Commitment to Excellence
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                As a seasoned real estate broker and REALTOR® since 2016, Eldon Peterson offers professional and reliable real estate services in the greater Houston area.
              </p>
              <p>
                Specializing in residential, commercial, and land properties, Eldon is dedicated to guiding you through every step of your real estate journey. With a focus on local expertise and market insight, he helps clients achieve their goals, whether buying, selling, or investing.
              </p>
              <p>
                His comprehensive approach ensures a seamless and successful experience, backed by years of industry knowledge and a vast selection of listings.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-background rounded-lg hover-lift shadow-soft"
                >
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
