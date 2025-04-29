const config = require("../config");
const { exchanges, fetchOHLCV, createOrder, fetchBalance, fetchTicker } = require("./exchangeService"); // Added fetchBalance, createOrder, fetchTicker
const { calculateIndicators } = require("./indicatorService");
const notificationService = require("./notificationService");
const logService = require("./logService");

// Placeholder for managing open trades state
// Structure: { exchangeId: { symbol: { id, side, amount, entryPrice, stopLoss, takeProfit } } }
const openTrades = {
  binance: {},
  mexc: {},
};

// --- Helper Function: Calculate Position Size ---
async function calculatePositionSize(exchangeId, symbol, riskAmount, stopLossPrice) {
  try {
    const ticker = await fetchTicker(exchangeId, symbol);
    if (!ticker || !ticker.last) {
      console.error(`Could not fetch ticker for ${symbol} on ${exchangeId} to calculate position size.`);
      return null;
    }
    const entryPrice = ticker.last;
    const priceDifference = Math.abs(entryPrice - stopLossPrice);
    if (priceDifference === 0) {
        console.warn(`Stop loss price is the same as entry price for ${symbol}. Cannot calculate position size.`);
        return null;
    }
    // Size in base currency (e.g., BTC in BTC/USDT)
    const positionSize = riskAmount / priceDifference;
    // TODO: Consider minimum order size and step size for the specific symbol/exchange
    console.log(`Calculated position size for ${symbol}: ${positionSize} (Risk: ${riskAmount}, Entry: ${entryPrice}, SL: ${stopLossPrice})`);
    return positionSize;
  } catch (error) {
    console.error(`Error calculating position size for ${symbol} on ${exchangeId}:`, error);
    return null;
  }
}

// --- Helper Function: Check and Manage Open Trades (SL/TP) ---
async function checkManageOpenTrades(exchangeId, symbol, currentPrice) {
    if (openTrades[exchangeId] && openTrades[exchangeId][symbol]) {
        const trade = openTrades[exchangeId][symbol];
        let closed = false;

        // Check Stop Loss
        if (trade.side === 'buy' && currentPrice <= trade.stopLoss) {
            console.log(`STOP LOSS hit for ${symbol} on ${exchangeId} at ${currentPrice}`);
            // TODO: Place Market SELL order to close position
            // const closeOrder = await createOrder(exchangeId, symbol, 'market', 'sell', trade.amount);
            // if (closeOrder) {
            //     notificationService.sendNotification(`STOP LOSS hit and closed ${trade.amount} ${symbol} on ${exchangeId} at ~${currentPrice}`);
            //     logService.logTrade(exchangeId, symbol, 'sell', trade.amount, currentPrice, trade.entryPrice, 'stop_loss');
            //     closed = true;
            // }
        } else if (trade.side === 'sell' && currentPrice >= trade.stopLoss) {
            // Similar logic for short positions if implemented
        }

        // Check Take Profit
        if (!closed && trade.side === 'buy' && currentPrice >= trade.takeProfit) {
            console.log(`TAKE PROFIT hit for ${symbol} on ${exchangeId} at ${currentPrice}`);
            // TODO: Place Market SELL order to close position
            // const closeOrder = await createOrder(exchangeId, symbol, 'market', 'sell', trade.amount);
            // if (closeOrder) {
            //     notificationService.sendNotification(`TAKE PROFIT hit and closed ${trade.amount} ${symbol} on ${exchangeId} at ~${currentPrice}`);
            //     logService.logTrade(exchangeId, symbol, 'sell', trade.amount, currentPrice, trade.entryPrice, 'take_profit');
            //     closed = true;
            // }
        } else if (!closed && trade.side === 'sell' && currentPrice <= trade.takeProfit) {
             // Similar logic for short positions if implemented
        }

        if (closed) {
            delete openTrades[exchangeId][symbol]; // Remove from open trades
        }
    }
}


