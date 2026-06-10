import { HiOutlineShoppingBag } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { FiTrash2, FiZap, FiShield } from 'react-icons/fi';
import { CartItem } from './CartItem';
import { useGlobalStore } from '../../store/global.store';
import { useCartStore } from '../../store/cart.store';
import { useCurrencyStore } from '../../store/currency.store';
import { formatPrice } from '../../helpers';

export const Cart = () => {
	const closeSheet = useGlobalStore(state => state.closeSheet);
	const cartItems = useCartStore(state => state.items);
	const cleanCart = useCartStore(state => state.cleanCart);
	const totalItemsInCart = useCartStore(state => state.totalItemsInCart);
	const subtotal = useCartStore(state => state.subtotal);
	const discount = useCartStore(state => state.discount);
	const totalAmount = useCartStore(state => state.totalAmount);
	const { currency, rates, baseCurrency } = useCurrencyStore();

	const money = (value: number) => formatPrice(value, currency, rates, baseCurrency);

	return (
		<div className="flex h-full flex-col bg-[#0b0b0b] font-sans text-white">
			{/* ENCABEZADO */}
			<div className="flex items-center justify-between border-b border-[#1f1f1f] bg-gradient-to-r from-[#0f0f0f] to-[#161616] px-6 py-5">
				<div className="flex items-center gap-3">
					<span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00FF87]/15 text-[#00FF87]">
						<HiOutlineShoppingBag size={20} />
					</span>
					<div>
						<h2 className="text-base font-extrabold uppercase tracking-widest text-white">
							Tu carrito
						</h2>
						<p className="text-xs text-zinc-400">
							{totalItemsInCart} producto{totalItemsInCart !== 1 && 's'}
						</p>
					</div>
				</div>
				<button
					onClick={closeSheet}
					className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1f1f1f] text-zinc-400 transition-colors duration-200 hover:border-[#ff4d6d]/40 hover:text-[#ff4d6d]"
					aria-label="Cerrar"
				>
					<IoMdClose size={20} />
				</button>
			</div>

			{/* CONTENIDO */}
			{totalItemsInCart > 0 ? (
				<>
					<div className="flex-1 overflow-auto px-5 py-5">
						<ul className="space-y-4">
							{cartItems.map(item => (
								<CartItem item={item} key={item.variantId} />
							))}
						</ul>

						<button
							onClick={cleanCart}
							className="mt-5 flex items-center gap-2 text-xs font-medium text-zinc-500 transition-colors hover:text-[#ff4d6d]"
						>
							<FiTrash2 size={14} />
							Vaciar carrito
						</button>
					</div>

					{/* RESUMEN + ACCIONES */}
					<div className="border-t border-[#1f1f1f] bg-gradient-to-r from-[#0f0f0f] to-[#161616] p-6">
						{/* Resumen */}
						<div className="mb-4 space-y-2 text-sm">
							<div className="flex items-center justify-between text-zinc-400">
								<span>Subtotal</span>
								<span className="font-medium text-zinc-200">{money(subtotal)}</span>
							</div>
							{discount > 0 && (
								<div className="flex items-center justify-between text-[#00FF87]">
									<span>Descuento</span>
									<span className="font-medium">- {money(discount)}</span>
								</div>
							)}
							<div className="my-2 border-t border-dashed border-[#262626]"></div>
							<div className="flex items-center justify-between">
								<span className="text-base font-bold text-white">Total</span>
								<span className="text-xl font-extrabold text-[#00FF87]">
									{money(totalAmount)}
								</span>
							</div>
						</div>

						<Link
							to="/checkout"
							onClick={closeSheet}
							className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#00FF87] to-[#00cc6a] py-3.5 text-sm font-extrabold uppercase tracking-widest text-black shadow-[0_0_20px_#00ff8744] transition-all duration-300 hover:from-[#00e07a] hover:to-[#00a85a] active:scale-[0.99]"
						>
							<RiSecurePaymentLine size={20} />
							Finalizar compra
						</Link>

						{/* Sellos de confianza */}
						<div className="mt-4 flex items-center justify-center gap-5 text-[11px] text-zinc-500">
							<span className="flex items-center gap-1.5">
								<FiShield size={13} className="text-[#00FF87]" />
								Pago seguro
							</span>
							<span className="flex items-center gap-1.5">
								<FiZap size={13} className="text-[#00FF87]" />
								Entrega rápida
							</span>
						</div>
					</div>
				</>
			) : (
				<div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
					<span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#111] text-zinc-600">
						<HiOutlineShoppingBag size={36} />
					</span>
					<div className="space-y-1">
						<p className="text-base font-bold text-white">Tu carrito está vacío</p>
						<p className="text-sm text-zinc-500">
							Agrega monedas o boosting para empezar
						</p>
					</div>
					<Link
						to="/monedas"
						onClick={closeSheet}
						className="rounded-xl bg-gradient-to-r from-[#00FF87] to-[#00cc6a] px-7 py-3 text-xs font-extrabold uppercase tracking-widest text-black shadow-[0_0_15px_#00ff8755] transition-colors hover:from-[#00e07a] hover:to-[#00a85a]"
					>
						Empezar a comprar
					</Link>
				</div>
			)}
		</div>
	);
};
