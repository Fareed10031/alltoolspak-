import React from 'react';
import AboutClientPage from './AboutClientPage';

export const metadata = {
  title: 'About AllToolsPK - Privacy-First Free Utility Suite',
  description: 'Learn about AllToolsPK, founder Fareed Ullah, and our mission to deliver fast, zero-upload browser tools globally.',
  alternates: {
    canonical: 'https://alltoolspk.com/about-us',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
};

export default function AboutUsPage() {
  return <AboutClientPage />;
}
