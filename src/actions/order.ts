import { OrderInput } from '../components/interfaces';
import { supabase } from '../supabase/client';
import { sendOrderConfirmationEmail } from './email';

type ResolvedCartItem = {
	variantId: string;
	pricingTierId: string | null;
	quantity: number;
	price: number;
	stock: number;
};

const resolveCartItem = async (
	item: OrderInput['cartItems'][number]
): Promise<ResolvedCartItem> => {
	const { data: variant } = await supabase
		.from('variants')
		.select('id, stock')
		.eq('id', item.variantId)
		.maybeSingle();

	if (variant) {
		return {
			variantId: variant.id,
			pricingTierId: null,
			quantity: item.quantity,
			price: item.price,
			stock: variant.stock,
		};
	}

	const { data: tier, error: tierError } = await supabase
		.from('pricing_tiers')
		.select('id, product_id, stock')
		.eq('id', item.variantId)
		.maybeSingle();

	if (tierError || !tier) {
		throw new Error('No se encontró el producto del carrito');
	}

	const { data: linkedVariant, error: linkedVariantError } = await supabase
		.from('variants')
		.select('id, stock')
		.eq('product_id', tier.product_id)
		.maybeSingle();

	if (linkedVariantError || !linkedVariant) {
		throw new Error('No se encontró la variante asociada al producto');
	}

	return {
		variantId: linkedVariant.id,
		pricingTierId: tier.id,
		quantity: item.quantity,
		price: item.price,
		stock: tier.stock ?? linkedVariant.stock,
	};
};

