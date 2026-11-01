import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full">
          Legal & Transparency
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Last Updated: November 1, 2026 • Effective Date: January 1, 2026 • Website: alltoolspk.com
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base">
        {/* Intro */}
        <section className="space-y-3">
          <p>
            Welcome to <strong>AllToolsPK</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us,&rdquo; or &ldquo;alltoolspk.com&rdquo;). AllToolsPK is an independent web utility platform founded, developed, and maintained by <strong>Fareed Ullah</strong>, based in Peshawar, Khyber Pakhtunkhwa, Pakistan. We are committed to protecting your online privacy and ensuring you have complete transparency regarding how your data is handled when you visit our website and use our collection of free online tools.
          </p>
          <p>
            This Privacy Policy outlines our comprehensive data protection practices, explains the unique <strong>client-side architecture</strong> that powers our website, and details how third-party advertising partners, specifically <strong>Google AdSense</strong>, manage cookies and advertising identifiers. By accessing or using alltoolspk.com, you consent to the terms set forth in this Privacy Policy.
          </p>
        </section>

        {/* 1. Information We Collect */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            1. Information We Collect
          </h2>
          <p>
            At AllToolsPK, our fundamental architectural philosophy is <strong>Privacy by Design</strong>. Unlike conventional online tool portals that require you to upload your sensitive files, photos, resumes, and financial records to remote servers, our applications run 100% locally within your client browser sandbox.
          </p>
          <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              A. User Content & Document Data (Zero Server Upload)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              When you use our PDF tools (PDF 3X Pro, PDF Merger, Image to PDF), Age Calculator, ATS Resume Builder, QR Code Generator, or Financial Calculators, all file processing, image compression, PDF vectorization, and data parsing occur entirely inside your computer or mobile device&apos;s volatile RAM using client-side JavaScript, WebAssembly, and HTML5 Canvas.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-300">
              <li>Your uploaded JPG, PNG, and PDF documents are never transmitted to our web servers.</li>
              <li>Your calculated salaries, accident settlement figures, and mortgage values are never recorded in any database.</li>
              <li>Your dates of birth, candidate resume entries, and personal contact notes remain strictly on your local screen.</li>
            </ul>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              B. Automatically Collected Technical Information
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Like virtually all standard web properties, our hosting infrastructure and performance monitors may automatically log standard non-personally identifiable diagnostic information when your browser requests a page. This includes:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-300">
              <li>Internet Protocol (IP) address (anonymized for geographic region verification).</li>
              <li>Browser type, software version, and operating system (e.g., Chrome on Android or Safari on iOS).</li>
              <li>Referring URL, timestamp of visit, and pages requested.</li>
              <li>Aggregated performance metrics such as page load speed and HTTP response codes.</li>
            </ul>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              C. Voluntarily Submitted Communication Information
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              If you contact us directly via our website contact form or email (contact@alltoolspk.com), we collect the personal details you voluntarily provide, such as your full name, email address, subject line, and message contents. This information is used exclusively to respond to your inquiry and is never shared, sold, or rented to third-party marketing brokers.
            </p>
          </div>
        </section>

        {/* 2. How We Use Information */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            2. How We Use Information
          </h2>
          <p>
            We strictly limit the use of any collected technical or communication data to legitimate operational purposes, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong>Operating and Maintaining AllToolsPK:</strong> Ensuring our web tools, calculators, and converters load reliably and render with maximum responsiveness across all devices and global networks.</li>
            <li><strong>Security and Fraud Prevention:</strong> Protecting our servers against automated distributed denial-of-service (DDoS) attacks, brute-force exploits, and malicious scrapers.</li>
            <li><strong>Technical Diagnostics:</strong> Identifying and resolving browser compatibility bugs, broken styling, or script execution errors.</li>
            <li><strong>Customer Support:</strong> Responding directly to user feedback, bug reports, feature requests, and partnership queries.</li>
            <li><strong>Compliance with Legal Obligations:</strong> Satisfying mandatory legal requirements, regulatory directives, and intellectual property protection laws.</li>
          </ul>
        </section>

        {/* 3. Cookies */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            3. Cookies and Local Storage Technologies
          </h2>
          <p>
            Cookies are small text files placed on your browser or device by web servers to help sites remember user preferences, facilitate site navigation, and compile aggregate analytics. In addition to cookies, AllToolsPK may use <strong>HTML5 LocalStorage</strong>.
          </p>
          <p>
            <strong>How We Use LocalStorage:</strong> We use your browser&apos;s local storage to save your UI preferences (such as light or dark theme choice) and to temporarily cache your tool workspace settings (e.g., keeping your resume drafts or currency selection alive while you switch browser tabs). This data never leaves your device and is not accessible to our web servers.
          </p>
          <p>
            <strong>Cookie Control:</strong> You can configure your browser settings to reject all cookies, alert you when a cookie is being set, or delete existing cookies at any time. Please note that disabling cookies may affect certain cosmetic preferences on our website.
          </p>
        </section>

        {/* 4. Google AdSense & Third-Party Advertising */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            4. Google AdSense and Third-Party Advertising
          </h2>
          <p>
            To keep all 15 tools on AllToolsPK 100% free for students, job seekers, and everyday citizens worldwide without paywalls, subscriptions, or credit card requirements, we partner with <strong>Google AdSense</strong> to display digital advertisements across our web pages.
          </p>
          <p>
            Third-party advertising partners, including Google, use digital tracking technologies to deliver advertisements tailored to your interests, measure ad performance, and prevent fraudulent click activities.
          </p>
        </section>

        {/* 5. How Google uses cookies to serve ads based on prior visits */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            5. How Google Uses Cookies to Serve Ads Based on Prior Visits
          </h2>
          <p>
            Google, as a third-party vendor, uses cookies—specifically the <strong>DoubleClick cookie</strong> and Google advertising identifiers—to serve relevant advertisements to visitors on our site.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li>Google&apos;s use of advertising cookies enables it and its partner network to serve ads to our users based on their visits to alltoolspk.com and other websites across the internet.</li>
            <li>These cookies collect non-personally identifiable browsing data (such as categories of websites visited, general demographic indicators, and ad interaction history) to display ads that are meaningful and relevant to the user&apos;s interests.</li>
            <li>AdSense cookies also perform essential functions such as frequency capping (ensuring you do not see the same advertisement repeatedly), verifying authentic ad views, and detecting invalid traffic patterns.</li>
          </ul>
        </section>

        {/* 6. How users can opt out of personalized advertising */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            6. How Users Can Opt Out of Personalized Advertising
          </h2>
          <p>
            You have full control over how advertising networks display ads to you. You may opt out of personalized, interest-based advertising through any of the following standard mechanisms:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Google Ad Settings:</strong> You can manage or opt out of personalized Google advertisements by visiting the official Google Ads Settings page at{' '}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-medium">
                https://adssettings.google.com
              </a>.
            </li>
            <li>
              <strong>Digital Advertising Alliance (DAA):</strong> You can opt out of interest-based advertising from dozens of participating ad networks by visiting the DAA consumer choice tool at{' '}
              <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-medium">
                https://optout.aboutads.info
              </a>.
            </li>
            <li>
              <strong>Network Advertising Initiative (NAI):</strong> You may also opt out through the NAI consumer opt-out page at{' '}
              <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-medium">
                https://optout.networkadvertising.org
              </a>.
            </li>
            <li>
              <strong>Browser Privacy Features:</strong> Most modern browsers (such as Brave, Firefox, Chrome, and Safari) offer built-in &ldquo;Do Not Track&rdquo; (DNT) or Global Privacy Control (GPC) toggles to restrict third-party tracking cookies.
            </li>
          </ul>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            <em>Note:</em> Opting out of personalized advertising does not mean you will no longer see advertisements on alltoolspk.com; rather, the ads displayed will be contextual (based on the content of the page you are viewing) rather than tailored to your past browsing history.
          </p>
        </section>

        {/* 7. Data Security */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            7. Data Security and Server Protection
          </h2>
          <p>
            We implement industry-standard technical, operational, and organizational security measures to protect the integrity of our digital infrastructure. All communications between your browser and alltoolspk.com are encrypted using Transport Layer Security (TLS 1.3 / HTTPS) with modern cipher suites.
          </p>
          <p>
            Because AllToolsPK does not maintain user account databases, passwords, credit card vaults, or document upload storage, the risk of sensitive personal data breaches is inherently minimized by our architectural design. However, please be aware that no method of transmission over the internet or electronic storage is 100% immune from unauthorized access.
          </p>
        </section>

        {/* 8. Children's Privacy */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            8. Children&apos;s Privacy (COPPA Compliance)
          </h2>
          <p>
            Protecting the privacy of young children is especially important to us. AllToolsPK is a general-audience productivity utility and is not directed to children under the age of 13 (or under 16 in the European Economic Area).
          </p>
          <p>
            We do not knowingly solicit, collect, or maintain personally identifiable information from children under 13. If you are a parent or legal guardian and believe that your child has submitted personal information through our contact form without your consent, please contact us immediately at <strong>contact@alltoolspk.com</strong>, and we will promptly delete such records from our communication logs.
          </p>
        </section>

        {/* 9. Changes to This Policy */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            9. Changes to This Privacy Policy
          </h2>
          <p>
            We reserve the right to revise or update this Privacy Policy periodically to reflect technological advancements, new tool additions, changes in legal statutes, or modifications to our advertising partnerships. When updates are published, the revised date at the top of this page will be updated accordingly.
          </p>
          <p>
            We encourage users to review this page periodically to stay informed about our continuous commitment to personal data protection. Your continued use of alltoolspk.com following the posting of modifications constitutes your formal acceptance of the updated policy.
          </p>
        </section>

        {/* 10. Contact Information */}
        <section className="space-y-3 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            10. Contact Information
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            If you have any questions, concerns, complaints, or inquiries regarding this Privacy Policy or our client-side data handling practices, please contact the site founder directly:
          </p>
          <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
            <p><strong>Platform:</strong> AllToolsPK (alltoolspk.com)</p>
            <p><strong>Founder &amp; Owner:</strong> Fareed Ullah</p>
            <p><strong>Location:</strong> Peshawar, Khyber Pakhtunkhwa, Pakistan</p>
            <p><strong>Official Email:</strong> <a href="mailto:contact@alltoolspk.com" className="text-blue-600 dark:text-blue-400 underline">contact@alltoolspk.com</a></p>
            <p><strong>Direct Helpline:</strong> +92 340 4526741</p>
            <p><strong>Response Time:</strong> Typically within 24 to 48 business hours</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export { PrivacyPage };
