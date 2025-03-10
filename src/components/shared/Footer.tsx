import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { socialLinks } from "../../constants/links";
import { useState } from "react";

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async () => {
    try {
      const response = await fetch('http://localhost:3000/enviar-correo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Correo enviado correctamente');
      } else {
        alert('Error al enviar el correo');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el correo');
    }

    // Limpiar el campo de entrada después de enviar
    setEmail('');
  };

  return (
    <footer>
      <div className='py-16 bg-gray-950 px-12 flex justify-center gap-4 text-slate-200 text-sm flex-wrap mt-10 md:flex-nowrap'>
        <Link
          to='/'
          className={'text-2xl font-bold tracking-tighter transition-all flex-1'}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className='text-slate-200' onClick={handleSubscribe}>
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
            <Link to='/privacypolicy' className='text-slate-300 hover:text-white'>
              Políticas de privacidad
            </Link>
            <Link to='/refundpolicy' className='text-slate-300 hover:text-white'>
              Políticas de Reembolso
            </Link>
          </nav>
        </div>

        <div className='flex flex-col gap-4 flex-1'>
          <p className='font-semibold uppercase tracking-tighter'>
            Síguenos
          </p>

          <p className='text-xs leading-6'>
            No te pierdas las novedades que Eltiocoins tiene para ti.
          </p>

          <div className='flex'>
            {socialLinks.map(link => (
              <a
                key={link.id}
                href={link.href}
                target='_blank'
                rel='noreferrer'
                className='text-slate-300 border border-gray-800 w-full h-full py-3.5 flex items-center justify-center transition-all hover:bg-white hover:text-gray-950'
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-350 text-gray-900 text-xs text-center py-2">
        <p>Copyright © {new Date().getFullYear()} - All rights reserved by eltiocoins</p>
      </div>
    </footer>
  );
};