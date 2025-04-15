import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useLogin, useUser } from '../hooks';
import { Loader } from '../components/shared/Loader';
import { LuLoaderCircle } from 'react-icons/lu';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Iconos de ojito

export const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

	const { mutate, isPending } = useLogin();
	const { session, isLoading } = useUser();

	const onLogin = (e: React.FormEvent) => {
		e.preventDefault();

		mutate({ email, password });
	};

	if (isLoading) return <Loader />;

	if (session) return <Navigate to='/' />;

	return (
		<div className='h-full flex flex-col items-center mt-12 gap-5'>
			<h1 className='text-4xl font-bold capitalize'>
				Iniciar sesión
			</h1>

			<p className='text-sm font-medium'>
				¡Que bueno tenerte de vuelta!
			</p>

			{isPending ? (
				<div className='w-full h-full flex justify-center mt-20'>
					<LuLoaderCircle className='animate-spin' size={60} />
				</div>
			) : (
				<>
					<form
						className='flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]'
						onSubmit={onLogin}
					>
						<input
							type='email'
							placeholder='Ingresa tu correo electrónico'
							className='border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>

						{/* Campo de contraseña */}
						<div className='relative w-full'>
							<input
								type={showPassword ? 'text' : 'password'}
								placeholder='Ingresa tu contraseña'
								className='border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full pr-12'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							{/* Botón para mostrar/ocultar la contraseña */}
							<button
								type='button'
								onClick={() => setShowPassword(!showPassword)}
								className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500'
							>
								{showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
							</button>
						</div>

						{/* Enlace para recuperación de contraseña */}
						<div className='w-full text-right'>
							<Link
								to='/forgot-password'
								className='text-sm text-blue-300 underline'
							>
								¿Olvidaste tu contraseña?
							</Link>
						</div>

						<button className='bg-[#70F468] text-black uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-3 w-full'>
							Iniciar sesión
						</button>
					</form>

					<p className='text-sm text-white mt-4'>
						¿No tienes una cuenta?
						<Link to='/register' className='underline ml-2'>
							Regístrate
						</Link>
					</p>
				</>
			)}
		</div>
	);
};
