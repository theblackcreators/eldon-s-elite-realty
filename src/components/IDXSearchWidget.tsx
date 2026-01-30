import { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

interface IDXSearchWidgetProps {
  widgetId?: string;
  neighborhood?: string;
  zipCodes?: string[];
  className?: string;
}

const IDXSearchWidget = ({ widgetId, neighborhood, zipCodes, className = '' }: IDXSearchWidgetProps) => {
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This will load the HAR IDX widget script when you add your credentials
    // For now, it's a placeholder that you'll activate with your IDX embed code
    
    // Example of how to load IDX script (uncomment and modify when you have credentials):
    /*
    const script = document.createElement('script');
    script.src = 'YOUR_IDX_PROVIDER_SCRIPT_URL';
    script.async = true;
    script.onload = () => {
      // Initialize IDX widget with your configuration
      if (window.idxWidget) {
        window.idxWidget.init({
          widgetId: widgetId || 'default',
          zipCodes: zipCodes,
          // Add other IDX configuration options
        });
      }
    };
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
    */
  }, [widgetId, zipCodes]);

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          <CardTitle>
            {neighborhood ? `Search ${neighborhood} Homes` : 'Search MLS Listings'}
          </CardTitle>
        </div>
        <CardDescription>
          {neighborhood 
            ? `Browse active listings in ${neighborhood} (${zipCodes?.join(', ')})`
            : 'Search all available properties in Northeast Houston'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* IDX Widget Container */}
        <div 
          ref={widgetContainerRef}
          id={widgetId || 'idx-search-widget'}
          className="min-h-[400px] bg-muted/30 rounded-lg p-6 flex flex-col items-center justify-center"
        >
          {/* Placeholder - Replace with your HAR IDX embed code */}
          <div className="text-center space-y-4">
            <Search className="h-16 w-16 text-muted-foreground mx-auto" />
            <div>
              <h3 className="font-semibold text-lg mb-2">HAR IDX Integration Ready</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                To activate live MLS listings, add your HAR IDX embed code to this component.
              </p>
              <div className="mt-4 p-4 bg-background rounded border text-left">
                <p className="text-xs font-mono text-muted-foreground">
                  Location: src/components/IDXSearchWidget.tsx
                </p>
                {zipCodes && (
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    Configured for ZIP: {zipCodes.join(', ')}
                  </p>
                )}
              </div>
            </div>
            <div className="pt-4">
              <a 
                href="https://www.har.com/idx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Get your HAR IDX embed code →
              </a>
            </div>
          </div>
        </div>

        {/* Instructions for activation */}
        <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm">
          <p className="font-semibold mb-2">To Activate:</p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li>Log in to your HAR IDX dashboard</li>
            <li>Generate your embed code or widget ID</li>
            <li>Add the script to this component (see code comments)</li>
            <li>Configure ZIP codes and search parameters</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default IDXSearchWidget;

