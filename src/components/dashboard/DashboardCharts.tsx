import {
	ResponsiveContainer,
	AreaChart,
	Area,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';
import { SalesPoint, StatusSlice } from '../../actions';
import { useDashboardThemeStore } from '../../store/dashboardTheme.store';

interface Props {
	dailySales: SalesPoint[];
	monthlySales: SalesPoint[];
	statusBreakdown: StatusSlice[];
	money: (value: number) => string;
}

const STATUS_COLORS: Record<string, string> = {
	Pending: '#f59e0b',
	Paid: '#3b82f6',
	Shipped: '#a855f7',
	Delivered: '#10b981',
};

const FALLBACK_COLORS = ['#06b6d4', '#ec4899', '#84cc16', '#f97316', '#8b5cf6'];

const ChartCard = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
		<h2 className="mb-4 text-lg font-bold text-stone-800 dark:text-stone-100">
			{title}
		</h2>
		{children}
	</div>
);

export const DashboardCharts = ({
	dailySales,
	monthlySales,
	statusBreakdown,
	money,
}: Props) => {
	const theme = useDashboardThemeStore(state => state.theme);
	const isDark = theme === 'dark';

	const axisColor = isDark ? '#a8a29e' : '#78716c';
	const gridColor = isDark ? '#44403c' : '#e7e5e4';
	const tooltipStyle = {
		backgroundColor: isDark ? '#1c1917' : '#ffffff',
		border: `1px solid ${gridColor}`,
		borderRadius: '0.5rem',
		color: isDark ? '#f5f5f4' : '#1c1917',
		fontSize: '12px',
	};

	const totalStatus = statusBreakdown.reduce((acc, s) => acc + s.count, 0);

	return (
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
			{/* Ingresos últimos 14 días */}
			<div className="lg:col-span-2">
				<ChartCard title="Ingresos · últimos 14 días">
					<ResponsiveContainer width="100%" height={280}>
						<AreaChart data={dailySales} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
							<defs>
								<linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#06b6d4" stopOpacity={0.7} />
									<stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
							<XAxis
								dataKey="label"
								tick={{ fill: axisColor, fontSize: 11 }}
								tickLine={false}
								axisLine={{ stroke: gridColor }}
							/>
							<YAxis
								tick={{ fill: axisColor, fontSize: 11 }}
								tickLine={false}
								axisLine={false}
								width={50}
							/>
							<Tooltip
								contentStyle={tooltipStyle}
								formatter={value => [money(Number(value)), 'Ingresos']}
							/>
							<Area
								type="monotone"
								dataKey="revenue"
								stroke="#06b6d4"
								strokeWidth={2}
								fill="url(#revenueGradient)"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</ChartCard>
			</div>

			{/* Distribución por estado */}
			<ChartCard title="Pedidos por estado">
				{totalStatus === 0 ? (
					<p className="py-16 text-center text-sm text-stone-500">Sin datos.</p>
				) : (
					<ResponsiveContainer width="100%" height={280}>
						<PieChart>
							<Pie
								data={statusBreakdown}
								dataKey="count"
								nameKey="label"
								cx="50%"
								cy="50%"
								innerRadius={55}
								outerRadius={90}
								paddingAngle={3}
							>
								{statusBreakdown.map((entry, index) => (
									<Cell
										key={entry.status}
										fill={
											STATUS_COLORS[entry.status] ??
											FALLBACK_COLORS[index % FALLBACK_COLORS.length]
										}
									/>
								))}
							</Pie>
							<Tooltip
								contentStyle={tooltipStyle}
								formatter={(value, name) => [Number(value), name]}
							/>
							<Legend
								wrapperStyle={{ fontSize: '12px', color: axisColor }}
								iconType="circle"
							/>
						</PieChart>
					</ResponsiveContainer>
				)}
			</ChartCard>

			{/* Ingresos por mes */}
			<div className="lg:col-span-3">
				<ChartCard title="Ingresos por mes · últimos 6 meses">
					<ResponsiveContainer width="100%" height={280}>
						<BarChart data={monthlySales} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
							<CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
							<XAxis
								dataKey="label"
								tick={{ fill: axisColor, fontSize: 11 }}
								tickLine={false}
								axisLine={{ stroke: gridColor }}
							/>
							<YAxis
								tick={{ fill: axisColor, fontSize: 11 }}
								tickLine={false}
								axisLine={false}
								width={50}
							/>
							<Tooltip
								cursor={{ fill: isDark ? '#ffffff10' : '#00000008' }}
								contentStyle={tooltipStyle}
								formatter={value => [money(Number(value)), 'Ingresos']}
							/>
							<Bar dataKey="revenue" fill="#06b6d4" radius={[6, 6, 0, 0]} maxBarSize={60} />
						</BarChart>
					</ResponsiveContainer>
				</ChartCard>
			</div>
		</div>
	);
};
