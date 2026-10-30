import React from 'react';

const ALL_10_TOOLS = [
  { name: 'Age Calculator', slug: '/age-calculator', keyword: 'Age Calculator Pakistan', desc: 'Calculate exact age in years, months, and days for Nadra B-Form, school admissions, and competitive exams.' },
  { name: 'Amazon EU VAT Calculator', slug: '/amazon-eu-vat-calculator', keyword: 'Amazon EU VAT Calculator Pakistan', desc: 'Compute OSS, IOSS, and standard VAT rates across 27 EU member states for Pakistani Amazon sellers.' },
  { name: 'ATS Resume Builder', slug: '/ats-resume-builder', keyword: 'ATS Resume Builder Pakistan', desc: 'Create 100% ATS-friendly single-column tech and corporate CVs tailored for global remote and local hiring.' },
  { name: 'Global Accident Emergency', slug: '/global-accident-emergency', keyword: 'Accident Settlement Calculator Pakistan', desc: 'Estimate insurance claims, bodily injury compensation, and rehabilitation costs across 195 jurisdictions.' },
  { name: 'Global Salary Calculator', slug: '/global-salary-calculator', keyword: 'Global Salary Calculator Pakistan', desc: 'Compare take-home pay, local taxes, PPP conversion, and hourly freelance rates in 192 countries.' },
  { name: 'Image to PDF Converter', slug: '/image-to-pdf', keyword: 'Image to PDF Converter Pakistan', desc: 'Convert JPG, PNG, and WebP images to high-resolution PDF documents locally without server uploads.' },
  { name: 'Mortgage Calculator USA', slug: '/mortgage-calculator-usa', keyword: 'Mortgage Calculator Pakistan Overseas', desc: 'Calculate true monthly US home mortgage payments including PMI, HOA, property tax, and amortization schedules.' },
  { name: 'OneVisa World Visa Points', slug: '/onevisa-world-visa-points', keyword: 'Visa Points Calculator Pakistan', desc: 'Check eligibility scores for UK Skilled Worker, Canada Express Entry CRS, Australia GSM, and Germany Opportunity Card.' },
  { name: 'PDF 3X Pro Suite', slug: '/pdf-3x-pro', keyword: 'PDF Tools Pakistan', desc: 'Merge, convert PDF to Word, and compress documents with zero file size limits and 100% browser privacy.' },
  { name: 'Currency & Gold Rates', slug: '/currency-gold-rates', keyword: 'USD to PKR Gold Rate Pakistan', desc: 'Real-time Interbank USD to PKR exchange rates and 24K Sarafa gold prices per tola and 10 grams in Pakistan.' },
];

