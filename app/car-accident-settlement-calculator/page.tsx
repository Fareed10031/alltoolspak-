import React from 'react';
import EmergencyOSPage from '@/app/tools/emergency-os/page';

export const metadata = {
  title: "Car Accident Settlement Calculator | Insurance Claim & Compensation Estimator - 195 Countries",
  description: "Calculate your car accident settlement value instantly. Estimate insurance claim, rehab cost, medical bills, lost wages, visual evidence analysis, and find lawyer and hospital near you. Supports 195 countries. 100% Private, Browser-Based.",
  keywords: [
    "car accident settlement calculator",
    "personal injury compensation calculator",
    "insurance claim calculator",
    "accident claim estimator",
    "rehab cost calculator",
    "lawyer finder"
  ],
  openGraph: {
    title: "Car Accident Settlement Calculator - 195 Countries",
    description: "Free settlement estimator, insurance claim checker, rehab cost calculator, and lawyer finder.",
    type: "website",
  }
};

export default function Page() {
  return <EmergencyOSPage />;
}
