import { useDeleteMedicationAlertStore } from "@/frontend/stores/use-delete-medication-alert-store";
import { AlertDialog } from "./alert-dialog";

export const DeleteMedicationAlertDialog = () => {
  const { isOpen, setIsOpen } = useDeleteMedicationAlertStore();

  return (
    <AlertDialog
      title="Delete Medication"
      description="Are you sure you want to delete this medication?"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onConfirm={async () => {
        console.log("Delete medication");
      }}
    />
  );
};
