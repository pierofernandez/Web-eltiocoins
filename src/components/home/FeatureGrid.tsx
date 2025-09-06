import { FaTwitch } from 'react-icons/fa';



export const FeatureGrid = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Streamer Section */}
                <div className="mb-12 sm:mb-20 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"></div>
                    <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-purple-500/20">
                        <div className="grid md:grid-cols-2 gap-4 sm:gap-8 items-center">
                            <div className="space-y-4 sm:space-y-6 text-center md:text-left">
                                <div className="flex items-center gap-3 justify-center md:justify-start">
                                    <FaTwitch className="text-purple-500 text-xl sm:text-2xl" />
                                    <span className="text-purple-400 font-semibold text-sm sm:text-base">Partner Oficial</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                                    Colaboramos con{' '}
                                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                        Rocío Valentina
                                    </span>
                                </h2>
                                <p className="text-zinc-400 text-base sm:text-lg max-w-md mx-auto md:mx-0">
                                    Únete a nuestra comunidad de gaming y disfruta de beneficios exclusivos con nuestra streamer oficial.
                                </p>
                                <a
                                    href="https://www.twitch.tv/rociovalentinaa7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                                >
                                    <FaTwitch className="text-lg sm:text-xl" />
                                    <span>Sígueme en Twitch</span>
                                </a>
                            </div>
                            <div className="relative group order-first md:order-last">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                                <img
                                    src="/img/rociovalentina.webp"
                                    alt="Rocío Valentina - Streamer"
                                    className="relative rounded-2xl w-full h-[350px] sm:h-[400px] md:h-[350px] lg:h-[600px] object-cover shadow-2xl transform group-hover:scale-[1.02] transition duration-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};