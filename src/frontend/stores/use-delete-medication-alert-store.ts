import { create } from "zustand";

type DeleteMedicationAlertStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useDeleteMedicationAlertStore = create<DeleteMedicationAlertStore>(
  (set) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
  }),
);
