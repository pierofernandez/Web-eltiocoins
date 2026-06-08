import { supabase } from '../supabase/client';

export type OrderConfirmationEmailPayload = {
	to: string;
	customerName: string;
	orderId: number;
	totalAmount: number;
	items: {
		name: string;
		quantity: number;
		price: number;
	}[];
	siteUrl?: string;
};

export const sendOrderConfirmationEmail = async (
	payload: OrderConfirmationEmailPayload
) => {
	const { data, error } = await supabase.functions.invoke('send-order-confirmation', {
		body: {
			...payload,
			siteUrl: payload.siteUrl ?? window.location.origin,
		},
	});

	if (error) {
		console.error('Edge function invoke error:', error);
		throw error;
	}

	const result = data as {
		sent: boolean;
		reason?: string;
		message?: string;
		hint?: string;
	};

	if (!result?.sent) {
		const detail = result?.message ?? result?.reason ?? 'unknown';
		console.error('Correo no enviado:', detail, result?.hint ?? '');
		throw new Error(`No se pudo enviar el correo: ${detail}`);
	}

	return result;
};
