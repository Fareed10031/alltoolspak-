import React from 'react';

export function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 leading-8 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-black text-gray-900 dark:text-white">About AllToolsPK</h1>
      
      <div className="mt-8 border-l-4 border-blue-600 pl-6 py-2 bg-blue-50 dark:bg-blue-950/40 rounded-r-lg">
        <p className="font-bold text-gray-900 dark:text-white">Owner &amp; Developer: Fareed Ullah</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">Location: Peshawar, Khyber Pakhtunkhwa, Pakistan</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">Contact: contact@alltoolspk.com | +92 340 4526741</p>
      </div>

      <p className="mt-8">My name is Fareed Ullah and I am the founder and sole developer of AllToolsPK. I live in Peshawar, Khyber Pakhtunkhwa, Pakistan.</p>
      
      <p className="mt-4">I started AllToolsPK in 2024 after a personal experience. My cousin in Texas had a car accident and we were trying to calculate his settlement. Every website we visited wanted his email, wanted to upload his medical bills to their server. The same happened when I tried to help a friend in the UK with his Skilled Worker Visa points. I felt that was not safe.</p>
      
      <p className="mt-4">So I decided to build AllToolsPK with one promise: <strong>Your data stays on your device.</strong> Fareed Ullah built all 14 tools to run 100% in your browser. No upload to any server. No database. This means even Fareed Ullah cannot see your documents. Your PDF, your mortgage details, your visa calculation is mathematically private.</p>
      
      <p className="mt-4">Today AllToolsPK serves users in 195 countries with tools like Car Accident Settlement Calculator, Mortgage Calculator USA, Amazon EU VAT Calculator, UK Visa Points Calculator, and Image to PDF Converter.</p>

      <h2 className="text-2xl font-bold mt-10 text-gray-900 dark:text-white">My Direct Guarantee</h2>
      <p className="mt-2">If you face any issue, you can contact Fareed Ullah directly at contact@alltoolspk.com. I personally reply to every message within 24 hours. My WhatsApp is +92 340 4526741 for urgent support.</p>
    </div>
  );
}

export default AboutPage;
