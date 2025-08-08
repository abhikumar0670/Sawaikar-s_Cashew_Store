import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../Reducer/productReducer";

const AppContext = createContext();

// const API = "https://api.pujakaitem.com/api/products";
const API = "https://sheetdb.io/api/v1/v58gh3olczv6i"
// const API = "https://api.freeapi.app/api/v1/public/randomproducts"

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      let rawProducts = res.data;
      
      console.log('Raw API Response:', rawProducts); // Debug log
      console.log('Number of products received:', rawProducts?.length);
      
      // SheetDB returns an array directly
      if (!Array.isArray(rawProducts)) {
        console.error('API did not return an array:', rawProducts);
        dispatch({ type: "API_ERROR" });
        return;
      }
      
      // Process the products to handle the API format
      const products = rawProducts.map(product => {
        // Process images string into array
        if (product.image && typeof product.image === 'string') {
          product.image = product.image.split(',');
        } else if (!product.image) {
          product.image = ["./images/premium.jpg"];
        }
        
        // Convert colors string into array if needed
        if (product.colors && typeof product.colors === 'string') {
          product.colors = product.colors.split(',');
        } else if (!product.colors) {
          product.colors = ["#F5DEB3", "#DEB887"];
        }
        
        // Convert price to number
        if (product.price) {
          product.price = parseInt(product.price);
        }
        
        // Convert stock to number
        if (product.stock) {
          product.stock = parseInt(product.stock);
        } else {
          product.stock = 50;
        }
        
        // Convert reviews to number
        if (product.reviews) {
          product.reviews = parseInt(product.reviews);
        } else {
          product.reviews = Math.floor(Math.random() * 200) + 10;
        }
        
        // Convert stars to number
        if (product.stars) {
          product.stars = parseFloat(product.stars);
        } else {
          product.stars = (Math.random() * 2 + 3).toFixed(1); // Random between 3.0-5.0
        }
        
        // Convert shipping string to boolean
        if (product.shipping) {
          product.shipping = product.shipping === "TRUE" || product.shipping === true;
        } else {
          product.shipping = true;
        }
        
        // Convert featured string to boolean
        if (product.featured) {
          product.featured = product.featured === "TRUE" || product.featured === true;
        } else {
          product.featured = false;
        }
        
        // Ensure required fields
        if (!product.company) product.company = "Sawaikar's";
        if (!product.description) product.description = "Premium quality cashews from Goa.";
        if (!product.category) product.category = "cashews";
        
        // Special handling for hampers - convert "Dry Fruits Hamper" to hampers category and mark as featured
        if (product.name && product.name.toLowerCase().includes('hamper')) {
          product.category = "hampers";
          product.featured = true; // Ensure hampers are featured
        }
        
        return product;
      });
      
      console.log('Processed products:', products.length);
      console.log('Sample processed product:', products[0]);
      
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      console.error('API Error:', error);
      dispatch({ type: "API_ERROR" });
    }
  };

  // my 2nd api call for single product

  const getSingleProduct = async (productId) => {
    console.log('getSingleProduct called with productId:', productId);
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(API);
      const products = await res.data;
      console.log('Available product IDs:', products.map(p => p.id));
      const singleProduct = products.find(product => product.id === productId);
      console.log('Found singleProduct:', singleProduct);
      
      if (singleProduct) {
        // Process the images string into an array
        if (singleProduct.image && typeof singleProduct.image === 'string') {
          singleProduct.image = singleProduct.image.split(',');
        }
        // Convert colors string into an array if needed
        if (singleProduct.colors && typeof singleProduct.colors === 'string') {
          singleProduct.colors = singleProduct.colors.split(',');
        }
        // Convert price to number
        if (singleProduct.price) {
          singleProduct.price = parseInt(singleProduct.price);
        }
        dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
      } else {
        dispatch({ type: "SET_SINGLE_ERROR" });
      }
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };









// import { createContext, useContext, useEffect, useReducer } from "react";
// import reducer from "../Reducer/productReducer";
// import premiumImage from "../assets/premium.jpg";
// import WalnutsImage from "../assets/walnaut.jpg";
// import AlmondImage from "../assets/almond.jpg";
// import ResinsImage from "../assets/resins.jpg";
// import DriedFigsImage from "../assets/driedfigs.jpg";
// import TrailMixImage from "../assets/trailmixrecipe.jpg";
// import RoastedChickpeasImage from "../assets/RoastedChickpeas.jpg";
// import PistaImage from "../assets/pista.jpg";
// import FlavoredHoneyCashewImage from "../assets/Honey-Roasted-Cashews.jpg";
// import DatesImage from "../assets/date.jpg";
// import DryFruitsHamper from "../assets/hamper.jpg";
// import GranolaBars from "../assets/Granola-Bars.jpg";

// const AppContext = createContext();

// const initialState = {
//   isLoading: false,
//   isError: false,
//   products: [],
//   featureProducts: [],
//   isSingleLoading: false,
//   singleProduct: {},
// };

// // Shared colors (total of 5 unique colors)
// const sharedColors = ["#FFF8DC", "#D2B48C", "#8B4513", "#FFD700", "#98FB98"];

