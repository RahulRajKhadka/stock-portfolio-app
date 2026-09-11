import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { StockPricePoint } from "../../types/stock.types";

interface StockPriceLineChartProps {
  priceHistory: StockPricePoint[];
}

export const StockPriceLineChart = ({ priceHistory }: StockPriceLineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={priceHistory} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <defs>
          <linearGradient id="priceFillGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1976d2" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#f0f0f0" vertical={false} />
        <XAxis dataKey="timestamp" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="closingPrice"
          stroke="#1976d2"
          strokeWidth={2}
          fill="url(#priceFillGradient)"
          dot={{ r: 4, fill: "#1976d2", strokeWidth: 0 }}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};