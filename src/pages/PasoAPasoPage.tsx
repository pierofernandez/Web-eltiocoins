import { FaKey, FaExternalLinkAlt, FaCopy, FaShieldAlt } from 'react-icons/fa';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const EA_SECURITY_URL = 'https://myaccount.ea.com/cp-ui/security/index';

const steps = [
	{
		title: 'Ingresa a tu cuenta EA',
		description: 'Abre el portal de seguridad de EA e inicia sesión con tu cuenta.',
	},
	{
		title: 'Autenticación en dos pasos',
		description: 'Presiona la flecha (›) que aparece a la derecha de esa sección.',
	},
	{
		title: 'Verifica tu identidad',
		description: 'Ingresa el código que EA te enviará por correo o a tu app de autenticación.',
	},
	{
		title: 'Ver códigos de seguridad',
		description: 'Haz clic en "Ver códigos de seguridad o respaldo".',
	},
	{
		title: 'Copia tus códigos',
		description: 'Copia los 3 primeros códigos disponibles y pégalos en cada recuadro del formulario.',
	},
];

export const PasoAPasoPage = () => {
	useEffect(() => {
		Aos.init({
			duration: 700,
			easing: 'ease-out-cubic',
			once: true,
		});
	}, []);

	return (
		<section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
			<div className="max-w-6xl mx-auto">
				{/* HERO */}
				<div className="text-center mb-10 sm:mb-14" data-aos="fade-up">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-5 shadow-lg shadow-orange-500/20">
						<FaKey className="text-white text-sm" />
						<span className="text-white text-xs sm:text-sm font-semibold tracking-wider uppercase">
							Guía rápida
						</span>
					</div>
					<h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
						<span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
							Conseguir
						</span>{' '}
						<span className="text-white drop-shadow-lg">Códigos</span>
					</h1>
					<p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
						Aprende a obtener tus <strong className="text-amber-300">códigos de respaldo de EA</strong> para
						completar tu compra automática de forma rápida y segura.
					</p>
					<div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full mt-5"></div>
				</div>

				{/* CONTENIDO */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
					{/* VIDEO */}
					<div className="lg:sticky lg:top-24" data-aos="fade-right">
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
								className="w-full h-[280px] sm:h-[400px] lg:h-[520px] object-contain bg-black"
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

					{/* PASOS */}
					<div data-aos="fade-left">
						<h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
							<FaShieldAlt className="text-amber-400" />
							Sigue estos pasos
						</h2>

						<ol className="space-y-4">
							{steps.map((step, index) => (
								<li
									key={index}
									className="group relative flex gap-4 rounded-xl border border-zinc-700/60 bg-zinc-900/60 p-4 transition hover:border-amber-500/50 hover:bg-zinc-900"
								>
									<div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 font-bold text-black">
										{index + 1}
									</div>
									<div>
										<h3 className="font-semibold text-white">{step.title}</h3>
										<p className="mt-0.5 text-sm text-gray-400">{step.description}</p>
									</div>
								</li>
							))}
						</ol>

						{/* Nota de ayuda */}
						<div className="mt-6 flex gap-3 rounded-xl border border-amber-500/40 bg-amber-950/40 p-4">
							<span className="text-lg leading-none">⚠️</span>
							<p className="text-sm leading-relaxed text-amber-100/90">
								Si no ves la opción <strong className="text-amber-200">"Ver códigos de seguridad"</strong>,
								primero completa la verificación de seguridad de tu cuenta.
							</p>
						</div>

						{/* Tip copiar */}
						<div className="mt-4 flex items-center gap-3 rounded-xl border border-zinc-700/60 bg-zinc-900/60 p-4">
							<FaCopy className="flex-shrink-0 text-amber-400" />
							<p className="text-sm text-gray-300">
								Recuerda copiar los <strong className="text-white">3 primeros códigos</strong>, uno en cada
								recuadro del formulario de compra automática.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PasoAPasoPage;
