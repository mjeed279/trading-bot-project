const ccxt = require("ccxt");
const config = require("../config");

const exchanges = {};

function initializeExchanges() {
  if (config.binance.apiKey && config.binance.secret) {
    exchanges.binance = new ccxt.binance({
      apiKey: config.binance.apiKey,
      secret: config.binance.secret,
      options: { defaultType: "spot" }, // Or 'future' if needed
    });
    console.log("Binance exchange initialized.");
  }

  if (config.mexc.apiKey && config.mexc.secret) {
    exchanges.mexc = new ccxt.mexc({
      apiKey: config.mexc.apiKey,
      secret: config.mexc.secret,
      options: { defaultType: "spot" }, // Or 'future' if needed
    });
    console.log("MEXC exchange initialized.");
  }

  // TODO: Add error handling for initialization
}

async function fetchMarkets(exchangeId) {
  if (!exchanges[exchangeId] || !exchanges[exchangeId].has["fetchMarkets"]) {
    console.error(`Exchange ${exchangeId} not initialized or doesn't support fetchMarkets.`);
    return null;
  }
  try {
    const markets = await exchanges[exchangeId].fetchMarkets();
    return markets;
  } catch (error) {
    console.error(`Error fetching markets from ${exchangeId}:`, error);
    return null;
  }
}

async function fetchOHLCV(exchangeId, symbol, timeframe = config.trading.candleInterval, since = undefined, limit = 100) {
  if (!exchanges[exchangeId] || !exchanges[exchangeId].has["fetchOHLCV"]) {
    console.error(`Exchange ${exchangeId} not initialized or doesn't support fetchOHLCV.`);
    return null;
  }
  try {
    const ohlcv = await exchanges[exchangeId].fetchOHLCV(symbol, timeframe, since, limit);
    // CCXT returns [timestamp, open, high, low, close, volume]
    return ohlcv;
  } catch (error) {
    console.error(`Error fetching OHLCV for ${symbol} from ${exchangeId}:`, error);
    return null;
  }
}

// TODO: Add functions for creating orders, fetching balances, fetching open/closed orders etc.

module.exports = {
  initializeExchanges,
  fetchMarkets,
  fetchOHLCV,
  exchanges, // Exporting the initialized exchanges object might be useful
};

