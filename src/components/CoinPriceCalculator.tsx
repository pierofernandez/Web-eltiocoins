import { useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import { AutoPurchaseModal } from '@/components/monedas/AutoPurchaseModal';

import { useCartStore } from '@/store/cart.store';

import { AutoPurchaseFormValues } from '@/lib/validators';

import { PlatformSelector } from '@/components/pricing/PlatformSelector';

import { PricingRangeSlider } from '@/components/pricing/PricingRangeSlider';

import { PricingDisplay } from '@/components/pricing/PricingDisplay';

import { PurchaseActions } from '@/components/pricing/PurchaseActions';

import CurrencySelector from '@/components/shared/CurrencySelector';

import { usePricingTiers } from '@/hooks/pricing/usePricingTiers';

import {

  PlatformGroup,

  sortCoinKeys,

  buildCartItemFromTier,

  formatCoinTick,

} from '@/helpers/pricing.helpers';

import { CartItemWithPricing } from '@/components/interfaces/pricing.interface';

import { PricingTierCard } from '@/components/pricing/PricingTierCard';



interface CoinPriceCalculatorProps {

  onAddToCart: (item: CartItemWithPricing) => void;

  pageTitle?: string;

  pageSubtitle?: string;

  promoLabel?: string;

  productImage?: string;

}



const WHATSAPP_NUMBER = '51977548397';

const DEFAULT_IMAGE = '/img/monedas.png';



export const CoinPriceCalculator = ({

  onAddToCart,

  pageTitle,

  pageSubtitle,

  promoLabel = 'MONEDAS',

  productImage = DEFAULT_IMAGE,

}: CoinPriceCalculatorProps) => {

  const navigate = useNavigate();

  const setAutoDeliveryData = useCartStore((state) => state.setAutoDeliveryData);

  const [platformGroup, setPlatformGroup] = useState<PlatformGroup>('console');

  const [showAutoModal, setShowAutoModal] = useState(false);

  const [selectedKey, setSelectedKey] = useState('');

  const { data, isLoading, isError } = usePricingTiers('monedas', platformGroup);



  const availableKeys = useMemo(() => {

    if (!data?.tiers) return [];

    return sortCoinKeys(Array.from(new Set(data.tiers.map((t) => t.key))));

  }, [data?.tiers]);



  const priceData = useMemo(() => {

    if (!data?.tiers || !selectedKey) return null;

    return data.tiers.find((t) => t.key === selectedKey) ?? null;

  }, [data?.tiers, selectedKey]);



  useEffect(() => {

    if (availableKeys.length === 0) {

      setSelectedKey('');

      return;

    }

    if (!availableKeys.includes(selectedKey)) {

      setSelectedKey(availableKeys[0]);

    }

  }, [availableKeys, selectedKey]);



  const coinTicks = useMemo(() => {

    if (availableKeys.length === 0) return [];

    if (availableKeys.length <= 5) return availableKeys.map(formatCoinTick);

    return [

      formatCoinTick(availableKeys[0]),

      formatCoinTick(availableKeys[Math.floor(availableKeys.length / 4)]),

      formatCoinTick(availableKeys[Math.floor(availableKeys.length / 2)]),

      formatCoinTick(availableKeys[Math.floor((availableKeys.length * 3) / 4)]),

      formatCoinTick(availableKeys[availableKeys.length - 1]),

    ];

  }, [availableKeys]);



  const buildCartItem = (): CartItemWithPricing | null => {

    if (!priceData) return null;

    return buildCartItemFromTier(priceData, {

      category: 'monedas',

      name: `${priceData.key} Monedas (${priceData.platform})`,

      image: productImage,

    });

  };



  const buildWhatsAppMessage = () => {

    if (!priceData) return '';

    return encodeURIComponent(

      `Hola, quiero comprar ${priceData.key} monedas para ${priceData.platform}. Precio: $${priceData.price_usd} USD.`

    );

  };



  const handleWhatsApp = () => {

    if (!priceData) return;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`, '_blank');

  };



  const handleAutoPurchase = () => {
    if (!priceData) return;
    setShowAutoModal(true);
  };

  const handleAutoFormSubmit = (data: AutoPurchaseFormValues) => {
    const item = buildCartItem();
    if (!item) return;

    setAutoDeliveryData(data);
    onAddToCart({ ...item, purchaseMode: 'auto' });
    setShowAutoModal(false);
    toast.success('Producto añadido al carrito', { position: 'bottom-right' });
    navigate('/checkout');
  };



  const isOutOfStock = priceData !== null && priceData.stock === 0;

  const disabled = isLoading || !priceData || isOutOfStock;



  return (

    <PricingTierCard
      promoLabel={promoLabel}
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
            label="Cantidad de monedas"
            minTick={formatCoinTick(availableKeys[0])}
            maxTick={formatCoinTick(availableKeys[availableKeys.length - 1])}
            tickLabels={coinTicks}
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

      <AutoPurchaseModal
        open={showAutoModal}
        onClose={() => setShowAutoModal(false)}
        onSubmit={handleAutoFormSubmit}
      />
    </PricingTierCard>

  );

};


