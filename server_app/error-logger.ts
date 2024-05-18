import winston, { Logger, format } from "winston";

const { combine, timestamp, label, printf } = format;
// const CATEGORY = "winston custom format";

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `- ${level.toUpperCase()}: ${message} - Timestamp: ${timestamp} `;
});

const logger: Logger = winston.createLogger({
  level: "debug",
  format: combine(timestamp(), customFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
  ],
});

export { logger };
