/**
 * Shared utility for normalizing spacing and sizing values
 * Supports numbers, strings, and semantic preset values for spacing-related properties
 */

type SizePreset = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type SpacingValue<TPreset extends string = SizePreset> =
  | string
  | number
  | TPreset;

interface NormalizeSpacingOptions<TValue, TPreset extends string = SizePreset> {
  /** The value to normalize */
  value?: SpacingValue<TPreset>;
  /** Preset mappings for semantic values */
  presets: Record<TPreset, TValue>;
  /** Default value if normalization fails */
  defaultValue: TValue;
  /** Whether to return undefined for invalid values instead of defaultValue */
  allowUndefined?: boolean;
}

export function normalizeSpacing<TValue, TPreset extends string = SizePreset>(
  options: NormalizeSpacingOptions<TValue, TPreset>
): TValue | undefined {
  const { value, presets, defaultValue, allowUndefined = false } = options;

  // Handle undefined/null values
  if (value === undefined || value === null) {
    return allowUndefined ? undefined : defaultValue;
  }

  // Handle preset strings
  if (typeof value === "string" && value in presets) {
    return presets[value as TPreset];
  }

  // Handle numeric values (for number-based presets)
  if (typeof defaultValue === "number") {
    const numValue = typeof value === "string" ? parseInt(value, 10) : value;
    if (typeof numValue === "number" && !isNaN(numValue)) {
      return numValue as TValue;
    }
  }

  // Handle string values (for string-based presets like sizes)
  if (typeof defaultValue === "string" && typeof value !== "object") {
    return value as TValue;
  }

  // Fallback to default value or undefined
  return allowUndefined ? undefined : defaultValue;
}

/**
 * Normalizes numeric values (without preset support)
 * Used for properties like column counts that should only accept numbers
 */
export function normalizeNumber(
  value?: string | number,
  allowUndefined = true
): number | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  const numValue = typeof value === "string" ? parseInt(value, 10) : value;
  return (
    isNaN(numValue) ?
      allowUndefined ? undefined
      : undefined
    : numValue
  );
}
