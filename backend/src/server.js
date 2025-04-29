require("dotenv").config();
const express = require("express");
const cron = require("node-cron");
const config = require("./config");
const { initializeExchanges } = require("./services/exchangeService");
const { runTradingCycle } = require("./services/tradingService");
const { initializeTelegramBot } = require("./services/notificationService");

const app = express();
const port = config.server.port;

app.use(express.json());

// Basic route for testing
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Backend is running" });
});

// TODO: Add routes for frontend interaction (e.g., get status, settings, history, balances, orders)

// Initialize services when the server starts
initializeExchanges();
initializeTelegramBot();

// Schedule the trading cycle to run periodically (e.g., every 5 minutes)
// Adjust the cron schedule as needed. '*/5 * * * *' runs every 5 minutes.
// For 1-minute intervals, use '* * * * *'.
cron.schedule("*/5 * * * *", () => {
  console.log("Running scheduled trading cycle...");
  runTradingCycle().catch(error => {
    console.error("Error during scheduled trading cycle:", error);
  });
});

console.log(`Trading cycle scheduled to run every 5 minutes.`);

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});

