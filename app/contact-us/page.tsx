import React from 'react';
import ContactClientPage from './ContactClientPage';

export const metadata = {
  title: 'Contact AllToolsPK Support & Founder Fareed Ullah',
  description: 'Get in touch with AllToolsPK for technical support, bug reports, feature requests, and partnership inquiries.',
  alternates: {
    canonical: 'https://alltoolspk.com/contact-us',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
};

export default function ContactUsPage() {
  return <ContactClientPage />;
}