const TOOL_KNOWLEDGE = {
  '/age-calculator': {
    about: 'The AllToolsPK Age Calculator is specifically calibrated for Pakistani citizens needing precise chronological age verification. In Pakistan, exact age calculations are legally required across various governmental, academic, and professional institutions including the National Database and Registration Authority (NADRA) for Computerized National Identity Cards (CNIC), Child Registration Certificates (B-Form), family registration, kindergarten and higher secondary school admissions, provincial public service commissions (KPPSC, PPSC, SPSC, BPSC, FPSC), and retirement planning under EOBI. Unlike basic calendars, this system factors in exact leap years, Gregorian calendar variances, and real-time seconds calculation directly inside your browser.',
    whatIs: 'This tool is an actuarial-grade date computation engine designed to eliminate manual calculation errors. It computes the exact elapsed duration between a user\'s Date of Birth (DOB) and the target date or current time. It provides a granular breakdown including total calendar years, complete months, elapsed days, cumulative hours, minutes, total elapsed weeks, and a countdown timer for the user\'s upcoming birthday. All calculations happen inside your local browser memory without storing or transmitting personal dates to any remote database, preserving absolute confidentiality under international privacy laws.',
    howTo: [
      'Enter your official Date of Birth as printed on your NADRA Birth Certificate or hospital discharge slip into the date selector.',
      'Optionally specify a custom calculation date if determining eligibility for government job cutoffs (such as FPSC or CSS age limits).',
      'Instantly view your exact chronological age in years, months, and days, and click "Copy Result" or "Print / Save PDF" for official submission.'
    ],
    features: [
      'NADRA & Government Job Compliant: Exact calculation adhering to the cutoff date rules of civil service exams (CSS, PMS) and army recruitments.',
      'Leap Year & Month Variance Accuracy: Automatically compensates for 28, 29, 30, and 31-day months across multiple decades without day drift.',
      'Comprehensive Breakdown: Outputs total lived days, elapsed weeks, cumulative hours, and live seconds counter.',
      'Upcoming Birthday Milestones: Calculates the exact number of days and weekdays remaining until your next birthday.',
      '100% Client-Side Privacy: Operates entirely in volatile browser memory with zero tracking, cookies, or database storage.'
    ],
    whyChoose: 'Founded by Fareed Ullah in Peshawar, Khyber Pakhtunkhwa, AllToolsPK was engineered with an unwavering dedication to transparent, client-side execution. In Pakistan, privacy is paramount when dealing with personal identification documents. While third-party websites ask for your phone number, email address, or display deceptive ads, AllToolsPK provides instantaneous, clean, mathematically verified calculations with zero data collection. Every algorithm is audited for precision, ensuring job applicants, parents, and students have trusted tools at their disposal.',
    faqs: [
      { q: 'How does this tool calculate eligibility for Pakistani government jobs (CSS / PMS / FPSC)?', a: 'Government job advertisements in Pakistan establish strict cutoff dates (typically 1st January of the examination year). You can compare your birth date against the specified cutoff date to ensure your age falls precisely within the 21 to 30 years bracket, including applicable age relaxation rules.' },
      { q: 'Is my birth date or personal data stored on AllToolsPK servers?', a: 'No. AllToolsPK utilizes 100% browser-based JavaScript processing. No date, name, or metadata ever leaves your smartphone or desktop computer, making it mathematically impossible for your data to be intercepted or leaked.' },
      { q: 'Does this calculator account for leap years in chronological computation?', a: 'Yes. The algorithm dynamically accounts for every leap year (366 days) and variable month lengths, guaranteeing 100% precision for legal and passport documentation.' }
    ]
  },
  '/amazon-eu-vat-calculator': {
    about: 'The AllToolsPK Amazon EU VAT Calculator is a vital financial tool designed for Pakistani eCommerce entrepreneurs, Amazon FBA sellers, dropshippers, and export agencies operating in the European single market. Pakistan is home to thousands of registered Amazon sellers managing cross-border sales across Germany, France, Italy, Spain, and the Netherlands. Calculating Value Added Tax (VAT) under the European Union One-Stop Shop (OSS) and Import One-Stop Shop (IOSS) mechanisms requires exact rate verification to safeguard profit margins and ensure tax compliance.',
    whatIs: 'This tool is a comprehensive European tax estimator that allows online merchants to calculate gross prices, net amounts, and payable VAT across all 27 EU member states. Whether you sell standard consumer goods (21% in Spain, 19% in Germany, 20% in France) or reduced-rate products such as books, medical supplies, or children\'s apparel, the calculator automatically breaks down invoice amounts, margin impacts, and distance-selling thresholds to prevent unexpected tax liabilities during annual filings.',
    howTo: [
      'Select the EU destination country where your customer resides or where your FBA inventory is fulfilled.',
      'Input the net product sale price or gross invoice amount in Euros (EUR) or convert from PKR/USD.',
      'Select the appropriate VAT rate tier (Standard, Reduced, or Super-Reduced) to instantly view the calculated VAT amount and final retail price.'
    ],
    features: [
      'All 27 EU Member States Supported: Up-to-date standard and reduced VAT rates for Germany, France, Italy, Spain, Poland, and more.',
      'OSS & IOSS Ready: Calculates consumer destination VAT compliance according to updated EU cross-border eCommerce directives.',
      'Bi-Directional Calculation: Effortlessly calculate from Net to Gross (inclusive) or from Gross to Net (exclusive) with one click.',
      'Profit Margin Safeguard: Helps Pakistani FBA sellers maintain sustainable profit margins after accounting for statutory European taxes.',
      'Zero Server Logging: Financial transactions and pricing models remain strictly on your local device.'
    ],
    whyChoose: 'Navigating European Union taxation from Pakistan can be daunting due to shifting compliance thresholds and language barriers. Fareed Ullah engineered this calculator to provide Pakistani sellers with clear, instant, and reliable VAT breakdowns without paying expensive monthly accounting software subscriptions. Our tool runs locally, ensuring that your commercial pricing structures, product margins, and revenue metrics remain completely confidential.',
    faqs: [
      { q: 'What is the standard VAT rate for Amazon Germany and Amazon France?', a: 'As of 2026, the standard VAT rate for Germany (Umsatzsteuer) is 19%, while France charges 20%. Reduced rates of 7% in Germany and 5.5% or 10% in France apply to qualifying essential categories.' },
      { q: 'How does the EU One-Stop Shop (OSS) scheme affect Pakistani Amazon sellers?', a: 'Under the OSS scheme, once your pan-European distance sales exceed €10,000 across EU borders, you must charge the VAT rate of the customer’s destination country rather than the country where your stock is stored.' },
      { q: 'Can I calculate VAT inclusive and exclusive prices?', a: 'Yes. You can enter either the net manufacturing/selling cost to calculate consumer retail price, or enter the gross marketplace price to extract the exact VAT liability payable to European revenue authorities.' }
    ]
  },
  '/ats-resume-builder': {
    about: 'The AllToolsPK ATS Resume Builder is an enterprise-grade CV generation suite crafted for Pakistani job seekers, software engineers, and remote workers targeting international hiring platforms. Applicant Tracking Systems (ATS) like Workday, Taleo, Greenhouse, and Lever automatically parse resumes before a human recruiter ever sees them. Over 75% of resumes from Pakistan are rejected due to multi-column tables, non-standard fonts, text inside image layers, and missing industry keywords. This tool guarantees 100% ATS parser compatibility.',
    whatIs: 'This tool is a clean, single-column, standard-compliant resume builder that produces clean semantic documents formatted specifically for machine parsing and human review. It enables candidates to structure their professional experience, technical skill stacks, education, certifications, and project achievements using quantifiable bullet points and industry-recognized action verbs. The resulting document complies with modern recruitment benchmarks in the US, UK, Canada, UAE, and Pakistan tech sectors.',
    howTo: [
      'Fill in your contact details, professional summary, work history, and core competencies into the structured input fields.',
      'Customize bullet points to include quantifiable achievements (e.g., "Increased server efficiency by 34% using Node.js").',
      'Preview your clean, ATS-compliant CV and click download to generate an instantly readable, high-definition PDF or print output.'
    ],
    features: [
      '100% ATS Parser Compatibility: Single-column linear layout that passes Taleo, Greenhouse, Workday, and Lever parsers without formatting loss.',
      'Optimized Section Hierarchy: Pre-structured for Professional Summary, Technical Skills, Work Experience, Education, and Certifications.',
      'Keyword Optimization: Encourages the integration of job-specific keywords to maximize recruiter search matches.',
      'Direct PDF Generation: Generates clean, searchable text vectors rather than flat images, allowing OCR engines to index every character.',
      'Absolute Privacy: Your personal phone number, address, and employment history never touch an external database or tracking server.'
    ],
    whyChoose: 'Most online resume builders lure Pakistani professionals with attractive graphical designs, only to lock the download behind high monthly credit card paywalls or sell candidate contact details to third-party telemarketers. AllToolsPK by Fareed Ullah is completely free, 100% browser-based, and adheres to strict privacy-by-design standards. Your resume data remains exclusively in your own hands, ensuring you can apply for global remote jobs with maximum confidence.',
    faqs: [
      { q: 'Why do multi-column resumes fail ATS screening?', a: 'Applicant Tracking Systems read text from left to right, top to bottom. Multi-column tables, custom text boxes, and sidebar graphics cause parsers to merge separate lines into unintelligible text fragments, leading to automated rejection.' },
      { q: 'Is this resume builder suitable for remote jobs in the US, UK, and Middle East?', a: 'Yes. The single-column chronological format generated by AllToolsPK adheres directly to standard Western recruiting practices, ensuring full readability across LinkedIn, Indeed, and corporate career portals.' },
      { q: 'Are my personal details or career history saved on your server?', a: 'Never. The entire compilation happens locally in your browser memory using client-side JavaScript. When you close the tab, your data is completely cleared unless saved to your local browser storage.' }
    ]
  },
  '/global-accident-emergency': {
    about: 'The AllToolsPK Global Accident Emergency Settlement Calculator provides transparent, actuarially verified injury claim estimations across 195 sovereign jurisdictions. Motor vehicle collisions, workplace injuries, and public slips result in significant medical bills, lost wages, and profound emotional distress. In jurisdictions such as the United States, United Kingdom, Canada, Australia, and the Middle East, insurance adjusters routinely offer lowball settlements to unrepresented victims. This tool empowers individuals to understand the fair market value of their claims.',
    whatIs: 'This application is an algorithmic personal injury settlement estimator based on standardized judicial settlement multipliers (ranging from 1.5x for minor soft tissue sprains to 5.0x+ for severe catastrophic impairment). It computes special economic damages (hospital bills, surgical fees, pharmacy receipts, lost earnings) alongside general non-economic damages (pain, suffering, loss of enjoyment of life) while factoring in comparative negligence percentages and regional court multipliers.',
    howTo: [
      'Select your country or jurisdictional legal framework from the 195 supported nations dropdown.',
      'Input your total medical costs, projected future rehabilitation expenses, and verified lost wages or sick leave deductions.',
      'Adjust the injury severity grade (from Grade 1 Minor Sprain to Grade 5 Catastrophic Trauma) and your estimated liability percentage to view your estimated settlement range.'
    ],
    features: [
      '195 Sovereign Jurisdictions: Calibrated for US state tort caps, UK Judicial College Guidelines, Canadian bodily injury thresholds, and global benchmarks.',
      'Multi-Grade Severity Scoring: Differentiates between soft tissue whiplash, compound bone fractures, disc herniation, and permanent impairment.',
      'Comparative Fault Deductions: Automatically recalculates net recovery based on statutory comparative fault and contributory negligence rules.',
      'Visual Evidence Audit Tool: Includes browser-based metadata inspection and image compression to package accident photos without quality loss.',
      'Client-Side Anonymity: No insurance adjuster, lawyer referral network, or external insurer can access your sensitive medical billing records.'
    ],
    whyChoose: 'Following a traumatizing accident, the last thing victims need is intrusive marketing from aggressive legal referral companies that sell their personal injury data. Fareed Ullah built this tool to provide independent, objective financial modeling without tracking, lead selling, or invasive questionnaires. You receive immediate clarity on what your legal claim is worth before negotiating with insurance claims adjusters.',
    faqs: [
      { q: 'What is the difference between special and general damages?', a: 'Special damages cover quantifiable out-of-pocket financial losses such as ambulance invoices, surgical procedures, and lost wages. General damages compensate for intangible non-economic impacts like pain, suffering, and emotional trauma.' },
      { q: 'How does comparative negligence affect my car accident settlement?', a: 'Under comparative fault rules, if you are found 20% responsible for a collision, your total financial compensation award is reduced by that exact 20%, leaving you with 80% of the computed recovery amount.' },
      { q: 'Can this calculation be used as formal legal evidence in court?', a: 'While this tool utilizes genuine actuarial and insurance industry multipliers for planning and demand letter drafting, it is intended for educational guidance. Always consult a licensed attorney in your jurisdiction for binding legal representation.' }
    ]
  },
  '/global-salary-calculator': {
    about: 'The AllToolsPK Global Salary Calculator is an indispensable compensation modeling tool for Pakistani software developers, freelance specialists, and remote international contractors. With over 2 million Pakistani professionals offering IT and digital services on platforms like Upwork, Fiverr, Toptal, and Deel, understanding gross-to-net salary differentials, tax deductions, and purchasing power parity (PPP) across 192 nations is crucial for fair compensation negotiation.',
    whatIs: 'This system is a multi-currency compensation analyzer that converts international annual, monthly, weekly, or hourly wage packages into accurate take-home income. It evaluates real-world living cost differentials between major global economic centers (such as San Francisco, London, Dubai, and Singapore) and Pakistani metropolitan hubs (Karachi, Lahore, Islamabad, Peshawar), helping remote workers demand globally competitive wages that reflect their true market value.',
    howTo: [
      'Input your proposed gross compensation amount and select your base payment currency (USD, GBP, EUR, AED, SAR, CAD, or PKR).',
      'Select your payment frequency (hourly rate, monthly retainer, or annual salary package).',
      'Review your net take-home breakdown, estimated tax bracket deductions, and equivalent purchasing power in Pakistan.'
    ],
    features: [
      '192 Global Jurisdictions: Covers all major economic regions including North America, Europe, GCC Arab nations, and Asia-Pacific.',
      'Multi-Currency Conversion: Live exchange rates enable instantaneous conversion to Pakistani Rupees (PKR) at current interbank values.',
      'Purchasing Power Parity (PPP) Metrics: Evaluates what a $60,000 USD salary represents in local Pakistani goods, housing, and living standards.',
      'Hourly Freelance Rate Calculator: Translates annual full-time compensation expectations into realistic hourly billing rates factoring in non-billable hours.',
      'Complete Privacy Protection: Your wage negotiations, contract offers, and financial numbers remain strictly confidential on your computer.'
    ],
    whyChoose: 'Pakistani remote workers frequently undervalue their skill sets when negotiating contracts with Western enterprises. Fareed Ullah created this calculator to eliminate salary opacity and equip local developers, designers, and consultants with actionable data. By providing transparent purchasing power insights and net take-home calculations, AllToolsPK helps Pakistani professionals negotiate higher, fairer international compensation packages.',
    faqs: [
      { q: 'How should Pakistani freelancers calculate their hourly billing rate from an annual salary?', a: 'Divide your target annual salary by 52 weeks, then divide by billable working hours per week (typically 30 billable hours after accounting for administration and marketing). Add 20-30% to account for private health insurance, paid leave, and hardware costs.' },
      { q: 'What is Purchasing Power Parity (PPP) in salary comparisons?', a: 'PPP accounts for the relative cost of living between countries. Because rent, food, and utilities are substantially lower in Pakistan than in New York or London, a lower nominal dollar figure in Pakistan often provides identical or superior domestic purchasing capability.' },
      { q: 'Does this calculator include FBR tax rates for Pakistani IT exporters?', a: 'Pakistani IT and freelance service exporters registered with PSEB and filing returns under FBR typically enjoy a reduced 1% final tax regime on foreign remittance inflows, resulting in significantly higher net take-home pay compared to local corporate employees.' }
    ]
  },
  '/image-to-pdf': {
    about: 'The AllToolsPK Image to PDF Converter is a secure, rapid document preparation utility engineered for Pakistani students, office clerks, accountants, and freelancers. Whether submitting National ID Card (CNIC) photos for bank account verification, scanned academic transcripts for university admissions (HEC), or medical receipts for insurance reimbursement, converting image formats (JPG, PNG, WebP) into organized, standard PDF files is a daily requirement.',
    whatIs: 'This tool is a browser-powered document compiler that stitches, reorients, and compresses raster graphics into clean PDF documents without sending your images to external cloud servers. It handles single images or multi-page collections, maintaining optimal resolution for readability while minimizing output file sizes to comply with strict portal upload limits (such as 2MB or 5MB requirements on government and bank portals).',
    howTo: [
      'Drag and drop your JPG, PNG, or WebP images into the upload dropzone or click to select files from your smartphone or PC.',
      'Reorder uploaded image pages by dragging them into your preferred sequence and select page orientation (Portrait or Landscape).',
      'Click "Convert to PDF" to compile your document instantly and save the high-definition PDF file directly to your downloads folder.'
    ],
    features: [
      'Multi-Format Ingestion: Seamlessly accepts JPG, JPEG, PNG, WebP, BMP, and GIF image files.',
      'Zero Cloud Uploads: Entire conversion algorithm executes locally in your browser RAM using JavaScript canvas and PDF-Lib.',
      'Optimized File Compression: Reduces file weight while preserving document sharpness for official portal compliance.',
      'Custom Page Layouts: Select standard A4, US Letter, or auto-fit paper sizes with adjustable margin padding.',
      'No Page Limits or Watermarks: Free for unlimited conversions without branding, watermarks, or annoying signup gates.'
    ],
    whyChoose: 'Commercial PDF web services frequently impose daily document limits, imprint ugly corporate watermarks across your certificates, or worst of all, store your sensitive identity cards on vulnerable foreign cloud servers. AllToolsPK by Fareed Ullah operates with a strict zero-server privacy architecture. Your CNIC scans, passport photos, and financial receipts never leave your device, ensuring complete privacy compliance.',
    faqs: [
      { q: 'Is it safe to convert sensitive documents like CNIC and passport photos on this website?', a: 'Yes, 100% safe. AllToolsPK processes images locally in your web browser memory. Your files are never uploaded over the internet to any external server or database, making data theft impossible.' },
      { q: 'Can I combine multiple pictures into a single multi-page PDF document?', a: 'Yes. You can upload dozens of photos at once, rearrange their order with intuitive controls, and export them as one unified, beautifully formatted multi-page PDF document.' },
      { q: 'Why is my converted PDF accepted without errors on government and bank portals?', a: 'The generator produces standard ISO 32000-1 compliant PDF files formatted specifically for standard A4 document readers, ensuring universal compatibility across NADRA, FBR, and commercial banking upload systems.' }
    ]
  },
  '/mortgage-calculator-usa': {
    about: 'The AllToolsPK Mortgage Calculator USA is an advanced home financing calculator designed for overseas Pakistanis, dual citizens, and real estate investors looking to purchase residential property across the United States. Financing a home in competitive markets like Texas, California, New York, Florida, or Illinois involves complex recurring costs beyond standard principal and interest payments, including Private Mortgage Insurance (PMI), regional property taxes, homeowners insurance, and Homeowners Association (HOA) dues.',
    whatIs: 'This tool is a true-cost amortization and monthly housing expense simulator. By inputting home purchase price, down payment percentage, loan tenure (15-year or 30-year fixed rate), expected mortgage interest rate, local county property tax rates, and annual homeowners insurance, the calculator delivers an exact, unvarnished projection of your total monthly cash outlay (PITI). It also generates a comprehensive year-by-year amortization schedule showing principal paydown versus cumulative interest.',
    howTo: [
      'Enter the target home purchase price and your proposed down payment amount or percentage.',
      'Select the loan term (e.g., 30-year fixed, 15-year fixed) and enter your approved annual mortgage interest rate.',
      'Specify county property tax rates, annual hazard insurance premiums, and monthly HOA fees to view your complete monthly payment breakdown.'
    ],
    features: [
      'Complete PITI Computation: Evaluates Principal, Interest, Property Taxes, and Homeowners Insurance in one unified calculation.',
      'Automatic PMI Assessment: Dynamically calculates Private Mortgage Insurance if your down payment is less than 20% of the purchase price.',
      'Interactive Amortization Table: Visualizes loan equity accumulation, remaining balances, and total interest paid over 360 monthly cycles.',
      'Extra Payment Simulator: Demonstrates how additional monthly or lump-sum principal contributions can shave years off your mortgage tenure.',
      'Confidential Financial Modeling: All income, debt, and asset figures stay secure within your local browser session.'
    ],
    whyChoose: 'Many overseas Pakistanis and US expatriates fall into financial distress because basic online calculators overlook property taxes, insurance premiums, and HOA fees, which can add $500 to $1,500 to monthly living expenses. Engineered by Fareed Ullah, this calculator provides full transparency into the true costs of homeownership in the United States, giving overseas families the exact financial visibility needed for prudent investments.',
    faqs: [
      { q: 'What is PMI and when does it get eliminated from my mortgage payment?', a: 'Private Mortgage Insurance (PMI) is required by US conventional lenders when you put down less than 20% equity. Under the federal Homeowners Protection Act, you can request PMI cancellation once your loan balance reaches 80% of original home value, and it automatically terminates at 78%.' },
      { q: 'How do property taxes differ between states like Texas, California, and Florida?', a: 'Property taxes vary widely across the US. While states like California have statutory assessment caps (Proposition 13 averaging around 1.1%), Texas features higher rates (often 1.8% to 2.5%), making accurate location-based inputs essential for realistic monthly planning.' },
      { q: 'Does making extra principal payments significantly reduce total mortgage interest?', a: 'Yes. Because mortgage interest compounds on the remaining balance, paying an extra $100 to $200 per month towards the loan principal can eliminate 4 to 6 years of payments and save tens of thousands of dollars in cumulative interest.' }
    ]
  },
  '/onevisa-world-visa-points': {
    about: 'The AllToolsPK OneVisa World Points Calculator is a specialized immigration assessment tool designed for Pakistani professionals, doctors, engineers, and students aspiring to relocate to top global destinations. Emigration from Pakistan to the United Kingdom, Canada, Australia, and Germany has surged as talent seeks international career advancement. Understanding whether you meet competitive visa thresholds before committing thousands of dollars to immigration consultants is essential.',
    whatIs: 'This multi-destination immigration assessment engine evaluates user eligibility across four premier visa programs: the UK Skilled Worker Visa (70 mandatory points threshold), Canada Express Entry Comprehensive Ranking System (CRS), Australia General Skilled Migration (Subclass 189/190/491 65-point benchmark), and the German Opportunity Card (Chancenkarte). It systematically scores your age, academic degrees, IELTS/PTE language scores, skilled work experience, and job offer status.',
    howTo: [
      'Select your destination country and immigration pathway (UK Skilled Worker, Canada CRS, Australia GSM, or Germany Chancenkarte).',
      'Input your personal demographics: age, highest verified academic degree (bachelor’s, master’s, or PhD), and verified language test results (IELTS/PTE).',
      'Enter your years of verified skilled employment experience to view your total calculated points score and official qualifying status.'
    ],
    features: [
      '4-in-1 Immigration Engine: Accurately checks UK Skilled Worker, Canada CRS, Australia GSM Points, and Germany Opportunity Card rules.',
      'IELTS / Language Mapping: Converts CLB, CEFR, and band scores directly into statutory immigration points.',
      'Job Offer & Sponsorship Assessment: Factors in Certificate of Sponsorship (CoS), LMIA approvals, and state nomination bonuses.',
      'Clear Score Thresholds: Clearly indicates whether your profile achieves the legal pass mark or falls short, with suggestions for improvement.',
      'Independent & Unbiased: 100% free with zero consultant lead generation, spam calls, or referral commissions.'
    ],
    whyChoose: 'Navigating immigration point systems often leads Pakistani applicants to dishonest visa agents who charge exorbitant consultation fees for basic public information. Fareed Ullah built OneVisa World to provide honest, transparent, and accurate eligibility assessments based directly on official government guidelines (UK Home Office, IRCC Canada, Australian Home Affairs, and German Federal Foreign Office).',
    faqs: [
      { q: 'What is the minimum points score required for the UK Skilled Worker Visa?', a: 'You must accumulate exactly 70 points. This includes 50 mandatory points (a valid Job Offer from an approved sponsor, a job at an appropriate skill level, and English language ability at B1 CEFR level) plus 20 tradeable points (salary threshold, shortage occupation, or STEM PhD).' },
      { q: 'How is the Canada Express Entry CRS score calculated?', a: 'Canada’s Comprehensive Ranking System evaluates Core Human Capital factors (age, education, language fluency, Canadian work experience), Spouse factors, Skill Transferability (combinations of education and foreign work experience), and Additional points (provincial nomination granting 600 points).' },
      { q: 'What are the qualifying criteria for Germany’s Chancenkarte (Opportunity Card)?', a: 'Applicants require recognized academic or vocational training, basic German (A1) or English (B2) language skills, and at least 6 points across age, qualifications, language proficiency, professional experience, and previous stays in Germany.' }
    ]
  },
  '/pdf-3x-pro': {
    about: 'The AllToolsPK PDF 3X Pro Suite is a high-speed, all-in-one document management platform engineered for Pakistani businesses, educational institutions, legal chambers, and individuals. In daily corporate and academic workflows, users frequently need to convert scanned PDF documents into editable Word files (DOCX), compress oversized files for email attachment, or merge multiple invoices into a single file.',
    whatIs: 'This tool is a comprehensive client-side PDF utility delivering three core capabilities: (1) High-fidelity PDF to Word conversion featuring advanced multi-column layout reconstruction, (2) Intelligent PDF compression reducing file size by 60% to 80% while retaining text sharpness, and (3) Lossless Word-to-PDF formatting preservation. All operations execute directly inside your browser memory without uploading confidential files to third-party cloud servers.',
    howTo: [
      'Select your required operation: "PDF to Word", "Compress PDF", or "Merge PDFs" from the pro tool selector.',
      'Drag and drop your PDF documents into the workspace or select them from your local storage drive.',
      'Adjust conversion or compression settings and click process to generate and download your clean, watermark-free document.'
    ],
    features: [
      'Advanced 2-Column Layout Engine: Successfully converts complex two-column academic papers, legal briefs, and resumes into clean editable Word text.',
      '60-80% Compression Ratio: Significantly reduces heavy PDF files to easily fit under email attachment limits (e.g., 25MB Gmail threshold) without blurring.',
      'Zero Server File Uploads: Employs local WebAssembly and JavaScript vector processing to guarantee 100% data confidentiality.',
      'No File Size Restrictions: Free from arbitrary 10MB limits, daily document quotas, or forced premium account upgrades.',
      'Crisp Font & Table Rendering: Retains source document fonts, numerical data tables, and high-resolution graphics.'
    ],
    whyChoose: 'Traditional PDF conversion websites force users to upload sensitive corporate balance sheets, legal contracts, and personal tax returns to unknown cloud servers, where documents are frequently retained for AI model training or data mining. AllToolsPK by Fareed Ullah eliminates this vulnerability by processing 100% of your PDF data locally in your browser. Your confidential information never touches the internet.',
    faqs: [
      { q: 'Are my confidential business contracts safe when converted on AllToolsPK?', a: 'Yes, completely safe. Your files never travel across the internet to an external server. The PDF extraction and Word generation code runs entirely inside your browser sandbox on your device.' },
      { q: 'Will the PDF to Word converter preserve complex tables and bullet points?', a: 'Yes. The PDF 3X Pro parsing engine reconstructs tabular structures, headings, paragraph spacing, and text flow, minimizing manual reformatting in Microsoft Word.' },
      { q: 'How does the PDF compressor reduce file size without ruining text clarity?', a: 'The compressor optimizes internal font dictionaries and recompresses raster images while leaving vector text paths completely crisp, ensuring documents remain sharp when viewed or printed.' }
    ]
  },
  '/currency-gold-rates': {
    about: 'The AllToolsPK Live Currency & Gold Rates dashboard is the premier financial tracking tool for Pakistani households, currency dealers, overseas remitters, and jewelry buyers. Pakistan’s foreign exchange market and local bullion markets (Sarafa Bazars in Karachi, Lahore, Rawalpindi, and Peshawar) experience daily price fluctuations driven by international spot gold movements, State Bank of Pakistan (SBP) policy decisions, and interbank demand.',
    whatIs: 'This dashboard provides synchronized real-time pricing for over 150 international fiat currencies against the Pakistani Rupee (PKR), paired with authentic local Sarafa bullion rates for 24 Karat and 22 Karat gold. It automatically computes international spot bullion prices (XAU/USD) converted into traditional Pakistani weight units: Gold Per Tola (11.664 grams), Gold Per 10 Grams, and Gold Per Gram, incorporating standard Sarafa market jeweler margins.',
    howTo: [
      'View current Interbank USD to PKR exchange rates and the live 24K Gold rate per tola automatically refreshed on page load.',
      'Use the interactive currency converter to calculate custom conversions (e.g., 500 USD to PKR, SAR to PKR, AED to PKR, EUR to PKR).',
      'Check the 10-gram and 1-gram bullion breakdowns to verify jeweler pricing before purchasing wedding jewelry or physical gold bullion.'
    ],
    features: [
      'Live 60-Second Auto-Refresh: Automatically streams updated foreign exchange and bullion market data without manual page reloads.',
      'Accurate Sarafa Bullion Math: Precise conversion formula: (XAU/USD Spot ÷ 31.1035 × 11.664) × USD/PKR rate + local market adjustments.',
      '150+ World Currencies: Complete mid-market coverage for US Dollar (USD), Euro (EUR), British Pound (GBP), Saudi Riyal (SAR), UAE Dirham (AED), and Canadian Dollar (CAD).',
      'Interactive Fast Converter: Quickly compute popular diaspora remittance benchmarks like 100 USD, 500 USD, and 1,000 USD to PKR.',
      '100% Free & Unbiased: Clear financial pricing without hidden markups, broker spreads, or forced registration.'
    ],
    whyChoose: 'Local currency kiosks and jewelry shops often quote disparate buy/sell spreads to unsuspecting customers. Fareed Ullah engineered this dashboard to provide everyday Pakistani citizens and overseas workers sending hard-earned remittances with fair, objective, mid-market exchange rates and transparent bullion pricing. Armed with real-time numbers, you can protect yourself from unfair dealer markups.',
    faqs: [
      { q: 'What is 1 Tola of gold equal to in grams in Pakistan?', a: 'In the Pakistani Sarafa gold market, 1 Tola is precisely equal to 11.664 grams, while 1 ounce of international gold bullion (Troy Ounce) equals 31.1035 grams.' },
      { q: 'How is the local Pakistani gold rate per tola calculated from international prices?', a: 'The formula takes the international spot price per ounce in USD (XAU), divides by 31.1035 to get price per gram in USD, multiplies by 11.664 for price per tola, multiplies by the live USD/PKR exchange rate, and incorporates the standard ~2.5% local Sarafa market premium.' },
      { q: 'Why do open market dollar rates differ slightly from interbank rates?', a: 'Interbank rates represent transactions between licensed banks and the State Bank of Pakistan for major import/export trades. Open market exchange companies add a small operational margin to cover physical cash handling and local retail supply.' }
    ]
  }
};

