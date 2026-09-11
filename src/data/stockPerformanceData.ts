import type { StockPerformanceData } from "../types/stock.types";

export const mockStockPerformanceData: Record<string, StockPerformanceData> = {
  AAPL: {
    stockInfo: { tickerSymbol: "AAPL", companyName: "Apple Inc." },
    priceHistory: [
      { timestamp: "Mon", closingPrice: 180 },
      { timestamp: "Tue", closingPrice: 184 },
      { timestamp: "Wed", closingPrice: 179 },
      { timestamp: "Thu", closingPrice: 188 },
      { timestamp: "Fri", closingPrice: 192 },
    ],
    volumeHistory: [
      { timestamp: "Mon", volumeTraded: 4200000, isGainDay: true },
      { timestamp: "Tue", volumeTraded: 3800000, isGainDay: true },
      { timestamp: "Wed", volumeTraded: 5100000, isGainDay: false },
      { timestamp: "Thu", volumeTraded: 6300000, isGainDay: true },
      { timestamp: "Fri", volumeTraded: 4700000, isGainDay: true },
    ],
  },
  TSLA: {
    stockInfo: { tickerSymbol: "TSLA", companyName: "Tesla Inc." },
    priceHistory: [
      { timestamp: "Mon", closingPrice: 240 },
      { timestamp: "Tue", closingPrice: 232 },
      { timestamp: "Wed", closingPrice: 245 },
      { timestamp: "Thu", closingPrice: 238 },
      { timestamp: "Fri", closingPrice: 250 },
    ],
    volumeHistory: [
      { timestamp: "Mon", volumeTraded: 9100000, isGainDay: false },
      { timestamp: "Tue", volumeTraded: 8700000, isGainDay: false },
      { timestamp: "Wed", volumeTraded: 9900000, isGainDay: true },
      { timestamp: "Thu", volumeTraded: 8300000, isGainDay: false },
      { timestamp: "Fri", volumeTraded: 10200000, isGainDay: true },
    ],
  },
  MSFT: {
    stockInfo: { tickerSymbol: "MSFT", companyName: "Microsoft Corporation" },
    priceHistory: [
      { timestamp: "Mon", closingPrice: 410 },
      { timestamp: "Tue", closingPrice: 415 },
      { timestamp: "Wed", closingPrice: 408 },
      { timestamp: "Thu", closingPrice: 420 },
      { timestamp: "Fri", closingPrice: 425 },
    ],
    volumeHistory: [
      { timestamp: "Mon", volumeTraded: 3100000, isGainDay: true },
      { timestamp: "Tue", volumeTraded: 2900000, isGainDay: true },
      { timestamp: "Wed", volumeTraded: 3400000, isGainDay: false },
      { timestamp: "Thu", volumeTraded: 3600000, isGainDay: true },
      { timestamp: "Fri", volumeTraded: 3200000, isGainDay: true },
    ],
  },
};