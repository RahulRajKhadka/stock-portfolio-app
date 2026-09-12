import { z } from "zod";

export const stockSchema = z.object({
  tickerSymbol: z
    .string()
    .min(1, "Ticker is required")
    .toUpperCase(),
  companyName: z.string().min(1, "Company name is required"),
  quantity: z.coerce.number().positive("Quantity must be greater than 0"),
  purchasePrice: z.coerce.number().positive("Purchase price must be greater than 0"),
  purchaseDate: z.string().min(1, "Purchase date is required"),
});

export type StockFormInput = z.input<typeof stockSchema>;
export type StockFormOutput = z.output<typeof stockSchema>;