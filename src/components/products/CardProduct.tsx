import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../helpers';
import { Tag } from '../shared/Tag';
import { useCartStore } from '../../store/cart.store';
import toast from 'react-hot-toast';
import { VariantProduct } from '../interfaces';

interface Props {
	img: string;
	name: string;
	price: number;
	slug: string;
	colors: { name: string; color: string }[];
	variants: VariantProduct[];
}

export const CardProduct = ({
	img,
	name,
	price,
	slug,
	colors,
	variants,
}: Props) => {
	const addItem = useCartStore(state => state.addItem);

	const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		// Usar la primera variante disponible
		const firstVariant = variants[0];
		if (firstVariant && firstVariant.stock > 0) {
			addItem({
				variantId: firstVariant.id,
				productId: slug,
				name,
				image: img,
				color: colors[0]?.name || 'Default',
				price: firstVariant.price,
				quantity: 1,
			});
			toast.success('Producto añadido al carrito', {
				position: 'bottom-right',
			});
		} else {
			toast.error('Producto agotado', {
				position: 'bottom-right',
			});
		}
	};

	const stock = variants[0]?.stock || 0;

	return (
		<div className='group relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-105'>
			{/* Gaming Glow Effect */}
			<div className='absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500'></div>
			
			{/* Corner Accent */}
			<div className='absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-xl sm:rounded-bl-2xl'></div>

			{/* Stock Badge */}
			<div className='absolute top-2 left-2 sm:top-3 sm:left-3 z-20'>
				{stock === 0 && <Tag contentTag='agotado' />}
			</div>

			{/* Product Image Container */}
			<Link
				to={`/monedas/${slug}`}
				className='relative block overflow-hidden rounded-lg sm:rounded-xl mb-3 sm:mb-4'
			>
				<div className='relative h-[200px] sm:h-[240px] lg:h-[280px] w-full bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg sm:rounded-xl overflow-hidden'>
					{/* Image with overlay */}
					<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
					<img
						src={img}
						alt={name}
						className='object-contain h-full w-full p-3 sm:p-4 transition-transform duration-500 group-hover:scale-110'
					/>
					
					{/* Hover overlay */}
					<div className='absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
				</div>

				{/* Add to Cart Button */}
				<button
					className='absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold shadow-lg hover:shadow-green-500/25 transition-all duration-300 translate-y-[120%] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 border border-green-400/20'
					onClick={handleAddClick}
				>
					<FiPlus className='w-3 h-3 sm:w-4 sm:h-4' />
					<span className='hidden sm:inline'>Comprar Ahora</span>
					<span className='sm:hidden'>Comprar</span>
				</button>
			</Link>

			{/* Product Info */}
			<div className='relative z-10'>
				{/* Product Name */}
				<h3 className='text-base sm:text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-500 line-clamp-2'>
					{name}
				</h3>

				{/* Price */}
				<div className='flex items-center justify-between mb-3 sm:mb-4'>
					<div className='flex items-center gap-1 sm:gap-2'>
						<span className='text-lg sm:text-xl lg:text-2xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text'>
							{formatPrice(price)}
						</span>
						<div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse'></div>
					</div>
					
					{/* Stock indicator */}
					{stock > 0 && (
						<div className='flex items-center gap-1 text-xs text-green-400'>
							<div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse'></div>
							<span className='font-medium hidden sm:inline'>En Stock</span>
							<span className='font-medium sm:hidden'>Stock</span>
						</div>
					)}
				</div>
			</div>

			{/* Bottom Glow Line */}
			<div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl sm:rounded-b-2xl'></div>
		</div>
	);
};