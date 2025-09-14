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
			{/* Contenedor único: filtros + productos + paginación */}
			<div className="px-4 sm:px-6 lg:px-8 mb-8">
				<div className="max-w-7xl mx-auto">
					<div className=" rounded-xl shadow-md overflow-hidden">
						
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
											<hr className="border-neutral-800 " />
										)}
									</div>
								))}

								
							</div>
						)}
					</div>
					{/* Paginación */}
								<div className="p-4">
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
