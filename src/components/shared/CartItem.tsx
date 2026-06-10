import { LuMinus, LuPlus, LuTrash2 } from 'react-icons/lu';
import { formatPrice } from '../../helpers';
import { useCurrencyStore } from '../../store/currency.store';
import { useCartStore } from '../../store/cart.store';
import { CartItemWithPricing } from '../interfaces/pricing.interface';
import { getPlatformLabel } from '../../helpers/pricing.helpers';

/** @deprecated Usar CartItemWithPricing directamente */
export type ICartItem = CartItemWithPricing;

interface Props {
  item: CartItemWithPricing;
}

export const CartItem = ({ item }: Props) => {
  const removeItem = useCartStore(state => state.removeItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const { currency, rates, baseCurrency } = useCurrencyStore();

  const increment = () => {
    updateQuantity(item.variantId, item.quantity + 1);
  };

  const decrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.variantId, item.quantity - 1);
    }
  };

  const subtitle = item.platform
    ? `${getPlatformLabel(item.platform)}${item.key ? ` · ${item.key}` : ''}`
    : item.color || item.productId;

  return (
    <li className="flex gap-4 rounded-xl border border-[#1f1f1f] bg-[#141414] p-3 text-white transition-colors duration-200 hover:border-[#00FF87]/30">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#0d0d0d]">
        <img loading="lazy" src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{item.name}</p>
            <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>
          </div>
          <button
            className="flex-shrink-0 text-zinc-500 transition-colors hover:text-[#ff4d6d]"
            onClick={() => removeItem(item.variantId)}
            aria-label="Eliminar"
          >
            <LuTrash2 size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-2 py-1">
            <button
              onClick={decrement}
              disabled={item.quantity === 1}
              className="text-white transition-colors hover:text-[#00FF87] disabled:opacity-40"
            >
              <LuMinus size={14} />
            </button>
            <span className="min-w-[18px] text-center text-sm font-semibold">
              {item.quantity}
            </span>
            <button onClick={increment} className="text-white transition-colors hover:text-[#00FF87]">
              <LuPlus size={14} />
            </button>
          </div>

          <p className="text-sm font-bold text-[#00FF87]">
            {formatPrice(item.price * item.quantity, currency, rates, baseCurrency)}
          </p>
        </div>
      </div>
    </li>
  );
};
