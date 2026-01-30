import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accessibility } from 'lucide-react';

const AccessibilityPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Accessibility className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">Accessibility Statement</h1>
          </div>
          <p className="text-muted-foreground">
            Last Updated: January 29, 2026
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Commitment to Accessibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              Eldon Peterson and Connect Realty TX are committed to ensuring digital accessibility for people 
              with disabilities. We are continually improving the user experience for everyone and applying the 
              relevant accessibility standards to ensure we provide equal access to all of our users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Conformance Status</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. 
              These guidelines explain how to make web content more accessible for people with disabilities and 
              user-friendly for everyone.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our website has been designed with accessibility in mind, incorporating features such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
              <li>Semantic HTML markup for proper document structure</li>
              <li>Keyboard navigation support throughout the website</li>
              <li>Alternative text for images and visual content</li>
              <li>Sufficient color contrast ratios for text readability</li>
              <li>Responsive design that works across different devices and screen sizes</li>
              <li>Clear and consistent navigation structure</li>
              <li>Descriptive link text and button labels</li>
              <li>Form labels and error messages for screen readers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Accessibility Features</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-4">Navigation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our website can be navigated using a keyboard. Use the Tab key to move forward through links 
              and form controls, Shift+Tab to move backward, and Enter to activate links and buttons.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">Text Sizing</h3>
            <p className="text-muted-foreground leading-relaxed">
              You can adjust text size using your browser's zoom function (typically Ctrl/Cmd + or -). Our 
              responsive design ensures content remains readable at different zoom levels.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">Screen Readers</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our website is compatible with popular screen readers including JAWS, NVDA, and VoiceOver. We 
              use proper heading hierarchy, ARIA labels, and semantic HTML to ensure content is properly 
              announced to screen reader users.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">Color and Contrast</h3>
            <p className="text-muted-foreground leading-relaxed">
              We have designed our website with sufficient color contrast to ensure text is readable for users 
              with visual impairments, including color blindness. Important information is not conveyed by 
              color alone.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Third-Party Content</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website includes third-party content and services, including property search tools from the 
              Houston Association of REALTORS® (HAR), LERA MLS, Beaumont Board of Realtors®, and Builders Update. 
              While we strive to ensure all content is accessible, we cannot guarantee the accessibility of 
              third-party embedded content. We encourage these providers to maintain accessible platforms and 
              will work with them to address any accessibility concerns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Known Limitations</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Despite our best efforts, some content on our website may not yet be fully accessible. We are 
              aware of the following limitations and are working to address them:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Some third-party IDX property search tools may have limited accessibility features</li>
              <li>Certain PDF documents may not be fully accessible to screen readers</li>
              <li>Some property images may lack detailed alternative text descriptions</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We are committed to addressing these issues in future updates to our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Ongoing Improvements</h2>
            <p className="text-muted-foreground leading-relaxed">
              Accessibility is an ongoing effort. We regularly review our website and make improvements to 
              enhance accessibility. Our team receives training on accessibility best practices, and we 
              incorporate accessibility considerations into our development process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Feedback and Assistance</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We welcome your feedback on the accessibility of our website. If you encounter any accessibility 
              barriers or have suggestions for improvement, please let us know.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <strong>Should you require assistance in navigating our website or searching for real estate,
              please contact our offices at <a href="tel:4092237288" className="text-accent hover:underline font-semibold">409-223-7288</a>.</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are happy to provide information in alternative formats or assist you in accessing property 
              information through other means. Our team is available to help you with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
              <li>Property searches and listings</li>
              <li>Scheduling property viewings</li>
              <li>Providing property information in accessible formats</li>
              <li>Answering questions about our services</li>
              <li>Assisting with form submissions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              For accessibility-related inquiries or assistance, please contact:
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="font-semibold">Eldon Peterson</p>
              <p className="text-sm">Real Estate Broker, TREC# 675220</p>
              <p className="text-sm">Connect Realty TREC# 573369</p>
              <p className="text-sm mt-2"><strong>Primary Office:</strong></p>
              <p className="text-sm">2170 Buckthorne Pl. #100, The Woodlands, TX 77380</p>
              <p className="text-sm">Phone: <a href="tel:4092237288" className="text-accent hover:underline">(409) 223-7288</a></p>
              <p className="text-sm mt-2"><strong>Additional Office:</strong></p>
              <p className="text-sm">3560 Delaware St, Suite 308, Beaumont, TX 77706</p>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We aim to respond to accessibility feedback within 2 business days and will work with you to 
              provide the information or assistance you need in an accessible format.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Technical Specifications</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website's accessibility relies on the following technologies to work with the particular 
              combination of web browser and assistive technologies or plugins installed on your computer:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
              <li>HTML5</li>
              <li>CSS3</li>
              <li>JavaScript (React)</li>
              <li>WAI-ARIA (Accessible Rich Internet Applications)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              These technologies are relied upon for conformance with the accessibility standards used.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Assessment and Testing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We assess the accessibility of our website through:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
              <li>Self-evaluation using automated accessibility testing tools</li>
              <li>Manual testing with keyboard navigation</li>
              <li>Screen reader testing with popular assistive technologies</li>
              <li>Review of WCAG 2.1 Level AA compliance criteria</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccessibilityPage;

