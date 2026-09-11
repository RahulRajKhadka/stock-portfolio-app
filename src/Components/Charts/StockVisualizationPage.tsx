import { useState } from "react";
import { Box, MenuItem, Select, Typography, CircularProgress } from "@mui/material";
import { useStockPerformanceData } from "../../hooks/useStockPerformanceData";
import { ChartCard } from "./ChartCard";
import { StockPriceLineChart } from "./StockPriceLineChart";
import { StockVolumeColumnChart } from "./StockVolumeColumnChart";
;

const AVAILABLE_TICKER_SYMBOLS = ["AAPL", "TSLA", "MSFT"];

export const StockVisualizationPage = () => {
  const [selectedTickerSymbol, setSelectedTickerSymbol] = useState("AAPL");
  const { data: stockPerformanceData, isLoading, isError } =
    useStockPerformanceData(selectedTickerSymbol);

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
          <ChartCard title={`${stockPerformanceData.stockInfo.companyName} — price trend`}>
            <StockPriceLineChart priceHistory={stockPerformanceData.priceHistory} />
          </ChartCard>
          <ChartCard title="Volume traded">
            <StockVolumeColumnChart volumeHistory={stockPerformanceData.volumeHistory} />
          </ChartCard>
        </>
      )}
    </Box>
  );
};