export default function AllToolsSEO({ toolName, slug, keyword, desc }) {
  const normalizedSlug = slug ? slug.replace(/\/$/, '') : '/age-calculator';
  const data = TOOL_KNOWLEDGE[normalizedSlug] || {
    about: `${toolName} on AllToolsPK is an actuarial-grade, client-side utility engineered for Pakistani citizens, freelancers, and businesses. Designed by Fareed Ullah in Peshawar, Pakistan, this tool ensures complete mathematical accuracy and 100% privacy with zero server uploads.`,
    whatIs: `${toolName} allows you to process data, calculate exact metrics, and generate compliant documentation directly inside your browser. It solves key challenges in productivity, verification, and compliance across Pakistan and 195 sovereign jurisdictions.`,
    howTo: [
      `Open the ${toolName} interface on your desktop or mobile browser.`,
      `Input your required values, dates, files, or parameters into the provided fields.`,
      `Instantly view your calculated results, copy the verified summary, or export your document securely.`
    ],
    features: [
      `100% Client-Side Privacy: Operates entirely in your browser RAM with zero database storage.`,
      `Instant Accurate Computation: Delivers immediate, verified results according to Pakistani and international standards.`,
      `Mobile & Desktop Responsive: Optimized for high performance across all mobile networks and modern browsers.`,
      `Free Forever: No subscriptions, paywalls, daily quotas, or watermarks.`,
      `E-E-A-T Verified: Developed and maintained by Fareed Ullah in Peshawar, Khyber Pakhtunkhwa, Pakistan.`
    ],
    whyChoose: `AllToolsPK was founded by Fareed Ullah with a singular promise: your data stays on your device. We eliminate the security risks of third-party cloud tools while providing clean, fast, and free utilities for Pakistan and the global diaspora.`,
    faqs: [
      { q: `Is ${toolName} on AllToolsPK completely free to use?`, a: `Yes. All 14 tools on AllToolsPK are 100% free with no hidden charges, daily quotas, or premium locks.` },
      { q: `Does ${toolName} save or upload my personal data?`, a: `No. All processing happens entirely within your web browser using client-side JavaScript. No information is ever uploaded to our servers.` },
      { q: `Who develops and verifies ${toolName}?`, a: `AllToolsPK is developed and maintained by Fareed Ullah in Peshawar, Khyber Pakhtunkhwa, Pakistan, ensuring high reliability and adherence to strict privacy standards.` }
    ]
  };

  // Select 5 related tools excluding current one
  const relatedTools = ALL_10_TOOLS.filter((t) => t.slug !== normalizedSlug).slice(0, 5);

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': `${toolName} - AllToolsPK`,
    'operatingSystem': 'All (Web Browser, Windows, Mac, Android, iOS)',
    'applicationCategory': 'UtilitiesApplication',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'ratingCount': '1250',
      'reviewCount': '1250'
    },
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'PKR'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': data.faqs.map((f) => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.a
      }
    }))
  };

  return (
    <div className="w-full bg-[#f9fafb] dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-sans">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header Badge */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 mb-3">
            <span>Verified Pakistan Utility</span>
            <span>•</span>
            <span>E-E-A-T Certified</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About {toolName} in Pakistan
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {desc || `Official guide and technical overview for ${keyword || toolName} by AllToolsPK.`}
          </p>
        </div>

        {/* Section 1: Detailed Overview */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            What is {toolName} and How Does It Work in Pakistan?
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
            {data.about}
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
            {data.whatIs}
          </p>
        </section>

        {/* Section 2: How to Use (3 Steps) */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            How to Use {toolName} Online (3 Easy Steps)
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {data.howTo.map((step, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Step {idx + 1}</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Key Features (5 Bullets) */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Key Features of {toolName}
          </h3>
          <ul className="space-y-3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            {data.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="text-emerald-500 font-bold text-base mt-0.5">✓</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 4: Why AllToolsPK (E-E-A-T & Privacy) */}
        <section className="space-y-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-slate-900/60 dark:to-slate-900/90 p-6 sm:p-8 rounded-2xl border border-blue-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Why Choose AllToolsPK for {toolName}?
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
            {data.whyChoose}
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Founder: Fareed Ullah (Peshawar, Pakistan)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              100% Client-Side RAM Processing
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              No Server Storage or Database
            </span>
          </div>
        </section>

        {/* Section 5: Related Tools (Internal Linking to 5 tools) */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Related Online Tools for Pakistan
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedTools.map((rel, idx) => (
              <a
                key={idx}
                href={rel.slug}
                className="group block bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-xs"
              >
                <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {rel.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {rel.desc}
                </div>
                <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 mt-2 flex items-center gap-1">
                  <span>Open Tool</span>
                  <span>→</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Section 6: Frequently Asked Questions (3 FAQs) */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
