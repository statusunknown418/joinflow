import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MainSidebarStateStore = {
  collapsed: boolean;
  toggle: () => void;
};

export const useMainSidebarState = create(
  persist<MainSidebarStateStore>(
    (set, get) => ({
      collapsed: false,
      toggle: () => set({ collapsed: !get().collapsed }),
    }),
    {
      name: "main-sidebar-state",
    },
  ),
);

export type SecondarySidebarStateStore = {
  collapsed: boolean;
  toggle: () => void;
};

export const useSecondarySidebarState = create(
  persist<SecondarySidebarStateStore>(
    (set, get) => ({
      collapsed: false,
      toggle: () => set({ collapsed: !get().collapsed }),
    }),
    {
      name: "secondary-sidebar-state",
    },
  ),
);
