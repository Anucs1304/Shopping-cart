import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Shop from '../pages/Shop.jsx';
import { CartProvider } from '../context/CartContext.jsx';
import * as api from '../api/products.js';

function renderShop() {
  return render(
    <BrowserRouter>
      <CartProvider>
        <Shop />
      </CartProvider>
    </BrowserRouter>
  );
}

describe('Shop page', () => {
  it('renders products from API', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Test Product',
        price: 9.99,
        image: 'https://example.com/image.jpg',
      },
    ];

    vi.spyOn(api, 'fetchProducts').mockResolvedValueOnce(mockProducts);

    renderShop();

    expect(screen.getByText(/loading products/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/test product/i)).toBeInTheDocument()
    );
  });
});
