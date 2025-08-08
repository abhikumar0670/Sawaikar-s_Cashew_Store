import React from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { FiShoppingCart, FiTrash2, FiStar } from "react-icons/fi";
import { useWishlistContext } from "./context/wishlist_context";
import { useCartContext } from "./context/cart_context";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlistContext();
  const { addToCart, cart, removeFromCart } = useCartContext();
  const navigate = useNavigate();

  // Helper function to check if item is in stock
  const isItemInStock = (item) => {
    // Check inStock property first, fallback to stock > 0
    if (item.hasOwnProperty('inStock')) {
      return item.inStock;
    }
    return item.stock > 0;
  };

  const handleAddToCart = (item) => {
    // Transform wishlist item to cart item format
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      colors: ["#000000"],
      stock: isItemInStock(item) ? (item.stock || 10) : 0,
      stars: item.rating || item.stars || 4.5,
      reviews: item.reviews || 100,
      company: item.company || "Premium Store"
    };
    addToCart(item.id, "#000000", 1, cartItem);
    alert(`${item.name} added to cart!`);
  };

  // ...existing code...
  return (
    <Wrapper>
      <div className="container">
        <h1>My Wishlist</h1>
        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <h3>No items in Wishlist</h3>
            <p>Your wishlist is currently empty. Start adding your favorite products!</p>
          </div>
        ) : (
          <div className="wishlist-list">
            {wishlist.map((item) => (
              <div key={item.id} className="wishlist-item">
                <div className="item-image-container">
                  <img src={item.image} alt={item.name} className="item-image" />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={i < Math.floor(item.rating || item.stars || 4.5) ? 'star filled' : 'star'} 
                        />
                      ))}
                    </div>
                    <span className="rating-text">({item.rating || item.stars || 4.5})</span>
                  </div>
                  <div className="item-pricing">
                    <span className="current-price">₹{item.price}</span>
                    <span className="original-price">₹{item.originalPrice}</span>
                    <span className="discount">{item.discount}% off</span>
                  </div>
                  <div className="stock-status">
                    <span className={`status ${isItemInStock(item) ? 'in-stock' : 'out-of-stock'}`}>
                      {isItemInStock(item) ? '✓ In Stock' : '✗ Out of Stock'}
                    </span>
                  </div>
                  <div className="item-actions">
                    {isItemInStock(item) && (
                      cart.some(ci => ci.id === item.id + "#000000") ? (
                        <div style={{width:'100%'}}>
                          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                            <span style={{color:'#28a745',fontSize:'1.5rem'}}>&#10003;</span>
                            <span style={{color:'#28a745',fontWeight:500}}>Added to Cart</span>
                          </div>
                          <div style={{color:'#444',fontSize:'1.05rem',marginBottom:10}}>This item was already in your cart.</div>
                          <div style={{display:'flex',gap:12,alignItems:'center',width:'100%'}}>
                            <button 
                              className="add-to-cart-btn view-cart-btn"
                              onClick={() => navigate('/cart')}
                              style={{flex:1}}>
                              <FiShoppingCart />
                              View Cart
                            </button>
                            <button 
                              className="remove-btn"
                              onClick={() => removeFromWishlist(item.id)}
                              style={{flex:'none'}}>
                              <FiTrash2 />
                              Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{display:'flex',gap:12,alignItems:'center',width:'100%'}}>
                          <button 
                            className={`add-to-cart-btn ${!isItemInStock(item) ? 'disabled' : ''}`}
                            onClick={() => handleAddToCart(item)}
                            disabled={!isItemInStock(item)}
                            style={{flex:1}}>
                            <FiShoppingCart />
                            Add to Cart
                          </button>
                          <button 
                            className="remove-btn"
                            onClick={() => removeFromWishlist(item.id)}
                            style={{flex:'none'}}>
                            <FiTrash2 />
                            Remove
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 80vh;
  padding: 4rem 0;
  background: ${({ theme }) => theme.colors.bg};

  .container {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 2rem;
  }

  h1 {
    color: ${({ theme }) => theme.colors.heading};
    font-size: 3.6rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .empty-wishlist {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};

    h3 {
      color: ${({ theme }) => theme.colors.heading};
      margin-bottom: 1rem;
    }

    p {
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 2rem;
      font-size: 1.6rem;
    }
  }

  .wishlist-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .wishlist-item {
    background: white;
    border-radius: 1.2rem;
    padding: 2rem;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    border: 1px solid #e1e5e9;
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
  }
  
  .item-image-container {
    flex-shrink: 0;
    
    .item-image {
      width: 12rem;
      height: 12rem;
      border-radius: 1rem;
      object-fit: cover;
      border: 2px solid #f0f0f0;
    }
  }
  
  .item-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .item-name {
    color: ${({ theme }) => theme.colors.heading};
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.3;
  }
  
  .item-rating {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    
    .stars {
      display: flex;
      gap: 0.2rem;
      
      .star {
        font-size: 1.4rem;
        color: #ddd;
        
        &.filled {
          color: #ffc107;
        }
      }
    }
    
    .rating-text {
      font-size: 1.4rem;
      color: #666;
      font-weight: 500;
    }
  }
  
  .stock-status {
    .status {
      font-size: 1.3rem;
      font-weight: 600;
      padding: 0.3rem 0.8rem;
      border-radius: 0.4rem;
      
      &.in-stock {
        color: #28a745;
        background: #d4edda;
      }
      
      &.out-of-stock {
        color: #dc3545;
        background: #f8d7da;
      }
    }
  }
  
  .item-pricing {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    
    .current-price {
      color: ${({ theme }) => theme.colors.helper};
      font-size: 2.2rem;
      font-weight: 700;
    }
    
    .original-price {
      color: #999;
      font-size: 1.6rem;
      text-decoration: line-through;
    }
    
    .discount {
      background: #e8f5e8;
      color: #2d5a2d;
      padding: 0.3rem 0.8rem;
      border-radius: 0.4rem;
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
  
  .item-actions {
    display: flex;
    gap: 1rem;
    margin-top: auto;
    
    button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8rem 1.6rem;
      border: none;
      border-radius: 0.6rem;
      font-size: 1.4rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .add-to-cart-btn {
      background: ${({ theme }) => theme.colors.helper};
      color: white;
      flex: 1;
      justify-content: center;
      
      &:hover:not(:disabled) {
        background: ${({ theme }) => theme.colors.btn};
        transform: translateY(-1px);
      }
      
      &.disabled,
      &:disabled {
        background: #ccc;
        color: #888;
        cursor: not-allowed;
        
        &:hover {
          transform: none;
          background: #ccc;
        }
      }
    }
    .view-cart-btn {
      background: #f5f5f5 !important;
      color: #555 !important;
      border: 2px solid #e0e0e0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }
    
    .remove-btn {
      background: #fff;
      color: #dc3545;
      border: 2px solid #dc3545;
      
      &:hover {
        background: #dc3545;
        color: white;
        transform: translateY(-1px);
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .container {
      padding: 0 1rem;
    }

    h1 {
      font-size: 2.8rem;
    }
    
    .wishlist-item {
      flex-direction: column;
      text-align: center;
      
      .item-image-container {
        align-self: center;
        
        .item-image {
          width: 15rem;
          height: 15rem;
        }
      }
      
      .item-details {
        align-items: center;
        text-align: center;
      }
      
      .item-pricing {
        justify-content: center;
      }
      
      .item-actions {
        width: 100%;
        
        button {
          flex: 1;
        }
      }
    }
  }
`;

export default Wishlist;
// After successful checkout, call removeFromWishlist(item.id) and removeFromCart(item.id) for each checked out item.

