import { Link } from "react-router-dom";
import SplitText2 from "../animations/AnimationBanner2";
import SplitText from "../animations/AnimationBanner";
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';

export const Banner = () => {
	useEffect(() => {
		Aos.init({duration: 1000});
	}, []);
	return (
		<div className='relative bg-gray-900 text-white'>
			{/* IMAGEN DE FONDO */}
			<div
				className='absolute inset-0 bg-cover bg-center opacity-70 h-full'
				style={{ backgroundImage: 'url(/img/caratula.jpg)' }}
			/>

			{/* OVERLAY */}
			<div className='absolute inset-0 bg-black opacity-50' />

			{/* CONTENIDO */}
			<div className='relative z-10 flex flex-col items-center justify-center py-20 px-4 text-center lg:py-40 lg:px-8'>
				<h1 className='text-4xl font-bold mb-4 lg:text-6xl'>
					<SplitText/>
				</h1>

				<p className='text-lg mb-8 lg:text-2xl'>
					<SplitText2/>
				</p>

				<Link
					to='/monedas'
					data-aos='zoom-out-left'
					className='bg-red-700 hover:bg-gray-950 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out'
				>
					Comprar ahora
				</Link>
			</div>
		</div>
	);
};