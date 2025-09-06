import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useGlobalStore } from '../../store/global.store';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { CartItem } from './CartItem';
import { useCartStore } from '../../store/cart.store';

export const Cart = () => {

	const closeSheet = useGlobalStore(state => state.closeSheet);
	const cartItems = useCartStore(state => state.items);
	const cleanCart = useCartStore(state => state.cleanCart);
	const totalItemsInCart = useCartStore(state => state.totalItemsInCart);

	return (
		<div className="flex flex-col h-full bg-[#0b0e14] text-white font-sans tracking-wide">
			{/* ENCABEZADO */}
			<div className="px-6 py-5 flex justify-between items-center border-b border-[#222] bg-[#111827] shadow-[0_0_10px_#00f2ff33]">
				<span className="flex gap-3 items-center font-bold uppercase text-sm text-[#00F2FF]">
					<HiOutlineShoppingBag size={20} />
					{totalItemsInCart} ITEM{totalItemsInCart !== 1 && 'S'}
				</span>
				<button
					onClick={closeSheet}
					className="hover:text-[#FF4D6D] transition-colors duration-200"
				>
					<IoMdClose size={24} />
				</button>
			</div>

			{/* CONTENIDO */}
			{totalItemsInCart > 0 ? (
				<>
					<div className="p-6 overflow-auto flex-1 bg-[#0f121a]">
						<ul className="space-y-6">
							{cartItems.map(item => (
								<CartItem item={item} key={item.variantId} />
							))}
						</ul>
					</div>

					{/* ACCIONES */}
					<div className="p-6 border-t border-[#1f1f1f] bg-[#111827] shadow-[0_-2px_10px_#00f2ff1a]">
						<Link
							to="/checkout"
							className="w-full bg-gradient-to-r from-[#00F2FF] to-[#3B82F6] hover:from-[#00d0e0] hover:to-[#2563eb] transition-all duration-300 text-black py-3 rounded-md flex items-center justify-center gap-3 font-bold text-sm uppercase tracking-widest shadow-[0_0_10px_#00f2ff66]"
						>
							<RiSecurePaymentLine size={22} />
							Continuar
						</Link>

						<button
							onClick={cleanCart}
							className="mt-4 w-full text-[#FF4D6D] border border-[#FF4D6D] hover:bg-[#ff4d6d1a] transition-all duration-200 rounded-md py-3 font-semibold tracking-wider shadow-[0_0_10px_#ff4d6d33]"
						>
							Limpiar Carrito
						</button>
					</div>
				</>
			) : (
				<div className="flex flex-col items-center justify-center h-full gap-6 text-center px-6 bg-[#0f121a]">
					<p className="text-[#888] text-sm font-medium uppercase tracking-wider">
						Tu carrito está vacío
					</p>
					<Link
						to="/monedas"
						onClick={closeSheet}
						className="py-3 px-6 bg-gradient-to-r from-[#00F2FF] to-[#3B82F6] hover:from-[#00c4d4] hover:to-[#2563eb] transition-colors rounded-md text-black text-xs font-extrabold uppercase tracking-widest shadow-[0_0_10px_#00f2ff55]"
					>
						Empezar a comprar
					</Link>
				</div>
			)}
		</div>
	);
};
