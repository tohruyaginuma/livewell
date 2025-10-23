import { create } from "zustand";
import type { UserMedicationListItemResponse } from "@/server/service/user-medication-list-item-response";

type EditMedicationDrawerStore = {
  isOpen: boolean;
  item: UserMedicationListItemResponse | null;
  onOpen: (item: UserMedicationListItemResponse) => void;
  onClose: () => void;
};

export const useEditMedicationDrawerStore = create<EditMedicationDrawerStore>(
  (set) => ({
    isOpen: false,
    item: null,
    onOpen: (item: UserMedicationListItemResponse) =>
      set({ isOpen: true, item }),
    onClose: () => set({ isOpen: false }),
  }),
);
