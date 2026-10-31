import React from 'react';
import { USAPaycheckCalculator2026 } from '@/components/tools/USAPaycheckCalculator2026';
import AllToolsSEO from '../components/AllToolsSEO';

export const metadata = {
  title: "Free USA Paycheck Calculator 2026 - Federal & State Net Salary",
  description: "Free USA Paycheck Calculator 2026. Calculate exact gross to net pay, federal withholding, FICA, and state income tax.",
  alternates: {
    canonical: "https://alltoolspk.com/usa-paycheck-calculator-2026",
  },
};

export default function Page() {
  return (
    <>
      <div className="py-6 px-4 max-w-5xl mx-auto">
        <USAPaycheckCalculator2026 />
      </div>
      <AllToolsSEO
        toolName="USA Paycheck Calculator 2026"
        slug="/usa-paycheck-calculator-2026"
        keyword="Free USA Paycheck Calculator 2026"
        desc="Calculate net take-home salary, federal income tax, state deductions, and FICA for US employees and remote contractors."
      />
    </>
  );
}
