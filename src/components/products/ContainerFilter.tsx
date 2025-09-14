import { FaDesktop, FaPlaystation, FaXbox } from 'react-icons/fa';

const availablePlatform = [
	{ name: 'PC', icon: FaDesktop, color: 'bg-orange-500' },
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
		<div className='bg-slate-950 backdrop-blur-sm shadow-sm p-4'>
			<div className='flex gap-6 flex-wrap'>
				{/* Plataformas en línea horizontal */}
				<div className='flex items-center gap-1 md:gap-3 justify-center w-full md:w-auto'>
					{availablePlatform.map(({ name, icon: Icon, color }) => {
						const isSelected = selectedPlatforms.includes(name);
						const displayName = name === 'PS' ? 'PS4/PS5' : name;
						
						return (
							<button
								key={name}
								onClick={() => handlePlatformChange(name)}
								className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 hover:scale-105 ${
									isSelected
										? `${color} border-transparent text-white shadow-md`
										: 'border-gray-900 text-gray-300'
								}`}
							>
								<div className={`p-1 rounded ${isSelected ? 'bg-white/20' : color} text-white`}>
									<Icon className='text-sm' />
								</div>
								<span className='text-sm font-medium'>
									{displayName}
								</span>
							</button>
						);
					})}
				</div>

				{/* Información adicional - oculto en mobile */}
				<div className='hidden md:flex items-center gap-6 text-sm text-gray-300'>
					<div className='flex items-center gap-2'>
						<div className='w-4 h-4 bg-orange-500 rounded flex items-center justify-center'>
							<span className='text-white text-xs font-bold'>⚡</span>
						</div>
						<span>Comodidad</span>
					</div>
					
					<div className='flex items-center gap-2'>
						<div className='w-4 h-4 bg-orange-500 rounded flex items-center justify-center'>
							<span className='text-white text-xs font-bold'>%</span>
						</div>
						<span>5% Tax Cubierto</span>
					</div>
					<div className='flex items-center gap-2'>
						<div className='w-4 h-4 bg-orange-500 rounded flex items-center justify-center'>
							<span className='text-white text-xs font-bold'>✓</span>
						</div>
						<span>Confianza 5+ años</span>
					</div>
				</div>

				{/* Contador y botón limpiar - oculto en mobile */}
				{selectedPlatforms.length > 0 && (
					<div className='hidden md:flex items-center gap-3 ml-auto'>
						<span className='text-sm text-gray-300'>
							{selectedPlatforms.length} activo{selectedPlatforms.length > 1 ? 's' : ''}
						</span>
						<button
							onClick={() => setSelectedPlatforms([])}
							className='text-sm text-orange-500 hover:text-orange-600 font-medium underline transition-colors'
						>
							Limpiar
						</button>
					</div>
				)}
			</div>
		</div>
	);
};