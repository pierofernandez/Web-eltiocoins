// ============================================================================
// IMPORTACIONES
// ============================================================================
// Importar las 3 funciones principales que vamos a testear de order.ts
import { getOrdersByCustomerId, updateOrderStatus, createOrder } from '../order';

// ============================================================================
// MOCK DEL CLIENTE SUPABASE
// ============================================================================
// Creamos un mock completo del cliente Supabase para evitar llamadas reales
// a la base de datos durante los tests. Esto aísla nuestras pruebas.
jest.mock('../../supabase/client', () => {
  // Objeto que simula el cliente Supabase
  const mockSupabase = {
    // 1. AUTH: simulamos la autenticación del usuario
    auth: {
      // getUser() es un método que simula obtener el usuario actual logueado
      getUser: jest.fn(),
    },
    
    // 2. FROM: simulamos el método para acceder a tablas de la BD
    // Recibe el nombre de la tabla como parámetro
    from: jest.fn((_table: string) => {
      // Creamos un objeto "chain" que simula el patrón fluido de Supabase
      // (select().eq().single() etc.) y permite encadenamiento de métodos
      const chain = {
        // select() devuelve el chain para permitir .eq().single()
        select: jest.fn(() => chain),
        // eq() devuelve el chain para permitir más métodos encadenados
        eq: jest.fn(() => chain),
        // single() obtiene un solo registro (defecto: sin datos)
        single: jest.fn(),
        // insert() inserta datos y devuelve una promesa con éxito por defecto
        insert: jest.fn(() => Promise.resolve({ data: null, error: null })),
        // update() actualiza datos y devuelve una promesa con éxito por defecto
        update: jest.fn(() => Promise.resolve({ error: null })),
        // order() ordena resultados y devuelve una promesa con éxito por defecto
        order: jest.fn(() => Promise.resolve({ data: null, error: null })),
      } as any;

      // ===== PERSONALIZACIÓN DE MOCKS POR TABLA =====
      // Aquí adaptamos el comportamiento del mock según qué tabla se consulte
      
      // Caso 1: Tabla "customers" - devuelve un cliente específico
      if (_table === 'customers') {
        chain.single = jest.fn(() => Promise.resolve({ data: { id: 42 }, error: null }));
      }

      // Caso 2: Tabla "orders" - devuelve un listado de órdenes
      if (_table === 'orders') {
        chain.select = jest.fn(() => ({
          eq: jest.fn(() => ({
            // Devuelve un array de órdenes con datos de ejemplo
            order: jest.fn(() => Promise.resolve({ 
              data: [{ 
                id: 1, 
                total_amount: 100, 
                status: 'Pending', 
                created_at: '2020-01-01' 
              }], 
              error: null 
            }))
          }))
        }));
      }

      // Retornamos el objeto chain que permite encadenamiento
      return chain;
    })
  } as any;

  // Exportamos el mock como el módulo supabase
  return { supabase: mockSupabase };
});

// ============================================================================
// OBTENER INSTANCIA DEL MOCK
// ============================================================================
// Extraemos el mock de supabase que Jest proporciona. Esto nos permite
// modificar su comportamiento en tiempo de ejecución de los tests.
const { supabase } = require('../../supabase/client');

