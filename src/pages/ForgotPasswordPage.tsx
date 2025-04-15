import { useState } from 'react';
import { supabase } from '../supabase/client';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export const ForgotPasswordPage = () => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState('');

	const handleReset = async (e: React.FormEvent) => {
		e.preventDefault();

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: 'http://localhost:5173/update-password', // cambia esto si estás en producción
		});

		if (error) {
			setMessage('Error al enviar el correo. Intenta nuevamente.');
		} else {
			setMessage('Correo de recuperación enviado. Revisa tu bandeja de entrada.');
		}
	};

	return (
		<div className='h-full flex flex-col items-center mt-12 gap-5'>
			<h1 className='text-3xl font-bold'>Recuperar contraseña</h1>
			<p className='text-sm'>Ingresa tu correo para recibir el enlace de recuperación</p>

			<form
				className='flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]'
				onSubmit={handleReset}
			>
				{/* Campo Email */}
				<input
					type='email'
					placeholder='Tu correo electrónico'
					className='border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				{/* Aquí puedes agregar el campo de la contraseña en caso de que lo necesites */}
				{/* Si deseas tener la funcionalidad de ver/ocultar la contraseña */}
				{/* Este campo es opcional para esta página */}
				<div className='relative w-full'>
					<input
						type={showPassword ? 'text' : 'password'}
						placeholder='Ingresa tu nueva contraseña'
						className='border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full pr-12'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						type='button'
						onClick={() => setShowPassword(!showPassword)}
						className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500'
					>
						{showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
					</button>
				</div>

				{/* Botón para enviar el enlace de recuperación */}
				<button className='bg-[#70F468] text-black uppercase font-semibold tracking-widest text-xs py-4 rounded-full w-full'>
					Enviar enlace
				</button>
			</form>

			{/* Mensajes */}
			{message && <p className='text-sm mt-4 text-white'>{message}</p>}
		</div>
	);
};
