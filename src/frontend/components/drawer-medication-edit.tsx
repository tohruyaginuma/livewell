import { Drawer } from "@/frontend/components/drawer";
import { useEditMedicationDrawerStore } from "@/frontend/stores/use-edit-medication-drawer-store";
import { FormMedication } from "./form-medication";

export const DrawerMedicationEdit = () => {
  const { isOpen, setIsOpen } = useEditMedicationDrawerStore();

  return (
    <Drawer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Edit Medication"
      description="Edit a medication"
    >
      <FormMedication />
    </Drawer>
  );
};
