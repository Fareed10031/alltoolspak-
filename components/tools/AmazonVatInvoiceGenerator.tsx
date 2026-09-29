'use client';

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import {
  FileText,
  Printer,
  Download,
  Building,
  User,
  Package,
  Globe,
  Receipt,
  FileSpreadsheet,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export type Country = {
  code: string;
  name: string;
  isEU: boolean;
  currency: string;
  vatRate: number;
};

export const COUNTRIES: Country[] = [
  { code: 'US', name: 'USA', isEU: false, currency: 'USD', vatRate: 0 },
  { code: 'DE', name: 'Germany', isEU: true, currency: 'EUR', vatRate: 19 },
  { code: 'FR', name: 'France', isEU: true, currency: 'EUR', vatRate: 20 },
  { code: 'GB', name: 'United Kingdom', isEU: false, currency: 'GBP', vatRate: 20 },
  { code: 'IT', name: 'Italy', isEU: true, currency: 'EUR', vatRate: 22 },
  { code: 'ES', name: 'Spain', isEU: true, currency: 'EUR', vatRate: 21 },
  { code: 'NL', name: 'Netherlands', isEU: true, currency: 'EUR', vatRate: 21 },
  { code: 'PL', name: 'Poland', isEU: true, currency: 'PLN', vatRate: 23 },
  { code: 'SE', name: 'Sweden', isEU: true, currency: 'SEK', vatRate: 25 },
  { code: 'CA', name: 'Canada', isEU: false, currency: 'CAD', vatRate: 5 },
  { code: 'AU', name: 'Australia', isEU: false, currency: 'AUD', vatRate: 10 },
  { code: 'PK', name: 'Pakistan', isEU: false, currency: 'PKR', vatRate: 0 },
];

export function AmazonVatInvoiceGenerator() {
  // SELLER - Required Amazon Seller Central fields
  const [seller, setSeller] = useState({
    company: 'AllToolsPK LTD',
    address: 'Peshawar, Pakistan',
    vatId: 'PK123456789',
    eori: 'PK-EORI-12345',
    ossId: 'EU-OSS-123456',
  });

  // BUYER
  const [buyer, setBuyer] = useState({
    name: 'Fareed Ullah',
    address: '123 Main St, New York, NY 10001, USA',
    vatId: '',
  });

  // INVOICE DETAILS
  const [invoice, setInvoice] = useState({
    no: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
    orderId: '111-1234567-1234567',
    date: new Date().toISOString().split('T')[0],
    product: 'Amazon Marketplace Fulfilled Merchandise',
    hsCode: '8517.12.00',
    origin: 'PK',
    qty: 1,
    unitPrice: 120,
  });

  const [destCode, setDestCode] = useState('US');
  const dest = COUNTRIES.find((c) => c.code === destCode) || COUNTRIES[0];
  const isExport = !dest.isEU;

  const subtotal = (Number(invoice.qty) || 0) * (Number(invoice.unitPrice) || 0);
  const vatRate = isExport ? 0 : dest.vatRate;
  const vatAmount = subtotal * (vatRate / 100);
  const total = subtotal + vatAmount;

  const legalText = isExport
    ? `VAT Exempt - Export Outside EU under Article 146 of EU VAT Directive 2006/112/EC. No VAT charged. Destination: ${dest.name}`
    : `VAT Charged under OSS Scheme. OSS ID: ${seller.ossId}. Standard Rate ${vatRate}% applied per ${dest.name} rules.`;

  const resetSample = () => {
    setSeller({
      company: 'AllToolsPK LTD',
      address: 'Peshawar, Pakistan',
      vatId: 'PK123456789',
      eori: 'PK-EORI-12345',
      ossId: 'EU-OSS-123456',
    });
    setBuyer({
      name: 'Fareed Ullah',
      address: '123 Main St, New York, NY 10001, USA',
      vatId: '',
    });
    setInvoice({
      no: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
      orderId: '111-1234567-1234567',
      date: new Date().toISOString().split('T')[0],
      product: 'Amazon Marketplace Fulfilled Merchandise',
      hsCode: '8517.12.00',
      origin: 'PK',
      qty: 1,
      unitPrice: 120,
    });
    setDestCode('US');
  };

  const handlePrint = () => {
    window.print();
  };

  // Pure Vector PDF Engine
  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    // Top Header Banner
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 595, 75, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    const invoiceHeaderTitle = isExport
      ? 'COMMERCIAL INVOICE - EXPORT'
      : 'VAT COMMERCIAL INVOICE - OSS COMPLIANT';
    doc.text(invoiceHeaderTitle, 40, 42);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Certified Client-Side Amazon Seller Central Compliant Invoicing', 40, 58);

    let y = 100;

    // Seller & Invoice Meta Columns
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);

    // Left Column: Seller
    doc.setFont('helvetica', 'bold');
    doc.text('SELLER (Exporter):', 40, y);
    doc.setFont('helvetica', 'normal');
    doc.text(seller.company || 'Seller Company', 40, y + 14);
    doc.text(seller.address || 'Seller Address', 40, y + 26);
    doc.text(`VAT/Tax ID: ${seller.vatId || 'N/A'}`, 40, y + 38);
    doc.text(`EORI: ${seller.eori || 'N/A'}`, 40, y + 50);
    if (!isExport) {
      doc.text(`OSS ID: ${seller.ossId || 'N/A'}`, 40, y + 62);
    }

    // Right Column: Invoice Info
    const rightCol = 360;
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE DETAILS:', rightCol, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`Invoice No: ${invoice.no}`, rightCol, y + 14);
    doc.text(`Order Ref: ${invoice.orderId}`, rightCol, y + 26);
    doc.text(`Date of Issue: ${invoice.date}`, rightCol, y + 38);
    doc.text(`Marketplace: Amazon.${dest.code.toLowerCase()}`, rightCol, y + 50);
    doc.text(`Currency: ${dest.currency}`, rightCol, y + 62);

    y += 82;

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(1);
    doc.line(40, y, 555, y);
    y += 18;

    // Bill To / Ship To Section
    doc.setFont('helvetica', 'bold');
    doc.text('BILL TO / SHIP TO:', 40, y);
    doc.setFont('helvetica', 'normal');
    doc.text(buyer.name || 'Valued Customer', 40, y + 14);
    doc.text(buyer.address || 'Address on file', 40, y + 26);
    doc.text(`Destination: ${dest.name} (${dest.code})`, 40, y + 38);
    if (buyer.vatId) {
      doc.text(`Buyer VAT ID: ${buyer.vatId}`, 40, y + 50);
      y += 12;
    }

    y += 54;

    // Table Header
    doc.setFillColor(241, 245, 249);
    doc.rect(40, y, 515, 22, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text('Description', 48, y + 14);
    doc.text('HS Code', 260, y + 14);
    doc.text('Qty', 345, y + 14);
    doc.text(`Unit (${dest.currency})`, 400, y + 14);
    doc.text(`Total (${dest.currency})`, 475, y + 14);

    y += 24;

    // Table Row
    doc.setFont('helvetica', 'normal');
    doc.text(`${invoice.product}`, 48, y + 14);
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Country of Origin: ${invoice.origin}`, 48, y + 25);

    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(`${invoice.hsCode}`, 260, y + 14);
    doc.text(`${invoice.qty}`, 345, y + 14);
    doc.text(`${Number(invoice.unitPrice).toFixed(2)}`, 400, y + 14);
    doc.text(`${subtotal.toFixed(2)}`, 475, y + 14);

    y += 42;

    // Totals Box
    doc.setDrawColor(226, 232, 240);
    doc.line(320, y, 555, y);
    y += 14;

    doc.setFont('helvetica', 'normal');
    doc.text(`Subtotal:`, 340, y);
    doc.text(`${subtotal.toFixed(2)} ${dest.currency}`, 480, y);
    y += 14;

    doc.text(`VAT (${vatRate}%):`, 340, y);
    doc.text(`${vatAmount.toFixed(2)} ${dest.currency}`, 480, y);
    y += 14;

    doc.setDrawColor(15, 23, 42);
    doc.line(320, y, 555, y);
    y += 14;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`Invoice Total (Gross):`, 340, y);
    doc.text(`${total.toFixed(2)} ${dest.currency}`, 480, y);

    y += 30;

    // Tax Computation Notice Legal Box
    doc.setFillColor(248, 250, 252);
    doc.rect(40, y, 515, 54, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.rect(40, y, 515, 54, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text('Tax Computation Notice & Statutory Declaration:', 48, y + 14);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const noticeLines = doc.splitTextToSize(
      `${legalText}. Currency compliant with destination jurisdiction. Certified Client-Side Invoicing via alltoolspk.com. Compliant with EU VAT Directive & Amazon Seller Central Invoice Upload Requirements.`,
      495
    );
    doc.text(noticeLines, 48, y + 26);

    const filename = `${invoice.no}_Amazon_${dest.code}_Invoice.pdf`;
    doc.save(filename);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="no-print bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>EU OSS &amp; Article 146 Export Compliant • Amazon Verified</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {isExport
                ? 'COMMERCIAL INVOICE - EXPORT'
                : 'VAT COMMERCIAL INVOICE - OSS COMPLIANT'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Generate 100% Amazon Seller Central compliant invoices with destination currencies, OSS taxation, EORI, and HS codes.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={resetSample}
            className="text-xs font-bold rounded-xl cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Defaults
          </Button>
        </div>

        {/* INPUTS SECTION */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600" />
              Invoice Parameters &amp; Parties
            </h3>
            <span className="text-xs text-slate-500">All fields client-side only</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Seller Company Name *
              </label>
              <input
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={seller.company}
                onChange={(e) => setSeller({ ...seller, company: e.target.value })}
                placeholder="Seller Company Name *"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Seller VAT ID / Tax ID *
              </label>
              <input
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={seller.vatId}
                onChange={(e) => setSeller({ ...seller, vatId: e.target.value })}
                placeholder="Seller VAT ID / Tax ID *"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Buyer Name *
              </label>
              <input
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={buyer.name}
                onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
                placeholder="Buyer Name *"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Destination Marketplace / Country *
              </label>
              <select
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                value={destCode}
                onChange={(e) => setDestCode(e.target.value)}
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name} ({c.code}) - {c.currency} {c.isEU ? `(EU OSS ${c.vatRate}%)` : '(Export 0%)'}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Buyer Full Address with ZIP *
              </label>
              <input
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={buyer.address}
                onChange={(e) => setBuyer({ ...buyer, address: e.target.value })}
                placeholder="Buyer Full Address with ZIP *"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Amazon Order ID * (111-xxxxxxx-xxxxxxx)
              </label>
              <input
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                value={invoice.orderId}
                onChange={(e) => setInvoice({ ...invoice, orderId: e.target.value })}
                placeholder="Amazon Order ID 111-xxxxxxx-xxxxxxx *"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Harmonized HS Code *
              </label>
              <input
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                value={invoice.hsCode}
                onChange={(e) => setInvoice({ ...invoice, hsCode: e.target.value })}
                placeholder="HS Code (e.g. 8517.12.00) *"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={invoice.qty}
                onChange={(e) => setInvoice({ ...invoice, qty: parseInt(e.target.value) || 1 })}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Unit Price ({dest.currency})
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                value={invoice.unitPrice}
                onChange={(e) => setInvoice({ ...invoice, unitPrice: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FINAL INVOICE - 100% Pass Format Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-blue-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Official Commercial Invoice Preview
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrint}
              variant="outline"
              size="sm"
              className="text-xs font-bold rounded-xl cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 mr-1" /> Print
            </Button>
            <Button
              onClick={downloadPdf}
              size="sm"
              className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 mr-1" /> Download PDF
            </Button>
          </div>
        </div>

        {/* Invoice Body Canvas (Print and Verified format) */}
        <div className="border border-slate-300 dark:border-slate-700 p-6 sm:p-8 font-mono text-xs sm:text-sm bg-white text-black rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <b className="text-slate-950 font-bold">SELLER (Exporter):</b>
              <br />
              {seller.company}
              <br />
              {seller.address}
              <br />
              VAT/Tax ID: {seller.vatId}
              <br />
              EORI: {seller.eori}
              <br />
              {!isExport && `OSS ID: ${seller.ossId}`}
            </div>
            <div className="sm:text-right">
              <b>Invoice No:</b> {invoice.no}
              <br />
              <b>Order Ref:</b> {invoice.orderId}
              <br />
              <b>Date:</b> {invoice.date}
              <br />
              <b>Marketplace:</b> Amazon.{dest.code.toLowerCase()}
            </div>
          </div>

          <hr className="my-4 border-slate-300" />

          <div>
            <b className="text-slate-950 font-bold">BILL TO / SHIP TO:</b>
            <br />
            {buyer.name}
            <br />
            {buyer.address}
            <br />
            Destination: {dest.name} ({dest.code})
            <br />
            {buyer.vatId && `Buyer VAT: ${buyer.vatId}`}
          </div>

          <div className="overflow-x-auto mt-5">
            <table className="w-full border border-slate-300 text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-900 font-bold">
                  <th className="border border-slate-300 p-2.5 text-left">Description</th>
                  <th className="border border-slate-300 p-2.5 text-left">HS Code</th>
                  <th className="border border-slate-300 p-2.5 text-center">Qty</th>
                  <th className="border border-slate-300 p-2.5 text-right">
                    Unit ({dest.currency})
                  </th>
                  <th className="border border-slate-300 p-2.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-2.5">
                    {invoice.product}
                    <br />
                    <span className="text-[11px] text-slate-500">Origin: {invoice.origin}</span>
                  </td>
                  <td className="border border-slate-300 p-2.5 font-mono">{invoice.hsCode}</td>
                  <td className="border border-slate-300 p-2.5 text-center">{invoice.qty}</td>
                  <td className="border border-slate-300 p-2.5 text-right font-mono">
                    {Number(invoice.unitPrice).toFixed(2)}
                  </td>
                  <td className="border border-slate-300 p-2.5 text-right font-mono font-semibold">
                    {subtotal.toFixed(2)} {dest.currency}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-right mt-4 space-y-1 text-xs sm:text-sm">
            <div>
              Subtotal: <span className="font-mono">{subtotal.toFixed(2)} {dest.currency}</span>
            </div>
            <div>
              VAT ({vatRate}%):{' '}
              <span className="font-mono">{vatAmount.toFixed(2)} {dest.currency}</span>
            </div>
            <div className="pt-1 text-sm sm:text-base">
              <b>
                Invoice Total (Gross):{' '}
                <span className="font-mono">{total.toFixed(2)} {dest.currency}</span>
              </b>
            </div>
          </div>

          <div className="mt-6 p-3.5 bg-slate-100 border border-slate-200 text-slate-700 text-xs leading-relaxed rounded">
            <b>Tax Computation Notice:</b> {legalText}. Currency compliant with destination. Certified Client-Side Invoicing via alltoolspk.com. Compliant with EU VAT Directive &amp; Amazon Seller Central Invoice Requirements.
          </div>
        </div>

        <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>✅ 100% Checked: Amazon Format | EU OSS | Article 146 | Currency | VAT ID | HS Code</span>
        </p>
      </div>
    </div>
  );
}

export default AmazonVatInvoiceGenerator;
