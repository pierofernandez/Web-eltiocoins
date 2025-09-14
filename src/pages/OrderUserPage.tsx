import { useNavigate, useParams } from 'react-router-dom';
import { useOrder } from '../hooks';
import { Loader } from '../components/shared/Loader';
import { IoChevronBack } from 'react-icons/io5';
import { formatDateLong, formatPrice } from '../helpers';
import { useCurrencyStore } from '../store/currency.store';

const tableHeaders = ['Producto', 'Cantidad', 'Total'];

export const OrderUserPage = () => {
	const { id } = useParams<{ id: string }>();

	const { data: order, isLoading } = useOrder(Number(id!));
	const { currency, rates, baseCurrency } = useCurrencyStore();

	const navigate = useNavigate();

	if (isLoading || !order) return <Loader />;

	return (
		<div className='min-h-screen from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 lg:p-8'>
			<div className='max-w-6xl mx-auto space-y-8'>
				{/* Header Section */}
				<div className='rounded-2xl border-slate-200/50 dark:border-slate-700/50 p-6 lg:p-8'>
					<div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
						<button
							className='inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 border border-indigo-200 dark:border-slate-600 rounded-xl text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-slate-600 dark:hover:to-slate-500 hover:shadow-lg transform hover:scale-105 transition-all duration-300'
							onClick={() => navigate(-1)}
						>
							<IoChevronBack size={18} />
							Volver a los pedidos
						</button>
						
						<div className='text-center space-y-2'>
							<div className='flex items-center justify-center gap-3'>
								<div className='w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse'></div>
								<h1 className='text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent'>
									Pedido #{id}
								</h1>
								<div className='w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse'></div>
							</div>
							<p className='text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-full'>
								{formatDateLong(order.create_at)}
							</p>
						</div>
						
						<div className='md:w-[200px]'></div>
					</div>
				</div>

				{/* Products Section */}
				<div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden'>
					<div className='p-6 lg:p-8 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-600'>
						<h2 className='text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-100'>Productos del Pedido</h2>
					</div>

					{/* Desktop Table View */}
					<div className='hidden lg:block overflow-x-auto'>
						<table className='text-sm w-full'>
							<thead className='bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600'>
								<tr>
									{tableHeaders.map((header, index) => (
										<th
											key={index}
											className='h-14 px-6 text-center uppercase tracking-wider text-slate-600 dark:text-slate-300 font-semibold text-xs'
										>
											<div className='flex items-center justify-center gap-2'>
												<span>{header}</span>
												<div className='w-1 h-1 bg-indigo-400 rounded-full opacity-60'></div>
											</div>
										</th>
									))}
								</tr>
							</thead>

							<tbody className='divide-y divide-slate-100 dark:divide-slate-700'>
								{order.orderItems.map((product, index) => (
									<tr key={index} className='hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-purple-50/30 dark:hover:from-slate-700/30 dark:hover:to-slate-600/30 transition-all duration-300'>
										<td className='p-6'>
											<div className='flex gap-4 items-center'>
												<div className='relative group'>
													<img
														src={product.productImage}
														alt={product.productName}
														className='h-20 w-20 object-contain rounded-xl border-2 border-slate-200 dark:border-slate-600 group-hover:shadow-lg transition-shadow duration-300'
													/>
													<div className='absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
												</div>
												<div className='space-y-2'>
													<h3 className='font-bold text-slate-800 dark:text-slate-100 text-base'>{product.productName}</h3>
													<p className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full inline-block'>
														{formatPrice(product.price, currency, rates, baseCurrency)}
													</p>
												</div>
											</div>
										</td>
										<td className='p-6 text-center'>
											<span className='inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-800 dark:text-emerald-300 font-bold rounded-full border-2 border-emerald-200 dark:border-emerald-800'>
												{product.quantity}
											</span>
										</td>
										<td className='p-6 text-center'>
											<span className='text-lg font-bold text-slate-800 dark:text-slate-100'>
												{formatPrice(product.price * product.quantity, currency, rates, baseCurrency)}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Mobile Card View */}
					<div className='lg:hidden space-y-4 p-4'>
						{order.orderItems.map((product, index) => (
							<div key={index} className='bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-4 border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-all duration-300'>
								<div className='flex gap-4 items-start mb-4'>
									<img
										src={product.productImage}
										alt={product.productName}
										className='h-16 w-16 object-contain rounded-lg border border-slate-200 dark:border-slate-600'
									/>
									<div className='flex-1 space-y-1'>
										<h3 className='font-bold text-slate-800 dark:text-slate-100 text-sm'>{product.productName}</h3>
										<p className='text-xs font-semibold text-indigo-600 dark:text-indigo-400'>
											{formatPrice(product.price, currency, rates, baseCurrency)}
										</p>
									</div>
								</div>
								
								<div className='flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-600'>
									<div className='flex items-center gap-2'>
										<span className='text-xs font-medium text-slate-500 dark:text-slate-400 uppercase'>Cant:</span>
										<span className='inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 font-bold rounded-full text-sm'>
											{product.quantity}
										</span>
									</div>
									<div className='text-right'>
										<span className='text-xs font-medium text-slate-500 dark:text-slate-400 uppercase block'>Total</span>
										<span className='font-bold text-slate-800 dark:text-slate-100'>
											{formatPrice(product.price * product.quantity, currency, rates, baseCurrency)}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Summary and Customer Info */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Order Summary */}
					<div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6 lg:p-8'>
						<h2 className='text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2'>
							<div className='w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full'></div>
							Resumen del Pedido
						</h2>
						
						<div className='space-y-4'>
							<div className='flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl'>
								<span className='font-medium text-slate-700 dark:text-slate-300'>Subtotal</span>
								<span className='font-semibold text-slate-800 dark:text-slate-100'>{formatPrice(order.totalAmount, currency, rates, baseCurrency)}</span>
							</div>
							<div className='flex justify-between items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border-2 border-indigo-200 dark:border-indigo-800'>
								<span className='font-bold text-indigo-800 dark:text-indigo-300 text-lg'>Total</span>
								<span className='font-bold text-indigo-800 dark:text-indigo-300 text-xl'>{formatPrice(order.totalAmount, currency, rates, baseCurrency)}</span>
							</div>
						</div>
					</div>

					{/* Customer Details */}
					<div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6 lg:p-8'>
						<h2 className='text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2'>
							<div className='w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full'></div>
							Detalle del Cliente
						</h2>

						<div className='space-y-6'>
							<div className='p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800'>
								<h3 className='font-semibold text-emerald-800 dark:text-emerald-300 text-sm uppercase tracking-wider mb-2'>Cliente</h3>
								<p className='font-bold text-slate-800 dark:text-slate-100 text-lg'>{order.customer.full_name}</p>
							</div>

							<div className='p-4 bg-slate-50 dark:bg-slate-700 rounded-xl space-y-3'>
								<h3 className='font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider border-b border-slate-200 dark:border-slate-600 pb-2'>Dirección de Envío</h3>
								<div className='space-y-1 text-slate-600 dark:text-slate-400'>
									<p className='flex items-center gap-2'>
										<span className='w-1.5 h-1.5 bg-slate-400 rounded-full'></span>
										{order.address.city}
									</p>
									<p className='flex items-center gap-2'>
										<span className='w-1.5 h-1.5 bg-slate-400 rounded-full'></span>
										{order.address.state}
									</p>
									<p className='flex items-center gap-2'>
										<span className='w-1.5 h-1.5 bg-slate-400 rounded-full'></span>
										{order.address.postalCode}
									</p>
									<p className='flex items-center gap-2'>
										<span className='w-1.5 h-1.5 bg-slate-400 rounded-full'></span>
										{order.address.country}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};