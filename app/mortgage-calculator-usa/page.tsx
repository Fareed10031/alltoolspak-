import React from 'react';
import MortgageCalculator from '@/components/tools/MortgageCalculator';
import AllToolsSEO from '../components/AllToolsSEO';

export const metadata = {
  title: "Free Mortgage Calculator Pakistan Overseas - US Home Loan Estimator",
  description: "Free Mortgage Calculator Pakistan for overseas buyers in USA. Calculate monthly payments with PMI, property tax, insurance, and amortization schedules.",
  alternates: {
    canonical: "https://alltoolspk.com/mortgage-calculator-usa/",
  },
};

export default function Page() {
  return (
    <>
      <MortgageCalculator />
      <AllToolsSEO
        toolName="Mortgage Calculator USA"
        slug="/mortgage-calculator-usa"
        keyword="Free Mortgage Calculator Pakistan"
        desc="Estimate true monthly mortgage payments including principal, interest, taxes, PMI, and HOA fees for US home purchases."
      />
    </>
  );
}
