import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-muted-foreground">
            Last Updated: January 29, 2026
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Eldon Peterson, a licensed Real Estate Broker (TREC# 675220) with Connect Realty TREC# 573369, is committed
              to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website and use our real estate services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-4">Personal Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Submit contact forms or lead capture forms</li>
              <li>Request a home valuation</li>
              <li>Sign up for property alerts or newsletters</li>
              <li>Schedule property showings or consultations</li>
              <li>Communicate with us via phone, email, or text message</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              This information may include: name, email address, phone number, mailing address, property 
              preferences, and any other information you choose to provide.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">Automatically Collected Information</h3>
            <p className="text-muted-foreground leading-relaxed">
              When you visit our website, we may automatically collect certain information about your device, 
              including information about your web browser, IP address, time zone, and some of the cookies 
              installed on your device. We may also collect information about your browsing behavior, such as 
              pages viewed and links clicked.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Provide real estate services and respond to your inquiries</li>
              <li>Send you property listings that match your search criteria</li>
              <li>Communicate with you about your real estate needs</li>
              <li>Provide home valuations and market analysis</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations and industry regulations</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. MLS and IDX Data</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Our website displays property listings through Internet Data Exchange (IDX) programs from the 
              Houston Association of REALTORS® (HAR), LERA MLS, and Beaumont Board of Realtors®. When you 
              interact with these IDX tools:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Your search activity may be tracked to provide better property recommendations</li>
              <li>Property viewing history may be stored to show you recently viewed listings</li>
              <li>Your information may be shared with listing agents when you inquire about specific properties</li>
              <li>MLS data is subject to the privacy policies of the respective MLS organizations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use cookies and similar tracking technologies to track activity on our website and store 
              certain information. Cookies are files with a small amount of data that may include an anonymous 
              unique identifier.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
              However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We may use third-party service providers to help us operate our website and provide services, 
              including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>HAR IDX for property search functionality</li>
              <li>Builders Update for new construction listings</li>
              <li>Email marketing platforms</li>
              <li>Website analytics tools</li>
              <li>Customer relationship management (CRM) systems</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              These third parties have access to your personal information only to perform specific tasks on 
              our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>With listing agents when you inquire about their properties</li>
              <li>With service providers who assist us in our business operations</li>
              <li>When required by law or to protect our legal rights</li>
              <li>In connection with a business transfer or acquisition</li>
              <li>With your explicit consent</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Your Privacy Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Data Portability:</strong> Request transfer of your data to another service</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal 
              information. However, no method of transmission over the Internet or electronic storage is 100% 
              secure. While we strive to use commercially acceptable means to protect your information, we 
              cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website is not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If you become aware that a child has provided us 
              with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact:
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="font-semibold">Eldon Peterson</p>
              <p className="text-sm">Real Estate Broker, TREC# 675220</p>
              <p className="text-sm">Connect Realty TREC# 573369</p>
              <p className="text-sm">2170 Buckthorne Pl. #100, The Woodlands, TX 77380</p>
              <p className="text-sm">Phone: <a href="tel:4092237288" className="text-accent hover:underline">(409) 223-7288</a></p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;

