import { Link } from 'react-router-dom';
import {
	FiDollarSign,
	FiShoppingCart,
	FiClock,
	FiTruck,
	FiAlertTriangle,
	FiCalendar,
	FiPackage,
} from 'react-icons/fi';
import { useDashboardMetrics, useDashboardNotifications } from '../../hooks';
import { useCurrencyStore } from '../../store/currency.store';
import { formatPrice, formatDate } from '../../helpers';
import { Loader } from '../../components/shared/Loader';
import { DashboardCharts } from '../../components/dashboard';

const statusLabels: Record<string, string> = {
	Pending: 'Pendiente',
	Paid: 'Pagado',
	Shipped: 'Enviado',
	Delivered: 'Entregado',
};

const statusStyles: Record<string, string> = {
	Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
	Paid: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
	Shipped: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
	Delivered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
};

interface MetricCardProps {
	title: string;
	value: string;
	icon: React.ReactNode;
	accent: string;
	hint?: string;
}

const MetricCard = ({ title, value, icon, accent, hint }: MetricCardProps) => (
	<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition dark:border-stone-700 dark:bg-stone-900">
		<div className="flex items-center justify-between">
			<p className="text-sm font-medium text-stone-500 dark:text-stone-400">{title}</p>
			<span className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent}`}>
				{icon}
			</span>
		</div>
		<p className="mt-3 text-2xl font-bold text-stone-800 dark:text-stone-100">{value}</p>
		{hint && <p className="mt-1 text-xs text-stone-400">{hint}</p>}
	</div>
);

export const DashboardHomePage = () => {
	const { data: metrics, isLoading } = useDashboardMetrics();
	const { data: notifications } = useDashboardNotifications();
	const { currency, rates, baseCurrency } = useCurrencyStore();

	if (isLoading || !metrics) return <Loader />;

	const money = (value: number) => formatPrice(value, currency, rates, baseCurrency);
	const lowStock = notifications?.lowStock ?? [];

	return (
		<div className="flex flex-col gap-6">
			<div>
				<h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100">
					Panel de control
				</h1>
				<p className="text-sm text-stone-500 dark:text-stone-400">
					Resumen general de tu tienda
				</p>
			</div>

			{/* Tarjetas de métricas */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<MetricCard
					title="Ingresos totales"
					value={money(metrics.totalRevenue)}
					hint={`${money(metrics.revenueThisMonth)} este mes`}
					icon={<FiDollarSign size={18} className="text-emerald-600 dark:text-emerald-400" />}
					accent="bg-emerald-100 dark:bg-emerald-500/20"
				/>
				<MetricCard
					title="Pedidos totales"
					value={String(metrics.totalOrders)}
					hint={`${metrics.ordersToday} hoy`}
					icon={<FiShoppingCart size={18} className="text-cyan-600 dark:text-cyan-400" />}
					accent="bg-cyan-100 dark:bg-cyan-500/20"
				/>
				<MetricCard
					title="Pedidos pendientes"
					value={String(metrics.pendingOrders)}
					hint="Por procesar"
					icon={<FiClock size={18} className="text-amber-600 dark:text-amber-400" />}
					accent="bg-amber-100 dark:bg-amber-500/20"
				/>
				<MetricCard
					title="Sin entregar"
					value={String(metrics.undeliveredOrders)}
					hint={`${metrics.deliveredOrders} entregados`}
					icon={<FiTruck size={18} className="text-purple-600 dark:text-purple-400" />}
					accent="bg-purple-100 dark:bg-purple-500/20"
				/>
			</div>

			{/* Gráficos */}
			<DashboardCharts
				dailySales={metrics.dailySales}
				monthlySales={metrics.monthlySales}
				statusBreakdown={metrics.statusBreakdown}
				money={money}
			/>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				{/* Pedidos recientes */}
				<div className="lg:col-span-2">
					<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-lg font-bold text-stone-800 dark:text-stone-100">
								Pedidos recientes
							</h2>
							<Link
								to="/dashboard/ordenes"
								className="text-sm font-semibold text-cyan-600 hover:underline"
							>
								Ver todos
							</Link>
						</div>

						{metrics.recentOrders.length === 0 ? (
							<p className="py-8 text-center text-sm text-stone-500">
								Aún no hay pedidos.
							</p>
						) : (
							<div className="flex flex-col divide-y divide-gray-100 dark:divide-stone-800">
								{metrics.recentOrders.map(order => (
									<Link
										key={order.id}
										to={`/dashboard/ordenes/${order.id}`}
										className="flex items-center justify-between gap-3 py-3 transition hover:bg-gray-50 dark:hover:bg-stone-800/50"
									>
										<div className="flex items-center gap-3">
											<span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400">
												<FiPackage size={16} />
											</span>
											<div className="min-w-0">
												<p className="truncate text-sm font-semibold text-stone-800 dark:text-stone-100">
													{order.customerName ?? `Pedido #${order.id}`}
												</p>
												<p className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
													<FiCalendar size={11} />
													{formatDate(order.created_at)}
												</p>
											</div>
										</div>
										<div className="flex flex-col items-end gap-1">
											<span className="text-sm font-bold text-stone-800 dark:text-stone-100">
												{money(order.total_amount)}
											</span>
											<span
												className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
													statusStyles[order.status] ??
													'bg-gray-100 text-gray-600 dark:bg-stone-800 dark:text-stone-300'
												}`}
											>
												{statusLabels[order.status] ?? order.status}
											</span>
										</div>
									</Link>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Stock bajo */}
				<div>
					<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="flex items-center gap-2 text-lg font-bold text-stone-800 dark:text-stone-100">
								<FiAlertTriangle size={18} className="text-orange-500" />
								Stock bajo
							</h2>
							<Link
								to="/dashboard/precios"
								className="text-sm font-semibold text-cyan-600 hover:underline"
							>
								Gestionar
							</Link>
						</div>

						{lowStock.length === 0 ? (
							<p className="py-8 text-center text-sm text-stone-500">
								Sin alertas de stock.
							</p>
						) : (
							<div className="flex flex-col divide-y divide-gray-100 dark:divide-stone-800">
								{lowStock.slice(0, 8).map(item => (
									<div
										key={`${item.type}-${item.id}`}
										className="flex items-center justify-between gap-2 py-2.5"
									>
										<div className="min-w-0">
											<p className="truncate text-sm font-semibold text-stone-800 dark:text-stone-100">
												{item.name}
											</p>
											<p className="truncate text-xs text-stone-500 dark:text-stone-400">
												{item.detail ?? (item.type === 'tier' ? 'Pricing tier' : 'Variante')}
											</p>
										</div>
										<span
											className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
												item.stock === 0
													? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
													: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'
											}`}
										>
											{item.stock === 0 ? 'Agotado' : `${item.stock} und.`}
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
