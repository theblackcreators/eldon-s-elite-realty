import { useEffect, useRef } from 'react';
import { loadIDXScripts } from '@/config/idxConfig';

interface IDXContainerProps {
  embedCode: string;
  className?: string;
  title?: string;
  description?: string;
}

/**
 * Reusable IDX Container Component
 *
 * This component safely renders HAR IDX embed codes.
 * It handles script loading and HTML injection.
 */
const IDXContainer = ({ embedCode, className = '', title, description }: IDXContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load IDX scripts on mount
    loadIDXScripts();

    // Inject embed code into container
    if (containerRef.current && embedCode) {
      containerRef.current.innerHTML = embedCode;

      // Execute any inline scripts in the embed code
      const scripts = containerRef.current.getElementsByTagName('script');
      Array.from(scripts).forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        newScript.async = true;
        script.parentNode?.replaceChild(newScript, script);
      });

      // Hide fallback UI after iframe is injected
      const fallbackElements = document.querySelectorAll('.idx-fallback');
      fallbackElements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
    }
  }, [embedCode]);

  return (
    <div className={`idx-container ${className}`}>
      {title && (
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div ref={containerRef} className="idx-embed-wrapper min-h-[400px]" />
    </div>
  );
};

export default IDXContainer;

