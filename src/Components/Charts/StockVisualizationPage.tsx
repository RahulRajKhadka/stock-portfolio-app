import { useState } from "react";
import { Box, MenuItem, Select, Typography, CircularProgress } from "@mui/material";
import { useStockPerformanceData } from "../../hooks/useStockPerformanceData";
import { ChartCard } from "./ChartCard";
import { StockPriceLineChart } from "./StockPriceLineChart";
import { StockVolumeColumnChart } from "./StockVolumeColumnChart";


const AVAILABLE_TICKER_SYMBOLS = ["AAPL", "TSLA", "MSFT"];

export const StockVisualizationPage = () => {
  const [selectedTickerSymbol, setSelectedTickerSymbol] = useState("AAPL");
  const { data: stockPerformanceData, isLoading, isError } =
    useStockPerformanceData(selectedTickerSymbol);

  const dateRangeLabel = stockPerformanceData
    ? `${stockPerformanceData.priceHistory[0].timestamp} - ${
        stockPerformanceData.priceHistory[stockPerformanceData.priceHistory.length - 1].timestamp
      }`
    : undefined;

  const lowestVolumeDay = stockPerformanceData
    ? stockPerformanceData.volumeHistory.reduce((lowest, current) =>
        current.volumeTraded < lowest.volumeTraded ? current : lowest
      )
    : null;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Stock performance
      </Typography>

      <Select
        value={selectedTickerSymbol}
        onChange={(event) => setSelectedTickerSymbol(event.target.value)}
        sx={{ marginBottom: 3, minWidth: 160 }}
      >
        {AVAILABLE_TICKER_SYMBOLS.map((tickerSymbol) => (
          <MenuItem key={tickerSymbol} value={tickerSymbol}>
            {tickerSymbol}
          </MenuItem>
        ))}
      </Select>

      {isLoading && <CircularProgress />}
      {isError && <Typography color="error">Failed to load stock data.</Typography>}

      {stockPerformanceData && (
        <>
          <ChartCard
            title={`${stockPerformanceData.stockInfo.companyName} — price trend`}
            dateRangeLabel={dateRangeLabel}
            legendItems={[{ color: "#1976d2", label: "Price (USD)" }]}
          >
            <StockPriceLineChart priceHistory={stockPerformanceData.priceHistory} />
          </ChartCard>

          <ChartCard
            title="Volume traded"
            dateRangeLabel={dateRangeLabel}
            legendItems={[
              { color: "#43a047", label: "Higher volume" },
              { color: "#e53935", label: "Lower volume" },
            ]}
            footnote={
              lowestVolumeDay
                ? `${lowestVolumeDay.timestamp} had a lower trading volume compared to other days.`
                : undefined
            }
          >
            <StockVolumeColumnChart volumeHistory={stockPerformanceData.volumeHistory} />
          </ChartCard>
        </>
      )}
    </Box>
  );
};