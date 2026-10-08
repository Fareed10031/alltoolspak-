'use client';

import React, { useState, useMemo } from 'react';
import jsPDF from 'jspdf';
import {
  ShieldCheck,
  Download,
  Printer,
  FileText,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const COUNTRIES = [
  { code: 'DE', name: 'Germany', rate: 19, currency: 'EUR', symbol: '€', label: 'Germany (19%)', isEU: true, marketplace: 'de' },
  { code: 'FR', name: 'France', rate: 20, currency: 'EUR', symbol: '€', label: 'France (20%)', isEU: true, marketplace: 'fr' },
  { code: 'IT', name: 'Italy', rate: 22, currency: 'EUR', symbol: '€', label: 'Italy (22%)', isEU: true, marketplace: 'it' },
  { code: 'ES', name: 'Spain', rate: 21, currency: 'EUR', symbol: '€', label: 'Spain (21%)', isEU: true, marketplace: 'es' },
  { code: 'NL', name: 'Netherlands', rate: 21, currency: 'EUR', symbol: '€', label: 'Netherlands (21%)', isEU: true, marketplace: 'nl' },
  { code: 'BE', name: 'Belgium', rate: 21, currency: 'EUR', symbol: '€', label: 'Belgium (21%)', isEU: true, marketplace: 'com.be' },
  { code: 'PL', name: 'Poland', rate: 23, currency: 'PLN', symbol: 'zł', label: 'Poland (23%)', isEU: true, marketplace: 'pl' },
  { code: 'SE', name: 'Sweden', rate: 25, currency: 'SEK', symbol: 'kr', label: 'Sweden (25%)', isEU: true, marketplace: 'se' },
  { code: 'GB', name: 'United Kingdom', rate: 20, currency: 'GBP', symbol: '£', label: 'UK (20% VAT)', isEU: false, marketplace: 'co.uk' },
  { code: 'US', name: 'USA (Export)', rate: 0, currency: 'USD', symbol: '$', label: 'USA (0% Export - Art 146)', isEU: false, marketplace: 'com' },
];

export function AmazonEuVatTool() {
  const [buyer, setBuyer] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [buyerVatId, setBuyerVatId] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [countryCode, setCountryCode] = useState('DE');
  const [orderId, setOrderId] = useState('');
  
  // 1. VAT Inclusive vs Exclusive Toggle (Default: inclusive)
  const [pricingMode, setPricingMode] = useState<'inclusive' | 'exclusive'>('inclusive');

  // 2. 2026 Non-EU Customs Duty checkbox (€3 for <= €150 starting July 2026)
  const [applyCustomsDuty2026, setApplyCustomsDuty2026] = useState(false);

  const [copied, setCopied] = useState(false);

  const [seller] = useState({
    company: 'AllToolsPK LTD',
    address: 'AllToolsPK LTD, University Town, Peshawar 25000, Pakistan - EORI: PK-EORI-12345',
    vatId: 'DE123456789 (OSS)',
    eori: 'PK-EORI-12345',
    ossId: 'EU-OSS-123456',
  });

  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0],
    [countryCode]
  );

  const parsedAmount = parseFloat(amountInput) || 0;
  const isExport = country.code === 'US';
  const hasBuyerVatId = buyerVatId.trim().length > 0;

  // Calculation logic based on pricingMode:
  // Inclusive (default): User types Gross. Net = Gross / (1 + rate), VAT = Gross - Net.
  // Exclusive: User types Net. Net = Amount, VAT = Net * rate, Gross = Net + VAT.
  let net = 0;
  let vatAmount = 0;
  let gross = 0;

  if (isExport) {
    net = parsedAmount;
    vatAmount = 0;
    gross = parsedAmount;
  } else if (hasBuyerVatId) {
    // Reverse charge for validated B2B VAT transactions: 0% VAT charged
    net = parsedAmount;
    vatAmount = 0;
    gross = parsedAmount;
  } else if (pricingMode === 'inclusive') {
    gross = parsedAmount;
    net = parsedAmount > 0 ? parsedAmount / (1 + country.rate / 100) : 0;
    vatAmount = gross - net;
  } else {
    // Exclusive mode: net = gross, vat = gross*rate, gross = gross + vat
    net = parsedAmount;
    vatAmount = (parsedAmount * country.rate) / 100;
    gross = net + vatAmount;
  }

  // July 2026 Non-EU Seller Customs Duty (€3 for parcels <= €150)
  const customsDuty = applyCustomsDuty2026 ? 3 : 0;
  const finalGross = gross + customsDuty;

  // Amazon Referral Fee: 15% of Gross
  const referralFee = gross * 0.15;
  // Seller Payout: Net turnover minus referral fee
  const yourPayout = net - referralFee;

  // Default buyer values
  const effectiveBuyer = buyer.trim() || 'Sample Customer';
  const effectiveBuyerAddress = buyerAddress.trim() || 'Friedrichstraße 42, 10117 Berlin, Germany';
  const hasTypedAmount = parsedAmount > 0;
  const canDownload = hasTypedAmount;

  // Tax Notice legal clause determination:
  // If buyer VAT ID filled, show "Reverse Charge - Article 44" else show "Article 146 - Export with OSS" / standard EU OSS line
  const legalTaxNoticeText = hasBuyerVatId
    ? `Reverse Charge - Article 44 / Article 196 of EU VAT Directive 2006/112/EC. VAT to be accounted for by the recipient (B2B). Customer VAT ID: ${buyerVatId.trim()}.`
    : isExport
    ? `Article 146 - Export with OSS. VAT Exempt - Export Outside EU under Article 146 of EU VAT Directive 2006/112/EC. No VAT charged. Place of supply outside EU.`
    : `VAT charged under EU OSS Scheme - Article 146 exemption not applicable for EU destination. Standard rate ${country.rate}% per ${country.name}. HS Code 8517.12.00 - Origin: PK`;

  const copyResults = () => {
    const textToCopy = `Amazon EU VAT Breakdown (${country.name})
Net Turnover: ${country.symbol}${net.toFixed(2)}
VAT (${hasBuyerVatId ? '0% Reverse Charge' : `${country.rate}%`}): ${country.symbol}${vatAmount.toFixed(2)}
Gross Total: ${country.symbol}${finalGross.toFixed(2)}${customsDuty > 0 ? ' (incl. €3 EU Customs Duty)' : ''}
Tax Regime: ${hasBuyerVatId ? 'Reverse Charge - Article 44' : 'Article 146 - Export with OSS'}
Amazon Referral Fee (15%): €${referralFee.toFixed(2)}
Your Payout: €${yourPayout.toFixed(2)}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateInvoiceText = () => {
    return `
${hasBuyerVatId ? 'VAT COMMERCIAL INVOICE - REVERSE CHARGE (ARTICLE 44)' : isExport ? 'COMMERCIAL INVOICE - EXPORT (ARTICLE 146)' : 'VAT COMMERCIAL INVOICE - OSS COMPLIANT'}
Generated by AllToolsPK - 100% Client-Side & EU OSS Ready

SELLER: ${seller.company}
Address: ${seller.address}
VAT ID: ${seller.vatId} | EORI: ${seller.eori} | ${!isExport ? `OSS ID: ${seller.ossId}` : ''}

Invoice No: INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}
Order ID: ${orderId || '111-1234567-1234567'} | Date: ${new Date().toLocaleDateString()} | Marketplace: Amazon.${country.marketplace}
BILL TO: ${effectiveBuyer}
Customer Address: ${effectiveBuyerAddress}
${hasBuyerVatId ? `Customer VAT ID: ${buyerVatId.trim()} (B2B Reverse Charge - Article 44)` : 'Customer VAT ID: Not Provided (B2C Private Consumer)'}
Destination: ${country.name} (${country.code}) | Currency: ${country.currency}

