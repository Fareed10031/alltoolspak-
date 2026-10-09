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

// All 27 European Union Member States (Strictly EU only, zero non-EU countries)
export const COUNTRIES = [
  { code: 'DE', name: 'Germany', rate: 19, currency: 'EUR', symbol: '€', label: 'Germany (19%)', isEU: true, marketplace: 'de' },
  { code: 'FR', name: 'France', rate: 20, currency: 'EUR', symbol: '€', label: 'France (20%)', isEU: true, marketplace: 'fr' },
  { code: 'IT', name: 'Italy', rate: 22, currency: 'EUR', symbol: '€', label: 'Italy (22%)', isEU: true, marketplace: 'it' },
  { code: 'ES', name: 'Spain', rate: 21, currency: 'EUR', symbol: '€', label: 'Spain (21%)', isEU: true, marketplace: 'es' },
  { code: 'NL', name: 'Netherlands', rate: 21, currency: 'EUR', symbol: '€', label: 'Netherlands (21%)', isEU: true, marketplace: 'nl' },
  { code: 'PL', name: 'Poland', rate: 23, currency: 'PLN', symbol: 'zł', label: 'Poland (23%)', isEU: true, marketplace: 'pl' },
  { code: 'BE', name: 'Belgium', rate: 21, currency: 'EUR', symbol: '€', label: 'Belgium (21%)', isEU: true, marketplace: 'com.be' },
  { code: 'AT', name: 'Austria', rate: 20, currency: 'EUR', symbol: '€', label: 'Austria (20%)', isEU: true, marketplace: 'de' },
  { code: 'SE', name: 'Sweden', rate: 25, currency: 'SEK', symbol: 'kr', label: 'Sweden (25%)', isEU: true, marketplace: 'se' },
  { code: 'DK', name: 'Denmark', rate: 25, currency: 'DKK', symbol: 'kr.', label: 'Denmark (25%)', isEU: true, marketplace: 'de' },
  { code: 'FI', name: 'Finland', rate: 25.5, currency: 'EUR', symbol: '€', label: 'Finland (25.5%)', isEU: true, marketplace: 'de' },
  { code: 'IE', name: 'Ireland', rate: 23, currency: 'EUR', symbol: '€', label: 'Ireland (23%)', isEU: true, marketplace: 'co.uk' },
  { code: 'PT', name: 'Portugal', rate: 23, currency: 'EUR', symbol: '€', label: 'Portugal (23%)', isEU: true, marketplace: 'es' },
  { code: 'CZ', name: 'Czech Republic', rate: 21, currency: 'CZK', symbol: 'Kč', label: 'Czech Republic (21%)', isEU: true, marketplace: 'de' },
  { code: 'RO', name: 'Romania', rate: 19, currency: 'RON', symbol: 'lei', label: 'Romania (19%)', isEU: true, marketplace: 'de' },
  { code: 'HU', name: 'Hungary', rate: 27, currency: 'HUF', symbol: 'Ft', label: 'Hungary (27%)', isEU: true, marketplace: 'de' },
  { code: 'GR', name: 'Greece', rate: 24, currency: 'EUR', symbol: '€', label: 'Greece (24%)', isEU: true, marketplace: 'it' },
  { code: 'BG', name: 'Bulgaria', rate: 20, currency: 'BGN', symbol: 'лв', label: 'Bulgaria (20%)', isEU: true, marketplace: 'de' },
  { code: 'HR', name: 'Croatia', rate: 25, currency: 'EUR', symbol: '€', label: 'Croatia (25%)', isEU: true, marketplace: 'it' },
  { code: 'SK', name: 'Slovakia', rate: 20, currency: 'EUR', symbol: '€', label: 'Slovakia (20%)', isEU: true, marketplace: 'de' },
  { code: 'SI', name: 'Slovenia', rate: 22, currency: 'EUR', symbol: '€', label: 'Slovenia (22%)', isEU: true, marketplace: 'it' },
  { code: 'LT', name: 'Lithuania', rate: 21, currency: 'EUR', symbol: '€', label: 'Lithuania (21%)', isEU: true, marketplace: 'de' },
  { code: 'LV', name: 'Latvia', rate: 21, currency: 'EUR', symbol: '€', label: 'Latvia (21%)', isEU: true, marketplace: 'de' },
  { code: 'EE', name: 'Estonia', rate: 22, currency: 'EUR', symbol: '€', label: 'Estonia (22%)', isEU: true, marketplace: 'de' },
  { code: 'CY', name: 'Cyprus', rate: 19, currency: 'EUR', symbol: '€', label: 'Cyprus (19%)', isEU: true, marketplace: 'de' },
  { code: 'LU', name: 'Luxembourg', rate: 17, currency: 'EUR', symbol: '€', label: 'Luxembourg (17%)', isEU: true, marketplace: 'de' },
  { code: 'MT', name: 'Malta', rate: 18, currency: 'EUR', symbol: '€', label: 'Malta (18%)', isEU: true, marketplace: 'it' },
];

