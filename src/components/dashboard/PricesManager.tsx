'use client';

import { useState, useEffect } from 'react';
import { getPricingTiersByCategory } from '@/actions/priceService';
import { PricingTier } from '@/components/interfaces/pricing.interface';
import { PricingTable } from './PricingTable';

export const PricesManager = () => {
  const [coinPrices, setCoinPrices] = useState<PricingTier[]>([]);
  const [futChampionPrices, setFutChampionPrices] = useState<PricingTier[]>([]);
  const [divisionRivalsPrices, setDivisionRivalsPrices] = useState<PricingTier[]>([]);
  const [activeTab, setActiveTab] = useState<'coins' | 'futchampions' | 'divisionrivals'>('coins');
  const [loading, setLoading] = useState(true);

  const loadPrices = async () => {
    try {
      setLoading(true);
      const [coins, futchampions, divisionrivals] = await Promise.all([
        getPricingTiersByCategory('monedas'),
        getPricingTiersByCategory('futchampions'),
        getPricingTiersByCategory('divisionrivals'),
      ]);

      setCoinPrices(coins);
      setFutChampionPrices(futchampions);
      setDivisionRivalsPrices(divisionrivals);
    } catch (error) {
      console.error('Error loading prices:', error);
      alert('Error al cargar precios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrices();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500 dark:text-stone-400">Cargando precios...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-stone-700">
        <button
          onClick={() => setActiveTab('coins')}
          className={`px-4 py-3 font-semibold transition ${
            activeTab === 'coins'
              ? 'border-b-2 border-orange-500 text-orange-500'
              : 'text-gray-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white'
          }`}
        >
          Monedas
        </button>
        <button
          onClick={() => setActiveTab('futchampions')}
          className={`px-4 py-3 font-semibold transition ${
            activeTab === 'futchampions'
              ? 'border-b-2 border-orange-500 text-orange-500'
              : 'text-gray-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white'
          }`}
        >
          Fut Champions
        </button>
        <button
          onClick={() => setActiveTab('divisionrivals')}
          className={`px-4 py-3 font-semibold transition ${
            activeTab === 'divisionrivals'
              ? 'border-b-2 border-orange-500 text-orange-500'
              : 'text-gray-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white'
          }`}
        >
          Division Rivals
        </button>
      </div>

      <div className="mt-6">
        {activeTab === 'coins' && (
          <PricingTable
            data={coinPrices}
            onDataChange={loadPrices}
            category="monedas"
            title="Precios de Monedas"
          />
        )}

        {activeTab === 'futchampions' && (
          <PricingTable
            data={futChampionPrices}
            onDataChange={loadPrices}
            category="futchampions"
            title="Precios Fut Champions (Rango 5 → 1)"
          />
        )}

        {activeTab === 'divisionrivals' && (
          <PricingTable
            data={divisionRivalsPrices}
            onDataChange={loadPrices}
            category="divisionrivals"
            title="Precios Division Rivals"
          />
        )}
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-700/50 dark:bg-blue-900/20 dark:text-blue-300">
        <p>
          <strong>Keys esperadas en Supabase:</strong> Monedas → <code className="rounded bg-blue-100 px-1 dark:bg-blue-950">100K</code>, <code className="rounded bg-blue-100 px-1 dark:bg-blue-950">500K</code>, <code className="rounded bg-blue-100 px-1 dark:bg-blue-950">1M</code>…
          {' '}| Fut Champions → <code className="rounded bg-blue-100 px-1 dark:bg-blue-950">Rango 5</code> a <code className="rounded bg-blue-100 px-1 dark:bg-blue-950">Rango 1</code>
          {' '}| Division Rivals → <code className="rounded bg-blue-100 px-1 dark:bg-blue-950">Division 3</code>, <code className="rounded bg-blue-100 px-1 dark:bg-blue-950">Division 2</code>, <code className="rounded bg-blue-100 px-1 dark:bg-blue-950">Division 1</code>, <code className="rounded bg-blue-100 px-1 dark:bg-blue-950">Division elite</code>
        </p>
      </div>
    </div>
  );
};
