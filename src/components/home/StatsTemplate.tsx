import CountUp from "../animations/CountUp";
import { FaUsers, FaTrophy, FaCoins, FaEye } from 'react-icons/fa';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const stats = [
    {
        icon: FaUsers,
        number: 250,
        suffix: "+",
        label: "Clientes Satisfechos",
        color: "from-blue-500 to-cyan-500",
        delay: "100"
    },
    {
        icon: FaTrophy,
        number: 1000,
        prefix: "$",
        label: "Premios en Sorteos",
        color: "from-yellow-500 to-orange-500",
        delay: "200"
    },
    {
        icon: FaCoins,
        number: 2800,
        suffix: "k+",
        label: "Monedas Vendidas",
        color: "from-green-500 to-emerald-500",
        delay: "300"
    },
    {
        icon: FaEye,
        number: 1800,
        suffix: "+",
        label: "Visitantes Diarios",
        color: "from-purple-500 to-pink-500",
        delay: "400"
    }
];

const StatsTemplate = () => {
    useEffect(() => {
        Aos.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true
        });
    }, []);

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute rounded-3xl inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black opacity-50"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div 
                    className="text-center mb-16"
                    data-aos="fade-up"
                    data-aos-delay="50"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Números que{' '}
                        <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                            Hablan
                        </span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
                        Estadísticas que demuestran nuestra confiabilidad y éxito en el mundo gaming
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={stat.delay}
                                className="group relative"
                            >
                                {/* Background Glow Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 rounded-3xl`}></div>
                                
                                {/* Card */}
                                <div className={`relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-3xl p-8 h-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-black/30 group-hover:border-zinc-600`}>
                                    {/* Icon Container */}
                                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="text-2xl text-white" />
                                    </div>

                                    {/* Number */}
                                    <div className="mb-4">
                                        <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent group-hover:from-green-400 group-hover:to-green-600 transition-all duration-300">
                                            {stat.prefix && <span className="text-2xl md:text-3xl">{stat.prefix}</span>}
                                            <CountUp 
                                                to={stat.number} 
                                                duration={3} 
                                                separator="," 
                                                className="inline-block"
                                            />
                                            {stat.suffix && <span className="text-2xl md:text-3xl">{stat.suffix}</span>}
                                        </span>
                                    </div>

                                    {/* Label */}
                                    <p className="text-zinc-400 text-sm md:text-base font-medium leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                                        {stat.label}
                                    </p>

                                    {/* Hover Border Effect */}
                                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
        </section>
    );
};

export default StatsTemplate;