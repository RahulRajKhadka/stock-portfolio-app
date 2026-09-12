import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  TextField,
  TableSortLabel,
  Card,
  Typography,
  Avatar,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { usePortfolioStore } from "../../store/portfolioStore";

import type { PortfolioStockItem } from "../../types/portfolio.types";
import { StockForm } from "./StockFom";

const columnHelper = createColumnHelper<PortfolioStockItem>();

const calculateGainLossPercentage = (item: PortfolioStockItem): number => {
  return ((item.currentPrice - item.purchasePrice) / item.purchasePrice) * 100;
};

const getTickerAvatarColor = (tickerSymbol: string): { background: string; color: string } => {
  const gainLoss = tickerSymbol.charCodeAt(0) % 2 === 0;
  return gainLoss
    ? { background: "#e3f2fd", color: "#1976d2" }
    : { background: "#f3e5f5", color: "#7b1fa2" };
};

export const PortfolioTable = () => {
  const portfolioItems = usePortfolioStore((state) => state.portfolioItems);
  const deleteStock = usePortfolioStore((state) => state.deleteStock);

  const [stockBeingEdited, setStockBeingEdited] = useState<PortfolioStockItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [tickerFilterText, setTickerFilterText] = useState("");

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const tableColumns = [
    columnHelper.accessor("tickerSymbol", {
      header: "Ticker",
      cell: (info) => {
        const tickerSymbol = info.getValue();
        const avatarColors = getTickerAvatarColor(tickerSymbol);
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontSize: 12,
                fontWeight: 700,
                backgroundColor: avatarColors.background,
                color: avatarColors.color,
              }}
            >
              {tickerSymbol.charAt(0)}
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {tickerSymbol}
            </Typography>
          </Box>
        );
      },
    }),
    columnHelper.accessor("companyName", {
      header: "Company",
      cell: (info) => (
        <Typography variant="body2" color="text.secondary">
          {info.getValue()}
        </Typography>
      ),
    }),
    columnHelper.accessor("quantity", { header: "Qty" }),
    columnHelper.accessor("purchasePrice", {
      header: "Purchase",
      cell: (info) => `$${info.getValue().toFixed(2)}`,
    }),
    columnHelper.accessor("currentPrice", {
      header: "Current",
      cell: (info) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          ${info.getValue().toFixed(2)}
        </Typography>
      ),
    }),
    columnHelper.display({
      id: "gainLoss",
      header: "Gain/Loss",
      cell: (info) => {
        const gainLossPercentage = calculateGainLossPercentage(info.row.original);
        const isGain = gainLossPercentage >= 0;
        return (
          <Chip
            size="small"
            icon={isGain ? <ArrowUpwardIcon sx={{ fontSize: 14 }} /> : <ArrowDownwardIcon sx={{ fontSize: 14 }} />}
            label={`${isGain ? "+" : ""}${gainLossPercentage.toFixed(1)}%`}
            sx={{
              backgroundColor: isGain ? "#e8f5e9" : "#fdecea",
              color: isGain ? "#2e7d32" : "#c62828",
              fontWeight: 600,
              "& .MuiChip-icon": { color: isGain ? "#2e7d32" : "#c62828" },
            }}
          />
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton size="small" onClick={() => setStockBeingEdited(info.row.original)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => deleteStock(info.row.original.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    }),
  ];

  const filteredItems = portfolioItems.filter((item) =>
    item.tickerSymbol.toLowerCase().includes(tickerFilterText.toLowerCase())
  );

  const table = useReactTable({
    data: filteredItems,
    columns: tableColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
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
          onChange={(event) => setTickerFilterText(event.target.value)}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsAddModalOpen(true)}
          sx={{ alignSelf: { xs: "flex-end", sm: "auto" } }}
        >
          Add Stock
        </Button>
      </Box>

      {isMobileScreen ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {filteredItems.map((item) => {
            const gainLossPercentage = calculateGainLossPercentage(item);
            const isGain = gainLossPercentage >= 0;
            const avatarColors = getTickerAvatarColor(item.tickerSymbol);
            return (
              <Card key={item.id} variant="outlined" sx={{ padding: 2, borderRadius: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        fontSize: 14,
                        fontWeight: 700,
                        backgroundColor: avatarColors.background,
                        color: avatarColors.color,
                      }}
                    >
                      {item.tickerSymbol.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                        {item.tickerSymbol}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.companyName}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <IconButton size="small" onClick={() => setStockBeingEdited(item)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => deleteStock(item.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 0.5, marginTop: 1.5 }}>
                  <Typography variant="caption" color="text.secondary">Quantity</Typography>
                  <Typography variant="body2" sx={{ textAlign: "right" }}>{item.quantity}</Typography>

                  <Typography variant="caption" color="text.secondary">Purchase price</Typography>
                  <Typography variant="body2" sx={{ textAlign: "right" }}>${item.purchasePrice.toFixed(2)}</Typography>

                  <Typography variant="caption" color="text.secondary">Current price</Typography>
                  <Typography variant="body2" sx={{ textAlign: "right", fontWeight: 600 }}>${item.currentPrice.toFixed(2)}</Typography>

                  <Typography variant="caption" color="text.secondary">Purchase date</Typography>
                  <Typography variant="body2" sx={{ textAlign: "right" }}>{item.purchaseDate}</Typography>
                </Box>

                <Box sx={{ marginTop: 1.5 }}>
                  <Chip
                    size="small"
                    icon={isGain ? <ArrowUpwardIcon sx={{ fontSize: 14 }} /> : <ArrowDownwardIcon sx={{ fontSize: 14 }} />}
                    label={`${isGain ? "+" : ""}${gainLossPercentage.toFixed(1)}%`}
                    sx={{
                      backgroundColor: isGain ? "#e8f5e9" : "#fdecea",
                      color: isGain ? "#2e7d32" : "#c62828",
                      fontWeight: 600,
                      "& .MuiChip-icon": { color: isGain ? "#2e7d32" : "#c62828" },
                    }}
                  />
                </Box>
              </Card>
            );
          })}
        </Box>
      ) : (
       <TableContainer
  component={Paper}
  elevation={0}
  sx={{ border: "1px solid #eee", borderRadius: 3, width: "100%", overflowX: "auto" }}
>
  <Table sx={{ minWidth: 750 }}>
    <TableHead>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const isSortable = header.column.getCanSort();
            return (
              <TableCell
                key={header.id}
                sx={{ fontWeight: 600, color: "text.secondary", fontSize: 12, textTransform: "uppercase", whiteSpace: "nowrap" }}
              >
                {isSortable ? (
                  <TableSortLabel
                    active={!!header.column.getIsSorted()}
                    direction={header.column.getIsSorted() || "asc"}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableSortLabel>
                ) : (
                  flexRender(header.column.columnDef.header, header.getContext())
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableHead>
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} sx={{ "&:hover": { backgroundColor: "#fafafa" } }}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} sx={{ whiteSpace: "nowrap" }}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
      )}

      <Dialog open={stockBeingEdited !== null} onClose={() => setStockBeingEdited(null)} fullWidth maxWidth="xs">
        <DialogTitle>Edit Stock</DialogTitle>
        <DialogContent>
          {stockBeingEdited && (
            <StockForm
              existingStock={stockBeingEdited}
              onSuccess={() => setStockBeingEdited(null)}
              onCancel={() => setStockBeingEdited(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Add Stock</DialogTitle>
        <DialogContent>
          <StockForm
            onSuccess={() => setIsAddModalOpen(false)}
            onCancel={() => setIsAddModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};