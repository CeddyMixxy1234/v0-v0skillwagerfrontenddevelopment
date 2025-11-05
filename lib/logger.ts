// Production-safe logging utility
type LogLevel = "info" | "warn" | "error" | "debug"

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development"

  private formatMessage(level: LogLevel, message: string, data?: unknown): string {
    const timestamp = new Date().toISOString()
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`
  }

  info(message: string, data?: unknown) {
    if (this.isDevelopment) console.info(this.formatMessage("info", message), data)
  }

  warn(message: string, data?: unknown) {
    console.warn(this.formatMessage("warn", message), data)
  }

  error(message: string, error?: unknown) {
    console.error(this.formatMessage("error", message), error)
  }

  debug(message: string, data?: unknown) {
    if (this.isDevelopment) console.debug(this.formatMessage("debug", message), data)
  }
}

export const logger = new Logger()
