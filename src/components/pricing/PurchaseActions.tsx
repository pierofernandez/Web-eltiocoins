import { BsWhatsapp } from 'react-icons/bs';
import { LuZap } from 'react-icons/lu';

interface PurchaseActionsProps {
  onWhatsApp: () => void;
  onAutoPurchase: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const PurchaseActions = ({
  onWhatsApp,
  onAutoPurchase,
  disabled = false,
  loading = false,
}: PurchaseActionsProps) => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
    <button
      type="button"
      onClick={onWhatsApp}
      disabled={disabled || loading}
      className="group flex flex-col items-start gap-1 rounded-2xl border border-zinc-600 bg-[#1a1a1a] px-5 py-4 text-left transition hover:border-green-500/50 hover:bg-[#1f1f1f] disabled:opacity-50"
    >
      <div className="flex items-center gap-2 text-green-400">
        <BsWhatsapp size={20} />
        <span className="font-bold text-white">Por WhatsApp</span>
      </div>
      <span className="text-xs text-zinc-500">Chatea con nosotros y te guiamos</span>
    </button>

    <button
      type="button"
      onClick={onAutoPurchase}
      disabled={disabled || loading}
      className="relative flex flex-col items-start gap-1 rounded-2xl border-2 border-[#00FF87]/60 bg-[#00FF87]/5 px-5 py-4 text-left transition hover:border-[#00FF87] hover:bg-[#00FF87]/10 hover:shadow-[0_0_16px_#00ff8733] disabled:opacity-50"
    >
      <span className="absolute -top-2.5 right-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-black">
        Rápido
      </span>
      <div className="flex items-center gap-2 text-[#00FF87]">
        <LuZap size={20} />
        <span className="font-bold text-white">Compra Automática</span>
      </div>
      <span className="text-xs text-zinc-500">Paga y recibe al instante</span>
    </button>
  </div>
);
