require("dotenv").config();

const config = {
  binance: {
    apiKey: process.env.BINANCE_API_KEY,
    secret: process.env.BINANCE_API_SECRET,
  },
  mexc: {
    apiKey: process.env.MEXC_API_KEY,
    secret: process.env.MEXC_API_SECRET,
  },
  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },
  server: {
    port: process.env.PORT || 3001, // Default port for backend
  },
  trading: {
    riskPerTrade: 0.01, // Example: 1% risk per trade
    stopLossPercentage: 0.02, // Example: 2%
    takeProfitPercentage: 0.05, // Example: 5%
    maxOpenTradesPerExchange: 3,
    minVolume: 1000000, // Minimum 24h volume in USD
    candleInterval: "5m", // Candlestick interval (e.g., '1m', '5m', '1h')
    rsiPeriod: 14,
    emaShortPeriod: 20,
    emaLongPeriod: 50,
    macdFastPeriod: 12,
    macdSlowPeriod: 26,
    macdSignalPeriod: 9,
  }
};

module.exports = config;

