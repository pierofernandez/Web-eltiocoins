import { useEffect, useState } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaShieldAlt, FaSpinner } from 'react-icons/fa';

interface MercadoPagoCheckoutProps {
  amount: number;
  description: string;
  onError: (error: string) => void;
  disabled?: boolean;
}

export const MercadoPagoCheckout = ({ 
  amount, 
  description, 
  onError, 
  disabled = false 
}: MercadoPagoCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Inicializar MercadoPago
  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY || '');
  }, []);

  // Crear preferencia y redirigir a MercadoPago
  const handlePayment = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch('https://localhost:3001/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              title: description,
              unit_price: amount,
              quantity: 1,
            },
          ],
          back_urls: {
            success: `${window.location.origin}/checkout/success`,
            failure: `${window.location.origin}/checkout/failure`,
            pending: `${window.location.origin}/checkout/pending`,
          },
          auto_return: 'approved',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear la preferencia de pago');
      }

      const data = await response.json();
      
      // Redirigir a MercadoPago
      if (data.initPoint) {
        window.location.href = data.initPoint;
      } else {
        throw new Error('No se recibió el punto de inicio de MercadoPago');
      }
    } catch (error) {
      console.error('Error:', error);
      onError('Error al inicializar MercadoPago. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/20 rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
          <FaCreditCard className="text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">MercadoPago</h3>
          <p className="text-gray-400 text-sm">Paga con tarjeta, efectivo o transferencia</p>
        </div>
      </div>

      {/* Información de seguridad */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-blue-500/10 rounded-lg border border-blue-400/20">
        <FaShieldAlt className="text-blue-400 text-xl" />
        <div className="text-sm">
          <p className="text-blue-400 font-semibold">Pago 100% Seguro</p>
          <p className="text-gray-400">Procesado por MercadoPago con encriptación SSL</p>
        </div>
      </div>

      {/* Botón de pago */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePayment}
        disabled={disabled || isLoading}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {isLoading ? (
          <>
            <FaSpinner className="animate-spin" />
            <span>Inicializando MercadoPago...</span>
          </>
        ) : (
          <>
            <span>Pagar con MercadoPago</span>
            <span className="text-sm">${amount.toFixed(2)} USD</span>
          </>
        )}
      </motion.button>

      {/* Información adicional */}
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
        <FaShieldAlt className="text-gray-500" />
        <span>Procesado por MercadoPago - Transacción segura</span>
      </div>
    </motion.div>
  );
}; 