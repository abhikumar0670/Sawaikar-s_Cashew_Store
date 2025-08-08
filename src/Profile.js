import React from 'react';
import { Link } from 'react-router-dom';
import PaymentHistory from './components/PaymentHistory';

const Profile = () => {
  return (
    <div style={{maxWidth: 700, margin: '40px auto', background: '#fff', borderRadius: 10, boxShadow: '0 0 16px #eee', padding: 24}}>
      <PaymentHistory />
    </div>
  );
};

export default Profile;
