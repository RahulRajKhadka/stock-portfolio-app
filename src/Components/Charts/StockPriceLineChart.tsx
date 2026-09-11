import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PriceDataPoint {
  day: string;
  price: number;
}

const dummyPriceHistory: PriceDataPoint[] = [
  { day: "Mon", price: 100 },
  { day: "Tue", price: 105 },
  { day: "Wed", price: 102 },
  { day: "Thu", price: 110 },
  { day: "Fri", price: 108 },
  { day: "Sat", price: 115 },
  { day: "Sun", price: 120 },
];

export const StockPriceLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={dummyPriceHistory} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#1976d2" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};