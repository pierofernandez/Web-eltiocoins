import { ReactNode } from 'react';

interface PricingTierCardProps {
  promoLabel: string;
  pageTitle?: string;
  pageSubtitle?: string;
  isLoading?: boolean;
  isError?: boolean;
  children: ReactNode;
}

/** Caja principal — degradado verde que ocupa toda la tarjeta */
export const PricingTierCard = ({
  promoLabel,
  pageTitle,
  pageSubtitle,
  isLoading,
  isError,
  children,
}: PricingTierCardProps) => (
  <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#00FF87]/25 bg-gradient-to-b from-green-950/70 via-green-900/25 to-[#141414] shadow-[0_0_24px_#00ff8722]">
    <div className="h-1 bg-gradient-to-r from-green-500 via-[#00FF87] to-emerald-400" />

    {(pageTitle || pageSubtitle) && (
      <div className="border-b border-[#00FF87]/15 px-6 py-8 text-center">
        {pageTitle && (
          <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">{pageTitle}</h1>
        )}
        {pageSubtitle && (
          <p className="mx-auto max-w-md text-sm text-gray-300 sm:text-base">{pageSubtitle}</p>
        )}
      </div>
    )}

    <div className="px-6 py-5">
      <h2 className="mb-6 text-center text-sm font-bold tracking-widest text-[#00FF87]">
        {promoLabel}
      </h2>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#00FF87] border-t-transparent" />
        </div>
      ) : (
        <>
          {isError && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
              Error al cargar precios. Intenta de nuevo.
            </div>
          )}
          {children}
        </>
      )}
    </div>
  </div>
);
