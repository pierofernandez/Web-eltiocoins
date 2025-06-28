import { useState } from "react";
import { supabase } from "../../supabase/client";
import { FaGraduationCap, FaRocket, FaTrophy, FaPhone } from 'react-icons/fa';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export const Newsletter = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		Aos.init({
			duration: 800,
			easing: 'ease-out-cubic',
			once: true
		});
	}, []);

	const handleSubscribe = async () => {
		if (!phoneNumber || isNaN(Number(phoneNumber))) {
			setMessage("Por favor, ingresa un número de teléfono válido.");
			return;
		}

		// Insertando el número de teléfono en la tabla "promotions"
		const { error } = await supabase
			.from("promotions")
			.insert([{ prom_couching: Number(phoneNumber) }]); // Convertimos a número

		if (error) {
			console.error("Error al suscribirse:", error.message);
			setMessage("Error al suscribirse. Inténtalo de nuevo.");
		} else {
			setMessage("¡Te has suscrito exitosamente!");
			setPhoneNumber(""); // Limpiar input después de enviar
		}
	};

	return (
		<div className="w-full">
			<section className="py-16 px-4 sm:px-6 lg:px-8 relative">
				{/* Background Pattern */}
				<div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black opacity-50"></div>
				
				<div className="relative max-w-6xl mx-auto">
					{/* Header Section */}
					<div 
						className="text-center mb-12"
						data-aos="fade-up"
						data-aos-delay="50"
					>
						<div className="flex items-center justify-center gap-3 mb-6">
							<div className="p-3 bg-gradient-to-r from-green-400 to-green-600 rounded-xl">
								<FaGraduationCap className="text-white text-2xl" />
							</div>
						</div>
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
							¿No puedes{' '}
							<span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
								Ganar?
							</span>
						</h2>
						<p className="text-zinc-300 text-lg max-w-4xl mx-auto leading-relaxed">
							Vuélvete un <span className="text-green-400 font-semibold">pro player</span> con nuestro servicio de Coaching. 
							Mejora tus habilidades, domina estrategias avanzadas y alcanza un nivel competitivo con la guía de expertos. 
							¡Lleva tu juego al siguiente nivel!
						</p>
					</div>

					{/* Features Grid */}
					<div 
						className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
						data-aos="fade-up"
						data-aos-delay="200"
					>
						<div className="text-center p-6 bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl hover:border-zinc-600 transition-all duration-300">
							<div className="inline-flex p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mb-4">
								<FaRocket className="text-white text-xl" />
							</div>
							<h3 className="text-white font-semibold mb-2">Mejora Rápida</h3>
							<p className="text-zinc-400 text-sm">Progreso visible en cada sesión</p>
						</div>
						<div className="text-center p-6 bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl hover:border-zinc-600 transition-all duration-300">
							<div className="inline-flex p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl mb-4">
								<FaTrophy className="text-white text-xl" />
							</div>
							<h3 className="text-white font-semibold mb-2">Estrategias Pro</h3>
							<p className="text-zinc-400 text-sm">Técnicas de jugadores profesionales</p>
						</div>
						<div className="text-center p-6 bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl hover:border-zinc-600 transition-all duration-300">
							<div className="inline-flex p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-4">
								<FaGraduationCap className="text-white text-xl" />
							</div>
							<h3 className="text-white font-semibold mb-2">Coaching Personal</h3>
							<p className="text-zinc-400 text-sm">Atención individualizada</p>
						</div>
					</div>

					{/* Subscription Form */}
					<div 
						className="max-w-2xl mx-auto"
						data-aos="fade-up"
						data-aos-delay="400"
					>
						<div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-8 hover:border-zinc-600 transition-all duration-300">
							<div className="text-center mb-6">
								<h3 className="text-2xl font-bold text-white mb-2">¡Regístrate Aquí!</h3>
								<p className="text-zinc-400">Recibe información sobre nuestro coaching premium</p>
							</div>
							
							<div className="space-y-4">
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
										<FaPhone className="text-zinc-400" />
									</div>
									<input
										className="w-full pl-12 pr-4 py-4 bg-zinc-800/50 border border-zinc-600 rounded-2xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-300"
										placeholder="Ingresa tu número de teléfono"
										type="tel"
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
									/>
								</div>
								
								<button
									onClick={handleSubscribe}
									className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/50 flex items-center justify-center gap-2"
								>
									<FaRocket className="text-lg" />
									<span>Obtener Información</span>
								</button>
							</div>
							
							{message && (
								<div className={`mt-4 p-4 rounded-2xl text-center ${
									message.includes("exitosamente") 
										? "bg-green-500/20 border border-green-500/50 text-green-400" 
										: "bg-red-500/20 border border-red-500/50 text-red-400"
								}`}>
									{message}
								</div>
							)}
						</div>
					</div>

					
				</div>
			</section>
		</div>
	);
};
