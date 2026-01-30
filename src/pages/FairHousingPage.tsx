import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Home } from 'lucide-react';

const FairHousingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Home className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">Fair Housing Statement</h1>
          </div>
          <p className="text-muted-foreground">
            Equal Housing Opportunity
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          {/* Equal Housing Opportunity Logo Section */}
          <section className="bg-muted/30 p-6 rounded-lg border">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-6xl">⚖️</div>
              <div className="text-center">
                <p className="text-2xl font-bold">EQUAL HOUSING</p>
                <p className="text-xl font-semibold">OPPORTUNITY</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Commitment to Fair Housing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Eldon Peterson and Connect Realty TX are committed to compliance with all federal, state, and 
              local fair housing laws. We are pledged to the letter and spirit of U.S. policy for the 
              achievement of equal housing opportunity throughout the Nation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Federal Fair Housing Act</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The Fair Housing Act (Title VIII of the Civil Rights Act of 1968, as amended) prohibits 
              discrimination in the sale, rental, and financing of dwellings, and in other housing-related 
              transactions, based on the following protected classes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Race</strong></li>
              <li><strong>Color</strong></li>
              <li><strong>National Origin</strong></li>
              <li><strong>Religion</strong></li>
              <li><strong>Sex (including gender identity and sexual orientation)</strong></li>
              <li><strong>Familial Status (families with children under 18)</strong></li>
              <li><strong>Disability (physical or mental)</strong></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Texas Fair Housing Laws</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              In addition to federal protections, Texas law provides additional fair housing protections. 
              The Texas Fair Housing Act mirrors federal law and is enforced by the Texas Workforce Commission 
              Civil Rights Division.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              As a licensed Texas Real Estate Broker (TREC# 675220), I am bound by the Texas Real Estate 
              Commission's rules and regulations regarding fair housing compliance and ethical conduct.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Prohibited Discriminatory Practices</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Under fair housing laws, it is illegal to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Refuse to rent or sell housing</li>
              <li>Refuse to negotiate for housing</li>
              <li>Make housing unavailable</li>
              <li>Deny a dwelling</li>
              <li>Set different terms, conditions, or privileges for sale or rental</li>
              <li>Provide different housing services or facilities</li>
              <li>Falsely deny that housing is available for inspection, sale, or rental</li>
              <li>For profit, persuade owners to sell or rent (blockbusting)</li>
              <li>Deny anyone access to or membership in a facility or service related to the sale or rental of housing</li>
              <li>Threaten, coerce, intimidate, or interfere with anyone exercising a fair housing right</li>
              <li>Advertise or make any statement that indicates a limitation or preference based on protected class</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Reasonable Accommodations and Modifications</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Under the Fair Housing Act, housing providers must:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Make reasonable exceptions in their policies and operations to afford people with disabilities 
              equal housing opportunities (reasonable accommodations)</li>
              <li>Allow tenants with disabilities to make reasonable access-related modifications to their 
              private living space, as well as to common use spaces (reasonable modifications)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Non-Discrimination Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Eldon Peterson and Connect Realty TX will not discriminate against any person because of race, 
              color, religion, sex, handicap, familial status, national origin, sexual orientation, or gender 
              identity in the sale, rental, lease, financing, or advertising of housing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are committed to providing professional real estate services to all clients and customers 
              without regard to their protected class status. All clients will receive equal professional 
              service, and all listings will be marketed without regard to protected class.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Advertising and Marketing</h2>
            <p className="text-muted-foreground leading-relaxed">
              All of our advertising and marketing materials comply with fair housing laws. We do not use 
              words, phrases, photographs, illustrations, symbols, or forms that communicate any preference, 
              limitation, or discrimination based on protected class. Our property listings and marketing 
              materials focus on the features and benefits of the properties themselves.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Filing a Fair Housing Complaint</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              If you believe you have experienced discrimination in housing, you have the right to file a 
              complaint. Complaints may be filed with:
            </p>

            <div className="space-y-4 mt-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-semibold mb-2">U.S. Department of Housing and Urban Development (HUD)</p>
                <p className="text-sm text-muted-foreground">Phone: 1-800-669-9777 (Voice)</p>
                <p className="text-sm text-muted-foreground">Phone: 1-800-927-9275 (TTY)</p>
                <p className="text-sm text-muted-foreground">Website: www.hud.gov/fairhousing</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Complaints must be filed within one year of the alleged discriminatory act.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Texas Workforce Commission Civil Rights Division</p>
                <p className="text-sm text-muted-foreground">Phone: 1-888-452-4778 (Toll-Free)</p>
                <p className="text-sm text-muted-foreground">Phone: 512-463-2642 (Austin)</p>
                <p className="text-sm text-muted-foreground">Website: www.twc.texas.gov/jobseekers/civil-rights-division</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Texas Real Estate Commission (TREC)</p>
                <p className="text-sm text-muted-foreground">Phone: 512-936-3000</p>
                <p className="text-sm text-muted-foreground">Website: www.trec.texas.gov</p>
                <p className="text-sm text-muted-foreground mt-2">
                  For complaints regarding licensed real estate professionals in Texas.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              For more information about fair housing rights and responsibilities:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>HUD Fair Housing and Equal Opportunity: www.hud.gov/program_offices/fair_housing_equal_opp</li>
              <li>National Fair Housing Alliance: www.nationalfairhousing.org</li>
              <li>Texas Appleseed Fair Housing Project: www.texasappleseed.org</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Questions or Concerns</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              If you have questions about fair housing or our non-discrimination policies, please contact:
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
          </section>

          <section className="bg-primary/5 p-6 rounded-lg border-2 border-primary/20">
            <p className="text-center font-semibold text-lg mb-2">
              EQUAL HOUSING OPPORTUNITY
            </p>
            <p className="text-center text-sm text-muted-foreground">
              We are pledged to the letter and spirit of U.S. policy for the achievement of equal housing 
              opportunity throughout the Nation. We encourage and support an affirmative advertising and 
              marketing program in which there are no barriers to obtaining housing because of race, color, 
              religion, sex, handicap, familial status, or national origin.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FairHousingPage;

