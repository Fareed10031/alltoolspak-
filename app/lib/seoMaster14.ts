export const SITE_URL = 'https://alltoolspk.com';

export const ALL_14_TOOLS = [
  { slug: 'global-accident-emergency', name: 'Global Accident & Emergency', keyword: 'car accident settlement calculator', countries: 195 },
  { slug: 'mortgage-calculator-usa', name: 'Mortgage Calculator USA', keyword: 'mortgage calculator usa', countries: 1 },
  { slug: 'usa-paycheck-calculator-2026', name: 'USA Paycheck Calculator 2026', keyword: 'usa paycheck calculator 2026', countries: 1 },
  { slug: 'amazon-eu-vat-calculator', name: 'Amazon EU VAT Calculator', keyword: 'amazon eu vat calculator', countries: 27 },
  { slug: 'onevisa-world-visa-points', name: 'OneVisa World Visa Points', keyword: 'canada crs points calculator', countries: 10 },
  { slug: 'global-salary-calculator', name: 'Global Salary Calculator', keyword: 'global salary calculator', countries: 192 },
  { slug: 'ats-resume-builder', name: 'ATS Resume Builder', keyword: 'ats resume builder', countries: 195 },
  { slug: 'pdf-3x-pro', name: 'PDF 3X Pro', keyword: 'pdf to word suite', countries: 195 },
  { slug: 'live-currency-gold-rates', name: 'Live Currency Gold Rates', keyword: 'usd to pkr today', countries: 150 },
  { slug: 'pdf-merger', name: 'PDF Merger', keyword: 'merge pdf', countries: 195 },
  { slug: 'image-to-pdf', name: 'Image to PDF', keyword: 'jpg to pdf', countries: 195 },
  { slug: 'qr-code-generator', name: 'QR Code Generator', keyword: 'qr code generator', countries: 195 },
  { slug: 'age-calculator', name: 'Age Calculator', keyword: 'age calculator', countries: 195 },
  { slug: 'unit-converter', name: 'Unit Converter', keyword: 'unit converter', countries: 195 },
];

export function getGlobalOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AllToolsPK",
    "url": SITE_URL,
    "logo": SITE_URL + "/logo.png",
    "description": "14 Free Tools - Zero Cloud Uploads - 195 Countries"
  };
}
