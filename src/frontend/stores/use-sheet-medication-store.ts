import type { UserMedicationListItemResponse } from "@/server/service/user-medication-list-item-response";
import { create } from "zustand";

type SheetMedicationStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSheetMedicationStore = create<SheetMedicationStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
