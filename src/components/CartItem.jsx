import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext.jsx';

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value) || value < 0) return;
    updateQuantity(item.id, value);
  };

  const increment = () => updateQuantity(item.id, item.quantity + 1);
  const decrement = () => updateQuantity(item.id, item.quantity - 1);

  const handleRemove = () => removeFromCart(item.id);

  return (
    <article
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        padding: '0.5rem 0',
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        style={{ width: '60px', height: '60px', objectFit: 'contain' }}
      />
      <div style={{ flex: 1 }}>
        <h3>{item.title}</h3>
        <p>${item.price.toFixed(2)}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button type="button" onClick={decrement} aria-label="cart-decrement">
          -
        </button>
        <input
          type="number"
          min="0"
          value={item.quantity}
          onChange={handleChange}
          style={{ width: '60px' }}
          aria-label="cart-quantity-input"
        />
        <button type="button" onClick={increment} aria-label="cart-increment">
          +
        </button>
      </div>
      <button type="button" onClick={handleRemove}>
        Remove
      </button>
    </article>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
