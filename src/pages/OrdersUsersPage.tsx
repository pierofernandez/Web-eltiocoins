import { Link } from 'react-router-dom';
import { useOrders } from '../hooks';
import Loader from '../components/shared/Loader';
import { TableOrders } from '../components/orders/TableOrders';

export const OrdersUserPage = () => {

	const { data: orders, isLoading} = useOrders();

	if ( isLoading || !orders ) return <Loader/> 




	return (
		<div className='flex flex-col gap-6 items-center'>
			<div className='flex items-center gap-2'>
				<h1 className='text-3xl font-bold text-white'>Pedidos</h1>
				<span className='flex h-6 min-w-6 items-center justify-center rounded-full bg-[#70F468] px-1.5 text-xs font-bold text-black'>
					{orders.length}
				</span>
			</div>

			{orders.length === 0 ? (
				<div className='flex flex-col items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-8 py-12 text-center'>
					<p className='text-sm text-zinc-400'>
						Todavía no has hecho ningún pedido
					</p>
					<Link
						to='/monedas'
						className='rounded-full bg-[#70F468] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-[#5fe357]'
					>
						Empezar a comprar
					</Link>
				</div>
			) : (
				<TableOrders orders={orders} />
			)}
		</div>
	);
};