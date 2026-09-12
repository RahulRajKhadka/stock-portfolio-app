import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  useMediaQuery,
  useTheme,
} from "@mui/material";

import type { StockPricePoint } from "../../types/stock.types";

interface StockPriceLineChartProps {
  priceHistory: StockPricePoint[];
}

export const StockPriceLineChart = ({
  priceHistory,
}: StockPriceLineChartProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 220 : 260}>
      <AreaChart
        data={priceHistory}
        margin={{
          top: 5,
          right: isMobile ? 5 : 20,
          left: isMobile ? 0 : 10,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient
            id="priceFillGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="#1976d2"
              stopOpacity={0.25}
            />
            <stop
              offset="95%"
              stopColor="#1976d2"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="#f0f0f0"
          vertical={false}
        />

        <XAxis
          dataKey="timestamp"
          tickLine={false}
          axisLine={false}
          tick={{
            fontSize: isMobile ? 10 : 12,
          }}
          interval={isMobile ? 1 : 0}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{
            fontSize: isMobile ? 10 : 12,
          }}
          width={isMobile ? 45 : 60}
        />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="closingPrice"
          stroke="#1976d2"
          strokeWidth={2}
          fill="url(#priceFillGradient)"
          dot={{
            r: isMobile ? 2 : 4,
            fill: "#1976d2",
            strokeWidth: 0,
          }}
          activeDot={{
            r: isMobile ? 4 : 6,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};