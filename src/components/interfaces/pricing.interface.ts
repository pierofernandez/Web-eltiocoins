export type PricingTier = {
  id: string;
  product_id: string;
  platform: 'PS' | 'Xbox' | 'PC';
  key: string; // "100K", "500K", "Elite-I", "Division 1", etc
  price_usd: number;
  stock: number;
  created_at: string;
  updated_at: string;
};

export type PricingTierInput = Omit<PricingTier, 'id' | 'created_at' | 'updated_at'>;

export type CoinPricing = PricingTier & {
  category: 'monedas';
};

export type BoostPricing = PricingTier & {
  category: 'futchampions';
};

export type FutChampionPricing = PricingTier & {
  category: 'futchampions' | 'divisionrivals' | 'objetivos';
};

export type PricingCategory = 'monedas' | 'futchampions' | 'divisionrivals' | 'objetivos';

// Para el carrito — compatible con productos legacy (color opcional)
export type PurchaseMode = 'auto' | 'manual';

export type CartItemWithPricing = {
  variantId: string;
  productId: string;
  name: string;
  category?: PricingCategory;
  platform?: 'PS' | 'Xbox' | 'PC';
  quantity: number;
  key?: string;
  price: number;
  image: string;
  color?: string;
  purchaseMode?: PurchaseMode;
};
