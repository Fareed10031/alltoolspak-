import React from 'react';
import GlobalSalaryCalculator from '@/components/tools/GlobalSalaryCalculator';
import AllToolsSEO from '../components/AllToolsSEO';

export const metadata = {
  title: "Free Global Salary Calculator Pakistan - Take-Home Pay in 192 Countries",
  description: "Free Global Salary Calculator Pakistan for freelancers, developers, and remote contractors. Calculate take-home pay, purchasing power, and hourly rates.",
  alternates: {
    canonical: "https://alltoolspk.com/global-salary-calculator/",
  },
};

export default function Page() {
  return (
    <>
      <div className="py-6 px-4 max-w-6xl mx-auto">
        <GlobalSalaryCalculator />
      </div>
      <AllToolsSEO
        toolName="Global Salary Calculator"
        slug="/global-salary-calculator"
        keyword="Free Global Salary Calculator Pakistan"
        desc="Compare international salaries, convert foreign earnings to PKR, and calculate freelance hourly rates."
      />
    </>
  );
}
