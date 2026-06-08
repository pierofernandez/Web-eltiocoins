export const InformationCoins = () => {
    console.log('InformationCoins component is rendering');
    return (
        <div className="relative py-16 md:py-24">
            {/* Background gaming effect */}

            <div className="relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                        ¿Qué son las monedas EA FC 26?
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
                                    <span className="text-2xl">🪙</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white">Monedas Virtuales</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Las FC 26 Coins son una moneda virtual que se utiliza en el modo FC 26 Ultimate Team (FUT) de la serie de videojuegos FC desarrollada por EA Sports. Los jugadores usan FC Coins para comprar sobres, canjear por mejores jugadores y mejorar sus equipos.
                            </p>
                        </div>
                    </div>

                    {/* Gaming Methods Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent drop-shadow-lg">
                            ¿Cómo conseguir monedas EA FC 26?
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-teal-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Methods Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Method 1 */}
                        <div className="group">
                            <div className="relative bg-gradient-to-br from-green-900/90 via-emerald-800/90 to-green-900/90 backdrop-blur-sm border border-green-700/50 rounded-2xl p-6 shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                                        <span className="text-xl">⚽</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Jugando Partidos</h3>
                                </div>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong className="text-green-400">Division Rivals:</strong> compite para ganar monedas y recompensas semanales</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong className="text-green-400">Squad Battles:</strong> juega contra IA para obtener recompensas</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong className="text-green-400">FUT Champions:</strong> participa en la liga de fin de semana</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Method 2 */}
                        <div className="group">
                            <div className="relative bg-gradient-to-br from-blue-900/90 via-indigo-800/90 to-blue-900/90 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-6 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                        <span className="text-xl">🎯</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Objetivos y Desafíos</h3>
                                </div>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong className="text-blue-400">Objetivos diarios:</strong> completa desafíos para recompensas</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong className="text-blue-400">Objetivos de temporada:</strong> desafíos a largo plazo con grandes recompensas</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong className="text-blue-400">SBC:</strong> completa desafíos de creación de escuadrones</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Method 3 */}
                        <div className="group">
                            <div className="relative bg-gradient-to-br from-purple-900/90 via-violet-800/90 to-purple-900/90 backdrop-blur-sm border border-purple-700/50 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mr-3">
                                        <span className="text-xl">💼</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Mercado de Transferencias</h3>
                                </div>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong className="text-purple-400">Comprar barato, vender caro:</strong> estrategia de trading</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong className="text-purple-400">Invertir:</strong> en jugadores que aumenten su valor</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong className="text-purple-400">Vender artículos:</strong> jugadores, consumibles y más</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Method 4 */}
                        <div className="group">
                            <div className="relative bg-gradient-to-br from-orange-900/90 via-amber-800/90 to-orange-900/90 backdrop-blur-sm border border-orange-700/50 rounded-2xl p-6 shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg flex items-center justify-center mr-3">
                                        <span className="text-xl">🚀</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Boosters y Bonificaciones</h3>
                                </div>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong className="text-orange-400">Catálogo EA Sports:</strong> compra boosters de monedas</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong className="text-orange-400">Progreso de temporada:</strong> recompensas con mejoras de monedas</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong className="text-orange-400">Eventos especiales:</strong> bonificaciones temporales</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Why Buy Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
                            ¿Por qué comprar EA FC Coins?
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: "⚡",
                                title: "Equipo Competitivo",
                                description: "Construye rápidamente un equipo de alto nivel para dominar la competencia",
                                color: "from-yellow-500 to-orange-600",
                                bgColor: "from-yellow-900/90 via-orange-800/90 to-yellow-900/90",
                                borderColor: "border-yellow-700/50",
                                shadowColor: "hover:shadow-yellow-500/20",
                                textColor: "text-yellow-400"
                            },
                            {
                                icon: "⏰",
                                title: "Ahorra Tiempo",
                                description: "Para jugadores con tiempo limitado, comprar monedas es la solución perfecta",
                                color: "from-blue-500 to-cyan-600",
                                bgColor: "from-blue-900/90 via-cyan-800/90 to-blue-900/90",
                                borderColor: "border-blue-700/50",
                                shadowColor: "hover:shadow-blue-500/20",
                                textColor: "text-blue-400"
                            },
                            {
                                icon: "🎉",
                                title: "Promociones Especiales",
                                description: "Aprovecha eventos limitados y jugadores exclusivos disponibles por tiempo limitado",
                                color: "from-purple-500 to-pink-600",
                                bgColor: "from-purple-900/90 via-pink-800/90 to-purple-900/90",
                                borderColor: "border-purple-700/50",
                                shadowColor: "hover:shadow-purple-500/20",
                                textColor: "text-purple-400"
                            },
                            {
                                icon: "🏆",
                                title: "Ventaja Competitiva",
                                description: "Accede a los mejores jugadores para competir en divisiones superiores",
                                color: "from-green-500 to-emerald-600",
                                bgColor: "from-green-900/90 via-emerald-800/90 to-green-900/90",
                                borderColor: "border-green-700/50",
                                shadowColor: "hover:shadow-green-500/20",
                                textColor: "text-green-400"
                            },
                            {
                                icon: "😊",
                                title: "Disfrute Personal",
                                description: "Forma el equipo de tus sueños con tus jugadores favoritos",
                                color: "from-pink-500 to-rose-600",
                                bgColor: "from-pink-900/90 via-rose-800/90 to-pink-900/90",
                                borderColor: "border-pink-700/50",
                                shadowColor: "hover:shadow-pink-500/20",
                                textColor: "text-pink-400"
                            },
                            {
                                icon: "🎮",
                                title: "Menos Frustración",
                                description: "Evita la aleatoriedad de los paquetes con una ruta directa hacia el éxito",
                                color: "from-indigo-500 to-purple-600",
                                bgColor: "from-indigo-900/90 via-purple-800/90 to-indigo-900/90",
                                borderColor: "border-indigo-700/50",
                                shadowColor: "hover:shadow-indigo-500/20",
                                textColor: "text-indigo-400"
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
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">
                            El Lugar Más Confiable
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-indigo-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Trust Content */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-indigo-600/10 rounded-2xl blur-xl"></div>
                        <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
                            <div className="flex items-center justify-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
                                    <span className="text-3xl">🛡️</span>
                                </div>
                                <h2 className="text-3xl font-bold text-white">eltiocoins.com</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3 mt-1">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">5 Años de Experiencia</h3>
                                            <p className="text-gray-300">Plataforma líder con miles de clientes satisfechos en todas las plataformas</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mr-3 mt-1">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">Servicio 24/7</h3>
                                            <p className="text-gray-300">Entrega de monedas y atención al cliente disponible todo el año</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3 mt-1">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">Comfort Trade</h3>
                                            <p className="text-gray-300">Método de entrega seguro y verificado para proteger tus activos</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mr-3 mt-1">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">Precios Más Bajos</h3>
                                            <p className="text-gray-300">Investigación diaria de mercado para ofrecer los mejores precios</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center mr-3 mt-1">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">Entrega Ultrarrápida</h3>
                                            <p className="text-gray-300">Equipo profesional que completa pedidos en tiempo récord</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 mt-1">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">Comunidad Activa</h3>
                                            <p className="text-gray-300">Únete a WhatsApp para ganar monedas gratis semanalmente</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-gradient-to-r from-cyan-600/20 to-indigo-600/20 rounded-xl border border-cyan-500/30">
                                <p className="text-center text-gray-300 text-lg leading-relaxed">
                                    <strong className="text-cyan-400">¡Bienvenido a eltiocoins!</strong> A partir de ahora, eres nuestro cliente más afortunado.
                                    Compra FC 26 Coins de forma rápida, económica y segura en la plataforma más confiable del mercado.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InformationCoins;