import { useState } from "react";
import {
  Box,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useStockPerformanceData } from "../hooks/useStockPerformanceData";
import { ChartCard } from "../components/charts/ChartCard";
import { StockPriceLineChart } from "../components/charts/StockPriceLineChart";
import { StockVolumeColumnChart } from "../components/charts/StockVolumeColumnChart";



const AVAILABLE_TICKER_SYMBOLS = ["AAPL", "TSLA", "MSFT"];

export const StockVisualizationPage = () => {
  const [selectedTickerSymbol, setSelectedTickerSymbol] = useState("AAPL");

  const {
    data: stockPerformanceData,
    isLoading,
    isError,
  } = useStockPerformanceData(selectedTickerSymbol);

  const dateRangeLabel = stockPerformanceData
    ? `${stockPerformanceData.priceHistory[0].timestamp} - ${
        stockPerformanceData.priceHistory[
          stockPerformanceData.priceHistory.length - 1
        ].timestamp
      }`
    : undefined;

  const lowestVolumeDay = stockPerformanceData
    ? stockPerformanceData.volumeHistory.reduce((lowest, current) =>
        current.volumeTraded < lowest.volumeTraded ? current : lowest
      )
    : null;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Stock performance
      </Typography>

      <Select
        value={selectedTickerSymbol}
        onChange={(event) => setSelectedTickerSymbol(event.target.value)}
        sx={{
          marginBottom: 2,
          minWidth: 160,
          borderRadius: 2,
          fontSize:"16px"
        }}
      >
        {AVAILABLE_TICKER_SYMBOLS.map((tickerSymbol) => (
          <MenuItem key={tickerSymbol} value={tickerSymbol} sx={{fontSize:"14px"}}>
            {tickerSymbol}
          </MenuItem>
        ))}
      </Select>

      {isLoading && <CircularProgress />}

      {isError && (
        <Typography color="error">
          Failed to load stock data.
        </Typography>
      )}

      {stockPerformanceData && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <ChartCard
            title={`${stockPerformanceData.stockInfo.companyName} — price trend`}
            dateRangeLabel={dateRangeLabel}
            legendItems={[
              {
                color: "#1976d2",
                label: "Price (USD)",
              },
            ]}
          >
            <StockPriceLineChart
              priceHistory={stockPerformanceData.priceHistory}
            />
          </ChartCard>

          <ChartCard
            title="Volume traded"
            dateRangeLabel={dateRangeLabel}
            legendItems={[
              {
                color: "#43a047",
                label: "Higher volume",
              },
              {
                color: "#e53935",
                label: "Lower volume",
              },
            ]}
            footnote={
              lowestVolumeDay
                ? `${lowestVolumeDay.timestamp} had a lower trading volume compared to other days.`
                : undefined
            }
          >
            <StockVolumeColumnChart
              volumeHistory={stockPerformanceData.volumeHistory}
            />
          </ChartCard>
        </Box>
      )}
    </Box>
  );
};