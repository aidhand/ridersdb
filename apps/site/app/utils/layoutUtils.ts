/**
 * Modular layout utilities for CSS Grid and Flexbox
 * Each utility function handles a specific layout concern for better reusability
 */

// =============================================================================
// TYPES
// =============================================================================

export interface ResponsiveColumns {
  "default"?: number;
  "2xs"?: number;
  "xs"?: number;
  "sm"?: number;
  "md"?: number;
  "lg"?: number;
  "xl"?: number;
  "2xl"?: number;
}

export type FlexDirection = "vertical" | "horizontal";
export type FlexAlign = "start" | "center" | "end" | "stretch";
export type FlexJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

// =============================================================================
// CORE UTILITY FUNCTIONS
// =============================================================================

/**
 * Breakpoint configuration for responsive utilities
 */
export const BREAKPOINTS = {
  "default": "",
  "2xs": "2xs:",
  "xs": "xs:",
  "sm": "sm:",
  "md": "md:",
  "lg": "lg:",
  "xl": "xl:",
  "2xl": "2xl:",
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Construct a breakpoint class by combining breakpoint prefix with class name
 * @param breakpoint - The breakpoint key (e.g., 'sm', 'lg', 'xl')
 * @param className - The class name to apply (e.g., 'grid-cols-3', 'hidden')
 * @returns The constructed class string (e.g., 'sm:grid-cols-3', 'lg:hidden')
 *
 * @example
 * ```typescript
 * createBreakpointClass('sm', 'grid-cols-2') // Returns: 'sm:grid-cols-2'
 * createBreakpointClass('default', 'flex') // Returns: 'flex' (no prefix for default)
 * createBreakpointClass('lg', 'hidden') // Returns: 'lg:hidden'
 * ```
 */
export function createBreakpointClass(
  breakpoint: Breakpoint,
  className: string
): string {
  const prefix = BREAKPOINTS[breakpoint];
  return `${prefix}${className}`;
}

/**
 * Generate gap/spacing classes
 */
export function createGapClasses(spacing?: number | string): string[] {
  if (spacing === undefined || spacing === null || spacing === "") {
    return [];
  }
  return [`gap-${spacing}`];
}

/**
 * Generate grid column classes for a single breakpoint
 */
export function createGridColumnClass(cols: number, prefix = ""): string {
  return `${prefix}grid-cols-${cols}`;
}

/**
 * Generate responsive grid column classes
 */
export function createResponsiveGridColumns(cols: ResponsiveColumns): string[] {
  const classes: string[] = [];

  for (const [breakpoint, colsValue] of Object.entries(cols)) {
    if (colsValue !== undefined) {
      const className = `grid-cols-${colsValue}`;
      classes.push(createBreakpointClass(breakpoint as Breakpoint, className));
    }
  }

  return classes;
}

/**
 * Generate flex direction classes
 */
export function createFlexDirectionClass(
  direction?: FlexDirection
): string | null {
  if (!direction) return null;
  return direction === "vertical" ? "flex-col" : "flex-row";
}

/**
 * Generate flex alignment classes
 */
export function createFlexAlignClass(align?: FlexAlign): string | null {
  if (!align || align === "stretch") return null;
  return `items-${align}`;
}

/**
 * Generate flex justification classes
 */
export function createFlexJustifyClass(justify?: FlexJustify): string | null {
  if (!justify || justify === "start") return null;
  return `justify-${justify}`;
}

/**
 * Generate flex wrap classes
 */
export function createFlexWrapClass(wrap?: boolean): string | null {
  return wrap ? "flex-wrap" : null;
}

// =============================================================================
// LAYOUT TYPE UTILITIES
// =============================================================================

/**
 * Generate grid base classes
 */
export function createGridBase(): string[] {
  return ["grid"];
}

/**
 * Generate flex base classes
 */
export function createFlexBase(): string[] {
  return ["flex"];
}

/**
 * Generate all grid column classes (simple or responsive)
 */
export function createGridColumns(cols: number | ResponsiveColumns): string[] {
  if (typeof cols === "number") {
    return [createGridColumnClass(cols)];
  }
  return createResponsiveGridColumns(cols);
}

// =============================================================================
// UTILITY COMBINATION HELPERS
// =============================================================================
