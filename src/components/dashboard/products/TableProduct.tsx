import { useState, useEffect } from 'react';
import { FaEllipsis } from 'react-icons/fa6';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useProducts, useDeleteProduct } from '../../../hooks';
import { Loader } from '../../shared/Loader';
import { formatPrice, formatDate } from '../../../helpers';
import { Pagination } from '../../shared/Pagination';
import { CellTableProduct } from './CellTableProduct';
import { useCurrencyStore } from '../../../store/currency.store';

const tableHeaders = [
    '',
    'Nombre',
    'Plataforma',
    'Precio',
    'Stock',
    'Fecha de creación',
    '',
];

export const TableProduct = () => {
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(
        null
    );
    const [page, setPage] = useState(1);

    // Filters state
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [platform, setPlatform] = useState('all');
    const [orderByPrice, setOrderByPrice] = useState<'asc' | 'desc' | 'none'>('none');

    const { currency, rates, baseCurrency } = useCurrencyStore();

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(searchInput);
            setPage(1); // Reset page on search
        }, 500);
        return () => clearTimeout(handler);
    }, [searchInput]);

    // Reset page on filter change
    useEffect(() => {
        setPage(1);
    }, [category, platform]);

    const { products, isLoading, totalProducts } = useProducts({
        page,
        search,
        category,
        platform,
    });

    const { mutate, isPending } = useDeleteProduct();

    const handleMenuToggle = (index: number) => {
        if (openMenuIndex === index) {
            setOpenMenuIndex(null);
        } else {
            setOpenMenuIndex(index);
        }
    };

    const handleDeleteProduct = (id: string) => {
        mutate(id);
        setOpenMenuIndex(null);
    };

    if (!products || isLoading || totalProducts === undefined || isPending) return <Loader />;

    // Local sorting by price if selected
    const sortedProducts = [...products];
    if (orderByPrice !== 'none') {
        sortedProducts.sort((a, b) => {
            const priceA = a.variants?.[0]?.price || 0;
            const priceB = b.variants?.[0]?.price || 0;
            return orderByPrice === 'asc' ? priceA - priceB : priceB - priceA;
        });
    }

    return (
        <div className='flex flex-1 flex-col rounded-lg border border-gray-200 bg-white p-5 text-black dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100'>
            <h1 className='text-xl font-bold'>Productos</h1>

            <p className='mb-6 mt-1 text-sm font-regular text-gray-500 dark:text-stone-400'>
                Gestiona tus productos y mira las estadísticas de tus ventas
            </p>

            {/* Filtros */}
            <div className='flex flex-col md:flex-row gap-4 mb-6'>
                <div className='flex-1'>
                    <input
                        type='text'
                        placeholder='Buscar por nombre...'
                        className='w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:ring-cyan-500'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
                <div className='flex gap-2 flex-wrap'>
                    <select
                        className='rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:focus:ring-cyan-500'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value='all'>Todas las categorías</option>
                        <option value='monedas'>Monedas</option>
                        <option value='divisionrivals'>Division Rivals</option>
                        <option value='futchampions'>Fut Champions</option>
                        <option value='objetivos'>Objetivos</option>
                    </select>

                    <select
                        className='rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:focus:ring-cyan-500'
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                    >
                        <option value='all'>Todas las plataformas</option>
                        <option value='PC'>PC</option>
                        <option value='PS'>PS</option>
                        <option value='XBOX'>XBOX</option>
                    </select>

                    <select
                        className='rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:focus:ring-cyan-500'
                        value={orderByPrice}
                        onChange={(e) => setOrderByPrice(e.target.value as any)}
                    >
                        <option value='none'>Ordenar por precio</option>
                        <option value='asc'>Menor a mayor</option>
                        <option value='desc'>Mayor a menor</option>
                    </select>
                </div>
            </div>

            {/* Tabla */}
            <div className='relative w-full h-full'>
                <table className='text-sm w-full caption-bottom overflow-auto'>
                    <thead className='border-b border-gray-200 pb-3 dark:border-stone-700'>
                        <tr className='text-sm font-bold'>
                            {tableHeaders.map((header, index) => (
                                <th key={index} className='h-12 px-4 text-left'>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProducts.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="py-8 text-center text-gray-500 dark:text-stone-400">
                                    No se encontraron productos con estos filtros.
                                </td>
                            </tr>
                        ) : (
                            sortedProducts.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='p-4 align-middle sm:table-cell'>
                                            <img src={
                                                    product.images?.[0] ||
                                                    'https://ui.shadcn.com/placeholder.svg'
                                                }
                                                alt='Imagen Product'
                                                loading='lazy'
                                                decoding='async'
                                                className='w-16 h-16 aspect-square rounded-md object-contain'
                                            />
                                        </td>
                                        <CellTableProduct content={product.name} />
                                        <CellTableProduct content={product.platform} />
                                        <CellTableProduct
                                            content={formatPrice(product.variants?.[0]?.price || 0, currency, rates, baseCurrency)}
                                        />

                                        <CellTableProduct
                                            content={(product.variants?.[0]?.stock || 0).toString()}
                                        />
                                        <CellTableProduct
                                            content={formatDate(product.created_at)}
                                        />
                                        <td className='relative'>
                                            <button
                                                className='text-slate-900 dark:text-stone-200'
                                                onClick={() => handleMenuToggle(index)}
                                            >
                                                <FaEllipsis />
                                            </button>
                                            {openMenuIndex === index && (
                                                <div
                                                    className='absolute right-0 z-10 mt-2 w-[120px] rounded-md border border-gray-200 bg-white shadow-xl dark:border-stone-600 dark:bg-stone-800'
                                                    role='menu'
                                                >
                                                    <Link
                                                        to={`/dashboard/productos/editar/${product.id}`}
                                                        className='flex w-full items-center gap-1 px-4 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-stone-200 dark:hover:bg-stone-700'
                                                    >
                                                        Editar
                                                        <HiOutlineExternalLink
                                                            size={13}
                                                            className='inline-block'
                                                        />
                                                    </Link>
                                                    <button
                                                        className='block w-full px-4 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-stone-200 dark:hover:bg-stone-700'
                                                        onClick={() =>
                                                            handleDeleteProduct(product.id)
                                                        }
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            }))}
                    </tbody>
                </table>
            </div>

            {/* Controles de paginación */}
            <Pagination
                page={page}
                setPage={setPage}
                totalItems={totalProducts}
            />
        </div>
    );
};