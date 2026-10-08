import React from 'react';
import { ToolItem } from '@/lib/config';

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

export function ToolCard({ tool, color, onClick }: ToolCardProps) {
  const initial = tool.name ? tool.name.charAt(0) : 'A';
  const badgeLabel = tool.badge || tool.tag;

  // Curated light background tint for icon box: default to tool.bgColor or light color
  const bgColor = (tool as any).bgColor || color?.light || '#f3f4f6';

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-4 h-[160px] flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer group"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          {/* High-visibility icon container: dark text on light bg, zero opacity/filter artifacts */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: bgColor }}
          >
            <div className="text-gray-900 text-2xl font-bold opacity-100">
              {(tool as any).iconText || tool.icon || initial}
            </div>
          </div>
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
