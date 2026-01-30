import { useState } from 'react';
import { testimonials } from '@/data/testimonials';
import { neighborhoods } from '@/data/neighborhoods';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');

  const filteredTestimonials = selectedNeighborhood === 'all'
    ? testimonials
    : testimonials.filter(t => {
        const neighborhood = neighborhoods.find(n => n.name === t.neighborhood);
        return neighborhood?.id === selectedNeighborhood;
      });

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Client Success Stories</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Hear from satisfied clients across Northeast Houston communities
          </p>
          
          <div className="max-w-xs mx-auto">
            <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
              <SelectTrigger>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-2 mb-4">
                  <Quote className="h-8 w-8 text-primary/30 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">{testimonial.neighborhood}</Badge>
                    <Badge variant="outline">{testimonial.zipCode}</Badge>
                    <Badge variant="default">{testimonial.propertyType}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(testimonial.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No testimonials found for this neighborhood yet.
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-8 p-6 bg-card rounded-lg border">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">300+</p>
              <p className="text-sm text-muted-foreground">Homes Sold</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">5.0</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">10+</p>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

