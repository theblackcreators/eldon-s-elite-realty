import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Scale } from 'lucide-react';

const TermsOfUsePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">Terms of Use</h1>
          </div>
          <p className="text-muted-foreground">
            Last Updated: January 29, 2026
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using this website operated by Eldon Peterson, a licensed Real Estate Broker
              (TREC# 675220) with Connect Realty TREC# 573369, you accept and agree to be bound by the terms and provision
              of this agreement. If you do not agree to these terms, please do not use this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Use of Website</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              This website is provided for informational purposes related to real estate services in the 
              Northeast Houston area, including but not limited to Atascocita, Humble, Kingwood, Summerwood, 
              Fall Creek, and EaDo neighborhoods.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You agree to use this website only for lawful purposes and in a manner that does not infringe 
              the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Intellectual Property Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The content, organization, graphics, design, compilation, magnetic translation, digital conversion, 
              and other matters related to this website are protected under applicable copyrights, trademarks, 
              and other proprietary rights.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The copying, redistribution, use, or publication by you of any such matters or any part of this 
              website is strictly prohibited. You may not use our materials on other websites or in any 
              environment of networked computers without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. MLS Data and IDX Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Property listing information displayed on this website is provided through Internet Data Exchange 
              (IDX) programs from the Houston Association of REALTORS® (HAR), LERA MLS, and Beaumont Board of 
              Realtors®. This information is for consumers' personal, non-commercial use and may not be used 
              for any purpose other than to identify prospective properties consumers may be interested in purchasing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The accuracy of all information, regardless of source, is deemed reliable but not guaranteed and 
              should be personally verified through personal inspection by and/or with the appropriate professionals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. User Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              When submitting information through contact forms, lead capture forms, or home valuation tools, 
              you agree to provide accurate, current, and complete information. You are responsible for 
              maintaining the confidentiality of any account information and for all activities that occur 
              under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Third-Party Links and Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              This website may contain links to third-party websites, including but not limited to HAR IDX, 
              Builders Update, and other real estate resources. We are not responsible for the content, 
              accuracy, or opinions expressed on such websites, and such websites are not investigated, 
              monitored, or checked for accuracy or completeness by us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Eldon Peterson and Connect Realty TX shall not be liable for any direct, indirect, incidental, 
              special, or consequential damages arising out of the use or inability to use this website or 
              any information provided herein.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Real estate transactions involve significant financial and legal considerations. This website 
              does not constitute legal, financial, or tax advice. You should consult with appropriate 
              professionals before making any real estate decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              This website and all information, content, materials, and services included on or otherwise 
              made available to you through this website are provided on an "as is" and "as available" basis, 
              unless otherwise specified in writing. We make no representations or warranties of any kind, 
              express or implied, as to the operation of this website or the information, content, materials, 
              or services included on or otherwise made available to you through this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Use shall be governed by and construed in accordance with the laws of the State 
              of Texas, without regard to its conflict of law provisions. Any legal action or proceeding 
              relating to your access to, or use of, this website shall be instituted in a state or federal 
              court in Harris County or Montgomery County, Texas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. Your continued use of the website 
              following any changes indicates your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Use, please contact:
            </p>
            <div className="bg-muted/50 p-4 rounded-lg mt-3">
              <p className="font-semibold">Eldon Peterson</p>
              <p className="text-sm">Real Estate Broker, TREC# 675220</p>
              <p className="text-sm">Connect Realty TREC# 573369</p>
              <p className="text-sm">Phone: <a href="tel:4092237288" className="text-accent hover:underline">(409) 223-7288</a></p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfUsePage;

