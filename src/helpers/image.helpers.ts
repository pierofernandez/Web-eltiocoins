export type ImageSize = 'thumb' | 'card' | 'banner-mobile' | 'banner-desktop' | 'popup';

/**
 * Devuelve la URL de imagen usable.
 * Nota: las transformaciones de Supabase (/render/image/) requieren plan Pro.
 * Si la URL ya apunta a render (p. ej. guardada por error), se corrige a object/public.
 */
export const optimizeImageUrl = (
	url: string | undefined | null,
	_size: ImageSize = 'card'
): string => {
	if (!url) return '';

	// Corregir URLs rotas que usen el endpoint de transformación no habilitado
	if (url.includes('/storage/v1/render/image/public/')) {
		return url
			.replace('/storage/v1/render/image/public/', '/storage/v1/object/public/')
			.split('?')[0];
	}

	return url.split('?')[0];
};
