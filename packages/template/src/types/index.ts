// Re-export shared types for convenience
export * from "@repo/shared-types";

// Local template-specific types
export interface TemplateConfig {
  name?: string;
  debug?: boolean;
  timeout?: number;
}

export interface TemplateOptions {
  strict?: boolean;
  metadata?: Record<string, unknown>;
}

export interface TemplateResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

export type TemplateEventHandler<T = unknown> = (
  event: T
) => void | Promise<void>;
