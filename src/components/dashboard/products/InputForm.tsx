import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ProductFormValues } from '../../../lib/validators';

interface Props {
	className?: string;

	label: string;
	placeholder?: string;
	type: string;
	name: keyof ProductFormValues;
	register: UseFormRegister<ProductFormValues>;
	errors: FieldErrors<ProductFormValues>;
	required?: boolean;
}

export const InputForm = ({
	className,
	label,
	placeholder,
	type,
	name,
	register,
	errors,
	required,
}: Props) => {
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex justify-between items-center'>
				<label
					htmlFor={name}
					className='text-xs font-bold capitalize tracking-tight text-slate-900 dark:text-stone-200'
				>
					{label}:
				</label>

				{required && (
					<span
						className={`${
							required && 'text-red-500 text-sm mr-3'
						} font-bold self-end`}
					>
						*
					</span>
				)}
			</div>

			<div
				className={`items-center gap-5 overflow-hidden rounded-md border border-gray-300 dark:border-stone-600 ${
					errors[name] ? 'border-red-500' : ''
				}`}
			>
				<input
					type={type}
					placeholder={placeholder}
					id={name}
					className={`w-full px-3 py-1.5 text-sm font-medium tracking-tighter text-slate-600 outline-none focus:outline-none dark:bg-stone-800 dark:text-stone-100 ${className}`}
					autoComplete='off'
					{...register(name)}
				/>
			</div>
		</div>
	);
};