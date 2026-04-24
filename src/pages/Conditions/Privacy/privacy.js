import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-eco-background py-16 px-6 relative overflow-hidden font-sans">
      {/* Decorative background elements */}
      <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-eco-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-eco-secondary/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-xl border border-white/40 p-8 md:p-16 animate-fade-in">
          <header className="mb-12 border-b border-gray-100 pb-8">
            <h1 className="text-4xl md:text-5xl font-black text-eco-text tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-eco-muted font-medium text-lg italic">
              Last updated: April 24, 2026
            </p>
          </header>

          <div className="prose prose-eco max-w-none text-eco-text leading-relaxed space-y-8">
            <section>
              <p className="text-lg">
                At Eco Collectors, accessible from{' '}
                <a href="/" className="text-eco-primary font-bold hover:underline transition-all">
                  Eco-Collectors
                </a>
                , one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Eco Collectors and how we use it.
              </p>
              <p className="mt-4">
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-eco-text mb-4 flex items-center">
                <span className="w-2 h-8 bg-eco-primary rounded-full mr-4"></span>
                Consent
              </h2>
              <p>
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-eco-text mb-4 flex items-center">
                <span className="w-2 h-8 bg-eco-primary rounded-full mr-4"></span>
                Information we collect
              </h2>
              <p>
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              </p>
              <p className="mt-4">
                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-eco-text mb-4 flex items-center">
                <span className="w-2 h-8 bg-eco-primary rounded-full mr-4"></span>
                How we use your information
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                {[
                  "Provide, operate, and maintain our website",
                  "Improve, personalize, and expand our website",
                  "Understand and analyze how you use our website",
                  "Develop new products and functionality",
                  "Communicate with you for customer service",
                  "Send you emails regarding your requests",
                  "Find and prevent fraud"
                ].map((item, i) => (
                  <li key={i} className="bg-eco-primary/5 p-4 rounded-xl flex items-start space-x-3">
                    <svg className="w-5 h-5 text-eco-primary mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    <span className="font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-eco-text mb-4 flex items-center">
                <span className="w-2 h-8 bg-eco-primary rounded-full mr-4"></span>
                GDPR Data Protection Rights
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
                <div className="grid grid-cols-1 gap-4 text-sm font-medium">
                  <div className="flex items-center space-x-3 p-2 border-b border-gray-100">
                    <span className="text-eco-primary font-bold">01.</span>
                    <span>The right to access – Request copies of your personal data.</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 border-b border-gray-100">
                    <span className="text-eco-primary font-bold">02.</span>
                    <span>The right to rectification – Request correction of inaccurate information.</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 border-b border-gray-100">
                    <span className="text-eco-primary font-bold">03.</span>
                    <span>The right to erasure – Request deletion of your personal data.</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2">
                    <span className="text-eco-primary font-bold">04.</span>
                    <span>The right to data portability – Request transfer of collected data.</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-xl font-black text-eco-text">Have Questions?</h3>
                <p className="text-eco-muted font-medium">We're here to help you understand your rights.</p>
              </div>
              <a href="/contact-us" className="btn-primary px-10 py-3 shadow-lg shadow-eco-primary/20 whitespace-nowrap">
                Contact Support
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
