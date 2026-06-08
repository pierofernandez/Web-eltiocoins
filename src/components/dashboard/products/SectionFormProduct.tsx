import { ReactNode } from 'react';

interface Props {
	className?: string;
	titleSection?: string;
	children: ReactNode;
}

export const SectionFormProduct = ({
	className,
	titleSection,
	children,
}: Props) => {
	return (
		<div
			className={`flex h-fit flex-col gap-4 rounded-md border border-gray-300 bg-white p-7 shadow-sm dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 ${className}`}
		>
			{titleSection && (
				<h2 className='font-bold tracking-tight text-xl'>
					{titleSection}:
				</h2>
			)}
			{children}
		</div>
	);
};