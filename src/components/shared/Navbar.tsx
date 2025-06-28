import { Link, NavLink } from 'react-router-dom';
import { navbarLinks } from '../../constants/links';
import {
	HiOutlineSearch,
} from 'react-icons/hi';
import { GiShoppingCart } from 'react-icons/gi';
import { PiUserLight } from 'react-icons/pi';
import { FaBarsStaggered } from 'react-icons/fa6';
import { Logo } from './Logo';
import { useGlobalStore } from '../../store/global.store';
import { useCartStore } from '../../store/cart.store';
import { useCustomer, useUser } from '../../hooks';
import { LuLoaderCircle } from 'react-icons/lu';
import { Banner } from './Banner';

export const Navbar = () => {
	const openSheet = useGlobalStore(state => state.openSheet);

	const totalItemsInCart = useCartStore(
		state => state.totalItemsInCart
	);

	const setActiveNavMobile = useGlobalStore(
		state => state.setActiveNavMobile
	);

	const { session, isLoading } = useUser();

	const userId = session?.user.id;
	const { data: customer } = useCustomer(userId!);

	return (
		<div>
			<Banner />

			{/* Header principal */}
			<header className='bg-zinc-900 text-white px-5 lg:px-12 pt-4 pb-2 border-b border-zinc-700 flex flex-col items-center'>
				<div className='w-full flex justify-between items-center mb-3'>
					<Logo/>

					{/* Buscador centrado solo en desktop */}
					<div className="hidden sm:flex flex-1 justify-center">
						<div
							onClick={() => openSheet('search')}
							className="flex items-center bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 w-full max-w-2xl cursor-text hover:ring-2 hover:ring-green-400 transition"
						>
							<input
								type="text"
								placeholder="Buscar..."
								onFocus={() => openSheet('search')}
								className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
							/>
							<HiOutlineSearch size={20} className="text-gray-400 ml-2" />
						</div>
					</div>

					<div className='flex items-center gap-5 ml-4'>
						{/* Icono de búsqueda solo en móviles */}
						<button
							className='sm:hidden'
							onClick={() => openSheet('search')}
						>
							<HiOutlineSearch size={30} className="hover:text-green-400 transition" />
						</button>

						{isLoading ? (
							<LuLoaderCircle className='animate-spin' size={30} />
						) : session ? (
							<Link
								to='/account'
								className='w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-800 text-white grid place-items-center font-semibold border border-zinc-600 hover:border-green-400 transition text-sm sm:text-base'
							>
								{customer && customer.full_name[0]}
							</Link>
						) : (
							<Link to='/login'>
								<PiUserLight size={30} className="hover:text-green-400 transition" />
							</Link>
						)}

						<button
							className='relative'
							onClick={() => openSheet('cart')}
						>
							<span className='absolute -bottom-2 -right-2 w-5 h-5 bg-green-400 text-black text-xs rounded-full grid place-items-center font-bold'>
								{totalItemsInCart}
							</span>
							<GiShoppingCart size={30} className="hover:text-green-400 transition" />
						</button>

						<button
							className='md:hidden ml-2'
							onClick={() => setActiveNavMobile(true)}
						>
							<FaBarsStaggered size={30} className="hover:text-green-400 transition" />
						</button>
					</div>
				</div>
			</header>

			{/* Menú de navegación independiente con otro fondo */}
			<nav className='hidden lg:flex bg-zinc-800 px-5 lg:px-12 py-2 gap-5 text-sm font-semibold justify-center border-b border-zinc-700'>
				{navbarLinks.map(link => (
					<NavLink
						key={link.id}
						to={link.href}
						className={({ isActive }) =>
							`${isActive
								? 'text-green-400 border-b-2 border-green-400 pb-1'
								: 'text-white hover:text-green-400'
							} transition-all duration-200`
						}
					>
						{link.title}
					</NavLink>
				))}
			</nav>
		</div>
	);
};