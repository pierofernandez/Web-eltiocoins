import { Brands } from '../components/home/Brands';
import { FeatureGrid } from '../components/home/FeatureGrid';
import { ProductGrid } from '../components/home/ProductGrid';
import { monedas } from '../data/initialData';
import { PreparedProducts } from '../helpers';

export const HomePage = () => {

    const prepareRecentProducts = PreparedProducts(monedas);
    console.log(prepareRecentProducts);

    return(
        <div>
            <FeatureGrid />

            <ProductGrid
                title='Nuevos Productos'
                products={[{PreparedProducts}]}
            />

            <ProductGrid
                title='Productos Destacados'
                products={[]}
            />

            <Brands />
        </div>
    );
};

export default HomePage;