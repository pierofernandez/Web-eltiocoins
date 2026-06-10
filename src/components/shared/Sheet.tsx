import { useEffect, useRef } from 'react';
import { Cart } from './Cart';
import { Search } from './Search';
import { useGlobalStore } from '../../store/global.store';

export const Sheet = () => {
	const sheetContent = useGlobalStore(state => state.sheetContent);
	const closeSheet = useGlobalStore(state => state.closeSheet);

	const sheetRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		document.body.style.overflow = 'hidden';

		// Función para manejar clics fuera del Sheet
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				sheetRef.current &&
				!sheetRef.current.contains(event.target as Node)
			) {
				closeSheet();
			}
		};

		// Agregar event Listener
		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.body.style.overflow = 'unset';
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [closeSheet]);

	// Función para saber el componente a renderizar
	const renderContent = () => {
		switch (sheetContent) {
			case 'cart':
				return <Cart />;
			case 'search':
				return <Search />;
			default:
				return null;
		}
	};

	return (
		<div className='fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in'>
			<div
				ref={sheetRef}
				className='h-screen w-full max-w-[440px] bg-[#0b0b0b] text-white shadow-2xl animate-slide-in'
			>
				{renderContent()}
			</div>
		</div>
	);
};