export const createOrder = async (order: OrderInput) => {
	// 1. Obtener el usuario autenticado + Cliente de tabla customer
	const { data, error: errorUser } = await supabase.auth.getUser();

	if (errorUser) {
		console.log(errorUser);
		throw new Error(errorUser.message);
	}

	const userId = data.user.id;

	const { data: customer, error: errorCustomer } = await supabase
		.from('customers')
		.select('id, full_name, email')
		.eq('user_id', userId)
		.single();

	if (errorCustomer) {
		console.log(errorCustomer);
		throw new Error(errorCustomer.message);
	}

	const customerId = customer.id;

	// 2. Resolver items del carrito (pricing_tiers → variants) y verificar stock
	const resolvedItems: ResolvedCartItem[] = [];

	for (const item of order.cartItems) {
		const resolved = await resolveCartItem(item);

		if (resolved.stock < resolved.quantity) {
			throw new Error('No hay stock suficiente para los artículos seleccionados');
		}

		resolvedItems.push(resolved);
	}

	// 3. Guardar la dirección del envío (solo compras que no son automáticas de monedas)
	let addressId: string | null = null;

	if (order.address) {
		const { data: addressData, error: addressError } = await supabase
			.from('addresses')
			.insert({
				city: order.address.city,
				state: order.address.state,
				postalcode: order.address.postalCode,
				country: order.address.country,
				customer_id: customerId,
			})
			.select()
			.single();

		if (addressError) {
			console.log(addressError);
			throw new Error(addressError.message);
		}

		addressId = addressData.id;
	}

	// 4. Crear la orden
	const { data: orderData, error: orderError } = await supabase
		.from('orders')
		.insert({
			customer_id: customerId,
			address_id: addressId,
			total_amount: order.totalAmount,
			status: 'Pending',
		})
		.select()
		.single();

	if (orderError) {
		console.log(orderError);
		throw new Error(orderError.message);
	}

	// 5. Guardar los detalles de la orden
	const orderItems = resolvedItems.map(item => ({
		order_id: orderData.id,
		variant_id: item.variantId,
		quantity: item.quantity,
		price: item.price,
	}));

	const { error: orderItemsError } = await supabase
		.from('order_items')
		.insert(orderItems);

	if (orderItemsError) {
		console.log(orderItemsError);
		throw new Error(orderItemsError.message);
	}

	// 6. Guardar datos de entrega automática de monedas (solo tras confirmar la compra)
	if (order.autoDelivery) {
		const { error: autoDeliveryError } = await supabase
			.from('coin_auto_delivery')
			.insert({
				order_id: orderData.id,
				client_name: order.autoDelivery.clientName,
				ea_email: order.autoDelivery.eaEmail,
				ea_password: order.autoDelivery.eaPassword,
				backup_code_1: order.autoDelivery.backupCode1,
				backup_code_2: order.autoDelivery.backupCode2 || null,
				backup_code_3: order.autoDelivery.backupCode3 || null,
			});

		if (autoDeliveryError) {
			console.log(autoDeliveryError);
			throw new Error(autoDeliveryError.message);
		}
	}

	// 7. Actualizar stock de variantes y pricing_tiers
	for (const item of resolvedItems) {
		const { data: variantData } = await supabase
			.from('variants')
			.select('stock')
			.eq('id', item.variantId)
			.maybeSingle();

		if (!variantData) {
			throw new Error('No se encontró la variante');
		}

		const { error: updatedVariantStockError } = await supabase
			.from('variants')
			.update({ stock: variantData.stock - item.quantity })
			.eq('id', item.variantId);

		if (updatedVariantStockError) {
			console.log(updatedVariantStockError);
			throw new Error('No se pudo actualizar el stock de la variante');
		}

		if (item.pricingTierId) {
			const { data: tierData } = await supabase
				.from('pricing_tiers')
				.select('stock')
				.eq('id', item.pricingTierId)
				.maybeSingle();

			if (tierData) {
				const { error: updatedTierStockError } = await supabase
					.from('pricing_tiers')
					.update({ stock: tierData.stock - item.quantity })
					.eq('id', item.pricingTierId);

				if (updatedTierStockError) {
					console.log(updatedTierStockError);
					throw new Error('No se pudo actualizar el stock del precio');
				}
			}
		}
	}

	// 8. Enviar confirmación por correo (no bloquea la orden si falla)
	try {
		const { data: orderItemsForEmail } = await supabase
			.from('order_items')
			.select('quantity, price, variants(products(name))')
			.eq('order_id', orderData.id);

		if (customer.email && orderItemsForEmail?.length) {
			const emailResult = await sendOrderConfirmationEmail({
				to: customer.email,
				customerName: customer.full_name,
				orderId: orderData.id,
				totalAmount: Number(order.totalAmount),
				items: orderItemsForEmail.map((item: {
					quantity: number;
					price: number;
					variants?: { products?: { name?: string } };
				}) => ({
					name: item.variants?.products?.name ?? 'Producto',
					quantity: item.quantity,
					price: Number(item.price),
				})),
			});
			console.log('Correo de confirmación enviado:', emailResult);
		} else {
			console.warn('Correo no enviado: sin email de cliente o sin items', {
				email: customer.email,
				items: orderItemsForEmail?.length ?? 0,
			});
		}
	} catch (emailError) {
		console.error('No se pudo enviar el correo de confirmación:', emailError);
	}

	return orderData;
};

export const getOrdersByCustomerId = async () => {
	const { data, error } = await supabase.auth.getUser();

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	const { data: customer, error: customerError } = await supabase
		.from('customers')
		.select('id')
		.eq('user_id', data.user.id)
		.single();

	if (customerError) {
		console.log(customerError);
		throw new Error(customerError.message);
	}

	const customerId = customer.id;

	const { data: orders, error: ordersError } = await supabase
		.from('orders')
		.select('id, total_amount, status, created_at')
		.eq('customer_id', customerId)
		.order('created_at', {
			ascending: false,
		});

	if (ordersError) {
		console.log(ordersError);
		throw new Error(ordersError.message);
	}

	return orders;
};

