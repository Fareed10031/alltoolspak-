import React from 'react';
import EmergencyOSTool from '@/components/tools/EmergencyOSTool';
import AllToolsSEO from '../components/AllToolsSEO';

export const metadata = {
  title: "Car Accident Settlement Calculator | Insurance Claim & Compensation Estimator - 195 Countries",
  description: "Calculate your car accident settlement value instantly. Estimate insurance claim, rehab cost, medical bills, lost wages, and find legal guidance. Supports 195 countries. 100% Private, Browser-Based.",
  keywords: [
    "car accident settlement calculator",
    "personal injury compensation calculator",
    "insurance claim calculator",
    "accident claim estimator"
  ],
  alternates: {
    canonical: "https://alltoolspk.com/car-accident-settlement-calculator",
  },
};

export default function Page() {
  return (
    <>
      <EmergencyOSTool />
      <AllToolsSEO
        toolName="Car Accident Settlement Calculator"
        slug="/global-accident-emergency"
        keyword="Free Car Accident Settlement Calculator"
        desc="Estimate personal injury damages, lost wages, and rehabilitation compensation across 195 jurisdictions."
      />
    </>
  );
}
