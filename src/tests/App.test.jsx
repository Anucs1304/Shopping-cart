import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import { CartProvider } from '../context/CartContext.jsx';

function renderWithProviders(ui) {
  return render(
    <BrowserRouter>
      <CartProvider>{ui}</CartProvider>
    </BrowserRouter>
  );
}

describe('App routing', () => {
  it('renders home page by default', () => {
    renderWithProviders(<App />);
    expect(
      screen.getByRole('heading', { name: /welcome to react shop/i })
    ).toBeInTheDocument();
  });

  it('shows navbar links', () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/shop/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cart-link/i)).toBeInTheDocument();
  });
});
