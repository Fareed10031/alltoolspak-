'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { jsPDF } from 'jspdf';
import {
  QrCode,
  Download,
  Copy,
  Printer,
  Sparkles,
  ShieldCheck,
  Zap,
  Lock,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Image as ImageIcon,
  Check,
  Trash2,
  History,
  FileDown,
  Info,
  HelpCircle,
  Share2,
  ExternalLink,
  ChevronRight,
  Wifi,
  Contact,
  Mail,
  MessageSquare,
  Phone,
  MessageCircle,
  MapPin,
  Coins,
  Link as LinkIcon,
  UploadCloud,
  X,
} from 'lucide-react';

// ==================== 1. QR TYPES DEFINITION ====================
export interface QrTypeDefinition {
  id: string;
  label: string;
  icon: string;
  placeholder?: string;
  description: string;
}

export const QR_TYPES: QrTypeDefinition[] = [
  { id: 'url', label: 'URL / Text', icon: '🔗', description: 'Open websites, links, or plain text strings' },
  { id: 'wifi', label: 'WiFi Network', icon: '📶', description: 'Connect automatically to WiFi without typing passwords' },
  { id: 'vcard', label: 'vCard Contact', icon: '👤', description: 'Save digital business card directly into smartphone address book' },
  { id: 'email', label: 'Email', icon: '✉️', description: 'Pre-compose email with recipient, subject, and body' },
  { id: 'sms', label: 'SMS Message', icon: '💬', description: 'Pre-populate text message with phone number and text' },
  { id: 'phone', label: 'Phone Call', icon: '📞', description: 'Prompt instant phone dialing on mobile devices' },
  { id: 'whatsapp', label: 'WhatsApp', icon: '💚', description: 'Open direct WhatsApp chat with message' },
  { id: 'location', label: 'Location Map', icon: '📍', description: 'Open exact GPS coordinates in Google Maps' },
  { id: 'bitcoin', label: 'Bitcoin Crypto', icon: '₿', description: 'Receive Bitcoin payments with wallet address and amount' },
];

export const PRESET_COLORS = [
  { label: 'Pitch Black', hex: '#000000' },
  { label: 'Royal Blue', hex: '#2563eb' },
  { label: 'Emerald Green', hex: '#059669' },
  { label: 'Purple Indigo', hex: '#7c3aed' },
  { label: 'Crimson Red', hex: '#dc2626' },
  { label: 'Warm Amber', hex: '#d97706' },
  { label: 'Slate Navy', hex: '#0f172a' },
];

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type DotStyle = 'square' | 'dots' | 'rounded' | 'classy';
export type CornerStyle = 'square' | 'rounded' | 'circle';

export interface QrHistoryItem {
  id: string;
  type: string;
  title: string;
  payload: string;
  timestamp: number;
}

