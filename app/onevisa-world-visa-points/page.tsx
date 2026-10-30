import React from 'react';
import OneVisaWorldTool from '@/components/tools/OneVisaWorldTool';
import AllToolsSEO from '../components/AllToolsSEO';

export const metadata = {
  title: "Free Visa Points Calculator Pakistan - UK, Canada CRS, Australia & Germany",
  description: "Free Visa Points Calculator Pakistan for UK Skilled Worker 70 points, Canada Express Entry CRS, Australia GSM 65 points, and Germany Opportunity Card.",
  alternates: {
    canonical: "https://alltoolspk.com/onevisa-world-visa-points/",
  },
};

export default function Page() {
  return (
    <>
      <OneVisaWorldTool />
      <AllToolsSEO
        toolName="OneVisa World Visa Points"
        slug="/onevisa-world-visa-points"
        keyword="Free Visa Points Calculator Pakistan"
        desc="Calculate points eligibility for UK Skilled Worker, Canada Express Entry CRS, Australia GSM, and Germany Chancenkarte."
      />
    </>
  );
}
