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
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/shared/constants";

export const SheetMedication = () => {
  const today = dayjs();

  const { isOpen, item, onClose } = useSheetMedicationStore();

  const [selectedDay, setSelectedDay] = useState<Date>(today.toDate());
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
              {item.medicationName}
            </h2>
            <StatusBadge status={1} />
          </div>

          <div className="flex items-center gap-4 w-full">
            <div className="flex flex-col flex-grow">
              <Progress
                value={(item.remainingSupply / item.quantityReceived) * 100}
              />
              <span className="text-muted-foreground text-sm">
                {item.remainingSupply}/{item.quantityReceived}
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
      <div className="flex justify-between">
        <dl className="flex flex-col gap-2">
          <DtItem label="Dosage" value={item.dosage} />
          <DtItem label="Frequency" value={item.frequency} />
          <DtItem
            label="Start date"
            value={dayjs(item.startDate).format(DATE_FORMAT)}
          />
          <DtItem label="Quantity Received" value={item.quantityReceived} />
          <DtItem label="Days’ Supply." value={item.daysSupply} />
          <DtItem label="Current Status" value={item.refillStatus} />
          <DtItem
            label="Calculate Refill Dates"
            value={dayjs(item.nextRefill).format(DATE_FORMAT)}
          />
          <DtItem label="Doses Remaining" value={item.remainingSupply} />
          <DtItem label="Medication Remaining" value={item.quantityReceived} />
        </dl>
        <div className="flex flex-col gap-2 w-fit">
          <Calendar
            mode="single"
            required
            selected={selectedDay}
            onSelect={setSelectedDay}
            modifiers={{
              disabled: { after: today.toDate() },
              active: item.takenDates.map((date) => new Date(date)),
            }}
            modifiersClassNames={{
              active: "rounded-md bg-primary text-primary-foreground",
            }}
            className="rounded-lg border"
          />
          Selected Day: {selectedDay && dayjs(selectedDay).format(DATE_FORMAT)}
          {item.takenDates.includes(dayjs(selectedDay).format(DATE_FORMAT)) ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={onClickCancelTakenDose}
            >
              Mark as not taken
            </Button>
          ) : (
            <Button size="sm" onClick={onClickTakenDose}>
              Mark as taken
            </Button>
          )}
        </div>
      </div>
    </Sheet>
  );
};
