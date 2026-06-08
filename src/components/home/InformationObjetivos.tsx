export const InformationObjetivos = () => {
    return (
        <div className="relative py-16 md:py-24">
            <div className="relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                        ¿Qué son los Objetivos de EA FC 26?
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto px-4 space-y-12">
                    {/* First Section */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
                        <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                                    <span className="text-2xl">🎯</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white">Desafíos y Recompensas</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Los objetivos en FC 26 son desafíos específicos que permiten a los jugadores desbloquear contenido exclusivo como cartas de jugadores especiales, sobres de alta calidad, XP para el pase de temporada y monedas. Completar estos objetivos suele requerir mucho tiempo y cumplir requisitos específicos en partidos de Division Rivals o Squad Battles.
                            </p>
                        </div>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: "⚡",
                                title: "Jugadores Exclusivos",
                                description: "Consigue cartas especiales de objetivos que no están disponibles en el mercado de transferencias.",
                                color: "from-yellow-500 to-orange-600",
                                bgColor: "from-yellow-900/90 via-orange-800/90 to-yellow-900/90",
                                borderColor: "border-yellow-700/50",
                                shadowColor: "hover:shadow-yellow-500/20",
                            },
                            {
                                icon: "⏰",
                                title: "Ahorra Horas de Juego",
                                description: "Deja que nuestros expertos completen los tediosos desafíos de hitos y temporada por ti.",
                                color: "from-blue-500 to-cyan-600",
                                bgColor: "from-blue-900/90 via-cyan-800/90 to-blue-900/90",
                                borderColor: "border-blue-700/50",
                                shadowColor: "hover:shadow-blue-500/20",
                            },
                            {
                                icon: "📈",
                                title: "Nivel de Temporada Máximo",
                                description: "Asegura todas las recompensas del pase de batalla completando todos los objetivos de XP.",
                                color: "from-purple-500 to-pink-600",
                                bgColor: "from-purple-900/90 via-pink-800/90 to-purple-900/90",
                                borderColor: "border-purple-700/50",
                                shadowColor: "hover:shadow-purple-500/20",
                            }
                        ].map((benefit, index) => (
                            <div key={index} className="group">
                                <div className={`relative bg-gradient-to-br ${benefit.bgColor} backdrop-blur-sm border ${benefit.borderColor} rounded-2xl p-6 shadow-2xl ${benefit.shadowColor} transition-all duration-300 hover:scale-105 h-full`}>
                                    <div className="flex items-center mb-4">
                                        <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mr-3`}>
                                            <span className="text-2xl">{benefit.icon}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Trust Section */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-indigo-600/10 rounded-2xl blur-xl"></div>
                        <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
                            <div className="flex items-center justify-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
                                    <span className="text-3xl">🛡️</span>
                                </div>
                                <h2 className="text-3xl font-bold text-white">eltiocoins.com</h2>
                            </div>

                            <div className="mt-8 p-6 bg-gradient-to-r from-cyan-600/20 to-indigo-600/20 rounded-xl border border-cyan-500/30">
                                <p className="text-center text-gray-300 text-lg leading-relaxed">
                                    <strong className="text-cyan-400">Entrega rápida asegurada.</strong> Somos expertos en completar cualquier tipo de objetivo en FC 26 de forma segura y profesional.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InformationObjetivos;
