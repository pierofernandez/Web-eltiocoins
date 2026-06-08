import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../../actions';

export const useProductById = (id: string) => {
    const {
        data: product,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['product-id', id],
        queryFn: () => getProductById(id),
        retry: false,
        enabled: !!id,
    });

    return {
        product,
        isError,
        isLoading,
    };
};
