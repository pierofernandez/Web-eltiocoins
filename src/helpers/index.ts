import { Product } from '../components/interfaces/product.interface';

// Función para formatear el precio a dólares
export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
};

// Función para preparar los productos
export const PreparedProducts = (products: Product[]) => {
    return products.map(product => {
        // Formatear el precio del producto
        const formattedPrice = formatPrice(product.price);

        // Retornar el producto con el precio formateado
        return {
            ...product,
            formattedPrice, // Agrega un nuevo campo con el precio formateado
        };
    });
};
