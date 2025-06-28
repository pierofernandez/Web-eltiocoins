import { useState } from 'react';
import { CardProduct } from '../components/products/CardProduct';
import { ContainerFilter } from '../components/products/ContainerFilter';
import { prepareProducts } from '../helpers';
import { useFilteredProducts } from '../hooks';
import { Pagination } from '../components/shared/Pagination';
import InformationCoins from '../components/home/InformationCoins';
import Reviews from '../components/home/Reviews';

export const MonedasPage = () => {
	const [page, setPage] = useState(1);
	const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

	const { 
		data: products = [], 
		isLoading, 
		totalProducts 
	} = useFilteredProducts({
		page,
		platforms: selectedPlatforms,
	});

    // Filtramos solo los productos con name "Monedas" y los ordenamos por precio de menor a mayor
	const preparedProducts = prepareProducts(products)
    .filter(product => product.category === "monedas")
    .sort((a, b) => a.price - b.price); // Ordenar por precio ascendente

	return (
		<>
			{/* Título Gaming Moderno */}
			<section className="py-12 px-4 sm:px-6 lg:px-8 relative">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-8">
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-6">
							<div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
							<span className="text-white text-sm font-medium tracking-wider uppercase">Gaming</span>
						</div>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
							<span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
							 MONEDAS
							</span>
							<br />
							<span className="text-white drop-shadow-lg">
							 FIFA
							</span>
						</h1>
						<div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
					</div>
				</div>
			</section>

			<div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
				{/* FILTROS */}
				<ContainerFilter
					setSelectedPlatforms={setSelectedPlatforms}
					selectedPlatforms={selectedPlatforms}
				/>

				{
					isLoading ? (
						<div className='col-span-2 flex items-center justify-center h-[500px]'>
							<p className='text-2xl'>Cargando...</p>
						</div>
					) : (
						<div className='col-span-2 lg:col-span-2 xl:col-span-4 flex flex-col gap-12'>
							<div className='grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4'>
								{preparedProducts.map(product => (
									<CardProduct
										key={product.id}
										name={product.name}
										price={product.price}
										colors={product.colors}
										img={product.images[0]}
										slug={product.slug}
										variants={product.variants}
									/>
								))}
							</div>

							<Pagination
								totalItems={totalProducts} 
								page={page}
								setPage={setPage}
							/>
						</div>
					)
				}
			</div>
			<InformationCoins/>

			<Reviews/>
		</>
	);
};
