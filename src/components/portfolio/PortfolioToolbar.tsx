import { Box, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface PortfolioToolbarProps {
  tickerFilterText: string;
  onTickerFilterChange: (value: string) => void;
  onAddStockClick: () => void;
}

export const PortfolioToolbar = ({ tickerFilterText, onTickerFilterChange, onAddStockClick }: PortfolioToolbarProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "stretch", sm: "center" },
        marginBottom: 2,
        gap: 2,
      }}
    >
      <TextField
        size="small"
        label="Filter by ticker"
        value={tickerFilterText}
        onChange={(event) => onTickerFilterChange(event.target.value)}
      />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddStockClick}
        sx={{ alignSelf: { xs: "flex-end", sm: "auto" } }}
      >
        Add Stock
      </Button>
    </Box>
  );
};