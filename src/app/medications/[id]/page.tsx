"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/frontend/components/ui/breadcrumb";
import { Calendar } from "@/frontend/components/ui/calendar";
import { useState } from "react";
import { Button } from "@/frontend/components/ui/button";
import { DeleteMedicationAlertDialog } from "@/frontend/components/delete-medication-alert-dialog";
import { useDeleteMedicationAlertStore } from "@/frontend/stores/use-delete-medication-alert-store";
import { useEditMedicationDrawerStore } from "@/frontend/stores/use-edit-medication-drawer-store";
import { DrawerMedicationEdit } from "@/frontend/components/drawer-medication-edit";
import { StatusBadge } from "@/frontend/components/status-badge";
import { toast } from "sonner";
import { Progress } from "@/frontend/components/ui/progress";
import { DtItem } from "@/frontend/components/dt-item";
import { Separator } from "@/frontend/components/ui/separator";

export default function MedicationPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const { setIsOpen: setIsOpenDeleteMedicationAlert } =
    useDeleteMedicationAlertStore();
  const { setIsOpen: setIsOpenEditMedication } = useEditMedicationDrawerStore();

  const onClickDeleteMedication = async () => {
    toast.success("Medication deleted successfully");
    setIsOpenDeleteMedicationAlert(false);
  };

  const onClickEditMedication = async () => {
    toast.success("Medication updated successfully");
    setIsOpenEditMedication(false);
  };

  const onClickTakenDose = async () => {
    toast.success("Taken dose successfully");
  };

  const onClickCancelTakenDose = async () => {
    toast.success("Cancelled taken dose");
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Medications</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Medication Name</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex gap-2">
          <Button
            size="sm"
            className="hidden sm:flex"
            onClick={() => {
              setIsOpenDeleteMedicationAlert(true);
            }}
            variant="destructive"
          >
            Delete Medication
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex"
            onClick={() => {
              setIsOpenEditMedication(true);
            }}
          >
            Edit Medication
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex  items-center gap-4">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            Medication Name
          </h1>

          <StatusBadge status={1} />
        </div>
        <div className="flex flex-col w-1/4">
          <Progress value={100} />
          <span className="text-muted-foreground text-sm">
            Dose/Week: 10/10
          </span>
        </div>
      </div>

      <div className="flex gap-12">
        <dl className="flex flex-col gap-2">
          <DtItem label="Dosage" value="2 tablets daily" />
          <DtItem label="Frequency" value="2 tablets daily" />
          <DtItem label="start date" value="2 tablets daily" />
          <DtItem label="quantity received" value="2 tablets daily" />
          <DtItem label="days’ supply." value="2 tablets daily" />
          <DtItem label="current status" value="2 tablets daily" />
          <DtItem label="calculate refill dates" value="2 tablets daily" />
          <DtItem label="doses remaining" value="2 tablets daily" />
          <DtItem label="medication remaining" value="2 tablets daily" />
        </dl>
        <div className="flex flex-col gap-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
          />
          <Button
            variant="default"
            size="sm"
            className="hidden sm:flex"
            onClick={onClickTakenDose}
          >
            Taken dose
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="hidden sm:flex"
            onClick={onClickCancelTakenDose}
          >
            Cancel taken dose
          </Button>
        </div>
      </div>

      <DeleteMedicationAlertDialog callback={onClickDeleteMedication} />
      <DrawerMedicationEdit callback={onClickEditMedication} />
    </>
  );
}
