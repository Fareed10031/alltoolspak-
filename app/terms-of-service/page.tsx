import React from 'react';
import TermsClientPage from './TermsClientPage';

export const metadata = {
  title: 'Terms of Service & Usage Guidelines | AllToolsPK',
  description: 'Review the AllToolsPK Terms of Service covering free online tool usage, calculator accuracy disclaimers, and intellectual property.',
  alternates: {
    canonical: 'https://alltoolspk.com/terms-of-service',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
};

export default function TermsOfServicePage() {
  return <TermsClientPage />;
}
