import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  message: string;
  setLoading: (isLoading: boolean, message?: string) => void;
}

type LoadingStore = {
  setLoading: (isLoading: boolean, message?: string) => void;
} & LoadingState;

export const useLoadingState = create<LoadingStore>((set) => ({
  isLoading: false,
  message: "Processing...",
  setLoading: (isLoading: boolean, message = "Processing...") =>
    set({ isLoading, message }),
}));
