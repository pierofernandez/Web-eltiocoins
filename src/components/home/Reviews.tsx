import { FaUserSecret } from "react-icons/fa6";
import { MdStar, MdStarBorder } from "react-icons/md";

export const Reviews = () => {
    return (
        <div className='flex items-center justify-center mt-20 min-w-full flex-wrap gap-20'>
            {/* Tarjeta 1 */}
            <div className="w-96 h-72 bg-[#323232] shadow-md py-6 px-6 rounded-md flex flex-col justify-between ">
                <div className="stars flex gap-2 mb-2">
                    <MdStar className="bi bi-star text-2xl text-slate-400"/> 
                    <MdStar className="bi bi-star text-2xl text-slate-400"/> 
                    <MdStar className="bi bi-star text-2xl text-slate-400"/> 
                    <MdStar className="bi bi-star text-2xl text-slate-400"/> 
                    <MdStar className="bi bi-star text-2xl text-slate-400"/> 
                </div>

                <div className="flex gap-2 flex-col justify-center items-start ">
                    <h1 className="text-2xl font-bold tracking-wider capitalize">
                        Monedas
                    </h1>
                    <p className="font-light tracking-widest mb-3">
                        Muy felxibles, elegí casualmente PS5. Al comprar, lo cambiaron instantáneamente a Xbox, la consola correcta, y la entrega fue rápida.   
                    </p>
                </div>

                <div className="rater-info mb-2 flex gap-2 items-center">
                    <div className="avatar w-12 h-12 shadow rounded-full overflow-hidden">
                         <FaUserSecret   className="object-cover w-full h-full"/>
                    </div>
                    <div className="flex-1 flex justify-around flex-col">
                        <h1 className="font-bold text-lg tracking-wide">
                            Usuario Anónimo
                        </h1>
                        <span className="font-light text-sm text-slate-500">
                        </span>
                    </div>
                </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="w-96 h-72 bg-[#323232] shadow-md py-6 px-6 rounded-md flex flex-col justify-between ">
                <div className="stars flex gap-2 mb-2">
                    <MdStar className="bi bi-star text-2xl text-slate-400"/> 
                    <MdStar className="bi bi-star text-2xl text-slate-400"/> 
                    <MdStar className="bi bi-star text-2xl text-slate-400"/> 
                    <MdStar className="bi bi-star text-2xl text-slate-400"/> 
                    <MdStarBorder className="bi bi-star text-2xl text-slate-400"/> 
                </div>

                <div className="flex gap-2 flex-col justify-center items-start">
                    <h1 className="text-2xl font-bold tracking-wider capitalize">
                        Fut Champions
                    </h1>
                    <p className="font-light tracking-widest mb-3">
                        Elegí que me hicieran rango 1 y lo cumplieron en poco tiempo, agradezco su trató y puntualidad, me parece increíble recomiendo eltiocoins al 100%.
                    </p>
                </div>

                <div className="rater-info mb-2 flex gap-2 items-center">
                    <div className="avatar w-12 h-12 shadow rounded-full overflow-hidden">
                         <FaUserSecret   className="object-cover w-full h-full"/>
                    </div>
                    <div className="flex-1 flex justify-around flex-col">
                        <h1 className="font-bold text-lg tracking-wide">
                            Usuario Anónimo
                        </h1>
                        <span className="font-light text-sm text-slate-500">
                        </span>
                    </div>
                </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="w-96 h-72 bg-[#323232] shadow-md py-6 px-6 rounded-md flex flex-col justify-between ">
                <div className="stars flex gap-2 mb-2">
                    <MdStar className="bi bi-star text-2xl text-slate-400"/> 
                    <MdStar className="bi bi-star text-2xl text-slate-400"/> 
                    <MdStar className="bi bi-star text-2xl text-slate-400"/> 
                    <MdStar className="bi bi-star text-2xl text-slate-400"/> 
                    <MdStarBorder className="bi bi-star text-2xl text-slate-400"/> 
                </div>

                <div className="flex gap-2 flex-col justify-center items-start">
                    <h1 className="text-2xl font-bold tracking-wider capitalize">
                        Compras
                    </h1>
                    <p className="font-light tracking-widest mb-3">
                        Me parece una pagina fácil de usar y comprar a comparación de otras paginas muy bien optimizada y fluida además de su chatbot que te ayuda un montón para comprar.
                    </p>
                </div>

                <div className="rater-info mb-2 flex gap-2 items-center">
                    <div className="avatar w-12 h-12 shadow rounded-full overflow-hidden">
                         <FaUserSecret   className="object-cover w-full h-full"/>
                    </div>
                    <div className="flex-1 flex justify-around flex-col">
                        <h1 className="font-bold text-lg tracking-wide">
                            Usuario Anónimo
                        </h1>
                        <span className="font-light text-sm text-slate-500">
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;