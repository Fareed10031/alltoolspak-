"use client";

import React, { useState } from "react";
import { ToolItem } from "@/lib/config";
import { ShieldCheck, Zap, Lock, CheckCircle2 } from "lucide-react";

export interface ProToolBaseProps {
  tool: ToolItem;
  required: string[];
  render: (
    form: Record<string, any>,
    setForm: React.Dispatch<React.SetStateAction<Record<string, any>>>
  ) => React.ReactNode;
  generateFile: (form: Record<string, any>) => void | Promise<void>;
  seoContent?: React.ReactNode;
  initialState?: Record<string, any>;
}

export default function ProToolBase({
  tool,
  required = [],
  render,
  generateFile,
  seoContent,
  initialState = {},
}: ProToolBaseProps) {
  // Empty initial state - NO dummy data like Fareed Ullah
  const [form, setForm] = useState<Record<string, any>>(initialState);
  const [isGenerating, setIsGenerating] = useState(false);

  // Validation: Every required key must be present, non-empty, and if array must have length > 0
  const missingFields = required.filter((k) => {
    const val = form[k];
    if (val === undefined || val === null) return true;
    if (typeof val === "string" && val.trim() === "") return true;
    if (Array.isArray(val) && val.length === 0) return true;
    return false;
  });

  const isValid = missingFields.length === 0;

  const handleDownload = async () => {
    if (!isValid) {
      alert("Please fill all required fields: " + missingFields.join(", "));
      return;
    }
    try {
      setIsGenerating(true);
      await generateFile(form);
    } catch (err: any) {
      console.error("File generation error:", err);
      alert("An error occurred while compiling your file. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6">
      {/* Main Tool Container */}
      <div className="bg-white dark:bg-slate-900 rounded-[28px] p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mb-3">
            <span>{tool.tag}</span>
            <span>•</span>
            <span>100% Free &amp; Client-Side</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {tool.name}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base leading-relaxed">
            {tool.desc}
          </p>
        </div>

        {/* Dynamic Tool Form / Inputs */}
        <div className="py-2">{render(form, setForm)}</div>

        {/* Required Field Warnings */}
        {!isValid && required.length > 0 && (
          <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
            <span className="text-base leading-none">⚠️</span>
            <div>
              <p className="font-bold">Required to unlock download:</p>
              <p className="mt-0.5 capitalize">
                Please complete: <b>{missingFields.join(", ").replace(/([A-Z])/g, " $1")}</b>
              </p>
            </div>
          </div>
        )}

        {/* Action Button: Disabled until valid */}
        <button
          type="button"
          disabled={!isValid || isGenerating}
          onClick={handleDownload}
          className={`w-full mt-6 py-4 rounded-2xl font-black text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 ${
            isValid && !isGenerating
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 cursor-pointer active:scale-[0.99]"
              : "bg-gray-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
          }`}
        >
          {isGenerating ? (
            <span>Generating Real File...</span>
          ) : isValid ? (
            <span>Download {tool.name} File</span>
          ) : (
            <span>Fill All Fields to Enable Download</span>
          )}
        </button>

        {/* Security & Client-Side Notice */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 text-center">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            100% Client-Side
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-blue-500" />
            Instant Processing
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-purple-500" />
            No Files Uploaded
          </span>
        </div>

        {/* How to Use Section */}
        <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
            How to Use This Tool
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-blue-600 block mb-1">Step 1: Enter Data</span>
              Input your details into the form fields above. All processing happens in local browser memory.
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-blue-600 block mb-1">Step 2: Instant Preview</span>
              Inspect your input parameters and verify all required information is correctly provided.
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-blue-600 block mb-1">Step 3: Download File</span>
              Click download to compile and receive a real, production-ready file directly onto your device.
            </div>
          </div>
        </div>
      </div>

      {/* 250+ Words SEO Article Section Under Every Tool Page (AdSense Mandatory) */}
      <section className="mt-10 bg-white dark:bg-slate-900 rounded-[28px] p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-700 dark:text-slate-300">
        {seoContent ? (
          seoContent
        ) : (
          <div className="space-y-5 text-sm sm:text-base leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              About {tool.name} on AllToolsPK
            </h2>
            <p>
              In modern digital environments, access to fast, reliable, and privacy-first web utilities is crucial for professionals, students, and businesses alike. <strong>AllToolsPK</strong> provides an industry-leading implementation of {tool.name} engineered to execute 100% on the client side using cutting-edge browser capabilities including WebAssembly, HTML5 Canvas APIs, and JavaScript vector rendering engines.
            </p>
            <p>
              Unlike traditional online converters or generators that require users to send confidential documents, photos, or business metrics across public internet protocols to remote cloud servers, {tool.name} runs strictly within your browser's private sandbox. No personal data, uploaded media, or generated outputs are ever stored, transmitted, or logged on remote hardware. This architecture complies directly with strict global privacy mandates, including the European Union General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
            </p>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white pt-2">
              Why Use AllToolsPK's Client-Side Engine?
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>Zero Server Latency:</strong> Eliminate bandwidth bottlenecks. Because your device handles the computations locally, conversions and file outputs render instantly without queue delays.
              </li>
              <li>
                <strong>Guaranteed Privacy &amp; Data Security:</strong> Your inputs never touch our servers, protecting your identity, confidential figures, and creative assets from unauthorized third-party access.
              </li>
              <li>
                <strong>Always Free with Zero Watermarks:</strong> We never restrict downloads behind paywalls, subscription traps, or credit card requirements. Output files are clean, authentic, and immediately ready for professional distribution.
              </li>
              <li>
                <strong>Cross-Platform Compatibility:</strong> Enjoy a responsive, seamless experience across desktop computers, tablets, and smartphones on all modern browsers including Chrome, Safari, Firefox, and Edge.
              </li>
            </ul>
            <p className="text-xs sm:text-sm pt-2">
              AllToolsPK is committed to providing open, accessible, and high-performance digital tools for users worldwide. Explore our complete tool suite to discover more client-side document, image, and calculation utilities.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export { ProToolBase };
