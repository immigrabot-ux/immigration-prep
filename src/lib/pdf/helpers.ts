/**
 * Formats a date string to MM/DD/YYYY format
 */
export function formatDate(dateString: string | null | undefined, format: string = 'MM/DD/YYYY'): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  switch (format) {
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    default:
      return `${month}/${day}/${year}`;
  }
}

/**
 * Formats a phone number to (123) 456-7890 format
 */
export function formatPhone(phone: string | null | undefined): string {
  if (!phone) return '';

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  // Return original if not 10 digits
  return phone;
}

/**
 * Formats SSN to XXX-XX-XXXX format
 */
export function formatSSN(ssn: string | null | undefined): string {
  if (!ssn) return '';

  // Remove all non-digit characters
  const cleaned = ssn.replace(/\D/g, '');

  // Format if 9 digits
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5)}`;
  }

  // Return original if not 9 digits
  return ssn;
}

/**
 * Gets a nested value from an object using dot notation
 * Example: getNestedValue({ user: { name: 'John' } }, 'user.name') => 'John'
 */
export function getNestedValue(obj: any, path: string): any {
  if (!obj || !path) return undefined;

  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = current[key];
  }

  return current;
}

/**
 * Flattens nested objects into a single-level object with dot notation keys
 * Example: { user: { name: 'John', age: 30 } } => { 'user.name': 'John', 'user.age': 30 }
 */
export function flattenAnswers(
  answers: Record<string, any>,
  prefix: string = ''
): Record<string, any> {
  const flattened: Record<string, any> = {};

  for (const [key, value] of Object.entries(answers)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value === null || value === undefined) {
      flattened[newKey] = '';
    } else if (typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
      // Recursively flatten nested objects
      Object.assign(flattened, flattenAnswers(value, newKey));
    } else if (Array.isArray(value)) {
      // Convert arrays to comma-separated strings
      flattened[newKey] = value.join(', ');
    } else if (typeof value === 'boolean') {
      // Convert booleans to Yes/No
      flattened[newKey] = value ? 'Yes' : 'No';
    } else if (value instanceof Date) {
      // Format dates
      flattened[newKey] = formatDate(value.toISOString());
    } else {
      flattened[newKey] = String(value);
    }
  }

  return flattened;
}

/**
 * Applies a transform function to a value
 */
export function applyTransform(
  value: any,
  transform?: string | ((val: any) => string)
): string {
  if (!value && value !== 0 && value !== false) return '';

  // If transform is a function, apply it
  if (typeof transform === 'function') {
    return transform(value);
  }

  // If transform is a string, apply predefined transforms
  if (typeof transform === 'string') {
    switch (transform) {
      case 'date':
      case 'formatDate':
        return formatDate(value);
      case 'phone':
      case 'formatPhone':
        return formatPhone(value);
      case 'ssn':
      case 'formatSSN':
        return formatSSN(value);
      case 'uppercase':
        return String(value).toUpperCase();
      case 'lowercase':
        return String(value).toLowerCase();
      case 'yesNo':
        return value ? 'Yes' : 'No';
      case 'checkbox':
        return value ? 'X' : '';
      default:
        return String(value);
    }
  }

  return String(value);
}

/**
 * Splits a long text into multiple lines for PDF fields
 */
export function splitTextForPDF(text: string, maxLength: number = 100): string[] {
  if (!text || text.length <= maxLength) {
    return [text || ''];
  }

  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxLength) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

/**
 * Converts a name object to full name string
 */
export function formatFullName(name: {
  firstName?: string;
  middleName?: string;
  lastName?: string;
}): string {
  if (!name) return '';

  const parts = [
    name.firstName,
    name.middleName,
    name.lastName,
  ].filter(Boolean);

  return parts.join(' ');
}

/**
 * Converts an address object to formatted string
 */
export function formatAddress(address: {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}): string {
  if (!address) return '';

  const parts = [
    address.street,
    address.city ? `${address.city},` : '',
    address.state,
    address.zip,
  ].filter(Boolean);

  return parts.join(' ');
}
