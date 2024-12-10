import { NavLink } from "react-router-dom";
import { navbarLinks } from "../../constants/links";


export const Navbar = () => {
    return (
        <header className="bg-white text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12">
            {/* LOGO */}

            <nav>
                {navbarLinks.map((link) => (
                    <NavLink
                        key={link.id}
                        to={link.href}
                        className={({ isActive }) =>
                            `${
                                isActive ? 'text-cyan-600 underline' : ''
                            } transition-all duration-300 font-medium hover:text-cyan-600`
                        }
                    >
                        {link.tittle}
                    </NavLink>
                ))}
            </nav>
        </header>
    );
};
               
