import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cart from '../pages/Cart.jsx';
import { CartProvider } from '../context/CartContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import React from 'react';

function CartWithPreloadedItems() {
  const Wrapper = () => {
    const { addToCart } = useCart();

    React.useEffect(() => {
      addToCart(
        {
          id: 1,
          title: 'Test Product',
          price: 10,
          image: 'https://example.com/image.jpg',
        },
        2
      );
    }, [addToCart]);

    return <Cart />;
  };

  return (
    <BrowserRouter>
      <CartProvider>
        <Wrapper />
      </CartProvider>
    </BrowserRouter>
  );
}

describe('Cart page', () => {
  it('shows items and total', () => {
    render(<CartWithPreloadedItems />);

    expect(screen.getByText(/test product/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByText(/total: \$20\.00/i)).toBeInTheDocument();
  });
});
