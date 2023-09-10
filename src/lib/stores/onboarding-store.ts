import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OnboardingStore = {
  isOnboard: boolean;
  completeOnboarding: () => void;
};

export const useOnboardingStore = create(
  persist<OnboardingStore>(
    (set) => ({
      isOnboard: false,
      completeOnboarding: () => set({ isOnboard: true }),
    }),
    {
      name: "onboarding-store",
    }
  )
);
