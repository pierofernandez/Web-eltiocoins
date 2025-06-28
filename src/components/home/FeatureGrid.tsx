import { FaRocket, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import { GiLightningTrio } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const features = [
	{
		icon: FaRocket,
		title: 'Entrega Instantánea',
		description: 'Recibe tus monedas en segundos',
		color: 'from-blue-500 to-cyan-500',
		bgColor: 'bg-blue-500/10',
		borderColor: 'border-blue-500/20',
		delay: '100'
	},
	{
		icon: FaShieldAlt,
		title: '100% Seguro',
		description: 'Transacciones protegidas y seguras',
		color: 'from-green-500 to-emerald-500',
		bgColor: 'bg-green-500/10',
		borderColor: 'border-green-500/20',
		delay: '200'
	},
	{
		icon: FaHeadset,
		title: 'Soporte 24/7',
		description: 'Asistencia técnica en tiempo real',
		color: 'from-purple-500 to-pink-500',
		bgColor: 'bg-purple-500/10',
		borderColor: 'border-purple-500/20',
		delay: '300'
	},
	{
		icon: GiLightningTrio,
		title: 'Garantía Premium',
		description: '4+ años de experiencia en el mercado',
		color: 'from-orange-500 to-red-500',
		bgColor: 'bg-orange-500/10',
		borderColor: 'border-orange-500/20',
		delay: '400'
	}
];

export const FeatureGrid = () => {
	useEffect(() => {
		Aos.init({
			duration: 800,
			easing: 'ease-out-cubic',
			once: true
		});
	}, []);

	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				{/* Header Section */}
				<div 
					className="text-center mb-12"
					data-aos="fade-up"
					data-aos-delay="50"
				>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
						¿Por qué elegir{' '}
						<span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
							Tio Coins?
						</span>
					</h2>
					<p className="text-zinc-400 text-lg max-w-2xl mx-auto">
						La plataforma más confiable para comprar monedas de FIFA con la mejor experiencia gaming
					</p>
				</div>

				{/* Features Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
					{features.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<div
								key={index}
								data-aos="fade-up"
								data-aos-delay={feature.delay}
								className="group relative"
							>
								{/* Background Glow Effect */}
								<div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 rounded-2xl`}></div>
								
								{/* Card */}
								<div className={`relative ${feature.bgColor} ${feature.borderColor} border backdrop-blur-sm rounded-2xl p-6 h-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-black/20`}>
									{/* Icon Container */}
									<div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
										<Icon className="text-2xl text-white" />
									</div>

									{/* Content */}
									<div className="space-y-2">
										<h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 group-hover:bg-clip-text transition-all duration-300">
											{feature.title}
										</h3>
										<p className="text-zinc-400 text-sm leading-relaxed">
											{feature.description}
										</p>
									</div>

									{/* Hover Border Effect */}
									<div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}></div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Bottom CTA */}
				<div 
					className="text-center mt-12"
					data-aos="fade-up"
					data-aos-delay="500"
				>
					<Link to="/monedas">
						<div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 cursor-pointer">
							<span>¡Comienza ahora!</span>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
};