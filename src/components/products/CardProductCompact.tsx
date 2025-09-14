import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cart.store';
import { useCurrencyStore } from '../../store/currency.store';
import { formatPrice } from '../../helpers';
import toast from 'react-hot-toast';
import { VariantProduct } from '../interfaces';

interface Props {
  img: string;
  name: string;
  price: number;
  slug: string;
  variants: VariantProduct[];
}

export const CardProductCompact = ({ img, name, price, slug, variants }: Props) => {
  const addItem = useCartStore(state => state.addItem);
  const { currency, rates, baseCurrency } = useCurrencyStore();

  const handleAddClick = () => {
    const firstVariant = variants[0];
    if (firstVariant && firstVariant.stock > 0) {
      addItem({
        variantId: firstVariant.id,
        productId: slug,
        name,
        image: img,
        color: 'Default',
        price: firstVariant.price,
        quantity: 1,
      });
      toast.success(`${name} agregado al carrito`);
    } else {
      toast.error('Producto agotado');
    }
  };

  return (
    <div className="bg-zinc-950 backdrop-blur-sm transition-all duration-200 shadow-sm hover:shadow-md">
      <div className="flex items-center p-3 sm:p-4 gap-3 sm:gap-4">
        {/* Imagen pequeña - Izquierda con navegación */}
        <Link to={`/monedas/${slug}`} className="flex-shrink-0">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={img}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>

        {/* Descripción */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-white truncate">{name}</h3>
          <p className="text-[10px] sm:text-sm text-gray-400 mt-1">Tiempo completo: 1-3 horas</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-[7px] sm:text-xs font-medium bg-orange-100 text-orange-800">
              Recién llegado + 5K
            </span>
          </div>
        </div>

        {/* Precio */}
        <div className="flex-shrink-0 text-right">
          <div className="text-sm sm:text-lg font-bold text-white">
            {formatPrice(price, currency, rates, baseCurrency)}
          </div>
        </div>

        {/* Botón */}
        <div className="flex-shrink-0">
          <button
            onClick={handleAddClick}
            className="px-3 sm:px-6 py-1.5 sm:py-2 bg-green-400 hover:bg-green-600 rounded-full text-black font-medium transition-colors duration-200 text-xs sm:text-sm"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductCompact;
