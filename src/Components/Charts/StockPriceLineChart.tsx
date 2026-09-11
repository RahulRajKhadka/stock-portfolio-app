import {
  LineChart,
  Line,
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
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={priceHistory} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="closingPrice" stroke="#1976d2" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};