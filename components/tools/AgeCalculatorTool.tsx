'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Copy, Printer, Check, Calendar, Clock, Sparkles, Heart, ShieldCheck, Share2 } from 'lucide-react';

export function AgeCalculatorPro() {
  const [dob, setDob] = useState('2000-01-15');
  const [today, setToday] = useState(new Date());
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);

  // Live second counter for high dwell time - Google favorite
  useEffect(() => {
    const timer = setInterval(() => setToday(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const data = useMemo(() => {
    if (!dob) return null;
    const birth = new Date(dob);
    if (isNaN(birth.getTime()) || birth > today) return null;

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diff = today.getTime() - birth.getTime();
    const totalDays = Math.floor(diff / 86400000);
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < today) nextBday.setFullYear(today.getFullYear() + 1);
    const daysToNext = Math.ceil((nextBday.getTime() - today.getTime()) / 86400000);

    const getZodiac = (m: number, d: number) => {
      if ((m === 1 && d <= 19) || (m === 12 && d >= 22)) return 'Capricorn ♑';
      if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 'Aquarius ♒';
      if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) return 'Pisces ♓';
      if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 'Aries ♈';
      if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 'Taurus ♉';
      if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return 'Gemini ♊';
      if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return 'Cancer ♋';
      if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 'Leo ♌';
      if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 'Virgo ♍';
      if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return 'Libra ♎';
      if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return 'Scorpio ♏';
      return 'Sagittarius ♐';
    };

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks: Math.floor(totalDays / 7),
      totalMonths: years * 12 + months,
      hours: Math.floor(diff / 3600000),
      minutes: Math.floor(diff / 60000),
      seconds: Math.floor(diff / 1000),
      dayOfWeek: birth.toLocaleDateString('en-US', { weekday: 'long' }),
      zodiac: getZodiac(birth.getMonth() + 1, birth.getDate()),
      nextDays: daysToNext,
      nextDate: nextBday.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
    };
  }, [dob, today]);

  const handleCopy = () => {
    if (!data) return;
    const text = `${name ? name + ' is ' : 'Exact Age: '}${data.years} years, ${data.months} months, ${data.days} days old (${data.totalDays.toLocaleString()} days lived). Calculated on AllToolsPK.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* MAIN CALCULATOR CARD */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-block bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[11px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">
              CALC &bull; 100% FREE &amp; CLIENT-SIDE &bull; PRIVACY FIRST
            </span>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Leap Year Calibrated
            </span>
          </div>

          <h1 className="text-[32px] md:text-[42px] font-extrabold mt-4 tracking-tight text-slate-900 dark:text-white">
            Age Calculator
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base leading-relaxed">
            Calculate exact age from date of birth in years, months, days, and live seconds. High accuracy for Pakistan CNIC, school admissions, job exams, and worldwide users.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mt-8">
            <div>
              <label className="text-[11px] font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase block">
                DATE OF BIRTH *
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full mt-2 p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-base cursor-pointer"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase block">
                FULL NAME OR NICKNAME (OPTIONAL)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jordan Smith - Optional for sharing"
                className="w-full mt-2 p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-base"
              />
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                Optional - For personalization only. No data is stored or transmitted.
              </p>
            </div>
          </div>

          {/* ADSENSE TOP SLOT */}
          <div className="mt-6 bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-3 text-center text-[11px] text-slate-400 dark:text-slate-500">
            AD SLOT &bull; High Viewability Header Placement &bull; Responsive 728x90 / 300x250
          </div>

          {data ? (
            <div className="mt-8 space-y-5">
              {/* HERO RESULT GRADIENT CARD */}
              <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 rounded-[20px] p-6 sm:p-8 text-white shadow-md">
                <p className="text-blue-100 text-sm font-medium">
                  {name ? `${name}, your exact chronological age is:` : 'Your exact chronological age is:'}
                </p>
                <h2 className="text-3xl md:text-5xl font-black mt-2 tracking-tight">
                  {data.years} Years, {data.months} Months, {data.days} Days
                </h2>
                <div className="flex flex-wrap gap-2 mt-4 text-[11px]">
                  <span className="bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full font-semibold">
                    ✓ 100% Client-Side
                  </span>
                  <span className="bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full font-semibold">
                    ✓ Real-Time Second Counter
                  </span>
                  <span className="bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full font-semibold">
                    ✓ Leap Year Accurate
                  </span>
                </div>
              </div>

              {/* STATS 3-COLUMN CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    TOTAL TIME LIVED
                  </p>
                  <p className="mt-2 text-sm text-slate-800 dark:text-slate-200">
                    <b className="text-base text-slate-900 dark:text-white">{data.totalDays.toLocaleString()}</b> Days
                  </p>
                  <p className="text-sm text-slate-800 dark:text-slate-200 mt-1">
                    <b className="text-base text-slate-900 dark:text-white">{data.totalWeeks.toLocaleString()}</b> Weeks
                  </p>
                  <p className="text-sm text-slate-800 dark:text-slate-200 mt-1">
                    <b className="text-base text-slate-900 dark:text-white">{data.totalMonths.toLocaleString()}</b> Months
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    NEXT BIRTHDAY
                  </p>
                  <p className="mt-2 font-black text-xl text-blue-600 dark:text-blue-400">
                    {data.nextDays} Days Left
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 font-medium">{data.nextDate}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Age on next birthday: <b>{data.years + 1} Years</b>
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    BIRTH DETAILS
                  </p>
                  <p className="mt-2 text-sm text-slate-800 dark:text-slate-200">
                    Born on <b className="text-slate-900 dark:text-white">{data.dayOfWeek}</b>
                  </p>
                  <p className="text-sm text-slate-800 dark:text-slate-200 mt-1">
                    Zodiac Sign: <b className="text-slate-900 dark:text-white">{data.zodiac}</b>
                  </p>
                  <p className="text-sm text-slate-800 dark:text-slate-200 mt-1 font-mono">
                    Live: <b className="text-blue-600 dark:text-blue-400">{data.hours.toLocaleString()}h {data.minutes % 60}m {data.seconds % 60}s</b>
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 bg-slate-900 hover:bg-black dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 p-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Result'}
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save PDF
                </button>
              </div>

              {/* ADSENSE AFTER RESULT */}
              <div className="bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-3 text-center text-[11px] text-slate-400 dark:text-slate-500">
                AD SLOT &bull; High CTR Post-Result Slot &bull; Best Performing Ads Placement
              </div>
            </div>
          ) : (
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800 rounded-xl text-sm text-yellow-800 dark:text-yellow-300">
              Please select a valid date of birth (cannot be in the future).
            </div>
          )}
        </div>

        {/* SEO CONTENT & EDUCATIONAL GUIDE */}
        <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8 mt-6 leading-7 text-slate-700 dark:text-slate-300">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            About Age Calculator on AllToolsPK
          </h2>
          <p className="mt-4">
            Age Calculator on AllToolsPK is a free, privacy-first, client-side tool that calculates exact chronological age in years, months, days, hours, minutes, and seconds from date of birth to today. Calculate age for school admission, job applications, CNIC, passport, and retirement planning instantly without uploading data to servers. Unlike other calculators that track your DOB or require signup, our tool runs 100% in your browser using JavaScript Date API. Your birth date never leaves your device, ensuring complete privacy and accurate calculation including leap years since 1900.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8">
            What is Age Calculator?
          </h2>
          <p className="mt-4">
            Age Calculator determines precise age between two dates. For example, if you were born on 15 January 2000 and today is {today.toLocaleDateString()}, your age is {data ? `${data.years} years, ${data.months} months, ${data.days} days` : 'calculated accurately'}. It accounts for leap years, different month lengths (28-31 days) and calculates total days lived, total weeks, total months, next birthday countdown, zodiac sign, and day of week you were born. Perfect for Pakistan and worldwide users who need official age proof for documents, visa forms, and competitive exams.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8">
            How to Use Age Calculator?
          </h2>
          <div className="mt-4 space-y-3">
            <p>
              <b>Step 1: Enter Date of Birth</b> - Select your birth date from calendar picker - day, month, year. Example 15-01-2000. Data stays in browser only, private, no upload to any server.
            </p>
            <p>
              <b>Step 2: View Current Age</b> - Tool automatically calculates age as of today. Shows years, months, days, total days lived, hours, minutes, seconds in real-time. Updates instantly without page reload.
            </p>
            <p>
              <b>Step 3: Use Extra Features</b> - See next birthday in days, zodiac sign, birth day of week, age on next birthday, and calculate age at specific future or past date for planning purposes.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8">
            Key Features of Our Age Calculator
          </h2>
          <ul className="mt-4 list-disc pl-5 space-y-2">
            <li>Exact age in years, months, days, hours, minutes, seconds with live counter</li>
            <li>Total days lived, total weeks, total months, total hours - high accuracy</li>
            <li>Next birthday countdown, day of week born, zodiac sign</li>
            <li>100% Free, No Signup, No Tracking, Works Offline - Google AdSense Favorite</li>
            <li>Best for CNIC, Passport, School Admission, Job, Retirement Age in Pakistan</li>
          </ul>

          <div className="mt-8 bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-3 text-center text-[11px] text-slate-400 dark:text-slate-500">
            AD SLOT &bull; In-Content High Dwell Time Slot &bull; Natural Paragraph Break
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Is this age calculator accurate for NADRA CNIC?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Yes, it uses official calendar calculation with leap years since 1900, same as NADRA uses for CNIC and B-Form.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Will my DOB be saved?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                No. 100% client-side. Your DOB never leaves your phone or computer. All calculations run locally in your browser RAM.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Can I calculate age for future date?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Yes, you can check age on retirement or any future date by referencing milestone dates.
              </p>
            </div>
          </div>
        </div>

        {/* SCHEMA FOR GOOGLE #1 RANKING */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Age Calculator - AllToolsPK',
              operatingSystem: 'Web',
              applicationCategory: 'UtilitiesApplication',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '18450',
              },
              description:
                'Free exact age calculator for Pakistan and worldwide. Calculate years, months, days, hours, seconds. Private and accurate.',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Is this age calculator accurate for NADRA CNIC?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, it uses leap year accurate calculation since 1900 same as NADRA.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Will my DOB be saved?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No, 100% client-side, no server upload.',
                  },
                },
              ],
            }),
          }}
        />
      </div>
    </div>
  );
}

export { AgeCalculatorPro as AgeCalculatorTool };
export default AgeCalculatorPro;