// // Hardcoded product data
// const hardcodedProducts = [
//   // Dry Fruits
//   {
//     id: "product1",
//     name: "Premium Cashews",
//     featured: true,
//     company: "HealthyBites",
//     price: 150000,
//     colors: sharedColors,
//     // image: "premium.jpg",
//     image: premiumImage,
//     description: "High-quality premium cashews with a rich taste.",
//     category: "dry fruits",
//     shipping: true,
//   },
//   {
//     id: "product2",
//     name: "Organic Almonds",
//     featured: false,
//     company: "NuttyDelight",
//     price: 120000,
//     colors: sharedColors,
//     image: AlmondImage,
//     description: "Fresh organic almonds packed with nutrients.",
//     category: "nuts",
//     shipping: true,
//   },
//   {
//     id: "product3",
//     name: "Natural Walnuts",
//     featured: true,
//     company: "Nature's Basket",
//     price: 170000,
//     colors: sharedColors,
//     image: WalnutsImage,
//     description: "Rich and crunchy walnuts full of omega-3s.",
//     category: "nuts",
//     shipping: false,
//   },
//   {
//     id: "product4",
//     name: "Dried Figs",
//     featured: false,
//     company: "Fruit Harvest",
//     price: 140000,
//     colors: sharedColors,
//     image: DriedFigsImage,
//     description: "Sweet and chewy dried figs perfect for snacking.",
//     category: "dry fruits",
//     shipping: true,
//   },

//   // Cashew Variants
//   {
//     id: "product5",
//     name: "Dry-Dates",
//     featured: true,
//     company: "CrunchyDelight",
//     price: 160000,
//     colors: sharedColors,
//     image: DatesImage,
//     description: "Lightly salted roasted cashews with a crunchy texture.",
//     category: "dry-dates",
//     shipping: true,
//   },
//   {
//     id: "product6",
//     name: "Dry Fruits Hamper",
//     featured: false,
//     company: "NuttyFlavors",
//     price: 180000,
//     colors: sharedColors,
//     image: DryFruitsHamper,
//     description: "Spicy flavored cashews for an extra zing.",
//     category: "dry fruits",
//     shipping: false,
//   },
//   {
//     id: "product7",
//     name: "Flavored Cashews - Honey Roasted",
//     featured: true,
//     company: "NuttyFlavors",
//     price: 190000,
//     colors: sharedColors,
//     image: FlavoredHoneyCashewImage,
//     description: "Sweet honey-roasted cashews for a delicious treat.",
//     category: "flavored cashews",
//     shipping: true,
//   },

//   // Snacks
//   {
//     id: "product8",
//     name: "Trail Mix",
//     featured: true,
//     company: "HealthyBites",
//     price: 160000,
//     colors: sharedColors,
//     image: TrailMixImage,
//     description: "A healthy mix of nuts, seeds, and dried fruits.",
//     category: "snacks",
//     shipping: true,
//   },
//   {
//     id: "product9",
//     name: "Granola Bars",
//     featured: false,
//     company: "NuttyDelight",
//     price: 80000,
//     colors: sharedColors,
//     image: GranolaBars,
//     description: "Crunchy granola bars for a quick energy boost.",
//     category: "snacks",
//     shipping: true,
//   },
//   {
//     id: "product10",
//     name: "Roasted Chickpeas",
//     featured: false,
//     company: "Golden Harvest",
//     price: 100000,
//     colors: sharedColors,
//     image: RoastedChickpeasImage,
//     description: "Crunchy roasted chickpeas seasoned to perfection.",
//     category: "snacks",
//     shipping: false,
//   },
//   {
//     id: "product11",
//     name: "Pistachios",
//     featured: true,
//     company: "NuttyDelight",
//     price: 180000,
//     colors: sharedColors,
//     image: PistaImage,
//     description: "Fresh pistachios with a delicious crunch.",
//     category: "nuts",
//     shipping: false,
//   },
//   {
//     id: "product12",
//     name: "Raisins",
//     featured: false,
//     company: "Golden Harvest",
//     price: 120000,
//     colors: sharedColors,
//     image: ResinsImage,
//     description: "Naturally sweet raisins for a healthy snack.",
//     category: "dry fruits",
//     shipping: true,
//   },
// ];

// const AppProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   // Fetch all products
//   const getProducts = async () => {
//     dispatch({ type: "SET_LOADING" });
//     try {
//       // Simulating API call with hardcoded data
//       const products = hardcodedProducts;
//       dispatch({ type: "SET_API_DATA", payload: products });
//     } catch (error) {
//       dispatch({ type: "API_ERROR" });
//     }
//   };

//   // Fetch a single product by ID
//   const getSingleProduct = async (productId) => {
//     dispatch({ type: "SET_SINGLE_LOADING" });
//     try {
//       // Simulating API call with hardcoded data
//       const singleProduct = hardcodedProducts.find((item) => item.id === productId);
//       if (singleProduct) {
       
//         dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
//       } else {
//         throw new Error("Product not found");
      
//       }
//     } catch (error) {
//       dispatch({ type: "SET_SINGLE_ERROR" });
//       console.log("here");
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);

//   return (
//     <AppContext.Provider value={{ ...state, getSingleProduct }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// // Custom hooks
// const useProductContext = () => {
//   return useContext(AppContext);
// };

// export { AppProvider, AppContext, useProductContext };
