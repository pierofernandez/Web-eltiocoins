import { Logo } from '../shared/Logo';
import { NavLink } from 'react-router-dom';
import { dashboardLinks } from '../../constants/links';
import { signOut } from '../../actions';
import { useDashboardThemeStore } from '../../store/dashboardTheme.store';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

export const Sidebar = () => {
    const { theme, toggleTheme } = useDashboardThemeStore();

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <div className="fixed flex h-screen w-[120px] flex-col items-center gap-8 border-r border-gray-200 bg-white p-5 text-stone-800 transition-colors dark:border-stone-800 dark:bg-stone-900 dark:text-white lg:w-[250px]">
            <Logo />

            <nav className="w-full flex-1 space-y-3">
                {dashboardLinks.map((link) => (
                    <NavLink
                        key={link.id}
                        to={link.href}
                        end={'end' in link ? link.end : undefined}
                        className={({ isActive }) =>
                            `flex items-center justify-center gap-3 rounded-md py-3 pl-0 transition-all duration-300 lg:justify-start lg:pl-5 ${
                                isActive
                                    ? 'bg-cyan-600 text-white'
                                    : 'text-stone-600 hover:bg-cyan-600 hover:text-white dark:text-stone-300'
                            }`
                        }
                    >
                        {link.icon}
                        <p className="hidden font-semibold lg:block">{link.title}</p>
                    </NavLink>
                ))}
            </nav>

            <button
                type="button"
                onClick={toggleTheme}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-gray-50 py-2.5 text-sm font-semibold transition hover:bg-gray-100 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700 lg:justify-start lg:px-4"
                aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
                {theme === 'dark' ? (
                    <HiOutlineSun className="h-5 w-5 shrink-0 text-amber-400" />
                ) : (
                    <HiOutlineMoon className="h-5 w-5 shrink-0 text-cyan-700" />
                )}
                <span className="hidden lg:inline">
                    {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                </span>
            </button>

            <button
                className="flex w-full items-center justify-center gap-2 rounded-md bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
                onClick={handleLogout}
            >
                <span className="hidden lg:block">Cerrar Sesión</span>
                <span className="lg:hidden">Salir</span>
            </button>
        </div>
    );
};
