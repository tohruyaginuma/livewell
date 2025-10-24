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
import { useCallback, useEffect, useState } from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/shared/constants";
import { UserMedicationStatusListItemResponse } from "@/server/service/user-medication-status-list-item-response";
import { Spinner } from "./ui/spinner";

export const SheetMedication = () => {
  const today = dayjs();

  const { isOpen, item, onClose } = useSheetMedicationStore();

  const [isLoadingDates, setIsLoadingDates] = useState(false);

  const [selectedDay, setSelectedDay] = useState<Date>(today.toDate());
  const [takenDates, setTakenDates] = useState<
    UserMedicationStatusListItemResponse[]
  >([]);

  const { onOpen: onOpenDeleteMedicationAlert } =
    useDeleteMedicationAlertStore();
  const { onOpen: onOpenEditMedication } = useEditMedicationDrawerStore();

  const fetchTakenDates = useCallback(async () => {
    if (!item) return;

    try {
      setIsLoadingDates(true);
      const response = await fetch(`/api/user-medications/${item?.id}/takens`);
      const data = await response.json();
      setTakenDates(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingDates(false);
    }
  }, [item]);

  const onClickTakenDose = async () => {
    try {
      await fetch(`/api/user-medications/${item?.id}/takens`, {
        method: "POST",
        body: JSON.stringify({ takenDate: selectedDay.toISOString() }),
      });
      await fetchTakenDates();
      toast.success("Taken dose successfully");
    } catch (error) {
      toast.error("Failed to take dose");
    }
  };

  const onClickCancelTakenDose = async (takenId: number | null) => {
    if (!takenId) {
      toast.error("No taken ID found");
      return;
    }

    try {
      await fetch(`/api/user-medications/${item?.id}/takens/${takenId}`, {
        method: "DELETE",
      });

      await fetchTakenDates();
      toast.success("Cancelled taken dose");
    } catch (error) {
      toast.error("Failed to cancel taken dose");
    }
  };

  useEffect(() => {
    fetchTakenDates();
  }, [fetchTakenDates]);

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
                onOpenDeleteMedicationAlert(item.id);
              }}
              variant="destructive"
            >
              <IconTrash />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onOpenEditMedication(item);
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
          <div className="relative w-full">
            <Calendar
              mode="single"
              required
              selected={selectedDay}
              onSelect={setSelectedDay}
              modifiers={{
                disabled: { after: today.toDate() },
                active: takenDates.map(
                  (takenDate) => new Date(takenDate.takenDate),
                ),
              }}
              modifiersClassNames={{
                active: "rounded-md bg-primary text-primary-foreground",
              }}
              className="rounded-lg border"
            />
            {isLoadingDates ? (
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-background/30">
                <Spinner className="w-4 h-4 animate-spin" />
              </div>
            ) : null}
          </div>
          Selected Day: {selectedDay && dayjs(selectedDay).format(DATE_FORMAT)}
          {takenDates.find((takenDate) =>
            dayjs(takenDate.takenDate).isSame(dayjs(selectedDay), "day"),
          ) ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={() =>
                onClickCancelTakenDose(
                  takenDates.find((t) =>
                    dayjs(t.takenDate).isSame(dayjs(selectedDay), "day"),
                  )?.id ?? null,
                )
              }
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
