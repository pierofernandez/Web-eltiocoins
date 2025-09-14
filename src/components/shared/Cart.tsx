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
		<div className="flex flex-col h-full bg-[#0b0b0b] text-white font-sans tracking-wide">
			{/* ENCABEZADO */}
			<div className="px-6 py-5 flex justify-between items-center border-b border-[#1f1f1f] bg-gradient-to-r from-[#0f0f0f] to-[#161616] shadow-[0_0_15px_#00ff8733]">
				<span className="flex gap-3 items-center font-extrabold uppercase text-sm text-[#00FF87] tracking-widest">
					<HiOutlineShoppingBag size={20} />
					{totalItemsInCart} ITEM{totalItemsInCart !== 1 && 'S'}
				</span>
				<button
					onClick={closeSheet}
					className="hover:text-[#ff4d6d] transition-colors duration-200"
				>
					<IoMdClose size={24} />
				</button>
			</div>

			{/* CONTENIDO */}
			{totalItemsInCart > 0 ? (
				<>
					<div className="p-6 overflow-auto flex-1 bg-[#111]">
						<ul className="space-y-6">
							{cartItems.map(item => (
								<CartItem item={item} key={item.variantId} />
							))}
						</ul>
					</div>

					{/* ACCIONES */}
					<div className="p-6 border-t border-[#1f1f1f] bg-gradient-to-r from-[#0f0f0f] to-[#161616] shadow-[0_-4px_12px_#00ff8722]">
						<Link
							to="/checkout"
							className="w-full bg-gradient-to-r from-[#00FF87] to-[#00cc6a] hover:from-[#00e07a] hover:to-[#00a85a] transition-all duration-300 text-black py-3 rounded-lg flex items-center justify-center gap-3 font-extrabold text-sm uppercase tracking-widest shadow-[0_0_15px_#00ff8766]"
						>
							<RiSecurePaymentLine size={22} />
							Continuar
						</Link>

						<button
							onClick={cleanCart}
							className="mt-4 w-full text-[#ff4d6d] border border-[#ff4d6d] hover:bg-[#ff4d6d1a] transition-all duration-200 rounded-lg py-3 font-semibold tracking-wider shadow-[0_0_10px_#ff4d6d55]"
						>
							Limpiar Carrito
						</button>
					</div>
				</>
			) : (
				<div className="flex flex-col items-center justify-center h-full gap-6 text-center px-6 bg-[#111]">
					<p className="text-[#888] text-sm font-medium uppercase tracking-wider">
						Tu carrito está vacío
					</p>
					<Link
						to="/monedas"
						onClick={closeSheet}
						className="py-3 px-6 bg-gradient-to-r from-[#00FF87] to-[#00cc6a] hover:from-[#00e07a] hover:to-[#00a85a] transition-colors rounded-lg text-black text-xs font-extrabold uppercase tracking-widest shadow-[0_0_12px_#00ff8755]"
					>
						Empezar a comprar
					</Link>
				</div>
			)}
		</div>
	);
};
