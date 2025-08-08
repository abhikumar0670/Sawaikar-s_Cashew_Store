import React from 'react';
import { useProductContext } from '../context/productContext';

const ProductDebug = () => {
  const { products, isLoading } = useProductContext();

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      left: '10px', 
      background: 'white', 
      border: '1px solid #ccc', 
      padding: '10px',
      zIndex: 9999,
      maxHeight: '200px',
      overflow: 'auto',
      fontSize: '12px'
    }}>
      <h4>Available Product IDs:</h4>
      <ul>
        {products.slice(0, 20).map(product => (
          <li key={product.id}>
            ID: {product.id} - {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDebug;
