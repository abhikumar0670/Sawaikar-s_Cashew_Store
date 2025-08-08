import styled from "styled-components";
import { useCartContext } from "./context/cart_context";
import CartItem from "./components/CartItem";
import { NavLink } from "react-router-dom";
import { Button } from "./styles/Button";
import FormatPrice from "./Helpers/FormatPrice";
import { useAuth0 } from "@auth0/auth0-react";
import emptyCartGif from "./assets/cartGif.gif";

// const Cart = () => {
//   const { cart, clearCart, total_price, shipping_fee } = useCartContext();
//   // console.log("🚀 ~ file: Cart.js ~ line 6 ~ Cart ~ cart", cart);

//   const { isAuthenticated, user } = useAuth0();

//   if (cart.length === 0) {
//     return (
//       <EmptyDiv>
//         <h3>No Cart in Item </h3>
//       </EmptyDiv>
//     );
//   }


const Cart = () => {
  const { cart, clearCart, total_price, shipping_fee } = useCartContext();
  const { isAuthenticated, user } = useAuth0();

  // Calculate MRP (original prices) and Deal of the Day savings
  const calculateOriginalPrice = (price) => Math.ceil(price * 1.2);
  
  const subtotal = total_price;
  const totalOriginalPrice = cart.reduce((total, item) => {
    return total + (calculateOriginalPrice(item.price) * item.amount);
  }, 0);
  
  // Deal of the Day savings (difference between MRP and current price)
  const dealOfTheDaySavings = totalOriginalPrice - subtotal;
  
  // Promotional discount logic based on cart value (applied on subtotal)
  const getPromotionalDiscount = (amount) => {
    if (amount >= 3500) {
      return { percentage: 20, label: "Premium Discount" };
    } else if (amount >= 2500) {
      return { percentage: 10, label: "Special Discount" };
    } else if (amount >= 2000) {
      return { percentage: 5, label: "Welcome Discount" };
    }
    return { percentage: 0, label: "" };
  };
  
  const promotionalDiscount = getPromotionalDiscount(subtotal);
  const promotionalDiscountAmount = (subtotal * promotionalDiscount.percentage) / 100;
  
  // Total savings = Deal of the Day + Promotional Discount
  const totalSavings = dealOfTheDaySavings + promotionalDiscountAmount;
  
  // Shipping fee logic
  const dynamicShippingFee = subtotal >= 2000 ? 0 : 150;
  
  // Final total calculation: Start with subtotal, subtract both deal savings and promotional discount, add shipping
  const finalTotal = subtotal - dealOfTheDaySavings - promotionalDiscountAmount + dynamicShippingFee;

  if (cart.length === 0) {
    return (
      <EmptyCartWrapper>
        <img src={emptyCartGif} alt="Empty Cart" />
        <h3>Your Cart is Empty</h3>
        <NavLink to="/products">
          <Button>Continue Shopping</Button>
        </NavLink>
      </EmptyCartWrapper>
    );
  }

  return (
    <Wrapper>
      <div className="container">
        {isAuthenticated && (
          <div className="cart-user--profile">
            <img src={user.picture} alt={user.name} />
            <h2 className="cart-user--name">{user.name}</h2>
          </div>
        )}

        <div className="cart_heading grid grid-five-column">
          <p>Item</p>
          <p className="cart-hide">Price</p>
          <p>Quantity</p>
          <p className="cart-hide">Subtotal</p>
          <p>Remove</p>
        </div>
        <hr />
        <div className="cart-item">
          {cart.map((curElem) => {
            return <CartItem key={curElem.id} {...curElem} />;
          })}
        </div>
        <hr />
        <div className="cart-two-button">
          <NavLink to="/products">
            <Button> continue Shopping </Button>
          </NavLink>
          <Button className="btn btn-clear" onClick={clearCart}>
            clear cart
          </Button>
        </div>

        {/* Enhanced Deal of the Day & Promotions */}
        <div className="deals-section">
          {/* Deal of the Day Banner */}
          {dealOfTheDaySavings > 0 && (
            <div className="deal-banner">
              <h3>🎉 Deal of the Day! 🎉</h3>
              <p>Special discounts on all items - You're saving <strong><FormatPrice price={dealOfTheDaySavings} /></strong> from MRP!</p>
            </div>
          )}
          
          {/* Promotional Discount Coupons */}
          {promotionalDiscount.percentage > 0 && (
            <div className="coupon-applied">
              <div className="coupon-badge">
                <span className="coupon-icon">🎫</span>
                <div className="coupon-details">
                  <h4>{promotionalDiscount.label} Applied!</h4>
                  <p>{promotionalDiscount.percentage}% OFF on your cart value</p>
                </div>
                <div className="coupon-savings">
                  <span>-<FormatPrice price={promotionalDiscountAmount} /></span>
                </div>
              </div>
            </div>
          )}
          
          {/* Dynamic Promotions */}
          <div className="promotion-tiers">
            <h4>🚀 Unlock More Savings!</h4>
            <div className="tier-list">
              {subtotal < 2000 && (
                <div className="tier-item next">
                  <span>Add <FormatPrice price={2000 - subtotal} /> more for 5% OFF + FREE delivery!</span>
                </div>
              )}
              {subtotal >= 2000 && subtotal < 2500 && (
                <div className="tier-item next">
                  <span>Add <FormatPrice price={2500 - subtotal} /> more for 10% OFF!</span>
                </div>
              )}
              {subtotal >= 2500 && subtotal < 3500 && (
                <div className="tier-item next">
                  <span>Add <FormatPrice price={3500 - subtotal} /> more for 20% OFF!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced order total_amount */}
        <div className="order-total--amount">
          <div className="order-total--subdata">
            <div className="price-breakdown">
              <div className="price-row">
                <p>Item Subtotal:</p>
                <p><FormatPrice price={subtotal} /></p>
              </div>
              
              {dealOfTheDaySavings > 0 && (
                <div className="price-row savings">
                  <p>Deal of the Day Savings:</p>
                  <p className="negative">-<FormatPrice price={dealOfTheDaySavings} /></p>
                </div>
              )}
              
              {promotionalDiscount.percentage > 0 && (
                <div className="price-row discount">
                  <p>{promotionalDiscount.label} ({promotionalDiscount.percentage}%):</p>
                  <p className="negative">-<FormatPrice price={promotionalDiscountAmount} /></p>
                </div>
              )}
              
              <div className="price-row shipping">
                <p>Shipping Fee:</p>
                <p className={dynamicShippingFee === 0 ? "free" : ""}>
                  {dynamicShippingFee === 0 ? (
                    <span className="free-shipping">FREE 🚚</span>
                  ) : (
                    <FormatPrice price={dynamicShippingFee} />
                  )}
                </p>
              </div>
              
              <hr className="total-divider" />
              
              <div className="price-row final-total">
                <p>Order Total:</p>
                <p><FormatPrice price={finalTotal} /></p>
              </div>
              
              {subtotal >= 2000 && (
                <div className="free-delivery-badge">
                  <span>🎉 FREE Delivery Applied!</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Proceed to Pay Button */}
        <div className="proceed-to-pay">
          <NavLink to="/payment">
            <Button>Proceed to Pay</Button>
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

// const EmptyDiv = styled.div`
//   display: grid;
//   place-items: center;
//   height: 50vh;

//   h3 {
//     font-size: 4.2rem;
//     text-transform: capitalize;
//     font-weight: 300;
//   }
// `;


const EmptyCartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  text-align: center;

  img {
    width: 300px;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1rem;
    text-transform: capitalize;
  }

  a {
    text-decoration: none;
  }
`;

const Wrapper = styled.section`
  padding: 9rem 0;

  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
  hr {
    margin-top: 1rem;
  }
  .cart-item {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
  }
  .cart-image--name {
    /* background-color: red; */
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;
    img {
      max-width: 5rem;
      height: 5rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;

        border-radius: 50%;
      }
    }
  }

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .btn-clear {
      background-color: #e74c3c;
    }
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }

  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }

  /* Enhanced Deals and Promotions Section */
  .deals-section {
    width: 100%;
    margin: 3rem 0;
    
    .deal-banner {
      background: linear-gradient(135deg, #ff6b6b, #feca57);
      color: white;
      padding: 2rem;
      border-radius: 1rem;
      text-align: center;
      margin-bottom: 2rem;
      box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
      
      h3 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        font-weight: 700;
        text-transform: none;
      }
      
      p {
        font-size: 1.4rem;
        margin: 0;
        opacity: 0.95;
      }
    }
    
    .coupon-applied {
      margin-bottom: 2rem;
      
      .coupon-badge {
        background: linear-gradient(135deg, #10ac84, #1dd1a1);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        gap: 1.5rem;
        box-shadow: 0 4px 15px rgba(16, 172, 132, 0.3);
        
        .coupon-icon {
          font-size: 2.4rem;
        }
        
        .coupon-details {
          flex: 1;
          
          h4 {
            font-size: 1.6rem;
            margin: 0 0 0.5rem 0;
            font-weight: 600;
          }
          
          p {
            font-size: 1.2rem;
            margin: 0;
            opacity: 0.9;
          }
        }
        
        .coupon-savings {
          font-size: 1.8rem;
          font-weight: 700;
        }
      }
    }
    
    .promotion-tiers {
      background: #f8f9fa;
      padding: 2rem;
      border-radius: 1rem;
      border: 1px solid #e9ecef;
      
      h4 {
        font-size: 1.6rem;
        margin-bottom: 1rem;
        color: ${({ theme }) => theme.colors.heading};
        font-weight: 600;
      }
      
      .tier-list {
        .tier-item {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 0.8rem;
          margin-bottom: 1rem;
          
          &.next {
            background: linear-gradient(135deg, #f093fb, #f5576c);
            animation: pulse 2s infinite;
          }
          
          span {
            font-size: 1.3rem;
            font-weight: 500;
          }
        }
      }
    }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 0.1rem solid #f0f0f0;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding: 3.2rem;
      background: white;
      border-radius: 1rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      
      .price-breakdown {
        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem 0;
          
          &.savings, &.discount {
            color: #27ae60;
            
            .negative {
              color: #27ae60;
              font-weight: 600;
            }
          }
          
          &.shipping {
            .free {
              color: #27ae60;
            }
            
            .free-shipping {
              color: #27ae60;
              font-weight: 600;
              font-size: 1.4rem;
            }
          }
          
          &.final-total {
            background-color: #fafafa;
            padding: 1.5rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            font-size: 1.8rem;
            font-weight: 700;
            
            p {
              color: ${({ theme }) => theme.colors.heading};
              font-size: 1.8rem;
            }
          }
        }
        
        .total-divider {
          border: none;
          border-top: 2px solid #e9ecef;
          margin: 1.5rem 0;
        }
        
        .free-delivery-badge {
          text-align: center;
          margin-top: 1rem;
          
          span {
            background: linear-gradient(135deg, #10ac84, #1dd1a1);
            color: white;
            padding: 0.8rem 1.5rem;
            border-radius: 2rem;
            font-size: 1.3rem;
            font-weight: 600;
            display: inline-block;
          }
        }
      }
    }
  }

  /* Proceed to Pay Button */
  .proceed-to-pay {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 2rem;
    padding: 0 2rem;
    
    a {
      text-decoration: none;
      
      button {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 1.5rem 3rem;
        font-size: 1.6rem;
        font-weight: 600;
        border: none;
        border-radius: 0.8rem;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        
        &:hover {
          background: linear-gradient(135deg, #5a67d8, #6b46c1);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        
        &:active {
          transform: translateY(0);
        }
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }

    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }

    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;

      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
    
    .proceed-to-pay {
      justify-content: center;
      padding: 0 1rem;
      
      a {
        button {
          width: 100%;
          max-width: 300px;
          padding: 1.2rem 2rem;
          font-size: 1.4rem;
        }
      }
    }
  }
`;

export default Cart;




// import React from "react";
// import styled from "styled-components";
// import { useCartContext } from "./context/cart_context";
// import CartItem from "./components/CartItem";
// import { NavLink } from "react-router-dom";
// import { Button } from "./styles/Button";
// import FormatPrice from "./Helpers/FormatPrice";
// import { useAuth0 } from "@auth0/auth0-react";

// // Import your GIF here
// import emptyCartGif from "./assets/cartGif.gif"; // Adjust the path to your GIF file

// const Cart = () => {
//   const { cart, clearCart, total_price, shipping_fee } = useCartContext();
//   const { isAuthenticated, user } = useAuth0();

//   if (cart.length === 0) {
//     return (
//       <EmptyCartWrapper>
//         <img src={emptyCartGif} alt="Empty Cart" />
//         <h3>Your Cart is Empty</h3>
//         <NavLink to="/products">
//           <Button>Continue Shopping</Button>
//         </NavLink>
//       </EmptyCartWrapper>
//     );
//   }

//   return (
//     <Wrapper>
//       <div className="container">
//         {isAuthenticated && (
//           <div className="cart-user--profile">
//             <img src={user.picture} alt={user.name} />
//             <h2 className="cart-user--name">{user.name}</h2>
//           </div>
//         )}

//         <div className="cart_heading grid grid-five-column">
//           <p>Item</p>
//           <p className="cart-hide">Price</p>
//           <p>Quantity</p>
//           <p className="cart-hide">Subtotal</p>
//           <p>Remove</p>
//         </div>
//         <hr />
//         <div className="cart-item">
//           {cart.map((curElem) => {
//             return <CartItem key={curElem.id} {...curElem} />;
//           })}
//         </div>
//         <hr />
//         <div className="cart-two-button">
//           <NavLink to="/products">
//             <Button>Continue Shopping</Button>
//           </NavLink>
//           <Button className="btn btn-clear" onClick={clearCart}>
//             Clear Cart
//           </Button>
//         </div>

//         <div className="order-total--amount">
//           <div className="order-total--subdata">
//             <div>
//               <p>Subtotal:</p>
//               <p>
//                 <FormatPrice price={total_price} />
//               </p>
//             </div>
//             <div>
//               <p>Shipping Fee:</p>
//               <p>
//                 <FormatPrice price={shipping_fee} />
//               </p>
//             </div>
//             <hr />
//             <div>
//               <p>Order Total:</p>
//               <p>
//                 <FormatPrice price={shipping_fee + total_price} />
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// const EmptyCartWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 50vh;
//   text-align: center;

//   img {
//     width: 300px;
//     margin-bottom: 1rem;
//   }

//   h3 {
//     font-size: 2rem;
//     font-weight: 400;
//     margin-bottom: 1rem;
//     text-transform: capitalize;
//   }

//   a {
//     text-decoration: none;
//   }
// `;

// const Wrapper = styled.section`
//   /* Same styles as before */
// `;

// export default Cart;
