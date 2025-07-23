import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { AddressFormValues } from '../../lib/validators';
import { motion } from 'framer-motion';

interface Props {
	register: UseFormRegister<AddressFormValues>;
	errors: FieldErrors<AddressFormValues>;
	name: keyof AddressFormValues;
	className?: string;
	placeholder: string;
}

export const InputAddress = ({
	register,
	errors,
	name,
	className,
	placeholder,
}: Props) => {
	return (
		<div className="space-y-2">
			<div
				className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
					errors[name] 
						? 'border-red-500 ring-2 ring-red-500/20' 
						: 'border-white/20 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/20'
				} ${className}`}
			>
				<input
					type='text'
					className='w-full bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none text-sm lg:text-base'
					placeholder={placeholder}
					{...register(name)}
				/>
				{/* Efecto de brillo en el borde */}
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
			</div>
			
			{errors[name] && (
				<motion.p 
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className='text-red-400 text-xs font-medium flex items-center gap-1'
				>
					<span className="w-1 h-1 bg-red-400 rounded-full"></span>
					{errors[name].message}
				</motion.p>
			)}
		</div>
	);
};