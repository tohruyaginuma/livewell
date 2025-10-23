import { useDeleteMedicationAlertStore } from "@/frontend/stores/use-delete-medication-alert-store";
import { AlertDialog } from "./alert-dialog";
import { API_URL } from "@/shared/constants";
import { useMeStore } from "../stores/use-me-store";

type props = {
  callback: () => Promise<void>;
};

export const DeleteMedicationAlertDialog = (props: props) => {
  const { callback } = props;
  const { isOpen, userMedicationId, onClose } = useDeleteMedicationAlertStore();
  const { id: userId } = useMeStore();

  const handleConfirm = async () => {
    if (!userId || !userMedicationId) {
      return;
    }

    await fetch(
      `${API_URL}/api/users/${userId}/user-medications/${userMedicationId}`,
      {
        method: "DELETE",
      },
    );

    await callback();
  };

  return (
    <AlertDialog
      title="Delete Medication"
      description="Are you sure you want to delete this medication?"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
};
