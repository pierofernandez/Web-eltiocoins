import {
	FaRobot,
	FaKey,
	FaCreditCard,
	FaCheckCircle,
	FaChevronLeft,
	FaChevronRight,
	FaExternalLinkAlt,
	FaArrowDown,
} from 'react-icons/fa';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

const steps = [
	{
		id: 0,
		icon: FaRobot,
		title: 'Inicia la Compra Automática',
		description: 'Pulsa "Compra Automática" y completa tus datos de EA.',
		color: 'from-green-500 to-emerald-500',
		bgColor: 'bg-green-500/10',
		borderColor: 'border-green-500/20',
		video: 'img/parte1.mp4',
		stepDetails:
			'Haz clic en el botón "Compra Automática". Se abrirá un formulario donde debes ingresar tu nombre, tu correo de EA (ea.com), tu contraseña y tus códigos de respaldo.',
	},
	{
		id: 1,
		icon: FaCreditCard,
		title: 'Realiza el pago',
		description: 'Paga de forma segura con PayPal, tarjeta o débito.',
		color: 'from-blue-500 to-cyan-500',
		bgColor: 'bg-blue-500/10',
		borderColor: 'border-blue-500/20',
		video: 'img/parte2.mp4',
		stepDetails:
			'Serás llevado al checkout con tu pedido listo. Completa el pago de forma segura con PayPal, tarjeta de crédito o débito. Todas las transacciones están protegidas y encriptadas.',
	},
	{
		id: 2,
		icon: FaCheckCircle,
		title: 'Entrega y confirmación',
		description: 'Recibe tus monedas y confirma tu compra.',
		color: 'from-purple-500 to-pink-500',
		bgColor: 'bg-purple-500/10',
		borderColor: 'border-purple-500/20',
		video: 'img/parte3.mp4',
		stepDetails:
			'Nuestro equipo procesa tu entrega automática. Para confirmar tu compra y evitar fraudes, envía la captura del comprobante por WhatsApp o Instagram.',
	},
];

const eaCodeSteps = [
	'Ingresa a tu cuenta EA en el portal de seguridad.',
	'En Autenticación en dos pasos, presiona la flecha (›) de la derecha.',
	'Ingresa el código que EA te enviará por correo o a tu app de autenticación.',
	'Haz clic en "Ver códigos de seguridad o respaldo".',
	'Copia los 3 primeros códigos, uno en cada recuadro del formulario.',
];

const EA_SECURITY_URL = 'https://myaccount.ea.com/cp-ui/security/index';

