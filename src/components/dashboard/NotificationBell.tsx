import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBell, FiPackage, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { useDashboardNotifications } from '../../hooks';
import { formatDate } from '../../helpers';

export const NotificationBell = () => {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const { data, isLoading } = useDashboardNotifications();

	const undelivered = data?.undeliveredOrders ?? [];
	const lowStock = data?.lowStock ?? [];
	const count = data?.totalCount ?? 0;

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, []);

	return (
		<div className="relative" ref={ref}>
			<button
				type="button"
				onClick={() => setOpen(o => !o)}
				className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-stone-600 transition hover:bg-gray-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800"
				aria-label="Notificaciones"
			>
				<FiBell size={20} />
				{count > 0 && (
					<span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
						{count > 99 ? '99+' : count}
					</span>
				)}
			</button>

			{open && (
				<div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-stone-700 dark:bg-stone-900 sm:w-96">
					<div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-stone-700">
						<h3 className="text-sm font-bold text-stone-800 dark:text-stone-100">
							Notificaciones
						</h3>
						{count > 0 && (
							<span className="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-600 dark:bg-red-500/20 dark:text-red-400">
								{count} pendiente{count > 1 ? 's' : ''}
							</span>
						)}
					</div>

					<div className="max-h-[60vh] overflow-y-auto">
						{isLoading ? (
							<p className="px-4 py-6 text-center text-sm text-stone-500">
								Cargando…
							</p>
						) : count === 0 ? (
							<div className="flex flex-col items-center gap-2 px-4 py-8 text-center text-stone-500 dark:text-stone-400">
								<FiCheckCircle size={28} className="text-emerald-500" />
								<p className="text-sm">¡Todo al día! No hay alertas.</p>
							</div>
						) : (
							<>
								{/* Pedidos sin entregar */}
								{undelivered.length > 0 && (
									<div className="px-2 py-2">
										<p className="px-2 pb-1 text-[11px] font-bold uppercase tracking-wide text-stone-400">
											Pedidos sin entregar ({undelivered.length})
										</p>
										{undelivered.slice(0, 6).map(order => (
											<Link
												key={order.id}
												to={`/dashboard/ordenes/${order.id}`}
												onClick={() => setOpen(false)}
												className="flex items-start gap-3 rounded-lg px-2 py-2 transition hover:bg-gray-100 dark:hover:bg-stone-800"
											>
												<span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
													<FiPackage size={15} />
												</span>
												<span className="min-w-0 flex-1">
													<span className="flex items-center justify-between gap-2">
														<span className="truncate text-sm font-semibold text-stone-800 dark:text-stone-100">
															{order.customerName ?? `Pedido #${order.id}`}
														</span>
														<span className="flex-shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
															{order.status}
														</span>
													</span>
													<span className="block truncate text-xs text-stone-500 dark:text-stone-400">
														#{order.id} · {formatDate(order.created_at)}
													</span>
												</span>
											</Link>
										))}
										{undelivered.length > 6 && (
											<Link
												to="/dashboard/ordenes"
												onClick={() => setOpen(false)}
												className="block px-2 pt-1 text-center text-xs font-semibold text-cyan-600 hover:underline"
											>
												Ver todos los pedidos
											</Link>
										)}
									</div>
								)}

								{/* Stock bajo */}
								{lowStock.length > 0 && (
									<div className="border-t border-gray-100 px-2 py-2 dark:border-stone-800">
										<p className="px-2 pb-1 text-[11px] font-bold uppercase tracking-wide text-stone-400">
											Stock bajo ({lowStock.length})
										</p>
										{lowStock.slice(0, 6).map(item => (
											<div
												key={`${item.type}-${item.id}`}
												className="flex items-start gap-3 rounded-lg px-2 py-2"
											>
												<span
													className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
														item.stock === 0
															? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400'
															: 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400'
													}`}
												>
													<FiAlertTriangle size={15} />
												</span>
												<span className="min-w-0 flex-1">
													<span className="flex items-center justify-between gap-2">
														<span className="truncate text-sm font-semibold text-stone-800 dark:text-stone-100">
															{item.name}
														</span>
														<span
															className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
																item.stock === 0
																	? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
																	: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'
															}`}
														>
															{item.stock === 0 ? 'Agotado' : `${item.stock} und.`}
														</span>
													</span>
													<span className="block truncate text-xs text-stone-500 dark:text-stone-400">
														{item.detail ?? (item.type === 'tier' ? 'Pricing tier' : 'Variante')}
													</span>
												</span>
											</div>
										))}
										<Link
											to="/dashboard/precios"
											onClick={() => setOpen(false)}
											className="block px-2 pt-1 text-center text-xs font-semibold text-cyan-600 hover:underline"
										>
											Gestionar stock
										</Link>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
