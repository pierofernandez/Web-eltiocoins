import { useEffect, useMemo, useState } from 'react';
import { getBanners } from '../../actions/banner';
import { optimizeImageUrl } from '@/helpers/image.helpers';

const FALLBACK_MOBILE = ['/img/sliders/slider1mobile.webp', '/img/sliders/slider2mobile.webp'];
const FALLBACK_DESKTOP = ['/img/sliders/slider1pc.webp', '/img/sliders/slider2pc.webp'];

export const Banner = () => {
	const [currentImage, setCurrentImage] = useState(0);
	const [banners, setBanners] = useState<{ mobile_url: string; desktop_url: string }[]>([]);

	// Mostrar fallbacks al instante; actualizar cuando lleguen banners de Supabase
	useEffect(() => {
		getBanners()
			.then((data) => {
				if (data.length > 0) setBanners(data);
			})
			.catch((error) => {
				console.error('Error fetching banners:', error);
			});
	}, []);

	const mobileImages = useMemo(
		() =>
			banners.length > 0
				? banners.map((b) => optimizeImageUrl(b.mobile_url, 'banner-mobile'))
				: FALLBACK_MOBILE,
		[banners]
	);

	const desktopImages = useMemo(
		() =>
			banners.length > 0
				? banners.map((b) => optimizeImageUrl(b.desktop_url, 'banner-desktop'))
				: FALLBACK_DESKTOP,
		[banners]
	);

	const totalSlides = mobileImages.length;

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImage((prev) => (prev + 1) % totalSlides);
		}, 5000);
		return () => clearInterval(interval);
	}, [totalSlides]);

	// Precargar la siguiente diapositiva sin bloquear la actual
	useEffect(() => {
		const nextIndex = (currentImage + 1) % totalSlides;
		const preloadMobile = new Image();
		preloadMobile.src = mobileImages[nextIndex];
		const preloadDesktop = new Image();
		preloadDesktop.src = desktopImages[nextIndex];
	}, [currentImage, mobileImages, desktopImages, totalSlides]);

	const activeMobile = mobileImages[currentImage];
	const activeDesktop = desktopImages[currentImage];

	return (
		<div className="relative w-full overflow-hidden bg-stone-900 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9]">
			{/* Mobile / tablet — solo la imagen activa (mejor LCP) */}
			<img
				key={`mobile-${activeMobile}`}
				src={activeMobile}
				alt="Promoción El Tio Coins"
				width={828}
				height={517}
				fetchPriority="high"
				loading="eager"
				decoding="async"
				className="absolute inset-0 h-full w-full object-cover object-center lg:hidden"
			/>

			{/* Desktop */}
			<img
				key={`desktop-${activeDesktop}`}
				src={activeDesktop}
				alt="Promoción El Tio Coins"
				width={1400}
				height={600}
				fetchPriority="high"
				loading="eager"
				decoding="async"
				className="absolute inset-0 hidden h-full w-full object-cover object-center lg:block"
			/>

			{/* Indicadores */}
			<div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 space-x-2 md:bottom-3">
				{mobileImages.map((_, index) => (
					<button
						key={index}
						type="button"
						aria-label={`Ir a banner ${index + 1}`}
						onClick={() => setCurrentImage(index)}
						className={`h-3 w-3 rounded-full transition-all duration-300 ${
							index === currentImage
								? 'scale-110 bg-white'
								: 'bg-white/50 hover:bg-white/75'
						}`}
					/>
				))}
			</div>
		</div>
	);
};
