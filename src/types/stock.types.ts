export interface StockPricePoint {
  timestamp: string;
  closingPrice: number;
}

export interface StockVolumePoint {
  timestamp: string;
  volumeTraded: number;
  isGainDay: boolean;
}

export interface StockSymbolInfo {
  tickerSymbol: string;
  companyName: string;
}

export interface StockPerformanceData {
  stockInfo: StockSymbolInfo;
  priceHistory: StockPricePoint[];
  volumeHistory: StockVolumePoint[];
}