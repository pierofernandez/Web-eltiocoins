import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputAddress } from './InputAddress';
import { AddressFormValues, addressSchema } from '../../lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { ItemsCheckout } from './ItemsCheckout';
import { useCartStore } from '../../store/cart.store';
import { ImSpinner2 } from 'react-icons/im';
import { useCreateOrder } from '../../hooks';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';

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
  const isFormValid = Object.keys(errors).length === 0;
  const cleanCart = useCartStore(state => state.cleanCart);
  const cartItems = useCartStore(state => state.items);
  const totalAmount = useCartStore(state => state.totalAmount);
  const navigate = useNavigate();

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
      }
    });
  };

  if (isPending) {
    return (
      <div className='flex flex-col gap-3 h-screen items-center justify-center'>
        <ImSpinner2 className='animate-spin h-10 w-10' />
        <p className='text-sm font-medium'>
          Estamos procesando tu pedido
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Indicador de pasos */}
      <div className="flex mb-8">
        <div
          className={`flex-1 border-b-2 ${currentStep === 1 ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-400'}`}
        >
          <div className="text-center pb-2">1. Datos de entrega</div>
        </div>
        <div
          className={`flex-1 border-b-2 ${currentStep === 2 ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-400'}`}
        >
          <div className="text-center pb-2">2. Método de pago</div>
        </div>
      </div>

      {currentStep === 1 ? (
        <form className='flex flex-col gap-6' onSubmit={onSubmitDeliveryData}>
          <div className='flex flex-col gap-3'>
            <h3 className='text-lg font-semibold tracking-normal'>
              Entrega Inmediata
            </h3>

            <InputAddress
              register={register}
              errors={errors}
              name='state'
              placeholder='Estado / Provincia'
              className='text-white outline-none border border-gray-500 p-2 rounded-md'
            />

            <InputAddress
              register={register}
              errors={errors}
              name='city'
              placeholder='Ciudad'
              className='text-white outline-none border border-gray-500 p-2 rounded-md'
            />

            <InputAddress
              register={register}
              errors={errors}
              name='postalcode'  // Cambiado de postalCode a postalcode
              placeholder='Código Postal (Opcional)'
              className='text-white outline-none border border-gray-500 p-2 rounded-md'
            />

            <select
              className='border border-slate-200 rounded-md p-3 text-white bg-transparent'
              {...register('country')}
            >
              <option className='text-black' value='Ecuador'>Ecuador</option>
              <option className='text-black' value="'Chile'">Chile</option>
              <option className='text-black' value="'España'">España</option>
              <option className='text-black' value="'Honduras'">Honduras</option>
              <option className='text-black' value="'USA'">USA</option>
              <option className='text-black' value="'Guatemala'">Guatemala</option>
              <option className='text-black' value="'Mexico'">Mexico</option>
              <option className='text-black' value="'Peru'">Peru</option>
              <option className='text-black' value="'Argentina'">Argentina</option>
              <option className='text-black' value="'Colombia'">Colombia</option>
              <option className='text-black' value="'El Salvador'">El Salvador</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            disabled={!isFormValid}
          >
            Continuar al pago
          </button>
        </form>
      ) : (
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-6'>
            <h3 className='font-semibold text-3xl'>
              Resumen del pedido
            </h3>
            <ItemsCheckout />
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Método de pago</h3>

            <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
              <PayPalButtons
                disabled={isPending || isProcessing}
                createOrder={(_, actions) => {
                  setIsProcessing(true);
                  if (!actions.order) {
                    throw new Error("No se pudo crear la orden de PayPal.");
                  }
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          value: totalAmount.toFixed(2),
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
                onApprove={(_, actions) => {
                  if (!actions.order) {
                    throw new Error("No se pudo capturar la orden de PayPal.");
                  }
                  return actions.order.capture().then((details) => {
                    setIsProcessing(false);
                    console.log("Pago completado:", details);
                    onSubmitPayment();
                  });
                }}
                onError={(error) => {
                  setIsProcessing(false);
                  console.error("Error en el pago:", error);
                  alert("Hubo un error al procesar el pago. Por favor, intenta nuevamente.");
                }}
              />
            </PayPalScriptProvider>

            <button
              onClick={() => setCurrentStep(1)}
              className="mt-4 text-blue-500 hover:text-blue-700"
            >
              ← Volver a los datos de entrega
            </button>
          </div>
        </div>
      )}
    </div>
  );
};