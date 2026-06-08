import { CoinAutoDelivery } from '../../interfaces';

const getDeliveryRow = (
	data: CoinAutoDelivery | CoinAutoDelivery[] | null | undefined
): CoinAutoDelivery | null => {
	if (!data) return null;
	return Array.isArray(data) ? data[0] ?? null : data;
};

interface CoinAutoDeliveryCardProps {
	data: CoinAutoDelivery | CoinAutoDelivery[] | null | undefined;
	compact?: boolean;
}

const Field = ({
	label,
	value,
	compact = false,
}: {
	label: string;
	value?: string | null;
	compact?: boolean;
}) => (
	<div className={compact ? 'space-y-0.5' : 'space-y-1'}>
		<p className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
			{label}
		</p>
		<p className={`break-all font-medium text-stone-800 dark:text-stone-100 ${compact ? 'text-sm' : ''}`}>
			{value || '—'}
		</p>
	</div>
);

export const CoinAutoDeliveryCard = ({ data, compact = false }: CoinAutoDeliveryCardProps) => {
	const delivery = getDeliveryRow(data);
	if (!delivery) return null;

	return (
		<div
			className={`rounded-xl border border-[#00FF87]/25 bg-[#00FF87]/5 ${
				compact ? 'p-3' : 'p-5'
			}`}
		>
			<div className={`mb-3 flex items-center gap-2 ${compact ? 'mb-2' : ''}`}>
				<span className="rounded-full bg-[#00FF87]/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#00FF87]">
					Monedas Auto
				</span>
				{!compact && (
					<h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
						Datos de entrega EA
					</h3>
				)}
			</div>

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				<Field compact={compact} label="Nombre cliente EA" value={delivery.client_name} />
				<Field compact={compact} label="Email EA" value={delivery.ea_email} />
				<Field compact={compact} label="Contraseña EA" value={delivery.ea_password} />
				<Field compact={compact} label="Backup principal" value={delivery.backup_code_1} />
				<Field compact={compact} label="Backup 2" value={delivery.backup_code_2} />
				<Field compact={compact} label="Backup 3" value={delivery.backup_code_3} />
			</div>
		</div>
	);
};

export const getCoinAutoDeliveryRow = getDeliveryRow;
