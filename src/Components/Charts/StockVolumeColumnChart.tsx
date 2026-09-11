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
import type { StockVolumePoint } from "../../types/stock.types";

interface StockVolumeColumnChartProps {
  volumeHistory: StockVolumePoint[];
}

export const StockVolumeColumnChart = ({ volumeHistory }: StockVolumeColumnChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={volumeHistory} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="volumeTraded">
          {volumeHistory.map((dataPoint) => (
            <Cell
              key={dataPoint.timestamp}
              fill={dataPoint.isGainDay ? "#2e7d32" : "#c62828"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};