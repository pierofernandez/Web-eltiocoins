import { supabase } from '../supabase/client';

/** Umbral por defecto para considerar que un producto tiene stock bajo */
export const LOW_STOCK_THRESHOLD = 5;

const REVENUE_STATUSES = ['Paid', 'Shipped', 'Delivered'];

export interface DashboardRecentOrder {
	id: number;
	total_amount: number;
	status: string;
	created_at: string;
	customerName: string | null;
}

export interface SalesPoint {
	key: string;
	label: string;
	revenue: number;
	orders: number;
}

export interface StatusSlice {
	status: string;
	label: string;
	count: number;
}

export interface DashboardMetrics {
	totalOrders: number;
	totalRevenue: number;
	revenueThisMonth: number;
	ordersToday: number;
	pendingOrders: number;
	undeliveredOrders: number;
	deliveredOrders: number;
	statusCounts: Record<string, number>;
	recentOrders: DashboardRecentOrder[];
	dailySales: SalesPoint[];
	monthlySales: SalesPoint[];
	statusBreakdown: StatusSlice[];
}

const STATUS_LABELS: Record<string, string> = {
	Pending: 'Pendiente',
	Paid: 'Pagado',
	Shipped: 'Enviado',
	Delivered: 'Entregado',
};

const MONTH_LABELS = [
	'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
	'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
];

const toDayKey = (d: Date) =>
	`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
		d.getDate()
	).padStart(2, '0')}`;

