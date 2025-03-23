import { Link, useNavigate, useParams } from 'react-router-dom';
import { useOrder, useUser } from '../hooks';
import { Loader } from '../components/shared/Loader';
import { CiCircleCheck } from 'react-icons/ci';
import { formatPrice } from '../helpers';
import { supabase } from '../supabase/client';
import { useEffect } from 'react';

export const ThankyouPage = () => {
	const { id } = useParams<{ id: string }>();

	const { data, isLoading, isError } = useOrder(Number(id));

	const { isLoading: isLoadingSession } = useUser();

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
		<div className='flex flex-col h-screen'>
			<header className='text-black flex items-center justify-center flex-col px-10 py-12'>
				<Link
					to='/'
					className='text-4xl font-bold self-center tracking-tighter transition-all md:text-5xl'
				>
					<img src="/public/img/logotiocoins.png" alt="logotiocoins" className='max-w-20' />

				</Link>
			</header>

			<main className='container flex-1 flex flex-col items-center gap-10'>
				<div className='flex gap-3 items-center'>
					<CiCircleCheck size={40} />

					<p className='text-4xl'>
						¡Gracias, {data.customer.full_name}!
					</p>
				</div>

				<div className='border border-slate-200 w-full md:w-[600px] p-5 rounded-md space-y-3'>
					<h3 className='font-medium'>Tu pedido está confirmado</h3>

					<p className='text-sm'>
						Gracias por realizar tu compra en eltiocoins. Para
						realizar la transferencia te compartimos los siguientes
						datos:
					</p>



					<div className='text-sm'>
						<p><strong>Método de pago:</strong> PayPal</p>
						<p><strong>Fecha de creación: </strong> {data.create_at}</p>
						<p><strong>Correo electrónico de PayPal:</strong> {data.customer.email}</p>
						<p><strong>Estado del pago:</strong> Confirmado </p>
					</div>


					<p className='text-sm'>
						Una vez realizada la transferencia, comparte tu
						comprobante al WhatsApp o eltiocoins@gmail.com para procesarla
						y hacerte la entrega de tu pedido.
					</p>
				</div>

				<div className='border border-slate-200 w-full p-5 rounded-md space-y-3 md:w-[600px]'>
					<h3 className='font-medium'>Detalles del pedido</h3>

					<div className='flex flex-col gap-5'>
						<ul className='space-y-3'>
							{data.orderItems.map((item, index) => (
								<li
									key={index}
									className='flex justify-between items-center gap-3'
								>
									<div className='flex'>
										<img
											src={item.productImage}
											alt={item.productName}
											className='w-16 h-16 object-contain'
										/>
									</div>

									<div className='flex-1 space-y-2'>
										<div className='flex justify-between'>
											<p className='font-semibold'>
												{item.productName}
											</p>
											<p className='text-sm font-medium text-gray-600 mt-1'>
												{formatPrice(item.price)}
											</p>
										</div>

									</div>
								</li>
							))}
						</ul>

						<div className='flex justify-between'>
							<span className='font-semibold'>Total:</span>
							<span className='font-semibold'>
								{formatPrice(data.totalAmount)}
							</span>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-5'>
						<div className='flex flex-col text-sm'>
							<p className='font-semibold'>
								Información de contacto:
							</p>
							<p>{data.customer.email}</p>
						</div>

						<div className='flex flex-col text-sm'>
							<p className='font-semibold'>Métodos de pago:</p>
							<p>
								Deposito bancario - {formatPrice(data.totalAmount)}
							</p>
						</div>

						<div className='flex flex-col text-sm'>
							<p className='font-semibold'>País y Residencia:</p>
							<p>{data.address.city}</p>
							<p>{data.address.state}</p>
							<p>{data.address.postalCode}</p>
							<p>{data.address.country}</p>
						</div>


					</div>
				</div>

				<div className='flex flex-col justify-between items-center w-full mb-5 gap-3 sm:flex-row md:w-[600px] md:gap-0'>
					<p className='text-sm'>
						¿Necesitas ayuda? Ponte en contacto con nosotros
					</p>

					<Link
						to='/monedas'
						className='text-black bg-[#5BD054] py-4 text-sm rounded-md px-5 tracking-tight font-semibold'
					>
						Seguir comprando
					</Link>
				</div>
			</main>
		</div>
	);
};