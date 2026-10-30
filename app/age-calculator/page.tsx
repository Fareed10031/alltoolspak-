import React from 'react';
import AgeCalculatorTool from '@/components/tools/AgeCalculatorTool';
import AllToolsSEO from '../components/AllToolsSEO';

export const metadata = {
  title: "Free Age Calculator Pakistan - Exact Age for Nadra & B-Form",
  description: "Free Age Calculator Pakistan for B-Form, school admission, and Nadra CNIC. Calculate exact age in years, months, days, hours, and live seconds.",
  alternates: {
    canonical: "https://alltoolspk.com/age-calculator/",
  },
};

export default function Page() {
  return (
    <>
      <AgeCalculatorTool />
      <AllToolsSEO
        toolName="Age Calculator"
        slug="/age-calculator"
        keyword="Free Age Calculator Pakistan"
        desc="Calculate exact age for Nadra, B-Form, and competitive job exams in Pakistan."
      />
    </>
  );
}
