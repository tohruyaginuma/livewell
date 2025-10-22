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

export default function MedicationPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { setIsOpen: setIsOpenDeleteMedicationAlert } =
    useDeleteMedicationAlertStore();
  const { setIsOpen: setIsOpenEditMedication } = useEditMedicationDrawerStore();
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
      <div>
        <p className="text-2xl font-bold">Medication name</p>
        <StatusBadge status={0} />
        <StatusBadge status={1} />
        <StatusBadge status={2} />
      </div>
      <div className="flex gap-8">
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
          />
        </div>

        <dl>
          <dt>Dosage</dt>
          <dd>2 tablets daily</dd>

          <dt>Frequency</dt>
          <dd>2 tablets daily</dd>

          <dt>start date</dt>
          <dd>2 tablets daily</dd>

          <dt> quantity received</dt>
          <dd>2 tablets daily</dd>

          <dt>days’ supply.</dt>
          <dd>2 tablets daily</dd>

          <dt>current status</dt>
          <dd>2 tablets daily</dd>

          <dt>calculate refill dates</dt>
          <dd>2 tablets daily</dd>

          <dt>doses remaining</dt>
          <dd>2 tablets daily</dd>

          <dt>medication remaining</dt>
          <dd>2 tablets daily</dd>

          <dt>
            Trigger visual or text alerts when a refill is needed within 7 days
          </dt>
          <dd>2 tablets daily</dd>
        </dl>
      </div>

      <DeleteMedicationAlertDialog />
      <DrawerMedicationEdit />
    </>
  );
}
