import { Link, useNavigate } from "react-router-dom";
import { FormCheckout } from "../components/checkout/FormCheckout";
import { useCartStore } from "../store/cart.store";
import { ItemsCheckout } from "../components/checkout/ItemsCheckout";
import { useUser } from "../hooks";
import { useEffect } from "react";
import { supabase } from "../supabase/client";
import Loader from "../components/shared/Loader";


export const CheckoutPage = () => {
	const totalItems = useCartStore(state => state.totalItemsInCart);

	const { isLoading } = useUser();

	const navigate = useNavigate();

	//cuando no hay sesión activa retorna al login

	useEffect(() => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT' || !session) {
				navigate('/login');
			}
		});
	}, [navigate]);

	if (isLoading) return <Loader/>;

	return (
		<div
			style={{
				minHeight: 'calc(100vh - 100px',
			}}
		>
			<header className='h-[100px] bg-[#151616] text-black flex items-center justify-center flex-col px-10 border-b border-white'>
				<Link
					to='/'
					className='text-4xl font-bold self-center tracking-tighter transition-all md:text-5xl md:self-start'
				>
					<img src="/public/img/logotiocoins.png" alt="logotiocoins" className='max-w-20' />
				</Link>
			</header>

			<main className='w-full h-full flex relative'>
				{totalItems === 0 ? (
					<div
						className='flex flex-col items-center justify-center gap-5 w-full'
						style={{
							height: 'calc(100vh - 100px)',
						}}
					>
						<p className='text-sm font-medium tracking-tight'>
							Su carro esta vacío
						</p>
						<Link
							to='/monedas'
							className='py-4 bg-black rounded-full text-white px-7 text-xs uppercase tracking-widest font-semibold'
						>
							Empezar a comprar
						</Link>
					</div>
				) : (
					<>
						<div className='w-full md:w-[50%] p-10'>
							<FormCheckout />
						</div>

						<div
							className='bg-[#323232] w-[50%] sticky top-0 right-0 p-10 hidden md:block'
							style={{
								minHeight: 'calc(100vh - 100px)',
							}}
						>
							{/* Elementos del carrito */}

							<ItemsCheckout />
						</div>
					</>
				)}
			</main>
		</div>
	);
};