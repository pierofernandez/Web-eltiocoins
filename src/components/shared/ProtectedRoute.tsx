import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../hooks';
import { Loader } from './Loader';

interface ProtectedRouteProps {
    children: ReactNode;
    redirectTo?: string;
}

export const ProtectedRoute = ({ children, redirectTo = '/login' }: ProtectedRouteProps) => {
    const { session, isLoading } = useUser();
    
    if (isLoading) {
        return <Loader />;
    }
    
    if (!session) {
        return <Navigate to={redirectTo} replace />;
    }
    
    return <>{children}</>;
}; 