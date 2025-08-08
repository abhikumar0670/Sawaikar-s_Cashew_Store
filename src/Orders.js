import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import placeholderImg from './assets/placeholderImg';

const OrdersContainer = styled.div`
  margin: 40px auto;
  max-width: 900px;
  background: #f7f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 24px 0;
`;

const Order = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px 16px 32px;
  border-bottom: 1px solid #e5e5e5;
  background: #fff;
  border-radius: 10px;
  margin: 0 0 24px 0;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
`;

const OrderDetails = styled.div`
  flex: 2;
  font-size: 1rem;
  color: #222;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const OrderItems = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 6px;
`;

const ProductImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #eee;
  background: #fafafa;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const OrderActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

const Button = styled.button`
  background: #1890ff;
  color: #fff;
  padding: 8px 18px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  &:hover {
    background: #0056b3;
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Load confirmed orders from localStorage, sort by most recent first
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('confirmedOrders') || '[]');
    // Sort by descending order id (timestamp based)
    stored.sort((a, b) => b.id.localeCompare(a.id));
    setOrders(stored);
  }, []);

  // Cancel order handler
  const handleCancel = (orderId) => {
    const updated = orders.map(order =>
      order.id === orderId ? { ...order, status: 'Cancelled' } : order
    );
    setOrders(updated);
    localStorage.setItem('confirmedOrders', JSON.stringify(updated));
  };

  // Return order handler
  const handleReturn = (orderId) => {
    const updated = orders.map(order =>
      order.id === orderId ? { ...order, status: 'Return Initiated' } : order
    );
    setOrders(updated);
    localStorage.setItem('confirmedOrders', JSON.stringify(updated));
  };

  // Track order handler (for demo, just alert status)
  const handleTrack = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      alert(`Order Status: ${order.status}`);
    }
  };

  return (
    <OrdersContainer>
      {orders.length === 0 ? (
        <div style={{textAlign:'center', color:'#888', fontSize:'1.1rem', padding:'40px 0'}}>No confirmed orders yet.</div>
      ) : (
        orders.map(order => (
          <Order key={order.id}>
            <OrderDetails>
              <div style={{fontWeight:600, fontSize:'1.08rem', marginBottom:2}}>Order ID: <span style={{fontWeight:400}}>{order.id}</span></div>
              <div>Status: <span style={{color: order.status === 'Confirmed' ? '#1890ff' : order.status === 'Cancelled' ? '#e74c3c' : '#f39c12', fontWeight:500}}>{order.status}</span></div>
              <div>Amount: <b>₹{order.amount}</b></div>
              <div>Method: {order.method}</div>
              <div>Time: {order.time}</div>
              <OrderItems>
                {order.items && order.items.map((item, idx) => {
                  // Try to get image from item.image, fallback to known asset, else placeholder
                  let imgSrc = item.image || '';
                  if (!imgSrc) {
                    // Improved matching for product images
                    const name = (item.name || '').toLowerCase();
                    try {
                      if (name.includes('honey roasted cashew') || name.includes('flavored cashew') || name.includes('cashew')) imgSrc = require('./assets/cashew-hero.jpg');
                      else if (name.includes('almond')) imgSrc = require('./assets/almond.jpg');
                      else if (name.includes('pista')) imgSrc = require('./assets/pista.jpg');
                      else if (name.includes('date')) imgSrc = require('./assets/date.jpg');
                      else if (name.includes('fig')) imgSrc = require('./assets/driedfigs.jpg');
                      else if (name.includes('hamper')) imgSrc = require('./assets/dry-fruits-hamper.jpg');
                      else if (name.includes('honey')) imgSrc = require('./assets/Honey-Roasted-Cashews.jpg');
                      else if (name.includes('resin')) imgSrc = require('./assets/resins.jpg');
                      else if (name.includes('walnut')) imgSrc = require('./assets/walnaut.jpg');
                      else if (name.includes('chickpea')) imgSrc = require('./assets/RoastedChickpeas.jpg');
                      else if (name.includes('trailmix')) imgSrc = require('./assets/trailmixrecipe.jpg');
                      else if (name.includes('granola')) imgSrc = require('./assets/Granola-Bars.jpg');
                      else imgSrc = placeholderImg;
                    } catch (e) {
                      imgSrc = placeholderImg;
                    }
                  }
                  return (
                    <div key={idx} style={{display:'flex',alignItems:'center',gap:10,minWidth:180}}>
                      <ProductImg src={imgSrc} alt={item.name} onError={e => {e.target.onerror=null; e.target.src=placeholderImg}} />
                      <ItemInfo>
                        <div style={{fontWeight:500}}>{item.name}</div>
                        <div style={{color:'#666',fontSize:'0.97rem'}}>Qty: {item.amount}</div>
                      </ItemInfo>
                    </div>
                  );
                })}
              </OrderItems>
            </OrderDetails>
            <OrderActions>
              <Button onClick={() => handleTrack(order.id)}>Track</Button>
              <Button onClick={() => handleReturn(order.id)} disabled={order.status !== 'Confirmed'}>Return</Button>
              <Button onClick={() => handleCancel(order.id)} disabled={order.status !== 'Confirmed'}>Cancel</Button>
            </OrderActions>
          </Order>
        ))
      )}
    </OrdersContainer>
  );
};

export default Orders;