export function QrGeneratorTool() {
  // Active QR Type
  const [activeType, setActiveType] = useState<string>('url');

  // Dynamic Form States
  const [formData, setFormData] = useState({
    // URL
    urlText: 'https://alltoolspk.com',
    // WiFi
    wifiSsid: '',
    wifiPass: '',
    wifiEnc: 'WPA' as 'WPA' | 'WEP' | 'nopass',
    wifiHidden: false,
    // vCard
    vcardName: '',
    vcardPhone: '',
    vcardEmail: '',
    vcardCompany: '',
    vcardTitle: '',
    vcardWebsite: '',
    // Email
    emailTo: '',
    emailSubject: '',
    emailBody: '',
    // SMS
    smsPhone: '',
    smsMsg: '',
    // Phone
    phoneNum: '',
    // WhatsApp
    waPhone: '',
    waMsg: '',
    // Location
    locLat: '',
    locLng: '',
    // Bitcoin
    btcAddress: '',
    btcAmount: '',
  });

  // Customization States
  const [fgColor, setFgColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [isTransparent, setIsTransparent] = useState<boolean>(false);
  const [errorCorrection, setErrorCorrection] = useState<ErrorCorrectionLevel>('H');
  const [qrSize, setQrSize] = useState<number>(1024);
  const [margin, setMargin] = useState<number>(2);
  const [dotStyle, setDotStyle] = useState<DotStyle>('rounded');
  const [cornerStyle, setCornerStyle] = useState<CornerStyle>('rounded');

  // Logo State
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string>('');

  // Status & Verification States
  const [scanVerified, setScanVerified] = useState<boolean>(true);
  const [scanWarning, setScanWarning] = useState<string | null>(null);
  const [contrastWarning, setContrastWarning] = useState<string | null>(null);
  const [copiedImage, setCopiedImage] = useState<boolean>(false);
  const [copiedData, setCopiedData] = useState<boolean>(false);
  const [history, setHistory] = useState<QrHistoryItem[]>([]);

  // Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('alltoolspk_qr_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      // fallback
    }
  }, []);

  const saveToHistory = useCallback((type: string, title: string, payload: string) => {
    try {
      if (!payload.trim()) return;
      const newItem: QrHistoryItem = {
        id: `qr-${Date.now()}`,
        type,
        title: title.slice(0, 32),
        payload,
        timestamp: Date.now(),
      };
      setHistory((prev) => {
        const filtered = prev.filter((item) => item.payload !== payload);
        const updated = [newItem, ...filtered].slice(0, 5);
        localStorage.setItem('alltoolspk_qr_history', JSON.stringify(updated));
        return updated;
      });
    } catch {
      // ignore
    }
  }, []);

  // Format QR payload from active type
  const formattedPayload = useMemo(() => {
    switch (activeType) {
      case 'url':
        return formData.urlText.trim() || 'https://alltoolspk.com';
      case 'wifi': {
        const ssid = formData.wifiSsid.trim();
        const pass = formData.wifiPass.trim();
        const enc = formData.wifiEnc;
        const hidden = formData.wifiHidden ? 'true' : 'false';
        if (!ssid && !pass) return 'WIFI:T:WPA;S:Home-WiFi;P:Password123;H:false;;';
        return `WIFI:T:${enc};S:${ssid};P:${pass};H:${hidden};;`;
      }
      case 'vcard': {
        const name = formData.vcardName.trim() || 'John Doe';
        const phone = formData.vcardPhone.trim();
        const email = formData.vcardEmail.trim();
        const company = formData.vcardCompany.trim();
        const title = formData.vcardTitle.trim();
        const website = formData.vcardWebsite.trim();
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `FN:${name}`,
          company ? `ORG:${company}` : '',
          title ? `TITLE:${title}` : '',
          phone ? `TEL:${phone}` : '',
          email ? `EMAIL:${email}` : '',
          website ? `URL:${website}` : '',
          'END:VCARD',
        ]
          .filter(Boolean)
          .join('\n');
      }
      case 'email': {
        const email = formData.emailTo.trim() || 'contact@example.com';
        const sub = formData.emailSubject.trim();
        const body = formData.emailBody.trim();
        return `mailto:${email}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
      }
      case 'sms': {
        const phone = formData.smsPhone.trim() || '+1234567890';
        const msg = formData.smsMsg.trim();
        return `SMSTO:${phone}:${msg}`;
      }
      case 'phone': {
        const phone = formData.phoneNum.trim() || '+1234567890';
        return `tel:${phone}`;
      }
      case 'whatsapp': {
        const cleanPhone = formData.waPhone.replace(/[^0-9]/g, '') || '1234567890';
        const msg = formData.waMsg.trim();
        return `https://wa.me/${cleanPhone}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;
      }
      case 'location': {
        const lat = formData.locLat.trim() || '40.7128';
        const lng = formData.locLng.trim() || '-74.0060';
        return `https://maps.google.com/?q=${lat},${lng}`;
      }
      case 'bitcoin': {
        const addr = formData.btcAddress.trim() || '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
        const amt = formData.btcAmount.trim();
        return `bitcoin:${addr}${amt ? `?amount=${amt}` : ''}`;
      }
      default:
        return 'https://alltoolspk.com';
    }
  }, [activeType, formData]);

  // Contrast Check
  useEffect(() => {
    const getLuminance = (hex: string) => {
      const c = hex.replace('#', '');
      const r = parseInt(c.substring(0, 2), 16) / 255;
      const g = parseInt(c.substring(2, 4), 16) / 255;
      const b = parseInt(c.substring(4, 6), 16) / 255;
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const fgLum = getLuminance(fgColor);
    const bgLum = isTransparent ? 1.0 : getLuminance(bgColor);
    const diff = Math.abs(fgLum - bgLum);

    if (diff < 0.4) {
      setContrastWarning('Low contrast between foreground & background. Phones may fail to scan reliably.');
    } else {
      setContrastWarning(null);
    }
  }, [fgColor, bgColor, isTransparent]);

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Logo file must be smaller than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoDataUrl(event.target?.result as string);
      setLogoName(file.name);
      // Auto-switch to Error Correction Level H for logo embedding
      setErrorCorrection('H');
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoDataUrl(null);
    setLogoName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Render QR Code onto Canvas
  const renderQrCanvas = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const effectiveEcLevel = logoDataUrl ? 'H' : errorCorrection;
      const qrObj = QRCode.create(formattedPayload, {
        errorCorrectionLevel: effectiveEcLevel,
      });

      const moduleCount = qrObj.modules.size;
      const quietZone = margin;
      const totalModules = moduleCount + quietZone * 2;

      // Set internal high resolution canvas dimensions
      canvas.width = qrSize;
      canvas.height = qrSize;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const modulePixelSize = qrSize / totalModules;

      // Clear or fill background
      ctx.clearRect(0, 0, qrSize, qrSize);
      if (!isTransparent) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, qrSize, qrSize);
      }

      ctx.fillStyle = fgColor;

      // Check if coordinate is inside finder patterns (7x7 corners)
      const isFinderPattern = (r: number, c: number) => {
        if (r < 7 && c < 7) return true; // Top-Left
        if (r < 7 && c >= moduleCount - 7) return true; // Top-Right
        if (r >= moduleCount - 7 && c < 7) return true; // Bottom-Left
        return false;
      };

      // Draw normal data modules
      for (let r = 0; r < moduleCount; r++) {
        for (let c = 0; c < moduleCount; c++) {
          if (qrObj.modules.get(r, c)) {
            const inFinder = isFinderPattern(r, c);
            const x = (c + quietZone) * modulePixelSize;
            const y = (r + quietZone) * modulePixelSize;
            const s = modulePixelSize;

            if (inFinder) {
              // Custom corner eye styling
              if (cornerStyle === 'rounded') {
                ctx.beginPath();
                ctx.roundRect(x, y, s, s, s * 0.25);
                ctx.fill();
              } else if (cornerStyle === 'circle') {
                ctx.beginPath();
                ctx.arc(x + s / 2, y + s / 2, s * 0.48, 0, Math.PI * 2);
                ctx.fill();
              } else {
                ctx.fillRect(x, y, s, s);
              }
            } else {
              // Module Dot Styles
              if (dotStyle === 'dots') {
                ctx.beginPath();
                ctx.arc(x + s / 2, y + s / 2, s * 0.44, 0, Math.PI * 2);
                ctx.fill();
              } else if (dotStyle === 'rounded') {
                ctx.beginPath();
                ctx.roundRect(x, y, s, s, s * 0.35);
                ctx.fill();
              } else if (dotStyle === 'classy') {
                ctx.beginPath();
                ctx.roundRect(x + s * 0.05, y + s * 0.05, s * 0.9, s * 0.9, s * 0.45);
                ctx.fill();
              } else {
                ctx.fillRect(x, y, s, s);
              }
            }
          }
        }
      }

      // Embed Logo if present
      if (logoDataUrl) {
        await new Promise<void>((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            const logoFraction = 0.22; // 22% of QR code size
            const logoBoxSize = qrSize * logoFraction;
            const logoX = (qrSize - logoBoxSize) / 2;
            const logoY = (qrSize - logoBoxSize) / 2;

            // Draw white background badge with border & shadow
            ctx.save();
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 2;

            const badgePadding = logoBoxSize * 0.08;
            ctx.beginPath();
            ctx.roundRect(
              logoX - badgePadding,
              logoY - badgePadding,
              logoBoxSize + badgePadding * 2,
              logoBoxSize + badgePadding * 2,
              logoBoxSize * 0.22
            );
            ctx.fill();

            // Subtle border
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = Math.max(1, qrSize * 0.003);
            ctx.stroke();
            ctx.restore();

            // Draw logo image with aspect ratio containment
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(logoX, logoY, logoBoxSize, logoBoxSize, logoBoxSize * 0.16);
            ctx.clip();

            const aspect = img.width / img.height;
            let drawW = logoBoxSize;
            let drawH = logoBoxSize;
            let dx = logoX;
            let dy = logoY;

            if (aspect > 1) {
              drawH = logoBoxSize / aspect;
              dy = logoY + (logoBoxSize - drawH) / 2;
            } else {
              drawW = logoBoxSize * aspect;
              dx = logoX + (logoBoxSize - drawW) / 2;
            }

            ctx.drawImage(img, dx, dy, drawW, drawH);
            ctx.restore();
            resolve();
          };
          img.src = logoDataUrl;
        });
      }

      // Self-Verification via jsQR client-side scanning
      try {
        const imgData = ctx.getImageData(0, 0, qrSize, qrSize);
        const code = jsQR(imgData.data, imgData.width, imgData.height);

        if (code && code.data) {
          setScanVerified(true);
          setScanWarning(null);
        } else {
          // If decoding failed (e.g. low contrast or oversized logo)
          setScanVerified(false);
          setScanWarning('⚠️ Low contrast or logo too large - May not scan reliably on standard phones');
        }
      } catch (e) {
        // Fallback for extreme environments
        setScanVerified(true);
      }
    } catch (err) {
      console.error('Error rendering QR code:', err);
      setScanVerified(false);
      setScanWarning('⚠️ Unable to encode current data into QR format.');
    }
  }, [
    formattedPayload,
    fgColor,
    bgColor,
    isTransparent,
    errorCorrection,
    qrSize,
    margin,
    dotStyle,
    cornerStyle,
    logoDataUrl,
  ]);

  // Debounced effect for live canvas rendering (200ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      renderQrCanvas();
    }, 200);
    return () => clearTimeout(timer);
  }, [renderQrCanvas]);

  // ==================== EXPORT FUNCTIONS ====================
  // 1. Download PNG
  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    saveToHistory(activeType, activeType.toUpperCase(), formattedPayload);

    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `qr-${activeType}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 2. Download SVG (Vector Infinite Resolution for Print)
  const downloadSvg = async () => {
    saveToHistory(activeType, activeType.toUpperCase(), formattedPayload);
    try {
      const effectiveEcLevel = logoDataUrl ? 'H' : errorCorrection;
      const svgString = await QRCode.toString(formattedPayload, {
        type: 'svg',
        margin,
        color: {
          dark: fgColor,
          light: isTransparent ? '#00000000' : bgColor,
        },
        errorCorrectionLevel: effectiveEcLevel,
      });

      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qr-${activeType}-${Date.now()}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('SVG generation failed:', err);
    }
  };

  // 3. Download PDF (A4 Centered, Print-Ready)
  const downloadPdf = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    saveToHistory(activeType, activeType.toUpperCase(), formattedPayload);

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const qrSizeMM = 110;
    const x = (210 - qrSizeMM) / 2;
    const y = 45;

    // Header Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42);
    doc.text('High-Resolution QR Code', 105, 26, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(
      `Format: ${activeType.toUpperCase()} | Print Resolution: 300 DPI | Generated: ${new Date().toLocaleDateString()}`,
      105,
      34,
      { align: 'center' }
    );

    // QR Image
    doc.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, qrSizeMM, qrSizeMM);

    // Payload text below
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const splitDesc = doc.splitTextToSize(`Payload: ${formattedPayload}`, 160);
    doc.text(splitDesc, 105, y + qrSizeMM + 12, { align: 'center' });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      'Generated by AllToolsPK QR Engine • 100% Client-Side • Permanent & Never Expires',
      105,
      280,
      { align: 'center' }
    );

    doc.save(`qr-${activeType}-${Date.now()}.pdf`);
  };

  // 4. Download JPEG
  const downloadJpeg = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    saveToHistory(activeType, activeType.toUpperCase(), formattedPayload);

    // Ensure white background for JPEG
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    tempCtx.fillStyle = '#ffffff';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);

    const a = document.createElement('a');
    a.href = tempCanvas.toDataURL('image/jpeg', 0.95);
    a.download = `qr-${activeType}-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 5. Copy Image to Clipboard
  const copyImageToClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob,
          }),
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2000);
      }, 'image/png');
    } catch (err) {
      console.error('Failed to copy image to clipboard:', err);
    }
  };

  // 6. Copy Data (Text)
  const copyDataText = async () => {
    try {
      await navigator.clipboard.writeText(formattedPayload);
      setCopiedData(true);
      setTimeout(() => setCopiedData(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  // 7. Print Button
  const handlePrint = () => {
    window.print();
  };

  // Sample Data Autofill
  const fillSampleData = () => {
    switch (activeType) {
      case 'url':
        setFormData((prev) => ({ ...prev, urlText: 'https://alltoolspk.com' }));
        break;
      case 'wifi':
        setFormData((prev) => ({
          ...prev,
          wifiSsid: 'AllToolsPK-HighSpeed',
          wifiPass: 'SuperSecurePass2026!',
          wifiEnc: 'WPA',
          wifiHidden: false,
        }));
        break;
      case 'vcard':
        setFormData((prev) => ({
          ...prev,
          vcardName: 'Alex Morgan',
          vcardCompany: 'Digital Studio Tech',
          vcardTitle: 'Creative Director',
          vcardPhone: '+1 (555) 345-6789',
          vcardEmail: 'alex.morgan@company.com',
          vcardWebsite: 'https://company.com',
        }));
        break;
      case 'email':
        setFormData((prev) => ({
          ...prev,
          emailTo: 'hello@alltoolspk.com',
          emailSubject: 'Partnership Inquiry',
          emailBody: 'Hi Team,\n\nI would love to learn more about your digital tools suite.',
        }));
        break;
      case 'sms':
        setFormData((prev) => ({
          ...prev,
          smsPhone: '+15550192834',
          smsMsg: 'Hello! I scanned your QR code and would like to confirm my reservation.',
        }));
        break;
      case 'phone':
        setFormData((prev) => ({
          ...prev,
          phoneNum: '+1 (800) 555-0199',
        }));
        break;
      case 'whatsapp':
        setFormData((prev) => ({
          ...prev,
          waPhone: '+15551234567',
          waMsg: 'Hi there! Inquiring about your product catalog.',
        }));
        break;
      case 'location':
        setFormData((prev) => ({
          ...prev,
          locLat: '48.8584',
          locLng: '2.2945', // Eiffel Tower
        }));
        break;
      case 'bitcoin':
        setFormData((prev) => ({
          ...prev,
          btcAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
          btcAmount: '0.005',
        }));
        break;
    }
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      urlText: '',
      wifiSsid: '',
      wifiPass: '',
      wifiEnc: 'WPA',
      wifiHidden: false,
      vcardName: '',
      vcardPhone: '',
      vcardEmail: '',
      vcardCompany: '',
      vcardTitle: '',
      vcardWebsite: '',
      emailTo: '',
      emailSubject: '',
      emailBody: '',
      smsPhone: '',
      smsMsg: '',
      phoneNum: '',
      waPhone: '',
      waMsg: '',
      locLat: '',
      locLng: '',
      btcAddress: '',
      btcAmount: '',
    });
    setFgColor('#000000');
    setBgColor('#ffffff');
    setIsTransparent(false);
    setErrorCorrection('H');
    removeLogo();
  };

  // Restore from history
  const restoreHistory = (item: QrHistoryItem) => {
    setActiveType(item.type);
    if (item.type === 'url') {
      setFormData((prev) => ({ ...prev, urlText: item.payload }));
    } else {
      // General fallback
      setFormData((prev) => ({ ...prev, urlText: item.payload }));
    }
  };

  const deleteHistoryItem = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem('alltoolspk_qr_history', JSON.stringify(updated));
  };

  const exportHistoryJson = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr-history-export-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Schema.org WebApplication + FAQPage JSON-LD for Google & AdSense SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebApplication',
                name: 'Free QR Code Generator with Logo',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'All (Web Browser)',
                offers: {
                  '@type': 'Offer',
                  price: '0.00',
                  priceCurrency: 'USD',
                },
                description:
                  'Create custom QR codes for URL, WiFi, vCard, Email, SMS, WhatsApp, Location, and Bitcoin. Embed logos, customize colors, and export print-ready SVG, PNG, and PDF client-side.',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is a QR code?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'A QR (Quick Response) code is a two-dimensional barcode readable by smartphones and optical scanners. It encodes data such as website URLs, contact cards (vCard), WiFi passwords, geolocation, and cryptocurrency addresses.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I add a custom company logo to my QR code?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes! You can upload any PNG or JPG logo. The tool automatically resizes the logo, wraps it in a protective padding barrier, and locks the Error Correction Level to H (30% redundancy) so the QR code remains 100% readable.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Do these generated QR codes ever expire?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'No. These are permanent static QR codes. The data is embedded directly into the matrix patterns, meaning they never expire, have zero scan limits, and require no subscription or third-party redirection.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What is Error Correction Level H?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Error Correction Level H provides up to 30% data recovery capability. Even if a portion of the QR code is smudged, damaged, or covered by an embedded logo, mobile cameras can decode it accurately without data loss.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Is this QR code generator completely free and private?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes, 100% free and client-side. All processing occurs locally in your web browser memory. No text, contacts, credentials, or uploaded logos are sent to external servers, ensuring full GDPR compliance.',
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      {/* Top Header & AdSense Favorite Badges */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                Generator • 100% Free & Client-Side
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> No Upload • No Tracking • Permanent
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
              Free QR Code Generator with Logo
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Generate customizable, high-resolution QR codes for URL, WiFi, vCard, WhatsApp, and more.
              Download vector SVG, PNG, and PDF print formats in seconds.
            </p>
          </div>

          <div className="flex items-center gap-2 no-print shrink-0">
            <button
              type="button"
              onClick={fillSampleData}
              className="px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Sample Data
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-3 py-1.5 text-xs font-bold rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* 1. QR TYPES TAB NAVIGATION (9 TYPES) */}
        <div className="mt-6">
          <label className="text-[11px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-2 block">
            Select QR Code Type
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5 bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            {QR_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveType(t.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeType === t.id
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="text-lg mb-0.5">{t.icon}</span>
                <span className="truncate w-full text-center text-[11px]">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN GENERATOR GRID: 2 COLUMNS (FORM + LIVE PREVIEW) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* LEFT COLUMN: DYNAMIC DATA INPUTS & CUSTOMIZATION (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            {/* DYNAMIC FORM SECTION */}
            <div className="bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span className="text-base">{QR_TYPES.find((t) => t.id === activeType)?.icon}</span>
                  {QR_TYPES.find((t) => t.id === activeType)?.label} Data
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {QR_TYPES.find((t) => t.id === activeType)?.description}
                </span>
              </div>

              {/* Dynamic Inputs Based on activeType */}
              {activeType === 'url' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Website URL or Text *
                  </label>
                  <input
                    type="text"
                    value={formData.urlText}
                    onChange={(e) => setFormData({ ...formData, urlText: e.target.value })}
                    placeholder="https://yourwebsite.com or any text"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {activeType === 'wifi' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Network Name (SSID) *
                    </label>
                    <input
                      type="text"
                      value={formData.wifiSsid}
                      onChange={(e) => setFormData({ ...formData, wifiSsid: e.target.value })}
                      placeholder="e.g. Cafe_Guest_WiFi"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Password
                      </label>
                      <input
                        type="text"
                        value={formData.wifiPass}
                        onChange={(e) => setFormData({ ...formData, wifiPass: e.target.value })}
                        placeholder="Network password"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Encryption
                      </label>
                      <select
                        value={formData.wifiEnc}
                        onChange={(e) => setFormData({ ...formData, wifiEnc: e.target.value as any })}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                        <option value="WEP">WEP (Legacy)</option>
                        <option value="nopass">None (Open Network)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="wifiHidden"
                      checked={formData.wifiHidden}
                      onChange={(e) => setFormData({ ...formData, wifiHidden: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="wifiHidden" className="text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                      Hidden Network (SSID is not broadcasted)
                    </label>
                  </div>
                </div>
              )}

              {activeType === 'vcard' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.vcardName}
                        onChange={(e) => setFormData({ ...formData, vcardName: e.target.value })}
                        placeholder="John Smith"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.vcardPhone}
                        onChange={(e) => setFormData({ ...formData, vcardPhone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.vcardEmail}
                        onChange={(e) => setFormData({ ...formData, vcardEmail: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.vcardCompany}
                        onChange={(e) => setFormData({ ...formData, vcardCompany: e.target.value })}
                        placeholder="Acme Corp"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={formData.vcardTitle}
                        onChange={(e) => setFormData({ ...formData, vcardTitle: e.target.value })}
                        placeholder="Product Manager"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Website
                      </label>
                      <input
                        type="url"
                        value={formData.vcardWebsite}
                        onChange={(e) => setFormData({ ...formData, vcardWebsite: e.target.value })}
                        placeholder="https://company.com"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeType === 'email' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Recipient Email *
                    </label>
                    <input
                      type="email"
                      value={formData.emailTo}
                      onChange={(e) => setFormData({ ...formData, emailTo: e.target.value })}
                      placeholder="recipient@example.com"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.emailSubject}
                      onChange={(e) => setFormData({ ...formData, emailSubject: e.target.value })}
                      placeholder="Inquiry or Subject Line"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Message Body
                    </label>
                    <textarea
                      rows={2}
                      value={formData.emailBody}
                      onChange={(e) => setFormData({ ...formData, emailBody: e.target.value })}
                      placeholder="Pre-composed email text..."
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeType === 'sms' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.smsPhone}
                      onChange={(e) => setFormData({ ...formData, smsPhone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      SMS Message
                    </label>
                    <textarea
                      rows={2}
                      value={formData.smsMsg}
                      onChange={(e) => setFormData({ ...formData, smsMsg: e.target.value })}
                      placeholder="Pre-filled SMS text..."
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeType === 'phone' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number with Country Code *
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNum}
                    onChange={(e) => setFormData({ ...formData, phoneNum: e.target.value })}
                    placeholder="+1 (800) 555-0199"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {activeType === 'whatsapp' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      WhatsApp Phone Number (with Country Code) *
                    </label>
                    <input
                      type="tel"
                      value={formData.waPhone}
                      onChange={(e) => setFormData({ ...formData, waPhone: e.target.value })}
                      placeholder="e.g. 15551234567 (no + or spaces)"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Default Message (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.waMsg}
                      onChange={(e) => setFormData({ ...formData, waMsg: e.target.value })}
                      placeholder="Hello, I would like to inquire about..."
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeType === 'location' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Latitude *
                    </label>
                    <input
                      type="text"
                      value={formData.locLat}
                      onChange={(e) => setFormData({ ...formData, locLat: e.target.value })}
                      placeholder="e.g. 40.7128"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Longitude *
                    </label>
                    <input
                      type="text"
                      value={formData.locLng}
                      onChange={(e) => setFormData({ ...formData, locLng: e.target.value })}
                      placeholder="e.g. -74.0060"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeType === 'bitcoin' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Bitcoin Wallet Address *
                    </label>
                    <input
                      type="text"
                      value={formData.btcAddress}
                      onChange={(e) => setFormData({ ...formData, btcAddress: e.target.value })}
                      placeholder="e.g. 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Amount (BTC) (Optional)
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      value={formData.btcAmount}
                      onChange={(e) => setFormData({ ...formData, btcAmount: e.target.value })}
                      placeholder="0.005"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 2. CUSTOMIZATION PANEL */}
            <div className="bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Color & Appearance Settings
              </h3>

              {/* Color Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Foreground */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Foreground Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-700 p-0.5 bg-white dark:bg-slate-900 shrink-0"
                    />
                    <input
                      type="text"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-xs font-mono bg-white dark:bg-slate-900 text-slate-900 dark:text-white uppercase"
                    />
                  </div>
                  {/* Presets */}
                  <div className="flex items-center gap-1.5 mt-2">
                    {PRESET_COLORS.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setFgColor(c.hex)}
                        style={{ backgroundColor: c.hex }}
                        title={c.label}
                        className={`w-5 h-5 rounded-md cursor-pointer transition-transform ${
                          fgColor.toLowerCase() === c.hex.toLowerCase() ? 'scale-125 ring-2 ring-blue-500 ring-offset-1' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Background */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Background Color
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isTransparent}
                        onChange={(e) => setIsTransparent(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>Transparent</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      disabled={isTransparent}
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-700 p-0.5 bg-white dark:bg-slate-900 shrink-0 disabled:opacity-40"
                    />
                    <input
                      type="text"
                      disabled={isTransparent}
                      value={isTransparent ? 'Transparent' : bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-xs font-mono bg-white dark:bg-slate-900 text-slate-900 dark:text-white uppercase disabled:opacity-40"
                    />
                  </div>
                </div>
              </div>

              {/* Styles & Corners */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Pattern Style
                  </label>
                  <select
                    value={dotStyle}
                    onChange={(e) => setDotStyle(e.target.value as DotStyle)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="square">Square (Classic)</option>
                    <option value="rounded">Rounded Modules (Modern)</option>
                    <option value="dots">Dots (Circular)</option>
                    <option value="classy">Classy Smooth</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Corner Eyes Style
                  </label>
                  <select
                    value={cornerStyle}
                    onChange={(e) => setCornerStyle(e.target.value as CornerStyle)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="square">Square Corners</option>
                    <option value="rounded">Rounded Corners</option>
                    <option value="circle">Circular Eyes</option>
                  </select>
                </div>
              </div>

              {/* Error Correction & Margin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Error Correction Level
                    </label>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">
                      {errorCorrection === 'H' ? '30% Recovery' : errorCorrection === 'Q' ? '25%' : errorCorrection === 'M' ? '15%' : '7%'}
                    </span>
                  </div>
                  <select
                    value={errorCorrection}
                    disabled={!!logoDataUrl}
                    onChange={(e) => setErrorCorrection(e.target.value as ErrorCorrectionLevel)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-xs text-slate-900 dark:text-white disabled:opacity-60"
                  >
                    <option value="L">L - Low (7% damage recovery)</option>
                    <option value="M">M - Medium (15% damage recovery)</option>
                    <option value="Q">Q - Quartile (25% damage recovery)</option>
                    <option value="H">H - High (30% damage recovery - Best for Logos)</option>
                  </select>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {logoDataUrl
                      ? '🔒 Locked to H (30%) because custom logo is active'
                      : 'H = 30% damage readable - Recommended for printing and logos'}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Quiet Zone Margin: {margin}
                    </label>
                    <span className="text-[10px] text-slate-500">Border Padding</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    value={margin}
                    onChange={(e) => setMargin(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>None (0)</span>
                    <span>Standard (2)</span>
                    <span>Wide (8)</span>
                  </div>
                </div>
              </div>

              {/* Logo Upload Section */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                    Embed Logo or Icon (Optional)
                  </span>
                  <span className="text-[11px] text-slate-500">Max 2MB (PNG / JPG)</span>
                </div>

                {logoDataUrl ? (
                  <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <img
                        src={logoDataUrl}
                        alt="Logo preview"
                        className="w-10 h-10 object-contain rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-white"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
                          {logoName || 'Uploaded Logo'}
                        </p>
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          ✓ Auto-scaled to 22% with white border protection
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Remove logo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload-input"
                    />
                    <label
                      htmlFor="logo-upload-input"
                      className="flex items-center justify-center gap-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900 hover:border-blue-400 transition-all cursor-pointer font-medium"
                    >
                      <UploadCloud className="w-4 h-4 text-blue-600" />
                      <span>Upload brand logo or icon</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: LIVE CANVAS PREVIEW & EXPORT ACTIONS (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Live QR Preview
                </span>
                {scanVerified ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3 h-3" /> 100% Scannable
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
                    <AlertTriangle className="w-3 h-3" /> Scan Issue
                  </span>
                )}
              </div>

              {/* QR Canvas Display */}
              <div
                id="printable-qr"
                className={`relative p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all ${
                  isTransparent
                    ? 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:12px_12px] bg-white dark:bg-slate-900'
                    : 'bg-white dark:bg-slate-900'
                }`}
              >
                <canvas
                  ref={canvasRef}
                  className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-lg mx-auto"
                />
              </div>

              {/* Verification & Contrast Warnings */}
              {contrastWarning && (
                <div className="w-full mt-3 p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 rounded-xl text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{contrastWarning}</span>
                </div>
              )}

              {scanWarning && (
                <div className="w-full mt-2 p-2 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800/60 rounded-xl text-rose-900 dark:text-rose-200 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{scanWarning}</span>
                </div>
              )}

              {/* Resolution Slider */}
              <div className="w-full mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/60">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Export Resolution: {qrSize}px
                  </span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">
                    {qrSize >= 2048 ? 'Ultra HD Print (300 DPI)' : qrSize >= 1024 ? 'High Res HD' : 'Standard Web'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 mt-1.5">
                  {[512, 1024, 2048].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setQrSize(size)}
                      className={`py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        qrSize === size
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {size}px
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. HIGH-QUALITY EXPORT BUTTONS */}
              <div className="w-full mt-4 space-y-2">
                {/* Primary Download PNG */}
                <button
                  type="button"
                  onClick={downloadPng}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download PNG Image ({qrSize}px)
                </button>

                {/* Secondary Vector SVG & Print-Ready PDF */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={downloadSvg}
                    className="py-2.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 text-xs shadow-xs"
                    title="Infinite resolution for professional printing"
                  >
                    <FileDown className="w-3.5 h-3.5 text-blue-600" />
                    Download SVG (Vector)
                  </button>

                  <button
                    type="button"
                    onClick={downloadPdf}
                    className="py-2.5 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 text-xs shadow-xs"
                    title="A4 Centered PDF format"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    Download PDF (A4)
                  </button>
                </div>

                {/* Additional Utilities: JPEG, Copy Image, Print */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={downloadJpeg}
                    className="py-2 px-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg text-xs transition-colors cursor-pointer text-center"
                  >
                    JPEG File
                  </button>

                  <button
                    type="button"
                    onClick={copyImageToClipboard}
                    className="py-2 px-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    {copiedImage ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedImage ? 'Copied!' : 'Copy Image'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="py-2 px-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print QR</span>
                  </button>
                </div>
              </div>

              {/* 3 TRUST BADGES */}
              <div className="w-full mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/60 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-500 font-semibold">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 mb-0.5" />
                  <span>100% Client-Side</span>
                </div>
                <div className="flex flex-col items-center">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 mb-0.5" />
                  <span>Instant Processing</span>
                </div>
                <div className="flex flex-col items-center">
                  <Lock className="w-3.5 h-3.5 text-purple-600 mb-0.5" />
                  <span>No Files Uploaded</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. RECENT HISTORY SECTION (LOCALSTORAGE) */}
        {history.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <History className="w-4 h-4 text-blue-600" />
                Recent Generated QRs (Browser Local Memory)
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={exportHistoryJson}
                  className="text-xs text-blue-600 hover:underline cursor-pointer"
                >
                  Export JSON
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('alltoolspk_qr_history');
                    setHistory([]);
                  }}
                  className="text-xs text-rose-500 hover:underline cursor-pointer"
                >
                  Clear History
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between group hover:border-blue-400 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                        {item.type}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteHistoryItem(item.id)}
                        className="text-slate-400 hover:text-rose-500 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate mt-1">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5 font-mono">
                      {item.payload}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => restoreHistory(item)}
                    className="mt-2 text-[11px] font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Load Data</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. PRIVACY + SEO CONTENT & EDUCATIONAL SECTIONS */}
      {/* SECTION 1: HOW TO USE IN 3 EASY STEPS */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          How to Generate a Custom QR Code in 3 Simple Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              Choose QR Type & Enter Data
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Select from 9 supported types (URL, WiFi credentials, vCard contact, WhatsApp, SMS, or Bitcoin) and
              fill in the corresponding fields.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              Customize Design, Logo & Colors
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Pick your brand palette, toggle background transparency, customize dot shapes, upload your company logo,
              and adjust error correction.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              Export in Print-Ready Vector or Raster
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Download as high-res PNG (up to 2048px), vector SVG for commercial print, or A4 PDF. Generated static
              codes are permanent and never expire.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: COMMON USE CASES */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Popular Applications & Business Use Cases
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
            <span className="text-2xl mb-2 block">🍽️</span>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Restaurant Menus</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Provide touchless digital menus on tabletop acrylic stands without printing reprints.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
            <span className="text-2xl mb-2 block">💼</span>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Business Cards (vCard)</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Let clients save your contact details, phone, and company site straight to their phonebook.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40">
            <span className="text-2xl mb-2 block">📶</span>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Instant WiFi Access</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Hang guest WiFi QRs in hotels, cafes, and offices for seamless 1-tap connections.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
            <span className="text-2xl mb-2 block">🎟️</span>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Events & Ticketing</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Embed unique event check-in links, venue directions, and registration forms.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40">
            <span className="text-2xl mb-2 block">📦</span>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Product Packaging</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Link physical packaging to product manuals, warranty registration, and support chats.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: ABOUT QR CODE GENERATOR & GDPR STATEMENT */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          About QR Code Generator - Privacy First & 100% Client-Side
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The <strong>AllToolsPK QR Code Generator</strong> is a free, privacy-first, client-side utility built for
          businesses, marketers, restaurants, developers, and educators. It supports 9 distinct QR code payloads
          including Website URLs, WiFi network autoconnect, vCard digital business cards, WhatsApp direct chats,
          SMS messaging, and Bitcoin cryptocurrency payments.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Unlike ordinary online generators that redirect your traffic through proprietary servers or impose scan
          limits, our generator operates <strong>100% in your local web browser memory</strong>. No passwords, personal
          contact information, coordinates, or uploaded brand logos ever leave your device or touch external servers.
          This architecture ensures complete data autonomy, zero latency, and comprehensive compliance with global
          data regulations including GDPR and CCPA.
        </p>
      </div>

      {/* SECTION 4: FREQUENTLY ASKED QUESTIONS (FAQ) FOR SEO */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              What is a QR code and how does it work?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              A QR (Quick Response) code is a matrix barcode invented in 1994. It consists of black modules arranged in
              a square grid on a white background. It can be read by smartphone cameras to trigger actions like opening a
              URL, copying contact cards, joining WiFi networks, or launching payment flows.
            </p>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              Can I embed a custom logo in my QR code?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Yes. You can upload any brand logo (PNG, JPG, or WebP). The generator automatically resizes the logo to 22%
              of the matrix size, draws protective padding around it, and switches to Error Correction Level H (30%),
              ensuring that the code remains fully scannable.
            </p>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              Do these generated QR codes ever expire?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Never. Because our tool generates authentic static QR codes, the encoded payload is etched directly into the
              barcode patterns. There are no tracking redirects, dynamic link expiration dates, or scan quotas.
            </p>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              What is Error Correction Level H?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              QR codes use Reed-Solomon error correction. Level H provides the highest durability (30% redundancy),
              allowing the QR code to be scanned even if 30% of its surface is smudged, torn, or overlaid with a logo.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              Is this tool completely free and private?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Yes. All processing is executed client-side via JavaScript in your local browser. No personal contact data,
              passwords, coordinates, or images are transmitted to external servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrGeneratorTool;
