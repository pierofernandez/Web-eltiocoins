import { Separator } from '../shared/Separator';

const availablePlatform = [
	'PC',
	'PS',
	'XBOX',
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
		<div className='p-5 border border-slate-200 rounded-lg h-fit col-span-2 lg:col-span-1'>
			<h3 className='font-semibold text-xl mb-4'>Filtros</h3>

			{/* Separador  */}
			<Separator />

			<div className='flex flex-col gap-3'>
				<h3 className='text-lg font-medium text-black'>Plataformas</h3>

				<div className='flex flex-col gap-2'>
					{availablePlatform.map(platform => (
						<label key={platform} className='inline-flex items-center'>
							<input
								type='checkbox'
								className='text-black border-black focus:ring-black accent-black'
								checked={selectedPlatforms.includes(platform)}
								onChange={() => handlePlatformChange(platform)}
							/>
							<span className='ml-2 text-black text-sm cursor-pointer'>
								{platform}
							</span>
						</label>
					))}
				</div>
			</div>
		</div>
	);
};