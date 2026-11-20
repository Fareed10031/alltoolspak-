import React from 'react';
import CookiesClientPage from './CookiesClientPage';

export const metadata = {
  title: 'Cookie Policy & Storage Audit | AllToolsPK',
  description: 'Audit inventory of local storage keys and optional cookies on AllToolsPK.',
  alternates: {
    canonical: 'https://alltoolspk.com/cookies',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <CookiesClientPage />;
}
