import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Luxcity"
        description="Luxcity's privacy policy outlining how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, Luxcity privacy"
      />
      
      <div className="pt-[80px] pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-archivo font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                At Luxcity, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p className="text-gray-700">
                By using our website or services, you consent to the data practices described in this policy. If you do not agree with the practices described in this policy, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Register for an account or use our services</li>
                <li>Fill out contact forms or request information</li>
                <li>Subscribe to our newsletters or marketing communications</li>
                <li>Participate in surveys or provide feedback</li>
                <li>Contact us via email, phone, or other communication methods</li>
              </ul>
              <p className="text-gray-700 mb-4">
                This information may include:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Name and contact information (email address, phone number, postal address)</li>
                <li>Company name and job title</li>
                <li>Property preferences and search criteria</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4">
                When you visit our website, we automatically collect certain information about your device and browsing behavior, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Device identifiers</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>To provide, maintain, and improve our services</li>
                <li>To process transactions and manage your account</li>
                <li>To personalize your experience and provide tailored property recommendations</li>
                <li>To communicate with you about our services, updates, and promotional offers</li>
                <li>To respond to your inquiries, comments, or requests</li>
                <li>To analyze usage patterns and improve our website functionality</li>
                <li>To detect, prevent, and address technical issues or security threats</li>
                <li>To comply with legal obligations and enforce our terms of service</li>
                <li>To conduct research and analytics to improve our AI-powered services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Service Providers</h3>
              <p className="text-gray-700 mb-4">
                We may share your information with trusted third-party service providers who assist us in operating our website, conducting business, or serving our users. These providers are contractually obligated to protect your information and use it only for the purposes we specify.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Business Transfers</h3>
              <p className="text-gray-700 mb-4">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change in ownership or control of your personal information.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, government agencies).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.4 With Your Consent</h3>
              <p className="text-gray-700 mb-4">
                We may share your information with third parties when you have given us explicit consent to do so.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication procedures</li>
                <li>Secure data storage and backup systems</li>
                <li>Employee training on data protection practices</li>
              </ul>
              <p className="text-gray-700">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are small data files stored on your device that help us improve your experience.
              </p>
              <p className="text-gray-700 mb-4">
                Types of cookies we use:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
              <p className="text-gray-700">
                You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
                <li><strong>Restriction:</strong> Request restriction of processing your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your personal information to another service</li>
                <li><strong>Withdrawal of Consent:</strong> Withdraw consent where processing is based on consent</li>
              </ul>
              <p className="text-gray-700">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
              </p>
              <p className="text-gray-700">
                Factors that determine retention periods include:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>The nature of the information</li>
                <li>Legal and regulatory requirements</li>
                <li>Business needs and operational requirements</li>
                <li>Your relationship with us</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child without parental consent, we will take steps to delete that information promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Third-Party Links</h2>
              <p className="text-gray-700">
                Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. International Data Transfers</h2>
              <p className="text-gray-700">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. We take appropriate measures to ensure that your information receives an adequate level of protection in accordance with this Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Posting the updated policy on our website</li>
                <li>Updating the "Last updated" date at the top of this policy</li>
                <li>Sending you an email notification (if you have provided your email address)</li>
              </ul>
              <p className="text-gray-700">
                We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>Luxcity</strong>
                </p>
                <p className="text-gray-700 mb-2">
                  86-90 Paul Street<br />
                  London EC2A 4NE<br />
                  United Kingdom
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> contactus@theluxcity.co.uk
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> +44 (0) 203 189 1276
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

