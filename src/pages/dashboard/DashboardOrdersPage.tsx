import { useMemo, useState } from 'react';
import { FiCalendar, FiX } from 'react-icons/fi';
import { TableOrdersAdmin } from '../../components/dashboard';
import { Loader } from '../../components/shared/Loader';
import { useAllOrders } from '../../hooks';

type Preset = 'all' | 'today' | '7d' | '30d' | 'month';

const presets: { value: Preset; label: string }[] = [
	{ value: 'all', label: 'Todo' },
	{ value: 'today', label: 'Hoy' },
	{ value: '7d', label: 'Últimos 7 días' },
	{ value: '30d', label: 'Últimos 30 días' },
	{ value: 'month', label: 'Este mes' },
];

export const DashboardOrdersPage = () => {
	const { data, isLoading } = useAllOrders();

	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const applyPreset = (preset: Preset) => {
		const now = new Date();
		const toISO = (d: Date) => d.toISOString().split('T')[0];

		if (preset === 'all') {
			setStartDate('');
			setEndDate('');
			return;
		}
		if (preset === 'today') {
			setStartDate(toISO(now));
			setEndDate(toISO(now));
			return;
		}
		if (preset === 'month') {
			setStartDate(toISO(new Date(now.getFullYear(), now.getMonth(), 1)));
			setEndDate(toISO(now));
			return;
		}

		const days = preset === '7d' ? 7 : 30;
		const start = new Date(now);
		start.setDate(now.getDate() - (days - 1));
		setStartDate(toISO(start));
		setEndDate(toISO(now));
	};

	const filteredOrders = useMemo(() => {
		if (!data) return [];
		if (!startDate && !endDate) return data;

		const start = startDate ? new Date(`${startDate}T00:00:00`) : null;
		const end = endDate ? new Date(`${endDate}T23:59:59.999`) : null;

		return data.filter(order => {
			const created = new Date(order.created_at);
			if (start && created < start) return false;
			if (end && created > end) return false;
			return true;
		});
	}, [data, startDate, endDate]);

	const hasFilter = Boolean(startDate || endDate);

	const clearFilters = () => {
		setStartDate('');
		setEndDate('');
	};

	if (isLoading || !data) return <Loader />;

	const inputClass =
		'rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-stone-800 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100';

	return (
		<div className='space-y-5 text-black dark:text-stone-100'>
			<div className='flex flex-wrap items-center justify-between gap-3'>
				<h1 className='text-2xl font-bold'>Órdenes</h1>
				<span className='text-sm text-stone-500 dark:text-stone-400'>
					{filteredOrders.length} de {data.length} órdenes
				</span>
			</div>

			{/* Filtros por fecha */}
			<div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900'>
				<div className='flex flex-wrap items-end gap-4'>
					<div className='flex flex-col gap-1'>
						<label className='text-xs font-semibold text-stone-500 dark:text-stone-400'>
							Desde
						</label>
						<div className='relative'>
							<FiCalendar className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400' size={15} />
							<input
								type='date'
								value={startDate}
								max={endDate || undefined}
								onChange={e => setStartDate(e.target.value)}
								className={`${inputClass} pl-9`}
							/>
						</div>
					</div>

					<div className='flex flex-col gap-1'>
						<label className='text-xs font-semibold text-stone-500 dark:text-stone-400'>
							Hasta
						</label>
						<div className='relative'>
							<FiCalendar className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400' size={15} />
							<input
								type='date'
								value={endDate}
								min={startDate || undefined}
								onChange={e => setEndDate(e.target.value)}
								className={`${inputClass} pl-9`}
							/>
						</div>
					</div>

					{hasFilter && (
						<button
							type='button'
							onClick={clearFilters}
							className='flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-gray-100 dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-800'
						>
							<FiX size={15} />
							Limpiar
						</button>
					)}
				</div>

				{/* Presets rápidos */}
				<div className='mt-4 flex flex-wrap gap-2'>
					{presets.map(preset => (
						<button
							key={preset.value}
							type='button'
							onClick={() => applyPreset(preset.value)}
							className='rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-stone-600 transition hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700 dark:border-stone-600 dark:text-stone-300 dark:hover:border-cyan-500 dark:hover:bg-cyan-500/10 dark:hover:text-cyan-400'
						>
							{preset.label}
						</button>
					))}
				</div>
			</div>

			{filteredOrders.length === 0 ? (
				<div className='rounded-lg border border-gray-200 bg-white p-10 text-center text-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-400'>
					No hay órdenes en el rango de fechas seleccionado.
				</div>
			) : (
				<TableOrdersAdmin orders={filteredOrders} />
			)}
		</div>
	);
};
