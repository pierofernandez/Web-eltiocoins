import { FaDesktop, FaPlaystation, FaXbox } from 'react-icons/fa';
import { IoFilter } from 'react-icons/io5';

const availablePlatform = [
	{ name: 'PC', icon: FaDesktop, color: 'bg-blue-500' },
	{ name: 'PS', icon: FaPlaystation, color: 'bg-blue-600' },
	{ name: 'XBOX', icon: FaXbox, color: 'bg-green-600' },
];

interface Props {
	selectedPlatforms: string[];
	setSelectedPlatforms: (platforms: string[]) => void;
}

export const ContainerFilter = ({
	selectedPlatforms,
	setSelectedPlatforms,
}: Props) => {
	const handlePlatformChange = (platform: string) => {
		if (selectedPlatforms.includes(platform)) {
			setSelectedPlatforms(selectedPlatforms.filter(b => b !== platform));
		} else {
			setSelectedPlatforms([...selectedPlatforms, platform]);
		}
	};

	return (
		<div className='bg-zinc-800 shadow-lg border border-zinc-700 rounded-xl p-6 h-fit col-span-2 lg:col-span-1 hover:shadow-xl transition-all duration-300'>
			{/* Header con icono */}
			<div className='flex items-center gap-3 mb-6'>
				<div className='p-2 bg-gradient-to-r from-green-400 to-green-600 rounded-lg'>
					<IoFilter className='text-white text-xl' />
				</div>
				<h3 className='font-bold text-xl text-white'>Filtros</h3>
			</div>

			{/* Separador moderno */}
			<div className='h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent mb-6'></div>

			{/* Sección de plataformas */}
			<div className='space-y-4'>
				<h4 className='text-lg font-semibold text-zinc-200 flex items-center gap-2'>
					<span className='w-2 h-2 bg-green-500 rounded-full'></span>
					Plataformas
				</h4>

				<div className='space-y-3'>
					{availablePlatform.map(({ name, icon: Icon, color }) => {
						const isSelected = selectedPlatforms.includes(name);
						return (
							<button
								key={name}
								onClick={() => handlePlatformChange(name)}
								className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
									isSelected
										? 'border-green-500 bg-zinc-700 shadow-md'
										: 'border-zinc-600 hover:border-zinc-500 bg-zinc-900 hover:bg-zinc-800'
								}`}
							>
								<div className={`p-2 rounded-lg ${color} text-white`}>
									<Icon className='text-lg' />
								</div>
								<span className={`font-medium ${
									isSelected ? 'text-green-400' : 'text-zinc-300'
								}`}>
									{name}
								</span>
								{isSelected && (
									<div className='ml-auto'>
										<div className='w-5 h-5 bg-green-500 rounded-full flex items-center justify-center'>
											<svg className='w-3 h-3 text-white' fill='currentColor' viewBox='0 0 20 20'>
												<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
											</svg>
										</div>
									</div>
								)}
							</button>
						);
					})}
				</div>
			</div>

			{/* Contador de filtros activos */}
			{selectedPlatforms.length > 0 && (
				<div className='mt-6 p-3 bg-zinc-700 border border-zinc-600 rounded-lg'>
					<div className='flex items-center justify-between'>
						<span className='text-sm font-medium text-green-400'>
							{selectedPlatforms.length} filtro{selectedPlatforms.length > 1 ? 's' : ''} activo{selectedPlatforms.length > 1 ? 's' : ''}
						</span>
						<button
							onClick={() => setSelectedPlatforms([])}
							className='text-xs text-green-400 hover:text-green-300 font-medium underline'
						>
							Limpiar
						</button>
					</div>
				</div>
			)}
		</div>
	);
};