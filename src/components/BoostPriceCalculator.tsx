import { useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import { PlatformSelector } from '@/components/pricing/PlatformSelector';

import { PricingRangeSlider } from '@/components/pricing/PricingRangeSlider';

import { PricingDisplay } from '@/components/pricing/PricingDisplay';

import { PurchaseActions } from '@/components/pricing/PurchaseActions';

import CurrencySelector from '@/components/shared/CurrencySelector';

import { PricingTierCard } from '@/components/pricing/PricingTierCard';

import { usePricingTiers } from '@/hooks/pricing/usePricingTiers';

import {

  PlatformGroup,

  buildCartItemFromTier,

  orderKeysFromCanonical,

  getRankNumber,

  FUT_CHAMPIONS_KEYS,

  DIVISION_RIVALS_KEYS,

} from '@/helpers/pricing.helpers';

import {

  CartItemWithPricing,

  PricingCategory,

} from '@/components/interfaces/pricing.interface';



interface BoostPriceCalculatorProps {

  category: Exclude<PricingCategory, 'monedas'>;

  onAddToCart: (item: CartItemWithPricing) => void;

  pageTitle?: string;

  pageSubtitle?: string;

  promoLabel?: string;

  productImage?: string;

  rangeLabel?: string;

  namePrefix?: string;

}



const WHATSAPP_NUMBER = '51977548397';



const CATEGORY_CONFIG: Record<

  Exclude<PricingCategory, 'monedas'>,

  {

    promoLabel: string;

    image: string;

    namePrefix: string;

    rangeLabel: string;

    canonicalKeys: readonly string[];

    rankLabel: string;

  }

> = {

  futchampions: {

    promoLabel: '🏆 FUT CHAMPIONS',

    image: '/img/futchampions.png',

    namePrefix: 'Boosting FUT Champions',

    rangeLabel: 'Rango destino',

    canonicalKeys: FUT_CHAMPIONS_KEYS,

    rankLabel: 'Rango',

  },

  divisionrivals: {

    promoLabel: '⚔️ DIVISION RIVALS',

    image: '/img/divisionrivals.png',

    namePrefix: 'Boosting Division Rivals',

    rangeLabel: 'División destino',

    canonicalKeys: DIVISION_RIVALS_KEYS,

    rankLabel: 'División',

  },

  objetivos: {

    promoLabel: '🎯 OBJETIVOS',

    image: '/img/objetivos.png',

    namePrefix: 'Objetivo',

    rangeLabel: 'Objetivo seleccionado',

    canonicalKeys: [],

    rankLabel: 'Nivel',

  },

};



export const BoostPriceCalculator = ({

  category,

  onAddToCart,

  pageTitle,

  pageSubtitle,

  promoLabel,

  productImage,

  rangeLabel,

  namePrefix,

}: BoostPriceCalculatorProps) => {

  const config = CATEGORY_CONFIG[category];

  const navigate = useNavigate();



  const [platformGroup, setPlatformGroup] = useState<PlatformGroup>('console');

  const [selectedKey, setSelectedKey] = useState('');

  const { data, isLoading, isError } = usePricingTiers(category, platformGroup);



  const availableKeys = useMemo(() => {

    if (!data?.tiers) return [];

    const dbKeys = Array.from(new Set(data.tiers.map((t) => t.key)));

    if (config.canonicalKeys.length > 0) {

      return orderKeysFromCanonical(dbKeys, config.canonicalKeys);

    }

    return dbKeys;

  }, [data?.tiers, config.canonicalKeys]);



  const priceData = useMemo(() => {

    if (!data?.tiers || !selectedKey) return null;

    return data.tiers.find((t) => t.key === selectedKey) ?? null;

  }, [data?.tiers, selectedKey]);



  const rankSublabel = useMemo(() => {
    if (!selectedKey) return undefined;
    if (selectedKey.toLowerCase().includes('elite')) return 'Elite';
    const n = getRankNumber(availableKeys, selectedKey);
    return n > 0 ? `${config.rankLabel} ${n}` : undefined;
  }, [selectedKey, availableKeys, config.rankLabel]);



  useEffect(() => {

    if (availableKeys.length === 0) {

      setSelectedKey('');

      return;

    }

    if (!availableKeys.includes(selectedKey)) {

      setSelectedKey(availableKeys[0]);

    }

  }, [availableKeys, selectedKey]);



  const resolvedPromoLabel = promoLabel ?? config.promoLabel;

  const resolvedImage = productImage ?? config.image;

  const resolvedRangeLabel = rangeLabel ?? config.rangeLabel;

  const resolvedNamePrefix = namePrefix ?? config.namePrefix;



  const buildCartItem = (): CartItemWithPricing | null => {

    if (!priceData) return null;

    return buildCartItemFromTier(priceData, {

      category,

      name: `${resolvedNamePrefix}: ${priceData.key} (${priceData.platform})`,

      image: resolvedImage,

    });

  };



  const buildWhatsAppMessage = () => {

    if (!priceData) return '';

    return encodeURIComponent(

      `Hola, quiero ${resolvedNamePrefix} — ${priceData.key} para ${priceData.platform}. Precio: $${priceData.price_usd} USD.`

    );

  };



  const handleWhatsApp = () => {

    if (!priceData) return;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`, '_blank');

  };



  const handleAutoPurchase = () => {

    const item = buildCartItem();

    if (!item) return;

    onAddToCart(item);

    toast.success('Producto añadido al carrito', { position: 'bottom-right' });

    navigate('/checkout');

  };



  const isOutOfStock = priceData !== null && priceData.stock === 0;

  const disabled = isLoading || !priceData || isOutOfStock;



  const minTick =

    availableKeys.length > 0

      ? `${config.rankLabel} ${availableKeys.length}`

      : '';

  const maxTick = availableKeys.length > 0 ? `${config.rankLabel} 1` : '';



  return (

    <PricingTierCard
      promoLabel={resolvedPromoLabel}
      pageTitle={pageTitle}
      pageSubtitle={pageSubtitle}
      isLoading={isLoading}
      isError={isError}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex-1">
          <PlatformSelector value={platformGroup} onChange={setPlatformGroup} />
        </div>
        <div className="shrink-0">
          <CurrencySelector />
        </div>
      </div>

      {availableKeys.length > 0 ? (
        <div className="mb-6">
          <PricingRangeSlider
            options={availableKeys}
            value={selectedKey}
            onChange={setSelectedKey}
            label={resolvedRangeLabel}
            sublabel={rankSublabel}
            minTick={minTick}
            maxTick={maxTick}
          />
        </div>
      ) : (
        !isLoading && (
          <p className="mb-6 text-center text-sm text-zinc-500">
            No hay precios configurados. El administrador debe añadirlos en el panel de precios.
          </p>
        )
      )}

      {isOutOfStock && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-center text-sm text-red-400">
          Agotado temporalmente
        </div>
      )}

      <div className="mb-6 rounded-2xl border border-[#00FF87]/20 bg-[#00FF87]/5 p-5">
        {priceData ? (
          <PricingDisplay priceUsd={Number(priceData.price_usd)} />
        ) : (
          <p className="text-center text-sm text-zinc-500">
            Ajusta la barra para ver el precio
          </p>
        )}
      </div>

      <PurchaseActions
        onWhatsApp={handleWhatsApp}
        onAutoPurchase={handleAutoPurchase}
        disabled={disabled}
        loading={isLoading}
      />
    </PricingTierCard>

  );

};


