import { Drawer } from "@/frontend/components/drawer";
import { useEditMedicationDrawerStore } from "@/frontend/stores/use-edit-medication-drawer-store";
import { FormMedication } from "./form-medication";

type props = {
  callback: () => void;
};

export const DrawerMedicationEdit = (props: props) => {
  const { callback } = props;

  const { isOpen, item, onClose } = useEditMedicationDrawerStore();

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Medication"
      description="Edit a medication"
    >
      <FormMedication callback={callback} item={item} />
    </Drawer>
  );
};
