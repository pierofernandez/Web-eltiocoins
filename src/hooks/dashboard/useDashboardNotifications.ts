import { useQuery } from '@tanstack/react-query';
import { getDashboardNotifications } from '../../actions';

export const useDashboardNotifications = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['dashboard', 'notifications'],
		queryFn: () => getDashboardNotifications(),
		refetchInterval: 1000 * 60,
		staleTime: 1000 * 30,
	});

	return { data, isLoading };
};
