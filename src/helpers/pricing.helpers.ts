import { PricingTier, CartItemWithPricing } from '@/components/interfaces/pricing.interface';

export type PlatformGroup = 'console' | 'pc';

export type PricingCategory = 'monedas' | 'futchampions' | 'divisionrivals' | 'objetivos';

/** 5 rangos FC en DB — del 5 (peor) al 1 (mejor) */
export const FUT_CHAMPIONS_KEYS = [
  'Rango 5',
  'Rango 4',
  'Rango 3',
  'Rango 2',
  'Rango 1',
] as const;

/** Divisiones Rivals en DB — de menor a mayor (Division 3 → Elite) */
export const DIVISION_RIVALS_KEYS = [
  'Division 3',
  'Division 2',
  'Division 1',
  'Division elite',
] as const;

/** Convierte keys como "100K", "1M" a valor numérico para ordenar */
export const parseCoinKey = (value: string): number => {
  const normalized = value.toUpperCase().trim();
  const num = parseFloat(normalized.replace(/[KM]/g, ''));
  if (Number.isNaN(num)) return 0;
  if (normalized.includes('M')) return num * 1_000_000;
  if (normalized.includes('K')) return num * 1_000;
  return num;
};

/** Ordena keys de monedas de menor a mayor */
export const sortCoinKeys = (keys: string[]): string[] =>
  [...keys].sort((a, b) => parseCoinKey(a) - parseCoinKey(b));

const normalizeKey = (s: string): string =>
  s
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

/** Ordena keys según un orden canónico definido en admin/DB */
export const orderKeysFromCanonical = (dbKeys: string[], canonical: readonly string[]): string[] => {
  const dbMap = new Map(dbKeys.map((k) => [normalizeKey(k), k]));

  const ordered: string[] = [];
  for (const key of canonical) {
    const match = dbMap.get(normalizeKey(key));
    if (match) ordered.push(match);
  }

  for (const key of dbKeys) {
    if (!ordered.includes(key)) ordered.push(key);
  }

  return ordered;
};

/** Extrae número de rango desde key tipo "Rango 3" o "Division 2" */
export const parseRankFromKey = (key: string): number | null => {
  const match = key.match(/(\d+)/);
  return match ? Number(match[1]) : null;
};

/** Número de rango visible (peor→mejor en el slider) */
export const getRankNumber = (options: string[], currentKey: string): number => {
  const parsed = parseRankFromKey(currentKey);
  if (parsed !== null) return parsed;
  const index = options.indexOf(currentKey);
  if (index === -1) return 0;
  return options.length - index;
};

/** Intenta PS primero, luego Xbox si no hay tiers en consola */
export const fetchTiersForPlatformGroup = async (
  fetcher: (platform: 'PS' | 'Xbox' | 'PC') => Promise<PricingTier[]>,
  group: PlatformGroup
): Promise<{ tiers: PricingTier[]; platform: 'PS' | 'Xbox' | 'PC' }> => {
  if (group === 'pc') {
    const tiers = await fetcher('PC');
    return { tiers, platform: 'PC' };
  }

  const psTiers = await fetcher('PS');
  if (psTiers.length > 0) return { tiers: psTiers, platform: 'PS' };

  const xboxTiers = await fetcher('Xbox');
  return { tiers: xboxTiers, platform: 'Xbox' };
};

export const getPlatformLabel = (platform: 'PS' | 'Xbox' | 'PC'): string => {
  if (platform === 'PC') return 'PC';
  return 'PS / Xbox';
};

export const buildCartItemFromTier = (
  tier: PricingTier,
  options: {
    category: PricingCategory;
    name: string;
    image: string;
    quantity?: number;
  }
): CartItemWithPricing => ({
  variantId: tier.id,
  productId: tier.product_id,
  name: options.name,
  category: options.category,
  platform: tier.platform,
  key: tier.key,
  price: Number(tier.price_usd),
  quantity: options.quantity ?? 1,
  image: options.image,
});

export const COIN_PRESET_KEYS = ['500K', '1M', '2M', '5M', '10M'];

export const getAvailablePresets = (availableKeys: string[]): string[] =>
  COIN_PRESET_KEYS.filter((preset) => availableKeys.includes(preset));

export const formatCoinTick = (key: string): string => {
  const num = parseCoinKey(key);
  if (num >= 1_000_000) return `${num / 1_000_000}M`;
  if (num >= 1_000) return `${num / 1_000}K`;
  return key;
};
