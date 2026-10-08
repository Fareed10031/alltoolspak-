import React from 'react';
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
  const initial = tool.name ? tool.name[0].toUpperCase() : 'A';
  const badgeLabel = tool.badge || tool.tag;

  // Curated light background tint for icon box
  const iconLightBg = color?.light || 'bg-blue-50';

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-4 h-[160px] flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer group"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          {/* Icon container: w-12 h-12 rounded-lg with light bg color and text-xl, NOT white on white */}
          <div
            className={`w-12 h-12 ${iconLightBg} rounded-lg flex items-center justify-center text-xl text-gray-800 shrink-0 font-bold`}
          >
            {tool.icon ? tool.icon : initial}
          </div>
          {badgeLabel && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
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
