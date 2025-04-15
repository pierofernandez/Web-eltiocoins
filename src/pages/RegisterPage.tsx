import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useRegister, useUser } from '../hooks';
import { LuEye, LuEyeOff, LuLoaderCircle } from 'react-icons/lu';
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
		<div className='h-full flex flex-col items-center mt-12 gap-5'>
			<h1 className='text-4xl font-bold capitalize'>Regístrate</h1>

			<p className='text-sm font-medium'>
				Por favor, rellene los siguientes campos:
			</p>

			{isPending ? (
				<div className='w-full h-full flex justify-center mt-20'>
					<LuLoaderCircle className='animate-spin' size={60} />
				</div>
			) : (
				<>
					<form
						className='flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]'
						onSubmit={onRegister}
					>
						<input
							type='text'
							placeholder='Nombre Completo'
							className='border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full'
							{...register('fullName')}
						/>
						{errors.fullName && (
							<p className='text-red-500'>
								{errors.fullName.message}
							</p>
						)}

						<input
							type='text'
							placeholder='Celular'
							className='border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full'
							{...register('phone')}
						/>
						{errors.phone && (
							<p className='text-red-500'>{errors.phone.message}</p>
						)}

						<input
							type='email'
							placeholder='Ingresa tu correo electrónico'
							className='border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full'
							{...register('email')}
						/>
						{errors.email && (
							<p className='text-red-500'>{errors.email.message}</p>
						)}

						<div className='relative w-full'>
							<input
								type={showPassword ? 'text' : 'password'}
								placeholder='Ingresa tu contraseña'
								className='border border-slate-200 text-black px-5 py-4 pr-12 placeholder:text-black text-sm rounded-full w-full'
								{...register('password')}
							/>
							{/* Botón para mostrar/ocultar contraseña */}
							<button
								type='button'
								onClick={() => setShowPassword(prev => !prev)}
								className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600'
							>
								{showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
							</button>
						</div>
						{errors.password && (
							<p className='text-red-500'>{errors.password.message}</p>
						)}


						<button className='bg-[#70F468] text-black uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full'>
							Registrarme
						</button>
					</form>

					<p className='text-sm text-white'>
						¿Ya tienes una cuenta?
						<Link to='/login' className='underline ml-2'>
							Inicia sesión
						</Link>
					</p>
				</>
			)}
		</div>
	);
};