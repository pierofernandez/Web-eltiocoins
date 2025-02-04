import { useQuery } from "@tanstack/react-query";
import { getFilteredProducts } from "../../actions";

export const useFilteredProducts =({
	page, platforms
}: {
	page:number; 
	platforms:string[]
})  => {
	const {data, isLoading} = useQuery({
		queryKey: ['filteredProducts', page, platforms ],
		queryFn: () => getFilteredProducts({ page, platforms }),
		retry: false,

	});

	return {
		data: data?.data,
		isLoading,
		totalProducts: data?.count ?? 0,
	}

}