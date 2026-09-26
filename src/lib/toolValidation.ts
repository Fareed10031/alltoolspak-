export interface ValidationResult {
  isValid: boolean;
  missing: string[];
}

export function validateRequiredFields(
  data: Record<string, any>,
  requiredFields: string[]
): ValidationResult {
  const missing = requiredFields.filter((field) => {
    const value = data[field];
    if (value === undefined || value === null) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    if (Array.isArray(value) && value.length === 0) return true;
    return false;
  });
  return { isValid: missing.length === 0, missing };
}

export function guardDownload(result: ValidationResult): boolean {
  if (!result.isValid) {
    const message = `⚠️ Please complete required fields:\n\n• ${result.missing.join('\n• ')}\n\nThen try to download again.`;
    if (typeof window !== 'undefined' && typeof window.alert === 'function') {
      try {
        alert(message);
      } catch {
        console.warn(message);
      }
    }
    return false;
  }
  return true;
}
