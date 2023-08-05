import { create } from "zustand";

interface ViewAsStore {
  viewAs: string;
  setViewAs: (viewAs: string) => void;
}

export const useViewAsStore = create<ViewAsStore>()((set) => ({
  viewAs: "PESERTA",
  setViewAs: (viewAs) => set({ viewAs }),
}));
