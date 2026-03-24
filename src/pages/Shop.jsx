import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products.js';
import ProductCard from '../components/ProductCard.jsx';

function Shop() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setStatus('loading');
      try {
        const data = await fetchProducts();
        if (isMounted) {
          setProducts(data);
          setStatus('success');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setStatus('error');
        }
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (status === 'loading') {
    return <p>Loading products...</p>;
  }

  if (status === 'error') {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <h1>Shop</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Shop;
