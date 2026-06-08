import { PricesManager } from '@/components/dashboard/PricesManager';

export const DashboardPricesPage = () => {
  return (
    <div className="space-y-6 text-stone-800 dark:text-stone-100">
      <div>
        <h1 className="text-3xl font-bold">Gestionar Precios</h1>
        <p className="mt-2 text-gray-500 dark:text-stone-400">
          Administra los precios de monedas, boosting y fut champions por plataforma
        </p>
      </div>

      {/* Prices Manager */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
        <PricesManager />
      </div>
    </div>
  );
}
