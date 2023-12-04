"use client";
import * as React from "react";
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  FilterFn
} from "@tanstack/react-table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { downloadToExcel } from "@/lib/xlsx";
import Pagination from "./Pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data: initialData,
}: DataTableProps<TData, TValue>) {
  const [tableData, setTableData] = React.useState<TData[]>(initialData);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [query, setQuery] = React.useState('');
  const typedColumns: ColumnDef<TData, TValue>[] = React.useMemo(
    () => columns as ColumnDef<TData, TValue>[],
    [columns]
  );
  
  const table = useReactTable({
    data: tableData,
    columns:typedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setQuery,
    state: {
      columnFilters,
      rowSelection,
      globalFilter: query
    },
    meta: {
      removeRow: (rowIndex: number) => {
        setTableData((prev) =>
          prev.filter((row, index) => index !== rowIndex)
        );
      },
      updateData: (rowIndex: number, columnId: string, value: any) => {
        setTableData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        );
      },
    }
  });

  const removeSelectedRows = (selectedRows: number[]) => {
    setTableData((prev) =>
      prev.filter((row, index) => !selectedRows.includes(index))
    )
  };

  const handleClick = ()=> {
    removeSelectedRows(table.getSelectedRowModel().rows.map(row => row.index));
    table.resetRowSelection();
  }

  const [loading, setLoading] = React.useState(false);
  const handleExportExcel = async () => {
    setLoading(true);
    // @ts-ignore
    downloadToExcel(tableData, "userData", "userData")
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    toast({ description: 'Table exported successfully.' });
  };

  const { toast } = useToast()
  return (
    <div className="w-full">
      <div className="flex items-center justify-between  py-4">
        <div className="flex items-center w-2/4 gap-x-4">
          <Input
            placeholder="Filter names..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <TooltipProvider>
            <Tooltip>
            <TooltipTrigger >
              <Button 
                variant="outline"
                className="border-dashed" 
                onClick={handleExportExcel}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <PlusCircledIcon  />
                )}
              </Button>
            </TooltipTrigger>
              <TooltipContent>
                <p>Export to excel</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button variant="outline" size="icon" onClick={handleClick}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table} />
    </div>
  );
}
