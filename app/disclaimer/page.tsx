import React from 'react';
import DisclaimerClientPage from './DisclaimerClientPage';

export const metadata = {
  title: 'Legal, Financial & Medical Estimator Disclaimer | AllToolsPK',
  description: 'Read the official AllToolsPK disclaimer regarding financial calculators, accident settlement estimates, and informational content.',
  alternates: {
    canonical: 'https://alltoolspk.com/disclaimer',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
};

export default function Page() {
  return <DisclaimerClientPage />;
}
