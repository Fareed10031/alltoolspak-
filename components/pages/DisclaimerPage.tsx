import React from 'react';

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full">
          Legal & Regulatory Notice
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
          Disclaimer - AllToolsPK
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Last Updated: November 1, 2026 • Official Legal Notice for alltoolspk.com
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base">
        {/* 1. General Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            1. General Disclaimer
          </h2>
          <p>
            The information, calculators, converters, software utilities, estimations, rates, and materials provided on <strong>AllToolsPK</strong> (&ldquo;alltoolspk.com&rdquo;) are published in good faith and are intended strictly for <strong>general informational, educational, simulation, and personal productivity purposes</strong>.
          </p>
          <p>
            AllToolsPK is developed and maintained by <strong>Fareed Ullah</strong> in Peshawar, Pakistan. While we make every reasonable effort to keep the content, computational formulas, and market rates current, accurate, and mathematically sound, we make no representations or warranties of any kind, express or implied, regarding the completeness, accuracy, reliability, suitability, or availability of the website, tools, or related graphics.
          </p>
          <p>
            Any reliance you place on such information or computational outputs is strictly at your own risk. AllToolsPK and Fareed Ullah disclaim all liability for any loss, damage, or legal dispute arising directly or indirectly from your reliance on our tools.
          </p>
        </section>

        {/* 2. Financial Calculators Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            2. Financial Calculators &amp; Market Rates Disclaimer
          </h2>
          <p>
            AllToolsPK features multiple specialized financial calculators, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong>Mortgage Calculator USA:</strong> Monthly amortization breakdowns (PITI, PMI, property tax estimates) are mathematical projections. Actual mortgage lending terms depend on individual credit scores, lender underwriting criteria, local county tax assessments, and fluctuating hazard insurance premiums. Our tool does not constitute a formal loan pre-qualification or mortgage pre-approval offer.</li>
            <li><strong>USA Paycheck Calculator 2026:</strong> Computes estimated federal withholding, FICA, and state deductions based on standard tax brackets. Individual payrolls may differ due to municipal taxes, pre-tax 401(k) contributions, health savings accounts (HSA), or special employer withholdings.</li>
            <li><strong>Car Accident Settlement Calculator:</strong> Personal injury damages calculations are mathematical estimates utilizing standard insurance settlement multiplier formulas. They do not constitute formal legal demand evaluations or guaranteed insurer payouts.</li>
            <li><strong>Amazon EU VAT Calculator:</strong> Computes statutory European Value Added Tax under OSS/IOSS rules. Sellers remain legally responsible for consulting licensed tax advisors or European fiscal representatives for official VAT filings.</li>
            <li><strong>Currency &amp; Gold Rates:</strong> Foreign exchange rates and Sarafa gold prices are derived from public market API feeds. They reflect mid-market indicative benchmarks and may vary from retail bank exchange counters, open market dealers, or local jewelry shop buy/sell spreads.</li>
          </ul>
        </section>

        {/* 3. No Professional Advice */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            3. No Professional Advice (Financial, Legal, Tax, or Immigration)
          </h2>
          <p>
            None of the content, results, outputs, or guidance provided on AllToolsPK constitutes professional legal, financial, accounting, medical, architectural, or immigration advice:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong>No Legal Advice:</strong> Use of our accident compensation estimator or terms generators does not establish an attorney-client relationship. Always consult a licensed attorney in your state or country for binding legal representation.</li>
            <li><strong>No Tax or Accounting Advice:</strong> You should never base business tax filings or international corporate tax structures solely on online calculators. Consult a certified public accountant (CPA) or chartered accountant.</li>
            <li><strong>No Immigration Advice:</strong> The OneVisa World Points Calculator provides educational scoring based on publicly accessible immigration matrices. We are not immigration attorneys or registered migration agents (MARA / RCIC). Official visa decisions rest solely with government ministries (IRCC, UK Home Office, Australian Home Affairs, German BAMF).</li>
          </ul>
        </section>

        {/* 4. External Links Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            4. External Links &amp; Third-Party Resources Disclaimer
          </h2>
          <p>
            From time to time, AllToolsPK may include hyperlinks to external third-party websites, resources, or regulatory portals (such as official IRS, SBP, or immigration ministry websites).
          </p>
          <p>
            While we strive to link only to reputable, authoritative, and ethical websites, we have no control over the content, operational availability, privacy policies, or practices of external sites. The inclusion of any external link does not imply a formal recommendation or endorsement of the views, products, or services offered on those third-party domains.
          </p>
        </section>

        {/* 5. Accuracy Disclaimer */}
        <section className="space-y-3 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            5. Accuracy Disclaimer &amp; Technical Limitations
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            We continually test, refine, and audit the computational logic of all 15 tools on alltoolspk.com to maintain maximum fidelity. However, because mathematical algorithms run inside client browser environments, variances in device hardware, operating system rounding precision, browser JavaScript engines, or third-party browser extensions (such as script blockers) may occasionally affect tool execution or visual rendering.
          </p>
          <p className="text-slate-700 dark:text-slate-300 mt-2">
            AllToolsPK does not warrant that the website will operate uninterrupted, error-free, or completely free of software bugs. If you notice any discrepancy or bug in any calculation, please notify us immediately at <strong>contact@alltoolspk.com</strong> so we can promptly audit and update the code.
          </p>
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <p>Direct Inquiries: Fareed Ullah, Founder • Peshawar, KPK, Pakistan • Email: contact@alltoolspk.com</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export { DisclaimerPage };
