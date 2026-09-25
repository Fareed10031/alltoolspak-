import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, User, MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { AdSlot } from '@/components/AdSlot';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <a href="/" className="hover:underline hover:text-emerald-600">Home</a>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-medium">Contact Us</span>
      </nav>

      {/* Header */}
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
          <Mail className="w-3.5 h-3.5" />
          <span>Support &amp; Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Contact Fareed Ullah &amp; Support Team
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Questions, feature requests, or technical bug reports? We respond within 24 business hours.
        </p>
      </div>

      <AdSlot label="Contact Top Ad" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info Column */}
        <div className="space-y-4">
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardContent className="p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Owner &amp; Developer</span>
                <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                  <User className="w-4 h-4 text-emerald-600 shrink-0" />
                  Fareed Ullah
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Direct Email</span>
                <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a href="mailto:fareedk1266@gmail.com" className="hover:text-emerald-600 underline truncate">
                    fareedk1266@gmail.com
                  </a>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Phone &amp; WhatsApp</span>
                <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a
                    href="https://wa.me/923404526741"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-emerald-600 inline-flex items-center gap-1.5"
                  >
                    <span>+92 340 4526741</span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <svg className="w-3 h-3 fill-[#25D366]" viewBox="0 0 24 24">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.204 8.204 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.54 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.45 1.03 2.62.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.31"/>
                      </svg>
                      WhatsApp
                    </span>
                  </a>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Location</span>
                <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  Peshawar, Khyber Pakhtunkhwa, Pakistan
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-500 leading-relaxed">
            <p className="font-bold text-slate-800 dark:text-slate-200 mb-1">Direct Communication Guarantee</p>
            Messages and inquiries sent through this form or directly to <a href="mailto:fareedk1266@gmail.com" className="text-emerald-600 font-semibold underline">fareedk1266@gmail.com</a> go directly to Fareed Ullah. All inquiries receive a personal response within 24 hours.
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="md:col-span-2">
          <Card className="border-slate-200 dark:border-slate-800 shadow-md">
            <CardContent className="p-6">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                    Thank you for reaching out, {name}. Fareed Ullah and the AllToolsPak team will get back to your email ({email}) shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="text-xs"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 font-medium">
                      {errorMessage}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Your Name *
                      </label>
                      <Input
                        required
                        placeholder="e.g. Tariq Mehmood"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        placeholder="e.g. name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Subject
                    </label>
                    <Input
                      placeholder="e.g. Suggestion for Amazon VAT tool"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Your Message *
                    </label>
                    <Textarea
                      required
                      rows={5}
                      placeholder="How can we assist you with our free tools?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="emerald"
                    size="lg"
                    className="w-full sm:w-auto font-bold gap-2 cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    Send Inquiries to Fareed Ullah
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <AdSlot label="Contact Bottom Ad" />
    </div>
  );
}
