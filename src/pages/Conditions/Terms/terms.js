import React from 'react';

function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-eco-background py-16 px-6 relative overflow-hidden font-sans">
      {/* Decorative background elements */}
      <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-eco-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-eco-secondary/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-xl border border-white/40 p-8 md:p-16 animate-fade-in">
          <header className="mb-12 border-b border-gray-100 pb-8 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-eco-text tracking-tight mb-4">
              Terms & Conditions
            </h1>
            <p className="text-eco-muted font-medium text-lg">
              Effective Date: May 19, 2023
            </p>
          </header>

          <div className="prose prose-eco max-w-none text-eco-text leading-relaxed space-y-12">
            <section className="bg-eco-primary/5 p-8 rounded-2xl border border-eco-primary/10">
              <p className="text-lg font-medium">
                These terms and conditions ("Agreement") set forth the general terms and conditions of your use of the{' '}
                <a href="/" className="text-eco-primary font-bold hover:underline transition-all">
                  Eco-Collectors
                </a>{' '}
                website ("Website" or "Service") and any of its related products and services (collectively, "Services").
              </p>
            </section>

            <section className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-black text-eco-text mb-6 uppercase tracking-wider">Table of contents</h3>
              <nav>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 list-none p-0">
                  {[
                    { id: "accounts-and-membership", label: "Accounts and membership" },
                    { id: "user-content", label: "User content" },
                    { id: "backups", label: "Backups" },
                    { id: "links-to-other-resources", label: "Links to other resources" },
                    { id: "prohibited-uses", label: "Prohibited uses" },
                    { id: "limitation-of-liability", label: "Limitation of liability" },
                    { id: "changes-and-amendments", label: "Changes and amendments" },
                    { id: "acceptance-of-these-terms", label: "Acceptance of these terms" },
                    { id: "contacting-us", label: "Contacting us" }
                  ].map((item, index) => (
                    <li key={index}>
                      <a 
                        href={`#${item.id}`} 
                        className="text-eco-text hover:text-eco-primary font-bold flex items-center space-x-2 transition-colors duration-200"
                      >
                        <span className="w-1.5 h-1.5 bg-eco-primary rounded-full"></span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </section>

            <section id="accounts-and-membership">
              <h2 className="text-2xl font-black text-eco-text mb-6 flex items-center">
                <span className="w-2 h-8 bg-eco-primary rounded-full mr-4"></span>
                Accounts and membership
              </h2>
              <div className="space-y-4">
                <p>
                  You must be at least 13 years of age to use the Website and Services. By using the Website and Services and by agreeing to this Agreement you warrant and represent that you are at least 13 years of age.
                </p>
                <p>
                  If you create an account on the Website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it.
                </p>
              </div>
            </section>

            <section id="user-content">
              <h2 className="text-2xl font-black text-eco-text mb-6 flex items-center">
                <span className="w-2 h-8 bg-eco-primary rounded-full mr-4"></span>
                User content
              </h2>
              <p>
                We do not own any data, information or material (collectively, "Content") that you submit on the Website in the course of using the Service. You shall have sole responsibility for the accuracy, quality, integrity, legality, reliability, appropriateness, and intellectual property ownership or right to use of all submitted Content.
              </p>
            </section>

            <section id="prohibited-uses">
              <h2 className="text-2xl font-black text-eco-text mb-6 flex items-center">
                <span className="w-2 h-8 bg-eco-primary rounded-full mr-4"></span>
                Prohibited uses
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "Unlawful purposes or solicitation of unlawful acts",
                  "Violation of international or local regulations",
                  "Infringement upon intellectual property rights",
                  "Harassment, abuse, or discrimination of any kind",
                  "Submission of false or misleading information",
                  "Uploading viruses or malicious code",
                  "Interference with security features"
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 bg-red-50/50 rounded-xl border border-red-100 text-sm font-medium">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="contacting-us" className="pt-12 border-t border-gray-100">
              <div className="bg-eco-primary/10 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="text-2xl font-black text-eco-text mb-2">Questions about these terms?</h2>
                  <p className="text-eco-muted font-medium">Our legal team is ready to assist you.</p>
                </div>
                <div className="flex flex-col items-center md:items-end">
                  <span className="text-eco-primary font-black text-lg mb-2">info@eco-collectors.co.il</span>
                  <a href="/contact-us" className="btn-primary px-8 py-3 shadow-xl shadow-eco-primary/20">
                    Contact Us
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
