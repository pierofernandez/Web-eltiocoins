'use client';

import { useState } from 'react';
import { PricingTier } from '@/components/interfaces/pricing.interface';
import { updatePricingTierPrice, deletePricingTier } from '@/actions/priceService';

interface PricingTableProps {
  data: PricingTier[];
  onDataChange: () => void;
  category: 'monedas' | 'futchampions' | 'divisionrivals' | 'objetivos';
  title: string;
}

const inputClass =
  'w-20 rounded border border-gray-300 bg-white px-2 py-1 text-stone-900 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100';

export const PricingTable = ({ data, onDataChange, category, title }: PricingTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ price: string; stock: string }>({ price: '', stock: '' });
  const [loading, setLoading] = useState(false);

  const handleEdit = (tier: PricingTier) => {
    setEditingId(tier.id);
    setEditValues({ price: tier.price_usd.toString(), stock: tier.stock.toString() });
  };

  const handleSave = async (id: string) => {
    try {
      setLoading(true);
      await updatePricingTierPrice(
        id,
        parseFloat(editValues.price),
        parseInt(editValues.stock)
      );
      setEditingId(null);
      onDataChange();
    } catch (error) {
      console.error('Error updating price:', error);
      alert('Error al actualizar precio');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este precio?')) return;

    try {
      setLoading(true);
      await deletePricingTier(id);
      onDataChange();
    } catch (error) {
      console.error('Error deleting price:', error);
      alert('Error al eliminar precio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-800">
      <h3 className="mb-4 text-xl font-bold text-stone-900 dark:text-white">{title}</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-stone-700 dark:text-stone-300">
          <thead className="border-b border-gray-200 text-left text-xs font-semibold uppercase text-gray-500 dark:border-stone-600 dark:text-stone-400">
            <tr>
              <th className="px-4 py-3">Plataforma</th>
              <th className="px-4 py-3">{category === 'monedas' ? 'Cantidad' : 'División'}</th>
              <th className="px-4 py-3">Precio USD</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((tier) => (
              <tr
                key={tier.id}
                className="border-b border-gray-200 transition-colors hover:bg-gray-50 dark:border-stone-700 dark:hover:bg-stone-700/50"
              >
                <td className="px-4 py-3 font-semibold text-stone-900 dark:text-white">
                  {tier.platform}
                </td>
                <td className="px-4 py-3">{tier.key}</td>
                <td className="px-4 py-3">
                  {editingId === tier.id ? (
                    <input
                      type="number"
                      value={editValues.price}
                      onChange={(e) =>
                        setEditValues({ ...editValues, price: e.target.value })
                      }
                      className={inputClass}
                      step="0.01"
                    />
                  ) : (
                    `$${tier.price_usd.toFixed(2)}`
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === tier.id ? (
                    <input
                      type="number"
                      value={editValues.stock}
                      onChange={(e) =>
                        setEditValues({ ...editValues, stock: e.target.value })
                      }
                      className={inputClass}
                    />
                  ) : (
                    tier.stock
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === tier.id ? (
                    <>
                      <button
                        onClick={() => handleSave(tier.id)}
                        disabled={loading}
                        className="mr-2 rounded bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="rounded bg-gray-500 px-3 py-1 text-xs font-semibold text-white hover:bg-gray-600 dark:bg-stone-600 dark:hover:bg-stone-500"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(tier)}
                        className="mr-2 rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(tier.id)}
                        className="rounded bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="py-8 text-center text-gray-500 dark:text-stone-400">
          No hay precios configurados para {title.toLowerCase()}
        </div>
      )}
    </div>
  );
};
