import { Link, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  to: string;
  icon: JSX.Element;
}

export const NavigationButton = () => {
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      label: "Inicio",
      to: "/",
      icon: (
        <svg xmlns="https://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
          stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M2.25 12l8.955-8.955c.44-.439 1.15-.439 1.59 0L21.75 12M4.5 9.75V19.5a.75.75 0 00.75.75H9.75v-4.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V20.25h4.5a.75.75 0 00.75-.75V9.75"
          />
        </svg>
      ),
    },
    {
      label: "Monedas",
      to: "/monedas",
      icon: (
        <svg xmlns="https://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
          stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4
               4-1.79 4-4-1.79-4-4-4zm0 10c-4.418 0-8-2.686-8-6V6
               a2 2 0 012-2h12a2 2 0 012 2v6c0 3.314-3.582 6-8 6z" />
        </svg>
      ),
    },
    {
      label: "Fut Champs",
      to: "/futchampions",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 19 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 18.75h15M6 18.75V9.75l3 3.75 3-5.25 3 5.25 3-3.75v9"
          />
        </svg>
      ),
    },
    {
      label: "Objetivos",
      to: "/objetivos",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white flex justify-around items-center py-2 z-50 lg:hidden">
      {navItems.map((item) => {
        const active =
          item.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center text-[11px] transition-colors ${
              active ? "text-green-400" : "text-white"
            }`}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};
