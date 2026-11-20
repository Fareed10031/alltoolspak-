import React from 'react';
import PrivacyClientPage from './PrivacyClientPage';

export const metadata = {
  title: 'Privacy Policy & Client-Side Data Guarantee | AllToolsPK',
  description: 'Read the AllToolsPK Privacy Policy detailing zero server file uploads, cookies, Google AdSense disclosures, and GDPR/CCPA rights.',
  alternates: {
    canonical: 'https://alltoolspk.com/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyClientPage />;
}
