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
	const totalItemsInCart = useCartStore(
		state => state.totalItemsInCart
	);


	return (
		<div className='flex flex-col h-full bg-[#151616]'> 
			<div className='px-5 py-7 flex justify-between items-center border-b border-white'>
				<span className=' text-white flex gap-3 items-center font-semibold'>
					<HiOutlineShoppingBag className='text-white' size={20} />
					{totalItemsInCart} artículos
				</span>
				<button onClick={closeSheet}>
					<IoMdClose size={25} className='text-white' />
				</button>
			</div>

			{totalItemsInCart > 0 ? (
				<>
					{/* LISTA DE PRODUCTOS AÑADIDOS AL CARRITO */}
					<div className='p-7 overflow-auto flex-1'>
						<ul className='space-y-9'>
							{cartItems.map(item => (
								<CartItem item={item} key={item.variantId} />
							))}
						</ul>
					</div>

					{/* BOTONES ACCIÓN */}
					<div className='mt-4 p-7'>
						<Link
							to='/checkout'
							className='w-full bg-[#323232]  text-white py-3.5 rounded-full flex items-center justify-center gap-3'
						>
							<RiSecurePaymentLine size={24} />
							Continuar con la compra
						</Link>

						<button
							className='mt-3 w-full text-white border border-white rounded-full py-3'
							onClick={cleanCart}
						>
							Limpiar Carrito
						</button>
					</div>
				</>
			) : (
				<div className='flex flex-col items-center justify-center h-full gap-7'>
					<p className='text-sm text-white font-medium tracking-tight'>
						Su carro esta vacío
					</p>
					<Link
						to='/monedas'
						className='py-4 bg-[#323232] rounded-full text-white px-7 text-xs uppercase tracking-widest font-semibold'
						onClick={closeSheet}
					>
						Empezar a comprar
					</Link>
				</div>
			)}
		</div>
	);
};

