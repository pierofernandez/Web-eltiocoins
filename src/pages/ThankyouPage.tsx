import { Link, useNavigate, useParams } from 'react-router-dom';
import { useOrder, useUser } from '../hooks';
import { Loader } from '../components/shared/Loader';
import { CiCircleCheck } from 'react-icons/ci';
import { formatPrice } from '../helpers';
import { supabase } from '../supabase/client';
import { useEffect } from 'react';
import { useCurrencyStore } from '../store/currency.store';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

export const ThankyouPage = () => {
	const { id } = useParams<{ id: string }>();
	const { data, isLoading, isError } = useOrder(Number(id));
	const { isLoading: isLoadingSession } = useUser();
	const { currency, rates, baseCurrency } = useCurrencyStore();
	const navigate = useNavigate();

	useEffect(() => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT' || !session) {
				navigate('/login');
			}
		});
	}, [navigate]);

	if (isError) return <div>Error al cargar la orden</div>;
	if (isLoading || !data || isLoadingSession) return <Loader />;

	return (
		<div className='flex flex-col min-h-screen bg-[#0e0f11] text-white'>
			<header className='flex items-center justify-center flex-col px-10 py-8 bg-gradient-to-r from-purple-700 to-pink-600 shadow-lg'>
				<Link to='/' className='text-4xl font-bold tracking-tight md:text-5xl'>
					<img
						src="/img/logotiocoins.webp"
						alt="logotiocoins"
						className='max-w-24 drop-shadow-lg'
					/>
				</Link>
			</header>

			<main className='container mx-auto flex-1 flex flex-col items-center gap-10 px-5 py-10'>
				<div className='flex gap-3 items-center bg-[#1a1c1f] px-6 py-4 rounded-lg shadow-lg'>
					<CiCircleCheck size={40} className='text-green-400' />
					<p className='text-3xl font-bold tracking-tight'>
						¡Gracias, {data.customer.full_name}!
					</p>
				</div>

				<div className='w-full md:w-[600px] bg-[#18191c] border border-[#2d2f33] p-6 rounded-lg space-y-4 shadow-md'>
					<h3 className='text-lg font-semibold text-green-400'>Tu pedido está confirmado</h3>
					<p className='text-sm text-gray-300'>
						Gracias por realizar tu compra en <strong>El Tio Coins</strong>. Para realizar la transferencia, usa los siguientes datos:
					</p>

					<div className='text-sm text-gray-300 space-y-1'>
						<p><strong>Método de pago:</strong> PayPal</p>
						<p><strong>Fecha de creación:</strong> {data.create_at}</p>
						<p><strong>Email PayPal:</strong> {data.customer.email}</p>
						<p><strong>Estado del pago:</strong> Confirmado</p>
					</div>

					<p className='text-sm text-gray-300'>
						Una vez realizada la transferencia, envía tu comprobante por WhatsApp o Instagram, o al correo <strong>eltiocoins@gmail.com</strong>.
					</p>

					{/* BOTONES DE CONTACTO */}
					<div className="flex flex-col sm:flex-row gap-4 pt-4">
						<a
							href="https://wa.me/51977548397"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black font-bold px-4 py-2 rounded-lg transition-all"
						>
							<FaWhatsapp size={20} /> WhatsApp
						</a>
						<a
							href="https://instagram.com/eltiocoins"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-lg transition-all"
						>
							<FaInstagram size={20} /> Instagram
						</a>
					</div>
				</div>

				<div className='w-full md:w-[600px] bg-[#18191c] border border-[#2d2f33] p-6 rounded-lg space-y-4 shadow-md'>
					<h3 className='text-lg font-semibold text-blue-400'>Detalles del pedido</h3>

					<ul className='space-y-4'>
						{data.orderItems.map((item, index) => (
							<li key={index} className='flex items-center gap-4'>
								<img
									src={item.productImage}
									alt={item.productName}
									className='w-16 h-16 object-contain border border-gray-600 rounded'
								/>
								<div className='flex-1'>
									<div className='flex justify-between text-sm'>
										<span className='font-medium text-white'>{item.productName}</span>
										<span className='text-gray-400'>{formatPrice(item.price, currency, rates, baseCurrency)}</span>
									</div>
								</div>
							</li>
						))}
					</ul>

					<div className='flex justify-between text-sm border-t border-[#2d2f33] pt-4'>
						<span className='font-semibold text-white'>Total:</span>
						<span className='font-semibold text-white'>
							{formatPrice(data.totalAmount, currency, rates, baseCurrency)}
						</span>
					</div>

					<div className='grid grid-cols-2 gap-4 text-sm text-gray-300 pt-4'>
						<div>
							<p className='font-semibold text-white'>Contacto:</p>
							<p>{data.customer.email}</p>
						</div>
						<div>
							<p className='font-semibold text-white'>Método de pago:</p>
							<p>Depósito bancario - {formatPrice(data.totalAmount, currency, rates, baseCurrency)}</p>
						</div>
						<div>
							<p className='font-semibold text-white'>Residencia:</p>
							<p>{data.address.city}, {data.address.state}</p>
							<p>{data.address.postalCode}</p>
							<p>{data.address.country}</p>
						</div>
					</div>
				</div>

				<div className='flex flex-col sm:flex-row justify-between items-center w-full md:w-[600px] mt-6 gap-4'>
					<p className='text-sm text-gray-400'>
						¿Necesitas ayuda? Contáctanos por soporte.
					</p>

					<Link
						to='/monedas'
						className='bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-black px-6 py-3 rounded-md text-sm font-bold transition-all'
					>
						Seguir comprando
					</Link>
				</div>
			</main>
		</div>
	);
};
