import { Sheet } from "@/frontend/components/sheet";
import { Button } from "@/frontend/components/ui/button";
import { toast } from "sonner";
import { useDeleteMedicationAlertStore } from "@/frontend/stores/use-delete-medication-alert-store";
import { useEditMedicationDrawerStore } from "@/frontend/stores/use-edit-medication-drawer-store";
import { useSheetMedicationStore } from "@/frontend/stores/use-sheet-medication-store";
import { StatusBadge } from "./status-badge";
import { Progress } from "./ui/progress";
import { Calendar } from "@/frontend/components/ui/calendar";
import { useCallback, useEffect, useState } from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/shared/constants";
import { UserMedicationStatusListItemResponse } from "@/server/service/user-medication-status-list-item-response";
import { Spinner } from "./ui/spinner";
import { Separator } from "./ui/separator";
import { CalendarIcon, Clock, Pill } from "lucide-react";
import { DtItem } from "./dt-item";
import { UserMedicationListItemResponse } from "@/server/service/user-medication-list-item-response";

type props = {
  item: UserMedicationListItemResponse | null;
  callback: () => void;
};

export const SheetMedication = (props: props) => {
  const { item, callback } = props;

  const today = dayjs();

  const { isOpen, onClose } = useSheetMedicationStore();

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
    } finally {
      callback();
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
    } finally {
      callback();
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
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 pr-8">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {item.medicationName}
            </h2>
            <StatusBadge status={1} />
            <div className="flex gap-2 ml-auto">
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

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium">
                {item.remainingSupply}/{item.quantityReceived} remaining
              </span>
            </div>
            <Progress
              value={(item.remainingSupply / item.quantityReceived) * 100}
              className="h-3"
            />
          </div>
        </div>
      }
    >
      <Separator />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Pill className="h-5 w-5 text-primary" />
              Medication Details
            </h3>
            <div className="space-y-3">
              <DtItem label="Dosage" value={item.dosage} />
              <DtItem label="Frequency" value={`${item.frequency}x daily`} />
              <DtItem
                label="Start Date"
                value={dayjs(item.startDate).format(DATE_FORMAT)}
              />
              <DtItem label="Quantity Received" value={item.quantityReceived} />
              <DtItem label="Days Supply" value={item.daysSupply} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Supply Information
            </h3>
            <div className="space-y-3">
              <DtItem
                label="Refill Date"
                value={dayjs(item.nextRefill).format(DATE_FORMAT)}
              />
              <DtItem label="Remaining Supply" value={item.remainingSupply} />
            </div>
          </div>
        </div>

        <div className="space-y-4 mx-auto">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Adherence Calendar
          </h3>
          <div className="flex justify-center">
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
          </div>

          {selectedDay && (
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">
                Selected:{" "}
                {selectedDay.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

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
          )}
        </div>
      </div>
    </Sheet>
  );
};
