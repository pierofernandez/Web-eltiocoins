import Brands from '../components/home/Brands';
import { Cookie } from '../components/home/Cookie';
import { FeatureGrid } from '../components/home/FeatureGrid';
import Instagram from '../components/home/Instagram';
import { ProductGrid } from '../components/home/ProductGrid';
import WhatsApp from '../components/home/WhatsApp';
import { Questions } from '../components/shared/Questions';
import { ProductGridSkeleton } from '../components/skeletons/ProductGridSkeleton';
import { prepareProducts } from '../helpers/index';
import { useHomeProducts } from '../hooks';

export const HomePage = () => {

    const { recentProducts, popularProducts, isLoading } = useHomeProducts();

    const prepareRecentProducts = prepareProducts(recentProducts);
    const preparedPopularProducts = prepareProducts(popularProducts);

    return (

        <div >
            <Cookie />
            <FeatureGrid />

            {/* Título para Productos Recientes */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-white text-sm font-medium tracking-wider uppercase">Nuevo</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">
                            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                PRODUCTOS
                            </span>
                            <br />
                            <span className="text-white drop-shadow-lg">
                                RECIENTES
                            </span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Productos Recientes */}
            <ProductGrid
                products={prepareRecentProducts}
            />
            
            {isLoading ? (
                <ProductGridSkeleton numberOfProducts={4} />
            ) : (
                <>
                    {/* Título para Productos Populares */}
                    <section className="py-8 px-4 sm:px-6 lg:px-8 relative">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4">
                                    <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                                    <span className="text-white text-sm font-medium tracking-wider uppercase">Popular</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">
                                    <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                                        PRODUCTOS
                                    </span>
                                    <br />
                                    <span className="text-white drop-shadow-lg">
                                        POPULARES
                                    </span>
                                </h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
                            </div>
                        </div>
                    </section>

                    {/* Productos Populares */}
                    <ProductGrid
                        products={preparedPopularProducts}
                    />
                </>
            )}

            <Brands />
            <Questions />
            <Instagram />
            <WhatsApp />
        </div>
    );
};

export default HomePage;