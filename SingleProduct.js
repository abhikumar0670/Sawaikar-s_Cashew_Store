import styled from "styled-components";
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useProductContext } from "./context/productContext";
import FormatPrice from "./Helpers/FormatPrice";
import PageNavigation from "./components/PageNavigation";
import { Container } from "./Container";
import {TbReplace, TbTruckDelivery} from 'react-icons/tb'
import {MdSecurity} from 'react-icons/md'
import { FiHeart, FiShare2 } from 'react-icons/fi'
import { useCartContext } from "./context/cart_context";
import { useWishlistContext } from "./context/wishlist_context";
import Star from "./components/Star";
import AddToCart from "./components/AddToCart";

const SingleProduct = () => {
  const {getSingleProduct, isSingleLoading, singleProduct} = useProductContext();
  const { addToCart } = useCartContext();
const navigate = useNavigate();
const [selectedImage, setSelectedImage] = useState(0);
const [amount, setAmount] = useState(1);
const {id} = useParams();
const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistContext();
  
  // Fix: singleProduct should be an object, not an array
  const productData = singleProduct || {};
  const {
    id: productId,
    image,
    name,
    company,
    description,
    category,
    stock,
    stars,
    reviews,
    price,
  } = productData;

  useEffect(() => {
    getSingleProduct(id);
  }, [id]);

  if(isSingleLoading){
    return <div className="page_loading">Loading.....</div>
  }

  if(!productData.id) {
    return <div className="page_loading">Product not found</div>
  }
  // Calculate original price (add some markup for "MRP")
  const originalPrice = price ? Math.ceil(price * 1.2) : 0;
  const discount = originalPrice && price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // Quantity handlers
  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };

  // Wishlist handler
