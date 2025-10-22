import { UserMedicationResponse } from "@/server/service/user-medication-response";
import { create } from "zustand";

type SheetMedicationStore = {
  isOpen: boolean;
  item: UserMedicationResponse | null;
  onOpen: (item: UserMedicationResponse) => void;
  onClose: () => void;
};

export const useSheetMedicationStore = create<SheetMedicationStore>((set) => ({
  isOpen: false,
  item: null,
  onOpen: (item: UserMedicationResponse) => set({ isOpen: true, item }),
  onClose: () => set({ isOpen: false, item: null }),
}));
