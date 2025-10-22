import { Drawer } from "@/frontend/components/drawer";
import { useCreateMedicationDrawerStore } from "@/frontend/stores/use-create-medication-drawer-store";
import { FormMedication } from "./form-medication";

type props = {
  callback: () => void;
};

export const DrawerMedicationCreate = (props: props) => {
  const { callback } = props;

  const { isOpen, setIsOpen } = useCreateMedicationDrawerStore();

  return (
    <Drawer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Add a Medication"
      description="Add a new medication to your list"
    >
      <FormMedication callback={callback} />
    </Drawer>
  );
};
