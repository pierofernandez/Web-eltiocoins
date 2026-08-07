import { optimizeImageUrl, type ImageSize } from '@/helpers/image.helpers';

type OptimizedImageProps = {
	src: string;
	alt: string;
	size?: ImageSize;
	className?: string;
	loading?: 'lazy' | 'eager';
	fetchPriority?: 'high' | 'low' | 'auto';
	decoding?: 'async' | 'sync' | 'auto';
	width?: number;
	height?: number;
};

export const OptimizedImage = ({
	src,
	alt,
	size = 'card',
	className,
	loading = 'lazy',
	fetchPriority = 'auto',
	decoding = 'async',
	width,
	height,
}: OptimizedImageProps) => {
	const optimizedSrc = optimizeImageUrl(src, size);

	return (
		<img
			src={optimizedSrc}
			alt={alt}
			className={className}
			loading={loading}
			fetchPriority={fetchPriority}
			decoding={decoding}
			width={width}
			height={height}
		/>
	);
};