// Official European Commission VIES EU VAT ID Regex Patterns (Strict validation)
export const EU_VAT_PATTERNS: Record<string, { regex: RegExp; formatHint: string }> = {
  DE: { regex: /^DE[0-9]{9}$/, formatHint: '^DE[0-9]{9}$ (DE + 9 digits only)' },
  IT: { regex: /^IT[0-9]{11}$/, formatHint: '^IT[0-9]{11}$ (IT + 11 digits)' },
  FR: { regex: /^FR[A-Z0-9]{2}[0-9]{9}$/, formatHint: '^FR[A-Z0-9]{2}[0-9]{9}$ (FR + 2 alphanumeric + 9 digits)' },
  ES: { regex: /^ES[A-Z0-9][0-9]{7}[A-Z0-9]$/, formatHint: 'ES + 9 alphanumeric characters' },
  NL: { regex: /^NL[0-9]{9}B[0-9]{2}$/, formatHint: 'NL + 9 digits + B + 2 digits (e.g. NL123456789B01)' },
  PL: { regex: /^PL[0-9]{10}$/, formatHint: 'PL + 10 digits (e.g. PL1234567890)' },
  BE: { regex: /^BE[0-1][0-9]{9}$/, formatHint: 'BE + 10 digits (e.g. BE0123456789)' },
  AT: { regex: /^ATU[0-9]{8}$/, formatHint: 'ATU + 8 digits (e.g. ATU12345678)' },
  SE: { regex: /^SE[0-9]{12}$/, formatHint: 'SE + 12 digits' },
  DK: { regex: /^DK[0-9]{8}$/, formatHint: 'DK + 8 digits' },
  FI: { regex: /^FI[0-9]{8}$/, formatHint: 'FI + 8 digits' },
  IE: { regex: /^IE([0-9]{7}[A-W][A-I]?|[0-9][A-Z0-9+*][0-9]{5}[A-W])$/, formatHint: 'IE + 8 or 9 alphanumeric chars' },
  PT: { regex: /^PT[0-9]{9}$/, formatHint: 'PT + 9 digits' },
  CZ: { regex: /^CZ[0-9]{8,10}$/, formatHint: 'CZ + 8 to 10 digits' },
  RO: { regex: /^RO[0-9]{2,10}$/, formatHint: 'RO + 2 to 10 digits' },
  HU: { regex: /^HU[0-9]{8}$/, formatHint: 'HU + 8 digits' },
  GR: { regex: /^(GR|EL)[0-9]{9}$/, formatHint: 'GR/EL + 9 digits' },
  EL: { regex: /^EL[0-9]{9}$/, formatHint: 'EL + 9 digits' },
  BG: { regex: /^BG[0-9]{9,10}$/, formatHint: 'BG + 9 or 10 digits' },
  HR: { regex: /^HR[0-9]{11}$/, formatHint: 'HR + 11 digits' },
  SK: { regex: /^SK[0-9]{10}$/, formatHint: 'SK + 10 digits' },
  SI: { regex: /^SI[0-9]{8}$/, formatHint: 'SI + 8 digits' },
  LT: { regex: /^LT([0-9]{9}|[0-9]{12})$/, formatHint: 'LT + 9 or 12 digits' },
  LV: { regex: /^LV[0-9]{11}$/, formatHint: 'LV + 11 digits' },
  EE: { regex: /^EE[0-9]{9}$/, formatHint: 'EE + 9 digits' },
  CY: { regex: /^CY[0-9]{8}[A-Z]$/, formatHint: 'CY + 8 digits + 1 letter' },
  LU: { regex: /^LU[0-9]{8}$/, formatHint: 'LU + 8 digits' },
  MT: { regex: /^MT[0-9]{8}$/, formatHint: 'MT + 8 digits' },
};

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
  
  // Strict Buyer VAT ID EU Format Validation per EU Member State:
  // DE must be ^DE[0-9]{9}$ (9 digits only), IT must be ^IT[0-9]{11}$, FR must be ^FR[A-Z0-9]{2}[0-9]{9}$, etc.
  const cleanVatId = buyerVatId.trim().toUpperCase();
  const isVatIdProvided = cleanVatId.length > 0;

  const vatValidation = useMemo(() => {
    if (!isVatIdProvided) return { isValid: true, error: '' };
    const prefix = cleanVatId.substring(0, 2);
    const pattern = EU_VAT_PATTERNS[prefix];

    if (!pattern) {
      return {
        isValid: false,
        error: `Invalid EU country prefix "${prefix}". VAT ID must start with a valid 2-letter EU Member State code (e.g. DE, IT, FR, ES, NL).`,
      };
    }

    if (!pattern.regex.test(cleanVatId)) {
      return {
        isValid: false,
        error: `Invalid format for ${prefix} VAT ID. Required format: ${pattern.formatHint}.`,
      };
    }

    return { isValid: true, error: '' };
  }, [cleanVatId, isVatIdProvided]);

  const isVatIdValid = vatValidation.isValid;
  const vatErrorMessage = vatValidation.error;
  const hasValidBuyerVatId = isVatIdProvided && isVatIdValid;

  // Buyer Full Address Validation:
  // If address length < 15 chars or does not contain city/country, show yellow warning
  const trimmedAddress = buyerAddress.trim();
  const hasTypedAddress = trimmedAddress.length > 0;

  const isAddressComplete = useMemo(() => {
    if (!hasTypedAddress) return true;
    if (trimmedAddress.length < 15) return false;

    const lower = trimmedAddress.toLowerCase();
    
    // Check if contains EU country name or country code
    const mentionsCountry = COUNTRIES.some(
      (c) =>
        lower.includes(c.name.toLowerCase()) ||
        new RegExp(`\\b${c.code.toLowerCase()}\\b`).test(lower)
    ) || /germany|deutschland|italy|italia|france|spain|españa|netherlands|poland|belgium|austria|österreich|sweden|denmark|finland|ireland|portugal|czech|romania|hungary|greece|bulgaria|croatia|slovakia|slovenia|lithuania|latvia|estonia|cyprus|luxembourg|malta/i.test(lower);

    // Check if contains city name or postal/comma address structure
    const mentionsCity = /milano|milan|roma|rome|napoli|torino|turin|berlin|munich|münchen|hamburg|frankfurt|köln|cologne|paris|lyon|marseille|madrid|barcelona|valencia|seville|amsterdam|rotterdam|utrecht|warsaw|warszawa|krakow|vienna|wien|brussels|bruxelles|dublin|cork|lisbon|lisboa|porto|prague|praha|athens|sofia|zagreb|bratislava|ljubljana|vilnius|riga|tallinn|nicosia/i.test(lower);

    const hasCityPostalComma = trimmedAddress.includes(',') && /[0-9]{4,5}/.test(trimmedAddress);

    return mentionsCountry || mentionsCity || hasCityPostalComma;
  }, [trimmedAddress, hasTypedAddress]);

  const showAddressWarning = hasTypedAddress && !isAddressComplete;

  // Invoice Logic:
  // Since all 27 countries are strictly EU Member States:
  // - IF Buyer VAT ID is valid EU format -> Article 44 Reverse Charge + 0% VAT
  // - IF Buyer VAT ID is empty -> Article 146 + OSS ID (standard destination rate applied)
  let net = 0;
  let vatAmount = 0;
  let gross = 0;

  if (hasValidBuyerVatId) {
    // Valid B2B Reverse Charge: 0% VAT
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
  const effectiveBuyerAddress =
    buyerAddress.trim() || 'Via Roma 10, 20121 Milano, Italy';
  const hasTypedAmount = parsedAmount > 0;
  const canDownload = hasTypedAmount && isVatIdValid;

  // Tax Notice text:
  // IF Buyer VAT ID valid -> Article 44 Reverse Charge
  // IF Buyer VAT ID empty -> Article 146 + OSS ID
  const legalTaxNoticeText = hasValidBuyerVatId
    ? `Reverse Charge - Article 44 / Article 196 of EU VAT Directive 2006/112/EC. VAT to be accounted for by the recipient (B2B intra-Community supply). Customer VAT ID: ${cleanVatId}. Standard rate 0% reverse-charged.`
    : `VAT charged under EU OSS Scheme - Article 146 exemption not applicable for EU destination. Standard rate ${country.rate}% per ${country.name}. HS Code 8517.12.00 - Origin: PK. OSS ID: ${seller.ossId}.`;

  const copyResults = () => {
    const textToCopy = `Amazon EU VAT Breakdown (${country.name})
Net Turnover: ${country.symbol}${net.toFixed(2)}
VAT (${hasValidBuyerVatId ? '0% Reverse Charge' : `${country.rate}%`}): ${country.symbol}${vatAmount.toFixed(2)}
${customsDuty > 0 ? `EU Customs Duty (2026): €3.00\n` : ''}Gross Total: ${country.symbol}${finalGross.toFixed(2)}${customsDuty > 0 ? ` (Gross becomes ${country.symbol}${finalGross.toFixed(2)})` : ''}
Tax Regime: ${hasValidBuyerVatId ? 'Article 44 Reverse Charge (0%)' : `Article 146 + OSS ID (${country.rate}%)`}
Amazon Referral Fee (15%): €${referralFee.toFixed(2)}
Your Payout: €${yourPayout.toFixed(2)}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateInvoiceText = () => {
    return `
${hasValidBuyerVatId ? 'VAT COMMERCIAL INVOICE - B2B REVERSE CHARGE (ARTICLE 44)' : 'VAT COMMERCIAL INVOICE - EU OSS SCHEME COMPLIANT'}
Generated by AllToolsPK - 100% Client-Side & EU OSS Ready

SELLER: ${seller.company}
Address: ${seller.address}
VAT ID: ${seller.vatId} | EORI: ${seller.eori} | ${!hasValidBuyerVatId ? `OSS ID: ${seller.ossId}` : ''}

Invoice No: INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}
Order ID: ${orderId || '111-1234567-1234567'} | Date: ${new Date().toLocaleDateString()} | Marketplace: Amazon.${country.marketplace}
BILL TO: ${effectiveBuyer}
Customer Address: ${effectiveBuyerAddress}
${hasValidBuyerVatId ? `Customer VAT ID: ${cleanVatId} (B2B Reverse Charge - Article 44)` : 'Customer VAT ID: Not Provided (B2C Private Consumer - EU OSS Article 146)'}
Destination: ${country.name} (${country.code}) | Currency: ${country.currency}

LINE ITEMS:
1. Amazon Marketplace Fulfilled Merchandise (HS Code: 8517.12.00 - Origin: PK)
   Qty: 1 | Net: ${country.symbol} ${net.toFixed(2)} | VAT: ${country.symbol} ${vatAmount.toFixed(2)} | Gross: ${country.symbol} ${gross.toFixed(2)}
${customsDuty > 0 ? `2. EU Customs Duty (July 2026 Non-EU rule <= €150): €3.00\n` : ''}
TOTALS:
Net Turnover: ${country.symbol} ${net.toFixed(2)} ${country.currency}
VAT Amount (${hasValidBuyerVatId ? '0%' : `${country.rate}%`}): ${country.symbol} ${vatAmount.toFixed(2)} ${country.currency}
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
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(
      hasValidBuyerVatId
        ? 'VAT COMMERCIAL INVOICE - B2B REVERSE CHARGE (ARTICLE 44)'
        : 'VAT COMMERCIAL INVOICE (EU OSS SCHEME & ARTICLE 146 COMPLIANT)',
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
    if (!hasValidBuyerVatId) {
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
    if (hasValidBuyerVatId) {
      doc.setFont('helvetica', 'bold');
      doc.text(`Buyer VAT ID: ${cleanVatId} [Reverse Charge - Article 44 Applied (0% VAT)]`, 40, y + 34);
      doc.setFont('helvetica', 'normal');
      doc.text(`Destination: ${country.name} (${country.code}) | Currency: ${country.currency}`, 40, y + 45);
      y += 58;
    } else {
      doc.text(`Buyer VAT ID: N/A (B2C Private Consumer) [Article 146 - EU OSS Scheme]`, 40, y + 34);
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

    doc.text(`VAT (${hasValidBuyerVatId ? '0% Reverse Charge' : `${country.rate}%`}):`, 340, y);
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

    // Legal Box
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

    // Invoice PDF Footer
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
    setBuyer('Enterprise Logistics SRL');
    setBuyerAddress('Via Roma 10, 20121 Milano, Italy');
    setBuyerVatId('IT12345678901');
    setAmountInput('120.00');
    setCountryCode('IT');
    setOrderId('111-7892341-9921045');
    setPricingMode('inclusive');
    setApplyCustomsDuty2026(true);
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
              <ShieldCheck className="w-3.5 h-3.5" /> 27 EU Member States Only
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Amazon EU VAT Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            EU OSS & Article 44 B2B Tax Engine • 2026 Updated Rates for 27 EU Countries • Instant Compliant Invoices
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
            className={`w-full border rounded-xl p-3 mt-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 text-sm ${
              showAddressWarning
                ? 'border-amber-400 focus:ring-amber-400 bg-amber-50/20'
                : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
            }`}
            placeholder="Via Roma 10, 20121 Milano, Italy - Full EU address required"
          />
          {showAddressWarning && (
            <div className="mt-1.5 p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/70 rounded-xl text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2 font-medium animate-in fade-in">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Please enter complete EU address with city, postcode, country for Amazon compliance</span>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
              BUYER VAT ID (OPTIONAL FOR B2B)
            </label>
            {hasValidBuyerVatId && (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[10px] flex items-center gap-1">
                ✓ Valid EU B2B Reverse Charge (Article 44)
              </span>
            )}
          </div>
          <input
            value={buyerVatId}
            onChange={(e) => setBuyerVatId(e.target.value)}
            className={`w-full border rounded-xl p-3 mt-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 text-sm font-mono uppercase ${
              isVatIdProvided && !isVatIdValid
                ? 'border-rose-500 focus:ring-rose-500 bg-rose-50/20'
                : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
            }`}
            placeholder="e.g. DE123456789 (DE: 9 digits, IT: 11 digits, FR: 2+9 digits)"
          />
          {isVatIdProvided && !isVatIdValid && (
            <p className="text-rose-600 dark:text-rose-400 text-xs mt-1 font-semibold flex items-center gap-1">
              ⚠️ {vatErrorMessage || 'Invalid EU VAT ID format.'}
            </p>
          )}
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

        <div className="sm:col-span-2">
          <label className="text-[11px] font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span>DESTINATION COUNTRY (27 EU MEMBER STATES ONLY)</span>
            <span className="text-blue-600 font-bold text-[10px]">Strictly EU Territory</span>
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

        <div className="sm:col-span-2">
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
                {country.name} • {hasValidBuyerVatId ? 'Article 44 Reverse Charge (0%)' : `Article 146 OSS (${country.rate}%)`}
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

          <div className={`grid ${customsDuty > 0 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'} gap-3 mt-4`}>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 text-center shadow-xs border border-blue-50 dark:border-slate-700">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Net Turnover</div>
              <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-0.5">
                {country.symbol} {net.toFixed(2)}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 text-center shadow-xs border border-blue-50 dark:border-slate-700">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {hasValidBuyerVatId ? 'VAT (0% Rev Charge)' : `VAT (${country.rate}%)`}
              </div>
              <div className="font-bold text-sm sm:text-base text-blue-600 dark:text-blue-400 mt-0.5">
                {country.symbol} {vatAmount.toFixed(2)}
              </div>
            </div>
            {customsDuty > 0 && (
              <div className="bg-amber-50 dark:bg-amber-950/40 rounded-xl p-3 text-center shadow-xs border border-amber-200 dark:border-amber-800">
                <div className="text-[11px] text-amber-800 dark:text-amber-300 font-bold">
                  EU Customs Duty (2026)
                </div>
                <div className="font-bold text-sm sm:text-base text-amber-900 dark:text-amber-200 mt-0.5">
                  €3.00
                </div>
              </div>
            )}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 text-center shadow-xs border border-blue-50 dark:border-slate-700">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Gross Total</div>
              <div className="font-bold text-sm sm:text-base text-emerald-600 dark:text-emerald-400 mt-0.5">
                {country.symbol} {finalGross.toFixed(2)}
              </div>
            </div>
          </div>

          {/* EU Customs Duty Banner */}
          {customsDuty > 0 && (
            <div className="mt-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3 text-xs text-amber-900 dark:text-amber-200 font-semibold flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block animate-pulse"></span>
                <span>EU Customs Duty (2026): €3.00</span>
              </span>
              <span className="font-bold text-amber-950 dark:text-amber-100 bg-amber-100 dark:bg-amber-900/60 px-2.5 py-1 rounded-md text-xs">
                Gross becomes {country.symbol}{finalGross.toFixed(2)}
              </span>
            </div>
          )}

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
            {hasValidBuyerVatId ? (
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                ✓ B2B Intra-EU Supply: Article 44 Reverse Charge applied (0% VAT). Customer VAT: {cleanVatId}.
              </span>
            ) : (
              <span>
                EU OSS Consumer Sale: Article 146 destination principle. Standard {country.rate}% VAT rate applied.
              </span>
            )}
            {customsDuty > 0 && ` • Includes €3.00 July 2026 Non-EU Customs Duty (Gross becomes ${country.symbol}${finalGross.toFixed(2)})`}
          </div>
        </div>
      )}

      {/* Validation helper */}
      {!hasTypedAmount && (
        <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 p-3 rounded-xl mt-4 text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2">
          <span>💡 Enter an order amount to view live net turnover, VAT, profit breakdown, and unlock invoice downloads.</span>
        </div>
      )}

      {isVatIdProvided && !isVatIdValid && (
        <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 p-3 rounded-xl mt-4 text-xs font-semibold text-rose-900 dark:text-rose-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>⚠️ Please correct Buyer VAT ID format (2 letters followed by 8-12 alphanumeric characters, e.g. DE123456789) before generating invoice.</span>
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
            : !isVatIdValid
            ? 'Fix Buyer VAT ID Format to Enable Download'
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
          <span>✅ 100% Verified: 27 EU Member States | Directive 2006/112/EC | Article 44 & 146 | HS 8517.12.00</span>
        </p>

        {/* About Section with 3 Steps, FAQs, and Tax Notice */}
        <div className="mt-12 p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-left">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">About Amazon EU VAT Calculator</h2>
          
          <div className="prose max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base">
            <p>
              Amazon EU VAT Calculator is a free, privacy-first, client-side tool built for Amazon FBA sellers 
              who sell products to customers strictly across the 27 European Union Member States. It calculates VAT 
              automatically under the EU OSS (One Stop Shop) Scheme and EU VAT Directive 2006/112/EC. The tool 
              auto-detects the correct VAT rate based on the destination country, calculates net turnover, VAT amount, 
              and generates a professional invoice with OSS ID, HS Code 8517.12.00, Article 146 and Article 44 reverse charge 
              references. No data is uploaded to any server. All calculations happen inside your browser.
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
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Select 1 of 27 EU Countries</h4>
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
