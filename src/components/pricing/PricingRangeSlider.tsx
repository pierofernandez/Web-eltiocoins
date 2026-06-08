import { LuMinus, LuPlus } from 'react-icons/lu';

interface PricingRangeSliderProps {
  options: string[];
  value: string;
  onChange: (key: string) => void;
  label?: string;
  sublabel?: string;
  minTick?: string;
  maxTick?: string;
  tickLabels?: string[];
}

export const PricingRangeSlider = ({
  options,
  value,
  onChange,
  label = 'Selección',
  sublabel,
  minTick,
  maxTick,
  tickLabels,
}: PricingRangeSliderProps) => {
  const currentIndex = Math.max(0, options.indexOf(value));

  const goToIndex = (index: number) => {
    if (options.length === 0) return;
    const clamped = Math.max(0, Math.min(index, options.length - 1));
    onChange(options[clamped]);
  };

  const resolvedMinTick = minTick ?? (options.length > 0 ? options[0] : '');
  const resolvedMaxTick = maxTick ?? (options.length > 0 ? options[options.length - 1] : '');

  const sliderTicks =
    tickLabels ??
    (options.length >= 3
      ? [resolvedMinTick, options[Math.floor(options.length / 2)], resolvedMaxTick]
      : options);

  const controlBtn =
    'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-600 bg-[#1a1a1a] text-zinc-300 transition hover:border-[#00FF87] hover:text-[#00FF87] disabled:opacity-30';

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => goToIndex(currentIndex - 1)}
          disabled={currentIndex <= 0}
          className={controlBtn}
          aria-label="Disminuir"
        >
          <LuMinus size={20} />
        </button>

        <div className="min-w-[120px] text-center">
          <div className="text-3xl font-black tracking-tight text-white sm:text-4xl">{value}</div>
          {sublabel && (
            <div className="mt-0.5 text-xs font-medium text-[#00FF87]">{sublabel}</div>
          )}
          <div className="text-[10px] uppercase tracking-widest text-zinc-500">{label}</div>
        </div>

        <button
          type="button"
          onClick={() => goToIndex(currentIndex + 1)}
          disabled={currentIndex >= options.length - 1}
          className={controlBtn}
          aria-label="Aumentar"
        >
          <LuPlus size={20} />
        </button>
      </div>

      {options.length > 1 && (
        <div className="px-1">
          <input
            type="range"
            min={0}
            max={options.length - 1}
            step={1}
            value={currentIndex}
            onChange={(e) => goToIndex(Number(e.target.value))}
            className="pricing-range-slider h-2 w-full cursor-pointer appearance-none rounded-full"
            aria-label={label}
          />
          <div className="mt-2 flex justify-between gap-1 text-[10px] font-medium text-zinc-500">
            {sliderTicks.map((tick, i) => (
              <span key={`${tick}-${i}`} className="truncate">
                {tick}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
