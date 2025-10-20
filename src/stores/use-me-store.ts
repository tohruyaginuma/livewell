import { create } from "zustand";
import type { UserId, UserName } from "@/domain/user";

type MeStore = {
  id: UserId | null;
  name: UserName | null;
  setMe: (id: UserId, name: UserName) => void;
};

export const useMeStore = create<MeStore>((set) => ({
  id: null,
  name: null,
  setMe: (id: UserId, name: UserName) => set({ id, name }),
}));
