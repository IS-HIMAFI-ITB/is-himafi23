import { create } from "zustand";

interface ViewAsStore {
  viewAs: string;
  setViewAs: (viewAs: string) => void;
}

interface TugasIndexStore {
  tugasIndex: number;
  setTugasIndex: (tugasIndex: number) => void;
}

export const useViewAsStore = create<ViewAsStore>()((set) => ({
  viewAs: "PESERTA",
  setViewAs: (viewAs) => set({ viewAs }),
}));

export const useTugasIndexStore = create<TugasIndexStore>()((set) => ({
  tugasIndex: 0,
  setTugasIndex: (tugasIndex) => set({ tugasIndex }),
}));
