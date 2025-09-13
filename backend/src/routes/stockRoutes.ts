import { Router } from "express";
import prisma from "../db/prisma";

const stockRoutes = Router();

let stockCache: any[] = [];

// Per-symbol intra-minute OHLC aggregator (not persisted until flush)
type Candle = {
  time: number; // unix seconds at minute start
  open: number;
  high: number;
  low: number;
  close: number;
};
const symbolToCurrentCandle: Record<string, Candle> = {};

// --- Cache utils ---
export async function setCache(): Promise<void> {
  const stocks = await prisma.masterStocks.findMany();
  stockCache = stocks;

  // Initialize candle map based on current prices
  const now = new Date();
  const minuteStartMs = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()).getTime();
  const minuteStartUnix = Math.floor(minuteStartMs / 1000);
  for (const stock of stockCache) {
    const price = stock.currentPrice;
    symbolToCurrentCandle[stock.symbol] = {
      time: minuteStartUnix,
      open: price,
      high: price,
      low: price,
      close: price,
    };
  }
}

// Getter for cached stocks
export function getCache(): any[] {
  return stockCache;
}


// --- Random price fluctuation helper ---
function randomChange(price: number) {
  const changePercent = (Math.random() - 0.5) * 0.04; // ±2%
  return +(price * (1 + changePercent)).toFixed(2);
}

// --- Update stocks in cache (5s tick) ---
async function updateStocks() {
  if (stockCache.length === 0) {
    const stocks = await prisma.masterStocks.findMany();
    await setCache();
    return;
  }

  // Update in-memory prices and aggregate current minute candle
  stockCache = stockCache.map((stock) => {
    const newPrice = randomChange(stock.currentPrice);

    const now = new Date();
    const minuteStartMs = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()).getTime();
    const minuteStartUnix = Math.floor(minuteStartMs / 1000);

    const currentCandle = symbolToCurrentCandle[stock.symbol];
    if (!currentCandle || currentCandle.time !== minuteStartUnix) {
      // roll to new minute candle
      symbolToCurrentCandle[stock.symbol] = {
        time: minuteStartUnix,
        open: currentCandle ? currentCandle.close : stock.currentPrice,
        high: newPrice,
        low: newPrice,
        close: newPrice,
      };
    } else {
      currentCandle.high = Math.max(currentCandle.high, newPrice);
      currentCandle.low = Math.min(currentCandle.low, newPrice);
      currentCandle.close = newPrice;
      symbolToCurrentCandle[stock.symbol] = currentCandle;
    }

    return {
      ...stock,
      currentPrice: newPrice,
    };
  });
}

// --- Flush aggregated candles to DB every minute ---
async function flushToDatabase() {
  if (stockCache.length === 0) return;

  const updates = stockCache.map(async (stock) => {
    const historyArray = Array.isArray(stock.priceHistory) ? stock.priceHistory : [];
    const candle = symbolToCurrentCandle[stock.symbol];
    if (!candle) return;

    // Append last completed minute (use candle already pointing to current minute; that's OK for simple sim)
    const newHistory = [...historyArray, candle];

    await prisma.masterStocks.update({
      where: { symbol: stock.symbol },
      data: {
        currentPrice: stock.currentPrice,
        priceHistory: newHistory as unknown as any,
      },
    });

    // Reflect persisted history in cache to keep frontend charts consistent
    const cacheItem = stockCache.find((s) => s.symbol === stock.symbol);
    if (cacheItem) {
      cacheItem.priceHistory = newHistory;
    }
  });

  await Promise.all(updates);
}

// --- Initialize cache + run market engine ---
updateStocks();
setInterval(updateStocks, 10000);
setInterval(flushToDatabase, 5000);

// --- Routes ---
stockRoutes.get("/allStocks", (req, res) => {
  const { market } = req.query as { market?: string };
  const all = getCache();
  const filtered = market ? all.filter((s) => (s.market || "").toLowerCase() === market.toLowerCase()) : all;
  res.json(filtered);
});

// Admin utility: reset all price histories and reinitialize cache/candles
stockRoutes.post("/admin/reset-stocks", async (req, res) => {
  try {
    await prisma.masterStocks.updateMany({ data: { priceHistory: [] as unknown as any } });
    await setCache();
    return res.json({ ok: true });
  } catch (err) {
    console.error("reset-stocks error", err);
    return res.status(500).json({ ok: false, error: "Failed to reset stocks" });
  }
});

stockRoutes.get("/allStocks/:symbol", (req, res) => {
  const { symbol } = req.params;
  const stock = getCache().find((s) => s.symbol === symbol);
  if (!stock) return res.status(404).json({ message: "Stock not found" });
  res.json(stock);
});

stockRoutes.post("/myHoldings", async (req, res) => {
  const { username } = req.body;
  const userStocks = await prisma.user.findUnique({
    where: { username },
    include: { stocks: true },
  });

  if (!userStocks) {
    return res.json({ message: "User Doesn’t Exist !!!!" });
  }

  return res.json(userStocks);
});

export default stockRoutes;
