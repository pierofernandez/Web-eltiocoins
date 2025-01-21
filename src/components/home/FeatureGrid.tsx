import { BiWorld } from 'react-icons/bi';
import { FaHammer } from 'react-icons/fa6';
import { HiMiniReceiptRefund } from 'react-icons/hi2';
import { MdLocalShipping } from 'react-icons/md';

export const FeatureGrid = () => {
	return (
		<div className='grid grid-cols-2 gap-8 mt-6 mb-16 lg:grid-cols-4 lg:gap-5'>
			<div className='flex items-center gap-6'>
				<MdLocalShipping size={40} className='text-slate-600' />

				<div className='space-y-1'>
					<p className='font-semibold'>Pedidos al instante</p>
					<p className='text-sm'>Tomamos tus pedidos rapidamente</p>
				</div>
			</div>

			<div className='flex items-center gap-6'>
				<HiMiniReceiptRefund size={70} className='text-slate-600' />

				<div className='space-y-1'>
					<p className='font-semibold'>Devoluciones</p>
					<p className='text-sm'>
						Devuelvoción inmediata en caso de falla
					</p>
				</div>
			</div>

			<div className='flex items-center gap-6'>
				<FaHammer size={40} className='text-slate-600' />

				<div className='space-y-1'>
					<p className='font-semibold'>Soporte 24/7</p>
					<p className='text-sm'>
						Soporte técnico en cualquier momento
					</p>
				</div>
			</div>

			<div className='flex items-center gap-6'>
				<BiWorld size={40} className='text-slate-600' />

				<div className='space-y-1'>
					<p className='font-semibold'>Garantía</p>
					<p className='text-sm'>
						Garantía +4 años en el mercado
					</p>
				</div>
			</div>
		</div>
	);
};