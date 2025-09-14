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
import { formatPrice } from '../../helpers';
import { useCurrencyStore } from '../../store/currency.store';

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
  const { currency, rates, baseCurrency } = useCurrencyStore();

  const paypalSupportedCurrencies = ['USD', 'EUR', 'MXN'] as const;
  const paypalCurrency = (paypalSupportedCurrencies as readonly string[]).includes(currency) ? currency : 'USD';
  const rateTarget = rates[paypalCurrency] ?? 1;
  const rateBase = rates[baseCurrency] ?? 1;
  const finalAmountForPayPal = Number((finalAmount * (rateTarget / rateBase)).toFixed(2));

  useEffect(() => {
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
          className="w-16 h-16 bg-gradient-to-r from-[#00FF87] to-gray-700 rounded-full flex items-center justify-center"
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
      {/* Indicador de pasos */}
      <div className="flex items-center mb-8 bg-[#1E1E1E]/80 rounded-xl p-2">
        <motion.div
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
            currentStep === 1 
              ? 'bg-gradient-to-r from-[#00FF87] to-gray-800 text-black shadow-lg' 
              : 'text-gray-400'
          }`}
        >
          <FaMapMarkerAlt className="text-sm" />
          <span className="font-medium">Datos de Cliente</span>
        </motion.div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
          currentStep === 2 ? 'bg-[#00FF87] text-black' : 'bg-gray-600 text-gray-400'
        }`}>
          2
        </div>
        <motion.div
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
            currentStep === 2 
              ? 'bg-gradient-to-r from-[#00FF87] to-gray-800 text-black shadow-lg' 
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
          <div className='bg-[#121212]/90 rounded-xl p-6 border border-[#00FF87]/20'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 bg-[#00FF87]/20 rounded-full flex items-center justify-center'>
                <FaMapMarkerAlt className='text-[#00FF87]' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-white'>Información del Cliente</h3>
                <p className='text-gray-400 text-sm'>Completa tus datos para recibir tu pedido</p>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <InputAddress
                register={register}
                errors={errors}
                name='state'
                placeholder='Estado / Provincia'
                className='bg-[#1E1E1E] border border-[#00FF87]/20 text-white placeholder-gray-500 p-3 rounded-lg focus:border-[#00FF87] focus:ring-2 focus:ring-[#00FF87]/30 transition-all duration-300'
              />

              <InputAddress
                register={register}
                errors={errors}
                name='city'
                placeholder='Ciudad'
                className='bg-[#1E1E1E] border border-[#00FF87]/20 text-white placeholder-gray-500 p-3 rounded-lg focus:border-[#00FF87] focus:ring-2 focus:ring-[#00FF87]/30 transition-all duration-300'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
              <InputAddress
                register={register}
                errors={errors}
                name='postalcode'
                placeholder='Código Postal (Opcional)'
                className='bg-[#1E1E1E] border border-[#00FF87]/20 text-white placeholder-gray-500 p-3 rounded-lg focus:border-[#00FF87] focus:ring-2 focus:ring-[#00FF87]/30 transition-all duration-300'
              />

              <select
                className='bg-[#1E1E1E] border border-[#00FF87]/20 text-white p-3 rounded-lg focus:border-[#00FF87] focus:ring-2 focus:ring-[#00FF87]/30 transition-all duration-300'
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
            className="bg-gradient-to-r from-[#00FF87] to-gray-700 text-black py-4 px-8 rounded-xl font-bold text-lg shadow-xl hover:from-[#00e676] hover:to-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
          <div className='bg-gradient-to-r from-[#1E1E1E] to-gray-800 rounded-xl p-6 border border-[#00FF87]/20'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 bg-[#00FF87]/20 rounded-full flex items-center justify-center'>
                <FaCreditCard className='text-[#00FF87]' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-white'>Resumen de Compra</h3>
                <p className='text-gray-400 text-sm'>Confirma tu pedido y selecciona el método de pago</p>
              </div>
            </div>
            
            <div className='bg-[#121212] rounded-lg p-4 mb-4 border border-[#00FF87]/10'>
              <div className='space-y-2'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400'>Subtotal:</span>
                  <span className='text-white font-bold'>
                    {formatPrice(totalAmount, currency, rates, baseCurrency)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-400'>Descuento:</span>
                    <span className='text-[#00FF87] font-bold'>
                      -{formatPrice(discount, currency, rates, baseCurrency)}
                    </span>
                  </div>
                )}
                <div className='flex justify-between items-center pt-2 border-t border-[#00FF87]/10'>
                  <span className='text-gray-400'>Total a pagar:</span>
                  <span className='text-2xl font-bold bg-gradient-to-r from-[#00FF87] to-emerald-400 bg-clip-text text-transparent'>
                    {formatPrice(finalAmount, currency, rates, baseCurrency)}
                  </span>
                </div>
              </div>
              <p className='text-xs text-gray-500 mt-2'>Incluye envío gratuito</p>
            </div>
          </div>

          {/* Método de pago */}
          <div className='bg-[#121212]/90 rounded-xl p-6 border border-[#00FF87]/20'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-10 h-10 bg-[#00FF87]/20 rounded-full flex items-center justify-center'>
                <FaPaypal className='text-[#00FF87]' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-white'>Método de Pago</h3>
                <p className='text-gray-400 text-sm'>Paga de forma segura con PayPal</p>
              </div>
            </div>

            {/* Seguridad */}
            <div className='flex items-center gap-4 mb-6 p-4 bg-[#00FF87]/10 rounded-lg border border-[#00FF87]/20'>
              <FaShieldAlt className='text-[#00FF87] text-xl' />
              <div className='text-sm'>
                <p className='text-[#00FF87] font-semibold'>Pago 100% Seguro</p>
                <p className='text-gray-400'>Tus datos están protegidos con encriptación SSL</p>
              </div>
            </div>

            {/* Error */}
            {paymentError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mb-4 p-4 bg-red-500/10 rounded-lg border border-red-400/20'
              >
                <p className='text-red-400 text-sm'>{paymentError}</p>
              </motion.div>
            )}

            {/* PayPal */}
            <div className='paypal-checkout-container'>
              <PayPalScriptProvider 
                key={`pp-${paypalCurrency}`}
                options={{ 
                  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || '',
                  currency: paypalCurrency,
                  intent: "capture"
                }}
              >
                <PayPalButtons
                  forceReRender={[finalAmountForPayPal, paypalCurrency]}
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
                            value: finalAmountForPayPal.toFixed(2),
                            currency_code: paypalCurrency,
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

            {/* Footer */}
            <div className='mt-4 flex items-center gap-2 text-xs text-gray-400'>
              <FaLock className='text-gray-500' />
              <span>Procesado por PayPal - Transacción segura</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentStep(1)}
            className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-3 px-6 rounded-xl font-semibold hover:from-gray-800 hover:to-black transition-all duration-300 flex items-center justify-center gap-3"
          >
            <FaArrowLeft />
            <span>Volver a Datos</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
