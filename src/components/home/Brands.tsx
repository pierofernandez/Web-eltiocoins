const brands = [
	{
		image: 'img/modos-de-juego/divisionrivals-logo.png',
		alt: 'divisionrivals',
	},
	{
		image: '/img/modos-de-juego/futchampions-logo.png',
		alt: 'futchampions',
	},
	{
		image: '/img/modos-de-juego/monedas-logo.png',
		alt: 'coins',
	},
	{
		image: '/img/modos-de-juego/cuentas-logo.png',
		alt: 'cuentas',
	},
	{
		image: '/img/modos-de-juego/couching-logo.png',
		alt: 'couching',
	},

];

export const Brands = () => {
	return (
		<div className='flex flex-col items-center gap-3 pt-16 pb-12'>
			<h2 className='font-bold text-2xl'>Todos Nuestros Servicios</h2>

			<p className='w-2/3 text-center text-sm md:text-base'>
				Tenemos disponible todo los modos de juegos de EA FC 25 Ultimate Team de tu preferencia
			</p>

			<div className='grid grid-cols-3  gap-6 mt-8 items-center md:grid-cols-5'>
				{brands.map((brand, index) => (
					<div key={index}>
						<img src={brand.image} alt={brand.alt} />
					</div>
				))}
			</div>
		</div>
	);
};