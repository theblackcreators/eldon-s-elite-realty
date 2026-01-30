import { useState } from 'react';
import { neighborhoods } from '@/data/neighborhoods';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BookOpen, Download, TrendingUp, Home, FileText, MapPin, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateResourcePDF } from '@/utils/pdfGenerator';
import { SEO, getBreadcrumbSchema } from '@/components/SEO';
import { PAGE_SEO } from '@/config/seoConfig';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'Market Report' | 'Buyer Guide' | 'Seller Guide' | 'Neighborhood Guide';
  neighborhood?: string;
  icon: any;
}

const resources: Resource[] = [
  {
    id: 'atascocita-market',
    title: 'Atascocita Market Report 2026',
    description: 'Comprehensive market analysis for Atascocita (77346) including pricing trends, inventory levels, and forecasts.',
    category: 'Market Report',
    neighborhood: 'atascocita',
    icon: TrendingUp
  },
  {
    id: 'kingwood-market',
    title: 'Kingwood Market Report 2026',
    description: 'Detailed market insights for The Livable Forest, including luxury home trends and school district analysis.',
    category: 'Market Report',
    neighborhood: 'kingwood',
    icon: TrendingUp
  },
  {
    id: 'humble-market',
    title: 'Humble Area Market Report 2026',
    description: 'Market statistics for Humble (77338, 77369) covering residential and commercial opportunities.',
    category: 'Market Report',
    neighborhood: 'humble',
    icon: TrendingUp
  },
  {
    id: 'summerwood-market',
    title: 'Summerwood Market Report 2026',
    description: 'Analysis of the fastest-growing area in NE Houston with new construction trends.',
    category: 'Market Report',
    neighborhood: 'summerwood',
    icon: TrendingUp
  },
  {
    id: 'fall-creek-market',
    title: 'Fall Creek Market Report 2026',
    description: 'Lakeside living market analysis with luxury amenity community insights.',
    category: 'Market Report',
    neighborhood: 'fall-creek',
    icon: TrendingUp
  },
  {
    id: 'eado-market',
    title: 'EaDo Market Report 2026',
    description: 'Urban living trends in East Downtown Houston with investment opportunities.',
    category: 'Market Report',
    neighborhood: 'eado',
    icon: TrendingUp
  },
  {
    id: 'first-time-buyer',
    title: 'First-Time Homebuyer Guide',
    description: 'Everything you need to know about buying your first home in Northeast Houston.',
    category: 'Buyer Guide',
    icon: Home
  },
  {
    id: 'seller-checklist',
    title: 'Home Seller\'s Checklist',
    description: 'Step-by-step guide to preparing and selling your home for maximum value.',
    category: 'Seller Guide',
    icon: FileText
  },
  {
    id: 'kingwood-schools',
    title: 'Kingwood School District Guide',
    description: 'Complete guide to schools in Kingwood with ratings and boundary maps.',
    category: 'Neighborhood Guide',
    neighborhood: 'kingwood',
    icon: BookOpen
  },
  {
    id: 'lake-houston-living',
    title: 'Lake Houston Living Guide',
    description: 'Discover waterfront communities including Atascocita, Summerwood, and Fall Creek.',
    category: 'Neighborhood Guide',
    icon: MapPin
  }
];

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');
  const [showLeadDialog, setShowLeadDialog] = useState(false);
  const [downloadedResource, setDownloadedResource] = useState<string>('');
  const [leadFormData, setLeadFormData] = useState({ name: '', email: '', phone: '' });
  const { toast } = useToast();

  const filteredResources = resources.filter(resource => {
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory;
    const neighborhoodMatch = selectedNeighborhood === 'all' || resource.neighborhood === selectedNeighborhood;
    return categoryMatch && neighborhoodMatch;
  });

  const handleDownload = (resource: Resource) => {
    try {
      // Generate and download PDF immediately
      const fileName = generateResourcePDF(
        resource.id,
        resource.title,
        resource.category,
        resource.neighborhood
      );

      // Show success toast
      toast({
        title: "Download Started!",
        description: `${resource.title} is downloading now.`,
      });

      // Show optional lead capture dialog after 2 seconds
      setTimeout(() => {
        setDownloadedResource(resource.title);
        setShowLeadDialog(true);
      }, 2000);

    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "Download Error",
        description: "There was an issue generating the PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Log lead data (integrate with your CRM here)
    console.log('Lead Capture:', {
      ...leadFormData,
      resource: downloadedResource,
      timestamp: new Date().toISOString(),
      source: 'Resource Download Follow-up'
    });

    toast({
      title: "Thank you!",
      description: "I'll be in touch soon with personalized insights for your area.",
    });

    setShowLeadDialog(false);
    setLeadFormData({ name: '', email: '', phone: '' });
  };

  const structuredData = [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Resources', url: '/resources' }
    ])
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={PAGE_SEO.resources.title}
        description={PAGE_SEO.resources.description}
        keywords={PAGE_SEO.resources.keywords}
        canonical={PAGE_SEO.resources.path}
        structuredData={structuredData}
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">Northeast Houston Resources</h1>
            <p className="text-xl text-muted-foreground">
              Access exclusive market reports, buyer and seller guides, and neighborhood insights for Northeast Houston communities.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="category-filter">Filter by Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category-filter">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Market Report">Market Reports</SelectItem>
                  <SelectItem value="Buyer Guide">Buyer Guides</SelectItem>
                  <SelectItem value="Seller Guide">Seller Guides</SelectItem>
                  <SelectItem value="Neighborhood Guide">Neighborhood Guides</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="neighborhood-filter">Filter by Neighborhood</Label>
              <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
                <SelectTrigger id="neighborhood-filter">
                  <SelectValue placeholder="All Neighborhoods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Neighborhoods</SelectItem>
                  {neighborhoods.map(n => (
                    <SelectItem key={n.id} value={n.id}>{n.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const Icon = resource.icon;
              const neighborhood = resource.neighborhood
                ? neighborhoods.find(n => n.id === resource.neighborhood)
                : null;

              return (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2">{resource.category}</Badge>
                        {neighborhood && (
                          <Badge variant="outline" className="ml-2">
                            {neighborhood.name}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleDownload(resource)}
                      className="w-full gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Free
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No resources found matching your filters. Try adjusting your selection.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Optional Post-Download Lead Capture Dialog */}
      <Dialog open={showLeadDialog} onOpenChange={setShowLeadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <DialogTitle>Download Complete!</DialogTitle>
            </div>
            <DialogDescription>
              Your resource "{downloadedResource}" has been downloaded. Would you like personalized insights for your specific situation?
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleLeadSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="lead-name">Name</Label>
              <Input
                id="lead-name"
                placeholder="Your name"
                value={leadFormData.name}
                onChange={(e) => setLeadFormData({ ...leadFormData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="lead-email">Email</Label>
              <Input
                id="lead-email"
                type="email"
                placeholder="your@email.com"
                value={leadFormData.email}
                onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="lead-phone">Phone</Label>
              <Input
                id="lead-phone"
                type="tel"
                placeholder="(409) 555-1234"
                value={leadFormData.phone}
                onChange={(e) => setLeadFormData({ ...leadFormData, phone: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Get Personalized Insights
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowLeadDialog(false)}
              >
                Maybe Later
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              I'll reach out within 24 hours with insights tailored to your needs.
            </p>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default ResourcesPage;

