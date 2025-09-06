import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';

export const Banner = () => {
	const [currentImage, setCurrentImage] = useState(0);
	
	// Imágenes responsive: móvil y desktop
	const mobileImages = ['/img/mobile11.webp', '/img/mobile22.webp', '/img/mobile33.webp'];
	const desktopImages = ['/img/home3.webp', '/img/home1.webp', '/img/home2.webp'];

	useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImage((prev) => (prev + 1) % mobileImages.length);
		}, 5000); // Cambia imagen cada 5 segundos

		return () => clearInterval(interval);
	}, [mobileImages.length]);

	return (
		<div className='relative text-white overflow-hidden min-h-[500px] lg:min-h-[550px]'>
			{/* IMAGENES DE FONDO - MOBILE */}
			{mobileImages.map((image, index) => (
				<div
					key={`mobile-${index}`}
					className={`absolute inset-0 bg-cover bg-center h-full transition-opacity duration-1000 ease-in-out lg:hidden ${
						index === currentImage ? 'opacity-100' : 'opacity-0'
					}`}
					style={{ backgroundImage: `url(${image})` }}
				/>
			))}

			{/* IMAGENES DE FONDO - DESKTOP */}
			{desktopImages.map((image, index) => (
				<div
					key={`desktop-${index}`}
					className={`absolute inset-0 bg-cover h-full transition-opacity duration-1000 ease-in-out hidden lg:block ${
						index === currentImage ? 'opacity-100' : 'opacity-0'
					}`}
					style={{ 
						backgroundImage: `url(${image})`,
						backgroundPosition: 'center 100%'
					}}
				/>
			))}

			{/* OVERLAY */}
			<div className='absolute inset-0 bg-opacity-30' />

			{/* BOTÓN COMPRAR AHORA - RESPONSIVE */}
			<div className='hidden absolute inset-0 items-center justify-center lg:items-end lg:justify-start lg:bottom-20 lg:left-28 lg:inset-auto z-10'>
				<Link
					to='/monedas'
					className='bg-[#00FA65] hover:bg-[#4efa79] text-black font-semibold py-3 px-6 lg:py-4 lg:px-12 rounded-lg shadow-lg transition duration-300 ease-in-out text-sm lg:text-base'
				>
					Comprar ahora
				</Link>
			</div>

			{/* INDICADORES */}
			<div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2'>
				{mobileImages.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentImage(index)}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${
							index === currentImage 
								? 'bg-white scale-110' 
								: 'bg-white bg-opacity-50 hover:bg-opacity-75'
						}`}
					/>
				))}
			</div>
		</div>
	);
};