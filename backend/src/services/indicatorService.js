const { RSI, MACD, EMA } = require("technicalindicators");
const config = require("../config");

function calculateIndicators(ohlcvData) {
  if (!ohlcvData || ohlcvData.length === 0) {
    return null;
  }

  // Extract closing prices (index 4 in CCXT OHLCV array)
  const closingPrices = ohlcvData.map(candle => candle[4]);

  // Ensure enough data for calculations
  if (closingPrices.length < config.trading.emaLongPeriod) {
      console.warn("Not enough data points for EMA calculations.");
      // Return partial indicators if possible, or null
      return null; // Or handle partially calculated indicators
  }

  const rsiValues = RSI.calculate({
    values: closingPrices,
    period: config.trading.rsiPeriod,
  });

  const macdInput = {
    values: closingPrices,
    fastPeriod: config.trading.macdFastPeriod,
    slowPeriod: config.trading.macdSlowPeriod,
    signalPeriod: config.trading.macdSignalPeriod,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  };
  const macdValues = MACD.calculate(macdInput);

  const emaShortValues = EMA.calculate({
    values: closingPrices,
    period: config.trading.emaShortPeriod,
  });

  const emaLongValues = EMA.calculate({
    values: closingPrices,
    period: config.trading.emaLongPeriod,
  });

  // Get the latest values
  const latestRSI = rsiValues.length > 0 ? rsiValues[rsiValues.length - 1] : null;
  const latestMACD = macdValues.length > 0 ? macdValues[macdValues.length - 1] : null; // Contains MACD, signal, histogram
  const latestEMAShort = emaShortValues.length > 0 ? emaShortValues[emaShortValues.length - 1] : null;
  const latestEMALong = emaLongValues.length > 0 ? emaLongValues[emaLongValues.length - 1] : null;

  // Extract volume data (index 5)
  const volumes = ohlcvData.map(candle => candle[5]);
  const latestVolume = volumes.length > 0 ? volumes[volumes.length - 1] : null;
  // Calculate average volume (e.g., over the same period as the longest EMA)
  const relevantVolumes = volumes.slice(-config.trading.emaLongPeriod);
  const averageVolume = relevantVolumes.reduce((sum, vol) => sum + vol, 0) / relevantVolumes.length;


  return {
    rsi: latestRSI,
    macd: latestMACD, // Note: This is an object { MACD, signal, histogram }
    emaShort: latestEMAShort,
    emaLong: latestEMALong,
    volume: latestVolume,
    averageVolume: averageVolume,
  };
}

module.exports = {
  calculateIndicators,
};

