import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  TextField,
  Button,
  Stack,
  Box,
  Typography,
  InputAdornment,
  Divider,
} from "@mui/material";

import {
  TrendingUp,
  Business,
  Numbers,
  CurrencyRupee,
  CalendarToday,
} from "@mui/icons-material";

import { usePortfolioStore } from "../../store/portfolioStore";

import {
  stockSchema,
  type StockFormInput,
  type StockFormOutput,
} from "../../schemas/stockSchema";

import type { PortfolioStockItem } from "../../types/portfolio.types";

interface StockFormProps {
  existingStock?: PortfolioStockItem;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const StockForm = ({
  existingStock,
  onSuccess,
  onCancel,
}: StockFormProps) => {
  const addStock = usePortfolioStore((state) => state.addStock);
  const updateStock = usePortfolioStore((state) => state.updateStock);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StockFormInput, unknown, StockFormOutput>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      tickerSymbol: existingStock?.tickerSymbol ?? "",
      companyName: existingStock?.companyName ?? "",
      quantity: existingStock?.quantity ?? 0,
      purchasePrice: existingStock?.purchasePrice ?? 0,
      purchaseDate: existingStock?.purchaseDate ?? "",
    },
  });

  const onSubmit = (formValues: StockFormOutput) => {
    if (existingStock) {
      updateStock(existingStock.id, {
        tickerSymbol: formValues.tickerSymbol,
        companyName: formValues.companyName,
        quantity: formValues.quantity,
        purchasePrice: formValues.purchasePrice,
        currentPrice: existingStock.currentPrice,
        purchaseDate: formValues.purchaseDate,
      });
    } else {
      addStock({
        tickerSymbol: formValues.tickerSymbol,
        companyName: formValues.companyName,
        quantity: formValues.quantity,
        purchasePrice: formValues.purchasePrice,
        currentPrice: formValues.purchasePrice,
        purchaseDate: formValues.purchaseDate,
      });

      reset();
    }

    onSuccess?.();
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: "background.paper",
    },

    "& .MuiInputLabel-root": {
      fontWeight: 500,
    },
  };

  return (
    <Stack
      component="form"
      spacing={2.5}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "100%",
      }}
    >
      
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <TrendingUp fontSize="small" />
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          {existingStock ? "Edit Stock" : "Add Stock"}
        </Typography>
      </Box>

      
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            mb: 1.25,
          }}
        >
          Stock Information
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "0.7fr 1.3fr",
            },
            gap: 2,
          }}
        >
          <Controller
            name="tickerSymbol"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                required
                label="Ticker Symbol"
                placeholder="NABIL"
                error={!!errors.tickerSymbol}
                helperText={errors.tickerSymbol?.message}
                sx={inputSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />

          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                required
                label="Company Name"
                placeholder="Nabil Bank"
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
                sx={inputSx}
              />
            )}
          />
        </Box>
      </Box>

      <Divider />

    
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            mb: 1.25,
          }}
        >
          Purchase Details
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: 2,
          }}
        >
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                required
                type="number"
                label="Quantity"
                placeholder="50"
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
                sx={inputSx}
                slotProps={{
                  htmlInput: {
                    min: 1,
                  },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Numbers fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />

          <Controller
            name="purchasePrice"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                required
                type="number"
                label="Purchase Price"
                placeholder="520"
                error={!!errors.purchasePrice}
                helperText={errors.purchasePrice?.message}
                sx={inputSx}
                slotProps={{
                  htmlInput: {
                    min: 0,
                    step: "0.01",
                  },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyRupee fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Box>
      </Box>

      
      <Controller
        name="purchaseDate"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            required
            type="date"
            label="Purchase Date"
            error={!!errors.purchaseDate}
            helperText={errors.purchaseDate?.message}
            sx={inputSx}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday fontSize="small" color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />

      
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          pt: 0.5,
          width: "100%",
          flexDirection: {
            xs: "column-reverse",
            sm: "row",
          },
          justifyContent: {
            xs: "stretch",
            sm: "flex-end",
          },
        }}
      >
        <Button
          type="button"
          variant="outlined"
          onClick={onCancel}
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },
            minWidth: {
              xs: 0,
              sm: 100,
            },
            height: 40,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },
            minWidth: {
              xs: 0,
              sm: 130,
            },
            height: 40,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",

            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          {existingStock ? "Save Changes" : "Add Stock"}
        </Button>
      </Box>
    </Stack>
  );
};