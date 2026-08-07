export type ImageCompressPreset = 'product' | 'banner-desktop' | 'banner-mobile' | 'offer';

const PRESETS: Record<
	ImageCompressPreset,
	{ maxWidth: number; maxHeight: number; quality: number }
> = {
	product: { maxWidth: 1200, maxHeight: 1200, quality: 0.82 },
	'banner-desktop': { maxWidth: 1400, maxHeight: 900, quality: 0.85 },
	'banner-mobile': { maxWidth: 828, maxHeight: 1200, quality: 0.85 },
	offer: { maxWidth: 900, maxHeight: 1200, quality: 0.85 },
};

const loadImageFromFile = (file: File): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			URL.revokeObjectURL(url);
			resolve(img);
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(new Error('No se pudo leer la imagen'));
		};
		img.src = url;
	});

/**
 * Comprime y convierte imágenes a WebP antes de subirlas a Supabase.
 */
export async function compressImageFile(
	file: File,
	preset: ImageCompressPreset = 'product'
): Promise<File> {
	if (!file.type.startsWith('image/')) return file;
	if (file.type === 'image/gif') return file;
	if (file.type === 'image/webp' && file.size <= 350_000) return file;

	const { maxWidth, maxHeight, quality } = PRESETS[preset];

	try {
		const img = await loadImageFromFile(file);
		const scale = Math.min(1, maxWidth / img.width, maxHeight / img.height);
		const width = Math.max(1, Math.round(img.width * scale));
		const height = Math.max(1, Math.round(img.height * scale));

		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		const ctx = canvas.getContext('2d');
		if (!ctx) return file;

		ctx.drawImage(img, 0, 0, width, height);

		const blob = await new Promise<Blob | null>((resolve) =>
			canvas.toBlob(resolve, 'image/webp', quality)
		);

		if (!blob) return file;

		const baseName = file.name.replace(/\.[^.]+$/, '') || 'imagen';
		return new File([blob], `${baseName}.webp`, {
			type: 'image/webp',
			lastModified: Date.now(),
		});
	} catch {
		return file;
	}
}

export async function compressImageFiles(
	files: File[],
	preset: ImageCompressPreset = 'product'
): Promise<File[]> {
	return Promise.all(files.map((file) => compressImageFile(file, preset)));
}
