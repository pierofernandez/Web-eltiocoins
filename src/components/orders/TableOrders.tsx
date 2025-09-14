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
		<div className='relative w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-1 shadow-xl'>
			<div className='bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 overflow-hidden backdrop-blur-sm'>
				{/* Vista Desktop - Tabla */}
				<div className='hidden md:block overflow-x-auto'>
					<table className='text-sm w-full caption-bottom min-w-[600px]'>
						<thead className='bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 border-b border-slate-200 dark:border-slate-600'>
							<tr className='text-sm font-semibold'>
								{tableHeaders.map((header, index) => (
									<th key={index} className='h-14 px-6 text-left text-slate-700 dark:text-slate-200 uppercase tracking-wider text-xs'>
										<div className='flex items-center space-x-2'>
											<span>{header}</span>
											<div className='w-1 h-1 bg-indigo-400 rounded-full opacity-60'></div>
										</div>
									</th>
								))}
							</tr>
						</thead>

						<tbody className='divide-y divide-slate-100 dark:divide-slate-700'>
							{orders.map((order) => (
								<tr
									key={order.id}
									className='group cursor-pointer hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-slate-700/30 dark:hover:to-slate-600/30 transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-md'
									onClick={() => navigate(`/account/pedidos/${order.id}`)}
								>
									<td className='p-6 font-bold tracking-tight text-slate-900 dark:text-slate-100'>
										<div className='flex items-center space-x-3'>
											<div className='w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-70 group-hover:opacity-100 transition-opacity'></div>
											<span className='group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'>
												#{order.id}
											</span>
										</div>
									</td>
									<td className='p-6 font-medium tracking-tight text-slate-600 dark:text-slate-300'>
										<div className='flex flex-col'>
											<span className='group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors'>
												{formatDateLong(order.created_at)}
											</span>
											<div className='w-8 h-0.5 bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-slate-600 dark:to-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300'></div>
										</div>
									</td>
									<td className='p-6 font-medium tracking-tight'>
										<span className='inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 group-hover:shadow-sm transition-shadow'>
											<div className='w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 animate-pulse'></div>
											{getStatus(order.status)}
										</span>
									</td>
									<td className='p-6 font-bold tracking-tight text-slate-900 dark:text-slate-100'>
										<div className='flex items-center justify-between'>
											<span className='text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'>
												{formatPrice(order.total_amount, currency, rates, baseCurrency)}
											</span>
											<div className='w-5 h-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-200'>
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
				<div className='md:hidden space-y-3 p-4'>
					{orders.map((order) => (
						<div
							key={order.id}
							className='group cursor-pointer bg-gradient-to-r from-white to-slate-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-4 border border-slate-200 dark:border-slate-600 hover:shadow-lg hover:scale-[1.02] transition-all duration-300'
							onClick={() => navigate(`/account/pedidos/${order.id}`)}
						>
							<div className='flex items-center justify-between mb-3'>
								<div className='flex items-center space-x-2'>
									<div className='w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full'></div>
									<span className='font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'>
										#{order.id}
									</span>
								</div>
								<div className='w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-200'>
									<svg viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
									</svg>
								</div>
							</div>
							
							<div className='space-y-2'>
								<div className='flex justify-between items-center'>
									<span className='text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider'>Fecha</span>
									<span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
										{formatDateLong(order.created_at)}
									</span>
								</div>
								
								<div className='flex justify-between items-center'>
									<span className='text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider'>Estado</span>
									<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'>
										<div className='w-1 h-1 bg-emerald-400 rounded-full mr-1.5 animate-pulse'></div>
										{getStatus(order.status)}
									</span>
								</div>
								
								<div className='flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-600'>
									<span className='text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider'>Total</span>
									<span className='text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'>
										{formatPrice(order.total_amount, currency, rates, baseCurrency)}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};