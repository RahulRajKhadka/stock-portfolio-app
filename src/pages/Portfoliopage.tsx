import { Box, Typography } from "@mui/material";
import { PortfolioTable } from "../components/portfolio/PortfolioTable";

export const PortfolioPage = () => {
  return (
    <Box sx={{ paddingY: 3, paddingX: { xs: 2, sm: 4, md: 8 }, maxWidth: "1400px", marginX: "auto" }}>
      <Typography variant="h5" gutterBottom>
        My portfolio
      </Typography>
      <PortfolioTable />
    </Box>
  );
};