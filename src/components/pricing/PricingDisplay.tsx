import { useEffect, useState } from 'react';
import { useCurrencyStore } from '@/store/currency.store';
import { formatPrice } from '@/helpers';

interface PricingDisplayProps {
  priceUsd: number;
  localCurrency?: string;
}

export const PricingDisplay = ({ priceUsd, localCurrency }: PricingDisplayProps) => {
  const { currency, rates, baseCurrency, loadRates } = useCurrencyStore();
  const displayLocal = localCurrency ?? currency;
  const [showUsd, setShowUsd] = useState(false);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  const localPrice = formatPrice(priceUsd, displayLocal, rates, baseCurrency);
  const usdPrice = formatPrice(priceUsd, 'USD', rates, baseCurrency);

  const activeToggle = 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md shadow-green-500/20';
  const inactiveToggle = 'border border-zinc-600 bg-[#1a1a1a] text-zinc-400 hover:border-green-400/40';

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setShowUsd(false)}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
            !showUsd ? activeToggle : inactiveToggle
          }`}
        >
          {displayLocal} $
        </button>
        <button
          type="button"
          onClick={() => setShowUsd(true)}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
            showUsd ? activeToggle : inactiveToggle
          }`}
        >
          USD $
        </button>
      </div>

      <div className="text-center">
        <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          {showUsd ? usdPrice : localPrice}
        </div>
        <div className="mt-1 text-sm text-zinc-500">
          ≈ {showUsd ? localPrice : usdPrice}
        </div>
      </div>
    </div>
  );
};
