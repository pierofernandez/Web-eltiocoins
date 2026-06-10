import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { signOut } from '../actions';
import { useUser, useRoleUser } from '../hooks';
import { useEffect } from 'react';
import { supabase } from '../supabase/client';
import { Loader } from '../components/shared/Loader';
import { HiOutlineExternalLink } from 'react-icons/hi';

export const ClientLayout = () => {
	const { session, isLoading: isLoadingSession } = useUser();

	const { data: role, isLoading: isLoadingRole } = useRoleUser(
		session?.user.id as string
	);

	const navigate = useNavigate();

	useEffect(() => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT' || !session) {
                navigate('/login', { replace: true });
			}
		});
	}, [navigate]);

	if (isLoadingSession || isLoadingRole) return <Loader />;

	const handleLogout = async () => {
		await signOut();
	};

	return (
		<div className='flex flex-col gap-5'>
			{/* Menú */}
			<nav className='mx-auto flex flex-wrap items-center justify-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 p-1.5 text-sm font-medium backdrop-blur-sm'>
				<NavLink
					to='/account/pedidos'
					className={({ isActive }) =>
						`rounded-full px-5 py-2 transition ${
							isActive
								? 'bg-[#70F468] text-black'
								: 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
						}`
					}
				>
					Pedidos
				</NavLink>

				{role === 'admin' && (
					<NavLink
						to='/dashboard'
						className='flex items-center gap-1.5 rounded-full px-5 py-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white'
					>
						Dashboard
						<HiOutlineExternalLink size={16} className='inline-block' />
					</NavLink>
				)}

				<button
					className='rounded-full px-5 py-2 text-zinc-300 transition hover:bg-red-500/10 hover:text-red-400'
					onClick={handleLogout}
				>
					Cerrar sesión
				</button>
			</nav>

			<main className='container mt-12 flex-1'>
				<Outlet />
			</main>
		</div>
	);
};