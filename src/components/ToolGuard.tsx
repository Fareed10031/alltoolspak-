"use client";
import React from 'react';

export default function ToolGuard({
  isValid,
  missing,
  children,
}: {
  isValid: boolean;
  missing: string[];
  children: React.ReactNode;
}) {
  if (!isValid) {
    return (
      <div className="w-full p-4 mb-6 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-3 text-left">
        <span className="text-xl leading-none">⚠️</span>
        <div>
          <p className="text-[14px] font-bold text-amber-900">Action Required</p>
          <p className="text-[13px] text-amber-800 mt-1">
            Please fill these fields to enable download:{' '}
            <span className="font-bold">{missing.join(', ')}</span>
          </p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

export { ToolGuard };
