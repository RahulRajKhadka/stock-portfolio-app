import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Stack } from "@mui/material";
import { usePortfolioStore } from "../../store/portfolioStore";
import { stockSchema, type StockFormInput, type StockFormOutput } from "../../schemas/stockSchema";

interface AddStockFormProps {
  onSuccess?: () => void;
}

export const AddStockForm = ({ onSuccess }: AddStockFormProps) => {
  const addStock = usePortfolioStore((state) => state.addStock);
const {
  control,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<StockFormInput, unknown, StockFormOutput>({
  resolver: zodResolver(stockSchema),
  defaultValues: {
    tickerSymbol: "",
    companyName: "",
    quantity: 0,
    purchasePrice: 0,
    purchaseDate: "",
  },
});

  const onSubmit = (formValues: StockFormOutput) => {
    addStock({
      tickerSymbol: formValues.tickerSymbol,
      companyName: formValues.companyName,
      quantity: formValues.quantity,
      purchasePrice: formValues.purchasePrice,
      currentPrice: formValues.purchasePrice,
      purchaseDate: formValues.purchaseDate,
    });
    reset();
    onSuccess?.();
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400 }}>
      <Controller
        name="tickerSymbol"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Ticker Symbol" error={!!errors.tickerSymbol} helperText={errors.tickerSymbol?.message} />
        )}
      />
      <Controller
        name="companyName"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Company Name" error={!!errors.companyName} helperText={errors.companyName?.message} />
        )}
      />
      <Controller
        name="quantity"
        control={control}
        render={({ field }) => (
          <TextField {...field} type="number" label="Quantity" error={!!errors.quantity} helperText={errors.quantity?.message} />
        )}
      />
      <Controller
        name="purchasePrice"
        control={control}
        render={({ field }) => (
          <TextField {...field} type="number" label="Purchase Price" error={!!errors.purchasePrice} helperText={errors.purchasePrice?.message} />
        )}
      />
      <Controller
        name="purchaseDate"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            label="Date of Purchase"
            error={!!errors.purchaseDate}
            helperText={errors.purchaseDate?.message}
          />
        )}
      />
      <Button type="submit" variant="contained">
        Add Stock
      </Button>
    </Stack>
  );
};