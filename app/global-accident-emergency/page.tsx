import React from 'react';
import EmergencyOSTool from '@/components/tools/EmergencyOSTool';
import AllToolsSEO from '../components/AllToolsSEO';

export const metadata = {
  title: "Free Accident Settlement Calculator Pakistan - Injury Claim Estimator",
  description: "Free Accident Settlement Calculator Pakistan for road collisions, injury claims, medical expenses, and court multipliers across 195 countries.",
  alternates: {
    canonical: "https://alltoolspk.com/global-accident-emergency/",
  },
};

export default function Page() {
  return (
    <>
      <EmergencyOSTool />
      <AllToolsSEO
        toolName="Global Accident Emergency"
        slug="/global-accident-emergency"
        keyword="Free Accident Calculator Pakistan"
        desc="Estimate personal injury damages, lost wages, and rehabilitation compensation across 195 jurisdictions."
      />
    </>
  );
}
