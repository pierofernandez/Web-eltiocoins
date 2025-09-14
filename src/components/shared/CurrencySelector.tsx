import { useEffect } from "react";
import { useCurrencyStore } from "../../store/currency.store";

const CURRENCIES = [
  { code: 'USD', name: 'Dólar', flagSrc: '/img/banderas/usa-flag.webp' },
  { code: 'EUR', name: 'Euro', flagSrc: '/img/banderas/spain-flag.webp' },
  { code: 'PEN', name: 'Sol', flagSrc: '/img/banderas/peru-flag.webp' },
  { code: 'MXN', name: 'Peso', flagSrc: '/img/banderas/mexico-flag.webp' },
];

export const CurrencySelector = () => {
  const { currency, setCurrency, loadRates } = useCurrencyStore();

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  const handleCurrencyChange = async (newCurrency: string) => {
    console.log('Cambiando moneda a:', newCurrency);
    setCurrency(newCurrency as any);
    // Cargar las tasas de cambio cuando se cambia la moneda
    console.log('Cargando tasas de cambio...');
    await loadRates();
    console.log('Tasas cargadas');
  };

  const current = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];

  return (
    <div className="relative">
      {/* Visual del selector (responsive) */}
      <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-600 hover:border-green-400 text-white rounded-md px-2 py-1 cursor-pointer min-w-[78px] sm:min-w-[120px] md:min-w-[160px] transition">
        <img
          src={current.flagSrc}
          alt={current.name}
          className="w-4 h-3 sm:w-5 sm:h-3.5 md:w-6 md:h-4 object-cover rounded-[2px]"
          loading="lazy"
        />
        {/* En móviles: código; en sm+: código + nombre */}
        <span className="text-xs sm:text-sm font-semibold leading-none">
          {current.code}
          <span className="hidden sm:inline"> · {current.name}</span>
        </span>
      </div>

      {/* Select nativo transparente para accesibilidad y funcionalidad */}
      <select
        aria-label="Seleccionar moneda"
        value={currency}
        onChange={(e) => handleCurrencyChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      >
        {CURRENCIES.map(cur => (
          <option className="text-black" key={cur.code} value={cur.code}>
            {`${cur.code} — ${cur.name}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;