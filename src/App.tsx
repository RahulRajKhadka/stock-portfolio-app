import { ChartCard } from "./Components/Charts/ChartCard";
import { StockPriceLineChart } from "./Components/Charts/StockPriceLineChart";
import { StockVolumeColumnChart } from "./Components/Charts/StockVolumeColumnChart";


function App() {
  return (
    <>
      <ChartCard title="Price trend">
        <StockPriceLineChart />
      </ChartCard>
      <ChartCard title="Volume">
        <StockVolumeColumnChart />
      </ChartCard>
    </>
  );
}

export default App;