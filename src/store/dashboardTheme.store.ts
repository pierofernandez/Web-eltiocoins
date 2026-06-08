import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DashboardTheme = 'light' | 'dark';

interface DashboardThemeStore {
  theme: DashboardTheme;
  toggleTheme: () => void;
  setTheme: (theme: DashboardTheme) => void;
}

export const useDashboardThemeStore = create<DashboardThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      toggleTheme: () =>
        set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'dashboard-theme' }
  )
);
