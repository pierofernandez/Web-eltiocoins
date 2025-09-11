import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cart.store';
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
    <div className="bg-slate-950 backdrop-blur-sm  transition-all duration-200 shadow-sm hover:shadow-md">
      <div className="flex items-center p-4 gap-4">
        {/* Imagen pequeña - Izquierda con navegación */}
        <Link to={`/monedas/${slug}`} className="flex-shrink-0">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={img}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>

        {/* Descripción */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 truncate">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">Complete Time: 1-3Hour</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
              Newcomer + 5K
            </span>
          </div>
        </div>

        {/* Precio */}
        <div className="flex-shrink-0 text-right">
          <div className="text-lg font-bold text-gray-900">
            {price.toFixed(2)} <span className="text-sm font-normal text-gray-600">PEN</span>
          </div>
        </div>

        {/* Botón */}
        <div className="flex-shrink-0">
          <button
            onClick={handleAddClick}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-full text-white font-medium transition-colors duration-200 text-sm"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductCompact;
