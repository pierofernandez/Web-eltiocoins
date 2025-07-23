import { Link } from 'react-router-dom';
import { IoAddCircleOutline } from 'react-icons/io5';
import { TableProduct } from '../../components/dashboard';

export const DashboardProductsPage = () => {
    return(
        <div className="h-full flex flex-col gap-2">
            <Link
                to='/dashboard/productos/new'
                className="bg-black text-black flex items-center self-end py-[6px] px-2 rounded-md text-sm gap-1 font-semibold"
            >
                <IoAddCircleOutline className="inline-block"/>
                Nuevo Producto 
            </Link>

            <TableProduct/>
        </div>
    )
}