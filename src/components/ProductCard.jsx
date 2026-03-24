import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext.jsx';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value) || value < 0) return;
    setQuantity(value);
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 0 ? q - 1 : 0));

  const handleAdd = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
    }
  };

  return (
    <article
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{ maxHeight: '150px', objectFit: 'contain', alignSelf: 'center' }}
      />
      <h3>{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button type="button" onClick={decrement} aria-label="decrement">
          -
        </button>
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={handleChange}
          style={{ width: '60px' }}
          aria-label="quantity-input"
        />
        <button type="button" onClick={increment} aria-label="increment">
          +
        </button>
      </div>
      <button type="button" onClick={handleAdd}>
        Add To Cart
      </button>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
