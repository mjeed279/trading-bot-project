require("dotenv").config();
const express = require("express");
const cron = require("node-cron");
const config = require("./config");
const { initializeExchanges, updateApiKeys } = require("./services/exchangeService"); // Import updateApiKeys
const { runTradingCycle } = require("./services/tradingService");
const { initializeTelegramBot } = require("./services/notificationService");
const settingsRoutes = require("./routes/settingsRoutes"); // Import settings routes

const app = express();
const port = config.server.port;

app.use(express.json());

// Basic route for testing
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Backend is running" });
});

// Mount settings routes
app.use("/api/settings", settingsRoutes);

// TODO: Add other routes for frontend interaction (e.g., get status, history, balances, orders)

// Initialize services when the server starts
initializeExchanges();
initializeTelegramBot();

// Schedule the trading cycle to run periodically (e.g., every 5 minutes)
// Adjust the cron schedule as needed. '*' for 1-minute intervals.
cron.schedule(config.trading.cronSchedule || "*/5 * * * *", () => {
  console.log("Running scheduled trading cycle...");
  runTradingCycle().catch(error => {
    console.error("Error during scheduled trading cycle:", error);
  });
});

console.log(`Trading cycle scheduled with cron: ${config.trading.cronSchedule || "*/5 * * * *"}`);

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});

