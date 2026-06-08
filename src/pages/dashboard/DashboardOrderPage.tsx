import { IoChevronBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrderAdmin } from '../../hooks';
import { Loader } from '../../components/shared/Loader';
import { formatPrice } from '../../helpers';
import { useCurrencyStore } from '../../store/currency.store';
import { CoinAutoDeliveryCard } from '../../components/dashboard/orders/CoinAutoDeliveryCard';

const tableHeaders = ['Producto', 'Cantidad', 'Total'];

export const DashboardOrderPage = () => {
	const navigate = useNavigate();
	const { currency, rates, baseCurrency } = useCurrencyStore();

	const { id } = useParams<{ id: string }>();

	const { data: order, isLoading } = useOrderAdmin(Number(id));

	if (isLoading) return <Loader />;

	if (!order) {
		return (
			<div className='flex h-[50vh] flex-col items-center justify-center gap-4 dark:text-stone-100'>
				<h1 className='text-2xl font-bold'>Pedido no encontrado</h1>
				<button
					className='flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-xs font-medium uppercase tracking-widest transition-all hover:bg-stone-100 dark:border-stone-600 dark:hover:bg-stone-800'
					onClick={() => navigate(-1)}
				>
					<IoChevronBack size={16} />
					Volver
				</button>
			</div>
		);
	}

	return (
		<div className='text-black dark:text-stone-100'>
			<div className='flex items-center justify-between'>
				<button
					className='flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-xs font-medium uppercase tracking-widest transition-all hover:bg-stone-100 dark:border-stone-600 dark:hover:bg-stone-800'
					onClick={() => navigate(-1)}
				>
					<IoChevronBack size={16} />
					Volver
				</button>

				<div className='flex flex-col items-center gap-1.5'>
					<h1 className='text-3xl font-bold'>Pedido #{id}</h1>
					<p className='text-sm'> FECHA</p>
				</div>
				<div />
				<div />
			</div>

			<div className='flex flex-col mt-10 mb-5 gap-10'>
				<table className='text-sm w-full caption-bottom overflow-auto'>
					<thead className='border-b border-gray-200 pb-3 dark:border-stone-700'>
						<tr className='text-sm font-bold'>
							{tableHeaders.map((header, index) => (
								<th key={index} className='h-12 px-4 text-left'>
									{header}
								</th>
							))}
						</tr>
					</thead>

					<tbody className='[&_tr:last-child]:border-0'>
						{order.orderItems.map((item, index) => (
							<tr key={index} className='border-b border-gray-200 dark:border-stone-700'>
								<td className='p-4 font-medium tracking-tighter flex gap-3 items-center'>
									<img loading="lazy" src={item.productImage}
										alt={item.productName}
										className='h-20 w-20 object-contain rounded-lg'
									/>

									<div className='space-y-2'>
										<h3>{item.productName}</h3>
										<p className='text-sm'>
											{formatPrice(item.price, currency, rates, baseCurrency)}
										</p>
									</div>
								</td>
								<td className='p-4 font-medium tracking-tighter text-center'>
									{item.quantity}
								</td>
								<td className='p-4 font-medium tracking-tighter text-center'>
									{formatPrice(item.price * item.quantity, currency, rates, baseCurrency)}
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className='flex w-1/2 flex-col gap-3 self-end text-sm text-slate-600 dark:text-stone-400'>
					<div className='flex justify-between'>
						<p>Subtotal</p>
						<p>{formatPrice(order.totalAmount, currency, rates, baseCurrency)}</p>
					</div>
					<div className='flex justify-between'>
						<p>Envío (Standard)</p>
						<p>{formatPrice(0, currency, rates, baseCurrency)}</p>
					</div>
					<div className='flex justify-between font-semibold text-black dark:text-stone-100'>
						<p>Total</p>
						<p>{formatPrice(order.totalAmount, currency, rates, baseCurrency)}</p>
					</div>
				</div>

				{order.autoDelivery && (
					<CoinAutoDeliveryCard
						data={{
							client_name: order.autoDelivery.clientName,
							ea_email: order.autoDelivery.eaEmail,
							ea_password: order.autoDelivery.eaPassword,
							backup_code_1: order.autoDelivery.backupCode1,
							backup_code_2: order.autoDelivery.backupCode2 ?? null,
							backup_code_3: order.autoDelivery.backupCode3 ?? null,
						}}
					/>
				)}

				<div className='flex flex-col gap-3'>
					<h2 className='text-lg font-bold'>
						{order.autoDelivery ? 'Cliente registrado' : 'Dirección'}
					</h2>

					<div className='flex flex-col gap-5 border border-stone-300 p-5 dark:border-stone-600 dark:bg-stone-900'>
						<div className='space-y-1'>
							<h3 className='font-medium'>Cliente:</h3>
							<p>{order.customer.full_name}</p>
							<p className='text-sm text-stone-500 dark:text-stone-400'>{order.customer.email}</p>
						</div>

						{!order.autoDelivery && order.address?.city && (
							<div className='flex flex-col gap-1 text-sm'>
								<h3 className='font-medium text-base'>Envío:</h3>
								<p>{order.address.city}</p>
								<p>{order.address.state}</p>
								<p>{order.address.postalCode}</p>
								<p>{order.address.country}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};