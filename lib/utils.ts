/**
 * Formats a numeric value or string representation of a number
 * into a standard USD currency string (e.g., $1,234.56).
 *
 * @param value The currency amount to format
 * @returns A formatted USD currency string
 */
export function formatCurrency(
  value: number | string | undefined | null,
): string {
  if (value === null || value === undefined) {
    return "$0.00";
  }

  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) {
    return "$0.00";
  }

  const parts = num.toFixed(2).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `$${parts.join(".")}`;
}

export const formatStatusLabel = (value?: string): string => {
  if (!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1);
};