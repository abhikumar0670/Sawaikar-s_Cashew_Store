import React, { useEffect, useState } from 'react';
// Helper to generate random barcode string
function generateBarcode() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

const PaymentHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
  // Load unified payment transactions from localStorage
  const allTxns = JSON.parse(localStorage.getItem('allTransactions') || '[]');
  allTxns.sort((a, b) => new Date(b.date) - new Date(a.date));
  setTransactions(allTxns);
  }, []);

  // Helper to generate SVG barcode (longer version)
  function getBarcodeSVG(code, longer = false) {
    let bars = '';
    const height = longer ? 60 : 40;
    for (let i = 0; i < code.length; i++) {
      const width = (parseInt(code[i]) % 2 === 0) ? 4 : 2;
      bars += `<rect x="${i*8}" y="0" width="${width}" height="${height}" fill="#222" />`;
    }
    return `<svg width="${code.length*8}" height="${height}">${bars}</svg>`;
  }

  // Get user info from profile in localStorage
  // Get user info from profile in localStorage (for Bill To/Ship To)
  // Get full user info from profile in localStorage (for Bill To/Ship To)
  let user = {
    name: 'Customer',
    address: 'Not Provided',
    city: '',
    state: '',
    pin: '',
    email: 'Not Provided',
    phone: '0000000000',
  };
  // Use 'user' from localStorage for Bill To/Ship To
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  if (loggedInUser) {
    user = {
      name: loggedInUser.name || 'Customer',
      address: loggedInUser.address || '',
      city: loggedInUser.city || '',
      state: loggedInUser.state || '',
      pin: loggedInUser.pin || '',
      email: loggedInUser.email || 'Not Provided',
      phone: loggedInUser.phone || '0000000000',
    };
  }

  function downloadInvoice(txn) {
    const barcode = generateBarcode();
    const orderId = txn.orderId || txn.txnId || barcode;
    const invoiceDate = txn.date || new Date().toLocaleString();
    // Use all product names for description, fallback to items/products arrays, else single name
    let itemName = '-';
    if (Array.isArray(txn.items) && txn.items.length > 0) {
      itemName = txn.items.map(p => p.name || p.productName).filter(Boolean).join(', ');
    } else if (Array.isArray(txn.products) && txn.products.length > 0) {
      itemName = txn.products.map(p => p.name || p.productName).filter(Boolean).join(', ');
    } else {
      itemName = txn.productName || txn.name || txn.itemName || txn.description || '-';
    }
    const itemQty = txn.qty || 1;
    const itemRate = txn.amount || 0;
    const senderPhone = '9876543210';
    const invoiceHtml = `
      <html><head><title>Invoice</title><style>
        body { font-family: Arial, sans-serif; }
        .invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px #eee; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #eee; padding: 8px; text-align: left; }
        .header { font-size: 22px; font-weight: bold; margin-bottom: 18px; }
        .barcode { font-family: monospace; font-size: 18px; margin-top: 8px; }
        .barcode-img { display: block; margin: 10px 0; height: 60px; }
      </style></head><body>
      <div class="invoice-box">
        <div class="header">Tax Invoice</div>
        <table>
          <tr><td><b>Sender</b><br/>Shreyas Sawaikar<br/>Sawaikar's Cashew Store<br/>123 Cashew Lane, Goa, India<br/>Ph: ${senderPhone}<br/>Email: sawaikarcashewstore1980@gmail.com<br/>GSTIN: 22ABCDE1234F1Z5</td>
            <td><b>Invoice Code:</b> ${barcode}<br/><b>Order No:</b> ${orderId}<br/><b>Order Date:</b> ${invoiceDate}<br/><b>Payment Mode:</b> ${txn.method}</td></tr>
          <tr><td><b>Bill To</b><br/>${user.name}<br/>${[user.address, user.city, user.state, user.pin].filter(Boolean).join(', ')}<br/>Email: ${user.email}<br/>T: ${user.phone}</td>
            <td><b>Ship To</b><br/>${user.name}<br/>${[user.address, user.city, user.state, user.pin].filter(Boolean).join(', ')}<br/>Email: ${user.email}<br/>T: ${user.phone}</td></tr>
        </table>
        <br/>
        <table>
          <tr><th>Sl No.</th><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr>
          <tr><td>1</td><td>${itemName}</td><td>${itemQty}</td><td>₹${itemRate}</td><td>₹${itemRate}</td></tr>
        </table>
        <br/>
        <b>Total: ₹${txn.amount}</b><br/>
        <b>Status: ${txn.status}</b><br/>
        <div class="barcode">
          Barcode: ${barcode}<br/>
          ${getBarcodeSVG(barcode, true)}
        </div>
        <br/><br/><small>This is a computer generated invoice.</small>
      </div></body></html>
    `;
    const blob = new Blob([invoiceHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${orderId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

              return (
                <div style={{padding: '24px 16px', maxWidth: 900, margin: '0 auto'}}>
                  <h2 style={{marginBottom: 18}}>Payment History</h2>
                  {transactions.length === 0 ? (
                    <div style={{color:'#888', fontSize:'1.1rem'}}>No payment transactions found.</div>
                  ) : (
                    <table style={{width:'100%', borderCollapse:'collapse', background:'#fff', borderRadius:8, boxShadow:'0 0 8px #eee', textAlign:'center'}}>
                      <thead>
                        <tr style={{background:'#f8f9fa'}}>
                          <th style={{padding:'10px 8px'}}>Date & Time</th>
                          <th>Item</th>
                          <th>Amount</th>
                          <th>Method</th>
                          <th>Details</th>
                          <th>Status</th>
                          <th>Invoice</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((txn, idx) => {
                          // Robust: show all product names if products array exists, else fallback to other fields
                          // Extract product names from txn.items if present, else fallback to other fields
                          let itemName = '-';
                          if (Array.isArray(txn.items) && txn.items.length > 0) {
                            itemName = txn.items.map(p => p.name || p.productName).filter(Boolean).join(', ');
                          } else if (Array.isArray(txn.products) && txn.products.length > 0) {
                            itemName = txn.products.map(p => p.name || p.productName).filter(Boolean).join(', ');
                          } else {
                            itemName = txn.productName || txn.name || txn.itemName || txn.description || '-';
                          }
                          return (
                            <tr key={idx} style={{borderBottom:'1px solid #f0f0f0', height: '52px'}}>
                              <td style={{padding:'14px 10px'}}>{txn.date}</td>
                              <td style={{padding:'14px 18px', fontWeight: 500, fontSize: '1.08rem', letterSpacing: '0.5px'}}>{itemName}</td>
                              <td style={{padding:'14px 10px'}}>₹{txn.amount}</td>
                              <td style={{padding:'14px 10px'}}>{txn.method || txn.type}</td>
                              <td style={{padding:'14px 10px'}}>{txn.upiId || txn.txnId || txn.bank || '-'}</td>
                              <td style={{padding:'14px 10px', color: txn.status?.toLowerCase() === 'success' ? '#28a745' : txn.status?.toLowerCase() === 'cancelled' ? '#888' : '#e74c3c'}}>{txn.status}</td>
                              <td style={{padding:'14px 10px'}}>
                                {['success', 'completed', 'paid', 'confirmed'].includes(txn.status?.toLowerCase()) ? (
                                  <button style={{padding:'8px 18px', fontSize:15, background:'#d2691e', color:'#fff', border:'none', borderRadius:4, cursor:'pointer'}} onClick={() => downloadInvoice(txn)}>Download Invoice</button>
                                ) : (
                                  <span style={{color: '#888', fontSize: '13px'}}>No Invoice</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              );
            };

            export default PaymentHistory;
