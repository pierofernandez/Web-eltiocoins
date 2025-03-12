import Brands from '../components/home/Brands';
import { Cookie } from '../components/home/Cookie';
import { FeatureGrid } from '../components/home/FeatureGrid';
import Instagram from '../components/home/Instagram';
import { ProductGrid } from '../components/home/ProductGrid';
import StatsTemplate from '../components/home/StatsTemplate';
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

        <div>
            <Cookie/>
            <FeatureGrid />
            <ProductGrid

                title='Nuevos Productos'
                products={prepareRecentProducts}
            />
            {isLoading ? (
                <ProductGridSkeleton numberOfProducts={4} />
            ) : (
                <ProductGrid

                    title='Productos Destacados'
                    products={preparedPopularProducts}
                />
            )}

            <Brands />
            <Questions />
            <Instagram />
            <WhatsApp />
            <StatsTemplate/>
        </div>
    );
};

export default HomePage;