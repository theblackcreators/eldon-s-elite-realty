import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { SEO, getBreadcrumbSchema } from '@/components/SEO';
import {
  Users, TrendingUp, Award, Lightbulb, DollarSign, Headphones,
  GraduationCap, Target, Briefcase, Phone, Mail, CheckCircle2,
  Rocket, Shield, BarChart3, Zap
} from 'lucide-react';
import { agentTestimonials } from '@/data/agentTestimonials';

const agentApplicationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  currentBrokerage: z.string().optional(),
  yearsExperience: z.string().min(1, 'Years of experience is required'),
  licenseNumber: z.string().min(1, 'License number is required'),
  message: z.string().optional(),
});

type AgentApplicationFormData = z.infer<typeof agentApplicationSchema>;

const RecruitingPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AgentApplicationFormData>({
    resolver: zodResolver(agentApplicationSchema),
  });

  const onSubmit = async (data: AgentApplicationFormData) => {
    setIsSubmitting(true);
    try {
      const leadTag = 'Recruiting-Agent Application';
      console.log('Agent application captured:', { ...data, tag: leadTag });
      
      toast({
        title: "Application Received!",
        description: "We'll contact you within 48 hours to discuss joining our team.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Please try again or call us at (409) 223-7288.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whyConnectRealty = [
    { icon: DollarSign, title: 'Competitive Commission Splits', description: 'Industry-leading commission structure with no hidden fees or desk charges' },
    { icon: Rocket, title: 'Lead Generation System', description: 'Proprietary lead generation platform that delivers qualified buyer and seller leads' },
    { icon: Zap, title: 'Cutting-Edge Technology', description: 'Best-in-class CRM, marketing automation, and transaction management tools' },
    { icon: GraduationCap, title: 'Ongoing Training', description: 'Weekly training sessions, mentorship programs, and continuing education opportunities' },
    { icon: BarChart3, title: 'Marketing Support', description: 'Professional photography, videography, and marketing materials for all your listings' },
    { icon: Shield, title: 'E&O Insurance Included', description: 'Comprehensive errors and omissions insurance coverage at no cost to you' },
  ];

  const benefits = [
    { title: 'Transaction Coordination', description: 'Dedicated transaction coordinators to handle paperwork and compliance' },
    { title: 'Marketing Budget', description: 'Annual marketing budget for advertising and promotional materials' },
    { title: 'Office Space', description: 'Modern office facilities in prime Northeast Houston locations' },
    { title: 'Team Collaboration', description: 'Collaborative environment with experienced agents willing to share knowledge' },
    { title: 'Flexible Schedule', description: 'Work-life balance with the freedom to manage your own schedule' },
    { title: 'Growth Opportunities', description: 'Clear path to team leadership and management positions' },
  ];

  const jobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Real Estate Agent',
    description: 'Join Northeast Houston\'s elite real estate team. We offer competitive commission splits, cutting-edge technology, comprehensive training, and ongoing support to help you succeed in your real estate career.',
    datePosted: '2026-01-30',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Connect Realty',
      sameAs: 'https://eldonpeterson.com',
      logo: 'https://eldonpeterson.com/favicon.svg'
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '9720 Cypresswood Dr., Suite 200',
        addressLocality: 'Houston',
        addressRegion: 'TX',
        postalCode: '77070',
        addressCountry: 'US'
      }
    },
    employmentType: 'CONTRACTOR',
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: {
        '@type': 'QuantitativeValue',
        value: 'Commission-based',
        unitText: 'YEAR'
      }
    },
    qualifications: 'Active Texas Real Estate License required. Previous real estate experience preferred but not required. Strong communication and interpersonal skills essential.',
    responsibilities: 'Represent buyers and sellers in real estate transactions, conduct property showings, negotiate offers, manage client relationships, and grow your real estate business with our support and resources.',
  };

  const structuredData = [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Join Our Team', url: '/join-our-team' }
    ]),
    jobPostingSchema
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Join Our Team - Real Estate Careers | Connect Realty"
        description="Join Northeast Houston's elite real estate team. Competitive commission splits, cutting-edge technology, comprehensive training, and ongoing support. Apply today!"
        keywords="real estate agent jobs, realtor careers Houston, real estate brokerage, agent recruiting, Northeast Houston real estate jobs"
        canonical="/join-our-team"
        structuredData={structuredData}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 text-sm">
              Career Opportunities
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Join Northeast Houston's Elite Real Estate Team
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Build your real estate career with industry-leading support, technology, and commission structure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#apply">
                <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
                  <Briefcase className="h-5 w-5" />
                  Apply Now
                </Button>
              </a>
              <a href="tel:4092237288">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto">
                  <Phone className="h-5 w-5" />
                  (409) 223-7288
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Connect Realty Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Connect Realty?
              </h2>
              <p className="text-lg text-muted-foreground">
                We invest in our agents' success with the best tools, training, and support in the industry
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyConnectRealty.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <item.icon className="h-10 w-10 text-accent mb-3" />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Success Stories from Our Agents
              </h2>
              <p className="text-lg text-muted-foreground">
                Hear from agents who have grown their careers with Connect Realty
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agentTestimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <p className="font-semibold text-lg">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      {testimonial.specialization && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {testimonial.specialization}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="h-4 w-4 text-accent" />
                      <span>{testimonial.yearsWithCompany} years with Connect Realty</span>
                    </div>
                    {testimonial.previousBrokerage && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Previously at {testimonial.previousBrokerage}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Support Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comprehensive Benefits & Support
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to succeed in your real estate career
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Growth Opportunities Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Career Growth & Development
              </h2>
              <p className="text-lg text-muted-foreground">
                Clear pathways to advance your real estate career
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Target className="h-12 w-12 text-accent mx-auto mb-3" />
                  <CardTitle>New Agent Program</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive onboarding, mentorship, and training to help new agents close their first 10 transactions
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 text-accent mx-auto mb-3" />
                  <CardTitle>Experienced Agent Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Advanced marketing strategies, lead generation, and business development resources for established agents
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-accent mx-auto mb-3" />
                  <CardTitle>Team Leadership</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Opportunities to build and lead your own team with recruiting support and revenue sharing
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-gradient-to-br from-accent/10 to-primary/5 rounded-lg p-8 border border-accent/20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Continuing Education</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Weekly training sessions on market trends and best practices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Access to industry-leading courses and certifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Annual conference attendance and networking opportunities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>One-on-one coaching and performance reviews</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Technology Training</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>CRM and lead management system training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Social media marketing and digital advertising</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Virtual tour and video marketing techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Transaction management and e-signature platforms</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section id="apply" className="py-20 bg-gradient-to-br from-accent via-accent/95 to-accent/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Take Your Career to the Next Level?
                </h2>
                <p className="text-xl mb-6 opacity-90">
                  Join our team and experience the difference that true support and cutting-edge resources can make in your real estate career.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Active Texas Real Estate License Required</p>
                      <p className="text-sm opacity-90">Must have current, active license in good standing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">All Experience Levels Welcome</p>
                      <p className="text-sm opacity-90">From new agents to seasoned professionals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Immediate Start Available</p>
                      <p className="text-sm opacity-90">Begin building your business right away</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:4092237288">
                    <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
                      <Phone className="h-5 w-5" />
                      (409) 223-7288
                    </Button>
                  </a>
                  <a href="mailto:eldon@eldonpeterson.com">
                    <Button size="lg" variant="outline" className="gap-2 bg-transparent border-white text-white hover:bg-white hover:text-accent w-full sm:w-auto">
                      <Mail className="h-5 w-5" />
                      Email Us
                    </Button>
                  </a>
                </div>
              </div>

              <Card className="bg-background text-foreground">
                <CardHeader>
                  <CardTitle>Agent Application</CardTitle>
                  <CardDescription>
                    Fill out the form and we'll contact you within 48 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" {...register('firstName')} placeholder="John" />
                        {errors.firstName && (
                          <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" {...register('lastName')} placeholder="Doe" />
                        {errors.lastName && (
                          <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" {...register('email')} placeholder="john.doe@example.com" />
                      {errors.email && (
                        <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" {...register('phone')} placeholder="(409) 223-7288" />
                      {errors.phone && (
                        <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="licenseNumber">Texas Real Estate License Number</Label>
                      <Input id="licenseNumber" {...register('licenseNumber')} placeholder="123456" />
                      {errors.licenseNumber && (
                        <p className="text-xs text-destructive mt-1">{errors.licenseNumber.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="yearsExperience">Years of Real Estate Experience</Label>
                      <Input id="yearsExperience" {...register('yearsExperience')} placeholder="5" />
                      {errors.yearsExperience && (
                        <p className="text-xs text-destructive mt-1">{errors.yearsExperience.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="currentBrokerage">Current Brokerage (Optional)</Label>
                      <Input id="currentBrokerage" {...register('currentBrokerage')} placeholder="ABC Realty" />
                    </div>

                    <div>
                      <Label htmlFor="message">Why do you want to join Connect Realty? (Optional)</Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder="Tell us about your career goals..."
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RecruitingPage;

