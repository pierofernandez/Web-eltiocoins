import { Link, useNavigate } from "react-router-dom";
import { FormCheckout } from "../components/checkout/FormCheckout";
import { useCartStore } from "../store/cart.store";
import { ItemsCheckout } from "../components/checkout/ItemsCheckout";
import { useUser } from "../hooks";
import { useEffect } from "react";
import { supabase } from "../supabase/client";
import { Loader } from "../components/shared";
import { motion } from "framer-motion";
import { FaGamepad } from "react-icons/fa";

export const CheckoutPage = () => {
	const totalItems = useCartStore(state => state.totalItemsInCart);
	const { isLoading } = useUser();
	const navigate = useNavigate();

	



	

	// Verificar autenticación
	useEffect(() => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === "SIGNED_OUT" || !session) {
				navigate("/login");
			}
		});
	}, [navigate]);

	if (isLoading) return <Loader />;

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
			{/* HEADER */}
			<div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 to-transparent z-10" />
			<div className="absolute inset-0 bg-[url('/checkout-bg.svg')] bg-cover opacity-5" />

			<main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
				{totalItems === 0 ? (
					<motion.div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
						<div className="mb-8">
							<h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
								¡Tu carrito está vacío!
							</h2>
							<Link
								to="/monedas"
								className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-2xl"
							>
								<FaGamepad className="text-xl" />
								<span>Explorar Productos</span>
							</Link>
						</div>
					</motion.div>
				) : (
					<motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* Formulario */}
						<motion.div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
							<FormCheckout />
						</motion.div>

						{/* Resumen */}
						<motion.div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20 lg:sticky lg:top-8 h-fit">
							<div className="mb-6">
								<h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
									Resumen del Pedido
								</h3>
								<p className="text-gray-400 text-sm">
									{totalItems} producto{totalItems !== 1 ? "s" : ""} en tu
									carrito
								</p>
							</div>

							<ItemsCheckout />


							
						</motion.div>
					</motion.div>
				)}
			</main>
		</div>
	);
};
