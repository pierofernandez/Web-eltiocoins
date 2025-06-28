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
            <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Gaming Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-purple-900/20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                
                {/* Animated Grid Pattern */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
                </div>
                
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
            <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Gaming Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-red-900/20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]"></div>
                
                {/* Animated Grid Pattern */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
                </div>
                
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
