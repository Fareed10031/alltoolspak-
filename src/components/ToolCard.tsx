import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ToolItem } from '@/lib/config';

export interface ToolCardProps {
  tool: ToolItem;
  color: {
    bg: string;
    light: string;
    border: string;
    text: string;
  };
  onClick?: () => void;
}

export function ToolCard({ tool, color, onClick }: ToolCardProps) {
  // Initial letter of tool name fallback
  const initial = tool.name ? tool.name[0].toUpperCase() : 'A';
  const badgeLabel = tool.badge || tool.tag;
  const badgeClass =
    tool.badgeColor ||
    'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60';

  const iconBg = tool.color || color.bg;
  const isPdf3X = tool.slug === 'pdf-to-word';

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-red-200 transition-all group h-[160px] flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-2xl mb-3 group-hover:bg-red-50 transition-colors shrink-0 overflow-hidden">
            {(() => {
              // 100% SAFE: Only targets Amazon EU VAT, rest of app untouched
              if (
                tool.slug === 'amazon-eu-vat' ||
                tool.name === 'Amazon EU VAT Calculator' ||
                (tool as any).id === 'amazon-eu-vat-calculator'
              ) {
                return (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-800">
                    <span className="text-xl">💶</span>
                  </div>
                );
              }
              // For all other tools, return tool.icon
              if (tool.icon) {
                return tool.icon;
              }
              return <span className="font-bold text-gray-800">{initial}</span>;
            })()}
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>
            {badgeLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-[15px] text-gray-800 mb-1 line-clamp-1 group-hover:text-red-600 transition-colors">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
          {tool.desc}
        </p>
      </div>
    </div>
  );
}

export default ToolCard;
