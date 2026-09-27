export const SITE_NAME = "AllToolsPK";

export interface ToolItem {
  slug: string;
  name: string;
  desc: string;
  tag: string;
  colorIndex: number;
}

export const TOOLS: ToolItem[] = [
  {
    slug: "amazon-eu-vat",
    name: "Amazon EU VAT Calculator",
    desc: "Calculate destination EU VAT rates, net turnover amounts, and generate bulk PDF invoices and ZIP packages for Amazon sellers.",
    tag: "EU OSS Ready",
    colorIndex: 0,
  },
  {
    slug: "background-remover",
    name: "AI Background Remover",
    desc: "Automatic background removal powered by client-side neural vision. Export crisp transparent cutouts with zero watermarks.",
    tag: "Neural Vision",
    colorIndex: 1,
  },
  {
    slug: "pdf-merge",
    name: "PDF Merger",
    desc: "Merge multiple PDFs into one single file in seconds, 100% offline.",
    tag: "PDF Tool",
    colorIndex: 2,
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    desc: "Convert JPG/PNG images to high quality PDF, no quality loss.",
    tag: "Convert",
    colorIndex: 3,
  },
  {
    slug: "qr-generator",
    name: "QR Code Generator",
    desc: "Create QR codes for links, text, or contact info instantly.",
    tag: "Generator",
    colorIndex: 4,
  },
  {
    slug: "password-gen",
    name: "Password Generator",
    desc: "Generate strong secure passwords instantly with custom length.",
    tag: "Security",
    colorIndex: 5,
  },
  {
    slug: "resume-builder",
    name: "Resume Builder",
    desc: "Build professional resume and download as real PDF with your name.",
    tag: "Builder",
    colorIndex: 6,
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    desc: "Calculate exact age from date of birth in years, months, days.",
    tag: "Calc",
    colorIndex: 7,
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    desc: "Convert length, weight, temperature & more instantly.",
    tag: "Convert",
    colorIndex: 8,
  },
];

export const COLORS = [
  { bg: "bg-blue-600", light: "bg-blue-50", border: "border-blue-100", text: "text-blue-600" },
  { bg: "bg-violet-600", light: "bg-violet-50", border: "border-violet-100", text: "text-violet-600" },
  { bg: "bg-orange-500", light: "bg-orange-50", border: "border-orange-100", text: "text-orange-600" },
  { bg: "bg-emerald-600", light: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-600" },
  { bg: "bg-rose-600", light: "bg-rose-50", border: "border-rose-100", text: "text-rose-600" },
  { bg: "bg-cyan-600", light: "bg-cyan-50", border: "border-cyan-100", text: "text-cyan-600" },
];
