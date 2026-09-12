import type { PortfolioStockItem } from "../types/portfolio.types";

export const calculateGainLossPercentage = (item: PortfolioStockItem): number => {
  return ((item.currentPrice - item.purchasePrice) / item.purchasePrice) * 100;
};

export const getTickerAvatarColor = (tickerSymbol: string): { background: string; color: string } => {
  const useBlueScheme = tickerSymbol.charCodeAt(0) % 2 === 0;
  return useBlueScheme
    ? { background: "#e3f2fd", color: "#1976d2" }
    : { background: "#f3e5f5", color: "#7b1fa2" };
};