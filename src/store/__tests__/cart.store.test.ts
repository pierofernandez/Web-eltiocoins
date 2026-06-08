import { useCartStore } from '../../store/cart.store';

const sampleItem = { variantId: 'v1', price: 10, quantity: 2, productName: 'P', productImage: 'img' };

describe('cart store', () => {
  beforeEach(() => {
    // reset store state
    useCartStore.setState({
      items: [],
      totalItemsInCart: 0,
      subtotal: 0,
      discountCode: null,
      discount: 0,
      totalAmount: 0,
    } as any);
  });

  test('addItem updates items, subtotal and totalAmount', () => {
    useCartStore.getState().addItem(sampleItem as any);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.subtotal).toBe(20);
    expect(state.totalItemsInCart).toBe(2);
    expect(state.totalAmount).toBe(20);
  });

  test('applyDiscount reduces totalAmount', () => {
    useCartStore.getState().addItem(sampleItem as any);
    useCartStore.getState().applyDiscount('CODE', 5);

    const state = useCartStore.getState();
    expect(state.discount).toBe(5);
    expect(state.totalAmount).toBe(15);
  });

  test('clearDiscount resets discount and totalAmount', () => {
    useCartStore.getState().addItem(sampleItem as any);
    useCartStore.getState().applyDiscount('CODE', 5);
    useCartStore.getState().clearDiscount();

    const state = useCartStore.getState();
    expect(state.discount).toBe(0);
    expect(state.discountCode).toBeNull();
    expect(state.totalAmount).toBe(20);
  });

  test('removeItem removes item and updates totals', () => {
    useCartStore.getState().addItem(sampleItem as any);
    useCartStore.getState().removeItem('v1');

    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);
    expect(state.subtotal).toBe(0);
    expect(state.totalAmount).toBe(0);
  });

  test('updateQuantity changes item quantity and totals', () => {
    useCartStore.getState().addItem(sampleItem as any);
    useCartStore.getState().updateQuantity('v1', 5);

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(5);
    expect(state.subtotal).toBe(50);
    expect(state.totalAmount).toBe(50);
  });
});
