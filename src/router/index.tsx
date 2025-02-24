import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage, CuentasPage, DivisionRivalsPage, FutChampionsPage, MonedasPage, MonedaPage } from "../pages";
import { FutChampionPage } from "../pages/FutChampionPage";
import { DivisionRivalPage } from "../pages/DivisionRivalPage";

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
                path: 'monedas/:slug',
                element: <MonedaPage />
            },
            {
                path: 'futchampions',
                element: <FutChampionsPage />
            },
            {
                path: 'futchampions/:slug',
                element: <FutChampionPage />
            },
            {
                path: 'divisionrivals',
                element: <DivisionRivalsPage />
            },
            {
                path: 'divisionrivals/:slug',
                element: <DivisionRivalPage />
            },
            {
                path: 'cuentas',
                element: <CuentasPage />
            },
        
        ]
    }
]
);