import { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { useGlobalStore } from '../../store/global.store';
import { formatPrice } from '../../helpers';
import { searchProducts } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { Product } from '../interfaces';

export const Search = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState<Product[]>([]);

	const closeSheet = useGlobalStore(state => state.closeSheet);

	const navigate = useNavigate();

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();

		if (searchTerm.trim()) {
			const products = await searchProducts(searchTerm);
			setSearchResults(products);
		}
	};

	return (
		<>
			<div className=' py-5 px-7 flex gap-10 items-center border-b border-white'>
				<form
					className='flex gap-3 items-center flex-1'
					onSubmit={handleSearch}
				>
					<HiOutlineSearch className='text-white' size={22} />
					<input
						type='text'
						placeholder='¿Qué busca?'
						className='outline-none w-full text-sm text-white placeholder-white bg-transparent'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</form>
				<button onClick={closeSheet}>
					<IoMdClose size={25} className='text-white' />
				</button>
			</div>

			{/* RESULTADOS DE Busqueda */}
			<div className='p-5'>
				{searchResults.length > 0 ? (
					<ul>
						{searchResults.map(product => (
							<li className='py-2 group' key={product.id}>
								<button
									className='flex items-center gap-3'
									onClick={() => {
										navigate(`/monedas/${product.slug}`);
										closeSheet();
									}}
								>
									<img
										src={product.images[0]}
										alt={product.name}
										className='h-20 w-20 object-contain p-3'
									/>

									<div className='flex flex-col gap-1 text-white'>
										<p className='text-sm font-semibold group-hover:underline'>
											{product.name}
										</p>

										<p className='text-[13px] text-gray-400'>
											{product.variants[0].color_name}
										</p>

										<p className='text-sm font-medium text-gray-400'>
											{formatPrice(product.variants[0].price)}
										</p>
									</div>
								</button>
							</li>
						))}
					</ul>
				) : (
					<p className='text-sm text-white'>
						No se encontraron resultados
					</p>
				)}
			</div>
		</>
	);
};