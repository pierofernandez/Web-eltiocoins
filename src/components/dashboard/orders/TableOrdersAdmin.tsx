import { useNavigate } from 'react-router-dom';
import { formatDateLong, formatPrice } from '../../../helpers';
import { OrderWithCustomer } from '../../interfaces';
import { useChangeStatusOrder } from '../../../hooks';
import { useCurrencyStore } from '../../../store/currency.store';
import { getCoinAutoDeliveryRow } from './CoinAutoDeliveryCard';

const tableHeaders = ['Cliente', 'Entrega EA', 'Fecha', 'Estado', 'Total'];

const statusOptions = [
	{ value: 'Pending', label: 'Pendiente' },
	{ value: 'Paid', label: 'Pagado' },
	{ value: 'Shipped', label: 'Enviado' },
	{ value: 'Delivered', label: 'Entregado' },
];

interface Props {
	orders: OrderWithCustomer[];
}

export const TableOrdersAdmin = ({ orders }: Props) => {
	const navigate = useNavigate();
	const { currency, rates, baseCurrency } = useCurrencyStore();

	const { mutate } = useChangeStatusOrder();

	const handleStatusChange = (id: number, status: string) => {
		mutate({ id, status });
	};

	return (
		<div className='relative h-full w-full rounded-lg border border-gray-200 bg-white p-5 dark:border-stone-700 dark:bg-stone-900'>
			<table className='w-full caption-bottom overflow-auto text-sm'>
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
					{orders.map(order => {
						const autoDelivery = getCoinAutoDeliveryRow(order.coin_auto_delivery);

						return (
						<tr
							key={order.id}
							className='cursor-pointer transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-stone-800'
							onClick={() =>
								navigate(`/dashboard/ordenes/${order.id}`)
							}
						>
							<td className='flex flex-col gap-1 p-4 font-medium tracking-tighter'>
								<span className='font-semibold'>
									{order.customers?.full_name}
								</span>
								<span className='text-stone-500 dark:text-stone-400'>{order.customers?.email}</span>
							</td>
							<td className='p-4 font-medium tracking-tighter'>
								{autoDelivery ? (
									<div className='flex max-w-[220px] flex-col gap-1'>
										<span className='w-fit rounded-full bg-[#00FF87]/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-[#00a855] dark:text-[#00FF87]'>
											Monedas
										</span>
										<span className='truncate text-sm font-semibold text-stone-800 dark:text-stone-100'>
											{autoDelivery.client_name}
										</span>
										<span className='truncate text-xs text-stone-500 dark:text-stone-400'>
											{autoDelivery.ea_email}
										</span>
									</div>
								) : (
									<span className='text-xs text-stone-400'>—</span>
								)}
							</td>
							<td className='p-4 font-medium tracking-tighter'>
								{formatDateLong(order.created_at)}
							</td>
							<td className='p-4 font-medium tracking-tighter' onClick={e => e.stopPropagation()}>
								<select
									className='rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100'
									value={order.status}
									onChange={e => handleStatusChange(order.id, e.target.value)}
								>
									{statusOptions.map(option => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</td>
							<td className='p-4 font-medium tracking-tighter'>
								{formatPrice(order.total_amount, currency, rates, baseCurrency)}
							</td>
						</tr>
					);
					})}
				</tbody>
			</table>
		</div>
	);
};
