const TelegramBot = require("node-telegram-bot-api");
const config = require("../config");

let bot;
let telegramEnabled = false;

function initializeTelegramBot() {
  if (config.telegram.token && config.telegram.chatId) {
    try {
      bot = new TelegramBot(config.telegram.token /*, { polling: false } */);
      telegramEnabled = true;
      console.log("Telegram bot initialized successfully.");
      // Optional: Send a startup message
      // sendTelegramNotification("Trading Bot Started.");
    } catch (error) {
      console.error("Failed to initialize Telegram bot:", error.message);
      bot = null;
      telegramEnabled = false;
    }
  } else {
    console.warn("Telegram bot token or chat ID not configured. Telegram notifications disabled.");
    bot = null;
    telegramEnabled = false;
  }
}

async function sendTelegramNotification(message) {
  if (!telegramEnabled || !bot || !config.telegram.chatId) {
    return; // Silently fail if not enabled
  }

  try {
    // Using MarkdownV2 requires escaping special characters: _ * [ ] ( ) ~ ` > # + - = | { } . !
    // Simpler to use Markdown or HTML if formatting is needed, or just plain text.
    await bot.sendMessage(config.telegram.chatId, message, { parse_mode: "Markdown" });
    // console.log("Telegram notification sent successfully.");
  } catch (error) {
    console.error(`Failed to send Telegram notification: ${error.message}. Message: ${message}`);
    // Check for specific errors, e.g., chat not found, bot blocked
    if (error.response && error.response.body) {
        console.error("Telegram API Error Body:", error.response.body);
    }
    // Consider disabling telegramEnabled temporarily if specific errors occur repeatedly
  }
}

// Unified notification function
async function sendNotification(message) {
  // Currently only supports Telegram, but could be extended for Email, etc.
  if (telegramEnabled) {
    await sendTelegramNotification(message);
  }
  // TODO: Add other notification channels like Email if needed

  // Also log the notification message to console
  console.log(`[NOTIFICATION] ${message}`);
}

module.exports = {
  initializeTelegramBot,
  sendNotification, // Export the unified function
};