export const getOrderById = async (orderId: number) => {
	const { data, error: errorUser } = await supabase.auth.getUser();

	if (errorUser) {
		console.log(errorUser);
		throw new Error(errorUser.message);
	}

	const { data: customer, error: customerError } = await supabase
		.from('customers')
		.select('id')
		.eq('user_id', data.user.id)
		.single();

	if (customerError) {
		console.log(customerError);
		throw new Error(customerError.message);
	}

	const customerId = customer.id;

	const { data: order, error } = await supabase
		.from('orders')
		.select(
			'*, addresses(*), customers(full_name, email), order_items(quantity, price, variants(products(name, images)))'
		)
		.eq('customer_id', customerId)
		.eq('id', orderId)
		.single();

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	return {
		customer: {
			email: order?.customers?.email,
			full_name: order.customers?.full_name,
		},
		totalAmount: order.total_amount,
		status: order.status,
		create_at: order.created_at,
		address: {
			city: order.addresses?.city,
			state: order.addresses?.state,
			postalCode: order.addresses?.postalcode,
			country: order.addresses?.country,
		},
		orderItems: order.order_items.map(item => ({
			quantity: item.quantity,
			price: item.price,
			productName: item.variants?.products?.name,
			productImage: item.variants?.products?.images[0],
		})),
	};
};

//Admin

const mapCoinAutoDelivery = (
	row: {
		client_name: string;
		ea_email: string;
		ea_password: string;
		backup_code_1: string;
		backup_code_2: string | null;
		backup_code_3: string | null;
	} | null
) => {
	if (!row) return null;

	return {
		clientName: row.client_name,
		eaEmail: row.ea_email,
		eaPassword: row.ea_password,
		backupCode1: row.backup_code_1,
		backupCode2: row.backup_code_2,
		backupCode3: row.backup_code_3,
	};
};

export const getAllOrders = async () => {
	const { data, error } = await supabase
		.from('orders')
		.select(
			'id, total_amount, status, created_at, customers(full_name, email), coin_auto_delivery(client_name, ea_email, ea_password, backup_code_1, backup_code_2, backup_code_3)'
		)
		.order('created_at', { ascending: false });

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	return data;
};

export const updateOrderStatus = async ({
	id,
	status,
}: {
	id: number;
	status: string;
}) => {
	const { error } = await supabase
		.from('orders')
		.update({ status })
		.eq('id', id);

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}
};

export const getOrderByIdAdmin = async (id: number) => {
	const { data: order, error } = await supabase
		.from('orders')
		.select(
			'*, addresses(*), customers(full_name, email), coin_auto_delivery(client_name, ea_email, ea_password, backup_code_1, backup_code_2, backup_code_3), order_items(quantity, price, variants(products(name, images, category)))'
		)
		.eq('id', id)
		.single();

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	const autoDeliveryRow = Array.isArray(order.coin_auto_delivery)
		? order.coin_auto_delivery[0] ?? null
		: order.coin_auto_delivery;

	const autoDelivery = mapCoinAutoDelivery(autoDeliveryRow);
	const hasMonedasProduct = order.order_items.some(
		(item: { variants?: { products?: { category?: string } } }) =>
			item.variants?.products?.category === 'monedas'
	);

	return {
		customer: {
			email: order?.customers?.email,
			full_name: order.customers?.full_name,
		},
		totalAmount: order.total_amount,
		status: order.status,
		create_at: order.created_at,
		address: {
			city: order.addresses?.city,
			state: order.addresses?.state,
			postalCode: order.addresses?.postalcode,
			country: order.addresses?.country,
		},
		orderItems: order.order_items.map((item: {
			quantity: number;
			price: number;
			variants?: { products?: { name?: string; images?: string[]; category?: string } };
		}) => ({
			quantity: item.quantity,
			price: item.price,
			productName: item.variants?.products?.name,
			productImage: item.variants?.products?.images?.[0],
			productCategory: item.variants?.products?.category,
		})),
		autoDelivery,
		isCoinAutoSale: Boolean(autoDelivery) || hasMonedasProduct,
	};
};