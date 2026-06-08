import { Link } from 'react-router-dom';
import { IoAddCircleOutline } from 'react-icons/io5';
import { TableProduct } from '../../components/dashboard';

export const DashboardProductsPage = () => {
    return(
        <div className="h-full flex flex-col gap-2">
            <Link
                to='/dashboard/productos/new'
                className="flex items-center gap-1 self-end rounded-md bg-black px-2 py-[6px] text-sm font-semibold text-white dark:bg-cyan-600 dark:hover:bg-cyan-500"
            >
                <IoAddCircleOutline className=" inline-block"/>
                Nuevo Producto 
            </Link>

            <TableProduct/>
        </div>
    )
}