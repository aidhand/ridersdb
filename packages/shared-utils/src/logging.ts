/**
 * Logger utility for consistent logging across the monorepo
 */
export class Logger {
  private readonly prefix: string;
  private readonly isDebugEnabled: boolean;

  constructor(prefix = "App", debug = false) {
    this.prefix = prefix;
    this.isDebugEnabled = debug || process.env.NODE_ENV === "development";
  }

  info(message: string, ...args: unknown[]): void {
    console.log(`[${this.prefix}] INFO:`, message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(`[${this.prefix}] WARN:`, message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    console.error(`[${this.prefix}] ERROR:`, message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.isDebugEnabled) {
      console.debug(`[${this.prefix}] DEBUG:`, message, ...args);
    }
  }

  success(message: string, ...args: unknown[]): void {
    console.log(`[${this.prefix}] SUCCESS:`, message, ...args);
  }

  /**
   * Creates a child logger with a sub-prefix
   */
  child(subPrefix: string): Logger {
    return new Logger(`${this.prefix}:${subPrefix}`, this.isDebugEnabled);
  }
}

/**
 * Default logger instance
 */
export const logger = new Logger();

/**
 * Creates a logger for a specific module
 */
export function createLogger(prefix: string, debug?: boolean): Logger {
  return new Logger(prefix, debug);
}

/**
 * Performance timing utility
 */
export class Timer {
  private start: number;
  private logger: Logger;

  constructor(logger?: Logger) {
    this.start = Date.now();
    this.logger = logger || new Logger("Timer");
  }

  /**
   * Marks the end of timing and logs the duration
   */
  end(message = "Operation completed"): number {
    const duration = Date.now() - this.start;
    this.logger.info(`${message} (${duration}ms)`);
    return duration;
  }

  /**
   * Gets the elapsed time without ending the timer
   */
  elapsed(): number {
    return Date.now() - this.start;
  }
}

/**
 * Creates a timer that automatically logs completion
 */
export function createTimer(message: string, logger?: Logger): Timer {
  const timer = new Timer(logger);
  return timer;
}