const handleWishlist = () => {
    if (isInWishlist(id)) {
      removeFromWishlist(id);
      console.log('Removed from wishlist');
    } else {
      addToWishlist(productData);
      console.log('Added to wishlist');
    }
  };

  // Share handler
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Check out this amazing product: ${name}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  // Enhanced product descriptions based on category
  const getEnhancedDescription = () => {
    const baseDescription = description || "Premium quality product from Sawaikar's Cashew Store.";
    
    const categoryDescriptions = {
      'cashews': `${baseDescription} Our cashews are carefully selected from the finest orchards and processed using traditional methods to preserve their natural flavor and nutritional value. Rich in healthy fats, protein, and essential minerals like magnesium and zinc. Perfect for snacking, cooking, or as a healthy addition to your meals.`,
      'nuts': `${baseDescription} These premium nuts are sourced directly from trusted farmers and undergo rigorous quality checks. Packed with essential nutrients, healthy fats, and antioxidants that support heart health and overall wellness. Ideal for daily consumption as part of a balanced diet.`,
      'dry fruits': `${baseDescription} Our dry fruits are naturally sun-dried to retain maximum nutrition and flavor. These nutrient-dense treats are rich in fiber, vitamins, and minerals. Perfect for a quick energy boost, healthy snacking, or adding natural sweetness to your recipes.`,
      'snacks': `${baseDescription} Made with the finest ingredients and traditional recipes, these snacks offer the perfect blend of taste and nutrition. Free from artificial preservatives and additives. Great for on-the-go snacking, office treats, or entertaining guests.`
    };
    
    const categoryKey = category?.toLowerCase() || 'default';
    return categoryDescriptions[categoryKey] || categoryDescriptions['nuts'];
  };

  // Add to Cart handler with navigation
  const handleAddToCart = () => {
    // Get default color (first available color or default)
    const defaultColor = productData.colors && productData.colors.length > 0 ? productData.colors[0] : "Red";
    
    // Add item to cart
    addToCart(id, defaultColor, amount, productData);
    
    // Navigate to cart page
    navigate('/cart');
  };

  return (
    <Wrapper>
      <PageNavigation title={name} />
      <Container className="container">
        <div className="product-layout">
          {/* Product Images Section */}
          <div className="product-images-section">
            <div className="image-gallery">
              <div className="thumbnail-list">
                {image && image.length > 0 && image.map((img, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${name} ${index + 1}`} />
                  </div>
                ))}
              </div>
              <div className="main-image">
                {image && image.length > 0 && (
                  <img 
                    src={image[selectedImage]} 
                    alt={name} 
                    className="featured-image"
                  />
                )}
              </div>
            </div>
            <div className="image-actions">
              <button 
                className={`action-btn ${isInWishlist(id) ? 'wishlisted' : ''}`}
                onClick={handleWishlist}
              >
                <FiHeart /> {isInWishlist(id) ? 'Added to Wishlist' : 'Add to Wishlist'}
              </button>
              <button className="action-btn" onClick={handleShare}>
                <FiShare2 /> Share
              </button>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="product-details-section">
            <div className="product-header">
              <h1 className="product-title">{name}</h1>
              <div className="product-rating">
                <Star stars={stars} reviews={reviews}/>
                <span className="review-count">({reviews} customer reviews)</span>
              </div>
            </div>

            <div className="pricing-section">
              <div className="price-container">
                <span className="current-price">
                  <FormatPrice price={price}/>
                </span>
                {originalPrice > price && (
                  <>
                    <span className="original-price">
                      MRP: <del><FormatPrice price={originalPrice}/></del>
                    </span>
                    <span className="discount-badge">{discount}% off</span>
                  </>
                )}
              </div>
              <p className="deal-text">Deal of the Day: <FormatPrice price={price}/></p>
            </div>

            <div className="product-info">
              <div className="availability-info">
                <p className={`stock-status ${stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  Available: <span>{stock > 0 ? "In Stock" : "Not Available"}</span>
                </p>
                <p>Product ID: <span>{id}</span></p>
                <p>Brand: <span>{company}</span></p>
                <p>Category: <span>{category}</span></p>
              </div>
            </div>

            <div className="product-description">
              <h3>About this item</h3>
              <p>{getEnhancedDescription()}</p>
              <ul className="product-highlights">
                <li>✅ Hand-picked and quality assured</li>
                <li>✅ Authentic product with natural taste</li>
                <li>✅ Rich in essential nutrients and healthy fats</li>
                <li>✅ Perfect for snacking and cooking</li>
                <li>✅ Hygienically packed for freshness</li>
                <li>✅ No artificial preservatives or additives</li>
              </ul>
            </div>

            <div className="product-features">
              <div className="feature-grid">
                <div className="feature-item">
                  <div className="feature-emoji">🚚</div>
                  <div>
                    <h4>Free Delivery</h4>
                    <p>On orders above ₹2000</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-emoji">🔄</div>
                  <div>
                    <h4>15 Days Replacement</h4>
                    <p>Easy returns & exchange</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-emoji">⚡</div>
                  <div>
                    <h4>Fast Delivery</h4>
                    <p>Same day delivery available</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-emoji">🛡️</div>
                  <div>
                    <h4>3 Month Warranty</h4>
                    <p>Quality guaranteed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart Section */}
            {stock > 0 && (
              <div className="add-to-cart-section">
                <div className="quantity-selector">
                  <h4>Quantity:</h4>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={setDecrease}
                      disabled={amount <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-display">{amount}</span>
                    <button 
                      className="quantity-btn"
                      onClick={setIncrease}
                      disabled={amount >= stock}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
}


const Wrapper = styled.section`
  .container {
    padding: 2rem 0;
    max-width: 140rem;
    margin: 0 auto;
  }

  .product-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  /* Image Gallery Section */
  .product-images-section {
    .image-gallery {
      display: flex;
      gap: 1rem;
      
      .thumbnail-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        
        .thumbnail {
          width: 8rem;
          height: 8rem;
          border: 2px solid transparent;
          border-radius: 0.5rem;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          
          &.active {
            border-color: ${({ theme }) => theme.colors.helper};
          }
          
          &:hover {
            border-color: ${({ theme }) => theme.colors.btn};
          }
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      
      .main-image {
        flex: 1;
        
        .featured-image {
          width: 100%;
          max-width: 50rem;
          height: auto;
          border-radius: 1rem;
          box-shadow: ${({ theme }) => theme.colors.shadowSupport};
        }
      }
    }
    
    .image-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      
      .action-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem 2rem;
        border: 1px solid ${({ theme }) => theme.colors.border};
        background: white;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1.4rem;
        
        &:hover {
          background: ${({ theme }) => theme.colors.bg};
          border-color: ${({ theme }) => theme.colors.helper};
        }
        
        &.wishlisted {
          background: ${({ theme }) => theme.colors.helper};
          color: white;
          border-color: ${({ theme }) => theme.colors.helper};
          
          &:hover {
            background: ${({ theme }) => theme.colors.btn};
            border-color: ${({ theme }) => theme.colors.btn};
          }
        }
      }
    }
  }

  /* Product Details Section */
  .product-details-section {
    .product-header {
      margin-bottom: 2rem;
      
      .product-title {
        font-size: 2.4rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.heading};
        margin-bottom: 1rem;
        line-height: 1.3;
      }
      
      .product-rating {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        
        .review-count {
          color: ${({ theme }) => theme.colors.text};
          font-size: 1.4rem;
        }
      }
    }

    .pricing-section {
      margin-bottom: 2rem;
      padding: 2rem;
      background: ${({ theme }) => theme.colors.bg};
      border-radius: 1rem;
      border: 1px solid ${({ theme }) => theme.colors.border};
      
      .price-container {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 1rem;
        
        .current-price {
          font-size: 2.8rem;
          font-weight: 700;
          color: ${({ theme }) => theme.colors.helper};
        }
        
        .original-price {
          font-size: 1.8rem;
          color: ${({ theme }) => theme.colors.text};
          
          del {
            color: #999;
          }
        }
        
        .discount-badge {
          background: #ff4d4f;
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 0.4rem;
          font-size: 1.2rem;
          font-weight: 600;
        }
      }
      
      .deal-text {
        font-size: 1.6rem;
        color: ${({ theme }) => theme.colors.btn};
        font-weight: 600;
      }
    }

    .product-info {
      margin-bottom: 2rem;
      
      .availability-info {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        
        p {
          font-size: 1.5rem;
          
          span {
            font-weight: 600;
            color: ${({ theme }) => theme.colors.heading};
          }
        }
        
        .stock-status {
          &.in-stock span {
            color: #52c41a;
          }
          
          &.out-of-stock span {
            color: #ff4d4f;
          }
        }
      }
    }

    .product-description {
      margin-bottom: 2rem;
      
      h3 {
        font-size: 1.8rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: ${({ theme }) => theme.colors.heading};
      }
      
      p {
        font-size: 1.5rem;
        line-height: 1.6;
        color: ${({ theme }) => theme.colors.text};
        margin-bottom: 1.5rem;
      }
      
      .product-highlights {
        list-style: none;
        padding: 0;
        
        li {
          font-size: 1.4rem;
          color: ${({ theme }) => theme.colors.text};
          margin-bottom: 0.8rem;
          padding-left: 0;
          
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .product-features {
      margin-bottom: 3rem;
      
      .feature-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: white;
          border: 1px solid ${({ theme }) => theme.colors.border};
          border-radius: 0.8rem;
          transition: all 0.3s ease;
          
          &:hover {
            box-shadow: ${({ theme }) => theme.colors.shadowSupport};
            border-color: ${({ theme }) => theme.colors.helper};
          }
          
          .feature-emoji {
            font-size: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 5rem;
            height: 5rem;
            background: ${({ theme }) => theme.colors.bg};
            border-radius: 50%;
            flex-shrink: 0;
          }
          
          .feature-icon {
            font-size: 2.4rem;
            color: ${({ theme }) => theme.colors.helper};
            background: ${({ theme }) => theme.colors.bg};
            padding: 1rem;
            border-radius: 50%;
          }
          
          div {
            h4 {
              font-size: 1.4rem;
              font-weight: 600;
              margin-bottom: 0.4rem;
              color: ${({ theme }) => theme.colors.heading};
            }
            
            p {
              font-size: 1.2rem;
              color: ${({ theme }) => theme.colors.text};
            }
          }
        }
      }
    }

    .add-to-cart-section {
      border-top: 1px solid ${({ theme }) => theme.colors.border};
      padding-top: 2rem;
      
      .quantity-selector {
        margin-bottom: 2rem;
        
        h4 {
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: ${({ theme }) => theme.colors.heading};
        }
        
        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0;
          border: 1px solid ${({ theme }) => theme.colors.border};
          border-radius: 0.5rem;
          overflow: hidden;
          width: fit-content;
          
          .quantity-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 4rem;
            height: 4rem;
            border: none;
            background: white;
            color: ${({ theme }) => theme.colors.text};
            font-size: 1.8rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            
            &:hover:not(:disabled) {
              background: ${({ theme }) => theme.colors.bg};
              color: ${({ theme }) => theme.colors.helper};
            }
            
            &:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }
            
            &:first-child {
              border-right: 1px solid ${({ theme }) => theme.colors.border};
            }
            
            &:last-child {
              border-left: 1px solid ${({ theme }) => theme.colors.border};
            }
          }
          
          .quantity-display {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 5rem;
            height: 4rem;
            background: ${({ theme }) => theme.colors.bg};
            font-size: 1.6rem;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.heading};
          }
        }
      }
      
      .add-to-cart-btn {
        width: 100%;
        padding: 1.5rem 2rem;
        background: ${({ theme }) => theme.colors.btn};
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-size: 1.6rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        
        &:hover {
          background: ${({ theme }) => theme.colors.helper};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      }
    }
  }

  /* Responsive Design */
  @media (max-width: ${({ theme }) => theme.media.tab}) {
    .product-layout {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .product-images-section {
      .image-gallery {
        flex-direction: column;
        
        .thumbnail-list {
          flex-direction: row;
          justify-content: center;
          order: 2;
        }
        
        .main-image {
          order: 1;
          text-align: center;
        }
      }
    }
    
    .product-details-section {
      .product-features .feature-grid {
        grid-template-columns: 1fr;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .container {
      padding: 1rem;
    }
    
    .product-layout {
      gap: 1.5rem;
    }
    
    .product-details-section {
      .product-header .product-title {
        font-size: 2rem;
      }
      
      .pricing-section {
        padding: 1.5rem;
        
        .price-container .current-price {
          font-size: 2.4rem;
        }
      }
      
      .product-features .feature-grid {
        .feature-item {
          padding: 1rem;
          
          .feature-icon {
            font-size: 2rem;
            padding: 0.8rem;
          }
        }
      }
    }
  }
`;

export default SingleProduct;









// import styled from "styled-components";
// import React from "react";
// import { useParams } from "react-router-dom";
// import FormatPrice from "./Helpers/FormatPrice";
// import PageNavigation from "./components/PageNavigation";
// import MyImage from "./components/MyImage";
// import { Container } from "./Container";
// import { TbReplace, TbTruckDelivery } from "react-icons/tb";
// import { MdSecurity } from "react-icons/md";
// import Star from "./components/Star";
// import AddToCart from "./components/AddToCart";

// import premiumImage from "./assets/premium.jpg";
// import WalnutsImage from "./assets/walnaut.jpg";
// import AlmondImage from "./assets/almond.jpg";
// import ResinsImage from "./assets/resins.jpg";
// import DriedFigsImage from "./assets/driedfigs.jpg";
// import TrailMixImage from "./assets/trailmixrecipe.jpg";
// import RoastedChickpeasImage from "./assets/RoastedChickpeas.jpg";
// import PistaImage from "./assets/pista.jpg";
// import FlavoredHoneyCashewImage from "./assets/Honey-Roasted-Cashews.jpg";
// import DatesImage from "./assets/date.jpg";
// import DryFruitsHamper from "./assets/hamper.jpg";
// import GranolaBars from "./assets/Granola-Bars.jpg";


// // Hardcoded Products
// const hardcodedProducts = [
//   {
//     id: "product1",
//     name: "Premium Cashews",
//     featured: true,
//     company: "HealthyBites",
//     price: 150000,
//     colors: ["#FF5733", "#33FF57", "#3357FF"],
//     image: premiumImage,
//     description: "High-quality premium cashews with a rich taste.",
//     category: "dry fruits",
//     stock: 10,
//     stars: 4.5,
//     reviews: 123,
//     shipping: true,
//   },
//   // Add the rest of the products...

//     // Almonds
//     {
//       id: "product2",
//       name: "Organic Almonds",
//       featured: false,
//       company: "NuttyDelight",
//       price: 120000,
//       colors: ["#FF5733", "#33FF57", "#3357FF"],  // Example colors
//       image: AlmondImage, // Replace with the actual image variable or require/import
//       description: "Fresh organic almonds packed with nutrients.",
//       category: "nuts",
//       stock: 15,
//       stars: 4.7,
//       reviews: 200,
//       shipping: true,
//     },
//     // Walnuts
//     {
//       id: "product3",
//       name: "Natural Walnuts",
//       featured: true,
//       company: "Nature's Basket",
//       price: 170000,
//       colors: ["#FF5733", "#33FF57", "#3357FF"],  // Example colors
//       image: WalnutsImage, // Replace with the actual image variable or require/import
//       description: "Rich and crunchy walnuts full of omega-3s.",
//       category: "nuts",
//       stock: 20,
//       stars: 4.6,
//       reviews: 150,
//       shipping: false,
//     },
//     // Dried Figs
//     {
//       id: "product4",
//       name: "Dried Figs",
//       featured: false,
//       company: "Fruit Harvest",
//       price: 140000,
//       colors: ["#FF5733", "#33FF57", "#3357FF"],  // Example colors
//       image: DriedFigsImage, // Replace with the actual image variable or require/import
//       description: "Sweet and chewy dried figs perfect for snacking.",
//       category: "dry fruits",
//       stock: 12,
//       stars: 4.4,
//       reviews: 180,
//       shipping: true,
//     },
    
//     // Cashew Variants
//     {
//       id: "product5",
//       name: "Dry-Dates",
//       featured: true,
//       company: "CrunchyDelight",
//       price: 160000,
//       colors: ["#FF5733", "#33FF57", "#3357FF"],  // Example colors
//       image: DatesImage, // Replace with the actual image variable or require/import
//       description: "Lightly salted roasted cashews with a crunchy texture.",
//       category: "dry-dates",
//       stock: 25,
//       stars: 4.8,
//       reviews: 220,
//       shipping: true,
//     },
//     {
//       id: "product6",
//       name: "Dry Fruits Hamper",
//       featured: false,
//       company: "NuttyFlavors",
//       price: 180000,
//       colors: ["#FF5733", "#33FF57", "#3357FF"],  // Example colors
//       image: DryFruitsHamper, // Replace with the actual image variable or require/import
//       description: "Spicy flavored cashews for an extra zing.",
//       category: "dry fruits",
//       stock: 30,
//       stars: 4.3,
//       reviews: 90,
//       shipping: false,
//     },
//     {
//       id: "product7",
//       name: "Flavored Cashews - Honey Roasted",
//       featured: true,
//       company: "NuttyFlavors",
//       price: 190000,
//       colors: ["#FF5733", "#33FF57", "#3357FF"],  // Example colors
//       image: FlavoredHoneyCashewImage, // Replace with the actual image variable or require/import
//       description: "Sweet honey-roasted cashews for a delicious treat.",
//       category: "flavored cashews",
//       stock: 40,
//       stars: 5,
//       reviews: 300,
//       shipping: true,
//     },
  
//     // Snacks
//     {
//       id: "product8",
//       name: "Trail Mix",
//       featured: true,
//       company: "HealthyBites",
//       price: 160000,
//       colors: ["#FF5733", "#33FF57", "#3357FF"],  // Example colors
//       image: TrailMixImage, // Replace with the actual image variable or require/import
//       description: "A healthy mix of nuts, seeds, and dried fruits.",
//       category: "snacks",
//       stock: 50,
//       stars: 4.7,
//       reviews: 250,
//       shipping: true,
//     },
//     {
//       id: "product9",
//       name: "Granola Bars",
//       featured: false,
//       company: "NuttyDelight",
//       price: 80000,
//       colors: ["#FF5733", "#33FF57", "#3357FF"],  // Example colors
//       image: GranolaBars, // Replace with the actual image variable or require/import
//       description: "Crunchy granola bars for a quick energy boost.",
//       category: "snacks",
//       stock: 100,
//       stars: 4.2,
//       reviews: 180,
//       shipping: true,
//     },
//     {
//       id: "product10",
//       name: "Roasted Chickpeas",
//       featured: false,
//       company: "Golden Harvest",
//       price: 100000,
//       colors: ["#FF5733", "#33FF57", "#3357FF"],  // Example colors
//       image: RoastedChickpeasImage, // Replace with the actual image variable or require/import
//       description: "Crunchy roasted chickpeas seasoned to perfection.",
//       category: "snacks",
//       stock: 60,
//       stars: 4.1,
//       reviews: 130,
//       shipping: false,
//     },
//     {
//       id: "product11",
//       name: "Pistachios",
//       featured: true,
//       company: "NuttyDelight",
//       price: 180000,
//       colors: ["#FF5733", "#33FF57", "#3357FF"],  // Example colors
//       image: PistaImage, // Replace with the actual image variable or require/import
//       description: "Fresh pistachios with a delicious crunch.",
//       category: "nuts",
//       stock: 20,
//       stars: 4.6,
//       reviews: 160,
//       shipping: false,
//     },
//     {
//       id: "product12",
//       name: "Raisins",
//       featured: false,
//       company: "Golden Harvest",
//       price: 120000,
//       colors: ["#FF5733", "#33FF57", "#3357FF"],  // Example colors
//       image: ResinsImage, // Replace with the actual image variable or require/import
//       description: "Naturally sweet raisins for a healthy snack.",
//       category: "dry fruits",
//       stock: 15,
//       stars: 4.5,
//       reviews: 140,
//       shipping: true,
//     },
// ];

// const SingleProduct = () => {
//   const { id } = useParams();

//   // Find the product by id from the hardcoded data
//   const singleProduct = hardcodedProducts.find((product) => product.id === id);

//   if (!singleProduct) {
//     return <div className="error">Product not found!</div>;
//   }

//   const {
//     id: productId,
//     image,
//     name,
//     company,
//     description,
//     category,
//     stock,
//     stars,
//     reviews,
//     price,
//   } = singleProduct;

//   return (
//     <Wrapper>
//       <PageNavigation title={name} />
//       <Container className="container">
//         <div className="grid grid-two-column">
//           {/* Product Image */}
//           <div className="product_images">
//             <MyImage imgs={image} />
//           </div>

//           {/* Product Data */}
//           <div className="product-data">
//             <h2>{name}</h2>
//             <Star stars={stars} reviews={reviews} />
//             <p>{reviews} reviews</p>
//             <p className="product-data-price">
//               MRP:{" "}
//               <del>
//                 <FormatPrice price={price + 250} />
//               </del>
//             </p>
//             <p className="product-data-price product-data-real-price">
//               Deal of the Day: <FormatPrice price={price} />
//             </p>
//             <p>{description}</p>
//             <div className="product-data-warranty">
//               <div className="product-warranty-data">
//                 <TbTruckDelivery className="warranty-icon" />
//                 <p>Free Delivery</p>
//               </div>
//               <div className="product-warranty-data">
//                 <TbReplace className="warranty-icon" />
//                 <p>15 Days Replacement</p>
//               </div>
//               <div className="product-warranty-data">
//                 <TbTruckDelivery className="warranty-icon" />
//                 <p>Product Delivered</p>
//               </div>
//               <div className="product-warranty-data">
//                 <MdSecurity className="warranty-icon" />
//                 <p>3 Month Warranty</p>
//               </div>
//             </div>
//             <div className="product-data-info">
//               <p>
//                 Available: <span>{stock > 0 ? "In Stock" : "Not Available"}</span>
//               </p>
//               <p>
//                 ID: <span>{productId}</span>
//               </p>
//               <p>
//                 Brand: <span>{company}</span>
//               </p>
//             </div>
//             <hr />
//             {stock > 0 && <AddToCart product={singleProduct} />}
//           </div>
//         </div>
//       </Container>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.section`
//   .container {
//     padding: 9rem 0;
//   }
//   .product_images {
//     display: flex;
//     align-items: center;
//   }
//   .product-data {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: center;
//     gap: 2rem;

//     .product-data-warranty {
//       width: 100%;
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       border-bottom: 1px solid #ccc;
//       margin-bottom: 1rem;

//       .product-warranty-data {
//         text-align: center;

//         .warranty-icon {
//           background-color: rgba(220, 220, 220, 0.5);
//           border-radius: 50%;
//           width: 4rem;
//           height: 4rem;
//           padding: 0.6rem;
//         }
//         p {
//           font-size: 1.4rem;
//           padding-top: 0.4rem;
//         }
//       }
//     }

//     .product-data-price {
//       font-weight: bold;
//     }
//     .product-data-real-price {
//       color: ${({ theme }) => theme.colors.btn};
//     }
//     .product-data-info {
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       font-size: 1.8rem;

//       span {
//         font-weight: bold;
//       }
//     }

//     hr {
//       max-width: 100%;
//       width: 90%;
//       border: 0.1rem solid #000;
//       color: red;
//     }
//   }

//   @media (max-width: ${({ theme }) => theme.media.mobile}) {
//     padding: 0 2.4rem;
//   }
// `;

// export default SingleProduct;





// import styled from "styled-components";
// import React from "react";
// import { useParams } from "react-router-dom";
// import FormatPrice from "./Helpers/FormatPrice";
// import PageNavigation from "./components/PageNavigation";
// import MyImage from "./components/MyImage";
// import { Container } from "./Container";
// import { TbReplace, TbTruckDelivery } from "react-icons/tb";
// import { MdSecurity } from "react-icons/md";
// import Star from "./components/Star";
// import AddToCart from "./components/AddToCart";

// // Local Cashew Data
// const products = [
//   {
//     id: "product1",
//     name: "Premium Cashews",
//     price: 80000,
//     image: [
//       "/images/premium.jpg",
//       "/images/cashew1-2.jpg",
//       "/images/cashew1-3.jpg",
//     ],
//     description: "High-quality premium cashews, perfect for snacks and recipes.",
//     stock: 20,
//     stars: 4.7,
//     reviews: 50,
//     company: "Organic Harvest",
//     category: "Dry Fruits",
//   },
//   {
//     id: "cashew2",
//     name: "Roasted Cashews",
//     price: 75000,
//     image: [
//       "/images/cashew2-1.jpg",
//       "/images/cashew2-2.jpg",
//       "/images/cashew2-3.jpg",
//     ],
//     description: "Deliciously roasted cashews with a hint of salt.",
//     stock: 15,
//     stars: 4.5,
//     reviews: 40,
//     company: "Nut Delight",
//     category: "Snacks",
//   },
// ];

// const SingleProduct = () => {
//   const { id } = useParams(); // Get product ID from the route
//   const singleProduct = products.find((product) => product.id === id); // Find product by ID

//   if (!singleProduct) {
//     return <div className="page_loading">Product not found.</div>;
//   }

//   const {
//     id: productId,
//     image,
//     name,
//     company,
//     description,
//     stock,
//     stars,
//     reviews,
//     price,
//   } = singleProduct;

//   return (
//     <Wrapper>
//       <PageNavigation title={name} />
//       <Container className="container">
//         <div className="grid grid-two-column">
//           {/* Product Image */}
//           <div className="premium.jpg">
//             <MyImage imgs={image} />
//           </div>
//           {/* Product data */}
//           <div className="product-data">
//             <h2>{name}</h2>
//             <Star stars={stars} reviews={reviews} />
//             <p>{reviews} reviews</p>
//             <p className="product-data-price">
//               MRP:
//               <del>
//                 <FormatPrice price={price + 5000} />
//               </del>
//             </p>
//             <p className="product-data-price product-data-real-price">
//               Deal of the Day: <FormatPrice price={price} />
//             </p>
//             <p>{description}</p>
//             <div className="product-data-warranty">
//               <div className="product-warranty-data">
//                 <TbTruckDelivery className="warranty-icon" />
//                 <p>Free Delivery</p>
//               </div>
//               <div className="product-warranty-data">
//                 <TbReplace className="warranty-icon" />
//                 <p>15 Days Replacement</p>
//               </div>
//               <div className="product-warranty-data">
//                 <TbTruckDelivery className="warranty-icon" />
//                 <p>Product Delivered</p>
//               </div>
//               <div className="product-warranty-data">
//                 <MdSecurity className="warranty-icon" />
//                 <p>3 Month Warranty</p>
//               </div>
//             </div>
//             <div className="product-data-info">
//               <p>
//                 Available: <span>{stock > 0 ? "In Stock" : "Not Available"}</span>
//               </p>
//               <p>ID : <span> {productId} </span></p>
//               <p>Brand : <span> {company} </span></p>
//             </div>
//             <hr />
//             {stock > 0 && <AddToCart product={singleProduct} />}
//           </div>
//         </div>
//       </Container>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.section`
//   .container {
//     padding: 9rem 0;
//   }
//   .product_images {
//     display: flex;
//     align-items: center;
//   }
//   .product-data {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: center;
//     gap: 2rem;

//     .product-data-warranty {
//       width: 100%;
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       border-bottom: 1px solid #ccc;
//       margin-bottom: 1rem;

//       .product-warranty-data {
//         text-align: center;

//         .warranty-icon {
//           background-color: rgba(220, 220, 220, 0.5);
//           border-radius: 50%;
//           width: 4rem;
//           height: 4rem;
//           padding: 0.6rem;
//         }
//         p {
//           font-size: 1.4rem;
//           padding-top: 0.4rem;
//         }
//       }
//     }

//     .product-data-price {
//       font-weight: bold;
//     }
//     .product-data-real-price {
//       color: ${({ theme }) => theme.colors.btn};
//     }
//     .product-data-info {
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       font-size: 1.8rem;

//       span {
//         font-weight: bold;
//       }
//     }

//     hr {
//       max-width: 100%;
//       width: 90%;
//       border: 0.1rem solid #000;
//       color: red;
//     }
//   }

//   @media (max-width: ${({ theme }) => theme.media.mobile}) {
//     padding: 0 2.4rem;
//   }
// `;

// export default SingleProduct;









// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const SingleProduct = () => {
//   const [product, setProduct] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
//         setProduct(response.data);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="product-container">
//       <div className="product-image">
//         <img src={product.image} alt={product.title} />
//       </div>
//       <div className="product-details">
//         <h2>{product.title}</h2>
//         <p className="product-price">${product.price}</p>
//         <p className="product-description">{product.description}</p>
//         <button className="add-to-cart">Add to Cart</button>
//       </div>
//     </div>
//   );
// };

// export default SingleProduct;
