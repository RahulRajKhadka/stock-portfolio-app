import { create } from "zustand";
import type { PortfolioStockItem } from "../types/portfolio.types";

interface PortfolioStore {
  portfolioItems: PortfolioStockItem[];
  addStock: (stock: Omit<PortfolioStockItem, "id">) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  portfolioItems: [
    {
      id: "1",
      tickerSymbol: "AAPL",
      companyName: "Apple Inc.",
      quantity: 10,
      purchasePrice: 150,
      currentPrice: 192,
      purchaseDate: "2025-01-15",
    },
    {
      id: "2",
      tickerSymbol: "TSLA",
      companyName: "Tesla Inc.",
      quantity: 5,
      purchasePrice: 220,
      currentPrice: 250,
      purchaseDate: "2025-03-10",
    },
  ],
  addStock: (newStock) =>
    set((state) => ({
      portfolioItems: [
        ...state.portfolioItems,
        { ...newStock, id: crypto.randomUUID() },
      ],
    })),
}));