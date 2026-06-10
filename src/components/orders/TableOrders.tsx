import { useNavigate } from 'react-router-dom';
import { OrderItemSingle } from '../interfaces';
import { formatDateLong, formatPrice, getStatus } from '../../helpers';
import { useCurrencyStore } from '../../store/currency.store';

interface Props {
	orders: OrderItemSingle[];
}

const tableHeaders = ['ID', 'Fecha', 'Estado', 'Total'];

export const TableOrders = ({ orders }: Props) => {
	const navigate = useNavigate();
	const { currency, rates, baseCurrency } = useCurrencyStore();

	return (
		<div className='relative h-full w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-xl backdrop-blur-sm'>
			{/* Vista Desktop - Tabla */}
			<div className='hidden md:block overflow-x-auto'>
				<table className='w-full caption-bottom min-w-[600px] text-sm'>
					<thead className='border-b border-zinc-800 bg-zinc-900'>
						<tr className='text-sm font-semibold'>
							{tableHeaders.map((header, index) => (
								<th key={index} className='h-14 px-6 text-left text-xs uppercase tracking-wider text-zinc-400'>
									<div className='flex items-center space-x-2'>
										<span>{header}</span>
										<div className='h-1 w-1 rounded-full bg-[#70F468] opacity-60'></div>
									</div>
								</th>
							))}
						</tr>
					</thead>

					<tbody className='divide-y divide-zinc-800'>
						{orders.map((order) => (
							<tr
								key={order.id}
								className='group cursor-pointer transition-colors duration-200 hover:bg-zinc-800/60'
								onClick={() => navigate(`/account/pedidos/${order.id}`)}
							>
								<td className='p-6 font-bold tracking-tight text-white'>
									<div className='flex items-center space-x-3'>
										<div className='h-2 w-2 rounded-full bg-[#70F468] opacity-70 transition-opacity group-hover:opacity-100'></div>
										<span className='transition-colors group-hover:text-[#70F468]'>
											#{order.id}
										</span>
									</div>
								</td>
								<td className='p-6 font-medium tracking-tight text-zinc-400'>
									<span className='transition-colors group-hover:text-zinc-200'>
										{formatDateLong(order.created_at)}
									</span>
								</td>
								<td className='p-6 font-medium tracking-tight'>
									<span className='inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400'>
										<div className='mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400'></div>
										{getStatus(order.status)}
									</span>
								</td>
								<td className='p-6 font-bold tracking-tight text-white'>
									<div className='flex items-center justify-between'>
										<span className='text-lg transition-colors group-hover:text-[#70F468]'>
											{formatPrice(order.total_amount, currency, rates, baseCurrency)}
										</span>
										<div className='h-5 w-5 text-zinc-500 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#70F468]'>
											<svg viewBox="0 0 20 20" fill="currentColor">
												<path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
											</svg>
										</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Vista Mobile - Cards */}
			<div className='space-y-3 p-4 md:hidden'>
				{orders.map((order) => (
					<div
						key={order.id}
						className='group cursor-pointer rounded-xl border border-zinc-800 bg-zinc-800/40 p-4 transition-all duration-300 hover:bg-zinc-800/80'
						onClick={() => navigate(`/account/pedidos/${order.id}`)}
					>
						<div className='mb-3 flex items-center justify-between'>
							<div className='flex items-center space-x-2'>
								<div className='h-2 w-2 rounded-full bg-[#70F468]'></div>
								<span className='font-bold text-white transition-colors group-hover:text-[#70F468]'>
									#{order.id}
								</span>
							</div>
							<div className='h-4 w-4 text-zinc-500 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#70F468]'>
								<svg viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
								</svg>
							</div>
						</div>

						<div className='space-y-2'>
							<div className='flex items-center justify-between'>
								<span className='text-xs font-medium uppercase tracking-wider text-zinc-500'>Fecha</span>
								<span className='text-sm font-medium text-zinc-300'>
									{formatDateLong(order.created_at)}
								</span>
							</div>

							<div className='flex items-center justify-between'>
								<span className='text-xs font-medium uppercase tracking-wider text-zinc-500'>Estado</span>
								<span className='inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400'>
									<div className='mr-1.5 h-1 w-1 animate-pulse rounded-full bg-emerald-400'></div>
									{getStatus(order.status)}
								</span>
							</div>

							<div className='flex items-center justify-between border-t border-zinc-800 pt-2'>
								<span className='text-xs font-medium uppercase tracking-wider text-zinc-500'>Total</span>
								<span className='text-lg font-bold text-white transition-colors group-hover:text-[#70F468]'>
									{formatPrice(order.total_amount, currency, rates, baseCurrency)}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};