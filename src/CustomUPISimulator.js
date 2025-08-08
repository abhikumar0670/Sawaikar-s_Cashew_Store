import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import styled from "styled-components";

const CustomUPISimulator = () => {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [authStep, setAuthStep] = useState(false);
  const [pin, setPin] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'fail'
  const [transactions, setTransactions] = useState([]);

  const handleGenerateQR = () => {
    setShowQR(true);
    setAuthStep(false);
    setPaymentStatus(null);
  };

  const handleConfirm = () => {
    setAuthStep(true);
  };

  const handleAuth = () => {
    // Simulate PIN check (1234 is always correct for demo)
    if (pin === "1234") {
      setPaymentStatus("success");
      const txn = {
        id: Date.now(),
        upiId,
        amount,

export default CustomUPISimulator;

const SimulatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background: #f8f9fa;
  .simulator-box {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.08);
    padding: 32px 32px 24px 32px;
    margin: 32px 0;
    min-width: 600px;
    max-width: 700px;
  }
  h2 {
    text-align: center;
    margin-bottom: 24px;
    font-size: 2.2rem;
    font-weight: 600;
  }
  .input-row {
    display: flex;
    gap: 12px;
    margin-bottom: 18px;
    justify-content: center;
    align-items: center;
  }
  .upi-input, .amt-input, .note-input {
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #bbb;
    font-size: 1rem;
    min-width: 180px;
  }
  .amt-input {
    min-width: 120px;
  }
  .note-input {
    min-width: 180px;
  }
  .show-qr-btn, .confirm-btn, .auth-btn {
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 18px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .show-qr-btn:disabled {
    background: #b3d7ff;
    cursor: not-allowed;
  }
  .qr-section {
    margin: 24px 0 12px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .qr-details {
    margin: 10px 0 16px 0;
    font-size: 1.1rem;
    color: #333;
  }
  .confirm-btn {
    margin-top: 10px;
    background: #28a745;
  }
  .auth-section {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  .pin-error {
    color: #e74c3c;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 6px;
    text-align: center;
    width: 100%;
  }
  .pin-input {
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #bbb;
    font-size: 1rem;
    min-width: 120px;
  }
  .auth-btn {
    background: #007bff;
  }
  .success-msg {
    margin-top: 16px;
    background: #e6ffe6;
    border: 1px solid #28a745;
    border-radius: 6px;
    padding: 12px 18px;
    color: #218838;
    text-align: center;
    font-weight: 500;
  }
  .fail-msg {
    margin-top: 16px;
    background: #ffe6e6;
    border: 1px solid #e74c3c;
    border-radius: 6px;
    padding: 12px 18px;
    color: #e74c3c;
    text-align: center;
    font-weight: 500;
  }
  .txn-history {
    margin-top: 32px;
  }
  .txn-history h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
    font-weight: 600;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    background: #fafbfc;
    font-size: 0.98rem;
  }
  th, td {
    border: 1px solid #e0e0e0;
    padding: 8px 10px;
    text-align: center;
  }
  th {
    background: #f1f3f6;
    font-weight: 600;
  }
  .success-row {
    background: #f6fff6;
  }
  .fail-row {
    background: #fff6f6;
  }
`;
    padding: 32px 32px 24px 32px;
    margin: 32px 0;
    min-width: 600px;
    max-width: 700px;
  }
  h2 {
    text-align: center;
    margin-bottom: 24px;
    font-size: 2.2rem;
    font-weight: 600;
  }
  .input-row {
    display: flex;
    gap: 12px;
    margin-bottom: 18px;
    justify-content: center;
    align-items: center;
  }
  .upi-input, .amt-input, .note-input {
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #bbb;
    font-size: 1rem;
    min-width: 180px;
  }
  .amt-input {
    min-width: 120px;
  }
  .note-input {
    min-width: 180px;
  }
  .show-qr-btn, .confirm-btn, .auth-btn {
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 18px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .show-qr-btn:disabled {
    background: #b3d7ff;
    cursor: not-allowed;
  }
  .qr-section {
    margin: 24px 0 12px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .qr-details {
    margin: 10px 0 16px 0;
    font-size: 1.1rem;
    color: #333;
  }
  .confirm-btn {
    margin-top: 10px;
    background: #28a745;
  }
  .auth-section {
    margin-top: 12px;
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .pin-input {
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #bbb;
    font-size: 1rem;
    min-width: 120px;
  }
  .auth-btn {
    background: #007bff;
  }
  .success-msg {
    margin-top: 16px;
    background: #e6ffe6;
    border: 1px solid #28a745;
    border-radius: 6px;
    padding: 12px 18px;
    color: #218838;
    text-align: center;
    font-weight: 500;
  }
  .fail-msg {
    margin-top: 16px;
    background: #ffe6e6;
    border: 1px solid #e74c3c;
    border-radius: 6px;
    padding: 12px 18px;
    color: #e74c3c;
    text-align: center;
    font-weight: 500;
  }
  .txn-history {
    margin-top: 32px;
  }
  .txn-history h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
    font-weight: 600;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    background: #fafbfc;
    font-size: 0.98rem;
  }
  th, td {
    border: 1px solid #e0e0e0;
    padding: 8px 10px;
    text-align: center;
  }
  th {
    background: #f1f3f6;
    font-weight: 600;
  }
  .success-row {
    background: #f6fff6;
  }
  .fail-row {
    background: #fff6f6;
  }
`;

export default CustomUPISimulator;
