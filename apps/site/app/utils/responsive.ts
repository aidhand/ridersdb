/**
 * Shared utility functions for responsive component props
 * Used by Grid, List, and other components that support breakpoint-specific values
 */

/**
 * Generic function to extract breakpoint values from responsive props
 * Handles both simple values and objects with breakpoint-specific values
 */
export const extractBreakpointValues = <T>(
  prop: T | { default: T; xs?: T; sm?: T; md?: T; lg?: T; xl?: T }
) => {
  if (typeof prop === "object" && prop !== null && "default" in prop) {
    return {
      default: prop.default,
      xs: prop.xs,
      sm: prop.sm,
      md: prop.md,
      lg: prop.lg,
      xl: prop.xl,
    };
  }
  return {
    default: prop as T,
    xs: undefined,
    sm: undefined,
    md: undefined,
    lg: undefined,
    xl: undefined,
  };
};

/**
 * Generic function to generate responsive classes
 * Takes breakpoint values and generates CSS classes with appropriate breakpoint prefixes
 */
export const generateResponsiveClasses = (
  values: Record<string, unknown>,
  normalizer: (value: unknown) => string | undefined,
  classPrefix: string
) => {
  const breakpoints = ["default", "xs", "sm", "md", "lg", "xl"] as const;
  const classes: string[] = [];

  breakpoints.forEach((breakpoint) => {
    const value = values[breakpoint];
    const normalizedValue = normalizer(value);

    if (normalizedValue) {
      if (breakpoint === "default") {
        classes.push(
          classPrefix.includes("{value}") ?
            classPrefix.replace("{value}", normalizedValue)
          : normalizedValue
        );
      } else {
        classes.push(
          classPrefix.includes("{value}") ?
            `${breakpoint}:${classPrefix.replace("{value}", normalizedValue)}`
          : `${breakpoint}:${normalizedValue}`
        );
      }
    }
  });

  return classes;
};

/**
 * Type definition for responsive props
 * Can be used with any value type T
 */
export type ResponsiveProp<T> =
  | T
  | {
      default: T;
      xs?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
    };
