"use client";

import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/frontend/components/ui/table";
import { Progress } from "@/frontend/components/ui/progress";
import { IconEye } from "@tabler/icons-react";
import { Button } from "./ui/button";
import type { UserMedicationResponse } from "@/server/service/user-medication-response";
import { Spinner } from "./ui/spinner";
import { StatusBadge } from "./status-badge";
import dayjs from "dayjs";
import { useSheetMedicationStore } from "../stores/use-sheet-medication-store";
import { DATE_FORMAT } from "@/shared/constants";

type Props = {
  items: UserMedicationResponse[];
  isLoading: boolean;
};

export const Table = (props: Props) => {
  const { items, isLoading } = props;
  const { onOpen } = useSheetMedicationStore();

  return (
    <TableComponent>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Remaining Supply</TableHead>
          <TableHead>Next Refill</TableHead>
          <TableHead>Refill Alert</TableHead>
          <TableHead>Adherence</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              <div className="flex justify-center items-center w-full">
                <Spinner />
              </div>
            </TableCell>
          </TableRow>
        ) : items && items.length > 0 ? (
          items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.medicationName}
              </TableCell>
              <TableCell className="flex flex-col">
                <Progress
                  value={(item.remainingSupply / item.quantityReceived) * 100}
                />
                <span className="text-muted-foreground text-sm">
                  {item.remainingSupply}/{item.quantityReceived}
                </span>
              </TableCell>
              <TableCell>
                {dayjs(item.nextRefill).format(DATE_FORMAT)}
              </TableCell>
              <TableCell>
                <StatusBadge status={item.refillStatus} />
              </TableCell>
              <TableCell className="text-center">{item.adherence}%</TableCell>
              <TableCell className="text-right">
                <Button asChild variant="outline" onClick={() => onOpen(item)}>
                  <div className="flex items-center gap-2">
                    <IconEye />
                    View
                  </div>
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No medications found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </TableComponent>
  );
};
