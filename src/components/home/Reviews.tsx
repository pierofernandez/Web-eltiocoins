import { FaUserSecret } from "react-icons/fa6";
import { MdStar, MdStarBorder } from "react-icons/md";

const reviews = [
  {
    title: "Monedas",
    text: "Muy felxibles, elegí casualmente PS5. Al comprar, lo cambiaron instantáneamente a Xbox, la consola correcta, y la entrega fue rápida.",
    stars: 5,
  },
  {
    title: "Fut Champions",
    text: "Elegí que me hicieran rango 1 y lo cumplieron en poco tiempo, agradezco su trató y puntualidad, me parece increíble recomiendo eltiocoins al 100%.",
    stars: 4,
  },
  {
    title: "Compras",
    text: "Me parece una pagina fácil de usar y comprar a comparación de otras paginas muy bien optimizada y fluida además de su chatbot que te ayuda un montón para comprar.",
    stars: 4,
  },
];

export const Reviews = () => {
  return (
    <section className="w-full px-2 sm:px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-black mb-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
          Opiniones de nuestros clientes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="relative group rounded-2xl p-6 sm:p-7 md:p-8 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-cyan-700/30 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30 overflow-hidden"
            >
              {/* Efecto neón en el borde al hacer hover */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl group-hover:shadow-[0_0_40px_10px_rgba(34,211,238,0.25)] transition-all duration-300"></div>

              {/* Estrellas */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) =>
                  i < review.stars ? (
                    <MdStar
                      key={i}
                      className="text-cyan-400 text-2xl drop-shadow-glow animate-pulse"
                    />
                  ) : (
                    <MdStarBorder
                      key={i}
                      className="text-slate-500 text-2xl"
                    />
                  )
                )}
              </div>

              {/* Título y texto */}
              <div className="flex flex-col gap-2 mb-4">
                <h3 className="text-xl sm:text-2xl font-bold tracking-wider capitalize bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {review.title}
                </h3>
                <p className="font-light tracking-wide text-slate-200 text-base sm:text-lg">
                  {review.text}
                </p>
              </div>

              {/* Avatar y usuario */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="avatar w-12 h-12 shadow rounded-full overflow-hidden border-2 border-cyan-400 group-hover:border-cyan-500 transition-all duration-300 bg-gray-800 flex items-center justify-center">
                  <FaUserSecret className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="font-bold text-base text-white leading-tight">
                    Usuario Anónimo
                  </span>
                  <span className="font-light text-xs text-slate-400">
                    {/* Aquí puedes poner fecha o plataforma si lo deseas */}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;