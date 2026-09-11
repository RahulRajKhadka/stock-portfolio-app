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
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={volumeHistory} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
        <CartesianGrid stroke="#f0f0f0" vertical={false} />
        <XAxis dataKey="timestamp" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar dataKey="volumeTraded" radius={[4, 4, 0, 0]}>
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