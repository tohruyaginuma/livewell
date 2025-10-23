import { create } from "zustand";

type CreateMedicationDrawerStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateMedicationDrawerStore =
  create<CreateMedicationDrawerStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
