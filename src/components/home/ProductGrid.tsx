import { useEffect } from "react";
import { PreparedProducts } from "../interfaces";
import { CardProduct } from "../products/CardProduct";
import Aos from "aos";
import 'aos/dist/aos.css';

interface Props {
    products: PreparedProducts[];
}

export const ProductGrid = ({ products }: Props) => {

    useEffect(() => {
        Aos.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true
        });
    }, []);

    // Dividir productos en dos secciones
    const newProducts = products.slice(0, 4);
    const featuredProducts = products.slice(4, 8);

    return (
        <>
            {/* New Products Section */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 to-black opacity-30"></div>
                
                <div className="relative max-w-7xl mx-auto">
                    <div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        {newProducts.map((product, index) => (
                            <div
                                key={product.id}
                                data-aos="fade-up"
                                data-aos-delay={300 + index * 100}
                            >
                                <CardProduct
                                    name={product.name}
                                    price={product.price}
                                    colors={product.colors}
                                    img={product.images[0]}
                                    slug={product.slug}
                                    variants={product.variants}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 to-black opacity-30"></div>
                
                <div className="relative max-w-7xl mx-auto">
                    <div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        {featuredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                data-aos="fade-up"
                                data-aos-delay={600 + index * 100}
                            >
                                <CardProduct
                                    name={product.name}
                                    price={product.price}
                                    colors={product.colors}
                                    img={product.images[0]}
                                    slug={product.slug}
                                    variants={product.variants}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};
