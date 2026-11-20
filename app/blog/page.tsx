import React from 'react';
import BlogClientPage from './BlogClientPage';

export const metadata = {
  title: 'Blog & Guides | AllToolsPK',
  description: 'Upcoming guides and tutorials for AllToolsPK utilities.',
  alternates: {
    canonical: 'https://alltoolspk.com/blog',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function BlogPage() {
  return <BlogClientPage />;
}
