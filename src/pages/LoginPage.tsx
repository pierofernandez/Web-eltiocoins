import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useLogin, useUser } from '../hooks';
import { Loader } from '../components/shared/Loader';
import { LuLoaderCircle } from 'react-icons/lu';
import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi';

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
		<div className='flex min-h-[80vh] items-center justify-center px-4 py-12'>
			<div className='w-full max-w-md'>
				<div className='relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-sm'>
					{/* Glow decorativo */}
					<div className='pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#70F468]/20 blur-3xl' />

					<div className='relative'>
						{/* Encabezado */}
						<div className='mb-8 text-center'>
							<h1 className='text-3xl font-bold text-white'>Iniciar sesión</h1>
							<p className='mt-2 text-sm text-zinc-400'>
								¡Qué bueno tenerte de vuelta!
							</p>
						</div>

						{isPending ? (
							<div className='flex justify-center py-16'>
								<LuLoaderCircle className='animate-spin text-[#70F468]' size={50} />
							</div>
						) : (
							<>
								<form className='flex flex-col gap-4' onSubmit={onLogin}>
									{/* Email */}
									<div>
										<label className='mb-1.5 block text-sm font-medium text-zinc-300'>
											Correo electrónico
										</label>
										<div className='relative'>
											<FiMail className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500' size={18} />
											<input
												type='email'
												placeholder='tucorreo@email.com'
												className='w-full rounded-xl border border-zinc-700 bg-zinc-800/60 py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 transition focus:border-[#70F468] focus:outline-none focus:ring-2 focus:ring-[#70F468]/30'
												value={email}
												onChange={e => setEmail(e.target.value)}
											/>
										</div>
									</div>

									{/* Contraseña */}
									<div>
										<label className='mb-1.5 block text-sm font-medium text-zinc-300'>
											Contraseña
										</label>
										<div className='relative'>
											<FiLock className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500' size={18} />
											<input
												type={showPassword ? 'text' : 'password'}
												placeholder='Ingresa tu contraseña'
												className='w-full rounded-xl border border-zinc-700 bg-zinc-800/60 py-3 pl-11 pr-12 text-sm text-white placeholder-zinc-500 transition focus:border-[#70F468] focus:outline-none focus:ring-2 focus:ring-[#70F468]/30'
												value={password}
												onChange={e => setPassword(e.target.value)}
											/>
											<button
												type='button'
												onClick={() => setShowPassword(!showPassword)}
												className='absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-300'
											>
												{showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
											</button>
										</div>
									</div>

									{/* Recuperar contraseña */}
									<div className='text-right'>
										<Link
											to='/forgot-password'
											className='text-sm text-[#70F468] transition hover:underline'
										>
											¿Olvidaste tu contraseña?
										</Link>
									</div>

									<button className='mt-2 w-full rounded-xl bg-[#70F468] py-3.5 text-sm font-bold uppercase tracking-widest text-black shadow-lg transition hover:bg-[#5fe357] active:scale-[0.99]'>
										Iniciar sesión
									</button>
								</form>

								<p className='mt-6 text-center text-sm text-zinc-400'>
									¿No tienes una cuenta?
									<Link
										to='/register'
										className='ml-2 font-semibold text-[#70F468] transition hover:underline'
									>
										Regístrate
									</Link>
								</p>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
