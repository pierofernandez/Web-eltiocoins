import { supabase } from '../supabase/client';
import { PricingTier, PricingTierInput } from '@/components/interfaces/pricing.interface';

/**
 * Obtener todos los pricing tiers
 */
export async function getPricingTiers() {
  const { data, error } = await supabase
    .from('pricing_tiers')
    .select('*')
    .order('platform', { ascending: true })
    .order('key', { ascending: true });

  if (error) {
    console.error('Error fetching pricing tiers:', error);
    throw new Error('Failed to fetch pricing tiers');
  }

  return data as PricingTier[];
}

/**
 * Obtener pricing tiers por categoría (monedas, futchampions, etc)
 */
export async function getPricingTiersByCategory(category: string) {
  const { data: products, error: productError } = await supabase
    .from('products')
    .select('id')
    .eq('category', category);

  if (productError) throw new Error('Failed to fetch products');

  const productIds = products?.map((p) => p.id) || [];

  if (productIds.length === 0) return [];

  const { data, error } = await supabase
    .from('pricing_tiers')
    .select('*')
    .in('product_id', productIds)
    .order('platform', { ascending: true })
    .order('key', { ascending: true });

  if (error) throw new Error('Failed to fetch pricing tiers');

  return data as PricingTier[];
}

/**
 * Obtener pricing tiers por plataforma
 */
export async function getPricingTiersByPlatform(platform: 'PS' | 'Xbox' | 'PC') {
  const { data, error } = await supabase
    .from('pricing_tiers')
    .select('*')
    .eq('platform', platform)
    .order('key', { ascending: true });

  if (error) throw new Error('Failed to fetch pricing tiers');

  return data as PricingTier[];
}

/**
 * Obtener pricing tiers por categoría y plataforma
 */
export async function getPricingTiersByCategoryAndPlatform(
  category: string,
  platform: 'PS' | 'Xbox' | 'PC'
) {
  const { data: products, error: productError } = await supabase
    .from('products')
    .select('id')
    .eq('category', category);

  if (productError) throw new Error('Failed to fetch products');

  const productIds = products?.map((p) => p.id) || [];

  if (productIds.length === 0) return [];

  const { data, error } = await supabase
    .from('pricing_tiers')
    .select('*')
    .in('product_id', productIds)
    .eq('platform', platform)
    .order('key', { ascending: true });

  if (error) throw new Error('Failed to fetch pricing tiers');

  return data as PricingTier[];
}

/**
 * Obtener un pricing tier específico
 */
export async function getPricingTier(id: string) {
  const { data, error } = await supabase
    .from('pricing_tiers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error('Failed to fetch pricing tier');

  return data as PricingTier;
}

/**
 * Actualizar precio de un pricing tier (ADMIN ONLY)
 */
export async function updatePricingTierPrice(
  id: string,
  price_usd: number,
  stock?: number
) {
  const updateData: { price_usd: number; stock?: number } = { price_usd };
  if (stock !== undefined) {
    updateData.stock = stock;
  }

  const { data, error } = await supabase
    .from('pricing_tiers')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating pricing tier:', error);
    throw new Error('Failed to update pricing tier');
  }

  return data as PricingTier;
}

/**
 * Crear nuevo pricing tier (ADMIN ONLY)
 */
export async function createPricingTier(input: PricingTierInput) {
  const { data, error } = await supabase
    .from('pricing_tiers')
    .insert([input])
    .select()
    .single();

  if (error) {
    console.error('Error creating pricing tier:', error);
    throw new Error('Failed to create pricing tier');
  }

  return data as PricingTier;
}

/**
 * Eliminar un pricing tier (ADMIN ONLY)
 */
export async function deletePricingTier(id: string) {
  const { error } = await supabase
    .from('pricing_tiers')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting pricing tier:', error);
    throw new Error('Failed to delete pricing tier');
  }
}

/**
 * Obtener precio para una cantidad específica de monedas
 */
export async function getCoinPrice(platform: 'PS' | 'Xbox' | 'PC', quantity: string) {
  const { data: products, error: productError } = await supabase
    .from('products')
    .select('id')
    .eq('category', 'monedas');

  if (productError) throw new Error('Failed to fetch products');

  const productIds = products?.map((p) => p.id) || [];

  if (productIds.length === 0) return null;

  const { data, error } = await supabase
    .from('pricing_tiers')
    .select('*')
    .in('product_id', productIds)
    .eq('platform', platform)
    .eq('key', quantity)
    .single();

  if (error) return null;

  return data as PricingTier;
}

/**
 * Obtener precio para un rango de boosting específico
 */
export async function getBoostPrice(
  category: 'futchampions' | 'divisionrivals' | 'objetivos',
  platform: 'PS' | 'Xbox' | 'PC',
  key: string
) {
  const { data: products, error: productError } = await supabase
    .from('products')
    .select('id')
    .eq('category', category);

  if (productError) throw new Error('Failed to fetch products');

  const productIds = products?.map((p) => p.id) || [];

  if (productIds.length === 0) return null;

  const { data, error } = await supabase
    .from('pricing_tiers')
    .select('*')
    .in('product_id', productIds)
    .eq('platform', platform)
    .eq('key', key)
    .single();

  if (error) return null;

  return data as PricingTier;
}
