import { useEffect, useState } from 'react';
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
  basePath?: string;
}

export const CardProductCompact = ({
  img,
  name,
  price,
  slug,
  variants,
  basePath = '/monedas',
}: Props) => {
  const addItem = useCartStore(state => state.addItem);
  const { currency, rates, baseCurrency } = useCurrencyStore();

  // Número aleatorio de personas viendo el producto (1 a 10), que cambia cada cierto tiempo
  const [viewers, setViewers] = useState(() => Math.floor(Math.random() * 10) + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(Math.floor(Math.random() * 10) + 1);
    }, Math.floor(Math.random() * 5000) + 5000); // entre 5 y 10 segundos
    return () => clearInterval(interval);
  }, []);

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

  const viewersBadge = (
    <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-xs font-medium bg-green-100 text-green-800">
      <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-600"></span>
      </span>
      {viewers} {viewers === 1 ? 'persona lo está viendo' : 'personas lo están viendo'} ahora mismo
    </span>
  );

  return (
    <div className="bg-zinc-950 backdrop-blur-sm transition-all duration-200 shadow-sm hover:shadow-md">
      {/* ===== MOBILE ===== */}
      <div className="sm:hidden p-3">
        {/* Fila superior: imagen + título + badges */}
        <div className="flex items-center gap-3">
          {/* Imagen - Izquierda */}
          <Link to={`${basePath}/${slug}`} className="flex-shrink-0">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100">
              <img loading="lazy" src={img} alt={name} className="w-full h-full object-cover" />
            </div>
          </Link>

          {/* Título - centro */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white leading-tight">{name}</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">Tiempo estimado: 24hrs</p>
          </div>

          {/* Badges - derecha superior */}
          <div className="flex flex-col items-stretch gap-1 flex-shrink-0 w-[40%] text-center">
            <span className="flex items-center justify-center gap-1 px-1.5 py-0.5 rounded text-[10px] leading-tight font-medium bg-orange-100 text-orange-800 text-center">
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-600"></span>
              </span>
              {viewers} {viewers === 1 ? 'persona lo está viendo' : 'personas lo están viendo'} ahora mismo
            </span>
          </div>
        </div>

        {/* Fila inferior: precio + botón comprar */}
        <div className="flex items-center justify-between mt-3">
          <div className="text-base font-bold text-white">
            {formatPrice(price, currency, rates, baseCurrency)}
          </div>
          <button
            onClick={handleAddClick}
            className="px-5 py-1.5 bg-green-400 hover:bg-green-600 rounded-full text-black font-medium transition-colors duration-200 text-xs"
          >
            Comprar
          </button>
        </div>
      </div>

      {/* ===== TABLET / DESKTOP ===== */}
      <div className="hidden sm:flex items-center p-4 gap-4">
        {/* Imagen pequeña - Izquierda con navegación */}
        <Link to={`${basePath}/${slug}`} className="flex-shrink-0">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
            <img loading="lazy" src={img}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>

        {/* Descripción */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-white truncate">{name}</h3>
          <p className="text-sm text-gray-400 mt-1">Tiempo estimado: 24hrs</p>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
              entrega rapida asegurada
            </span>
            {viewersBadge}
          </div>
        </div>

        {/* Precio */}
        <div className="flex-shrink-0 text-right">
          <div className="text-lg font-bold text-white">
            {formatPrice(price, currency, rates, baseCurrency)}
          </div>
        </div>

        {/* Botón */}
        <div className="flex-shrink-0">
          <button
            onClick={handleAddClick}
            className="px-6 py-2 bg-green-400 hover:bg-green-600 rounded-full text-black font-medium transition-colors duration-200 text-sm"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductCompact;
