import { useForm } from 'react-hook-form';
import { InputAddress } from './InputAddress';
import {
	AddressFormValues,
	addressSchema,
} from '../../lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { ItemsCheckout } from './ItemsCheckout';
import { useCartStore } from '../../store/cart.store';
import { ImSpinner2 } from 'react-icons/im';
import { useCreateOrder } from '../../hooks';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const FormCheckout = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
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


	const onSubmit = handleSubmit(data => {
		const orderInput = {
			address: data,
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
	});

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
			<form className='flex flex-col gap-6' onSubmit={onSubmit}>
				<div className='flex flex-col gap-3'>
					<h3 className='text-lg font-semibold tracking-normal'>
						Entrega Inmediata
					</h3>

					<InputAddress
						register={register}
						errors={errors}
						name='state'
						placeholder='Estado / Provincia'
					/>

					<InputAddress
						register={register}
						errors={errors}
						name='city'
						placeholder='Ciudad'
					/>

					<InputAddress
						register={register}
						errors={errors}
						name='postalCode'
						placeholder='Código Postal (Opcional)'
					/>

					<select
						className='border border-slate-200 rounded-md p-3'
						{...register('country')}
					>
						<option value='Ecuador'>Ecuador</option>
						<option value="'Chile'">Chile</option>
						<option value="'España'">España</option>
						<option value="'Honduras'">Honduras</option>
						<option value="'USA'">USA</option>
						<option value="'Guatemala'">Guatemala</option>
						<option value="'Mexico'">Mexico</option>
						<option value="'Peru'">Peru</option>
						<option value="'Argentina'">Argentina</option>
						<option value="'Colombia'">Colombia</option>
						<option value="'El Salvador'">El Salvador</option>

					</select>
				</div>




				<div className='flex flex-col gap-6'>
					<h3 className='font-semibold text-3xl'>
						Resumen del pedido
					</h3>

					<ItemsCheckout />
				</div>



				<PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
					<PayPalButtons
						disabled={!isFormValid || isPending || isProcessing}
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
		
								// Obtener los valores actuales del formulario
								const formData = getValues(); // <-- Se obtiene la data correctamente
		
								// Crear orden en el backend
								createOrder(
									{
										address: formData, // Usamos los valores obtenidos del formulario
										cartItems: cartItems.map(item => ({
											variantId: item.variantId,
											quantity: item.quantity,
											price: item.price,
										})),
										totalAmount,
									},
									{
										onSuccess: (data) => {
											cleanCart();
											navigate(`/checkout/${data.id}/thank-you`);
										},
									}
								);
							});
						}}
						onError={(error) => {
							setIsProcessing(false);
							console.error("Error en el pago:", error);
							alert("Hubo un error al procesar el pago. Por favor, intenta nuevamente.");
						}}
					/>


				</PayPalScriptProvider>


			</form>
		</div>
	);
};