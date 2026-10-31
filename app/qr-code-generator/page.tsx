import React from 'react';
import QrGeneratorTool from '@/components/tools/QrGeneratorTool';
import AllToolsSEO from '../components/AllToolsSEO';

export const metadata = {
  title: "Free QR Code Generator Pakistan - Custom Logo, WiFi, URL, WhatsApp",
  description: "Generate high-resolution QR codes free with custom colors, logos, and formats for URLs, WiFi passwords, WhatsApp, and contacts in Pakistan.",
  alternates: {
    canonical: "https://alltoolspk.com/qr-code-generator",
  },
};

export default function Page() {
  return (
    <>
      <QrGeneratorTool />
      <AllToolsSEO
        toolName="QR Code Generator"
        slug="/qr-code-generator"
        keyword="Free QR Code Generator Pakistan"
        desc="Create custom high-resolution QR codes with logos, colors, and direct vector SVG/PNG downloads."
      />
    </>
  );
}
