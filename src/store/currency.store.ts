import { create } from 'zustand';
import fetchRates  from '../helpers';

type Currency = 'USD' | 'EUR' | 'PEN' | 'MXN' | 'CLP';

interface CurrencyStore {
  currency: Currency;
  baseCurrency: Currency;
  rates: Record<string, number>;
  isLoadingRates: boolean;
  setCurrency: (c: Currency) => void;
  loadRates: () => Promise<void>;
}

export const useCurrencyStore = create<CurrencyStore>((set, get) => ({
  currency: 'USD',
  baseCurrency: 'USD', // Moneda base donde se almacenan los precios
  rates: { USD: 1 },
  isLoadingRates: false,
  setCurrency: (c) => set({ currency: c }),
  loadRates: async () => {
    try {
      console.log('Iniciando carga de tasas...');
      set({ isLoadingRates: true });
      const { baseCurrency } = get();
      console.log('Moneda base:', baseCurrency);
      // Siempre cargar las tasas basadas en la moneda base, no en la moneda seleccionada
      const rates = await fetchRates(baseCurrency);
      console.log('Tasas obtenidas:', rates);
      set({ rates, isLoadingRates: false });
      console.log('Tasas guardadas en el store');
    } catch (error) {
      console.error('Error loading currency rates:', error);
      set({ isLoadingRates: false });
    }
  },
}));
