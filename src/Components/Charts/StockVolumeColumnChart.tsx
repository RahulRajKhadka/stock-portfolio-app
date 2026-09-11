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

interface VolumeDataPoint {
  day: string;
  volume: number;
  isGainDay: boolean;
}

const dummyVolumeHistory: VolumeDataPoint[] = [
  { day: "Mon", volume: 4000, isGainDay: true },
  { day: "Tue", volume: 6000, isGainDay: true },
  { day: "Wed", volume: 3000, isGainDay: false },
  { day: "Thu", volume: 8000, isGainDay: true },
  { day: "Fri", volume: 2000, isGainDay: false },
];

export const StockVolumeColumnChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dummyVolumeHistory} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="volume">
          {dummyVolumeHistory.map((dataPoint) => (
            <Cell
              key={dataPoint.day}
              fill={dataPoint.isGainDay ? "#2e7d32" : "#c62828"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};