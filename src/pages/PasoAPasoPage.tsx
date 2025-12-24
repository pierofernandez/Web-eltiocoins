import { FaShoppingCart, FaCreditCard, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

export const PasoAPasoPage = () => {
	const [selectedStep, setSelectedStep] = useState(0);

	useEffect(() => {
		Aos.init({
			duration: 800,
			easing: 'ease-out-cubic',
			once: true,
			disable: 'mobile'
		});
	}, []);

	// Funciones de navegación
	const goToPreviousStep = () => {
		setSelectedStep(prev => prev > 0 ? prev - 1 : prev);
	};

	const goToNextStep = () => {
		setSelectedStep(prev => prev < steps.length - 1 ? prev + 1 : prev);
	};

	const steps = [
		{
			id: 0,
			icon: FaShoppingCart,
			title: 'Registrarse en el tiocoins',
			description: 'Registrate gratis y crea tu cuenta en minutos.',
			color: 'from-blue-500 to-cyan-500',
			bgColor: 'bg-blue-500/10',
			borderColor: 'border-blue-500/20',
			videoPlaceholder: 'img/paso1.mp4',
			stepDetails: 'Navega por nuestras categorías y encuentra la opción perfecta para ti. Tenemos una amplia variedad de productos gaming para satisfacer todas tus necesidades.'
		},
		{
			id: 1,
			icon: FaCreditCard,
			title: 'Selecciona tu producto "monedas, boosting y futchampions" y Realiza el Pago',
			description: 'Paga de forma segura con PayPal, tarjeta de crédito o débito.',
			color: 'from-green-500 to-emerald-500',
			bgColor: 'bg-green-500/10',
			borderColor: 'border-green-500/20',
			videoPlaceholder: 'img/paso2.mp4',
			stepDetails: 'Todas las transacciones están protegidas y encriptadas para tu seguridad. Aceptamos múltiples métodos de pago para tu comodidad.'
		},
		{
			id: 2,
			icon: MdSecurity,
			title: 'Entrega y Confirmación',
			description: 'Recibe tu producto en segundos y confirma la entrega.',
			color: 'from-purple-500 to-pink-500',
			bgColor: 'bg-purple-500/10',
			borderColor: 'border-purple-500/20',
			videoPlaceholder: 'img/paso3.mp4',
			stepDetails: 'Para confirmar cualquier producto comprado, mandaras captura del comprobante ya sea por whatsApp o Instagram para evitar fraude de su compra.'
		}
	];

	const currentStep = steps[selectedStep];

	return (
		<>
			{/* Título Gaming Moderno */}
			<section className="py-2 px-4 sm:px-6 lg:px-8 relative">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-8">
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full mb-6">
							<div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
							<span className="text-white text-sm font-medium tracking-wider uppercase">Guía</span>
						</div>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
							<span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
								PASO A PASO
							</span>
							<br />
							<span className="text-white drop-shadow-lg">
								PARA COMPRAR
							</span>
						</h1>
						<div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
					</div>
				</div>
			</section>

			{/* Contenedor Principal */}
			<section className="py-2 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

						{/* Lado Izquierdo: Título + Cards */}
						<div className="py-2 " data-aos="fade-right" data-aos-delay="100">
							{/* Título siempre visible */}
							<h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
								Pasos para Comprar
							</h2>

							{/* Texto solo visible en mobile */}
							<p className="text-sm text-gray-300 block md:hidden">
								Seleccione el siguiente paso en la parte inferior
							</p>

							{/* Cards ocultas en mobile */}
							<div className="hidden md:block space-y-6">
								{steps.map((step, index) => {
									const Icon = step.icon;
									const isSelected = selectedStep === step.id;
									const isCompleted = index < selectedStep; // Pasos completados

									return (
										<div
											key={step.id}
											onClick={() => setSelectedStep(step.id)}
											className={`group relative cursor-pointer transition-all duration-500 ${isSelected ? 'scale-105' : 'hover:scale-102'
												} opacity-100 translate-y-0`}
										>
											{/* Background Glow Effect */}
											<div
												className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 ${isSelected
													? 'opacity-30'
													: isCompleted
														? 'opacity-15'
														: 'group-hover:opacity-10'
													} blur-xl transition-all duration-500 rounded-2xl`}
											></div>

											{/* Card */}
											<div
												className={`relative ${step.bgColor} ${step.borderColor} border backdrop-blur-sm rounded-2xl p-6 transition-all duration-500 ${isSelected
													? 'border-opacity-80 shadow-2xl shadow-black/40 scale-105'
													: isCompleted
														? 'border-opacity-60 shadow-lg shadow-black/20'
														: 'group-hover:border-opacity-40 group-hover:shadow-xl group-hover:shadow-black/20'
													} overflow-hidden`}
											>
												{/* Contenido */}
												<div className="flex items-center space-x-4">
													<div
														className={`p-3 rounded-xl bg-gradient-to-r ${step.color} shadow-lg`}
													>
														<Icon className="text-2xl text-white" />
													</div>
													<div>
														<h3 className="text-lg font-semibold text-white">
															{step.title}
														</h3>
														<p className="text-sm text-gray-300">{step.description}</p>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						{/* Área de Video y Detalles - Lado Derecho */}
						<div className="space-y-6" data-aos="fade-left" data-aos-delay="200">
							{/* Video Placeholder */}
							<div
								className="relative bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl overflow-hidden border border-zinc-700/50"
							>
								{/* Video Container */}
								<div className="bg-black flex items-center justify-center rounded-2xl overflow-hidden w-full 
                h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
									{currentStep.videoPlaceholder.endsWith('.mp4') ? (
										<video
											src={`/${currentStep.videoPlaceholder}`} // asegúrate que esté en /public
											autoPlay
											muted
											loop
											playsInline
											className="w-full h-full object-contain bg-black"
										/>
									) : (
										<div className="text-center p-6">
											<div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
												<svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
													<path d="M8 5v14l11-7z" />
												</svg>
											</div>
											<p className="text-zinc-400 text-lg font-medium">{currentStep.videoPlaceholder}</p>
											<p className="text-zinc-500 text-sm mt-2">Video tutorial próximamente</p>
										</div>
									)}
								</div>


							</div>

							{/* Detalles del Paso Seleccionado */}
							<div
								className="bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6"
							>
								<div className="flex items-center gap-3 mb-4">
									<div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${currentStep.color}`}>
										<currentStep.icon className="text-white text-lg" />
									</div>
									<h3 className="text-xl font-bold text-white">
										Paso {currentStep.id + 1}: {currentStep.title}
									</h3>
								</div>

								<p className="text-zinc-300 leading-relaxed">
									{currentStep.stepDetails}
								</p>

								{/* Progress Indicator */}
								<div className="mt-6">
									<div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
										<span>Progreso</span>
										<span>{Math.round(((currentStep.id + 1) / steps.length) * 100)}%</span>
									</div>
									<div className="w-full bg-zinc-700 rounded-full h-2">
										<div
											className={`h-2 rounded-full bg-gradient-to-r ${currentStep.color} transition-all duration-500`}
											style={{ width: `${((currentStep.id + 1) / steps.length) * 100}%` }}
										></div>
									</div>
								</div>

								{/* Navigation Buttons */}
								<div className="flex items-center justify-between mt-6 pt-6 border-t border-zinc-700/50">
									<button
										onClick={goToPreviousStep}
										disabled={selectedStep === 0}
										className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${selectedStep === 0
											? 'text-zinc-500 cursor-not-allowed'
											: 'text-white hover:text-cyan-400 hover:bg-zinc-800/50'
											}`}
									>
										<FaChevronLeft className="w-4 h-4" />
										<span className="text-sm font-medium">Anterior</span>
									</button>

									{/* Step Indicators */}
									<div className="flex items-center gap-2">
										{steps.map((_, index) => (
											<button
												key={index}
												onClick={() => setSelectedStep(index)}
												className={`w-2 h-2 rounded-full transition-all duration-300 ${index === selectedStep
													? 'bg-white scale-125'
													: 'bg-zinc-600 hover:bg-zinc-500'
													}`}
											/>
										))}
									</div>

									<button
										onClick={goToNextStep}
										disabled={selectedStep === steps.length - 1}
										className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${selectedStep === steps.length - 1
											? 'text-zinc-500 cursor-not-allowed'
											: 'text-white hover:text-cyan-400 hover:bg-zinc-800/50'
											}`}
									>
										<span className="text-sm font-medium">Siguiente</span>
										<FaChevronRight className="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default PasoAPasoPage; 