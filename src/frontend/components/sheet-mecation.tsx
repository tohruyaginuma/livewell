import { Sheet } from "@/frontend/components/sheet";
import { Button } from "@/frontend/components/ui/button";
import { toast } from "sonner";
import { useDeleteMedicationAlertStore } from "@/frontend/stores/use-delete-medication-alert-store";
import { useEditMedicationDrawerStore } from "@/frontend/stores/use-edit-medication-drawer-store";
import { useSheetMedicationStore } from "@/frontend/stores/use-sheet-medication-store";
import { StatusBadge } from "./status-badge";
import { Progress } from "./ui/progress";
import { DtItem } from "@/frontend/components/dt-item";
import { Calendar } from "@/frontend/components/ui/calendar";
import { useState } from "react";

import { IconPencil, IconTrash } from "@tabler/icons-react";

export const SheetMedication = () => {
  const { isOpen, item, onClose } = useSheetMedicationStore();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { setIsOpen: setIsOpenDeleteMedicationAlert } =
    useDeleteMedicationAlertStore();
  const { setIsOpen: setIsOpenEditMedication } = useEditMedicationDrawerStore();

  const onClickTakenDose = async () => {
    toast.success("Taken dose successfully");
  };

  const onClickCancelTakenDose = async () => {
    toast.success("Cancelled taken dose");
  };

  if (!item) return null;

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      header={
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Medication Name
            </h2>
            <StatusBadge status={1} />
          </div>

          <div className="flex items-center gap-4 w-full">
            <div className="flex flex-col flex-grow">
              <Progress value={100} />
              <span className="text-muted-foreground text-sm">
                Dose/Week: 10/10
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                setIsOpenDeleteMedicationAlert(true);
              }}
              variant="destructive"
            >
              <IconTrash />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsOpenEditMedication(true);
              }}
            >
              <IconPencil />
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-8">
        <dl className="grid grid-cols-2 gap-4">
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
        <div className="flex flex-col gap-2 w-fit">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
          />
          <Button variant="default" size="sm" onClick={onClickTakenDose}>
            Taken dose
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onClickCancelTakenDose}
          >
            Cancel taken dose
          </Button>
        </div>
      </div>
    </Sheet>
  );
};
