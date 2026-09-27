import React from 'react';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Contact Info Card - AdSense Compliant */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm space-y-6">

        <div>
          <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-1">OWNER &amp; DEVELOPER</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">👤 Fareed Ullah</p>
        </div>

        <div>
          <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-1">OFFICIAL SUPPORT EMAIL</p>
          <a href="mailto:contact@alltoolspk.com" className="text-xl font-bold text-slate-900 dark:text-white underline decoration-2 hover:text-blue-600 transition-colors">
            contact@alltoolspk.com
          </a>
        </div>

        <div>
          <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-1">PHONE &amp; WHATSAPP</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white">📞 +92 340 4526741</p>
        </div>

        <div>
          <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-1">LOCATION</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white">📍 Peshawar, Khyber Pakhtunkhwa, Pakistan</p>
        </div>

      </div>

      {/* Direct Communication Guarantee - Updated & Professional */}
      <div className="mt-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <h3 className="font-bold text-slate-900 dark:text-white mb-2">Direct Communication Guarantee</h3>
        <p className="text-[14px] leading-6 text-slate-600 dark:text-slate-300">
          Messages and inquiries sent through this form or directly to{' '}
          <a href="mailto:contact@alltoolspk.com" className="font-semibold text-blue-600 hover:underline">
            contact@alltoolspk.com
          </a>{' '}
          go directly to our support team. All inquiries receive a personal response within 24 hours.
        </p>
      </div>
    </div>
  );
}

export { ContactPage };