// ============================================================================
// SUITE DE TESTS: "order actions"
// ============================================================================
// describe() agrupa todos nuestros tests relacionados con las acciones de orden
describe('order actions', () => {
  // =========================================================================
  // SETUP PREVIO A CADA TEST
  // =========================================================================
  // beforeEach() se ejecuta antes de cada test individual para resetear estado
  beforeEach(() => {
    // Limpiamos todos los mocks para que cada test comience limpio
    // Esto evita que datos de un test afecten al siguiente
    jest.clearAllMocks();
  });

  // =========================================================================
  // TEST 1: getOrdersByCustomerId devuelve un array de órdenes
  // =========================================================================
  test('getOrdersByCustomerId returns orders array', async () => {
    // PASO 1: Configurar el mock de autenticación
    // Simulamos que un usuario está logueado con ID 'user-1'
    supabase.auth.getUser.mockResolvedValue({ 
      data: { user: { id: 'user-1' } }, 
      error: null 
    });

    // PASO 2: Ejecutar la función que queremos testear
    // Esta función obtiene todas las órdenes del usuario logueado
    const orders = await getOrdersByCustomerId();

    // PASO 3: Verificar que el resultado es un array
    expect(Array.isArray(orders)).toBe(true);
    
    // PASO 4: Verificar que el primer elemento del array contiene los datos esperados
    // Nos aseguramos que tiene id=1 y total_amount=100
    expect(orders[0]).toMatchObject({ id: 1, total_amount: 100 });
  });

  // =========================================================================
  // TEST 2: updateOrderStatus no lanza error cuando es exitoso
  // =========================================================================
  test('updateOrderStatus does not throw on success', async () => {
    // PASO 1: Obtener referencia al mock de la función "from()"
    const mockFrom = supabase.from as jest.Mock;
    
    // PASO 2: Personalizar el mock para esta prueba específica
    // Asignamos la implementación para simular una actualización exitosa
    // from() -> update() -> eq() -> Promise con error: null
    mockFrom.mockImplementation((_table: string) => ({
      // update() devuelve un objeto con el método eq()
      update: jest.fn(() => ({ 
        // eq() busca por ID y devuelve una promesa sin error
        eq: jest.fn(() => Promise.resolve({ error: null })) 
      }))
    }));

    // PASO 3: Ejecutar la función que actualiza el estado de una orden
    // Le pasamos id=1 y nuevo status='Shipped'
    // PASO 4: Verificar que la promesa se resuelve sin lanzar excepción
    // resolves.toBeUndefined() significa que la función retorna undefined en caso de éxito
    await expect(updateOrderStatus({ id: 1, status: 'Shipped' })).resolves.toBeUndefined();
  });

  // =========================================================================
  // TEST 3: createOrder lanza error cuando no hay stock suficiente
  // =========================================================================
  test('createOrder throws when variant stock insufficient', async () => {
    // PASO 1: Preparar el mock del usuario autenticado
    supabase.auth.getUser.mockResolvedValue({ 
      data: { user: { id: 'u1' } }, 
      error: null 
    });

    // PASO 2: Obtener referencia al mock de "from()"
    const originalFrom = supabase.from as jest.Mock;
    
    // PASO 3: Personalizar el mock para simular diferentes respuestas por tabla
    originalFrom.mockImplementation((_table: string) => {
      // Caso 1: Tabla "customers" - devuelve el cliente con ID 1
      if (_table === 'customers') {
        return {
          select: jest.fn(() => ({
            eq: jest.fn(() => ({
              single: jest.fn(() => Promise.resolve({ data: { id: 1 }, error: null }))
            }))
          }))
        } as any;
      }

      // Caso 2: Tabla "variants" - devuelve una variante con POCO stock
      // Aquí simulamos que hay solo 1 unidad en stock
      if (_table === 'variants') {
        return {
          select: jest.fn(() => ({
            eq: jest.fn(() => ({
              single: jest.fn(() => Promise.resolve({ data: { stock: 1 }, error: null }))
            }))
          }))
        } as any;
      }

      // Caso 3: Otras tablas (direcciones, órdenes, etc.) - respuesta por defecto
      return {
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            single: jest.fn(() => Promise.resolve({ data: null, error: null }))
          }))
        }))
      } as any;
    });

    // PASO 4: Construir una orden BEM con más cantidad que stock disponible
    // Intentamos comprar 5 unidades pero solo hay 1 en stock
    const badOrder = {
      cartItems: [ 
        { 
          variantId: 123,      // ID de la variante
          quantity: 5,         // Queremos 5 unidades
          price: 10            // Precio unitario
        } 
      ],
      address: { 
        city: 'X', 
        state: 'Y', 
        postalCode: 'Z', 
        country: 'C' 
      },
      totalAmount: 50,
    } as any;

    // PASO 5: Ejecutar createOrder y verificar que LANZA UN ERROR
    // rejects.toThrow() significa que debe fallar con el mensaje especificado
    await expect(createOrder(badOrder)).rejects.toThrow(
      'No hay stock suficiente los artículos seleccionados'
    );
  });
});
