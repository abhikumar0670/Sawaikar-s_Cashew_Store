import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const details = location.state;

  React.useEffect(() => {
    if (!details) {
      navigate('/');
    }
  }, [details, navigate]);

  if (!details) return null;

  return (
    <div style={{ maxWidth: 500, margin: '60px auto', background: '#fff', borderRadius: 8, boxShadow: '0 0 16px #eee', padding: 32, textAlign: 'center' }}>
      <h2 style={{ color: '#28a745', marginBottom: 16 }}>Order Confirmed!</h2>
      <p style={{ fontSize: 18, marginBottom: 24 }}>Thank you for your purchase. Your order has been placed successfully.</p>
      <div style={{ textAlign: 'left', margin: '0 auto', maxWidth: 350, background: '#f8f9fa', borderRadius: 6, padding: 18, fontSize: 16 }}>
        <p><b>Order Amount:</b> ₹{details.amount}</p>
        {details.method === 'cod' && (
          <p style={{color:'#e74c3c', fontSize:15}}><b>Includes ₹40 COD Handling Fee</b></p>
        )}
        <p><b>Payment Method:</b> {details.method && details.method.toUpperCase()}</p>
        <p><b>Order Time:</b> {details.time}</p>
        {/* Add more order details here if available */}
      </div>
      <button style={{ marginTop: 32, background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 28px', fontSize: 18, cursor: 'pointer' }} onClick={() => navigate('/')}>Continue Shopping</button>
    </div>
  );
};

export default OrderConfirmation;
