import React, { useState } from "react";
import styled from "styled-components";
import { FiSearch, FiChevronDown, FiChevronUp, FiPackage, FiCreditCard, FiShield, FiTruck, FiRotateCcw, FiHelpCircle } from "react-icons/fi";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState({});
  const [activeCategory, setActiveCategory] = useState("all");

  // Comprehensive FAQ data inspired by Amazon/Flipkart
  const faqCategories = [
    { id: "all", name: "All Topics", icon: FiHelpCircle },
    { id: "orders", name: "Orders & Shipping", icon: FiPackage },
    { id: "payments", name: "Payments & Pricing", icon: FiCreditCard },
    { id: "returns", name: "Returns & Refunds", icon: FiRotateCcw },
    { id: "account", name: "Account & Security", icon: FiShield },
    { id: "delivery", name: "Delivery", icon: FiTruck }
  ];

  const faqs = [
    {
      category: "orders",
      question: "How do I track my order?",
      answer: "You can track your order in multiple ways: 1) Use the tracking link sent to your email, 2) Log into your account and go to 'My Orders', 3) Use the order tracking feature on our homepage with your order ID. You'll get real-time updates on your order status."
    },
    {
      category: "orders",
      question: "Can I modify or cancel my order after placing it?",
      answer: "You can cancel your order within 1 hour of placing it if it hasn't been shipped yet. To modify an order, please contact our customer service immediately. Once the order is shipped, cancellation is not possible, but you can return the item after delivery."
    },
    {
      category: "orders",
      question: "What should I do if my order is delayed?",
      answer: "If your order is delayed beyond the estimated delivery date, please check the tracking status first. If there's no update for 24 hours past the expected delivery, contact our customer support with your order ID for immediate assistance."
    },
    {
      category: "payments",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, net banking, UPI, digital wallets (PayPal, Google Pay, PhonePe), and cash on delivery (COD) for eligible orders."
    },
    {
      category: "payments",
      question: "Is it safe to use my credit card on your website?",
      answer: "Yes, absolutely! We use industry-standard SSL encryption and comply with PCI DSS standards. Your payment information is never stored on our servers and is processed through secure payment gateways."
    },
    {
      category: "payments",
      question: "When will I be charged for my order?",
      answer: "For prepaid orders, payment is processed immediately after order confirmation. For COD orders, payment is collected at the time of delivery. If an order is cancelled before shipping, refunds are processed within 5-7 business days."
    },
    {
      category: "returns",
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy from the date of delivery. Items must be in original condition with tags and packaging intact. Perishable items, customized products, and intimate wear cannot be returned for hygiene reasons."
    },
    {
      category: "returns",
      question: "How do I return an item?",
      answer: "To return an item: 1) Go to 'My Orders' and select the item to return, 2) Choose a return reason, 3) Schedule a pickup or print a return label, 4) Pack the item securely with original packaging. Our team will collect the item and process your refund within 5-7 business days."
    },
    {
      category: "returns",
      question: "How long does it take to get my refund?",
      answer: "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be credited to your original payment method. For COD orders, refunds are processed to your bank account or as store credit."
    },
    {
      category: "delivery",
      question: "What are your delivery charges?",
      answer: "Delivery is free for orders above ₹499. For orders below ₹499, standard delivery charges of ₹40 apply. Express delivery (same day or next day) is available in select cities for an additional charge of ₹99."
    },
    {
      category: "delivery",
      question: "Do you deliver to my location?",
      answer: "We deliver to most locations across India. Enter your pincode during checkout to check delivery availability and estimated delivery time for your area. We're constantly expanding our delivery network."
    },
    {
      category: "delivery",
      question: "Can I change my delivery address after placing an order?",
      answer: "You can change your delivery address within 1 hour of placing the order if it hasn't been shipped yet. Contact our customer service immediately with your order ID and new address details."
    },
    {
      category: "account",
      question: "How do I create an account?",
      answer: "Click on 'Sign Up' at the top of our homepage, enter your email and create a password, or sign up using your Google/Facebook account. You'll receive a verification email to activate your account."
    },
    {
      category: "account",
      question: "I forgot my password. How can I reset it?",
      answer: "Click on 'Forgot Password' on the login page, enter your registered email address, and you'll receive a password reset link. Follow the instructions in the email to create a new password."
    },
    {
      category: "account",
      question: "How do I update my profile information?",
      answer: "Log into your account, go to 'My Profile' or 'Account Settings', and click 'Edit Profile'. You can update your name, email, phone number, and addresses. Make sure to save changes after updating."
    }
  ];

  const toggleExpanded = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Wrapper>
      <div className="container">
        <div className="help-header">
          <h1>Help Center</h1>
          <p>Find answers to your questions and get help with your orders</p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for help topics, orders, returns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="category-section">
          <h3>Browse by Category</h3>
          <div className="category-grid">
            {faqCategories.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <IconComponent className="category-icon" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Results */}
        <div className="faq-section">
          <div className="faq-header">
            <h3>
              {activeCategory === "all" ? "Frequently Asked Questions" : 
               faqCategories.find(cat => cat.id === activeCategory)?.name}
            </h3>
            <span className="results-count">
              {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'}
            </span>
          </div>

          <div className="faq-list">
            {filteredFaqs.length === 0 ? (
              <div className="no-results">
                <FiHelpCircle className="no-results-icon" />
                <h4>No results found</h4>
                <p>Try adjusting your search terms or browse different categories</p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button 
                    className="faq-question"
                    onClick={() => toggleExpanded(index)}
                  >
                    <span>{faq.question}</span>
                    {expandedItems[index] ? 
                      <FiChevronUp className="chevron" /> : 
                      <FiChevronDown className="chevron" />
                    }
                  </button>
                  <div className={`faq-answer ${expandedItems[index] ? 'expanded' : ''}`}>
                    <div className="answer-content">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="contact-section">
          <div className="contact-card">
            <h3>Still need help?</h3>
            <p>Can't find what you're looking for? Our customer support team is here to help.</p>
            <div className="contact-options">
              <button 
                className="contact-btn primary"
                onClick={() => {
                  if (window.Tawk_API) {
                    window.Tawk_API.toggle();
                  } else {
                    window.open('https://tawk.to/chat/68903f04a34d1b1925281fe8/1j1pncatu', '_blank');
                  }
                }}
              >
                Chat with us
              </button>
              <button 
                className="contact-btn secondary"
                onClick={() => window.location.href = 'mailto:sawaikarcashewstore1980@gmail.com'}
              >
                Email Support
              </button>
              <button className="contact-btn secondary">
                Call: 1800-123-4567
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 80vh;
  padding: 4rem 0;
  background: ${({ theme }) => theme.colors.bg};

  .container {
    max-width: 120rem;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .help-header {
    text-align: center;
    margin-bottom: 4rem;
    
    h1 {
      color: ${({ theme }) => theme.colors.heading};
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    
    p {
      color: ${({ theme }) => theme.colors.text};
      font-size: 1.8rem;
      max-width: 60rem;
      margin: 0 auto;
    }
  }
  
  .search-section {
    margin-bottom: 4rem;
    
    .search-bar {
      position: relative;
      max-width: 60rem;
      margin: 0 auto;
      
      .search-icon {
        position: absolute;
        left: 2rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
        color: #666;
      }
      
      input {
        width: 100%;
        padding: 1.5rem 2rem 1.5rem 5rem;
        border: 2px solid #e1e5e9;
        border-radius: 3rem;
        font-size: 1.6rem;
        transition: all 0.3s ease;
        
        &:focus {
          outline: none;
          border-color: ${({ theme }) => theme.colors.helper};
          box-shadow: 0 0 0 3px rgba(210, 105, 30, 0.1);
        }
        
        &::placeholder {
          color: #999;
        }
      }
    }
  }
  
  .category-section {
    margin-bottom: 4rem;
    
    h3 {
      color: ${({ theme }) => theme.colors.heading};
      font-size: 2.4rem;
      margin-bottom: 2rem;
      text-align: center;
    }
    
    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
      gap: 2rem;
      max-width: 120rem;
      margin: 0 auto;
      
      .category-card {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 2rem;
        background: white;
        border: 2px solid #e1e5e9;
        border-radius: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        color: ${({ theme }) => theme.colors.text};
        font-size: 1.6rem;
        font-weight: 500;
        
        &:hover {
          border-color: ${({ theme }) => theme.colors.helper};
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        &.active {
          background: ${({ theme }) => theme.colors.helper};
          color: white;
          border-color: ${({ theme }) => theme.colors.helper};
        }
        
        .category-icon {
          font-size: 2.4rem;
          flex-shrink: 0;
        }
      }
    }
  }
  
  .faq-section {
    .faq-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
      
      h3 {
        color: ${({ theme }) => theme.colors.heading};
        font-size: 2.4rem;
        margin: 0;
      }
      
      .results-count {
        color: ${({ theme }) => theme.colors.text};
        font-size: 1.4rem;
      }
    }
    
    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      
      .faq-item {
        background: white;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: ${({ theme }) => theme.colors.shadowSupport};
        border: 1px solid #e1e5e9;
        
        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          background: none;
          border: none;
          text-align: left;
          font-size: 1.6rem;
          font-weight: 600;
          color: ${({ theme }) => theme.colors.heading};
          cursor: pointer;
          transition: background 0.3s ease;
          
          &:hover {
            background: #f8f9fa;
          }
          
          .chevron {
            font-size: 2rem;
            transition: transform 0.3s ease;
          }
        }
        
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          
          &.expanded {
            max-height: 50rem;
          }
          
          .answer-content {
            padding: 0 2rem 2rem 2rem;
            color: ${({ theme }) => theme.colors.text};
            font-size: 1.5rem;
            line-height: 1.6;
          }
        }
      }
      
      .no-results {
        text-align: center;
        padding: 4rem 2rem;
        
        .no-results-icon {
          font-size: 6rem;
          color: #ccc;
          margin-bottom: 2rem;
        }
        
        h4 {
          color: ${({ theme }) => theme.colors.heading};
          font-size: 2.4rem;
          margin-bottom: 1rem;
        }
        
        p {
          color: ${({ theme }) => theme.colors.text};
          font-size: 1.6rem;
        }
      }
    }
  }
  
  .contact-section {
    margin-top: 6rem;
    
    .contact-card {
      background: white;
      border-radius: 1.5rem;
      padding: 4rem;
      text-align: center;
      box-shadow: ${({ theme }) => theme.colors.shadowSupport};
      border: 1px solid #e1e5e9;
      
      h3 {
        color: ${({ theme }) => theme.colors.heading};
        font-size: 2.8rem;
        margin-bottom: 1.5rem;
      }
      
      p {
        color: ${({ theme }) => theme.colors.text};
        font-size: 1.6rem;
        margin-bottom: 3rem;
        max-width: 50rem;
        margin-left: auto;
        margin-right: auto;
      }
      
      .contact-options {
        display: flex;
        gap: 2rem;
        justify-content: center;
        flex-wrap: wrap;
        
        .contact-btn {
          padding: 1.2rem 2.4rem;
          border-radius: 0.8rem;
          font-size: 1.4rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          text-decoration: none;
          display: inline-block;
          
          &.primary {
            background: ${({ theme }) => theme.colors.helper};
            color: white;
            
            &:hover {
              background: ${({ theme }) => theme.colors.btn};
              transform: translateY(-2px);
            }
          }
          
          &.secondary {
            background: white;
            color: ${({ theme }) => theme.colors.helper};
            border: 2px solid ${({ theme }) => theme.colors.helper};
            
            &:hover {
              background: ${({ theme }) => theme.colors.helper};
              color: white;
              transform: translateY(-2px);
            }
          }
        }
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .container {
      padding: 0 1rem;
    }
    
    .help-header h1 {
      font-size: 3rem;
    }
    
    .category-grid {
      grid-template-columns: 1fr;
    }
    
    .faq-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .contact-options {
      flex-direction: column;
      align-items: center;
      
      .contact-btn {
        width: 100%;
        max-width: 30rem;
      }
    }
  }
`;

export default FAQ;

