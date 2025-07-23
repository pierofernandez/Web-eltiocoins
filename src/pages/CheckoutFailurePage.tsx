import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTimesCircle, FaHome, FaRedo, FaWhatsapp } from 'react-icons/fa';

export const CheckoutFailurePage = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-pink-900 relative overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-white/20 max-w-2xl w-full text-center"
        >
          {/* Icono de error */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <FaTimesCircle className="text-white text-4xl" />
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            Pago Fallido
          </motion.h1>

          {/* Mensaje */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 text-lg mb-8"
          >
            Lo sentimos, tu pago no pudo ser procesado. Esto puede deberse a fondos insuficientes, tarjeta bloqueada o algún otro problema.
          </motion.p>

          {/* Detalles del pago */}
          {paymentId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 rounded-xl p-6 mb-8"
            >
              <h3 className="text-white font-semibold mb-4">Detalles del Pago</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>ID de Pago:</span>
                  <span className="font-mono">{paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estado:</span>
                  <span className="text-red-400 font-semibold capitalize">{status}</span>
                </div>
                <div className="flex justify-between">
                  <span>Método:</span>
                  <span>MercadoPago</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Información de ayuda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-red-500/10 rounded-xl p-6 mb-8 border border-red-400/20"
          >
            <h4 className="text-red-400 font-semibold mb-2">¿Necesitas ayuda?</h4>
            <p className="text-gray-300 text-sm mb-4">
              Si tienes problemas con el pago, puedes:
            </p>
            <ul className="text-gray-300 text-sm space-y-1 text-left">
              <li>• Verificar que tu tarjeta tenga fondos suficientes</li>
              <li>• Contactar a tu banco para autorizar la transacción</li>
              <li>• Intentar con otro método de pago</li>
              <li>• Contactarnos por WhatsApp para asistencia</li>
            </ul>
          </motion.div>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/checkout"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              <FaRedo />
              <span>Intentar Nuevamente</span>
            </Link>

            <a
              href="https://wa.me/51977548397?text=Hola, tengo un problema con mi pago en Tio Coins"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
            >
              <FaWhatsapp />
              <span>Contactar Soporte</span>
            </a>

            <Link
              to="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-xl shadow-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              <FaHome />
              <span>Volver al Inicio</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}; 