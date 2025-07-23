# Configuración de MercadoPago - Tio Coins

## Variables de Entorno Requeridas

Para que MercadoPago funcione correctamente, necesitas configurar las siguientes variables de entorno:

### 1. Crear archivo `.env.local`

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# MercadoPago Configuration
VITE_MERCADOPAGO_PUBLIC_KEY=tu_public_key_de_mercadopago_aqui
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_de_mercadopago_aqui

# PayPal Configuration (existente)
VITE_PAYPAL_CLIENT_ID=tu_client_id_de_paypal_aqui

# Supabase Configuration (existente)
VITE_SUPABASE_URL=tu_supabase_url_aqui
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key_aqui

# Server Configuration
PORT=3001
BASE_URL=http://localhost:3001
```

### 2. Obtener Credenciales de MercadoPago

1. Ve a [MercadoPago Developers](https://www.mercadopago.com.ar/developers)
2. Inicia sesión con tu cuenta de MercadoPago
3. Ve a "Tus integraciones" → "Credenciales"
4. Copia la "Public Key" y el "Access Token"

### 3. Configuración de MercadoPago

#### Para Desarrollo (Test):
- Usa las credenciales de TEST
- Las transacciones serán de prueba
- URL: https://www.mercadopago.com.ar/developers/panel/credentials

#### Para Producción:
- Usa las credenciales de PRODUCCIÓN
- Las transacciones serán reales
- Cambia las credenciales en tu servidor de producción

## Configuración del Servidor

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Ejecutar el Servidor

Tienes varias opciones para ejecutar el servidor:

#### Opción A: Solo el servidor de MercadoPago
```bash
npm run server
```

#### Opción B: Servidor con auto-reload (desarrollo)
```bash
npm run dev:server
```

#### Opción C: Frontend + Servidor simultáneamente
```bash
npm run dev:full
```

### 3. Verificar que el Servidor Funciona

El servidor estará disponible en `http://localhost:3001`

Puedes verificar que funciona visitando:
- Health check: `http://localhost:3001/api/health`

### 4. Estructura del Servidor

El servidor (`server.js`) incluye:

- **Endpoint para crear preferencias**: `POST /api/create-preference`
- **Webhook para notificaciones**: `POST /api/webhook/mercadopago`
- **Health check**: `GET /api/health`
- **CORS habilitado** para comunicación con el frontend

## Características Implementadas

✅ **Integración Completa**
- Componente MercadoPagoCheckout con diseño moderno
- Selector de método de pago (PayPal vs MercadoPago)
- Manejo de estados de carga y errores
- Páginas de éxito, fallo y pendiente

✅ **Servidor Express**
- Endpoint para crear preferencias de pago
- Webhook para recibir notificaciones
- Manejo de errores robusto
- Logging detallado para debugging

✅ **Experiencia de Usuario**
- Diseño consistente con el tema gamer
- Animaciones suaves con Framer Motion
- Información de seguridad clara
- Navegación intuitiva

✅ **Manejo de Errores**
- Validación de credenciales
- Mensajes de error específicos
- Logging detallado para debugging
- Estados de fallback

✅ **Páginas de Resultado**
- `/checkout/success` - Pago exitoso
- `/checkout/failure` - Pago fallido
- `/checkout/pending` - Pago en proceso

## Flujo de Pago

1. **Usuario selecciona MercadoPago** en el checkout
2. **Se crea preferencia** llamando al endpoint del servidor
3. **Usuario es redirigido** a MercadoPago para completar el pago
4. **MercadoPago redirige** de vuelta según el resultado:
   - Éxito → `/checkout/success`
   - Fallo → `/checkout/failure`
   - Pendiente → `/checkout/pending`
5. **Webhook recibe notificación** del estado final del pago
6. **Se actualiza la orden** en la base de datos

## Métodos de Pago Soportados

MercadoPago soporta múltiples métodos de pago:

- **Tarjetas de crédito y débito**
- **Transferencias bancarias**
- **Pagos en efectivo** (Rapipago, PagoFácil, etc.)
- **Billeteras digitales** (MercadoPago, Ualá, etc.)
- **Cuotas sin interés**

## Configuración de Webhooks

1. Ve a tu panel de MercadoPago
2. Configura la URL del webhook: `https://tudominio.com/api/webhook/mercadopago`
3. Selecciona los eventos: `payment.created`, `payment.updated`
4. Verifica que el webhook esté funcionando

## Testing

### Cuentas de Prueba

Para testing, usa estas cuentas de MercadoPago:

**Comprador:**
- Email: `test_user_123456@testuser.com`
- Contraseña: `qatest1234`

**Vendedor:**
- Usa las credenciales de TEST de tu cuenta

### Tarjetas de Prueba

- **Visa:** 4509 9535 6623 3704
- **Mastercard:** 5031 4332 1540 6351
- **American Express:** 3711 8030 3257 522

## Solución de Problemas

### Error: "Error al crear la preferencia de pago"

1. **Verifica que el servidor esté corriendo:**
   ```bash
   npm run server
   ```

2. **Verifica las credenciales:**
   - Asegúrate de que `MERCADOPAGO_ACCESS_TOKEN` esté configurado
   - Usa credenciales de TEST para desarrollo

3. **Verifica la conexión:**
   - El frontend debe poder acceder a `http://localhost:3001`
   - Revisa la consola del navegador para errores de CORS

4. **Verifica los logs del servidor:**
   - El servidor mostrará logs detallados de cada request
   - Busca errores específicos de MercadoPago

### Error de CORS

Si tienes problemas de CORS, el servidor ya tiene CORS habilitado. Si persiste:

1. Verifica que el frontend esté en el puerto correcto (5173 por defecto)
2. Asegúrate de que el servidor esté en el puerto 3001

## Notas Importantes

1. **Seguridad**: Nunca expongas el Access Token en el frontend
2. **Moneda**: El sistema está configurado para USD
3. **Entorno**: Usa TEST para desarrollo, PRODUCCIÓN para lanzamiento
4. **Webhooks**: Son esenciales para confirmar pagos
5. **Testing**: Prueba todos los flujos antes del lanzamiento
6. **Servidor**: Debe estar corriendo para que MercadoPago funcione

## Soporte

Si tienes problemas con la configuración:

1. Verifica que todas las variables de entorno estén configuradas
2. Asegúrate de que el servidor esté corriendo
3. Revisa la consola del navegador para errores
4. Verifica los logs del servidor
5. Consulta la [documentación oficial de MercadoPago](https://www.mercadopago.com.ar/developers)
6. Contacta al equipo de desarrollo

## Próximos Pasos

1. **Configurar webhooks** en producción
2. **Implementar notificaciones** por email
3. **Agregar más métodos de pago** si es necesario
4. **Optimizar la experiencia** basado en feedback de usuarios
5. **Implementar analytics** para tracking de conversiones 