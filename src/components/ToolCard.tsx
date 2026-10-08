import React from 'react';
import { ToolItem } from '@/lib/config';
import { ToolIconBox } from '@/components/ToolIcons';

export interface ToolCardProps {
  tool: ToolItem;
  color?: {
    bg: string;
    light: string;
    border: string;
    text: string;
  };
  onClick?: () => void;
}

export function ToolCard({ tool, onClick }: ToolCardProps) {
  const badgeLabel = tool.badge || tool.tag;
  const isPdf3X = tool.slug === 'pdf-to-word' || tool.slug === 'pdf-3x-pro';

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all h-[180px] flex flex-col justify-between cursor-pointer group"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          {isPdf3X ? (
            /* PDF 3X Pro keeps custom 3-tool stacked icon badge */
            <div className="w-[56px] h-[56px] rounded-[14px] bg-gradient-to-br from-[#FF416C] via-[#8E2DE2] to-[#4A00E0] shadow-lg flex items-center justify-center shrink-0">
              <span className="text-white text-xl">📄🗜️📝</span>
            </div>
          ) : (
            <ToolIconBox toolKey={tool.slug} />
          )}

          {badgeLabel && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
              {badgeLabel}
            </span>
          )}
        </div>

        {/* Title: text-[15px] font-semibold text-gray-900 */}
        <h3 className="text-[15px] font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {tool.name}
        </h3>

        {/* Description: text-xs text-gray-500 line-clamp-2 */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
          {tool.desc}
        </p>
      </div>
    </div>
  );
}

export default ToolCard;
