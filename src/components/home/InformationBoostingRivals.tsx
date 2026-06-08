export const InformationBoostingRivals = () => {
    return (
        <div className="relative py-16 md:py-24">
            <div className="relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent drop-shadow-lg">
                        EA FC 26 Division Rivals Boosting
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-teal-600 mx-auto rounded-full"></div>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto px-4 space-y-12">
                    {/* First Section */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-teal-600/10 rounded-2xl blur-xl"></div>
                        <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                                    <span className="text-2xl">📈</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white">Sube de División</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Division Rivals es el modo de juego principal para medir tu progreso en EA FC 26. Escalar por las 10 divisiones hasta llegar a la división Élite requiere tiempo y victorias constantes. Nuestros servicios de boosting de Rivals te aseguran las victorias semanales necesarias y el ascenso a divisiones superiores para mejores recompensas.
                            </p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: "🎁",
                                title: "Recompensas Semanales",
                                description: "Obtén las 7 victorias necesarias para desbloquear las mejores recompensas de cada jueves.",
                                color: "from-green-500 to-emerald-600",
                            },
                            {
                                icon: "🚀",
                                title: "Ascenso de División",
                                description: "Subimos tu cuenta desde cualquier división hasta Élite de forma segura.",
                                color: "from-teal-500 to-emerald-600",
                            },
                            {
                                icon: "🎮",
                                title: "Estilo Profesional",
                                description: "Nuestros jugadores utilizan tácticas competitivas de FC 26 para asegurar cada partido.",
                                color: "from-emerald-500 to-green-600",
                            }
                        ].map((feature, index) => (
                            <div key={index} className="group">
                                <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                                    <div className="flex items-center mb-4">
                                        <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mr-3`}>
                                            <span className="text-2xl">{feature.icon}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Trust Banner */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-xl border border-green-500/30 text-center">
                        <p className="text-gray-300 text-lg leading-relaxed">
                            <strong className="text-green-400">Entrega rápida asegurada.</strong> Mejora tu rango en Rivals y asegura tus recompensas de Division Rivals en FC 26 con eltiocoins.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InformationBoostingRivals;
