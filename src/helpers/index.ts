import { Product, VariantProduct } from "../components/interfaces";


// Función para formatear y convertir el precio entre monedas
// price está en baseCurrency (moneda en la que guardas tus precios)
export const formatPrice = (
	price: number,
	currency: string = 'USD',
	rates: Record<string, number> = { USD: 1 },
	baseCurrency: string = 'USD'
) => {
	// Si la moneda es la misma que la base, no hay conversión
	// Si la API devuelve rates con base USD: precio_destino = precio_base × rate[destino]
	const convertedPrice = currency === baseCurrency ? price : price * (rates[currency] || 1);

	const currencyConfig = {
		USD: { locale: 'en-US', currency: 'USD', symbol: '$' },
		EUR: { locale: 'de-DE', currency: 'EUR', symbol: '€' },
		PEN: { locale: 'es-PE', currency: 'PEN', symbol: 'S/' },
		MXN: { locale: 'es-MX', currency: 'MXN', symbol: '$' },
		CLP: { locale: 'es-CL', currency: 'CLP', symbol: '$' },
	} as const;

	const config = currencyConfig[(currency as keyof typeof currencyConfig) ?? 'USD'] || currencyConfig.USD;

	return new Intl.NumberFormat(config.locale, {
		style: 'currency',
		currency: config.currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(convertedPrice);
};

// Función para preparar los productos 
export const prepareProducts = (products: Product[]) => {
	return products.map(product => {
		// Obtener el precio más bajo de las variantes
		const price = product.variants.length > 0
			? Math.min(...product.variants.map((v: VariantProduct) => v.price))
			: 0;

		// Devolver el producto formateado
		return {
			...product,
			price,
			variants: product.variants,
		};
	});
};

//funcion para formatear fecha a fonrmato 3 de enero de 2025

export const formatDateLong = (date: string): string => {
	const dateObject = new Date(date);
	return dateObject.toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

//funcion para formatear la fecha a formato dd/mm/yyyy
export * from './generateOrderReceiptPdf';

export const formatDate = (date: string): string => {
	const dateObject = new Date(date);
	return dateObject.toLocaleDateString('es-ES', {
		year: 'numeric',
		month: '2-digit',
		day: 'numeric',
	});
};


export const getStatus = (status: string): string => {

	switch (status) {
		case 'Pending':
			return 'Pendiente';
		case 'Paid':
			return 'Pagado';
		default:
			return 'status';
	}

}

//funcion para generar un slug a partir de un prodcuto
export const generateSlug = (name: string): string => {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
};

//funcion para extraer el path relativo de una URL
export const extractFilePath = (url: string) => {
	const parts = url.split(
		'/storage/v1/object/public/product-images/'
	);
	// EJEMPLO PARTS: ['/storage/v1/ object/public/product-images/', '02930920302302030293023-iphone-12-pro-max.jpg']

	if (parts.length !== 2) {
		throw new Error(`URL de imagen no válida: ${url}`);
	}

	return parts[1];
};

// Tasas de cambio con caché local (evita 429 por exceso de peticiones)

const FX_CACHE_KEY = 'eltiocoins_fx_rates';
const FX_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 horas

const FALLBACK_RATES: Record<string, number> = {
	USD: 1,
	EUR: 0.92,
	PEN: 3.75,
	MXN: 17.15,
	CLP: 950,
};

type CachedRates = {
	base: string;
	rates: Record<string, number>;
	fetchedAt: number;
};

const readRatesCache = (base: string): Record<string, number> | null => {
	try {
		const raw = localStorage.getItem(FX_CACHE_KEY);
		if (!raw) return null;

		const cached: CachedRates = JSON.parse(raw);
		if (cached.base !== base) return null;
		if (Date.now() - cached.fetchedAt > FX_CACHE_TTL_MS) return null;

		return cached.rates;
	} catch {
		return null;
	}
};

const readStaleRatesCache = (base: string): Record<string, number> | null => {
	try {
		const raw = localStorage.getItem(FX_CACHE_KEY);
		if (!raw) return null;

		const cached: CachedRates = JSON.parse(raw);
		return cached.base === base ? cached.rates : null;
	} catch {
		return null;
	}
};

const writeRatesCache = (base: string, rates: Record<string, number>) => {
	try {
		const payload: CachedRates = { base, rates, fetchedAt: Date.now() };
		localStorage.setItem(FX_CACHE_KEY, JSON.stringify(payload));
	} catch {
		// Ignorar si localStorage no está disponible
	}
};

const fetchRates = async (base: string = 'USD'): Promise<Record<string, number>> => {
	const cached = readRatesCache(base);
	if (cached) return cached;

	try {
		const res = await fetch(`https://api.fxratesapi.com/latest?base=${base}`);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);

		const data = await res.json();
		const rates = (data.rates ?? FALLBACK_RATES) as Record<string, number>;
		writeRatesCache(base, rates);
		return rates;
	} catch {
		// Si la API falla (429, red, etc.), usar caché expirada o tasas fijas
		return readStaleRatesCache(base) ?? { ...FALLBACK_RATES };
	}
};

export default fetchRates;

export * from './pricing.helpers';
export * from './image.helpers';
export * from './compressImage';
