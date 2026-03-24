import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const linkStyle = ({ isActive }) => ({
  marginRight: '1rem',
  textDecoration: isActive ? 'underline' : 'none',
});

function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid #ddd',
        gap: '1rem',
      }}
    >
      <NavLink to="/" style={linkStyle}>
        Home
      </NavLink>
      <NavLink to="/shop" style={linkStyle}>
        Shop
      </NavLink>
      <NavLink to="/cart" style={linkStyle} aria-label="cart-link">
        Cart {totalItems > 0 && `(${totalItems})`}
      </NavLink>
    </nav>
  );
}

export default Navbar;
