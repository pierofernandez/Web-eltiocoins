import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { socialLinks } from "../../constants/links";

export const Footer = () => {
    return (
        <footer className='py-16 bg-gray-950 px-12 flex justify-center gap-4 text-slate-200 text-sm flex-wrap mt-10 md:flex-nowgrap'>
            <Link
                to='/'
                className={'text-2x1 font-bold tracking-tighter transition-all flex-1'}
            >
                <img src="/public/img/logotiocoins.png" alt="logotiocoins" className='max-w-20' />
            </Link> 

            <div className='flex flex-col gap-4 flex-1'>
				<p className='font-semibold uppercase tracking-tighter'>
					Suscríbete
				</p>
				<p className='text-xs font-medium'>
					Recibe promociones exclusivas
				</p>

				<div className='border border-gray-800 flex items-center gap-2 px-3 py-2 rounded-full'>
					<input
						type='email'
						placeholder='Correo Electrónico'
						className='pl-2 bg-gray-950 text-slate-200 w-full focus:outline-none'
					/>

					<button className='text-slate-200'>
						<BiChevronRight size={20} />
					</button>
				</div>
			</div>

			<div className='flex flex-col gap-4 flex-1'>
				<p className='font-semibold uppercase tracking-tighter'>
					Políticas
				</p>

				<nav className='flex flex-col gap-2 text-xs font-medium'>
					<Link to='/monedas'>Productos</Link>
					<Link to='#' className='text-slate-300 hover:text-white'>
						Políticas de privacidad
					</Link>
					<Link to='#' className='text-slate-300 hover:text-white'>
						Términos de uso
					</Link>
				</nav>
			</div>

			<div className='flex flex-col gap-4 flex-1'>
				<p className='font-semibold uppercase tracking-tighter'>
					Síguenos
				</p>

				<p className='text-xs leading-6'>
					No te pierdas las novedades que Eltiocoins tiene para
					ti.
				</p>

				<div className='flex'>
					{socialLinks.map(link => (
						<a
							key={link.id}
							href={link.href}
							target='_blank'
							rel='noreferrer'
							className='text-slate-300 border border-gray-8000 w-full h-full py-3.5 flex items-center justify-center transition-all hover:bg-white hover:text-gray-950'
						>
							{link.icon}
						</a>
					))}
				</div>
			</div>
        </footer>
    );
 
}