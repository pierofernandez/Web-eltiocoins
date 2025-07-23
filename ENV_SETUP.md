# Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz de tu proyecto con las siguientes variables:

## Variables Requeridas

```env
# Supabase
VITE_PROYECT_URL_SUPABASE=https://your-project.supabase.co
VITE_SUPABASE_API_KEY=your_supabase_api_key

# PayPal
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

## Obtener Credenciales

### Supabase
1. Ve a tu dashboard de Supabase
2. Settings > API
3. Copia la URL y la API Key

### PayPal
1. Ve a [developer.paypal.com](https://developer.paypal.com)
2. Crea una app
3. Copia el Client ID

## Notas Importantes

- **Nunca** subas el archivo `.env` a Git
- Usa credenciales de TEST para desarrollo
- Cambia a credenciales de PRODUCCIÓN para el lanzamiento
- Las variables que empiezan con `VITE_` son visibles en el frontend 