import type { UserMedicationListItemResponse } from "@/server/service/user-medication-response";
import { create } from "zustand";

type SheetMedicationStore = {
  isOpen: boolean;
  item: UserMedicationListItemResponse | null;
  onOpen: (item: UserMedicationListItemResponse) => void;
  onClose: () => void;
};

export const useSheetMedicationStore = create<SheetMedicationStore>((set) => ({
  isOpen: false,
  item: null,
  onOpen: (item: UserMedicationListItemResponse) => set({ isOpen: true, item }),
  onClose: () => set({ isOpen: false, item: null }),
}));
