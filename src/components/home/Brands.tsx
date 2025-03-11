import React, { useEffect } from "react";
import Lightning from "../animations/Lightning";
import Aos from "aos";
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";

interface CardProps {
    image: string;
    title: string;
    description: string;
    link: string;
}

const Card: React.FC<CardProps> = ({ image, title, description, link }) => {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <div 
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
            className="relative p-12 rounded-2xl shadow-lg w-96 text-center overflow-hidden"
        >
            {/* Lightning Effect as Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <Lightning
                    hue={48}
                    xOffset={0.5}
                    yOffset={0.5}
                    speed={1}
                    intensity={2}
                    size={1.5}
                />
            </div>
            {/* Content */}
            <div className="relative z-10">
                <img src={image} alt={title} className="mx-auto w-32 h-32 mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
                <p className="text-lg mb-6 text-white">{description}</p>
                {/* Botón con enlace */}
                <Link to={link}>
                    <button className="bg-[#DDAF13] text-white px-8 py-4 rounded-full font-semibold text-lg">
                        Comprar Ahora
                    </button>
                </Link>
            </div>
        </div>
    );
};

export const Brands = () => {
    return (
        <>
            <h2 data-aos="fade-up" className="text-5xl font-semibold text-center text-black mb-12">Nuestros Servicios</h2>
            <div className="p-16 text-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
                    <Card image="/img/modos-de-juego/monedas-logo.png" title="Monedas Seguras" description="Entrega Rápida" link="/monedas" />
                    <Card image="/img/modos-de-juego/futchampions-logo.png" title="Jugamos tu Fut Champions" description="Jugadores Verificados" link="/futchampions" />
                    <Card image="/img/modos-de-juego/divisionrivals-logo.png" title="Te llevamos a Élite" description="Jugadores Verificados" link="/divisionrivals" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-40 col-span-full mt-20">
                        <Card image="/img/modos-de-juego/couching-logo.png" title="Servicio de Coaching" description="Valoramos tu progreso" link="/coaching" />
                        <Card image="/img/modos-de-juego/cuentas-logo.png" title="Cuentas Boosteadas" description="Tú eliges el jugador" link="/cuentas" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Brands;