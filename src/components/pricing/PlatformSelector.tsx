import { PlatformGroup } from '@/helpers/pricing.helpers';

interface PlatformSelectorProps {
  value: PlatformGroup;
  onChange: (group: PlatformGroup) => void;
}

const activeClass =
  'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25 border border-green-400/30';
const inactiveClass =
  'border border-zinc-600 bg-[#1a1a1a] text-zinc-300 hover:border-green-400/50 hover:text-green-400';

export const PlatformSelector = ({ value, onChange }: PlatformSelectorProps) => (
  <div className="flex gap-2">
    <button
      type="button"
      onClick={() => onChange('console')}
      className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
        value === 'console' ? activeClass : inactiveClass
      }`}
    >
      PS / Xbox
    </button>
    <button
      type="button"
      onClick={() => onChange('pc')}
      className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
        value === 'pc' ? activeClass : inactiveClass
      }`}
    >
      PC
    </button>
  </div>
);
