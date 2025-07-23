import { Link, useNavigate } from "react-router-dom";
import { FormCheckout } from "../components/checkout/FormCheckout";
import { useCartStore } from "../store/cart.store";
import { ItemsCheckout } from "../components/checkout/ItemsCheckout";
import { useUser } from "../hooks";
import { useEffect } from "react";
import { supabase } from "../supabase/client";
import { Loader } from "../components/shared";
import { motion } from "framer-motion";
import { GiShoppingCart, GiCrossedSwords, GiShield } from "react-icons/gi";
import { FaGamepad, FaLock, FaShieldAlt } from "react-icons/fa";

export const CheckoutPage = () => {
	const totalItems = useCartStore(state => state.totalItemsInCart);
	const { isLoading } = useUser();
	const navigate = useNavigate();

	// Verificar autenticación
	useEffect(() => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT' || !session) {
				navigate('/login');
			}
		});
	}, [navigate]);

	if (isLoading) return <Loader />;

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
			{/* Efectos de fondo animados */}
			<div className="absolute inset-0">
				<div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
				<div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
				<div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
				
				{/* Partículas flotantes */}
				<div className="absolute inset-0 overflow-hidden">
					{[...Array(15)].map((_, i) => (
						<div
							key={i}
							className="absolute w-1 h-1 bg-green-400 rounded-full animate-ping"
			style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 3}s`,
								animationDuration: `${2 + Math.random() * 2}s`
							}}
						/>
					))}
				</div>
			</div>

			<div className="relative z-10">
				{/* Header moderno */}
				<motion.header 
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="bg-black/40 backdrop-blur-sm border-b border-white/20 py-6 px-4 lg:px-8"
				>
					<div className="max-w-7xl mx-auto flex items-center justify-between">
						<Link
							to="/"
							className="flex items-center gap-3 group"
						>
							<motion.div
								whileHover={{ scale: 1.05 }}
								className="relative"
							>
								<img 
									src="/img/logotiocoins.png" 
									alt="Tio Coins" 
									className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
								/>
								<div className="absolute inset-0 bg-green-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
							</motion.div>
							<div className="hidden sm:block">
								<h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
									TIO COINS
								</h1>
								<p className="text-xs text-gray-400">Checkout Seguro</p>
							</div>
						</Link>

						{/* Indicadores de seguridad */}
						<div className="flex items-center gap-4">
							<div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-green-500/20 rounded-full border border-green-400/30">
								<FaShieldAlt className="text-green-400 text-sm" />
								<span className="text-green-400 text-xs font-medium">100% Seguro</span>
							</div>
							<div className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
								<FaLock className="text-blue-400 text-sm" />
								<span className="text-blue-400 text-xs font-medium">SSL</span>
					</div>
						</div>
					</div>
				</motion.header>

				{/* Contenido principal */}
				<main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
					{totalItems === 0 ? (
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							className="flex flex-col items-center justify-center min-h-[60vh] text-center"
						>
							<div className="mb-8">
								<motion.div
									animate={{ 
										rotate: [0, 10, -10, 0],
										scale: [1, 1.1, 1]
									}}
									transition={{ 
										duration: 2,
										repeat: Infinity,
										repeatType: "reverse"
									}}
									className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mb-6 mx-auto"
								>
									<GiShoppingCart className="text-white text-3xl" />
								</motion.div>
								<h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
									¡Tu carrito está vacío!
								</h2>
								<p className="text-gray-300 text-lg mb-8 max-w-md">
									Parece que aún no has agregado productos a tu carrito. 
									¡Explora nuestra tienda y encuentra los mejores productos gaming!
								</p>
							</div>

							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Link
									to="/monedas"
									className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:shadow-green-500/25"
								>
									<FaGamepad className="text-xl" />
									<span>Explorar Productos</span>
								</Link>
							</motion.div>

							{/* Características destacadas */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl">
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
									className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
								>
									<div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
										<GiCrossedSwords className="text-blue-400 text-xl" />
									</div>
									<h3 className="text-white font-semibold mb-2">Entrega Instantánea</h3>
									<p className="text-gray-400 text-sm">Recibe tus productos en segundos</p>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 }}
									className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
								>
									<div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
										<GiShield className="text-green-400 text-xl" />
									</div>
									<h3 className="text-white font-semibold mb-2">100% Seguro</h3>
									<p className="text-gray-400 text-sm">Transacciones protegidas</p>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.6 }}
									className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
								>
									<div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
										<FaGamepad className="text-purple-400 text-xl" />
									</div>
									<h3 className="text-white font-semibold mb-2">Soporte 24/7</h3>
									<p className="text-gray-400 text-sm">Ayuda cuando la necesites</p>
								</motion.div>
							</div>
						</motion.div>
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="grid grid-cols-1 lg:grid-cols-2 gap-8"
						>
							{/* Formulario de checkout */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20"
							>
								<div className="mb-6">
									<h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
										Información de Pago
									</h2>
									<p className="text-gray-400">
										Completa tus datos para finalizar la compra
									</p>
								</div>
								<FormCheckout />
							</motion.div>

							{/* Resumen del carrito */}
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20 lg:sticky lg:top-8 h-fit"
							>
								<div className="mb-6">
									<h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
										Resumen del Pedido
									</h3>
									<p className="text-gray-400 text-sm">
										{totalItems} producto{totalItems !== 1 ? 's' : ''} en tu carrito
									</p>
								</div>
							<ItemsCheckout />
							</motion.div>
						</motion.div>
				)}
			</main>
			</div>
		</div>
	);
};