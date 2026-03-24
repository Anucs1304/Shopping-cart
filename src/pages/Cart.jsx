import { useCart } from '../context/CartContext.jsx';
import CartItem from '../components/CartItem.jsx';

function Cart() {
  const { cartItems } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <section>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Your Cart</h1>
      <div style={{ marginTop: '1rem' }}>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <h2 style={{ marginTop: '1rem' }}>Total: ${totalPrice.toFixed(2)}</h2>
    </section>
  );
}

export default Cart;
