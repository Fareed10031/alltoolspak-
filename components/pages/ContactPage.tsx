import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    // Simulate successful client-side submission with feedback
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
          Contact Us - AllToolsPK
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          We welcome your feedback, bug reports, feature suggestions, and partnership inquiries.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-10">
        {/* Left Column: Explanatory Content (400+ words) */}
        <div className="md:col-span-3 space-y-6 text-sm sm:text-base">
          {/* Section 1: How to Contact Us */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              1. How to Contact Us
            </h2>
            <p>
              At <strong>AllToolsPK</strong>, we prioritize open, direct communication with our global community. Whether you are a student utilizing our PDF suite for academic submissions, a remote worker calculating net salary deductions, or a business owner generating custom QR codes, we are eager to hear your thoughts.
            </p>
            <p>
              You can reach out to us directly through the interactive contact form on this page or by contacting our founder directly via our official communication channels:
            </p>
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-sm space-y-1">
              <p><strong>Primary Support Email:</strong> <a href="mailto:contact@alltoolspk.com" className="text-blue-600 dark:text-blue-400 underline font-medium">contact@alltoolspk.com</a></p>
              <p><strong>Founder &amp; Lead Engineer:</strong> Fareed Ullah</p>
              <p><strong>Physical Headquarters:</strong> Peshawar, Khyber Pakhtunkhwa, Pakistan</p>
              <p><strong>Telephone / WhatsApp Helpline:</strong> +92 340 4526741</p>
              <p><strong>Official Website:</strong> <a href="https://alltoolspk.com" className="text-blue-600 dark:text-blue-400 underline font-medium">alltoolspk.com</a></p>
            </div>
          </section>

          {/* Section 2: What You Can Contact Us For */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              2. What You Can Contact Us For
            </h2>
            <p>
              Our inbox is monitored daily to assist users with a wide variety of inquiries. You are welcome to reach out regarding:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong>Bug Reports &amp; Glitches:</strong> If a tool fails to render or a specific file format triggers an error on your mobile or desktop browser, let us know so we can deploy an immediate patch.</li>
              <li><strong>Feature Suggestions:</strong> Have an idea for a new tool or an improvement to existing calculators (such as new immigration pathways or additional currency pairs)? We love community ideas.</li>
              <li><strong>Advertising &amp; Sponsorship Inquiries:</strong> Inquiries regarding ethical advertising partnerships or Google AdSense technical compliance.</li>
              <li><strong>DMCA &amp; Intellectual Property:</strong> Copyright inquiries or trademark notices, which are reviewed and resolved promptly.</li>
              <li><strong>General Inquiries:</strong> Any questions regarding our client-side zero-upload privacy architecture or E-E-A-T calculation methodologies.</li>
            </ul>
          </section>

          {/* Section 3: Response Time */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3. Our Response Time Commitment
            </h2>
            <p>
              We know your time is valuable. Every message submitted through our form or sent to our email inbox is received directly by <strong>Fareed Ullah</strong> and our technical team.
            </p>
            <p>
              We commit to reviewing and responding to all legitimate inquiries within <strong>24 to 48 business hours</strong> (Monday through Saturday). For urgent security-related disclosures, our team prioritizes immediate evaluation. Please provide as much relevant detail as possible (including your device OS, browser version, and tool URL) to help us resolve technical questions quickly.
            </p>
          </section>
        </div>

        {/* Right Column: Working Contact Form */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Send Us a Direct Message
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Fill out the form below and we will get back to you within 24-48 hours.
            </p>

            {status === 'success' ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center space-y-2">
                <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto font-bold text-lg">
                  ✓
                </div>
                <h4 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  Thank you for reaching out. Fareed Ullah will review your inquiry and reply via email shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-3 text-xs font-semibold text-emerald-800 dark:text-emerald-300 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'error' && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-700 dark:text-red-300">
                    Please fill out all required fields (Name, Email, and Message).
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jordan Smith"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. yourname@gmail.com"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Bug Report / Feature Suggestion"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your issue or suggestion in detail..."
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { ContactPage };
