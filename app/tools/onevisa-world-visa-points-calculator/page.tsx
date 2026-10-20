import React from 'react';
import dynamic from 'next/dynamic';

const OneVisaWorldTool = dynamic(
  () => import('@/components/tools/OneVisaWorldTool').then((m) => m.OneVisaWorldTool),
  { ssr: false, loading: () => <p className="text-center py-8 text-slate-500 animate-pulse">Loading OneVisa World...</p> }
);

export const metadata = {
  title: "OneVisa World - Visa Points Calculator (UK, Canada, Australia, Germany) | AllToolsPK",
  description: "Calculate your immigration eligibility and visa points for UK Skilled Worker, Canada Express Entry CRS, Australia GSM 189/190, and Germany Opportunity Card."
};

export default function OneVisaWorldPage() {
  return <OneVisaWorldTool />;
}
