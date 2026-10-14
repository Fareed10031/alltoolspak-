import React from 'react';

export function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-slate-800 dark:text-slate-200">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white">AllToolsPK Blog</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">Guides written by Fareed Ullah, Peshawar, Pakistan.</p>
      <div className="mt-8">
        <p className="border border-slate-200 dark:border-slate-800 p-4 rounded-lg bg-white dark:bg-slate-900 shadow-xs">
          Blog posts are coming soon. Fareed Ullah is writing detailed guides for each tool. For now, explore tools.
        </p>
        <a
          href="/"
          className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition shadow-md shadow-blue-600/20"
        >
          Explore Tools
        </a>
      </div>
    </div>
  );
}

export default BlogPage;
