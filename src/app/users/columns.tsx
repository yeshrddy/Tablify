"use client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash } from "lucide-react";
import Edit from "./Popover";

export type User = {
  name: string;
  email: string;
  role: string;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: Edit,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({row, table}) => {
      // @ts-ignore
      const { removeRow } = table.options.meta;
      return (
        <Button 
          variant="outline" 
          size="icon"
          onClick={()=> {
            removeRow(row.index);
          }}
          >
          <Trash className="h-4 w-4" />
        </Button>
      )
    }
  }
];

