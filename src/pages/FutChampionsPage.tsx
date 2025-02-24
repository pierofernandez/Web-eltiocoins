import { useState } from 'react';
import { CardProduct } from '../components/products/CardProduct';
import { ContainerFilter } from '../components/products/ContainerFilter';
import { prepareProducts } from '../helpers';
import { useFilteredProducts } from '../hooks';
import { Pagination } from '../components/shared/Pagination';

export const FutChampionsPage = () => {
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
    .filter(product => product.name === "Fut Champions")
    .sort((a, b) => a.price - b.price); // Ordenar por precio ascendente

	return (
		<>
			<h1 className='text-5xl font-semibold text-center mb-12'>
				Fut Champions
			</h1>

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
		</>
	);
};
