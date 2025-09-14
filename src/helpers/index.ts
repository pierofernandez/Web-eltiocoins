import { Color, Product, VariantProduct } from "../components/interfaces";


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
		// Agrupar las variantes por color
		const colors = product.variants.reduce(
			(acc: Color[], variant: VariantProduct) => {
				const existingColor = acc.find(
					item => item.color === variant.color
				);

				if (existingColor) {
					// Si ya existe el color, comparamos los precios
					existingColor.price = Math.min(
						existingColor.price,
						variant.price
					);
				} // Mantenemos el precio mínimo
				else {
					acc.push({
						color: variant.color,
						price: variant.price,
						name: variant.color_name,
					});
				}

				return acc;
			},
			[]
		);

        // Obtener el precio más bajo de las variantes agrupadas
		const price = Math.min(...colors.map(item => item.price));

		// Devolver el producto formateado
		return {
			...product,
			price,
			colors: colors.map(({ name, color }) => ({ name, color })),
			variants: product.variants,
		};
	});
};

//funcion para formatear fecha a fonrmato 3 de enero de 2025

export const formatDateLong = (date: string) : string => {
	const dateObject = new Date(date);
	return dateObject.toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

//funcion para formatear la fecha a formato dd/mm/yyyy
export const formatDate = (date: string) : string => {
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

//funcion para traer las tasas de cambio desde exchangerate.host

const fetchRates = async (base: string = 'USD') => {
  // Usar una API gratuita que no requiere clave de acceso
  const res = await fetch(`https://api.fxratesapi.com/latest?base=${base}`);
  if (!res.ok) throw new Error("Error al traer tasas de cambio");
  const data = await res.json();
  return data.rates as Record<string, number>;
};
export default fetchRates;


//hook para convertir precios usando las tasas de cambio y la moneda seleccionada


