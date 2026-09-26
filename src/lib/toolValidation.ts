export interface ValidationResult {
  isValid: boolean;
  missing: string[];
}

export function validateRequiredFields(data: any, fields: string[]): ValidationResult {
  if (!data) return { isValid: false, missing: fields };
  const missing = fields.filter((f) => {
    const v = data[f] ?? data.contact?.[f] ?? "";
    return !v || (typeof v === 'string' && v.trim() === '') || (Array.isArray(v) && v.length === 0);
  });
  return { isValid: missing.length === 0, missing };
}

export function guardDownload(res: any): boolean {
  if (!res || !res.isValid) {
    const msg = `Please fill required fields: ${res?.missing ? res.missing.join(', ') : 'All required fields'}`;
    if (typeof window !== 'undefined' && typeof window.alert === 'function') {
      try {
        alert(msg);
      } catch {
        console.warn(msg);
      }
    }
    return false;
  }
  return true;
}
