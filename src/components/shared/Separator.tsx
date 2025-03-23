interface Props {
	className?: string;
}

export const Separator = ({ className }: Props) => {
	return <div className={` bg-[#151616] h-px my-5 ${className}`} />;
};