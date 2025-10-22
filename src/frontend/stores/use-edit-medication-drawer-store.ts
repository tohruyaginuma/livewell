import { create } from "zustand";

type EditMedicationDrawerStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useEditMedicationDrawerStore = create<EditMedicationDrawerStore>(
  (set) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
  }),
);
