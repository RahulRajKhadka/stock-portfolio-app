import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StockVisualizationPage } from "./Components/Charts/StockVisualizationPage";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StockVisualizationPage />
    </QueryClientProvider>
  );
}

export default App;