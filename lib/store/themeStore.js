import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: typeof window !== "undefined" ? localStorage.getItem("nearme-theme") || "coffee" : "coffee",
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nearme-theme", theme);
    }
    set({ theme });
  },
}));