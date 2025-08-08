import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import About from "./About";
import Home from "./Home";
import Products from "./Products";
import Contact from './Contact'
import Cart from "./Cart";
import OrderConfirmation from './OrderConfirmation';
import SingleProduct from './SingleProduct'
import Login from './Login';
import Register from './Register';
import Orders from './Orders';
import Wishlist from './Wishlist';
import FAQ from './FAQ';
import Payment from './Payment';
import Error from "./Error";
import Profile from './Profile';
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GoToTop from "./components/GoToTop";
import TawkToChat from "./components/TawkToChat";
import "./styles/WidgetPositioning.css";

const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#D2691E", // Warm cashew orange

      bg: "#FFF8DC", // Cornsilk - warm cream color like cashews
      footer_bg: "#8B4513", // Saddle brown - earthy cashew brown
      btn: "#CD853F", // Peru - warm cashew color
      border: "rgba(205, 133, 63, 0.5)", // Peru with transparency
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(210, 180, 140) 0%, rgb(245, 222, 179) 100%)", // Cashew gradient
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <GlobalStyle/>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
  <Route path="/orders" element={<Orders/>}/>
  <Route path="/wishlist" element={<Wishlist/>}/>
  <Route path="/faq" element={<FAQ/>}/>
  <Route path="/profile" element={<Profile/>}/>
      {/* <Route path="/singleproduct/:id" element={<SingleProduct/>}/> */}
      <Route path="/singleproduct/:id" element={<SingleProduct />} />

      <Route path="/cart" element={<Cart/>}/>
      <Route path="/payment" element={<Payment/>}/>
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="*" element={<Error/>}/>
    </Routes>
    <GoToTop />
    <TawkToChat />
    <Footer/>
    </BrowserRouter>
    </ThemeProvider>
  );
}; 

export default App;
