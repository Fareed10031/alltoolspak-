export const TOOL_COLORS = [
  { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600", gradient: "from-blue-500 to-blue-600" },
  { bg: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-600", gradient: "from-emerald-500 to-green-600" },
  { bg: "bg-purple-500", light: "bg-purple-50", text: "text-purple-600", gradient: "from-purple-500 to-violet-600" },
  { bg: "bg-orange-500", light: "bg-orange-50", text: "text-orange-600", gradient: "from-orange-500 to-amber-600" },
  { bg: "bg-rose-500", light: "bg-rose-50", text: "text-rose-600", gradient: "from-rose-500 to-pink-600" },
  { bg: "bg-cyan-500", light: "bg-cyan-50", text: "text-cyan-600", gradient: "from-cyan-500 to-teal-600" },
  { bg: "bg-indigo-500", light: "bg-indigo-50", text: "text-indigo-600", gradient: "from-indigo-500 to-indigo-600" },
  { bg: "bg-amber-500", light: "bg-amber-50", text: "text-amber-600", gradient: "from-amber-500 to-yellow-600" },
];

export const TOOL_ICONS = [
  "FileText",
  "Image",
  "QrCode",
  "Lock",
  "Type",
  "Palette",
  "Calculator",
  "Scissors",
  "Key",
];

export function getAutoLogo(toolName: string, index: number = 0) {
  // Hash-based so same tool always gets same color, future tools auto get unique
  const hash = toolName.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  const colorIndex = Math.abs(hash + index) % TOOL_COLORS.length;
  const iconIndex = Math.abs(hash) % TOOL_ICONS.length;
  return {
    color: TOOL_COLORS[colorIndex],
    iconName: TOOL_ICONS[iconIndex],
    id: `tool-${Math.abs(hash)}`,
  };
}
