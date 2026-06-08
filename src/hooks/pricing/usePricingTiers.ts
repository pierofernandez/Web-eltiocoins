import { useQuery } from '@tanstack/react-query';
import { getPricingTiersByCategoryAndPlatform } from '@/actions/priceService';
import { fetchTiersForPlatformGroup, PlatformGroup } from '@/helpers/pricing.helpers';
import { PricingCategory } from '@/components/interfaces/pricing.interface';

export const usePricingTiers = (category: PricingCategory, platformGroup: PlatformGroup) =>
  useQuery({
    queryKey: ['pricing-tiers', category, platformGroup],
    queryFn: () =>
      fetchTiersForPlatformGroup(
        (platform) => getPricingTiersByCategoryAndPlatform(category, platform),
        platformGroup
      ),
    staleTime: 1000 * 60 * 5,
  });
