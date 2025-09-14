import { LuMinus, LuPlus } from 'react-icons/lu';
import { formatPrice } from '../../helpers';
import { useCurrencyStore } from '../../store/currency.store';
import { useCartStore } from '../../store/cart.store';

export interface ICartItem {
	variantId: string;
	productId: string;
	name: string;
	color: string;
	price: number;
	quantity: number;
	image: string;
}

interface Props {
	item: ICartItem;
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


	return (
		<li className="flex items-center gap-5 text-white bg-[#141414] p-4 rounded-lg shadow-[0_0_10px_#00ff8722]">
			{/* Imagen con estilo EA FC */}
			<div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border border-[#00FF87] bg-[#0d0d0d] shadow-[0_0_8px_#00ff8744]">
				<img
					src={item.image}
					alt={item.name}
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Información */}
			<div className="flex-1 space-y-2">
				<div className="flex justify-between items-center">
					<p className="font-semibold text-sm">{item.name}</p>
					<p className="text-sm font-bold text-[#00FF87]">
						{formatPrice(item.price, currency, rates, baseCurrency)}
					</p>
				</div>

				<p className="text-xs text-gray-400">{item.productId}</p>

				<div className="flex items-center gap-4">
					{/* Controles de cantidad */}
					<div className="flex items-center gap-4 px-2 py-1 border border-[#2a2a2a] rounded-full bg-[#1a1a1a]">
						<button
							onClick={decrement}
							disabled={item.quantity === 1}
						>
							<LuMinus className="text-white" size={15} />
						</button>
						<span className="text-white text-sm">
							{item.quantity}
						</span>
						<button onClick={increment}>
							<LuPlus className="text-white" size={15} />
						</button>
					</div>

					<button
						className="text-[#ff4d6d] font-medium text-[11px] hover:underline"
						onClick={() => removeItem(item.variantId)}
					>
						Eliminar
					</button>
				</div>
			</div>
		</li>
	);
};
