const TelegramBot = require("node-telegram-bot-api");
const config = require("../config");

let bot;

function initializeTelegramBot() {
  if (config.telegram.token && config.telegram.chatId) {
    try {
      bot = new TelegramBot(config.telegram.token /*, { polling: false } // We don't need polling for sending messages */);
      console.log("Telegram bot initialized.");
    } catch (error) {
      console.error("Failed to initialize Telegram bot:", error.message);
      bot = null;
    }
  } else {
    console.warn("Telegram bot token or chat ID not configured. Notifications disabled.");
    bot = null;
  }
}

async function sendTelegramNotification(message) {
  if (!bot || !config.telegram.chatId) {
    // console.log("Telegram notification (disabled):", message); // Log if needed
    return;
  }

  try {
    await bot.sendMessage(config.telegram.chatId, message, { parse_mode: "Markdown" });
    // console.log("Telegram notification sent.");
  } catch (error) {
    console.error(`Failed to send Telegram notification: ${error.message}`);
    // Consider more robust error handling or retries if necessary
  }
}

module.exports = {
  initializeTelegramBot,
  sendTelegramNotification,
};

