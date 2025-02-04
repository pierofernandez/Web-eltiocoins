import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage, CuentasPage, DivisionRivalsPage, FutChampionsPage, MonedasPage } from "../pages";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'monedas',
                element: <MonedasPage />
            },
            {
                path: 'futchampions',
                element: <FutChampionsPage />
            },
            {
                path: 'divisionrivals',
                element: <DivisionRivalsPage />
            },
            {
                path: 'cuentas',
                element: <CuentasPage />
            },
        
        ]
    }
]
);