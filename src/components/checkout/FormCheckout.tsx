import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputAddress } from './InputAddress';
import { AddressFormValues, addressSchema } from '../../lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCartStore } from '../../store/cart.store';
import { useDiscountStore } from '../../store/discount.store';
import { ImSpinner2 } from 'react-icons/im';
import { useCreateOrder } from '../../hooks';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCreditCard, FaArrowLeft, FaArrowRight, FaPaypal, FaLock, FaShieldAlt } from 'react-icons/fa';
import './PayPalStyles.css';

export const FormCheckout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryData, setDeliveryData] = useState<AddressFormValues | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
  });

  const { mutate: createOrder, isPending } = useCreateOrder();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const isFormValid = Object.keys(errors).length === 0;
  const cleanCart = useCartStore(state => state.cleanCart);
  const cartItems = useCartStore(state => state.items);
  const totalAmount = useCartStore(state => state.totalAmount);
  const { discount } = useDiscountStore();
  const finalAmount = totalAmount - discount;
  const navigate = useNavigate();

  // Aplicar estilos adicionales cuando se monta el componente
  useEffect(() => {
    // Agregar clase al body para estilos globales de PayPal
    document.body.classList.add('paypal-checkout-active');
    
    return () => {
      document.body.classList.remove('paypal-checkout-active');
    };
  }, []);

  const onSubmitDeliveryData = handleSubmit(data => {
    setDeliveryData(data);
    setCurrentStep(2);
  });

  const onSubmitPayment = () => {
    if (!deliveryData) return;

    const orderInput = {
      address: deliveryData,
      cartItems: cartItems.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
    };

    createOrder(orderInput, {
      onSuccess: (order) => {
        if (!order.id) {
          console.error("Error: La orden creada no tiene un ID.");
          return;
        }
        cleanCart();
        navigate(`/checkout/${order.id}/thank-you`);
      },
      onError: (error) => {
        console.error("Error al crear la orden:", error);
        setPaymentError("Error al procesar la orden. Por favor, intenta nuevamente.");
      }
    });
  };

  if (isPending) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='flex flex-col gap-4 items-center justify-center min-h-[400px]'
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center"
        >
          <ImSpinner2 className='text-white text-2xl' />
        </motion.div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2">Procesando tu pedido</h3>
          <p className="text-gray-400">Por favor espera mientras confirmamos tu compra...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Indicador de pasos moderno */}
      <div className="flex items-center mb-8 bg-black/20 rounded-xl p-2">
        <motion.div
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
            currentStep === 1 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
              : 'text-gray-400'
          }`}
        >
          <FaMapMarkerAlt className="text-sm" />
          <span className="font-medium">Datos de Entrega</span>
        </motion.div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
          currentStep === 2 ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-400'
        }`}>
          2
        </div>
        <motion.div
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
            currentStep === 2 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' 
              : 'text-gray-400'
          }`}
        >
          <FaCreditCard className="text-sm" />
          <span className="font-medium">Método de Pago</span>
        </motion.div>
      </div>

      {currentStep === 1 ? (
        <motion.form 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className='flex flex-col gap-6' 
          onSubmit={onSubmitDeliveryData}
        >
          <div className='bg-black/20 rounded-xl p-6 border border-white/10'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center'>
                <FaMapMarkerAlt className='text-blue-400' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-white'>Información de Entrega</h3>
                <p className='text-gray-400 text-sm'>Completa tus datos para recibir tu pedido</p>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <InputAddress
                register={register}
                errors={errors}
                name='state'
                placeholder='Estado / Provincia'
                className='bg-black/30 border border-white/20 text-white placeholder-gray-400 p-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300'
              />

              <InputAddress
                register={register}
                errors={errors}
                name='city'
                placeholder='Ciudad'
                className='bg-black/30 border border-white/20 text-white placeholder-gray-400 p-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
              <InputAddress
                register={register}
                errors={errors}
                name='postalcode'
                placeholder='Código Postal (Opcional)'
                className='bg-black/30 border border-white/20 text-white placeholder-gray-400 p-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300'
              />

              <select
                className='bg-black/30 border border-white/20 text-white p-3 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300'
                {...register('country')}
              >
                <option value='' className='text-black'>Seleccionar país</option>
                <option value='Ecuador' className='text-black'>Ecuador</option>
                <option value='Chile' className='text-black'>Chile</option>
                <option value='España' className='text-black'>España</option>
                <option value='Honduras' className='text-black'>Honduras</option>
                <option value='USA' className='text-black'>USA</option>
                <option value='Guatemala' className='text-black'>Guatemala</option>
                <option value='Mexico' className='text-black'>Mexico</option>
                <option value='Peru' className='text-black'>Peru</option>
                <option value='Argentina' className='text-black'>Argentina</option>
                <option value='Colombia' className='text-black'>Colombia</option>
                <option value='El Salvador' className='text-black'>El Salvador</option>
              </select>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!isFormValid}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <span>Continuar al Pago</span>
            <FaArrowRight />
          </motion.button>
        </motion.form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className='flex flex-col gap-6'
        >
          {/* Resumen de la compra */}
          <div className='bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-400/20'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center'>
                <FaCreditCard className='text-purple-400' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-white'>Resumen de Compra</h3>
                <p className='text-gray-400 text-sm'>Confirma tu pedido y selecciona el método de pago</p>
              </div>
            </div>
            
            <div className='bg-black/20 rounded-lg p-4 mb-4'>
              <div className='space-y-2'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-300'>Subtotal:</span>
                  <span className='text-white font-bold'>
                    ${totalAmount.toFixed(2)} USD
                  </span>
                </div>
                {discount > 0 && (
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-300'>Descuento:</span>
                    <span className='text-green-400 font-bold'>
                      -${discount.toFixed(2)} USD
                    </span>
                  </div>
                )}
                <div className='flex justify-between items-center pt-2 border-t border-white/10'>
                  <span className='text-gray-300'>Total a pagar:</span>
                  <span className='text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent'>
                    ${finalAmount.toFixed(2)} USD
                  </span>
                </div>
              </div>
              <p className='text-xs text-gray-400 mt-2'>Incluye envío gratuito</p>
            </div>
          </div>

          {/* Método de pago */}
          <div className='bg-black/20 rounded-xl p-6 border border-white/10'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center'>
                <FaPaypal className='text-green-400' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-white'>Método de Pago</h3>
                <p className='text-gray-400 text-sm'>Paga de forma segura con PayPal</p>
              </div>
            </div>

            {/* Información de seguridad */}
            <div className='flex items-center gap-4 mb-6 p-4 bg-green-500/10 rounded-lg border border-green-400/20'>
              <FaShieldAlt className='text-green-400 text-xl' />
              <div className='text-sm'>
                <p className='text-green-400 font-semibold'>Pago 100% Seguro</p>
                <p className='text-gray-400'>Tus datos están protegidos con encriptación SSL</p>
              </div>
            </div>

            {/* Error de pago */}
            {paymentError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-4 p-4 bg-red-500/10 rounded-lg border border-red-400/20'
              >
                <p className='text-red-400 text-sm'>{paymentError}</p>
              </motion.div>
            )}

            {/* Botones de PayPal con contenedor especial */}
            <div className='paypal-checkout-container'>
              <PayPalScriptProvider 
                options={{ 
                  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || '',
                  currency: "USD",
                  intent: "capture"
                }}
              >
                <PayPalButtons
                  disabled={isPending || isProcessing}
                  style={{
                    layout: "vertical",
                    color: "gold",
                    shape: "rect",
                    label: "pay"
                  }}
                  createOrder={(_, actions) => {
                    setIsProcessing(true);
                    setPaymentError(null);
                    
                    if (!actions.order) {
                      setPaymentError("No se pudo inicializar PayPal. Por favor, recarga la página.");
                      setIsProcessing(false);
                      return Promise.reject(new Error("No se pudo crear la orden de PayPal."));
                    }
                    
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            value: finalAmount.toFixed(2),
                            currency_code: "USD",
                          },
                          description: `Compra en Tio Coins - ${cartItems.length} producto${cartItems.length !== 1 ? 's' : ''}`,
                        },
                      ],
                    }).catch((error) => {
                      console.error("Error al crear orden PayPal:", error);
                      setPaymentError("Error al procesar el pago. Por favor, intenta nuevamente.");
                      setIsProcessing(false);
                      throw error;
                    });
                  }}
                  onApprove={(_, actions) => {
                    if (!actions.order) {
                      setPaymentError("No se pudo capturar la orden de PayPal.");
                      setIsProcessing(false);
                      return Promise.reject(new Error("No se pudo capturar la orden de PayPal."));
                    }
                    
                    return actions.order.capture().then((details) => {
                      setIsProcessing(false);
                      setPaymentError(null);
                      console.log("Pago completado:", details);
                      onSubmitPayment();
                    }).catch((error) => {
                      console.error("Error al capturar pago:", error);
                      setPaymentError("Error al confirmar el pago. Por favor, contacta soporte.");
                      setIsProcessing(false);
                    });
                  }}
                  onError={(error) => {
                    setIsProcessing(false);
                    console.error("Error en PayPal:", error);
                    setPaymentError("Hubo un error al procesar el pago. Por favor, intenta nuevamente.");
                  }}
                  onCancel={() => {
                    setIsProcessing(false);
                    setPaymentError(null);
                  }}
                />
              </PayPalScriptProvider>
            </div>

            {/* Información adicional */}
            <div className='mt-4 flex items-center gap-2 text-xs text-gray-400'>
              <FaLock className='text-gray-500' />
              <span>Procesado por PayPal - Transacción segura</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentStep(1)}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <FaArrowLeft />
            <span>Volver a Datos</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};