LINE ITEMS:
1. Amazon Marketplace Fulfilled Merchandise (HS Code: 8517.12.00 - Origin: PK)
   Qty: 1 | Net: ${country.symbol} ${net.toFixed(2)} | VAT: ${country.symbol} ${vatAmount.toFixed(2)} | Gross: ${country.symbol} ${gross.toFixed(2)}
${customsDuty > 0 ? `2. EU Customs Duty (July 2026 Non-EU rule <= €150): €3.00\n` : ''}
TOTALS:
Net Turnover: ${country.symbol} ${net.toFixed(2)} ${country.currency}
VAT Amount (${hasBuyerVatId ? '0%' : `${country.rate}%`}): ${country.symbol} ${vatAmount.toFixed(2)} ${country.currency}
Gross Order Total: ${country.symbol} ${finalGross.toFixed(2)} ${country.currency}

Amazon Referral Fee (15%): €${referralFee.toFixed(2)}
Estimated Seller Payout: €${yourPayout.toFixed(2)}

STATUTORY DECLARATION & TAX NOTICE:
${legalTaxNoticeText}

This invoice is generated client-side for Amazon Seller Central compliance. Not a tax advice document. Verify with tax advisor.
    `.trim();
  };

  const downloadTxt = () => {
    if (!canDownload) return;
    const element = document.createElement('a');
    const file = new Blob([generateInvoiceText()], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `VAT_Invoice_${country.code}_${country.currency}_${finalGross.toFixed(2)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadPdf = () => {
    if (!canDownload) return;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    let y = 40;

    // Header Badge
    doc.setFillColor(15, 23, 42);
    doc.rect(40, y, 515, 30, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(255, 255, 255);
    doc.text(
      hasBuyerVatId
        ? 'VAT COMMERCIAL INVOICE - B2B REVERSE CHARGE (ARTICLE 44)'
        : isExport
        ? 'COMMERCIAL INVOICE - EXPORT (ARTICLE 146)'
        : 'VAT COMMERCIAL INVOICE (EU OSS COMPLIANT)',
      50,
      y + 19
    );

    y += 45;

    // Seller Info (Full address: AllToolsPK LTD, University Town, Peshawar 25000, Pakistan - EORI: PK-EORI-12345)
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.text(seller.company, 40, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(seller.address, 40, y + 13);
    doc.text(`Tax ID: ${seller.vatId} | EORI: ${seller.eori}`, 40, y + 24);
    if (!isExport) {
      doc.text(`Union OSS Identification: ${seller.ossId}`, 40, y + 35);
    }

    // Invoice Meta Right
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(`Invoice No: INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`, 340, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 340, y + 13);
    doc.text(`Order ID: ${orderId || '111-1234567-1234567'}`, 340, y + 24);
    doc.text(`Marketplace: Amazon.${country.marketplace}`, 340, y + 35);

    y += 52;

    // Divider Line
    doc.setDrawColor(226, 232, 240);
    doc.line(40, y, 555, y);
    y += 14;

    // Bill To section with Buyer Full Address + Buyer VAT ID
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('BILL TO / CUSTOMER:', 40, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(effectiveBuyer, 40, y + 12);
    doc.text(`Address: ${effectiveBuyerAddress}`, 40, y + 23);
    if (hasBuyerVatId) {
      doc.setFont('helvetica', 'bold');
      doc.text(`Buyer VAT ID: ${buyerVatId.trim()} [Reverse Charge - Article 44 Applied]`, 40, y + 34);
      doc.setFont('helvetica', 'normal');
      doc.text(`Destination: ${country.name} (${country.code}) | Currency: ${country.currency}`, 40, y + 45);
      y += 58;
    } else {
      doc.text(`Buyer VAT ID: N/A (B2C Consumer) [Article 146 - Export with OSS]`, 40, y + 34);
      doc.text(`Destination: ${country.name} (${country.code}) | Currency: ${country.currency}`, 40, y + 45);
      y += 58;
    }

    // Line Item Table Header
    doc.setFillColor(241, 245, 249);
    doc.rect(40, y, 515, 20, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text('Item Description', 48, y + 13);
    doc.text('HS Code', 260, y + 13);
    doc.text('Qty', 350, y + 13);
    doc.text(`Net (${country.currency})`, 405, y + 13);
    doc.text(`Gross (${country.currency})`, 480, y + 13);

    y += 22;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Amazon Marketplace Fulfilled Merchandise', 48, y + 13);
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text('Origin: PK', 48, y + 23);

    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text('8517.12.00', 260, y + 13);
    doc.text('1', 350, y + 13);
    doc.text(`${country.symbol} ${net.toFixed(2)}`, 405, y + 13);
    doc.text(`${country.symbol} ${gross.toFixed(2)}`, 480, y + 13);

    y += 36;

    // Totals Table
    doc.setDrawColor(226, 232, 240);
    doc.line(320, y, 555, y);
    y += 13;

    doc.setFont('helvetica', 'normal');
    doc.text(`Net Turnover:`, 340, y);
    doc.text(`${country.symbol} ${net.toFixed(2)} ${country.currency}`, 480, y);
    y += 13;

    doc.text(`VAT (${hasBuyerVatId ? '0% Reverse Charge' : `${country.rate}%`}):`, 340, y);
    doc.text(`${country.symbol} ${vatAmount.toFixed(2)} ${country.currency}`, 480, y);
    y += 13;

    if (customsDuty > 0) {
      doc.text(`EU Customs Duty (2026):`, 340, y);
      doc.text(`€3.00`, 480, y);
      y += 13;
    }

    doc.setDrawColor(15, 23, 42);
    doc.line(320, y, 555, y);
    y += 14;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(`Gross Total:`, 340, y);
    doc.text(`${country.symbol} ${finalGross.toFixed(2)} ${country.currency}`, 480, y);

    y += 26;

    // Legal Box with Exact Required Line
    doc.setFillColor(248, 250, 252);
    doc.rect(40, y, 515, 42, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.rect(40, y, 515, 42, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text('Tax Notice & Statutory Declaration:', 48, y + 12);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const noticeLines = doc.splitTextToSize(legalTaxNoticeText, 495);
    doc.text(noticeLines, 48, y + 23);

    y += 54;

    // 3. Invoice PDF Footer
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      'This invoice is generated client-side for Amazon Seller Central compliance. Not a tax advice document. Verify with tax advisor.',
      40,
      y
    );

    doc.save(`VAT_Invoice_${country.code}_${country.currency}_${finalGross.toFixed(2)}.pdf`);
  };

  const handlePrint = () => {
    if (!canDownload) return;
    window.print();
  };

  const loadSample = () => {
    setBuyer('Enterprise Logistics GmbH');
    setBuyerAddress('Friedrichstraße 42, 10117 Berlin, Germany');
    setBuyerVatId('DE987654321');
    setAmountInput('119.00');
    setCountryCode('DE');
    setOrderId('111-7892341-9921045');
    setPricingMode('inclusive');
    setApplyCustomsDuty2026(false);
  };

  const resetForm = () => {
    setBuyer('');
    setBuyerAddress('');
    setBuyerVatId('');
    setAmountInput('');
    setCountryCode('DE');
    setOrderId('');
    setPricingMode('inclusive');
    setApplyCustomsDuty2026(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-sm">
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              Directive 2006/112/EC
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Client-Side
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Amazon EU VAT Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            EU OSS & Article 146 Tax Engine • 2026 Updated Rates • Instant Compliant Invoices
          </p>
        </div>

        <div className="flex items-center gap-2 no-print">
          <Button
            variant="outline"
            size="sm"
            onClick={loadSample}
            className="text-xs font-semibold rounded-xl cursor-pointer border-slate-200 dark:border-slate-700"
          >
            Sample Data
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetForm}
            className="text-xs font-semibold rounded-xl cursor-pointer text-slate-500 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
          </Button>
        </div>
      </div>

      {/* Pricing Mode Toggle */}
      <div className="mt-6 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-700 dark:text-slate-300">
          Pricing Calculation Mode:
        </span>
        <div className="inline-flex rounded-xl p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setPricingMode('inclusive')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              pricingMode === 'inclusive'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Price is VAT Inclusive (default)
          </button>
          <button
            type="button"
            onClick={() => setPricingMode('exclusive')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              pricingMode === 'exclusive'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Price is VAT Exclusive
          </button>
        </div>
      </div>

      {/* 2026 Non-EU Customs Duty Checkbox */}
      <div className="mt-3 p-3 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 rounded-2xl flex items-center gap-3">
        <input
          type="checkbox"
          id="customs2026"
          checked={applyCustomsDuty2026}
          onChange={(e) => setApplyCustomsDuty2026(e.target.checked)}
          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
        />
        <label htmlFor="customs2026" className="text-xs font-semibold text-amber-900 dark:text-amber-200 cursor-pointer">
          Non-EU seller? Add €3 EU Customs Duty (July 2026 rule for orders ≤ €150)
        </label>
      </div>

      {/* Main Input Form with Buyer Full Address + Buyer VAT ID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div>
          <label className="text-[11px] font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
            BUYER / CUSTOMER NAME (OPTIONAL)
          </label>
          <input
            value={buyer}
            onChange={(e) => setBuyer(e.target.value)}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-3 mt-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="e.g. Enterprise Logistics GmbH (default: Sample Customer)"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
            BUYER FULL ADDRESS (OPTIONAL)
          </label>
          <input
            value={buyerAddress}
            onChange={(e) => setBuyerAddress(e.target.value)}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-3 mt-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="e.g. Friedrichstraße 42, 10117 Berlin, Germany"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span>BUYER VAT ID (OPTIONAL FOR B2B)</span>
            {hasBuyerVatId && <span className="text-blue-600 font-bold text-[10px]">Article 44 Reverse Charge</span>}
          </label>
          <input
            value={buyerVatId}
            onChange={(e) => setBuyerVatId(e.target.value)}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-3 mt-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
            placeholder="e.g. DE987654321 (triggers Reverse Charge)"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
            {pricingMode === 'inclusive' ? 'GROSS ORDER TOTAL' : 'NET ORDER AMOUNT'} ({country.symbol} {country.currency}) *
          </label>
          <input
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            type="number"
            step="0.01"
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-3 mt-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
            placeholder="e.g. 119.00"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
            DESTINATION COUNTRY / TAX JURISDICTION
          </label>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-3 mt-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label} - {c.currency} (Amazon.{c.marketplace})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
            INVOICE / ORDER ID (OPTIONAL)
          </label>
          <input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-3 mt-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
            placeholder="e.g. 111-1234567-1234567"
          />
        </div>
      </div>

      {/* Live Calculation Breakdown */}
      {hasTypedAmount && (
        <div className="bg-[#F0F6FF] dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 rounded-2xl p-4 sm:p-5 mt-6 animate-in fade-in duration-200">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-950 dark:text-blue-200">
              LIVE CALCULATION BREAKDOWN
            </span>
            <div className="flex items-center gap-2">
              <span className="bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 text-xs px-3 py-1 rounded-full font-bold text-slate-800 dark:text-slate-200 shadow-xs">
                {country.name} • {hasBuyerVatId ? 'B2B Reverse Charge 0%' : `${country.rate}% ${isExport ? 'Export' : 'VAT'}`}
              </span>
              <button
                type="button"
                onClick={copyResults}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer transition-colors shadow-xs"
                title="Copy breakdown to clipboard"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 text-center shadow-xs border border-blue-50 dark:border-slate-700">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Net Turnover</div>
              <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-0.5">
                {country.symbol} {net.toFixed(2)}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 text-center shadow-xs border border-blue-50 dark:border-slate-700">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {hasBuyerVatId ? 'VAT (0% Rev Charge)' : `VAT (${country.rate}%)`}
              </div>
              <div className="font-bold text-sm sm:text-base text-blue-600 dark:text-blue-400 mt-0.5">
                {country.symbol} {vatAmount.toFixed(2)}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 text-center shadow-xs border border-blue-50 dark:border-slate-700">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Gross Total</div>
              <div className="font-bold text-sm sm:text-base text-emerald-600 dark:text-emerald-400 mt-0.5">
                {country.symbol} {finalGross.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Profit Box */}
          <div className="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900/60 p-4 rounded-xl mt-4 text-xs sm:text-sm">
            <div className="text-slate-700 dark:text-slate-300 font-medium">
              Amazon Referral Fee (15%): €{referralFee.toFixed(2)}
            </div>
            <div className="font-bold text-green-700 dark:text-green-400 text-base mt-1">
              Your Payout: €{yourPayout.toFixed(2)}
            </div>
          </div>

          <div className="text-[11px] mt-3 bg-white dark:bg-slate-800 p-2.5 rounded-lg text-slate-600 dark:text-slate-300 border border-blue-100 dark:border-slate-700 leading-relaxed">
            {hasBuyerVatId ? (
              <span className="font-semibold text-blue-600">Reverse Charge - Article 44 applied. Customer VAT: {buyerVatId.trim()}.</span>
            ) : (
              <span>Article 146 - Export with OSS. {country.rate}% standard rate applicable.</span>
            )}
            {customsDuty > 0 && ` • Includes €3.00 July 2026 Non-EU Customs Duty`}
          </div>
        </div>
      )}

      {/* Validation helper */}
      {!hasTypedAmount && (
        <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 p-3 rounded-xl mt-4 text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2">
          <span>💡 Enter an order amount to view live net turnover, VAT, profit breakdown, and unlock invoice downloads.</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="no-print space-y-2 mt-4">
        <button
          disabled={!canDownload}
          onClick={downloadPdf}
          className={`w-full p-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm text-sm ${
            canDownload
              ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
          }`}
        >
          <Download className="w-4 h-4" />
          {canDownload
            ? `Download 100% PASS PDF (${country.currency} ${finalGross.toFixed(2)})`
            : 'Enter Amount to Enable Download'}
        </button>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            disabled={!canDownload}
            onClick={downloadTxt}
            className="text-xs font-bold rounded-xl cursor-pointer h-10 border-slate-300 dark:border-slate-700"
          >
            <FileText className="w-3.5 h-3.5 mr-1" /> Download Text (.txt)
          </Button>
          <Button
            variant="outline"
            disabled={!canDownload}
            onClick={handlePrint}
            className="text-xs font-bold rounded-xl cursor-pointer h-10 border-slate-300 dark:border-slate-700"
          >
            <Printer className="w-3.5 h-3.5 mr-1" /> Print / Save as PDF
          </Button>
        </div>

        <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1.5 pt-1">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>✅ 100% Verified: Auto Currency ({country.currency}) | Article 146 | EU OSS Scheme | HS 8517.12.00</span>
        </p>

        {/* About Section with 3 Steps, FAQs, and Tax Notice */}
        <div className="mt-12 p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-left">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">About Amazon EU VAT Calculator</h2>
          
          <div className="prose max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base">
            <p>
              Amazon EU VAT Calculator is a free, privacy-first, client-side tool built for Amazon FBA sellers 
              who sell products to customers in the 27 EU countries. It calculates VAT automatically under the 
              EU OSS (One Stop Shop) Scheme and EU VAT Directive 2006/112/EC. The tool auto-detects the correct 
              VAT rate based on the destination country, calculates net turnover, VAT amount, and generates a 
              professional invoice with OSS ID, HS Code 8517.12.00, and Article 146 reference. No data is uploaded 
              to any server. All calculations happen inside your browser.
            </p>

            {/* 3 STEPS SECTION */}
            <h2 className="text-2xl font-bold mt-8 text-slate-900 dark:text-white">How to Use in 3 Steps</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-2">1</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Enter Gross Amount</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Input your customer&apos;s order amount and select whether pricing is VAT inclusive or exclusive.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-2">2</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Select Country</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Pick destination EU tax jurisdiction. The engine automatically loads standard VAT rates for 2026.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-2">3</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">See Profit + Download Invoice</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Review Amazon 15% referral fee and your net seller payout, then download your audit-ready invoice in 1 click.</p>
              </div>
            </div>

            {/* SEO FAQ SECTION */}
            <h2 className="text-2xl font-bold mt-8 text-slate-900 dark:text-white">Frequently Asked Questions (FAQ)</h2>
            <div className="space-y-4 pt-1">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">What is OSS?</h3>
                <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">
                  The One-Stop Shop (OSS) is an electronic portal introduced under the European Union VAT e-commerce package. It allows cross-border sellers to register for VAT in a single EU Member State and declare and pay all VAT due in all other EU Member States on consumer sales through a single quarterly return, avoiding individual VAT registrations in 27 countries.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">What is IOSS vs OSS?</h3>
                <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">
                  Import One-Stop Shop (IOSS) applies strictly to distance sales of imported goods dispatched from non-EU countries with a consignment intrinsic value not exceeding €150. OSS (Union scheme) covers intra-EU distance sales of goods and B2C services where the merchandise is already physically stored within the EU territory (such as Amazon FBA European fulfillment centers).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">How much VAT in Germany?</h3>
                <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">
                  The standard VAT rate in Germany (Umsatzsteuer / MwSt.) is 19% applicable to most consumer merchandise, electronics, and digital services. Germany also maintains a reduced rate of 7% for select essential goods such as books, printed media, basic foodstuffs, and hotel accommodations.
                </p>
              </div>
            </div>

            {/* DISCLAIMER */}
            <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-4 font-medium italic">
              Disclaimer: Not tax advice, for information only. This tool provides calculations based on publicly available EU VAT rates for 2026. Please consult a qualified tax advisor or certified accountant for statutory filing advice.
            </p>
          </div>
        </div>
      </div>

      {/* Print Document Render */}
      <div
        id="print-area"
        className="hidden print:block mt-8 whitespace-pre-wrap font-mono text-xs border border-black p-6 bg-white text-black"
      >
        {generateInvoiceText()}
      </div>
    </div>
  );
}

export default AmazonEuVatTool;
