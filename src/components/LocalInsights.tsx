import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Newspaper, TrendingUp, GraduationCap } from 'lucide-react';

interface LocalInsight {
  title: string;
  date: string;
  category: 'event' | 'news' | 'market' | 'school';
  description: string;
}

interface LocalInsightsProps {
  neighborhoodName: string;
}

const LocalInsights = ({ neighborhoodName }: LocalInsightsProps) => {
  // Dynamic insights based on neighborhood
  const insights: LocalInsight[] = [
    {
      title: `${neighborhoodName} Community Events Calendar`,
      date: 'Updated Monthly',
      category: 'event',
      description: `Stay connected with local events including farmers markets, festivals, and community gatherings. ${neighborhoodName} hosts regular events that bring neighbors together and celebrate our vibrant community.`
    },
    {
      title: 'Local Market Trends & Analysis',
      date: 'Updated Weekly',
      category: 'market',
      description: `Current market conditions show ${neighborhoodName} continues to be a strong investment. Recent sales data indicates steady appreciation with high buyer demand and competitive pricing.`
    },
    {
      title: 'School District Updates',
      date: 'Updated Quarterly',
      category: 'school',
      description: `Local schools in ${neighborhoodName} continue to excel with new programs, facility improvements, and strong academic performance. Stay informed about enrollment periods and district news.`
    },
    {
      title: 'Community Development News',
      date: 'Updated Bi-Weekly',
      category: 'news',
      description: `New businesses, infrastructure improvements, and community projects are enhancing ${neighborhoodName}. Recent additions include retail centers, parks, and recreational facilities.`
    }
  ];

  const getCategoryIcon = (category: LocalInsight['category']) => {
    switch (category) {
      case 'event':
        return <Calendar className="h-5 w-5" />;
      case 'news':
        return <Newspaper className="h-5 w-5" />;
      case 'market':
        return <TrendingUp className="h-5 w-5" />;
      case 'school':
        return <GraduationCap className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: LocalInsight['category']) => {
    switch (category) {
      case 'event':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'news':
        return 'bg-purple-500/10 text-purple-700 border-purple-200';
      case 'market':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'school':
        return 'bg-orange-500/10 text-orange-700 border-orange-200';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Local Insights & Updates
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay informed about what's happening in {neighborhoodName}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {insights.map((insight, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-2 rounded-lg ${getCategoryColor(insight.category)}`}>
                      {getCategoryIcon(insight.category)}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {insight.date}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{insight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-center text-sm text-muted-foreground">
              <strong>Want personalized market updates?</strong> Contact Eldon Peterson at{' '}
              <a href="tel:4092237288" className="text-primary hover:underline font-semibold">
                (409) 223-7288
              </a>{' '}
              to receive exclusive insights about {neighborhoodName} delivered to your inbox.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalInsights;

