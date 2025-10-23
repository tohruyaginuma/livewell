import { create } from "zustand";

type DeleteMedicationAlertStore = {
  isOpen: boolean;
  userMedicationId: number | null;
  onOpen: (userMedicationId: number) => void;
  onClose: () => void;
};

export const useDeleteMedicationAlertStore = create<DeleteMedicationAlertStore>(
  (set) => ({
    isOpen: false,
    userMedicationId: null,
    onOpen: (userMedicationId: number) =>
      set({ isOpen: true, userMedicationId }),
    onClose: () => set({ isOpen: false, userMedicationId: null }),
  }),
);
