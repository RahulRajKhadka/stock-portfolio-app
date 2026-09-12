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
  Box,
  TableSortLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TickerBadge } from "./TickerBadge";
import { GainLossChip } from "./GainLossChip";

import type { PortfolioStockItem } from "../../types/portfolio.types";
import { calculateGainLossPercentage } from "../../utils/portfolioCalculation";

interface DesktopPortfolioTableProps {
  stocks: PortfolioStockItem[];
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
  onEditClick: (stock: PortfolioStockItem) => void;
  onDeleteClick: (stockId: string) => void;
}

const columnHelper = createColumnHelper<PortfolioStockItem>();

export const DesktopPortfolioTable = ({
  stocks,
  sorting,
  onSortingChange,
  onEditClick,
  onDeleteClick,
}: DesktopPortfolioTableProps) => {
  const tableColumns = [
    columnHelper.accessor("tickerSymbol", {
      header: "Ticker",
      cell: (info) => <TickerBadge tickerSymbol={info.getValue()} />,
    }),
    columnHelper.accessor("companyName", { header: "Company" }),
    columnHelper.accessor("quantity", { header: "Qty" }),
    columnHelper.accessor("purchasePrice", {
      header: "Purchase",
      cell: (info) => `$${info.getValue().toFixed(2)}`,
    }),
    columnHelper.accessor("currentPrice", {
      header: "Current",
      cell: (info) => `$${info.getValue().toFixed(2)}`,
    }),
    columnHelper.display({
      id: "gainLoss",
      header: "Gain/Loss",
      cell: (info) => <GainLossChip gainLossPercentage={calculateGainLossPercentage(info.row.original)} />,
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton size="small" onClick={() => onEditClick(info.row.original)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onDeleteClick(info.row.original.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    }),
  ];

  const table = useReactTable({
    data: stocks,
    columns: tableColumns,
    state: { sorting },
    onSortingChange: (updater) => {
      const newSorting = typeof updater === "function" ? updater(sorting) : updater;
      onSortingChange(newSorting);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #eee", borderRadius: 3, width: "100%", overflowX: "auto" }}>
      <Table sx={{ minWidth: 750 }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSortable = header.column.getCanSort();
                return (
                  <TableCell key={header.id} sx={{ fontWeight: 600, color: "text.secondary", fontSize: 12, textTransform: "uppercase", whiteSpace: "nowrap" }}>
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
  );
};