import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PortfolioStockItem } from "../types/portfolio.types";

interface PortfolioStore {
  portfolioItems: PortfolioStockItem[];
  addStock: (stock: Omit<PortfolioStockItem, "id">) => void;
  updateStock: (id: string, updatedStock: Omit<PortfolioStockItem, "id">) => void;
  deleteStock: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
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
      updateStock: (id, updatedStock) =>
        set((state) => ({
          portfolioItems: state.portfolioItems.map((item) =>
            item.id === id ? { ...updatedStock, id } : item
          ),
        })),
      deleteStock: (id) =>
        set((state) => ({
          portfolioItems: state.portfolioItems.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "stock-portfolio-storage",
    }
  )
);