async function checkTradingConditions(exchangeId, symbol) {
  console.log(`Checking conditions for ${symbol} on ${exchangeId}...`);

  // Check if already holding a position for this symbol on this exchange
  if (openTrades[exchangeId] && openTrades[exchangeId][symbol]) {
    console.log(`Already holding a position for ${symbol} on ${exchangeId}. Checking SL/TP.`);
    const ticker = await fetchTicker(exchangeId, symbol);
    if (ticker && ticker.last) {
        await checkManageOpenTrades(exchangeId, symbol, ticker.last);
    }
    return; // Don't check for new entry signals if already holding
  }

  // Check max open trades limit
  const currentOpenTradesCount = Object.keys(openTrades[exchangeId] || {}).length;
  if (currentOpenTradesCount >= config.trading.maxOpenTradesPerExchange) {
    console.log(`Max open trades (${config.trading.maxOpenTradesPerExchange}) reached for ${exchangeId}. Skipping new entry check for ${symbol}.`);
    return;
  }

  const ohlcv = await fetchOHLCV(exchangeId, symbol, config.trading.candleInterval, undefined, 100); // Fetch last 100 candles
  if (!ohlcv || ohlcv.length < config.trading.emaLongPeriod) {
    console.log(`Insufficient data for ${symbol} on ${exchangeId}.`);
    return;
  }

  const indicators = calculateIndicators(ohlcv);
  if (!indicators) {
    console.log(`Could not calculate indicators for ${symbol} on ${exchangeId}.`);
    return;
  }

  const { rsi, macd, emaShort, emaLong, volume, averageVolume, currentPrice } = indicators; // Assuming currentPrice is last close

  // --- Check Buy Conditions ---
  const isRsiOversold = rsi !== null && rsi < 30;
  const isEmaBullishCross = emaShort !== null && emaLong !== null && emaShort > emaLong; // Simplified check
  const isMacdBullish = macd !== null && macd.MACD > macd.signal; // Simplified check
  const isVolumeHigh = volume !== null && averageVolume !== null && volume > averageVolume;

  if (isRsiOversold && isEmaBullishCross && isMacdBullish && isVolumeHigh) {
    console.log(`BUY signal detected for ${symbol} on ${exchangeId}`);

    // --- Risk Management Checks ---
    try {
      const balance = await fetchBalance(exchangeId); // Fetch quote currency balance (e.g., USDT)
      const quoteCurrency = symbol.split('/')[1];
      const availableBalance = balance && balance[quoteCurrency] ? balance[quoteCurrency].free : 0;

      if (availableBalance <= 0) {
        console.log(`Insufficient balance (${quoteCurrency}) on ${exchangeId} to place trade.`);
        return;
      }

      const riskAmount = availableBalance * config.trading.riskPerTrade;
      const stopLossPrice = currentPrice * (1 - config.trading.stopLossPercentage);
      const takeProfitPrice = currentPrice * (1 + config.trading.takeProfitPercentage);

      const positionSize = await calculatePositionSize(exchangeId, symbol, riskAmount, stopLossPrice);

      if (positionSize && positionSize > 0) {
        console.log(`Attempting to place BUY order for ${positionSize} ${symbol.split('/')[0]} at ~${currentPrice}`);

        // TODO: Check liquidity/spread before placing order
        // TODO: Check for recent duplicate trades

        // Place the order
        // const order = await createOrder(exchangeId, symbol, 'market', 'buy', positionSize, { /* Add SL/TP if supported */ });
        const order = { id: Date.now(), symbol: symbol, side: 'buy', amount: positionSize, price: currentPrice }; // Placeholder

        if (order) {
          console.log(`BUY order placed successfully for ${symbol} (ID: ${order.id})`);
          // Update openTrades state
          openTrades[exchangeId][symbol] = {
            id: order.id,
            side: 'buy',
            amount: order.amount,
            entryPrice: order.price, // Use actual fill price if available from order response
            stopLoss: stopLossPrice,
            takeProfit: takeProfitPrice,
          };
          notificationService.sendNotification(`Placed BUY order: ${order.amount} ${symbol} on ${exchangeId} at ~${order.price}`);
          logService.logTrade(exchangeId, symbol, 'buy', order.amount, order.price, null, 'entry');
        }
      } else {
        console.log(`Could not calculate valid position size for ${symbol}.`);
      }
    } catch (error) {
      console.error(`Error during risk management or order placement for ${symbol}:`, error);
    }
    return; // Exit after attempting trade for this symbol
  }

  // --- Check Sell Conditions (for closing existing positions - handled by checkManageOpenTrades) ---
  // Sell signal logic (for shorting) could be added here if needed, similar to BUY logic.

}

async function runTradingCycle() {
  console.log("Starting trading cycle...");
  for (const exchangeId in exchanges) {
    if (!exchanges[exchangeId]) {
        console.warn(`Exchange ${exchangeId} not initialized or keys missing. Skipping.`);
        continue;
    }
    console.log(`Processing exchange: ${exchangeId}`);
    // TODO: Fetch high volume markets dynamically
    const symbolsToTrade = ["BTC/USDT", "ETH/USDT"]; // Example symbols

    for (const symbol of symbolsToTrade) {
      try {
        // First, check and manage any existing open trade for the symbol
        const ticker = await fetchTicker(exchangeId, symbol);
        if (ticker && ticker.last) {
            await checkManageOpenTrades(exchangeId, symbol, ticker.last);
        }

        // Then, check for new entry conditions if no position is open
        await checkTradingConditions(exchangeId, symbol);

      } catch (error) {
        console.error(`Error processing ${symbol} on ${exchangeId}:`, error);
        // Consider adding more robust error handling, e.g., blacklist symbol temporarily
      }
    }
  }
  console.log("Trading cycle finished.");
}

module.exports = {
  runTradingCycle,
};

