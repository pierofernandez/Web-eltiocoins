import { useEffect, useState } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';

export const Banner = () => {
	const [currentImage, setCurrentImage] = useState(0);

	// Imágenes responsive: móvil y desktop
	const mobileImages = ['/img/sliders/slider1mobile.webp', '/img/sliders/slider2mobile.webp'];
	const desktopImages = ['/img/sliders/slider1pc.webp', '/img/sliders/slider2pc.webp'];

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
		<div className='relative text-white overflow-hidden min-h-[400px] md:min-h-[750px] lg:min-h-[550px] bg-gradient-to-b from-black/70  '>
			{/* IMAGENES DE FONDO - MOBILE/TABLET */}
			{mobileImages.map((image, index) => (
				<div
					key={`mobile-${index}`}
					className={`absolute inset-0 h-full transition-opacity duration-1000 ease-in-out lg:hidden ${index === currentImage ? 'opacity-100' : 'opacity-0'
						} bg-contain bg-center bg-no-repeat md:bg-cover`}
					style={{ backgroundImage: `url(${image})` }}
				/>
			))}
			{/* IMAGENES DE FONDO - DESKTOP */}
			{desktopImages.map((image, index) => (
				<div
					key={`desktop-${index}`}
					className={`absolute inset-0 bg-cover h-full transition-opacity duration-1000 ease-in-out hidden lg:block ${index === currentImage ? 'opacity-100' : 'opacity-0'
						}`}
					style={{
						backgroundImage: `url(${image})`,
						backgroundPosition: 'center 100%'
					}}
				/>
			))}



			{/* INDICADORES */}
			< div className='absolute bottom-8 md:bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2'>
				{mobileImages.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentImage(index)}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImage
							? 'bg-white scale-110'
							: 'bg-white bg-opacity-50 hover:bg-opacity-75'
							}`}
					/>
				))}
			</div>
		</div >
	);
};