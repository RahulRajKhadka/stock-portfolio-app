import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  useMediaQuery,
  useTheme,
} from "@mui/material";

import type { StockVolumePoint } from "../../types/stock.types";

interface StockVolumeColumnChartProps {
  volumeHistory: StockVolumePoint[];
}

export const StockVolumeColumnChart = ({
  volumeHistory,
}: StockVolumeColumnChartProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 220 : 260}>
      <BarChart
        data={volumeHistory}
        margin={{
          top: 5,
          right: isMobile ? 5 : 20,
          left: isMobile ? 0 : 20,
          bottom: 5,
        }}
      >
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

        <Bar
          dataKey="volumeTraded"
          radius={[4, 4, 0, 0]}
        >
          {volumeHistory.map((dataPoint) => (
            <Cell
              key={dataPoint.timestamp}
              fill={dataPoint.isGainDay ? "#43a047" : "#e53935"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};