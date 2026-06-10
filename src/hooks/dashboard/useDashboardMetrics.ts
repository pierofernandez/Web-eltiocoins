import { useQuery } from '@tanstack/react-query';
import { getDashboardMetrics } from '../../actions';

export const useDashboardMetrics = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['dashboard', 'metrics'],
		queryFn: getDashboardMetrics,
		staleTime: 1000 * 60,
	});

	return { data, isLoading };
};
