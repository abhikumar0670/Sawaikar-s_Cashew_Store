import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from "qrcode.react";
import styled from "styled-components";
import { useCartContext } from "./context/cart_context";
import { useWishlistContext } from "./context/wishlist_context";
import { useAuth } from "./context/auth_context";
import FormatPrice from "./Helpers/FormatPrice";
import emailjs from '@emailjs/browser';

const Payment = () => {
  // Get current user's email from auth context
  const { currentUser } = useAuth();
  
  // Initialize EmailJS when component mounts
  React.useEffect(() => {
    emailjs.init("jIwmmDeHMU2_ZX82u"); // This is the public key
  }, []);

  // Helper to remove checked out items from wishlist
  const removeCheckedOutFromWishlist = (cartItems) => {
    if (Array.isArray(cartItems)) {
      cartItems.forEach(item => {
        const baseId = typeof item.id === 'string' ? item.id.replace(/#.+$/, '') : item.id;
        removeFromWishlist(baseId);
      });
    }
  };
  const { removeFromWishlist } = useWishlistContext();
  // --- Handler functions restored below ---

  // Initialize EmailJS
  React.useEffect(() => {
    emailjs.init("YOUR_USER_ID"); // Replace with your actual EmailJS User ID
  }, []);

  // Helper to save confirmed order to localStorage and send confirmation email
  const saveConfirmedOrder = async (order) => {
    const prev = JSON.parse(localStorage.getItem('confirmedOrders') || '[]');
    localStorage.setItem('confirmedOrders', JSON.stringify([order, ...prev]));
    // Also save transaction to allTransactions for PaymentHistory
    const txns = JSON.parse(localStorage.getItem('allTransactions') || '[]');
    let txn = {
      amount: order.amount,
      method: order.method,
      date: order.time,
      status: order.status,
      upiId: order.upiId || '',
      txnId: order.txnId || '',
      bank: order.bank || '',
      type: order.method,
      items: order.items || []
    };
    localStorage.setItem('allTransactions', JSON.stringify([txn, ...txns]));

    // Send confirmation email if order status is Confirmed
    if (order.status === 'Confirmed') {
      try {
        const email = currentUser?.email;

        if (email) {
          // Format orders for the template exactly matching the image template
          const formattedOrders = order.items.map((item, index) => ({
            index: index + 1,
            name: item.name,
            price: item.price,
            image: item.image,
            units: item.amount
          }));

          // Calculate costs
          const shipping = order.method === 'cod' ? 40 : 0; // COD fee if applicable
          const tax = Math.round(order.amount * 0.05); // 5% tax

          // Prepare template parameters exactly matching your template format
          const templateParams = {
            to_email: email,
            order_id: order.id,
            orders: formattedOrders,
            cost: {
              shipping: shipping,
              tax: tax,
              total: order.amount
            },
            email: email, // The email was sent to {email}
            order_status: "Your Order is Confirm", // Status message
            tracking_message: "We'll send you tracking information when the order ships."
          };

          // Send email using EmailJS with your template
          await emailjs.send(
            'service_m3asiux',  // Your service ID
            'template_19laftp',  // Your template ID
            templateParams
          );
          console.log('Order confirmation email sent successfully to:', email);
        }
      } catch (error) {
        console.error('Failed to send order confirmation email:', error);
      }
    }
  };

  // UPI QR for manual UPI ID
  const handleShowQR = () => {
    setPaymentError('');
    if (!upiId || !/^[\w.-]+@[\w.-]+$/.test(upiId)) {
      setPaymentError('Please enter a valid UPI ID.');
      setShowQR(false);
      return;
    }
    setShowQR(true);
    setPaymentSuccess(false);
    setShowPinModal(false);
    setPin('');
  };

  // UPI PIN simulation for manual UPI ID
  const handlePayNow = () => {
    setPaymentError('');
    if (pin.length !== 6) {
      setPaymentError('Please enter a valid 6-digit UPI PIN.');
      return;
    }
    setTimeout(() => {
      setPaymentSuccess(true);
      setShowPinModal(false);
      setShowQR(false);
      setUpiTransactions(prev => [
        {
          upiId,
          amount: finalAmount,
          date: new Date().toLocaleString(),
          status: 'Success',
        },
        ...prev
      ]);
      setPin('');
      // Save order to localStorage
      const confirmedOrder = {
        id: 'ORD' + Date.now(),
        items: cart,
        amount: finalAmount,
        method: 'UPI',
        upiId,
        time: new Date().toLocaleString(),
        status: 'Confirmed',
      };
      saveConfirmedOrder(confirmedOrder);
      alert('Your order is confirmed! Thank you for shopping with us.');
      // Save cart items before clearing cart
      const cartItemsToRemove = Array.isArray(cart) ? [...cart] : [];
      if (typeof clearCart === 'function') clearCart();
      removeCheckedOutFromWishlist(cartItemsToRemove);
      resetOrderTotals();
    }, 1200);
  };

  // Card Payment Handlers
  function generateTxnId() {
    return '#' + Math.floor(100000000 + Math.random() * 900000000);
  }

  const handleCardPayNow = () => {
    setOtpError('');
    setCardPaymentStatus('');
    // Basic validation
    if (!/^\d{16}$/.test(cardDetails.number.replace(/\s/g, '')))
      return setOtpError('Please enter a valid 16-digit card number.');
    if (!cardDetails.name.trim())
      return setOtpError('Please enter the cardholder name.');
    if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry))
      return setOtpError('Please enter expiry in MM/YY format.');
    if (!/^\d{3}$/.test(cardDetails.cvv))
      return setOtpError('Please enter a valid 3-digit CVV.');
    if (!cardDetails.billing.trim())
      return setOtpError('Please enter billing address.');
    // All good, show OTP modal
    setShowOtpModal(true);
    setOtp('');
    setCurrentTxnId(generateTxnId());
  };

  const getCardType = (number) => {
    const n = number.replace(/\s/g, '');
    if (/^4/.test(n)) return 'Visa';
    if (/^5[1-5]/.test(n)) return 'MasterCard';
    if (/^3[47]/.test(n)) return 'AMEX';
    if (/^6/.test(n)) return 'RuPay';
    return 'Card';
  };

  const handleOtpSubmit = () => {
    setOtpError('');
    // For simulation, OTP is always 123456
    const cardType = getCardType(cardDetails.number);
    if (otp !== '123456') {
      setOtpError('Incorrect OTP. Please try again.');
      setCardPaymentStatus('failed');
      setCardTransactions(prev => [
        {
          txnId: currentTxnId,
          amount: finalAmount,
          method: cardType,
          status: 'Failed',
          date: new Date().toLocaleString(),
        },
        ...prev
      ]);
      return;
    }
    setCardPaymentStatus('success');
    setShowOtpModal(false);
    setCardTransactions(prev => [
      {
        txnId: currentTxnId,
        amount: finalAmount,
        method: cardType,
        status: 'Success',
        date: new Date().toLocaleString(),
      },
      ...prev
    ]);
    setCardDetails({ number: '', expiry: '', cvv: '', name: '', billing: '' });
    setOtp('');
    // Save order to localStorage
    const confirmedOrder = {
      id: 'ORD' + Date.now(),
      items: cart,
      amount: finalAmount,
      method: 'Card',
      txnId: currentTxnId,
      time: new Date().toLocaleString(),
      status: 'Confirmed',
    };
    saveConfirmedOrder(confirmedOrder);
    // Save cart items before clearing cart
    const cartItemsToRemove = Array.isArray(cart) ? [...cart] : [];
    if (typeof clearCart === 'function') clearCart();
    removeCheckedOutFromWishlist(cartItemsToRemove);
    resetOrderTotals();
    // Redirect to order confirmation page with details
    const details = {
      amount: finalAmount,
      method: 'card',
      time: new Date().toLocaleString(),
      txnId: currentTxnId
    };
    setTimeout(() => {
      navigate('/order-confirmation', { state: details });
    }, 500);
  };

  const handleCardCancel = () => {
    setShowOtpModal(false);
    setCardPaymentStatus('cancelled');
    const cardType = getCardType(cardDetails.number);
    const txn = {
      txnId: currentTxnId,
      amount: finalAmount,
      method: cardType,
      status: 'Cancelled',
      date: new Date().toLocaleString(),
      items: Array.isArray(cart) ? [...cart] : []
    };
    setCardTransactions(prev => [txn, ...prev]);
    // Save to allTransactions for PaymentHistory
    const txns = JSON.parse(localStorage.getItem('allTransactions') || '[]');
    localStorage.setItem('allTransactions', JSON.stringify([txn, ...txns]));
    setOtp('');
  };

  // Main Place Order/Pay handler
  const handlePayment = () => {
    // Always use the discounted price in details.amount
    const details = {
      amount: finalAmount, // This is the actual paid amount after all discounts
      method: selectedMethod,
      time: new Date().toLocaleString(),
      // Add more details as needed, e.g. cart items if available
    };
    // Save order to localStorage for COD and Netbanking
    if (selectedMethod === 'cod' || selectedMethod === 'netbanking') {
      const confirmedOrder = {
        id: 'ORD' + Date.now(),
        items: cart,
        amount: finalAmount,
        method: selectedMethod === 'cod' ? 'COD' : 'Netbanking',
        time: new Date().toLocaleString(),
        status: 'Confirmed',
      };
      saveConfirmedOrder(confirmedOrder);
      // Save cart items before clearing cart
      const cartItemsToRemove = Array.isArray(cart) ? [...cart] : [];
      if (typeof clearCart === 'function') clearCart();
      removeCheckedOutFromWishlist(cartItemsToRemove);
    }
    if (selectedMethod === 'upi' && selectedUPI) {
      setShowQR(true);
      setPaymentSuccess(false);
    } else if (selectedMethod === 'cod') {
      setOrderDetails(details);
      if (typeof clearCart === 'function') clearCart();
      resetOrderTotals();
      waitForAlertOrTimeout('Your order is confirmed! Thank you for shopping with us.', details, 5000);
    } else {
      setOrderDetails(details);
      if (typeof clearCart === 'function') clearCart();
      resetOrderTotals();
      waitForAlertOrTimeout(`Payment of ${finalAmount} initiated via ${selectedMethod}`, details, 5000);
    }
  };
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [selectedUPI, setSelectedUPI] = useState('');
  // const [selectedBank, setSelectedBank] = useState(''); // Removed duplicate declaration
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    billing: ''
  });
  // Remove cardAmount, always use finalAmount for card payments
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [cardPaymentStatus, setCardPaymentStatus] = useState(''); // 'success', 'failed', 'cancelled', ''
  const [cardTransactions, setCardTransactions] = useState([]);
  const [currentTxnId, setCurrentTxnId] = useState('');
  const [upiId, setUpiId] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [upiTransactions, setUpiTransactions] = useState([]);
  const [upiAppError, setUpiAppError] = useState('');
  const [showAppQR, setShowAppQR] = useState(false);
  const [showAppPinModal, setShowAppPinModal] = useState(false);
  const [appPin, setAppPin] = useState('');
  const [appPaymentSuccess, setAppPaymentSuccess] = useState(false);

  const [appPinError, setAppPinError] = useState('');

  // Net Banking flow states
  const [selectedBank, setSelectedBank] = useState('');
  const [netbankingStep, setNetbankingStep] = useState(0); // 0: select, 1: login, 2: otp, 3: confirm, 4: result
  const [bankLogin, setBankLogin] = useState({ acc: '', pwd: '' });
  const [bankLoginError, setBankLoginError] = useState('');
  const [bankOtp, setBankOtp] = useState('');
  const [bankOtpError, setBankOtpError] = useState('');
  const [bankPin, setBankPin] = useState('');
  const [bankPinError, setBankPinError] = useState('');
  const [bankPaymentStatus, setBankPaymentStatus] = useState(''); // 'success' | 'failed'
  const [bankTxnId, setBankTxnId] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);

  const [localTotal, setLocalTotal] = useState(null);
  const [localShipping, setLocalShipping] = useState(null);

  function generateBankTxnId() {
    return 'NB' + Math.floor(100000 + Math.random() * 900000);
  }

  const { total_price, shipping_fee, clearCart, original_price, order_total, final_price, cart } = useCartContext();
  // Use the same value as cart's Order Total (prefer order_total or final_price if available)
  let cartOrderTotal = order_total || final_price || total_price;
  // If shipping is free, shipping_fee may be 0, but cartOrderTotal should already include all discounts and shipping logic
  const displayTotal = localTotal !== null ? localTotal : cartOrderTotal;
  const COD_FEE = 40;
  const isCOD = selectedMethod === 'cod';
  // finalAmount matches cart's Order Total + COD fee if applicable
  const finalAmount = displayTotal + (isCOD ? COD_FEE : 0);

  const resetOrderTotals = () => {
    setLocalTotal(0);
    setLocalShipping(0);
  };


  // Helper: Wait for alert OK or timeout, then redirect
  const waitForAlertOrTimeout = (message, details, timeout = 5000) => {
    return new Promise(resolve => {
      let redirected = false;
      const timer = setTimeout(() => {
        if (!redirected) {
          redirected = true;
          resolve();
        }
      }, timeout);
      // Show alert, then resolve
      setTimeout(() => {
        alert(message);
        if (!redirected) {
          redirected = true;
          clearTimeout(timer);
          resolve();
        }
      }, 100);
    }).then(() => {
      navigate('/order-confirmation', { state: details });
    });
  };

  // ...existing code...
  // All handler functions and logic above
  return (
    <PaymentWrapper>
      <div className="payment-container">
        <div className="payment-header">
          <h2>Choose a payment method</h2>
          <div className="amount-display">
            <span>
              {original_price && original_price > displayTotal ? (
                <>
                  <span style={{textDecoration:'line-through', color:'#888', marginRight:8}}>
                    <FormatPrice price={original_price} />
                  </span>
                  <span style={{color:'#28a745', fontWeight:600}}>
                    <FormatPrice price={displayTotal} />
                  </span>
                </>
              ) : (
                <span>Order Total: <FormatPrice price={displayTotal} /></span>
              )}
            </span>
            {isCOD && (
              <span style={{color:'#e74c3c', marginLeft:8}}>
                + ₹{COD_FEE} COD Fee = <b>₹{finalAmount}</b>
              </span>
            )}
          </div>
        </div>

        <div className="payment-methods">
          {/* UPI Section */}
          <div className={`payment-section ${selectedMethod === 'upi' ? 'active' : ''}`}>
            <div className="section-header" onClick={() => setSelectedMethod('upi')}>
              <input 
                type="radio" 
                id="upi" 
                name="payment-method" 
                checked={selectedMethod === 'upi'}
                onChange={() => setSelectedMethod('upi')}
              />
              <label htmlFor="upi">UPI</label>
              <span className="recommended">Recommended</span>
            </div>
            {selectedMethod === 'upi' && (
              <div className="section-content">
                <div className="upi-options">
                  <div className="upi-apps-row">
                    <h4>Pay using UPI Apps</h4>
                    <div className="upi-apps-flex">
                      <div className="app-list">
                        <div className={`app-option ${selectedUPI === 'gpay' ? 'selected' : ''}`} 
                             onClick={() => { setSelectedUPI('gpay'); setShowQR(false); setPaymentSuccess(false); }}>
                          <img src="https://developers.google.com/pay/api/images/brand-guidelines/google-pay-mark.png" alt="Google Pay" className="app-logo" />
                          <span>Google Pay</span>
                        </div>
                        <div className={`app-option ${selectedUPI === 'phonepe' ? 'selected' : ''}`} 
                             onClick={() => { setSelectedUPI('phonepe'); setShowQR(false); setPaymentSuccess(false); }}>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/2560px-PhonePe_Logo.svg.png" alt="PhonePe" className="app-logo" />
                          <span>PhonePe</span>
                        </div>
                        <div className={`app-option ${selectedUPI === 'paytm' ? 'selected' : ''}`} 
                             onClick={() => { setSelectedUPI('paytm'); setShowQR(false); setPaymentSuccess(false); }}>
                          <img src="https://logos-world.net/wp-content/uploads/2020/11/Paytm-Logo.png" alt="Paytm" className="app-logo" />
                          <span>Paytm</span>
                        </div>
                        <div className={`app-option ${selectedUPI === 'bhim' ? 'selected' : ''}`} 
                             onClick={() => { setSelectedUPI('bhim'); setShowQR(false); setPaymentSuccess(false); }}>
                          <img src="https://www.ux4g.gov.in/assets/img/uxdt-logo/BHIM_Preview.png" alt="BHIM" className="app-logo" />
                          <span>BHIM</span>
                        </div>
                      </div>
                      <div className="show-qr-col">
                        <button
                          className="show-qr-btn always-blue"
                          onClick={() => {
                            setUpiAppError('');
                            if (!selectedUPI) {
                              setUpiAppError('Select the UPI app first.');
                              setShowAppQR(false);
                              setAppPaymentSuccess(false);
                              return;
                            }
                            setShowAppQR(true);
                            setAppPaymentSuccess(false);
                            setShowAppPinModal(false);
                            setAppPin('');
                          }}
                        >
                          Show QR
                        </button>
                        {upiAppError && <div className="upi-error">{upiAppError}</div>}
                        <div className="qr-or-success-area">
                          {selectedUPI && showAppQR && !appPaymentSuccess && (
                            <div className="qr-section">
                              <div className="qr-content">
                                <h4>Scan to Pay</h4>
                                <QRCodeCanvas value={`upi://pay?pa=merchant@upi&am=${finalAmount}&cu=INR&app=${selectedUPI}`} size={180} />
                                <p>Pay ₹{finalAmount} via {selectedUPI === 'gpay' ? 'Google Pay' : selectedUPI.charAt(0).toUpperCase() + selectedUPI.slice(1)}</p>
                                <button className="simulate-btn" onClick={() => setShowAppPinModal(true)}>Simulate Payment</button>
                              </div>
                            </div>
                          )}
                          {showAppPinModal && (
                            <div className="upi-pin-modal">
                              <div className="upi-pin-content">
                                {appPinError && <div className="upi-error" style={{marginBottom: 8}}>{appPinError}</div>}
                                <h4>Enter UPI PIN</h4>
                                <input
                                  type="password"
                                  maxLength={6}
                                  value={appPin}
                                  onChange={e => { setAppPin(e.target.value.replace(/\D/g, '')); setAppPinError(''); }}
                                  className="upi-pin-input"
                                  autoFocus
                                />
                                <button className="pay-now-btn" onClick={() => {
                                  if (appPin.length !== 6) {
                                    setAppPinError('Please enter a valid 6-digit UPI PIN.');
                                    setUpiTransactions(prev => [
                                      {
                                        upiId: selectedUPI,
                                        amount: finalAmount,
                                        date: new Date().toLocaleString(),
                                        status: 'Failed',
                                        type: 'App',
                                      },
                                      ...prev
                                    ]);
                                    return;
                                  }
                                  setTimeout(() => {
                                    setAppPaymentSuccess(true);
                                    setShowAppPinModal(false);
                                    setShowAppQR(false);
                                    setAppPin('');
                                    setUpiTransactions(prev => [
                                      {
                                        upiId: selectedUPI,
                                        amount: finalAmount,
                                        date: new Date().toLocaleString(),
                                        status: 'Success',
                                        type: 'App',
                                      },
                                      ...prev
                                    ]);
                                    // Save order to localStorage
                                    const confirmedOrder = {
                                      id: 'ORD' + Date.now(),
                                      items: cart,
                                      amount: finalAmount,
                                      method: 'UPI',
                                      upiId: selectedUPI,
                                      time: new Date().toLocaleString(),
                                      status: 'Confirmed',
                                    };
                                    saveConfirmedOrder(confirmedOrder);
                                    // Save cart items before clearing cart
                                    const cartItemsToRemove = Array.isArray(cart) ? [...cart] : [];
                                    if (typeof clearCart === 'function') clearCart();
                                    removeCheckedOutFromWishlist(cartItemsToRemove);
                                    resetOrderTotals();
                                    // Redirect to order confirmation page
                                    const details = {
                                      amount: finalAmount,
                                      method: 'upi',
                                      time: new Date().toLocaleString(),
                                      upiId: selectedUPI
                                    };
                                    setTimeout(() => {
                                      navigate('/order-confirmation', { state: details });
                                    }, 800);
                                    alert('Your order is confirmed! Thank you for shopping with us.');
                                    if (typeof clearCart === 'function') clearCart();
                                    resetOrderTotals();
                                  }, 1200);
                                }}>Pay Now</button>
                                <button className="cancel-btn" onClick={() => {
                                  setShowAppPinModal(false);
                                  setShowAppQR(false);
                                  setAppPin('');
                                  setAppPinError('');
                                  const txn = {
                                    upiId: selectedUPI,
                                    amount: finalAmount,
                                    date: new Date().toLocaleString(),
                                    status: 'Cancelled',
                                    type: 'App',
                                    items: Array.isArray(cart) ? [...cart] : []
                                  };
                                  setUpiTransactions(prev => [txn, ...prev]);
                                  // Save to allTransactions for PaymentHistory
                                  const txns = JSON.parse(localStorage.getItem('allTransactions') || '[]');
                                  localStorage.setItem('allTransactions', JSON.stringify([txn, ...txns]));
                                }}>Cancel</button>
                              </div>
                            </div>
                          )}
                          {selectedUPI && appPaymentSuccess && (
                            <div className="upi-payment-success">
                              <h4>Payment Successful!</h4>
                              <p>Your payment of ₹{finalAmount} via {selectedUPI === 'gpay' ? 'Google Pay' : selectedUPI.charAt(0).toUpperCase() + selectedUPI.slice(1)} has been simulated.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="upi-id-row">
                    <input
                      type="text"
                      placeholder="ENTER UPI ID (E.G. NAME@BANK)"
                      value={upiId}
                      onChange={e => { setUpiId(e.target.value); setPaymentError(''); }}
                      className="upi-id-input"
                    />
                    <input
                      type="number"
                      placeholder="AMOUNT (₹)"
                      value={finalAmount}
                      min={1}
                      className="amount-input"
                      readOnly
                    />
                    <button
                      className="show-qr-btn-inline"
                      onClick={handleShowQR}
                      disabled={!upiId}
                    >
                      Show QR
                    </button>
                  </div>
                  {paymentError && <div className="upi-error">{paymentError}</div>}
                  {showQR && !paymentSuccess && (
                    <div className="upi-qr-area">
                      <div className="upi-qr-content">
                        <h4>Scan to Pay</h4>
                        <QRCodeCanvas value={`upi://pay?pa=${upiId}&am=${finalAmount}&cu=INR`} size={180} />
                        <p>Pay ₹{finalAmount} to <b>{upiId}</b></p>
                        <button className="simulate-btn" onClick={() => setShowPinModal(true)}>Simulate Payment</button>
                      </div>
                    </div>
                  )}
                  {showPinModal && (
                    <div className="upi-pin-modal">
                      <div className="upi-pin-content">
                        {paymentError && <div className="upi-error" style={{marginBottom: 8}}>{paymentError}</div>}
                        <h4>Enter UPI PIN</h4>
                        <input
                          type="password"
                          maxLength={6}
                          value={pin}
                          onChange={e => { setPin(e.target.value.replace(/\D/g, '')); setPaymentError(''); }}
                          className="upi-pin-input"
                          autoFocus
                        />
                        <button className="pay-now-btn" onClick={() => {
                          if (pin.length !== 6) {
                            setPaymentError('Please enter a valid 6-digit UPI PIN.');
                            const txn = {
                              upiId,
                              amount: finalAmount,
                              date: new Date().toLocaleString(),
                              status: 'Failed',
                              type: 'UPI ID',
                              items: Array.isArray(cart) ? [...cart] : []
                            };
                            setUpiTransactions(prev => [txn, ...prev]);
                            // Save to allTransactions for PaymentHistory
                            const txns = JSON.parse(localStorage.getItem('allTransactions') || '[]');
                            localStorage.setItem('allTransactions', JSON.stringify([txn, ...txns]));
                            return;
                          }
                          setTimeout(() => {
                            setPaymentSuccess(true);
                            setShowPinModal(false);
                            setShowQR(false);
                            setUpiTransactions(prev => [
                              {
                                upiId,
                                amount: finalAmount,
                                date: new Date().toLocaleString(),
                                status: 'Success',
                                type: 'UPI ID',
                              },
                              ...prev
                            ]);
                            setPin('');
                            // Save order to localStorage
                            const confirmedOrder = {
                              id: 'ORD' + Date.now(),
                              items: cart,
                              amount: finalAmount,
                              method: 'UPI',
                              upiId,
                              time: new Date().toLocaleString(),
                              status: 'Confirmed',
                            };
                            saveConfirmedOrder(confirmedOrder);
                            // Save cart items before clearing cart
                            const cartItemsToRemove = Array.isArray(cart) ? [...cart] : [];
                            if (typeof clearCart === 'function') clearCart();
                            removeCheckedOutFromWishlist(cartItemsToRemove);
                            resetOrderTotals();
                            // Redirect to order confirmation page
                            const details = {
                              amount: finalAmount,
                              method: 'upi',
                              time: new Date().toLocaleString(),
                              upiId
                            };
                            setTimeout(() => {
                              navigate('/order-confirmation', { state: details });
                            }, 800);
                          }, 1200);
                        }}>Pay Now</button>
                        <button className="cancel-btn" onClick={() => {
                          setShowPinModal(false);
                          setShowQR(false);
                          setPin('');
                          setPaymentError('');
                          setUpiTransactions(prev => [
                            {
                              upiId,
                              amount: finalAmount,
                              date: new Date().toLocaleString(),
                              status: 'Cancelled',
                              type: 'UPI ID',
                            },
                            ...prev
                          ]);
                        }}>Cancel</button>
                      </div>
                    </div>
                  )}
                  {paymentSuccess && (
                    <div className="upi-payment-success">
                      <h4>Payment Successful!</h4>
                      <p>Your payment of ₹{finalAmount} to <b>{upiId}</b> has been simulated.</p>
                    </div>
                  )}
                  {upiTransactions.length > 0 && (
                    <div className="upi-history">
                      <h5>Transaction History</h5>
                      <table>
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>UPI/App</th>
                            <th>Amount</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {upiTransactions.map((txn, idx) => (
                            <tr key={idx}>
                              <td>{txn.type === 'App' ? 'App' : 'UPI ID'}</td>
                              <td>{txn.type === 'App' ? (txn.upiId.charAt(0).toUpperCase() + txn.upiId.slice(1)) : txn.upiId}</td>
                              <td>₹{txn.amount}</td>
                              <td>{txn.date}</td>
                              <td style={{color: txn.status === 'Success' ? '#28a745' : txn.status === 'Cancelled' ? '#888' : '#e74c3c'}}>{txn.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Credit/Debit Card Section */}
          <div className={`payment-section ${selectedMethod === 'card' ? 'active' : ''}`}>
            <div className="section-header" onClick={() => setSelectedMethod('card')}>
              <input 
                type="radio" 
                id="card" 
                name="payment-method" 
                checked={selectedMethod === 'card'}
                onChange={() => setSelectedMethod('card')}
              />
              <label htmlFor="card">Credit or Debit Card</label>
              <div className="card-logos">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="card-logo" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="card-logo" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg" alt="RuPay" className="card-logo" />
              </div>
            </div>
            {selectedMethod === 'card' && (
              <div className="section-content">
                <div className="card-form">
                  <div className="form-row">
                    <input 
                      type="text" 
                      placeholder="Card Number (16 digits)" 
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim()})}
                      maxLength="19"
                    />
                  </div>
                  <div className="form-row">
                    <input 
                      type="text" 
                      placeholder="Name on Card" 
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    />
                  </div>
                  <div className="form-row split">
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value.replace(/[^\d\/]/g, '').slice(0,5)})}
                      maxLength="5"
                    />
                    <input 
                      type="text" 
                      placeholder="CVV" 
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0,3)})}
                      maxLength="3"
                    />
                  </div>
                  <div className="form-row">
                    <input 
                      type="text" 
                      placeholder="Billing Address" 
                      value={cardDetails.billing}
                      onChange={(e) => setCardDetails({...cardDetails, billing: e.target.value})}
                    />
                  </div>
                <div className="form-row">
                  <input
                    type="number"
                    placeholder="Amount (₹)"
                    value={finalAmount}
                    readOnly
                    min={1}
                  />
                </div>
                  {otpError && <div className="upi-error">{otpError}</div>}
                  <button className="pay-now-btn" style={{marginTop: 10}} onClick={handleCardPayNow}>Pay Now</button>
                </div>
                {showOtpModal && (
                  <div className="upi-pin-modal">
                    <div className="upi-pin-content">
                      {otpError && <div className="upi-error" style={{marginBottom: 8}}>{otpError}</div>}
                      <h4>Enter OTP</h4>
                      <p style={{fontSize: '15px', color: '#555'}}>An OTP has been sent to your registered mobile number. Please enter the OTP to proceed.</p>
                      <input
                        type="password"
                        maxLength={6}
                        value={otp}
                        onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); setOtpError(''); }}
                        className="upi-pin-input"
                        autoFocus
                      />
                      <button className="pay-now-btn" onClick={handleOtpSubmit}>Submit OTP</button>
                      <button className="cancel-btn" onClick={handleCardCancel}>Cancel</button>
                    </div>
                  </div>
                )}
                {cardPaymentStatus === 'success' && (
                  <div className="upi-payment-success">
                    <h4>Payment Successful!</h4>
                    <p>Your payment of ₹{finalAmount} was successful.<br/>Transaction ID: <b>{currentTxnId}</b></p>
                  </div>
                )}
                {cardPaymentStatus === 'failed' && (
                  <div className="upi-error" style={{marginTop: 10}}>
                    Payment Failed. Incorrect OTP or other payment issues.
                  </div>
                )}
                {cardPaymentStatus === 'cancelled' && (
                  <div className="upi-error" style={{marginTop: 10}}>
                    Transaction Cancelled by User.
                  </div>
                )}
                {cardTransactions.length > 0 && (
                  <div className="upi-history" style={{marginTop: 18}}>
                    <h5>Card Transaction History</h5>
                    <table>
                      <thead>
                        <tr>
                          <th>Transaction ID</th>
                          <th>Amount</th>
                          <th>Payment Method</th>
                          <th>Status</th>
                          <th>Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cardTransactions.map((txn, idx) => (
                          <tr key={idx}>
                            <td>{txn.txnId}</td>
                            <td>₹{txn.amount}</td>
                            <td>{txn.method}</td>
                            <td style={{color: txn.status === 'Success' ? '#28a745' : txn.status === 'Cancelled' ? '#888' : '#e74c3c'}}>{txn.status}</td>
                            <td>{txn.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>


          {/* Net Banking Section */}
          <div className={`payment-section ${selectedMethod === 'netbanking' ? 'active' : ''}`}>
            <div className="section-header" onClick={() => { setSelectedMethod('netbanking'); setNetbankingStep(0); setBankPaymentStatus(''); setShowReceipt(false); }}>
              <input 
                type="radio" 
                id="netbanking" 
                name="payment-method" 
                checked={selectedMethod === 'netbanking'}
                onChange={() => { setSelectedMethod('netbanking'); setNetbankingStep(0); setBankPaymentStatus(''); setShowReceipt(false); }}
              />
              <label htmlFor="netbanking">Net Banking</label>
            </div>
            {selectedMethod === 'netbanking' && (
              <div className="section-content">
                {/* Step 0: Select Bank */}
                {netbankingStep === 0 && (
                  <div className="bank-selection">
                    <h4>Choose your bank</h4>
                    <div className="popular-banks">
                      <div className="bank-grid">
                        {['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB'].map(bank => (
                          <div key={bank} 
                               className={`bank-option ${selectedBank === bank ? 'selected' : ''}`}
                               onClick={() => setSelectedBank(bank)}>
                            <div className="bank-logo">{bank}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <select className="bank-dropdown" value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
                      <option value="">Select your bank</option>
                      <option value="SBI">State Bank of India</option>
                      <option value="HDFC">HDFC Bank</option>
                      <option value="ICICI">ICICI Bank</option>
                      <option value="Axis">Axis Bank</option>
                      <option value="Kotak">Kotak Mahindra Bank</option>
                      <option value="PNB">Punjab National Bank</option>
                      <option value="Canara">Canara Bank</option>
                      <option value="BOB">Bank of Baroda</option>
                    </select>
                    <button className="pay-now-btn" style={{marginTop: 16}} disabled={!selectedBank} onClick={() => setNetbankingStep(1)}>
                      Continue
                    </button>
                  </div>
                )}
                {/* Step 1: Bank Login */}
                {netbankingStep === 1 && (
                  <div className="bank-login-form">
                    <h4>{selectedBank} Net Banking Login</h4>
                    <input
                      type="text"
                      placeholder="Account Number"
                      value={bankLogin.acc}
                      onChange={e => { setBankLogin({ ...bankLogin, acc: e.target.value.replace(/\D/g, '').slice(0,12) }); setBankLoginError(''); }}
                      maxLength={12}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={bankLogin.pwd}
                      onChange={e => { setBankLogin({ ...bankLogin, pwd: e.target.value }); setBankLoginError(''); }}
                    />
                    {bankLoginError && <div className="upi-error">{bankLoginError}</div>}
                    <button className="pay-now-btn" onClick={() => {
                      if (!bankLogin.acc || bankLogin.acc.length < 8 || !bankLogin.pwd) {
                        setBankLoginError('Enter valid account number and password.');
                        return;
                      }
                      setNetbankingStep(2);
                    }}>Login</button>
                    <button className="cancel-btn" onClick={() => setNetbankingStep(0)}>Back</button>
                  </div>
                )}
                {/* Step 2: OTP Verification */}
                {netbankingStep === 2 && (
                  <div className="bank-otp-form">
                    <h4>OTP Verification</h4>
                    <p style={{fontSize: '15px', color: '#555'}}>An OTP has been sent to your registered mobile number.</p>
                    <input
                      type="password"
                      placeholder="Enter OTP"
                      value={bankOtp}
                      maxLength={6}
                      onChange={e => { setBankOtp(e.target.value.replace(/\D/g, '')); setBankOtpError(''); }}
                      className="upi-pin-input"
                      autoFocus
                    />
                    {bankOtpError && <div className="upi-error">{bankOtpError}</div>}
                    <button className="pay-now-btn" onClick={() => {
                      if (bankOtp.length !== 6) {
                        setBankOtpError('Please enter a valid 6-digit OTP.');
                        return;
                      }
                      setNetbankingStep(3);
                    }}>Verify OTP</button>
                    <button className="cancel-btn" onClick={() => setNetbankingStep(1)}>Back</button>
                  </div>
                )}
                {/* Step 3: Confirm Payment */}
                {netbankingStep === 3 && (
                  <div className="bank-confirm-form">
                    <h4>Confirm Payment</h4>
                    <div className="order-summary">
                      <p><b>Bank:</b> {selectedBank}</p>
                      <p><b>Account:</b> ****{bankLogin.acc.slice(-4)}</p>
                      <p><b>Amount:</b> ₹{finalAmount}</p>
                    </div>
                    <button className="pay-now-btn" onClick={() => setNetbankingStep(4)}>Confirm Payment</button>
                    <button className="cancel-btn" onClick={() => setNetbankingStep(2)}>Back</button>
                  </div>
                )}
                {/* Step 4: Payment Authorization (PIN/OTP) */}
                {netbankingStep === 4 && !bankPaymentStatus && (
                  <div className="bank-pin-form">
                    <h4>Payment Authorization</h4>
                    <input
                      type="password"
                      placeholder="Enter Transaction PIN or OTP"
                      value={bankPin}
                      maxLength={6}
                      onChange={e => { setBankPin(e.target.value.replace(/\D/g, '')); setBankPinError(''); }}
                      className="upi-pin-input"
                      autoFocus
                    />
                    {bankPinError && <div className="upi-error">{bankPinError}</div>}
                    <button className="pay-now-btn" onClick={() => {
                      if (bankPin.length !== 6) {
                        setBankPinError('Please enter a valid 6-digit PIN/OTP.');
                        setBankPaymentStatus('failed');
                        setBankTxnId(generateBankTxnId());
                        return;
                      }
                      setTimeout(() => {
                        setBankPaymentStatus('success');
                        setBankTxnId(generateBankTxnId());
                        // Save cart items before clearing cart
                        const cartItemsToRemove = Array.isArray(cart) ? [...cart] : [];
                        if (typeof clearCart === 'function') clearCart();
                        removeCheckedOutFromWishlist(cartItemsToRemove);
                        resetOrderTotals();
                        const details = {
                          amount: finalAmount,
                          method: 'netbanking',
                          time: new Date().toLocaleString(),
                          bank: selectedBank,
                          txnId: bankTxnId
                        };
                        setTimeout(() => {
                          navigate('/order-confirmation', { state: details });
                        }, 800);
                      }, 1200);
                    }}>Authorize Payment</button>
                    <button className="cancel-btn" onClick={() => setNetbankingStep(3)}>Back</button>
                  </div>
                )}
                {/* Step 4: Payment Result */}
                {netbankingStep === 4 && bankPaymentStatus && (
                  <div className="bank-payment-result">
                    {bankPaymentStatus === 'success' ? (
                      <>
                        <h4>Payment Successful!</h4>
                        <p>Your payment of ₹{finalAmount} via {selectedBank} Net Banking was successful.</p>
                        <p>Transaction ID: <b>{bankTxnId}</b></p>
                        <button className="pay-now-btn" onClick={() => setShowReceipt(true)}>Download Receipt</button>
                        {showReceipt && (
                          <div style={{marginTop: 12}}>
                            <a
                              href={`data:text/plain,Order%20Receipt%0A%0ATransaction%20ID:%20${bankTxnId}%0ABank:%20${selectedBank}%0AAccount:%20****${bankLogin.acc.slice(-4)}%0AAmount:%20%E2%82%B9${finalAmount}%0ADate:%20${new Date().toLocaleString()}%0AStatus:%20Success`}
                              download={`Receipt_${bankTxnId}.txt`}
                              className="pay-now-btn"
                            >
                              Click to Download
                            </a>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <h4 style={{color:'#e74c3c'}}>Payment Failed</h4>
                        <p>There was an error processing your payment. Please check your details and try again.</p>
                        <p>Transaction ID: <b>{bankTxnId}</b></p>
                        <button className="pay-now-btn" onClick={() => { setNetbankingStep(0); setBankPaymentStatus(''); setBankPin(''); setBankOtp(''); setBankLogin({acc:'',pwd:''}); setSelectedBank(''); setShowReceipt(false); }}>Try Again</button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cash on Delivery Section */}
          <div className={`payment-section ${selectedMethod === 'cod' ? 'active' : ''}`}>
            <div className="section-header" onClick={() => setSelectedMethod('cod')}>
              <input 
                type="radio" 
                id="cod" 
                name="payment-method" 
                checked={selectedMethod === 'cod'}
                onChange={() => setSelectedMethod('cod')}
              />
              <label htmlFor="cod">Cash on Delivery</label>
              <span className="cod-fee">+ ₹40 handling fee</span>
            </div>
            {selectedMethod === 'cod' && (
              <div className="section-content">
                <div className="cod-info">
                  <p>💵 Pay with cash when your order is delivered</p>
                  <p>📱 You can also pay using UPI or cards at the time of delivery</p>
                  <p>⚠️ A handling fee of ₹{COD_FEE} will be added to your order total</p>
                  <p style={{marginTop:8}}><b>Total Payable: ₹{finalAmount}</b></p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="payment-footer">
          <button className="place-order-btn" onClick={handlePayment}>
            {selectedMethod === 'upi' && selectedUPI
              ? 'Pay & Show QR'
              : `Place your order${isCOD || finalAmount > 0 ? ` (₹${finalAmount})` : ''}`}
          </button>
          <p className="terms">By placing your order, you agree to our terms and conditions</p>
        </div>
      </div>
    </PaymentWrapper>
  );
}

const PaymentWrapper = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 50px auto;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  .payment-container {
    padding: 20px;
  }

  .payment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      font-size: 24px;
      color: #333;
    }

    .amount-display {
      background: #f5f5f5;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 18px;
      color: #333;
    }
  }

  .payment-methods {
    border-top: 1px solid #eee;
    margin-top: 20px;

    .payment-section {
      padding: 20px 0;
      border-bottom: 1px solid #eee;

      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;

        input {
          margin-right: 10px;
        }

        label {
          flex-grow: 1;
          font-weight: bold;
          font-size: 18px;
        }

        .recommended {
          background: #007bff;
          color: #fff;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 12px;
        }

        .card-logos {
          display: flex;
          gap: 3px;
          align-items: center;
          
          .card-logo {
            height: 16px;
            width: auto;
            max-width: 28px;
            object-fit: contain;
            border-radius: 2px;
            padding: 1px;
            background: white;
            border: 1px solid #ddd;
          }
        }

        .cod-fee {
          color: #e74c3c;
          font-size: 12px;
        }
      }

      .section-content {
        margin-top: 15px;

        .upi-options, .card-form, .bank-selection {
          padding-left: 25px;
        }

        .upi-apps-row {
          margin-bottom: 10px;
        }
        .upi-apps-flex {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 40px;
        }
        .app-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .show-qr-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 220px;
        }
        .qr-or-success-area {
          width: 100%;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          margin-top: 10px;
        }

        .qr-section {
          margin-top: 20px;
        }
    .show-qr-btn, .simulate-btn {
      background: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      margin-top: 10px;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.2s;
    }
    .show-qr-btn.always-blue {
      margin-top: 0;
      background: #007bff;
      color: #fff;
      border: none;
    }
    .show-qr-btn.always-blue:hover {
      background: #0056b3;
    }
    .show-qr-btn:disabled {
      background: #eee;
      color: #aaa;
      cursor: not-allowed;
    }
        .qr-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .qr-content {
          background: #fff;
          padding: 30px 40px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 0 20px rgba(0,0,0,0.2);
        }
        .payment-success {
          margin-top: 20px;
          background: #e6ffe6;
          border: 1px solid #28a745;
          border-radius: 6px;
          padding: 15px 20px;
          color: #218838;
          text-align: center;
        }

        .app-option {
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 10px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 80px;

          &.selected {
            border-color: #007bff;
            box-shadow: 0 0 10px rgba(0, 0, 255, 0.2);
          }

          .app-logo {
            height: 32px;
            width: auto;
            max-width: 48px;
            object-fit: contain;
            margin-bottom: 8px;
            border-radius: 4px;
          }

          span {
            font-size: 12px;
            font-weight: 500;
            color: #333;
          }
        }

        .upi-id-section {
          margin-top: 10px;

          input.upi-input {
            width: 100%;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ddd;
          }
        }

        .card-form {
          .form-row {
            margin-bottom: 10px;

            input {
              width: calc(50% - 5px);
              margin-right: 10px;
              padding: 10px;
              border-radius: 4px;
              border: 1px solid #ddd;
            }

            &.split input:last-child {
              margin-right: 0;
            }
          }

          .secure-note {
            font-size: 14px;
            color: #777;
            margin-top: 10px;
          }
        }

        .bank-selection {
          .bank-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;

            .bank-option {
              padding: 10px;
              border: 1px solid #ddd;
              border-radius: 4px;
              text-align: center;
              cursor: pointer;
              transition: all 0.3s ease;

              &.selected {
                border-color: #007bff;
                box-shadow: 0 0 10px rgba(0, 0, 255, 0.2);
              }

              .bank-logo {
                font-weight: bold;
                color: #555;
              }
            }
          }

          .bank-dropdown {
            width: 100%;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ddd;
            margin-top: 10px;
          }
        }
      }
    }
  }

  .upi-id-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 18px;
    margin-bottom: 8px;
    input.upi-id-input {
      flex: 2;
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid #bbb;
      font-size: 16px;
    }
    input.amount-input {
      flex: 1;
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid #bbb;
      font-size: 16px;
      min-width: 120px;
      max-width: 160px;
    }
    .show-qr-btn-inline {
      background: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 8px 18px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.2s;
      margin-left: 2px;
    }
    .show-qr-btn-inline:hover {
      background: #0056b3;
    }
    .show-qr-btn-inline:disabled {
      background: #eee;
      color: #aaa;
      cursor: not-allowed;
    }
  }
  .upi-error {
    color: #e74c3c;
    font-size: 15px;
    margin-bottom: 8px;
    margin-left: 2px;
  }
  .upi-qr-area {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .upi-qr-content {
    background: #fafbfc;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 18px 28px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  .simulate-btn {
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    margin-top: 10px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.2s;
  }
  .simulate-btn:hover {
    background: #0056b3;
  }
  .upi-pin-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }
  .upi-pin-content {
    background: #fff;
    padding: 30px 40px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 0 20px rgba(0,0,0,0.12);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .upi-pin-input {
    font-size: 22px;
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid #bbb;
    width: 160px;
    text-align: center;
    letter-spacing: 6px;
  }
  .pay-now-btn {
    background: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 22px;
    font-size: 16px;
    margin-top: 8px;
    cursor: pointer;
    margin-right: 8px;
  }
  .cancel-btn {
    background: #eee;
    color: #333;
    border: 1px solid #bbb;
    border-radius: 4px;
    padding: 8px 18px;
    font-size: 16px;
    margin-top: 8px;
    cursor: pointer;
  }
  .upi-payment-success {
    margin-top: 16px;
    background: #e6ffe6;
    border: 1px solid #28a745;
    border-radius: 6px;
    padding: 15px 20px;
    color: #218838;
    text-align: center;
  }
  .upi-history {
    margin-top: 18px;
    background: #f8f9fa;
    border-radius: 8px;
    padding: 10px 18px 18px 18px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.03);
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 15px;
    }
    th, td {
      padding: 6px 10px;
      border-bottom: 1px solid #eee;
      text-align: left;
    }
    th {
      background: #f1f1f1;
      font-weight: 600;
    }
    tr:last-child td {
      border-bottom: none;
    }
  }

  .payment-footer {
    padding: 20px 0;
    text-align: center;

    .place-order-btn {
      background: #28a745;
      color: #fff;
      padding: 15px 30px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 18px;
      transition: background 0.3s ease;

      &:hover {
        background: #218838;
      }
    }

    .terms {
      font-size: 14px;
      color: #555;
      margin-top: 10px;
    }
  }
`;

export default Payment;
