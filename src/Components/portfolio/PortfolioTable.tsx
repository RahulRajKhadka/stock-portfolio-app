import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import type { PortfolioStockItem } from "../../types/portfolio.types";

const dummyPortfolioItems: PortfolioStockItem[] = [
  {
    id: "1",
    tickerSymbol: "AAPL",
    companyName: "Apple Inc.",
    quantity: 10,
    purchasePrice: 150,
    currentPrice: 192,
    purchaseDate: "2025-01-15",
  },
  {
    id: "2",
    tickerSymbol: "TSLA",
    companyName: "Tesla Inc.",
    quantity: 5,
    purchasePrice: 220,
    currentPrice: 250,
    purchaseDate: "2025-03-10",
  },
];

const columnHelper = createColumnHelper<PortfolioStockItem>();

const tableColumns = [
  columnHelper.accessor("tickerSymbol", { header: "Ticker" }),
  columnHelper.accessor("companyName", { header: "Company" }),
  columnHelper.accessor("quantity", { header: "Quantity" }),
  columnHelper.accessor("purchasePrice", {
    header: "Purchase price",
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor("currentPrice", {
    header: "Current price",
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  }),
];

export const PortfolioTable = () => {
  const table = useReactTable({
    data: dummyPortfolioItems,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Paper elevation={0} sx={{ border: "1px solid #eee", borderRadius: 2 }}>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id} sx={{ fontWeight: 600 }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};