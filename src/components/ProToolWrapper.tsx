"use client";
import React, { useState } from "react";
import { getAutoLogo } from "@/lib/autoLogoSystem";

export interface ProToolWrapperProps {
  toolName: string;
  requiredFields?: string[];
  children: ((setData: React.Dispatch<React.SetStateAction<any>>, data: any) => React.ReactNode) | React.ReactNode;
  onDownload?: (data: any) => void;
  index?: number;
  description?: string;
}

export default function ProToolWrapper({
  toolName,
  requiredFields = [],
  children,
  onDownload,
  index = 0,
  description = "100% Client-Side Processing • Free Forever • No Registration Required",
}: ProToolWrapperProps) {
  const [data, setData] = useState<any>({});
  const logo = getAutoLogo(toolName, index);

  // VALIDATION - This fixes empty download error FOREVER
  const isValid =
    requiredFields.length === 0 ||
    requiredFields.every((f: string) => {
      const val = (data as any)?.[f] ?? (data as any)?.contact?.[f] ?? "";
      return val && String(val).trim() !== "" && (!Array.isArray(val) || val.length > 0);
    });

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3.5 mb-6">
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${logo.color.gradient} flex items-center justify-center text-white font-extrabold text-xl shadow-md shrink-0`}
        >
          {toolName ? toolName[0] : "T"}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {toolName}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {description}
          </p>
        </div>
      </div>

      <div className="w-full">
        {typeof children === "function" ? children(setData, data) : children}
      </div>

      {!isValid && requiredFields.length > 0 && (
        <div className="mt-5 p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-center gap-2">
          <span>⚠️</span>
          <span>
            Please fill: <b>{requiredFields.join(", ")}</b> to enable download
          </span>
        </div>
      )}

      {onDownload && (
        <button
          type="button"
          disabled={!isValid}
          onClick={() => {
            if (!isValid) {
              alert("Please fill all required fields before downloading.");
              return;
            }
            onDownload(data);
          }}
          className={`w-full mt-6 py-3.5 rounded-xl font-bold text-white transition-all text-sm sm:text-base ${
            isValid
              ? "bg-[#0055FF] hover:bg-blue-700 shadow-lg shadow-blue-500/20 cursor-pointer active:scale-[0.99]"
              : "bg-gray-300 dark:bg-slate-700 cursor-not-allowed text-slate-500"
          }`}
        >
          {isValid ? `Download ${toolName}` : "Fill Details to Enable Download"}
        </button>
      )}

      <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-4">
        100% Free • No login • Files auto-deleted • AdSense Compliant
      </p>
    </div>
  );
}

export { ProToolWrapper };
