/**
 * Logger utility for the MCP Ad Server
 * 
 * Handles logging in a way that's compatible with the MCP protocol by
 * writing to stderr instead of stdout to avoid interfering with JSON communication
 */

/**
 * Log a message to stderr
 * @param message The message to log
 */
export function log(message: string): void {
  process.stderr.write(`${message}\n`);
}

/**
 * Log an error message to stderr
 * @param message The message to log
 * @param error Optional error object
 */
export function error(message: string, error?: unknown): void {
  process.stderr.write(`${message}${error ? `: ${error}` : ''}\n`);
}

/**
 * Log a warning message to stderr
 * @param message The message to log
 */
export function warn(message: string): void {
  process.stderr.write(`${message}\n`);
}

/**
 * Log a debug message to stderr
 * Only logs if NODE_ENV is not 'production'
 * @param message The message to log
 */
export function debug(message: string): void {
  if (process.env.NODE_ENV !== 'production') {
    process.stderr.write(`${message}\n`);
  }
} 