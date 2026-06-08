import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type OrderItem = {
	name: string;
	quantity: number;
	price: number;
};

type RequestBody = {
	to: string;
	customerName: string;
	orderId: number;
	totalAmount: number;
	items: OrderItem[];
	siteUrl?: string;
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { ...corsHeaders, 'Content-Type': 'application/json' },
	});

const getEnv = (...keys: string[]) => {
	for (const key of keys) {
		const value = Deno.env.get(key)?.trim();
		if (value) return value;
	}
	return undefined;
};

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

const formatUsd = (amount: number) =>
	new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'USD' }).format(amount);

const buildEmailHtml = (data: RequestBody) => {
	const itemsRows = data.items
		.map(
			(item) => `
			<tr>
				<td style="padding:12px;border-bottom:1px solid #2d2f33;color:#ffffff;">${escapeHtml(item.name)}</td>
				<td style="padding:12px;border-bottom:1px solid #2d2f33;color:#b0b0b0;text-align:center;">${item.quantity}</td>
				<td style="padding:12px;border-bottom:1px solid #2d2f33;color:#00FF87;text-align:right;">${formatUsd(item.price * item.quantity)}</td>
			</tr>`
		)
		.join('');

	const thankYouUrl = `${data.siteUrl ?? 'https://eltiocoins.com'}/checkout/${data.orderId}/thank-you`;

	return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0e0f11;font-family:Arial,sans-serif;">
	<table width="100%" cellpadding="0" cellspacing="0" style="background:#0e0f11;padding:32px 16px;">
		<tr><td align="center">
			<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#18191c;border:1px solid #2d2f33;border-radius:12px;overflow:hidden;">
				<tr>
					<td style="background:linear-gradient(135deg,#7c3aed,#db2777);padding:28px;text-align:center;">
						<h1 style="margin:0;color:#ffffff;font-size:24px;">El Tio Coins</h1>
						<p style="margin:8px 0 0;color:#f3e8ff;font-size:14px;">Confirmación de compra</p>
					</td>
				</tr>
				<tr>
					<td style="padding:28px;">
						<p style="margin:0 0 8px;color:#00FF87;font-size:18px;font-weight:bold;">¡Gracias, ${escapeHtml(data.customerName)}!</p>
						<p style="margin:0 0 20px;color:#b0b0b0;font-size:14px;line-height:1.6;">
							Tu pedido <strong style="color:#ffffff;">#${data.orderId}</strong> ha sido confirmado correctamente.
						</p>
						<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px;">
							<thead>
								<tr style="background:#1a1c1f;">
									<th style="padding:12px;text-align:left;color:#888;font-size:12px;">Producto</th>
									<th style="padding:12px;text-align:center;color:#888;font-size:12px;">Cant.</th>
									<th style="padding:12px;text-align:right;color:#888;font-size:12px;">Subtotal</th>
								</tr>
							</thead>
							<tbody>${itemsRows}</tbody>
						</table>
						<div style="border-top:1px solid #2d2f33;padding-top:16px;margin-bottom:24px;text-align:right;">
							<span style="color:#fff;font-size:16px;font-weight:bold;">Total: ${formatUsd(data.totalAmount)}</span>
						</div>
						<a href="${thankYouUrl}" style="display:inline-block;background:#00FF87;color:#000000;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;">
							Ver detalle del pedido
						</a>
					</td>
				</tr>
			</table>
		</td></tr>
	</table>
</body>
</html>`;
};

Deno.serve(async (req: Request) => {
	if (req.method === 'OPTIONS') {
		return new Response('ok', { headers: corsHeaders });
	}

	try {
		const body = (await req.json()) as RequestBody;

		if (!body.to || !body.orderId || !body.items?.length) {
			return jsonResponse({ sent: false, reason: 'invalid_payload' }, 400);
		}

		const apiKey = getEnv('RESEND_API_KEY', 'RESEND');
		if (!apiKey) {
			console.error('Falta RESEND_API_KEY en secrets de Supabase');
			return jsonResponse({
				sent: false,
				reason: 'missing_api_key',
				message: 'Configura el secret RESEND_API_KEY en Supabase',
			});
		}

		// Acepta ORDER_EMAIL_FROM u ORDER (nombre que usaste)
		const from =
			getEnv('ORDER_EMAIL_FROM', 'ORDER') ??
			'El Tio Coins <onboarding@resend.dev>';

		console.log('Enviando correo a:', body.to, 'desde:', from);

		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from,
				to: [body.to],
				subject: `Confirmación de compra #${body.orderId} - El Tio Coins`,
				html: buildEmailHtml(body),
			}),
		});

		const responseText = await res.text();

		if (!res.ok) {
			console.error('Resend error:', responseText);
			return jsonResponse({
				sent: false,
				reason: 'resend_error',
				message: responseText,
				hint:
					'Verifica en Resend que el dominio del remitente esté verificado, o usa: El Tio Coins <onboarding@resend.dev>',
			});
		}

		console.log('Correo enviado:', responseText);
		return jsonResponse({ sent: true });
	} catch (error) {
		console.error('Edge function error:', error);
		return jsonResponse({
			sent: false,
			reason: 'server_error',
			message: String(error),
		});
	}
});
