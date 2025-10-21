import { create } from "zustand";

type CreateMedicationDrawerStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useCreateMedicationDrawerStore =
  create<CreateMedicationDrawerStore>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
  }));
