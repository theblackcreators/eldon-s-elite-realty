import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home } from 'lucide-react';

const HomeValuationTool = () => {

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Free Home Valuation</h2>
            <p className="text-xl text-muted-foreground">
              Get an instant estimate of your home's value based on current Northeast Houston market data
            </p>
          </div>

          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Home className="h-6 w-6 text-primary" />
                Get Your Home's Value
              </CardTitle>
              <CardDescription>
                Enter your property address to receive a comprehensive market analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* HAR IDX Home Value Search Widget */}
              <div className="idx-hero-search">
                <iframe
                  src="https://www.har.com/idx/mls/homevalue/search?sitetype=aws&cid=675220"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  style={{ border: 'none', borderRadius: '8px' }}
                  title="HAR Home Value Search"
                />
              </div>

              <p className="text-xs text-muted-foreground text-center mt-6">
                Your information is secure and will only be used to provide your home valuation report.
                A detailed comparative market analysis will be sent to your email within 24 hours.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeValuationTool;

