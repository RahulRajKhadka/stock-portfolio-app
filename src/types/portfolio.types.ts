export interface PortfolioStockItem {
  id: string;
  tickerSymbol: string;
  companyName: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
}