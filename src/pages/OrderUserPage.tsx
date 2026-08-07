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
		<div className='min-h-screen p-4 lg:p-8'>
			<div className='mx-auto max-w-6xl space-y-8'>
				{/* Header Section */}
				<div className='rounded-2xl p-6 lg:p-8'>
					<div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
						<button
							className='inline-flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800/60 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-zinc-200 transition-all duration-300 hover:bg-zinc-700'
							onClick={() => navigate(-1)}
						>
							<IoChevronBack size={18} />
							Volver a los pedidos
						</button>

						<div className='space-y-2 text-center'>
							<div className='flex items-center justify-center gap-3'>
								<div className='h-3 w-3 animate-pulse rounded-full bg-[#70F468]'></div>
								<h1 className='text-3xl font-bold text-white lg:text-4xl'>
									Pedido #{id}
								</h1>
								<div className='h-3 w-3 animate-pulse rounded-full bg-[#70F468]'></div>
							</div>
							<p className='inline-block rounded-full bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-400'>
								{formatDateLong(order.create_at)}
							</p>
						</div>

						<div className='md:w-[200px]'></div>
					</div>
				</div>

				{/* Products Section */}
				<div className='overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-xl'>
					<div className='border-b border-zinc-800 bg-zinc-900 p-6 lg:p-8'>
						<h2 className='text-xl font-bold text-white lg:text-2xl'>Productos del Pedido</h2>
					</div>

					{/* Desktop Table View */}
					<div className='hidden overflow-x-auto lg:block'>
						<table className='w-full text-sm'>
							<thead className='border-b border-zinc-800 bg-zinc-900/50'>
								<tr>
									{tableHeaders.map((header, index) => (
										<th
											key={index}
											className='h-14 px-6 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400'
										>
											<div className='flex items-center justify-center gap-2'>
												<span>{header}</span>
												<div className='h-1 w-1 rounded-full bg-[#70F468] opacity-60'></div>
											</div>
										</th>
									))}
								</tr>
							</thead>

							<tbody className='divide-y divide-zinc-800'>
								{order.orderItems.map((product, index) => (
									<tr key={index} className='transition-colors duration-300 hover:bg-zinc-800/40'>
										<td className='p-6'>
											<div className='flex items-center gap-4'>
												<img loading="lazy" src={product.productImage}
													alt={product.productName}
													className='h-20 w-20 rounded-xl border border-zinc-700 object-contain'
												/>
												<div className='space-y-2'>
													<h3 className='text-base font-bold text-white'>{product.productName}</h3>
													<p className='inline-block rounded-full bg-[#70F468]/10 px-3 py-1 text-sm font-semibold text-[#70F468]'>
														{formatPrice(product.price, currency, rates, baseCurrency)}
													</p>
												</div>
											</div>
										</td>
										<td className='p-6 text-center'>
											<span className='inline-flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 font-bold text-emerald-400'>
												{product.quantity}
											</span>
										</td>
										<td className='p-6 text-center'>
											<span className='text-lg font-bold text-white'>
												{formatPrice(product.price * product.quantity, currency, rates, baseCurrency)}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Mobile Card View */}
					<div className='space-y-4 p-4 lg:hidden'>
						{order.orderItems.map((product, index) => (
							<div key={index} className='rounded-xl border border-zinc-800 bg-zinc-800/40 p-4'>
								<div className='mb-4 flex items-start gap-4'>
									<img loading="lazy" src={product.productImage}
										alt={product.productName}
										className='h-16 w-16 rounded-lg border border-zinc-700 object-contain'
									/>
									<div className='flex-1 space-y-1'>
										<h3 className='text-sm font-bold text-white'>{product.productName}</h3>
										<p className='text-xs font-semibold text-[#70F468]'>
											{formatPrice(product.price, currency, rates, baseCurrency)}
										</p>
									</div>
								</div>

								<div className='flex items-center justify-between border-t border-zinc-800 pt-3'>
									<div className='flex items-center gap-2'>
										<span className='text-xs font-medium uppercase text-zinc-500'>Cant:</span>
										<span className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm font-bold text-emerald-400'>
											{product.quantity}
										</span>
									</div>
									<div className='text-right'>
										<span className='block text-xs font-medium uppercase text-zinc-500'>Total</span>
										<span className='font-bold text-white'>
											{formatPrice(product.price * product.quantity, currency, rates, baseCurrency)}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Summary and Customer Info */}
				<div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
					{/* Order Summary */}
					<div className='rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl lg:p-8'>
						<h2 className='mb-6 flex items-center gap-2 text-xl font-bold text-white'>
							<div className='h-2 w-2 rounded-full bg-[#70F468]'></div>
							Resumen del Pedido
						</h2>

						<div className='space-y-4'>
							<div className='flex items-center justify-between rounded-xl bg-zinc-800/60 p-4'>
								<span className='font-medium text-zinc-300'>Subtotal</span>
								<span className='font-semibold text-white'>{formatPrice(order.totalAmount, currency, rates, baseCurrency)}</span>
							</div>
							<div className='flex items-center justify-between rounded-xl border border-[#70F468]/30 bg-[#70F468]/10 p-4'>
								<span className='text-lg font-bold text-[#70F468]'>Total</span>
								<span className='text-xl font-bold text-[#70F468]'>{formatPrice(order.totalAmount, currency, rates, baseCurrency)}</span>
							</div>
						</div>
					</div>

					{/* Customer Details */}
					<div className='rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl lg:p-8'>
						<h2 className='mb-6 flex items-center gap-2 text-xl font-bold text-white'>
							<div className='h-2 w-2 rounded-full bg-emerald-400'></div>
							Detalle del Cliente
						</h2>

						<div className='space-y-6'>
							<div className='rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4'>
								<h3 className='mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-400'>Cliente</h3>
								<p className='text-lg font-bold text-white'>{order.customer.full_name}</p>
							</div>

							{order.address ? (
								<div className='space-y-3 rounded-xl bg-zinc-800/60 p-4'>
									<h3 className='border-b border-zinc-700 pb-2 text-sm font-semibold uppercase tracking-wider text-zinc-300'>Dirección de Envío</h3>
									<div className='space-y-1 text-zinc-400'>
										<p className='flex items-center gap-2'>
											<span className='h-1.5 w-1.5 rounded-full bg-zinc-500'></span>
											{order.address.city}
										</p>
										<p className='flex items-center gap-2'>
											<span className='h-1.5 w-1.5 rounded-full bg-zinc-500'></span>
											{order.address.state}
										</p>
										{order.address.postalCode && (
											<p className='flex items-center gap-2'>
												<span className='h-1.5 w-1.5 rounded-full bg-zinc-500'></span>
												{order.address.postalCode}
											</p>
										)}
										<p className='flex items-center gap-2'>
											<span className='h-1.5 w-1.5 rounded-full bg-zinc-500'></span>
											{order.address.country}
										</p>
									</div>
								</div>
							) : (
								<div className='space-y-3 rounded-xl bg-zinc-800/60 p-4'>
									<h3 className='border-b border-zinc-700 pb-2 text-sm font-semibold uppercase tracking-wider text-zinc-300'>Entrega</h3>
									<p className='text-zinc-400'>Compra automática de monedas — entrega digital.</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};