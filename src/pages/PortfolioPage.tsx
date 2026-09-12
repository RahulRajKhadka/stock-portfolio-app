import { Box, Typography } from "@mui/material";
import { PortfolioTable } from "../components/portfolio/PortfolioTable";

export const PortfolioPage = () => {
  return (
    <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
      <Typography variant="h5" gutterBottom>
        My portfolio
      </Typography>
      <PortfolioTable />
    </Box>
  );
};