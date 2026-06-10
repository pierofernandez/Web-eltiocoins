import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase/client';
import { FiMail, FiKey } from 'react-icons/fi';
import { LuLoaderCircle } from 'react-icons/lu';

export const ForgotPasswordPage = () => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [isError, setIsError] = useState(false);
	const [isPending, setIsPending] = useState(false);

	const handleReset = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsPending(true);
		setMessage('');

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: 'https://eltiocoins.com/update-password',
		});

		setIsPending(false);

		if (error) {
			setIsError(true);
			setMessage('Error al enviar el correo. Intenta nuevamente.');
		} else {
			setIsError(false);
			setMessage('Correo de recuperación enviado. Revisa tu bandeja de entrada.');
		}
	};

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
								<FiKey className='text-[#70F468]' size={26} />
							</div>
							<h1 className='text-3xl font-bold text-white'>Recuperar contraseña</h1>
							<p className='mt-2 text-sm text-zinc-400'>
								Ingresa tu correo para recibir el enlace de recuperación
							</p>
						</div>

						<form className='flex flex-col gap-4' onSubmit={handleReset}>
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

							<button
								disabled={isPending}
								className='mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#70F468] py-3.5 text-sm font-bold uppercase tracking-widest text-black shadow-lg transition hover:bg-[#5fe357] active:scale-[0.99] disabled:opacity-60'
							>
								{isPending && <LuLoaderCircle className='animate-spin' size={18} />}
								Enviar enlace
							</button>
						</form>

						{/* Mensaje */}
						{message && (
							<p
								className={`mt-4 rounded-lg p-3 text-center text-sm ${
									isError
										? 'bg-red-500/10 text-red-400'
										: 'bg-[#70F468]/10 text-[#70F468]'
								}`}
							>
								{message}
							</p>
						)}

						<p className='mt-6 text-center text-sm text-zinc-400'>
							¿Recordaste tu contraseña?
							<Link
								to='/login'
								className='ml-2 font-semibold text-[#70F468] transition hover:underline'
							>
								Inicia sesión
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