export const PasoAPasoPage = () => {
	const [selectedStep, setSelectedStep] = useState(0);
	const [videoError, setVideoError] = useState(false);

	useEffect(() => {
		Aos.init({
			duration: 700,
			easing: 'ease-out-cubic',
			once: true,
			disable: 'mobile',
		});
	}, []);

	// Si se llega con #codigos-ea (ej. desde el formulario), desplazar a esa sección
	useEffect(() => {
		if (window.location.hash === '#codigos-ea') {
			const timer = setTimeout(() => {
				document
					.getElementById('codigos-ea')
					?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 300);
			return () => clearTimeout(timer);
		}
	}, []);

	const goToPreviousStep = () => {
		setSelectedStep(prev => (prev > 0 ? prev - 1 : prev));
	};

	const goToNextStep = () => {
		setSelectedStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
	};

	// Reinicia el estado de error al cambiar de paso
	useEffect(() => {
		setVideoError(false);
	}, [selectedStep]);

	const currentStep = steps[selectedStep];

	return (
		<>
			{/* Título */}
			<section className="py-2 px-4 sm:px-6 lg:px-8 relative">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-8">
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full mb-6">
							<div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
							<span className="text-white text-sm font-medium tracking-wider uppercase">
								Guía
							</span>
						</div>
						<h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
							<span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
								PASO A PASO
							</span>
							<br />
							<span className="text-white drop-shadow-lg">PARA COMPRAR</span>
						</h1>
						<div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>

						{/* Acceso rápido a la sección de códigos de EA */}
						<a
							href="#codigos-ea"
							onClick={(e) => {
								e.preventDefault();
								document
									.getElementById('codigos-ea')
									?.scrollIntoView({ behavior: 'smooth', block: 'start' });
							}}
							className="group mt-6 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-5 py-2.5 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20"
						>
							<FaKey className="text-amber-400" />
							¿No sabes conseguir tus códigos de EA? Míralo aquí
							<FaArrowDown className="transition-transform group-hover:translate-y-0.5" />
						</a>
					</div>
				</div>
			</section>

			{/* Contenedor Principal */}
			<section className="py-2 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
						{/* Lado Izquierdo: Título + Cards */}
						<div className="py-2" data-aos="fade-right" data-aos-delay="100">
							<h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
								Pasos para Comprar Monedas
							</h2>

							{/* Cards */}
							<div className="space-y-4 sm:space-y-6">
								{steps.map((step, index) => {
									const Icon = step.icon;
									const isSelected = selectedStep === step.id;
									const isCompleted = index < selectedStep;

									return (
										<div
											key={step.id}
											onClick={() => setSelectedStep(step.id)}
											className={`group relative cursor-pointer transition-all duration-500 ${
												isSelected ? 'scale-105' : 'hover:scale-[1.02]'
											}`}
										>
											<div
												className={`absolute inset-0 bg-gradient-to-r ${step.color} ${
													isSelected
														? 'opacity-30'
														: isCompleted
															? 'opacity-15'
															: 'opacity-0 group-hover:opacity-10'
												} blur-xl transition-all duration-500 rounded-2xl`}
											></div>

											<div
												className={`relative ${step.bgColor} ${step.borderColor} border backdrop-blur-sm rounded-2xl p-4 sm:p-6 transition-all duration-500 ${
													isSelected
														? 'border-opacity-80 shadow-2xl shadow-black/40'
														: isCompleted
															? 'border-opacity-60 shadow-lg shadow-black/20'
															: 'group-hover:border-opacity-40 group-hover:shadow-xl group-hover:shadow-black/20'
												} overflow-hidden`}
											>
												<div className="flex items-center gap-3 sm:gap-4">
													<div
														className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-r ${step.color} shadow-lg`}
													>
														<Icon className="text-xl sm:text-2xl text-white" />
													</div>
													<div className="min-w-0">
														<h3 className="text-base sm:text-lg font-semibold text-white">
															{step.title}
														</h3>
														<p className="text-xs sm:text-sm text-gray-300">
															{step.description}
														</p>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						{/* Lado Derecho: Video y Detalles */}
						<div className="space-y-6" data-aos="fade-left" data-aos-delay="200">
							{/* Video */}
							<div className="relative bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl overflow-hidden border border-zinc-700/50">
								<div className="bg-black flex items-center justify-center rounded-2xl overflow-hidden w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
									{currentStep.video && !videoError ? (
										<video
											key={currentStep.video}
											src={`/${currentStep.video}`}
											autoPlay
											muted
											loop
											playsInline
											controls
											onError={() => setVideoError(true)}
											className="w-full h-full object-contain bg-black"
										/>
									) : (
										<div className="text-center p-8 max-w-md">
											<div
												className={`w-16 h-16 bg-gradient-to-r ${currentStep.color} rounded-full flex items-center justify-center mx-auto mb-5`}
											>
												<currentStep.icon className="text-3xl text-white" />
											</div>
											<h4 className="text-white text-xl font-bold mb-3">
												{currentStep.title}
											</h4>
											<p className="text-zinc-400 text-sm leading-relaxed">
												Video tutorial próximamente
											</p>
										</div>
									)}
								</div>
							</div>

							{/* Detalles del Paso */}
							<div className="bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6">
								<div className="flex items-center gap-3 mb-4">
									<div
										className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${currentStep.color}`}
									>
										<currentStep.icon className="text-white text-lg" />
									</div>
									<h3 className="text-lg sm:text-xl font-bold text-white">
										Paso {currentStep.id + 1}: {currentStep.title}
									</h3>
								</div>

								<p className="text-zinc-300 leading-relaxed">
									{currentStep.stepDetails}
								</p>

								{/* Progreso */}
								<div className="mt-6">
									<div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
										<span>Progreso</span>
										<span>
											{Math.round(((currentStep.id + 1) / steps.length) * 100)}%
										</span>
									</div>
									<div className="w-full bg-zinc-700 rounded-full h-2">
										<div
											className={`h-2 rounded-full bg-gradient-to-r ${currentStep.color} transition-all duration-500`}
											style={{
												width: `${((currentStep.id + 1) / steps.length) * 100}%`,
											}}
										></div>
									</div>
								</div>

								{/* Navegación */}
								<div className="flex items-center justify-between mt-6 pt-6 border-t border-zinc-700/50">
									<button
										onClick={goToPreviousStep}
										disabled={selectedStep === 0}
										className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
											selectedStep === 0
												? 'text-zinc-500 cursor-not-allowed'
												: 'text-white hover:text-cyan-400 hover:bg-zinc-800/50'
										}`}
									>
										<FaChevronLeft className="w-4 h-4" />
										<span className="text-sm font-medium">Anterior</span>
									</button>

									<div className="flex items-center gap-2">
										{steps.map((_, index) => (
											<button
												key={index}
												onClick={() => setSelectedStep(index)}
												className={`w-2 h-2 rounded-full transition-all duration-300 ${
													index === selectedStep
														? 'bg-white scale-125'
														: 'bg-zinc-600 hover:bg-zinc-500'
												}`}
											/>
										))}
									</div>

									<button
										onClick={goToNextStep}
										disabled={selectedStep === steps.length - 1}
										className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
											selectedStep === steps.length - 1
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

			{/* SECCIÓN AISLADA: Conseguir códigos de EA */}
			<section id="codigos-ea" className="scroll-mt-24 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="relative rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-zinc-900/60 to-zinc-900/60 p-6 sm:p-10 overflow-hidden">
						<div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/10 blur-3xl rounded-full"></div>

						{/* Encabezado */}
						<div className="relative text-center mb-8">
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4 shadow-lg shadow-orange-500/20">
								<FaKey className="text-white text-sm" />
								<span className="text-white text-xs sm:text-sm font-semibold tracking-wider uppercase">
									Importante
								</span>
							</div>
							<h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
								¿Cómo conseguir tus{' '}
								<span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
									códigos de EA
								</span>
								?
							</h2>
							<p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
								Necesitas tus <strong className="text-amber-300">códigos de respaldo</strong> para
								completar la compra automática. Aquí te enseñamos cómo obtenerlos.
							</p>
						</div>

						{/* Contenido: video + pasos */}
						<div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
							{/* Video */}
							<div>
								<div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-black/40 bg-black">
									<div className="absolute top-0 left-0 z-10 m-3 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 backdrop-blur-sm">
										<span className="relative flex h-2 w-2">
											<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
											<span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
										</span>
										<span className="text-[11px] font-semibold uppercase tracking-wider text-white">
											Video tutorial
										</span>
									</div>
									<video
										src="/img/codigos.mp4"
										autoPlay
										muted
										loop
										playsInline
										controls
										className="w-full h-[260px] sm:h-[380px] lg:h-[440px] object-contain bg-black"
									/>
								</div>

								<a
									href={EA_SECURITY_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-4 flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 font-bold text-black shadow-lg transition hover:from-amber-400 hover:to-orange-400"
								>
									Ir al portal de seguridad de EA
									<FaExternalLinkAlt className="text-sm" />
								</a>
							</div>

							{/* Pasos */}
							<div>
								<ol className="space-y-4">
									{eaCodeSteps.map((step, index) => (
										<li
											key={index}
											className="flex gap-4 rounded-xl border border-zinc-700/60 bg-zinc-900/60 p-4 transition hover:border-amber-500/50"
										>
											<div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 font-bold text-black">
												{index + 1}
											</div>
											<p className="self-center text-sm text-gray-300">{step}</p>
										</li>
									))}
								</ol>

								<div className="mt-5 flex gap-3 rounded-xl border border-amber-500/40 bg-amber-950/40 p-4">
									<span className="text-lg leading-none">⚠️</span>
									<p className="text-sm leading-relaxed text-amber-100/90">
										Si no ves la opción{' '}
										<strong className="text-amber-200">"Ver códigos de seguridad"</strong>, primero
										completa la verificación de seguridad de tu cuenta.
									</p>
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
