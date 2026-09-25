import React from 'react';
import {
  Palette,
  Type,
  LayoutTemplate,
  Download,
  Upload,
  Save,
  RotateCcw,
  Sparkles,
  Eye,
  Edit3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ResumeData,
  TemplateType,
  ColorTheme,
  FontFamily,
  SpacingType,
  MarginType,
} from './types';

interface TemplateToolbarProps {
  data: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  activeTab: 'editor' | 'preview';
  onTabChange: (tab: 'editor' | 'preview') => void;
  onExportPDF: () => void;
  onSaveDraft: () => void;
  onLoadDraft: () => void;
  onReset: () => void;
  onLoadSample: () => void;
  isExporting?: boolean;
}

export function TemplateToolbar({
  data,
  onChange,
  activeTab,
  onTabChange,
  onExportPDF,
  onSaveDraft,
  onLoadDraft,
  onReset,
  onLoadSample,
  isExporting = false,
}: TemplateToolbarProps) {
  const templates: { id: TemplateType; label: string }[] = [
    { id: 'modern', label: 'Modern' },
    { id: 'minimal', label: 'Minimal ATS' },
    { id: 'executive', label: 'Executive' },
  ];

  const colors: { id: ColorTheme; bg: string; title: string }[] = [
    { id: 'emerald', bg: 'bg-emerald-600', title: 'Emerald' },
    { id: 'navy', bg: 'bg-blue-900', title: 'Classic Navy' },
    { id: 'blue', bg: 'bg-blue-600', title: 'Royal Blue' },
    { id: 'burgundy', bg: 'bg-rose-900', title: 'Burgundy' },
    { id: 'slate', bg: 'bg-slate-700', title: 'Charcoal Slate' },
  ];

  const fonts: { id: FontFamily; label: string }[] = [
    { id: 'inter', label: 'Inter (Sans)' },
    { id: 'roboto', label: 'Roboto (Clean)' },
    { id: 'garamond', label: 'Garamond (Serif)' },
  ];

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
      {/* Top Row: View Switcher & Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700">
          <button
            onClick={() => onTabChange('editor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
              activeTab === 'editor'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            onClick={() => onTabChange('preview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
              activeTab === 'preview'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
            <span>Live A4 Preview</span>
          </button>
        </div>

        {/* Secondary controls */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onLoadSample}
            className="text-xs cursor-pointer h-8 gap-1 text-slate-700 dark:text-slate-300"
            title="Load sample professional tech executive profile"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Sample Data</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onLoadDraft}
            className="text-xs cursor-pointer h-8 gap-1 text-slate-700 dark:text-slate-300"
            title="Import JSON draft"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Load</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onSaveDraft}
            className="text-xs cursor-pointer h-8 gap-1 text-slate-700 dark:text-slate-300"
            title="Download JSON draft"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save</span>
          </Button>

          <Button
            variant="emerald"
            size="sm"
            disabled={isExporting}
            onClick={onExportPDF}
            className="text-xs font-bold cursor-pointer h-8 gap-1.5 shadow-md shadow-emerald-600/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Generating PDF...' : 'Export ATS PDF'}</span>
          </Button>
        </div>
      </div>

      {/* Bottom Row: Design Controls (Template, Colors, Fonts, Margins, Spacing) */}
      <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-4 text-xs">
        {/* Templates */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1 text-[11px]">
            <LayoutTemplate className="w-3.5 h-3.5 text-emerald-600" />
            Template:
          </span>
          <div className="flex items-center gap-1">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => onChange({ template: t.id })}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer border ${
                  data.template === t.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-400 font-bold'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5 Colors */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1 text-[11px]">
            <Palette className="w-3.5 h-3.5 text-blue-600" />
            Color:
          </span>
          <div className="flex items-center gap-1.5">
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() => onChange({ colorTheme: c.id })}
                title={c.title}
                className={`w-5 h-5 rounded-full ${c.bg} cursor-pointer transition-transform ${
                  data.colorTheme === c.id ? 'ring-2 ring-offset-2 ring-emerald-500 scale-110' : 'opacity-80 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Font Family */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1 text-[11px]">
            <Type className="w-3.5 h-3.5 text-purple-600" />
            Font:
          </span>
          <select
            value={data.fontFamily}
            onChange={(e) => onChange({ fontFamily: e.target.value as FontFamily })}
            className="text-[11px] font-medium py-1 px-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer"
          >
            {fonts.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        {/* Margins & Spacing */}
        <div className="flex items-center gap-2">
          <select
            value={data.lineSpacing}
            onChange={(e) => onChange({ lineSpacing: e.target.value as SpacingType })}
            className="text-[11px] font-medium py-1 px-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer"
            title="Line Spacing"
          >
            <option value="compact">Compact Spacing</option>
            <option value="standard">Standard Spacing</option>
            <option value="relaxed">Relaxed Spacing</option>
          </select>

          <select
            value={data.margins}
            onChange={(e) => onChange({ margins: e.target.value as MarginType })}
            className="text-[11px] font-medium py-1 px-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer"
            title="Page Margins"
          >
            <option value="narrow">Narrow Margins</option>
            <option value="normal">Normal Margins</option>
            <option value="wide">Wide Margins</option>
          </select>

          <button
            onClick={onReset}
            className="text-[11px] text-slate-400 hover:text-rose-500 flex items-center gap-1 cursor-pointer ml-1"
            title="Reset to blank template"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
