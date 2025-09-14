import { LuMinus, LuPlus } from 'react-icons/lu';
import { Separator } from '../components/shared/Separator';
import { formatPrice } from '../helpers';
import { CiDeliveryTruck } from 'react-icons/ci';
import { Link, useParams } from 'react-router-dom';
import { BsChatLeftText } from 'react-icons/bs';
import { ProductDescription } from '../components/one-product/ProductDescription';
import { GridImages } from '../components/one-product/GridImages';
import { useEffect, useMemo, useState } from 'react';
import { Tag } from '../components/shared/Tag';
import { Loader } from '../components/shared/Loader';
import { useProduct } from '../hooks/products/UseProduct';
import { VariantProduct } from '../components/interfaces';
import { useCurrencyStore } from '../store/currency.store';
import { useCounterStore } from '../store/counter.store';
import toast from 'react-hot-toast';
import { useCartStore } from '../store/cart.store';
import { useNavigate } from 'react-router-dom';

interface Acc {
	[key: string]: {
		name: string;
	};
}

export const DivisionRivalPage = () => {
	const { slug } = useParams<{ slug: string }>();

	const [currentSlug	, setCurrentSlug] = useState(slug);

	const { product, isLoading, isError } = useProduct(currentSlug || '');


	const [selectedColor, setSelectedColor] = useState<string | null>(
		null
	);



	const [selectedVariant, setSelectedVariant] =
		useState<VariantProduct | null>(null);

	const count = useCounterStore(state => state.count);
	const increment = useCounterStore(state => state.increment);
	const decrement = useCounterStore(state => state.decrement);

	const addItem = useCartStore(state => state.addItem);
	const { currency, rates, baseCurrency } = useCurrencyStore();
	const navigate = useNavigate();

	// Agrupamos las variantes por color
	const colors = useMemo(() => {
		return (
			product?.variants.reduce(
				(acc: Acc, variant: VariantProduct) => {
					const { color, color_name } = variant;
					if (!acc[color]) {
						acc[color] = {
							name: color_name,
						};
					}

					return acc;
				},
				{} as Acc
			) || {}
		);
	}, [product?.variants]);

	// Obtener el primer color predeterminado si no se ha seleccionado ninguno
	const availableColors = Object.keys(colors);
	useEffect(() => {
		if (!selectedColor && availableColors.length > 0) {
			setSelectedColor(availableColors[0]);
		}
	}, [availableColors, selectedColor]);

	// Actualizar el almacenamiento seleccionado cuando cambia el color
	

	// Obtener la variante seleccionada
	useEffect(() => {
		if (selectedColor ) {
			const variant = product?.variants.find(
				variant =>
					variant.color === selectedColor 
			);

			setSelectedVariant(variant as VariantProduct);
		}
	}, [selectedColor, product?.variants]);

	// Obtener el stock
	const isOutOfStock = selectedVariant?.stock === 0;

	// Función para añadir al carrito
	const addToCart = () => {
		if (selectedVariant) {
			addItem({
				variantId: selectedVariant.id,
				productId: product?.id || '',
				name: product?.name || '',
				image: product?.images[0] || '',
				color: selectedVariant.color_name,
				price: selectedVariant.price,
				quantity: count,
			});
			toast.success('Producto añadido al carrito', {
				position: 'bottom-right',
			});
		}
	};

	// Función para comprar ahora
	const buyNow = () => {
		if (selectedVariant) {
			addItem({
				variantId: selectedVariant.id,
				productId: product?.id || '',
				name: product?.name || '',
				image: product?.images[0] || '',
				color: selectedVariant.color_name,
				price: selectedVariant.price,
				quantity: count,
			});

			navigate('/checkout');
		}
	};


	//RESETEAR EL SLUG ACTUAL CUANDO CAMBIA EN LA URL
	useEffect(() => {
		setCurrentSlug(slug);

		setSelectedColor(null);
		setSelectedVariant(null);
	}, [slug]);


	if (isLoading) {
    return <Loader />;
  }
  
  if (isError || !product) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p>Producto no encontrado o hubo un error al cargar el producto</p>
      </div>
    );
  }
  
	return (
		<>
			<div className='h-fit flex flex-col md:flex-row gap-16 mt-8'>
				{/* GALERÍA DE IMAGENES */}
				<GridImages images={product.images} />

				<div className='flex-1 space-y-5'>
					<h1 className='text-3xl font-bold tracking-tight'>
						{product.name}
					</h1>

					<div className='flex gap-5 items-center'>
						<span className='tracking-wide text-2xl font-bold text-green-400'>
							{formatPrice(
								selectedVariant?.price || product.variants[0].price,
								currency,
								rates,
								baseCurrency
							)}
						</span>

						<div className='relative'>
							{isOutOfStock && <Tag contentTag='agotado' />}
						</div>
					</div>

					<Separator />

					{/* Características */}
					<ul className='space-y-2 ml-7 my-10'>
						{product.features.map(feature => (
							<li
								key={feature}
								className='text-sm flex items-center gap-2 tracking-tight font-medium'
							>
								<span className='bg-black w-[5px] h-[5px] rounded-full' />
								{feature}
							</li>
						))}
					</ul>

					{/* Sección de color oculta */}

					{/* OPCIONES DE ALMACENAMIENTO */}


					{/* COMPRAR */}
					{isOutOfStock ? (
						<button
							className='bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full transition-all duration-300 hover:bg-[#e2e2e2] w-full'
							disabled
						>
							Agotado
						</button>
					) : (
						<>
							{/* Contador */}
							<div className='space-y-3'>
								<p className='text-sm font-medium text-gray-300'>Cantidad:</p>

								<div className='flex gap-8 px-6 py-4 bg-gray-800 border border-gray-600 w-fit rounded-full hover:bg-gray-700 transition-colors'>
									<button 
										onClick={decrement} 
										disabled={count === 1}
										className='text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
									>
										<LuMinus size={18} />
									</button>
									<span className='text-white text-lg font-semibold min-w-[24px] text-center'>
										{count}
									</span>
									<button 
										onClick={increment}
										className='text-gray-300 hover:text-white'
									>
										<LuPlus size={18} />
									</button>
								</div>
							</div>

							{/* BOTONES ACCIÓN */}
							<div className='flex flex-col gap-4'>
								<button 
									className='bg-gray-700 hover:bg-gray-600 text-white uppercase font-semibold tracking-widest text-sm py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg' 
									onClick={addToCart}
								>
									Agregar al carro
								</button>
								<button 
									className='bg-green-500 hover:bg-green-600 text-white uppercase font-semibold tracking-widest text-sm py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg' 
									onClick={buyNow}
								>
									Comprar ahora
								</button>
							</div>
						</>
					)}

					<div className='flex pt-2'>
						<div className='flex flex-col gap-1 flex-1 items-center'>
							<CiDeliveryTruck size={35} />
							<p className='text-xs font-semibold'>Envío gratis</p>
						</div>

						<Link
							to='#'
							className='flex flex-col gap-1 flex-1 items-center justify-center'
						>
							<BsChatLeftText size={30} />
							<p className='flex flex-col items-center text-xs'>
								<span className='font-semibold'>
									¿Necesitas ayuda?
								</span>
								Contáctanos aquí
							</p>
						</Link>
					</div>
				</div>
			</div>

			{/* DESCRIPCIÓN */}
			<ProductDescription content={product.description} />
		</>
	);
};