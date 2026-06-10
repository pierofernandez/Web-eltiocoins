import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/dashboard/Sidebar";
import { NotificationBell } from "../components/dashboard/NotificationBell";
import { useUser } from "../hooks";
import { useState, useEffect } from "react";
import { getUserRole, getSession } from "../actions";
import { Loader } from "../components/shared/Loader";
import { supabase } from '../supabase/client';
import { useDashboardThemeStore } from '../store/dashboardTheme.store';

export const DashboardLayout = () => {
    const navigate = useNavigate();
    const theme = useDashboardThemeStore((state) => state.theme);

    const { isLoading, session } = useUser();
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        const checkRole = async () => {
            setRoleLoading(true);
            const session = await getSession();
            if (!session) {
                navigate('/login');
            }

            const role = await getUserRole(
                session.session?.user.id as string
            );
            if (role !== 'admin') {
                navigate('/', { replace: true });
            }

            setRoleLoading(false);
        };

        checkRole();

        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                navigate('/login', { replace: true });
            }
        });
    }, [navigate]);

    if (isLoading || !session || roleLoading) return <Loader />;

    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <div className="flex min-h-screen w-full bg-gray-100 font-montserrat text-stone-800 transition-colors dark:bg-[#0d0f12] dark:text-stone-100">
                <Sidebar />

                <main className="container m-5 mt-7 ml-[140px] flex-1 lg:ml-[270px]">
                    <div className="mb-6 flex items-center justify-end">
                        <NotificationBell />
                    </div>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
