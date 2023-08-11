import { create } from "zustand";

interface ViewAsStore {
  viewAs: string;
  setViewAs: (viewAs: string) => void;
}

interface TugasIndexStore {
  tugasIndex: number;
  setTugasIndex: (tugasIndex: number) => void;
}

interface ActiveDayIndexStore {
  activeDayIndex: number;
  setActiveDayIndex: (activeDayIndex: number) => void;
}

interface BooleanStore {
  value: boolean;
  setValue: (boolean: boolean) => void;
}

export const useViewAsStore = create<ViewAsStore>()((set) => ({
  viewAs: "PESERTA",
  setViewAs: (viewAs) => set({ viewAs }),
}));

export const useTugasIndexStore = create<TugasIndexStore>()((set) => ({
  tugasIndex: 0,
  setTugasIndex: (tugasIndex) => set({ tugasIndex }),
}));

export const useActiveDayIndexStore = create<ActiveDayIndexStore>()((set) => ({
  activeDayIndex: 0,
  setActiveDayIndex: (activeDayIndex) => set({ activeDayIndex }),
}));

export const useOpenDialogStore = create<BooleanStore>()((set) => ({
  value: false,
  setValue: (value) => set({ value }),
}));
