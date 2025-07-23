import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configurar MercadoPago con el access token
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' 
});

const preference = new Preference(client);

export const createPreference = async (req: any, res: any) => {
  try {
    const { items, back_urls, auto_return } = req.body;

    const preferenceData = {
      items,
      back_urls,
      auto_return,
      notification_url: `${process.env.BASE_URL}/api/webhook/mercadopago`,
      external_reference: `order_${Date.now()}`,
      expires: true,
      expiration_date_to: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutos
    };

    const response = await preference.create({ body: preferenceData });

    res.json({
      preferenceId: response.id,
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point,
    });
  } catch (error) {
    console.error('Error creating MercadoPago preference:', error);
    res.status(500).json({ 
      error: 'Error al crear la preferencia de pago',
      details: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const handleWebhook = async (req: any, res: any) => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const paymentId = data.id;
      
      // Obtener información del pago usando la API REST
      const paymentResponse = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (paymentResponse.ok) {
        const payment = await paymentResponse.json();
        
        console.log('Payment received:', payment);
        
        // Aquí puedes procesar el pago según su estado
        const status = payment.status;
        const externalReference = payment.external_reference;
        
        if (status === 'approved') {
          // Pago aprobado - actualizar orden en tu BD
          console.log('Payment approved for order:', externalReference);
          // TODO: Actualizar estado de la orden en tu base de datos
        } else if (status === 'rejected') {
          // Pago rechazado
          console.log('Payment rejected for order:', externalReference);
          // TODO: Manejar pago rechazado
        } else if (status === 'pending') {
          // Pago pendiente
          console.log('Payment pending for order:', externalReference);
          // TODO: Manejar pago pendiente
        }
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Error processing webhook' });
  }
}; 