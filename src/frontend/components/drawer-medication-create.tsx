import { Drawer } from "@/frontend/components/drawer";
import { useCreateMedicationDrawerStore } from "@/frontend/stores/use-create-medication-drawer-store";
import { FormMedication } from "./form-medication";

export const DrawerMedicationCreate = () => {
  const { isOpen, setIsOpen } = useCreateMedicationDrawerStore();

  return (
    <Drawer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Create Medication"
      description="Create a new medication"
    >
      <FormMedication />
    </Drawer>
  );
};
