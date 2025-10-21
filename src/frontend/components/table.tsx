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
import { Badge } from "@/frontend/components/ui/badge";
import { MEDICATION_STATUS_LABEL } from "@/shared/constants";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const Table = () => {
  const router = useRouter();
  const items = [
    {
      id: 1,
      name: "Medication 1",
      dosage: 10,
      frequency: "Daily",
      daysSupply: 30,
    },
    {
      id: 2,
      name: "Medication 2",
      dosage: 10,
      frequency: "Daily",
      daysSupply: 30,
    },
    {
      id: 3,
      name: "Medication 3",
      dosage: 10,
      frequency: "Daily",
      daysSupply: 30,
    },
    {
      id: 4,
      name: "Medication 4",
      dosage: 10,
      frequency: "Daily",
      daysSupply: 30,
    },
  ];

  const handleView = (id: number) => {
    console.log(`Viewing medication ${id}`);
    router.push(`/medications/${id}`);
  };

  return (
    <TableComponent>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Remaining Supply</TableHead>
          <TableHead>Next Refill</TableHead>
          <TableHead>Refill Alert</TableHead>
          <TableHead>Remaining</TableHead>
          <TableHead>Adherence</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>100</TableCell>
            <TableCell>2025-01-01</TableCell>
            <TableCell>
              <Badge
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                variant="destructive"
              >
                {MEDICATION_STATUS_LABEL[0]}
              </Badge>
              <Badge
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                variant="default"
              >
                {MEDICATION_STATUS_LABEL[1]}
              </Badge>
              <Badge
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                variant="secondary"
              >
                {MEDICATION_STATUS_LABEL[2]}
              </Badge>
            </TableCell>
            <TableCell>
              <Progress value={60} /> 60/100
            </TableCell>
            <TableCell className="text-center">60%</TableCell>
            <TableCell className="text-right">
              <Button
                asChild
                variant="outline"
                onClick={() => handleView(items[0].id)}
              >
                <div className="flex items-center gap-2">
                  <IconEye />
                  View
                </div>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableComponent>
  );
};
