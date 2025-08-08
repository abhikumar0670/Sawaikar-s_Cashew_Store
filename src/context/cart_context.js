import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../Reducer/cartReducer";

const CartContext = createContext();

// const getLocalCartData = () => {
//   let localCartData = localStorage.getItem("thapaCart");
//   // if (localCartData === []) {
//   //   return [];
//   // } else {
//   //   return JSON.parse(localCartData);
//   // }
//   const parsedData = JSON.parse(localCartData);
//   if (!Array.isArray(parsedData)) return [];

//   return parsedData;
// };

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("thapaCart");
  if (!localCartData) return [];
  const parsedData = JSON.parse(localCartData);
  return Array.isArray(parsedData) ? parsedData : [];
};


const initialState = {
  // cart: [],
  cart: getLocalCartData(),
  total_item: "",
  total_price: "",
  shipping_fee: 0,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  // increment and decrement the product

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  // to remove the individual item from cart
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // to add the data in localStorage
  // get vs set

  // Calculate order_total (finalTotal) using the same logic as Cart.js
  const subtotal = state.total_price;
  const totalOriginalPrice = state.cart.reduce((total, item) => {
    return total + (Math.ceil(item.price * 1.2) * item.amount);
  }, 0);
  const dealOfTheDaySavings = totalOriginalPrice - subtotal;
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
  const dynamicShippingFee = subtotal >= 2000 ? 0 : 150;
  const order_total = subtotal - dealOfTheDaySavings - promotionalDiscountAmount + dynamicShippingFee;

  useEffect(() => {
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
    localStorage.setItem("thapaCart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrement,
        order_total,
      }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };