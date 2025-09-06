import React, { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";

interface CardProps {
    image: string;
    title: string;
    description: string;
    link: string;
    gradient: string;
    delay: string;
}

const Card: React.FC<CardProps> = ({ image, title, description, link, gradient, delay }) => {
    return (
        <div 
            data-aos="fade-up"
            data-aos-delay={delay}
            className="group relative"
        >
            {/* Background Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 rounded-3xl`}></div>
            
            {/* Card Container */}
            <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-8 h-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-black/30 group-hover:border-zinc-600 overflow-hidden">
                {/* Modern Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Image Container */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-zinc-600 group-hover:border-zinc-500 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-black/20">
                            <img 
                                src={image} 
                                alt={title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                            />
                        </div>
                    </div>

                    {/* Title and Description */}
                    <div className="text-center space-y-3 mb-6">
                        <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 group-hover:bg-clip-text transition-all duration-300">
                            {title}
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                            {description}
                        </p>
                    </div>

                    {/* CTA Button */}
                    <Link to={link} className="block">
                        <button className={`w-full py-4 px-6 rounded-2xl bg-gradient-to-r ${gradient} text-white font-semibold text-lg group-hover:shadow-lg group-hover:shadow-black/20 transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center gap-2 relative overflow-hidden`}>
                            {/* Button Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            <span className="relative z-10">Comprar Ahora</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </Link>
                </div>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-bl-3xl`}></div>
            </div>
        </div>
    );
};

export const Brands = () => {
    useEffect(() => {
        Aos.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true
        });
    }, []);

    const services = [
        {
            image: "/img/modos-de-juego/monedas-logo.webp",
            title: "Monedas Seguras",
            description: "Entrega instantánea y 100% segura",
            link: "/monedas",
            gradient: "from-blue-500 to-cyan-500",
            delay: "100"
        },
        {
            image: "/img/modos-de-juego/futchampions-logo.webp",
            title: "Fut Champions",
            description: "Jugadores verificados y profesionales",
            link: "/futchampions",
            gradient: "from-yellow-500 to-orange-500",
            delay: "200"
        },
        {
            image: "/img/modos-de-juego/divisionrivals-logo.webp",
            title: "Division Rivals",
            description: "Te llevamos hasta Élite Division",
            link: "/divisionrivals",
            gradient: "from-purple-500 to-pink-500",
            delay: "300"
        },
        {
            image: "/img/modos-de-juego/couching-logo.webp",
            title: "Coaching Premium",
            description: "Valoramos tu progreso personal",
            link: "/coaching",
            gradient: "from-green-500 to-emerald-500",
            delay: "400"
        },
        {
            image: "/img/modos-de-juego/cuentas-logo.webp",
            title: "Cuentas Boosteadas",
            description: "Tú eliges el jugador ideal",
            link: "/cuentas",
            gradient: "from-red-500 to-pink-500",
            delay: "500"
        }
    ];

    return (
        <section className="py-20 px-4 sm:px-6 rounded-xl lg:px-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black opacity-50"></div>
            
            <div className="relative max-w-7xl mx-auto">
                {/* Header Section */}
                <div 
                    className="text-center mb-16"
                    data-aos="fade-up"
                    data-aos-delay="50"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Nuestros{' '}
                        <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                            Servicios
                        </span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
                        Descubre todos los servicios gaming que ofrecemos para llevar tu experiencia FIFA al siguiente nivel
                    </p>
                </div>

                {/* Services Grid */}
                <div className="space-y-12">
                    {/* First 3 services */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {services.slice(0, 3).map((service, index) => (
                            <Card
                                key={index}
                                {...service}
                            />
                        ))}
                    </div>

                    {/* Last 2 services centered */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
                        {services.slice(3, 5).map((service, index) => (
                            <Card
                                key={index + 3}
                                {...service}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Brands;