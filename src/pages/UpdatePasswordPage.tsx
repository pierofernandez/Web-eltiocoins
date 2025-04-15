import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { supabase } from '../supabase/client';

export const UpdatePasswordPage = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setMessage('Error al actualizar la contraseña.');
        } else {
            setMessage('Contraseña actualizada correctamente.');
        }
    };

    return (
        <div className='h-full flex flex-col items-center mt-12 gap-5'>
            <h1 className='text-3xl font-bold'>Nueva contraseña</h1>
            <p className='text-sm'>Ingresa tu nueva contraseña</p>

            <form
                className='flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]'
                onSubmit={handleUpdate}
            >
                <div className='relative w-full'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Ingresa tu contraseña'
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

                <button className='bg-[#70F468] text-black uppercase font-semibold tracking-widest text-xs py-4 rounded-full w-full'>
                    Actualizar
                </button>
            </form>

            {message && <p className='text-sm mt-4 text-white'>{message}</p>}
        </div>
    );
};
