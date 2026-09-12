import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { usePortfolioStore } from "../../store/portfolioStore";
import type { PortfolioStockItem } from "../../types/portfolio.types";

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
  columnHelper.accessor("purchaseDate", { header: "Purchase date" }),
];

export const PortfolioTable = () => {
  const portfolioItems = usePortfolioStore((state) => state.portfolioItems);

  const table = useReactTable({
    data: portfolioItems,
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