const toMonthKey = (d: Date) =>
	`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

export interface LowStockItem {
	id: string;
	name: string;
	stock: number;
	type: 'variant' | 'tier';
	detail?: string;
}

export interface UndeliveredOrderNotification {
	id: number;
	status: string;
	total_amount: number;
	created_at: string;
	customerName: string | null;
}

export interface DashboardNotifications {
	undeliveredOrders: UndeliveredOrderNotification[];
	lowStock: LowStockItem[];
	totalCount: number;
}

const getCustomerName = (customers: unknown): string | null => {
	if (!customers) return null;
	if (Array.isArray(customers)) {
		return (customers[0] as { full_name?: string })?.full_name ?? null;
	}
	return (customers as { full_name?: string })?.full_name ?? null;
};

const getRelatedName = (related: unknown): string => {
	if (!related) return 'Producto';
	if (Array.isArray(related)) {
		return (related[0] as { name?: string })?.name ?? 'Producto';
	}
	return (related as { name?: string })?.name ?? 'Producto';
};

/**
 * Métricas globales para la home del dashboard.
 */
export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
	const { data, error } = await supabase
		.from('orders')
		.select('id, total_amount, status, created_at, customers(full_name)')
		.order('created_at', { ascending: false });

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	const orders = data ?? [];

	const now = new Date();
	const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

	let totalRevenue = 0;
	let revenueThisMonth = 0;
	let pendingOrders = 0;
	let deliveredOrders = 0;
	let ordersToday = 0;
	const statusCounts: Record<string, number> = {};

	// Inicializar series: últimos 14 días y últimos 6 meses
	const dailyMap = new Map<string, SalesPoint>();
	for (let i = 13; i >= 0; i--) {
		const d = new Date(startOfToday);
		d.setDate(startOfToday.getDate() - i);
		dailyMap.set(toDayKey(d), {
			key: toDayKey(d),
			label: `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`,
			revenue: 0,
			orders: 0,
		});
	}

	const monthlyMap = new Map<string, SalesPoint>();
	for (let i = 5; i >= 0; i--) {
		const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
		monthlyMap.set(toMonthKey(d), {
			key: toMonthKey(d),
			label: `${MONTH_LABELS[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`,
			revenue: 0,
			orders: 0,
		});
	}

	for (const order of orders) {
		const status = order.status ?? 'Pending';
		const amount = order.total_amount ?? 0;
		const created = new Date(order.created_at);

		statusCounts[status] = (statusCounts[status] ?? 0) + 1;

		const isRevenue = REVENUE_STATUSES.includes(status);

		if (isRevenue) {
			totalRevenue += amount;
			if (created >= startOfMonth) revenueThisMonth += amount;
		}
		if (status === 'Pending') pendingOrders++;
		if (status === 'Delivered') deliveredOrders++;
		if (created >= startOfToday) ordersToday++;

		// Series diaria
		const dayPoint = dailyMap.get(toDayKey(created));
		if (dayPoint) {
			dayPoint.orders++;
			if (isRevenue) dayPoint.revenue += amount;
		}

		// Series mensual
		const monthPoint = monthlyMap.get(toMonthKey(created));
		if (monthPoint) {
			monthPoint.orders++;
			if (isRevenue) monthPoint.revenue += amount;
		}
	}

	const recentOrders: DashboardRecentOrder[] = orders.slice(0, 5).map(order => ({
		id: order.id,
		total_amount: order.total_amount,
		status: order.status,
		created_at: order.created_at,
		customerName: getCustomerName(order.customers),
	}));

	const statusBreakdown: StatusSlice[] = Object.entries(statusCounts).map(
		([status, count]) => ({
			status,
			label: STATUS_LABELS[status] ?? status,
			count,
		})
	);

	return {
		totalOrders: orders.length,
		totalRevenue,
		revenueThisMonth,
		ordersToday,
		pendingOrders,
		undeliveredOrders: orders.length - deliveredOrders,
		deliveredOrders,
		statusCounts,
		recentOrders,
		dailySales: Array.from(dailyMap.values()),
		monthlySales: Array.from(monthlyMap.values()),
		statusBreakdown,
	};
};

/**
 * Notificaciones del dashboard: pedidos sin entregar + stock bajo.
 */
export const getDashboardNotifications = async (
	threshold: number = LOW_STOCK_THRESHOLD
): Promise<DashboardNotifications> => {
	const [ordersRes, variantsRes, tiersRes] = await Promise.all([
		supabase
			.from('orders')
			.select('id, status, total_amount, created_at, customers(full_name)')
			.neq('status', 'Delivered')
			.order('created_at', { ascending: false }),
		supabase
			.from('variants')
			.select('id, stock, products(name)')
			.lte('stock', threshold)
			.order('stock', { ascending: true }),
		supabase
			.from('pricing_tiers')
			.select('id, stock, platform, key, products(name)')
			.not('stock', 'is', null)
			.lte('stock', threshold)
			.order('stock', { ascending: true }),
	]);

	if (ordersRes.error) {
		console.log(ordersRes.error);
		throw new Error(ordersRes.error.message);
	}
	if (variantsRes.error) {
		console.log(variantsRes.error);
		throw new Error(variantsRes.error.message);
	}
	if (tiersRes.error) {
		console.log(tiersRes.error);
		throw new Error(tiersRes.error.message);
	}

	const undeliveredOrders: UndeliveredOrderNotification[] = (ordersRes.data ?? []).map(
		order => ({
			id: order.id,
			status: order.status,
			total_amount: order.total_amount,
			created_at: order.created_at,
			customerName: getCustomerName(order.customers),
		})
	);

	const lowStockVariants: LowStockItem[] = (variantsRes.data ?? []).map(variant => ({
		id: String(variant.id),
		name: getRelatedName(variant.products),
		stock: variant.stock ?? 0,
		type: 'variant' as const,
	}));

	const lowStockTiers: LowStockItem[] = (tiersRes.data ?? []).map(tier => ({
		id: String(tier.id),
		name: getRelatedName(tier.products),
		stock: tier.stock ?? 0,
		type: 'tier' as const,
		detail: `${tier.platform} · ${tier.key}`,
	}));

	const lowStock = [...lowStockVariants, ...lowStockTiers].sort(
		(a, b) => a.stock - b.stock
	);

	return {
		undeliveredOrders,
		lowStock,
		totalCount: undeliveredOrders.length + lowStock.length,
	};
};
