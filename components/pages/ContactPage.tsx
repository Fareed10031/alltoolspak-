import React from 'react';

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-slate-800 dark:text-slate-200">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white">Contact Fareed Ullah</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Fareed Ullah personally reads and replies to every message. This is not a support team, this is direct communication with the owner.
      </p>

      <div className="mt-8 grid gap-4">
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-white dark:bg-slate-900 shadow-sm">
          <p className="text-xs text-gray-400 dark:text-gray-500 tracking-widest font-semibold">OWNER &amp; DEVELOPER</p>
          <p className="text-xl font-bold mt-1 text-slate-900 dark:text-white">Fareed Ullah</p>
        </div>
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-white dark:bg-slate-900 shadow-sm">
          <p className="text-xs text-gray-400 dark:text-gray-500 tracking-widest font-semibold">OFFICIAL SUPPORT EMAIL</p>
          <p className="text-xl font-bold mt-1 text-blue-600 dark:text-blue-400">
            <a href="mailto:contact@alltoolspk.com" className="hover:underline">
              contact@alltoolspk.com
            </a>
          </p>
        </div>
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-white dark:bg-slate-900 shadow-sm">
          <p className="text-xs text-gray-400 dark:text-gray-500 tracking-widest font-semibold">PHONE &amp; WHATSAPP</p>
          <p className="text-xl font-bold mt-1 text-slate-900 dark:text-white">
            <a href="tel:+923404526741" className="hover:underline">
              +92 340 4526741
            </a>
          </p>
        </div>
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-white dark:bg-slate-900 shadow-sm">
          <p className="text-xs text-gray-400 dark:text-gray-500 tracking-widest font-semibold">LOCATION</p>
          <p className="text-xl font-bold mt-1 text-slate-900 dark:text-white">Peshawar, Khyber Pakhtunkhwa, Pakistan</p>
        </div>
      </div>

      <div className="mt-8 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-gray-50 dark:bg-slate-900/60">
        <h3 className="font-bold text-slate-900 dark:text-white">Direct Communication Guarantee</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Messages sent to{' '}
          <a href="mailto:contact@alltoolspk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            contact@alltoolspk.com
          </a>{' '}
          go directly to Fareed Ullah. All inquiries receive a personal response from Fareed Ullah within 24 hours.
        </p>
      </div>
    </div>
  );
}

export { ContactPage };
