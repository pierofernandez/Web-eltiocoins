import { getProducts } from "../../actions";
import { useQuery } from "@tanstack/react-query";

interface UseProductsOptions {
    page?: number;
    search?: string;
    category?: string;
    platform?: string;
}

export const useProducts = ({ page = 1, search = '', category = 'all', platform = 'all' }: UseProductsOptions) => {
    const { data, isLoading } = useQuery({
        queryKey: ['products', page, search, category, platform],
        queryFn: () => getProducts({ page, search, category, platform }),
        staleTime: 1000 * 60 * 5, // 1 hora
    });

    return {
        products: data?.products,
        isLoading,
        totalProducts: data?.count ?? 0,
    };
};
