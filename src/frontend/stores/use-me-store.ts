import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserId, UserName } from "@/server/domain/user";

type MeStore = {
  id: UserId | null;
  name: UserName | null;
  setMe: (id: UserId, name: UserName) => void;
};

export const useMeStore = create<MeStore>()(
  persist(
    (set) => ({
      id: null,
      name: null,
      setMe: (id: UserId, name: UserName) => set({ id, name }),
    }),
    {
      name: "me-store",
      partialize: (state) => ({ id: state.id, name: state.name }),
    },
  ),
);
