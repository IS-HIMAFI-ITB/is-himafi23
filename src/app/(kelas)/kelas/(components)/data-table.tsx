"use client";

import { Loader2Icon } from "lucide-react";
import moment from "moment";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusIzin } from "@prisma/client";
import {
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fetching?: boolean;
  lastFetchTime?: number;
  mutateIzin?: UseMutationResult<
    Response,
    unknown,
    { id: string; status: StatusIzin },
    unknown
  >;
}

async function getPesertaCount() {
  const res = await fetch(`/api/analytics/peserta`).then((res) => res.json());
  return res as number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  fetching,
  lastFetchTime,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const queryClient = useQueryClient();
  const pesertaCount = useQuery<number, Error>({
    queryKey: ["pesertaCount"],
    queryFn: () => getPesertaCount(),
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="my-8">
      <div className="flex flex-col-reverse gap-x-8 gap-y-2 md:flex-row items-center justify-between w-full">
        <Input
          placeholder="Cari NIM peserta"
          className="w-full md:max-w-sm"
          value={table.getColumn("nim")?.getFilterValue() as string}
          onChange={(e) =>
            table.getColumn("nim")?.setFilterValue(e.target.value)
          }
        />
        <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground w-full">
          {lastFetchTime &&
            `Updated at ${moment(new Date(lastFetchTime)).format(
              `DD/MM/YYYY, HH:mm ${
                moment(new Date(lastFetchTime)).format("Z") === "+07:00"
                  ? "[WIB]"
                  : moment(new Date(lastFetchTime)).format("Z") === "+08:00"
                  ? "[WITA]"
                  : `[GMT] ${moment(new Date(lastFetchTime)).format("Z")}`
              }`
            )}`}{" "}
          {fetching && <Loader2Icon size={12} className="animate-spin" />}
          {
            <Button
              size={"sm"}
              variant={"outline"}
              className="ml-auto"
              onClick={
                () => {
                  queryClient.invalidateQueries({
                    queryKey: ["events"],
                  });
                }
                // queryClient.invalidateQueries({
                //   queryKey: ["tugasSubmission", { id: tugasId }],
                // })
              }
            >
              Refresh
            </Button>
          }
        </div>
      </div>

      {/* Bagian Tabel */}
      <div className="rounded-md">
        <Table>
          {/* Table Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="bg-background" key={header.id}>
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

          {/* Table Body */}
          <TableBody className="bg-background/25 backdrop-blur">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="odd:bg-background/25 even:backdrop-brightness-125 hover:odd:bg-background/30 hover:even:bg-secondary/10"
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

      {/* Bagian bawah tabel */}
      <div className="flex flex-row items-center flex-wrap-reverse justify-between">
        {/* Bagian row x/x selected */}
        <div className="flex-1 text-sm text-muted-foreground items-center">
          {table.getCoreRowModel().rows.length} /{" "}
          {pesertaCount.isLoading && (
            <Loader2Icon className="animate-spin" size={12} />
          )}{" "}
          {pesertaCount.data !== 0 &&
            pesertaCount.data &&
            `${pesertaCount.data - 1} total peserta (${(
              (table.getCoreRowModel().rows.length / (pesertaCount.data - 1)) *
              100
            ).toFixed(2)}%)`}
          .
        </div>

        {/* Bagian pagination */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
