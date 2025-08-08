import { createContext, useContext, useReducer, useEffect } from "react";

const WishlistContext = createContext();

// Get wishlist data from localStorage
const getLocalWishlistData = () => {
  let localWishlistData = localStorage.getItem("wishlistData");
  if (!localWishlistData) return [];
  const parsedData = JSON.parse(localWishlistData);
  
  // Migrate existing items to ensure they have proper structure
  const migratedData = Array.isArray(parsedData) ? parsedData.map(item => ({
    ...item,
    inStock: item.inStock !== undefined ? item.inStock : (item.stock > 0),
    rating: item.rating || item.stars || 4.5,
    stars: item.stars || item.rating || 4.5,
    originalPrice: item.originalPrice || (item.price ? Math.ceil(item.price * 1.2) : item.price),
    discount: item.discount || (item.price ? Math.round(((Math.ceil(item.price * 1.2) - item.price) / Math.ceil(item.price * 1.2)) * 100) : 0)
  })) : [];
  
  return migratedData;
};

// Wishlist reducer
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      const { product } = action.payload;
      
      // Check if item already exists in wishlist
      const existingItem = state.wishlist.find(item => item.id === product.id);
      if (existingItem) {
        return state; // Don't add duplicate
      }
      
      return {
        ...state,
        wishlist: [...state.wishlist, product]
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload)
      };

    case "CLEAR_WISHLIST":
      return {
        ...state,
        wishlist: []
      };

    case "SET_WISHLIST":
      return {
        ...state,
        wishlist: action.payload
      };

    default:
      return state;
  }
};

const initialState = {
  wishlist: getLocalWishlistData(),
};

const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Add item to wishlist
  const addToWishlist = (product) => {
    // Transform the product to ensure it has the inStock property
    const transformedProduct = {
      ...product,
      inStock: product.stock > 0, // Convert stock number to boolean
      originalPrice: product.price ? Math.ceil(product.price * 1.2) : product.price,
      discount: product.price ? Math.round(((Math.ceil(product.price * 1.2) - product.price) / Math.ceil(product.price * 1.2)) * 100) : 0,
      rating: product.stars || product.rating || 4.5, // Prefer stars property, fallback to rating or default
      stars: product.stars || product.rating || 4.5 // Ensure both properties exist
    };
    dispatch({ type: "ADD_TO_WISHLIST", payload: { product: transformedProduct } });
  };

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" });
  };

  // Check if item is in wishlist
  const isInWishlist = (id) => {
    return state.wishlist.some(item => item.id === id);
  };

  // Get wishlist count
  const getWishlistCount = () => {
    return state.wishlist.length;
  };

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlistData", JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  return (
    <WishlistContext.Provider
      value={{
        ...state,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        getWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlistContext = () => {
  return useContext(WishlistContext);
};

export { WishlistProvider, useWishlistContext };
