import { FiPlus, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../helpers';
import { Tag } from '../shared/Tag';
import { useCartStore } from '../../store/cart.store';
import { useCurrencyStore } from '../../store/currency.store';
import toast from 'react-hot-toast';
import { VariantProduct } from '../interfaces';
import { OptimizedImage } from '../shared/OptimizedImage';

interface Props {
	img: string;
	name: string;
	price: number;
	slug: string;
	variants: VariantProduct[];
}

export const CardProduct = ({
	img,
	name,
	price,
	slug,
	variants,
}: Props) => {
	const addItem = useCartStore(state => state.addItem);
	const { currency, rates, baseCurrency } = useCurrencyStore();

	const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const firstVariant = variants[0];
		if (firstVariant && firstVariant.stock > 0) {
			addItem({
				variantId: firstVariant.id,
				productId: slug,
				name,
				image: img,
				color: '',
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
		<div className='group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#70F468]/50 hover:shadow-2xl hover:shadow-[#70F468]/10'>
			{/* Glow superior de marca */}
			<div className='pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#70F468]/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100'></div>

			{/* Badges */}
			<div className='absolute left-3 top-3 z-20 flex flex-col gap-2'>
				<span className='rounded-full bg-[#70F468] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-black shadow-lg'>
					Nuevo
				</span>
				{stock === 0 && <Tag contentTag='agotado' />}
			</div>

			{/* Imagen */}
			<Link
				to={`/monedas/${slug}`}
				className='relative block overflow-hidden'
			>
				<div className='relative h-[210px] w-full overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-950 sm:h-[240px]'>
					<div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(112,244,104,0.08),transparent_60%)]'></div>
					<OptimizedImage
						src={img}
						alt={name}
						size="card"
						width={400}
						height={240}
						className='h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-110'
					/>
					<div className='absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-900 to-transparent'></div>
				</div>

				{/* Botón flotante (hover) */}
				<button
					className='absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-[140%] items-center justify-center gap-2 rounded-full border border-[#70F468]/30 bg-[#70F468] px-6 py-2.5 text-sm font-bold text-black opacity-0 shadow-lg transition-all duration-300 hover:bg-[#5fe357] group-hover:translate-y-0 group-hover:opacity-100'
					onClick={handleAddClick}
				>
					<FiPlus className='h-4 w-4' />
					<span>Comprar ahora</span>
				</button>
			</Link>

			{/* Info */}
			<div className='flex flex-1 flex-col p-4'>
				{/* Rating + stock */}
				<div className='mb-2 flex items-center justify-between'>
					<div className='flex items-center gap-1 text-amber-400'>
						<FiStar className='h-3.5 w-3.5 fill-amber-400' />
						<span className='text-xs font-bold'>4.9</span>
						<span className='text-[11px] font-medium text-zinc-500'>(+200)</span>
					</div>

					{stock > 0 ? (
						<div className='flex items-center gap-1 text-xs text-[#70F468]'>
							<span className='h-1.5 w-1.5 animate-pulse rounded-full bg-[#70F468]'></span>
							<span className='font-semibold'>En stock</span>
						</div>
					) : (
						<span className='text-xs font-semibold text-red-400'>Agotado</span>
					)}
				</div>

				{/* Nombre */}
				<Link to={`/monedas/${slug}`}>
					<h3 className='mb-3 line-clamp-2 text-base font-bold text-white transition-colors duration-300 group-hover:text-[#70F468] sm:text-lg'>
						{name}
					</h3>
				</Link>

				{/* Precio + botón */}
				<div className='mt-auto flex items-end justify-between'>
					<div>
						<span className='block text-[11px] font-medium uppercase tracking-wide text-zinc-500'>
							Desde
						</span>
						<span className='text-xl font-black text-white sm:text-2xl'>
							{formatPrice(price, currency, rates, baseCurrency)}
						</span>
					</div>

					<button
						onClick={handleAddClick}
						aria-label='Agregar al carrito'
						className='flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#70F468] text-black shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#5fe357] active:scale-95'
					>
						<FiPlus className='h-5 w-5' />
					</button>
				</div>
			</div>

			{/* Línea inferior de marca */}
			<div className='absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#70F468] to-emerald-500 transition-transform duration-500 group-hover:scale-x-100'></div>
		</div>
	);
};