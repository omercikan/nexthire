import { createLogger, format, transports } from "winston";
const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
  format: combine(
    timestamp({ format: "DD MMMM YYYY - HH:mm:ss" }),
    prettyPrint()
  ),
  transports: [
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log", level: "info" }),
  ],
});

export default logger;
