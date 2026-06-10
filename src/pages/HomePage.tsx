import Brands from '../components/home/Brands';
import { Cookie } from '../components/home/Cookie';
import { FeatureGrid } from '../components/home/FeatureGrid';
import { Seguridad } from '../components/home/Seguridad';
import Instagram from '../components/home/Instagram';
import { ProductGrid } from '../components/home/ProductGrid';
import WhatsApp from '../components/home/WhatsApp';
import { Questions } from '../components/shared/Questions';
import { ProductGridSkeleton } from '../components/skeletons/ProductGridSkeleton';
import { prepareProducts } from '../helpers/index';
import { useHomeProducts } from '../hooks';

export const HomePage = () => {

    const { recentProducts, isLoading } = useHomeProducts();

    const prepareRecentProducts = prepareProducts(recentProducts);

    return (

        <div >
            <Cookie />
            <Seguridad />
            <FeatureGrid />

            {/* Título para Productos Recientes */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-[#70F468]/30 bg-[#70F468]/10">
                            <div className="w-2 h-2 bg-[#70F468] rounded-full animate-pulse"></div>
                            <span className="text-[#70F468] text-sm font-semibold tracking-wider uppercase">Recién llegados</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">
                            PRODUCTOS{' '}
                            <span className="bg-gradient-to-r from-[#70F468] to-emerald-400 bg-clip-text text-transparent">
                                RECIENTES
                            </span>
                        </h2>
                        <p className="mx-auto max-w-xl text-sm text-zinc-400">
                            Lo último en monedas y boosting, con entrega rápida y segura.
                        </p>
                        <div className="mt-4 w-24 h-1 bg-gradient-to-r from-[#70F468] to-emerald-500 mx-auto rounded-full"></div>
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