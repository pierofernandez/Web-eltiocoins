import { useState } from 'react';
import { ContainerFilter } from '../components/products/ContainerFilter';
import { prepareProducts } from '../helpers';
import { useFilteredProducts } from '../hooks';
import { Pagination } from '../components/shared/Pagination';
import InformationCoins from '../components/home/InformationCoins';
import Reviews from '../components/home/Reviews';
import { CardProductCompact } from '../components/products/CardProductCompact';

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
		.sort((a, b) => a.price - b.price);

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
						<div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto "></div>
					</div>
				</div>
			</section>

			{/* Contenedor único: filtros + productos + paginación */}
			<div className="px-4 sm:px-6 lg:px-8 mb-8">
				<div className="max-w-7xl mx-auto">
					<div className="bg-slate-400 rounded-xl shadow-md overflow-hidden">
						
						{/* Filtros */}
						<div className="">
							<ContainerFilter
								setSelectedPlatforms={setSelectedPlatforms}
								selectedPlatforms={selectedPlatforms}
							/>
						</div>

						{/* Productos */}
						{isLoading ? (
							<div className="flex items-center justify-center h-[400px]">
								<div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
							</div>
						) : (
							<div>
								{preparedProducts.map((product, idx) => (
									<div key={product.id}>
										<CardProductCompact
											img={product.images[0]}
											name={product.name}
											price={product.price}
											slug={product.slug}
											variants={product.variants}
										/>
										{/* Separador entre productos */}
										{idx !== preparedProducts.length - 1 && (
											<hr className="border-gray-800" />
										)}
									</div>
								))}

								
							</div>
						)}
					</div>
					{/* Paginación */}
								<div className="p-4 border-t border-gray-200">
									<Pagination
										totalItems={totalProducts}
										page={page}
										setPage={setPage}
									/>
								</div>
				</div>
			</div>

			<InformationCoins />
			<Reviews />
		</>
	);
};
