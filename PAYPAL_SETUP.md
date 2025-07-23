# Configuración de PayPal - Tio Coins

## Variables de Entorno Requeridas

Para que PayPal funcione correctamente, necesitas configurar las siguientes variables de entorno:

### 1. Crear archivo `.env.local`

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# PayPal Configuration
VITE_PAYPAL_CLIENT_ID=tu_client_id_de_paypal_aqui

# Supabase Configuration (si no está configurado)
VITE_SUPABASE_URL=tu_supabase_url_aqui
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key_aqui
```

### 2. Obtener Client ID de PayPal

1. Ve a [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Inicia sesión con tu cuenta de PayPal
3. Ve a "Apps & Credentials"
4. Crea una nueva app o usa una existente
5. Copia el "Client ID" (no el Secret)

### 3. Configuración de PayPal

#### Para Desarrollo (Sandbox):
- Usa el Client ID de Sandbox
- Las transacciones serán de prueba

#### Para Producción:
- Usa el Client ID de Live
- Las transacciones serán reales

## Errores Comunes y Soluciones

### Error: "No se pudo inicializar PayPal"
- Verifica que `VITE_PAYPAL_CLIENT_ID` esté configurado
- Asegúrate de que el Client ID sea válido
- Verifica que estés usando el Client ID correcto (Sandbox vs Live)

### Error: "Error al procesar el pago"
- Verifica la conexión a internet
- Asegúrate de que la cuenta de PayPal tenga fondos suficientes
- Verifica que la moneda sea compatible (USD)

### Error: "No se pudo capturar la orden"
- Verifica que la orden se haya creado correctamente
- Asegúrate de que el monto sea válido
- Verifica los permisos de la app de PayPal

## Características Implementadas

✅ **Manejo de Errores Robusto**
- Errores específicos para cada tipo de problema
- Mensajes de error claros para el usuario
- Logging detallado para debugging

✅ **Diseño Moderno**
- Interfaz atractiva con tema gamer
- Animaciones suaves
- Indicadores de seguridad

✅ **Validación Completa**
- Verificación de datos antes del pago
- Validación de montos
- Comprobación de estado de la orden

✅ **Experiencia de Usuario**
- Estados de carga claros
- Feedback inmediato
- Navegación intuitiva

## Notas Importantes

1. **Seguridad**: Nunca expongas el Client Secret en el frontend
2. **Moneda**: El sistema está configurado para USD
3. **Entorno**: Usa Sandbox para desarrollo, Live para producción
4. **Testing**: Prueba con cuentas de PayPal de sandbox

## Soporte

Si tienes problemas con la configuración:
1. Verifica que todas las variables de entorno estén configuradas
2. Revisa la consola del navegador para errores
3. Verifica la documentación oficial de PayPal
4. Contacta al equipo de desarrollo 