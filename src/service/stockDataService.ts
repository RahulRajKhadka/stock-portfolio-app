
import { mockStockPerformanceData } from "../data/stockPerformanceData";
import type { StockPerformanceData } from "../types/stock.types";

const SIMULATED_NETWORK_DELAY_MS = 500;

export const fetchStockPerformanceData = async (
  tickerSymbol: string
): Promise<StockPerformanceData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const stockData = mockStockPerformanceData[tickerSymbol];
      if (!stockData) {
        reject(new Error(`No data found for ticker symbol: ${tickerSymbol}`));
        return;
      }
      resolve(stockData);
    }, SIMULATED_NETWORK_DELAY_MS);
  });
};