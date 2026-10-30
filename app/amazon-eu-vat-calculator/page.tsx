import React from 'react';
import AmazonEuVatTool from '@/components/tools/AmazonEuVatTool';
import AllToolsSEO from '../components/AllToolsSEO';

export const metadata = {
  title: "Free Amazon EU VAT Calculator Pakistan - OSS & IOSS Rates",
  description: "Free Amazon EU VAT Calculator Pakistan for FBA sellers, dropshippers, and exporters. Calculate 27 EU member VAT rates, OSS, and profit margins instantly.",
  alternates: {
    canonical: "https://alltoolspk.com/amazon-eu-vat-calculator/",
  },
};

export default function Page() {
  return (
    <>
      <AmazonEuVatTool />
      <AllToolsSEO
        toolName="Amazon EU VAT Calculator"
        slug="/amazon-eu-vat-calculator"
        keyword="Free Amazon EU VAT Calculator Pakistan"
        desc="Calculate European Union VAT, OSS rates, and marketplace product pricing for Pakistani Amazon FBA merchants."
      />
    </>
  );
}
