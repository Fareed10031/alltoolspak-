import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full">
          Our Story &amp; Values
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
          About Us - AllToolsPK
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Empowering Millions of Global Users with Private, High-Speed, Client-Side Web Utilities
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base">
        {/* 1. Who We Are */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            1. Who We Are
          </h2>
          <p>
            <strong>AllToolsPK</strong> (alltoolspk.com) is an independent technology initiative conceptualized, engineered, and maintained by <strong>Fareed Ullah</strong>, a passionate software developer and digital creator based in Peshawar, Khyber Pakhtunkhwa, Pakistan.
          </p>
          <p>
            The project began with a simple observation: everyday computer users, students, accountants, and freelance professionals are constantly forced to navigate clunky web portals laden with intrusive paywalls, mandatory account registrations, deceptive download buttons, and severe file size limits just to perform simple tasks like merging two PDFs, calculating mortgage schedules, or checking chronological age.
          </p>
          <p>
            AllToolsPK was engineered from the ground up to challenge that status quo. By combining cutting-edge modern web capabilities—such as WebAssembly (Wasm), client-side Canvas vectorization, and HTML5 storage—we deliver instant, desktop-class utilities directly within your mobile or desktop browser without requiring a single byte of your data to leave your device.
          </p>
        </section>

        {/* 2. What AllToolsPK Offers */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            2. What AllToolsPK Offers
          </h2>
          <p>
            AllToolsPK provides a curated suite of <strong>15 essential web utilities</strong> spanning financial analysis, document editing, career development, and everyday productivity. Each tool is built with a singular focus on performance, mathematical accuracy, and user convenience:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong>Zero Latency:</strong> Because calculations run directly on your device&apos;s processor, results appear instantaneously without server roundtrips.</li>
            <li><strong>Universal Compatibility:</strong> Works seamlessly across Windows, macOS, Linux, ChromeOS, iOS, and Android without requiring app installations or plugins.</li>
            <li><strong>Uncompromising Privacy:</strong> Your identity documents, financial figures, and resume drafts remain confined to your volatile browser RAM.</li>
            <li><strong>AdSense-Supported Sustainability:</strong> Transparent, non-obtrusive digital advertising keeps the entire suite open to everyone without paid subscriptions.</li>
          </ul>
        </section>

        {/* 3. Our Mission */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            3. Our Mission
          </h2>
          <p>
            Our core mission is to <strong>democratize access to professional digital utilities</strong> for students, freelancers, small business owners, and citizens across Pakistan and 195 nations globally.
          </p>
          <p>
            We believe that basic productivity functions—such as converting image formats to PDF, calculating take-home pay, or building an ATS-compliant resume—should be universally accessible public utilities rather than gated commercial monopolies. We strive to provide tools that respect your digital rights, operate with absolute transparency, and deliver dependable results every single day.
          </p>
        </section>

        {/* 4. Why Our Tools Are Free */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            4. Why Our Tools Are 100% Free
          </h2>
          <p>
            A common question from first-time visitors is: <em>&ldquo;How can AllToolsPK offer advanced features like unlimited PDF merging and US mortgage amortization completely free?&rdquo;</em>
          </p>
          <p>
            The answer lies in our architectural efficiency. Traditional SaaS companies maintain massive server clusters to ingest, store, and process user documents in the cloud, resulting in colossal monthly hosting bills that they pass onto users through subscription paywalls. In contrast, AllToolsPK offloads the heavy computational lifting to modern web browser engines running on your client device.
          </p>
          <p>
            Our modest operational expenses—including domain registration, CDN hosting, and ongoing engineering—are fully funded through <strong>Google AdSense</strong>. This sustainable partnership allows us to keep every calculator, converter, and builder free forever for all visitors without charging a single rupee or dollar.
          </p>
        </section>

        {/* 5. Our Tools Categories */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            5. Our Tools Categories
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Finance Tools</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Accurate mathematical engines for Mortgage USA, Paycheck 2026, Car Accident Settlement, Amazon EU VAT, Currency &amp; Gold Rates, and Global Salary comparisons across 192 nations.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">PDF &amp; Document Tools</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Secure browser-based document processing with PDF 3X Pro (PDF to Word), PDF Merger, Image to PDF converter, QR Code Generator, and ATS-friendly Resume Builder.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Everyday Utilities</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Practical daily tools including Chronological Age Calculator for official school/exam cutoffs, OneVisa World Points Calculator, and Multi-Category Unit Converter.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Our Commitment to Privacy and Accuracy */}
        <section className="space-y-3 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-slate-900/60 dark:to-slate-900/90 p-6 sm:p-8 rounded-2xl border border-blue-100 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            6. Our Commitment to Privacy and Accuracy
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            As an independent platform, trust is our most valuable currency. We hold ourselves to strict standards of <strong>Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T)</strong>:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong>Verified Formulas:</strong> Our calculators are vetted against published government statutory formulas, including IRS tax tables, state tax brackets, judicial tort multiplier standards, and official immigration points systems.</li>
            <li><strong>Zero Data Interception:</strong> We never harvest, log, or commercialize your personal documents, numbers, or resumes. What happens in your browser stays in your browser.</li>
            <li><strong>Continuous Maintenance:</strong> We constantly update our currency exchange feeds, Sarafa gold rates, and immigration criteria to reflect current real-world changes.</li>
          </ul>
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span>Founder: Fareed Ullah</span>
            <span>•</span>
            <span>Headquarters: Peshawar, Pakistan</span>
            <span>•</span>
            <span>Contact: contact@alltoolspk.com</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export { AboutPage };
