'use client';

import { useCurrencyStore } from '@/store/currency.store';
import { formatPrice } from '@/helpers';

interface PricePreviewProps {
  priceUsd: number;
  className?: string;
}

export const PricePreview = ({ priceUsd, className = '' }: PricePreviewProps) => {
  const { currency, rates, baseCurrency } = useCurrencyStore();

  const finalPrice = formatPrice(priceUsd, currency, rates, baseCurrency);
  const usdFormatted = formatPrice(priceUsd, 'USD', rates, baseCurrency);

  return (
    <div className={`flex flex-col items-end gap-1 ${className}`}>
      <div className="text-2xl font-bold text-white">{finalPrice}</div>
      {currency !== 'USD' && (
        <div className="text-sm text-gray-400">≈ {usdFormatted}</div>
      )}
    </div>
  );
};
