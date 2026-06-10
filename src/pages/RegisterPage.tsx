import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useRegister, useUser } from '../hooks';
import { LuEye, LuEyeOff, LuLoaderCircle } from 'react-icons/lu';
import { FiUser, FiPhone, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';
import { Loader } from '../components/shared/Loader';
import {
	UserRegisterFormValues,
	userRegisterSchema,
} from '../lib/validators';
import { useState } from 'react';

export const RegisterPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserRegisterFormValues>({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			phone: '',
		},
		resolver: zodResolver(userRegisterSchema),
	});

	const { mutate, isPending } = useRegister();
	const { session, isLoading } = useUser();

	//** Estado para mostrar/ocultar contraseña **/
	const [showPassword, setShowPassword] = useState(false);


	const onRegister = handleSubmit(data => {
		const { email, password, fullName, phone } = data;

		mutate({ email, password, fullName, phone });
	});

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
							<div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#70F468]/15'>
								<FiUserPlus className='text-[#70F468]' size={26} />
							</div>
							<h1 className='text-3xl font-bold text-white'>Regístrate</h1>
							<p className='mt-2 text-sm text-zinc-400'>
								Por favor, rellena los siguientes campos
							</p>
						</div>

						{isPending ? (
							<div className='flex justify-center py-16'>
								<LuLoaderCircle className='animate-spin text-[#70F468]' size={50} />
							</div>
						) : (
							<>
								<form className='flex flex-col gap-4' onSubmit={onRegister}>
									{/* Nombre completo */}
									<div>
										<label className='mb-1.5 block text-sm font-medium text-zinc-300'>
											Nombre completo
										</label>
										<div className='relative'>
											<FiUser className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500' size={18} />
											<input
												type='text'
												placeholder='Tu nombre completo'
												className='w-full rounded-xl border border-zinc-700 bg-zinc-800/60 py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 transition focus:border-[#70F468] focus:outline-none focus:ring-2 focus:ring-[#70F468]/30'
												{...register('fullName')}
											/>
										</div>
										{errors.fullName && (
											<p className='mt-1 text-xs text-red-400'>{errors.fullName.message}</p>
										)}
									</div>

									{/* Celular */}
									<div>
										<label className='mb-1.5 block text-sm font-medium text-zinc-300'>
											Celular
										</label>
										<div className='relative'>
											<FiPhone className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500' size={18} />
											<input
												type='text'
												placeholder='Tu número de celular'
												className='w-full rounded-xl border border-zinc-700 bg-zinc-800/60 py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 transition focus:border-[#70F468] focus:outline-none focus:ring-2 focus:ring-[#70F468]/30'
												{...register('phone')}
											/>
										</div>
										{errors.phone && (
											<p className='mt-1 text-xs text-red-400'>{errors.phone.message}</p>
										)}
									</div>

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
												{...register('email')}
											/>
										</div>
										{errors.email && (
											<p className='mt-1 text-xs text-red-400'>{errors.email.message}</p>
										)}
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
												{...register('password')}
											/>
											<button
												type='button'
												onClick={() => setShowPassword(prev => !prev)}
												className='absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-300'
											>
												{showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
											</button>
										</div>
										{errors.password && (
											<p className='mt-1 text-xs text-red-400'>{errors.password.message}</p>
										)}
									</div>

									<button className='mt-2 w-full rounded-xl bg-[#70F468] py-3.5 text-sm font-bold uppercase tracking-widest text-black shadow-lg transition hover:bg-[#5fe357] active:scale-[0.99]'>
										Registrarme
									</button>
								</form>

								<p className='mt-6 text-center text-sm text-zinc-400'>
									¿Ya tienes una cuenta?
									<Link
										to='/login'
										className='ml-2 font-semibold text-[#70F468] transition hover:underline'
									>
										Inicia sesión
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