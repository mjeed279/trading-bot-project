const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../../logs/activity_log.csv");

// Ensure logs directory exists
const logDir = path.dirname(logFilePath);
if (!fs.existsSync(logDir)) {
  try {
    fs.mkdirSync(logDir, { recursive: true });
    console.log(`Created log directory: ${logDir}`);
  } catch (error) {
    console.error(`Failed to create log directory ${logDir}:`, error);
    // Handle error appropriately, maybe disable logging
  }
}

// Define CSV header
const csvHeader = "Timestamp,Type,Exchange,Symbol,Action,Price,Amount,Status,Details\n";

// Write header if file is new or empty
try {
    if (!fs.existsSync(logFilePath) || fs.statSync(logFilePath).size === 0) {
        fs.writeFileSync(logFilePath, csvHeader);
        console.log(`Initialized log file with header: ${logFilePath}`);
    }
} catch (error) {
    console.error(`Failed to initialize log file ${logFilePath}:`, error);
}

// Helper function to format CSV fields (handles commas and quotes)
function formatCsvField(field) {
    if (field === null || typeof field === 'undefined') {
        return '';
    }
    const stringField = String(field);
    // If the field contains a comma, double quote, or newline, enclose it in double quotes
    // and escape existing double quotes by doubling them
    if (stringField.includes(",") || stringField.includes("\"") || stringField.includes("\n")) {
        return `"${stringField.replace(/"/g, "\"\"")}"`;
    }
    return stringField;
}

// Function to append log entries to the CSV file
function appendLog(logData) {
    const timestamp = new Date().toISOString();
    const logEntryArray = [
        timestamp,
        logData.type || '',
        logData.exchange || '',
        logData.symbol || '',
        logData.action || '',
        logData.price !== null && typeof logData.price !== 'undefined' ? logData.price : '',
        logData.amount !== null && typeof logData.amount !== 'undefined' ? logData.amount : '',
        logData.status || '',
        logData.details || '',
    ];

    const logEntryString = logEntryArray.map(formatCsvField).join(",") + "\n";

    try {
        fs.appendFileSync(logFilePath, logEntryString);
    } catch (error) {
        console.error("Failed to write to log file:", error);
        // Consider fallback logging or alerting mechanism
    }
}

// --- Specific Logging Functions ---

function logTrade(exchange, symbol, action, price, amount, status, details = "") {
    appendLog({
        type: "TRADE",
        exchange,
        symbol,
        action, // e.g., 'buy_entry', 'sell_exit', 'sl_hit', 'tp_hit'
        price,
        amount,
        status, // e.g., 'success', 'failed', 'simulated'
        details,
    });
}

function logError(message, errorDetails = "", exchange = null, symbol = null) {
    let detailsString = message;
    if (errorDetails) {
        // Stringify error objects for better logging
        detailsString += ` | Details: ${typeof errorDetails === 'object' ? JSON.stringify(errorDetails) : errorDetails}`;
    }
    appendLog({
        type: "ERROR",
        exchange: exchange || '',
        symbol: symbol || '',
        details: detailsString,
    });
    // Also log to console for immediate visibility
    console.error(`[ERROR] ${detailsString}${exchange ? ` (Exchange: ${exchange})` : ''}${symbol ? ` (Symbol: ${symbol})` : ''}`);
}

function logEvent(message, details = "") {
    appendLog({
        type: "EVENT",
        details: `${message}${details ? ` | ${details}` : ''}`,
    });
    // Also log to console
    console.log(`[EVENT] ${message}${details ? ` | ${details}` : ''}`);
}

module.exports = {
  logTrade,
  logError,
  logEvent,
};

