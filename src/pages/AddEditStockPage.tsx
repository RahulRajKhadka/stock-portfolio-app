import { Box, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { StockForm } from "../components/portfolio/StockForm";



export const AddEditStockPage = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add Stock
      </Typography>

      {showSuccessMessage && (
        <Alert severity="success" sx={{ marginBottom: 2, maxWidth: 400 }}>
          Stock added to your portfolio.
        </Alert>
      )}

      <StockForm
        onSuccess={() => {
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 3000);
        }}
      />
    </Box>
  );
};