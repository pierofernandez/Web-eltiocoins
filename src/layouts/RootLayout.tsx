import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Footer } from '../components/shared/Footer';
import { Banner } from '../components/home/Banner';
import { Newsletter } from '../components/home/Newsletter';
import { Sheet } from '../components/shared/Sheet';
import { useGlobalStore } from '../store/global.store';
import { NavbarMobile } from '../components/shared/NavbarMobile';
import { Navbar } from '../components/shared/Navbar';
import { useCurrencyStore } from '../store/currency.store';
import { NavigationButton } from '../components/home/NavigationButton';
import { LivePurchaseNotification } from '../components/home/LivePurchaseNotification';

export const RootLayout = () => {
	const { pathname } = useLocation();

	const isSheetOpen = useGlobalStore(state => state.isSheetOpen);
	const activeNavMobile = useGlobalStore(state => state.activeNavMobile);

	const loadRates = useCurrencyStore(state => state.loadRates);

	useEffect(() => {
		loadRates();
	}, [loadRates]);

	return (
		<div className='flex min-h-screen flex-col overflow-x-hidden font-montserrat'>
			<Navbar />

			{(pathname === '/') && <Banner />}

			<main className='container my-8 min-w-0 flex-1 overflow-x-hidden'>
				<Outlet />
			</main>

			<NavigationButton />

			<LivePurchaseNotification />

			{pathname === '/' && <Newsletter />}

			{isSheetOpen && <Sheet />}

			{activeNavMobile && <NavbarMobile />}

			<Footer />
		</div>
	);
};