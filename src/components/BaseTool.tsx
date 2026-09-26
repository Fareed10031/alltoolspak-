"use client";
import React, { useState } from "react";
import { validateRequiredFields, guardDownload } from "@/lib/toolValidation";

export interface BaseToolProps {
  toolName: string;
  requiredFields: string[];
  initialData: any;
  onGenerate: (data: any) => void;
  children: (setData: React.Dispatch<React.SetStateAction<any>>, data: any) => React.ReactNode;
}

export default function BaseTool({
  toolName,
  requiredFields,
  initialData,
  onGenerate,
  children,
}: BaseToolProps) {
  const [data, setData] = useState(initialData);
  const validation = validateRequiredFields(data, requiredFields);

  const handleAction = () => {
    if (!guardDownload(validation)) return;
    onGenerate(data);
  };

  return (
    <div>
      {children(setData, data)}
      {!validation.isValid && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm mb-4 text-slate-800">
          ⚠️ Please fill: <b>{validation.missing.join(", ")}</b> to enable download
        </div>
      )}
      <button
        type="button"
        onClick={handleAction}
        disabled={!validation.isValid}
        className={`w-full py-3 rounded-xl font-bold text-white transition-colors ${
          validation.isValid
            ? "bg-emerald-600 hover:bg-emerald-700 cursor-pointer shadow-md"
            : "bg-gray-300 dark:bg-slate-700 cursor-not-allowed text-slate-500"
        }`}
      >
        {validation.isValid ? `Download ${toolName}` : `Fill Details to Download`}
      </button>
    </div>
  );
}

export { BaseTool };
