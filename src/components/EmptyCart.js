// import React from "react";
// import cartgif from "../assets/cartGif.gif"; // Ensure the correct path
// import "../styles/BestSellers.css"; // Ensure this CSS file exists and is linked

// const EmptyCart = () => {
//   return (
//     <div className="emptyCartMainParent text-center relative top-20 h-full">
//       <div id="fs">
//         <p className="text-3xl fof uppercase" id="fs">
//           <h1>Cart Is Empty</h1>
//         </p>
//       </div>
//       <img src={cartgif} alt="Empty Cart" className="absolute cg" />
//     </div>
//   );
// };

// export default EmptyCart;



import React from "react";
import cartgif from "../assets/cartGif.gif"; // Ensure the correct path
import "../styles/BestSellers.css"; // Ensure this CSS file exists and is linked

const EmptyCart = () => {
  return (
    <div className="emptyCartMainParent">
      <div id="fs">
        <h1 className="text-3xl fof uppercase">Cart Is Empty</h1>
      </div>
      <img src={cartgif} alt="Empty Cart" className="cg" />
    </div>
  );
};

export default EmptyCart;
