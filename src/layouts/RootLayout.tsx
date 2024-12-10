import { Outlet } from "react-router-dom";

export const RootLayout = () => {

    return <div>
        
        <div>Navbar</div>

        <Outlet />

        <div>Footer</div>
    </div>;
};