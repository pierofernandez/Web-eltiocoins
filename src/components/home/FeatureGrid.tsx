import { FaHeart, FaComment, FaInstagram, FaTwitch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

const INSTAGRAM_POSTS = [
  {
    id: 1,
    name: "Rocío Valentina",
    img: "/img/rocio.webp",
    likes: "11.0k",
    comments: "9,000",
    color: "purple"
  },
  {
    id: 2,
    name: "22corbacho",
    img: "/img/corbacho.webp",
    likes: "1.1k",
    comments: "40",
    color: "pink"
  },
  {
    id: 3,
    name: "ZekaGamers",
    img: "/img/zekagamers.webp",
    likes: "1.0k",
    comments: "330",
    color: "blue"
  }
];

export const FeatureGrid = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Autoplay para móvil (3 segundos)
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 640) { // Solo en móvil
        const nextIndex = (currentIndex + 1) % INSTAGRAM_POSTS.length;
        setCurrentIndex(nextIndex);
        scrollToIndex(nextIndex);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.offsetWidth * 0.85; // Basado en el w-[85vw]
      const gap = 24; // gap-6 es 24px
      scrollRef.current.scrollTo({
        left: index * (itemWidth + gap),
        behavior: "smooth"
      });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, offsetWidth } = e.currentTarget;
    if (window.innerWidth < 640) {
      const itemWidth = offsetWidth * 0.85;
      const gap = 24;
      const index = Math.round(scrollLeft / (itemWidth + gap));
      if (index !== currentIndex && index < INSTAGRAM_POSTS.length) {
        setCurrentIndex(index);
      }
    }
  };

  return (
    <section className=" px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Instagram Posts Section */}
        <div className="mt-8 relative">
          {/* Botón de Twitch solo para tablet (derecha Rocío) */}
          <div className="hidden sm:block lg:hidden absolute right-4 top-0 z-20">
            <button
              onClick={() => setIsCardVisible(!isCardVisible)}
              className="w-12 h-12 flex items-center justify-center bg-purple-500 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 hover:bg-purple-600 group"
            >
              <FaTwitch className="text-white text-xl group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>

          {/* Card izquierda - Corbacho */}
          <div
            className={`hidden sm:block fixed left-4 z-10 transition-transform duration-500 ease-in-out
                        ${isCardVisible ? "sm:top-16" : "sm:-top-full"} 
                        lg:absolute lg:left-0 lg:top-0`}
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-pink-500/20 flex items-center gap-4 transform hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-yellow-500 rounded-full blur opacity-70"></div>
                <img loading="lazy" src="/img/corbacho22.webp"
                  alt="Corbacho"
                  className="relative w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full object-cover object-top border-2 border-pink-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-pink-400 font-semibold bg-pink-500/10 px-2 py-0.5 rounded-full">
                    Partner Oficial
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-white font-semibold text-sm sm:text-base truncate">
                    22corbacho
                  </span>
                  <FaTwitch className="text-pink-500 text-base sm:text-lg flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Card derecha - Rocío */}
          <div
            className={`hidden sm:block fixed right-4 z-10 transition-transform duration-500 ease-in-out
                        ${isCardVisible ? "sm:top-16" : "sm:-top-full"} 
                        lg:absolute lg:right-0 lg:top-0`}
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 flex items-center gap-4 transform hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-70"></div>
                <img loading="lazy" src="/img/rociovalentina.webp"
                  alt="Rocío Valentina"
                  className="relative w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full object-cover object-top border-2 border-purple-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-purple-400 font-semibold bg-purple-500/10 px-2 py-0.5 rounded-full">
                    Partner Oficial
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-white font-semibold text-sm sm:text-base truncate">
                    Rocío Valentina
                  </span>
                  <FaTwitch className="text-purple-500 text-base sm:text-lg flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Cabecera */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FaInstagram className="text-pink-500 text-2xl" />
              <span className="text-pink-400 font-semibold">Últimas Publicaciones</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Síguenos en{" "}
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Instagram
              </span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Mantente al día con nuestras últimas novedades, promociones y contenido exclusivo
            </p>
          </div>

          {/* Posts Carousel/Grid */}
          <div className="relative group/carousel">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 sm:grid sm:grid-cols-3 sm:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {INSTAGRAM_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="flex-none w-[85vw] sm:w-auto snap-center group relative bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative aspect-square">
                    <img loading="lazy" src={post.img}
                      alt={`Instagram Post ${post.id}`}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <FaHeart className="text-pink-500" />
                            <span className="text-sm">{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaComment className="text-blue-400" />
                            <span className="text-sm">{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginación - Dots (Solo Móvil) */}
            <div className="flex sm:hidden justify-center gap-2 mt-2">
              {INSTAGRAM_POSTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    scrollToIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx
                    ? "w-6 bg-pink-500"
                    : "w-1.5 bg-zinc-600 hover:bg-zinc-500"
                    }`}
                  aria-label={`Ir al post ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Instagram Follow Button */}
          <div className="mt-8 text-center">
            <a
              href="https://www.instagram.com/eltiocoins/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              <FaInstagram className="text-xl" />
              <span>Seguir en Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
