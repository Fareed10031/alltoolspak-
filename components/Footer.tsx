// Clean Footer - No Links - 100% Safe
import React from 'react';

export interface FooterProps {
  onNavigate?: (path: string) => void;
  onSelectTool?: (toolId: string) => void;
  [key: string]: any;
}

export default function Footer(_props?: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold">
          AllTools<span className="text-blue-500">PK</span>
        </h2>
        <p className="text-gray-400 mt-3 text-sm max-w-xl mx-auto">
          Free Online Tools for Finance, Documents, Salary, Visa and Daily Use. Fast, Free and Easy to Use for Everyone.
        </p>
        <div className="border-t border-slate-800 mt-8 pt-6">
          <p className="text-gray-500 text-sm">
            © 2026 AllToolsPK. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
