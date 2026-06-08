import { FaShieldAlt, FaServer, FaUserSecret, FaBrain } from "react-icons/fa";

export const Seguridad = () => {
    const securityFeatures = [
        {
            id: 1,
            title: "Sistema SafetyFirst™ Futrading",
            description: "Protección avanzada para mantener tus transacciones seguras.",
            icon: <FaShieldAlt className="text-2xl md:text-3xl text-[#22C55E]" />
        },
        {
            id: 2,
            title: "Servidores estratégicos",
            description: "Infraestructura robusta para garantizar máxima velocidad y cero caídas.",
            icon: <FaServer className="text-2xl md:text-3xl text-[#22C55E]" />
        },
        {
            id: 3,
            title: "Túneles proxy",
            description: "Conexiones encriptadas y totalmente anónimas que protegen tu identidad.",
            icon: <FaUserSecret className="text-2xl md:text-3xl text-[#22C55E]" />
        },
        {
            id: 4,
            title: "Inteligencia artificial",
            description: "Monitoreo 24/7 con IA para detectar cualquier actividad sospechosa.",
            icon: <FaBrain className="text-2xl md:text-3xl text-[#22C55E]" />
        }
    ];

    return (
        <section className="py-12 px-3 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Cabecera */}
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                        Garantizamos tu{" "}
                        <span className="bg-gradient-to-r from-[#22C55E] to-emerald-500 bg-clip-text text-transparent">
                            Seguridad
                        </span>
                    </h2>
                    <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#22C55E] to-emerald-500 mx-auto rounded-full"></div>
                </div>

                {/* Grid de 2 columnas móvil / 4 columnas tablet y desktop */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                    {securityFeatures.map((feature) => (
                        <div
                            key={feature.id}
                            className="relative bg-black/40 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-6 border border-[#22C55E]/30 hover:-translate-y-1 md:hover:-translate-y-2 transition-transform duration-300 group overflow-hidden"
                        >
                            {/* Resplandor de fondo hover */}
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#22C55E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl md:blur-2xl z-0"></div>

                            <div className="relative z-10 flex flex-col items-center text-center h-full">
                                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center mb-2 md:mb-4 border border-[#22C55E]/20 group-hover:scale-110 group-hover:bg-[#22C55E]/10 transition-all duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-white font-bold text-xs md:text-lg mb-1 md:mb-2 leading-tight md:leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-zinc-400 text-[10px] md:text-sm leading-relaxed mt-auto">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
