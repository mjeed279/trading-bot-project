const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../../logs/trading_activity.csv");

// Ensure logs directory exists
const logDir = path.dirname(logFilePath);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Write header if file is new
if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, "Timestamp,Exchange,Symbol,Action,Price,Amount,Status,Notes\n");
}

function logTradeActivity(exchange, symbol, action, price, amount, status, notes = "") {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp},${exchange},${symbol},${action},${price !== null ? price : ''},${amount !== null ? amount : ''},${status},"${notes}"\n`;

  try {
    fs.appendFileSync(logFilePath, logEntry);
  } catch (error) {
    console.error("Failed to write to log file:", error);
  }
}

module.exports = {
  logTradeActivity,
};

