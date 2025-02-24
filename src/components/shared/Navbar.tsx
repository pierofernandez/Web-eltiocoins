import { Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { navbarLinks } from "../../constants/links";
import { useCartStore } from "../../store/cart.store";
import { useGlobalStore } from "../../store/global.store";
import { HiOutlineSearch, HiOutlineShoppingBag } from "react-icons/hi";
import { FaBarsStaggered } from "react-icons/fa6";


export const Navbar = () => {
	const openSheet = useGlobalStore(state => state.openSheet);

	const totalItemsInCart = useCartStore(
		state => state.totalItemsInCart
	);

	const setActiveNavMobile = useGlobalStore(
		state => state.setActiveNavMobile
	);

	return (
		<header className='bg-[#DDAF13] text-black py-4 flex items-center justify-between px-5 border-b'>
			<Logo />

			<nav className='space-x-5 hidden md:flex'>
				{navbarLinks.map(link => (
					<NavLink
						key={link.id}
						to={link.href}
						className={({ isActive }) =>
							`${
								isActive ? 'text-black underline' : ''
							} transition-all duration-300 font-medium hover:text-black hover:underline `
						}
					>
						{link.title}
					</NavLink>
				))}
			</nav>

			<div className='flex gap-5 items-center'>
				<button onClick={() => openSheet('search')}>
					<HiOutlineSearch size={25} />
				</button>

				<div className='relative'>
					{/* User Nav */}
					<Link
						to='/account'
						className='border-2 border-black w-9 h-9 rounded-full grid place-items-center text-lg font-bold'
					>
						R
					</Link>
				</div>

				<button
					className='relative'
					onClick={() => openSheet('cart')}
				>
					<span className='absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full'>
						{totalItemsInCart}
					</span>
					<HiOutlineShoppingBag size={25} />
				</button>
			</div>

			<button
				className='md:hidden'
				onClick={() => setActiveNavMobile(true)}
			>
				<FaBarsStaggered size={25} />
			</button>
		</header>
	);
};