import { useQuery } from "@tanstack/react-query";
import { fetchStockPerformanceData } from "../service/stockDataService";


export const useStockPerformanceData = (tickerSymbol: string) => {
  return useQuery({
    queryKey: ["stockPerformance", tickerSymbol],
    queryFn: () => fetchStockPerformanceData(tickerSymbol),
  });
};