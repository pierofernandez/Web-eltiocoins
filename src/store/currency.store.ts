import { create } from 'zustand';
import fetchRates from '../helpers';

type Currency = 'USD' | 'EUR' | 'PEN' | 'MXN' | 'CLP';

interface CurrencyStore {
  currency: Currency;
  baseCurrency: Currency;
  rates: Record<string, number>;
  isLoadingRates: boolean;
  setCurrency: (c: Currency) => void;
  loadRates: () => Promise<void>;
}

let ratesLoadPromise: Promise<void> | null = null;

export const useCurrencyStore = create<CurrencyStore>((set, get) => ({
  currency: 'USD',
  baseCurrency: 'USD',
  rates: { USD: 1, EUR: 0.92, PEN: 3.75, MXN: 17.15, CLP: 950 },
  isLoadingRates: false,
  setCurrency: (c) => set({ currency: c }),
  loadRates: async () => {
    if (ratesLoadPromise) return ratesLoadPromise;

    ratesLoadPromise = (async () => {
      try {
        set({ isLoadingRates: true });
        const { baseCurrency } = get();
        const rates = await fetchRates(baseCurrency);
        set({ rates, isLoadingRates: false });
      } catch {
        set({ isLoadingRates: false });
      } finally {
        ratesLoadPromise = null;
      }
    })();

    return ratesLoadPromise;
  },
}));
