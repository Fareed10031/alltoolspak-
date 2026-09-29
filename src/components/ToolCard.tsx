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

  return (
    <div
      onClick={onClick}
      className="group relative bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-400/80 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
    >
      <div>
        {/* Top Row: 56x56 icon box with color bg and bold letter/custom icon + tag pill */}
        <div className="flex items-center justify-between">
          <div
            className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center text-white font-extrabold text-2xl shadow-md group-hover:scale-105 transition-transform overflow-hidden`}
          >
            {(() => {
              // 100% SAFE: Only targets Amazon EU VAT, rest of app untouched
              if (
                tool.slug === 'amazon-eu-vat' ||
                tool.name === 'Amazon EU VAT Calculator' ||
                (tool as any).id === 'amazon-eu-vat-calculator'
              ) {
                return (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="9" cy="21" r="1" fill="white" stroke="none" />
                      <circle cx="20" cy="21" r="1" fill="white" stroke="none" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      <text
                        x="7.5"
                        y="14"
                        fill="white"
                        stroke="none"
                        fontSize="5.5"
                        fontWeight="900"
                        fontFamily="Arial, sans-serif"
                      >
                        % VAT
                      </text>
                    </svg>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-300 text-[10px]">★</span>
                      <span className="text-[9px] font-black tracking-widest">EU</span>
                      <span className="text-yellow-300 text-[10px]">★</span>
                    </div>
                  </div>
                );
              }
              // For all other tools (including ATS), keep original logic - NO DAMAGE
              if (tool.icon) {
                return tool.icon;
              }
              return initial;
            })()}
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeClass}`}>
            {badgeLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4 group-hover:text-blue-600 transition-colors">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
          {tool.desc}
        </p>
      </div>

      {/* Bottom Action */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 transition-colors">
          Use Tool Free
        </span>
        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/60 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default ToolCard;
