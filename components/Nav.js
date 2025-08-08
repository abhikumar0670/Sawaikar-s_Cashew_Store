// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import styled from "styled-components";
// import { FiShoppingCart } from "react-icons/fi";
// import { CgMenu, CgClose } from "react-icons/cg";
// import { useCartContext } from "../context/cart_context";
// import { useAuth0 } from "@auth0/auth0-react";
// import { Button } from "../styles/Button";

// const Nav = () => {
//   const [menuIcon, setMenuIcon] = useState();
//   const { total_item } = useCartContext();
//   const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

//   const Nav = styled.nav`
//     .navbar-lists {
//       display: flex;
//       gap: 4.8rem;
//       align-items: center;

//       .navbar-link {
//         &:link,
//         &:visited {
//           display: inline-block;
//           text-decoration: none;
//           font-size: 1.8rem;
//           font-weight: 500;
//           text-transform: uppercase;
//           color: ${({ theme }) => theme.colors.black};
//           transition: color 0.3s linear;
//         }

//         &:hover,
//         &:active {
//           color: ${({ theme }) => theme.colors.helper};
//         }
//       }
//     }

//     .mobile-navbar-btn {
//       display: none;
//       background-color: transparent;
//       cursor: pointer;
//       border: none;
//     }

//     .mobile-nav-icon[name="close-outline"] {
//       display: none;
//     }

//     .close-outline {
//       display: none;
//     }

//     .cart-trolley--link {
//       position: relative;

//       .cart-trolley {
//         position: relative;
//         font-size: 3.2rem;
//       }

//       .cart-total--item {
//         width: 2.4rem;
//         height: 2.4rem;
//         position: absolute;
//         background-color: #000;
//         color: #000;
//         border-radius: 50%;
//         display: grid;
//         place-items: center;
//         top: -20%;
//         left: 70%;
//         background-color: ${({ theme }) => theme.colors.helper};
//       }
//     }

//     .user-login--name {
//       text-transform: capitalize;
//     }

//     .user-logout,
//     .user-login {
//       font-size: 1.4rem;
//       padding: 0.8rem 1.4rem;
//     }

//     @media (max-width: ${({ theme }) => theme.media.mobile}) {
//       .mobile-navbar-btn {
//         display: inline-block;
//         z-index: 9999;
//         border: ${({ theme }) => theme.colors.black};

//         .mobile-nav-icon {
//           font-size: 4.2rem;
//           color: ${({ theme }) => theme.colors.black};
//         }
//       }

//       .active .mobile-nav-icon {
//         display: none;
//         font-size: 4.2rem;
//         position: absolute;
//         top: 30%;
//         right: 10%;
//         color: ${({ theme }) => theme.colors.black};
//         z-index: 9999;
//       }

//       .active .close-outline {
//         display: inline-block;
//       }

//       .navbar-lists {
//         width: 100vw;
//         height: 100vh;
//         position: absolute;
//         top: 0;
//         left: 0;
//         background-color: #fff;

//         display: flex;
//         justify-content: center;
//         align-items: center;
//         flex-direction: column;

//         visibility: hidden;
//         opacity: 0;
//         transform: translateX(100%);
//         /* transform-origin: top; */
//         transition: all 3s linear;
//       }

//       .active .navbar-lists {
//         visibility: visible;
//         opacity: 1;
//         transform: translateX(0);
//         z-index: 999;
//         transform-origin: right;
//         transition: all 3s linear;

//         .navbar-link {
//           font-size: 4.2rem;
//         }
//       }
//       .cart-trolley--link {
//         position: relative;

//         .cart-trolley {
//           position: relative;
//           font-size: 5.2rem;
//         }

//         .cart-total--item {
//           width: 4.2rem;
//           height: 4.2rem;
//           font-size: 2rem;
//         }
//       }

//       .user-logout,
//       .user-login {
//         font-size: 2.2rem;
//         padding: 0.8rem 1.4rem;
//       }
//     }
//   `;

//   return (
//     <Nav>
//       <div className={menuIcon ? "navbar active" : "navbar"}>
//         <ul className="navbar-lists">
//           <li>
//             <NavLink
//               to="/"
//               className="navbar-link "
//               onClick={() => setMenuIcon(false)}>
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/about"
//               className="navbar-link "
//               onClick={() => setMenuIcon(false)}>
//               About
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/products"
//               className="navbar-link "
//               onClick={() => setMenuIcon(false)}>
//               Products
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/contact"
//               className="navbar-link "
//               onClick={() => setMenuIcon(false)}>
//               Contact
//             </NavLink>
//           </li>
//           {isAuthenticated && <p>{user.name}</p>}

//           {isAuthenticated ? (
//             <li>
//               <Button
//                 onClick={() => logout({ returnTo: window.location.origin })}>
//                 Log Out
//               </Button>
//             </li>
//           ) : (
//             <li>
//               <Button onClick={() => loginWithRedirect()}>Log In</Button>
//             </li>
//           )}

//           <li>
//             <NavLink to="/cart" className="navbar-link cart-trolley--link">
//               <FiShoppingCart className="cart-trolley" />
//               <span className="cart-total--item"> {total_item} </span>
//             </NavLink>
//           </li>
//         </ul>

//         {/* two button for open and close of menu */}
//         <div className="mobile-navbar-btn">
//           <CgMenu
//             name="menu-outline"
//             className="mobile-nav-icon"
//             onClick={() => setMenuIcon(true)}
//           />
//           <CgClose
//             name="close-outline"
//             className="mobile-nav-icon close-outline"
//             onClick={() => setMenuIcon(false)}
//           />
//         </div>
//       </div>
//     </Nav>
//   );
// };

// export default Nav;







// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import styled from "styled-components";
// import { FiShoppingCart } from "react-icons/fi";
// import { CgMenu, CgClose } from "react-icons/cg";
// import { useCartContext } from "../context/cart_context";
// import { useAuth0 } from "@auth0/auth0-react";
// import { Button } from "../styles/Button";

// const Nav = () => {
// const [menuIcon, setMenuIcon] = useState(false);
// const [showLoginModal, setShowLoginModal] = useState(false);

// const { total_item } = useCartContext();
// const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

// const Nav = styled.nav`
// .navbar-lists {
// display: flex;
// gap: 4.8rem;
// align-items: center;

// .navbar-link {
// &:link,
// &:visited {
// display: inline-block;
// text-decoration: none;
// font-size: 1.8rem;
// font-weight: 500;
// text-transform: uppercase;
// color: ${({ theme }) => theme.colors.black};
//  transition: color 0.3s linear;
// }

//  &:hover,
//  &:active {
//  color: ${({ theme }) => theme.colors.helper};
//  }
//  }
// }

// .mobile-navbar-btn {
//  display: none;
// background-color: transparent;
// cursor: pointer;
//  border: none;
// }

// .cart-trolley--link {
//  position: relative;

//  .cart-trolley {
// font-size: 3.2rem;
// }

// .cart-total--item {
//  width: 2.4rem;
//  height: 2.4rem;
//  position: absolute;
//  background-color: ${({ theme }) => theme.colors.helper};
//  border-radius: 50%;
//  display: grid;
//  place-items: center;
//  top: -20%;
//  left: 70%;
// }
//  }

// .login-modal {
//  position: fixed;
//  top: 0;
//  left: 0;
//  width: 100%;
//  height: 100%;
//  background: rgba(0, 0, 0, 0.6);
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  z-index: 1000;
//  .modal-content {
//   background: #fff;
//   padding: 2rem;
//   border-radius: 0.5rem;
//   width: 90%;
//   max-width: 400px;
//   text-align: center;
//   h2 {
//    margin-bottom: 1.5rem;
//   }
//   form {
//    display: flex;
//    flex-direction: column;
//    gap: 1rem;
//    input {
//     padding: 0.8rem;
//     border: 1px solid #ccc;
//     border-radius: 0.4rem;
//    }

//  button {
//   padding: 0.8rem;
//   background-color: ${({ theme }) => theme.colors.helper};
//   color: white;
//   border: none;
//   border-radius: 0.4rem;
//   cursor: pointer;
//  }
//  }

//  .close-modal {
//   margin-top: 1rem;
//   color: ${({ theme }) => theme.colors.black};
//   cursor: pointer;
//  }
//  }
//   }
// `;

//  return (
//  <Nav>
//   <div className={menuIcon ? "navbar active" : "navbar"}>
//  <ul className="navbar-lists">
//  <li>
//   <NavLink
//    to="/"
//    className="navbar-link"
//    onClick={() => setMenuIcon(false)}
//   >
//    Home
//   </NavLink>
//  </li>
//  <li>
//   <NavLink
//    to="/about"
//    className="navbar-link"
//    onClick={() => setMenuIcon(false)}
//   >
//    About
//   </NavLink>
//  </li>
//  <li>
//   <NavLink
//    to="/products"
//    className="navbar-link"
//    onClick={() => setMenuIcon(false)}
//   >
//    Products
//   </NavLink>
//  </li>
//  <li>
//   <NavLink
//    to="/contact"
//    className="navbar-link"
//    onClick={() => setMenuIcon(false)}
//   >
//    Contact
//   </NavLink>
//  </li>
//  {isAuthenticated && <p>{user.name}</p>}

//  {isAuthenticated ? (
//   <li>
//    <Button
//     onClick={() => logout({ returnTo: window.location.origin })}
//    >
//     Log Out
//    </Button>
//   </li>
//  ) : (
//   <li>
//    <Button onClick={() => setShowLoginModal(true)}>Log In</Button>
//   </li>
//  )}

//  <li>
//   <NavLink to="/cart" className="navbar-link cart-trolley--link">
//    <FiShoppingCart className="cart-trolley" />
//    <span className="cart-total--item">{total_item}</span>
//   </NavLink>
//  </li>
//  </ul>


//  <CgMenu
//   name="menu-outline"
//   className="mobile-nav-icon"
//   onClick={() => setMenuIcon(true)}
//  />
//  <CgClose
//   name="close-outline"
//   className="mobile-nav-icon close-outline"
//   onClick={() => setMenuIcon(false)}
//  />
//  </div>
//  {/* </div> */}

//  {/* Login Modal */}
//  {showLoginModal && (
//   <div className="login-modal">
//   <div className="modal-content">
//   <h2>Login</h2>
//   <form
//  onSubmit={(e) => {
//    e.preventDefault();
//    loginWithRedirect(); // Call Auth0 login
//    }}
//   >
//    <input type="text" placeholder="Email" required />
//    <input type="password" placeholder="Password" required />
//    <button type="submit">Log In</button>
//   </form>
//   <span
//    className="close-modal"
//    onClick={() => setShowLoginModal(false)}
//   >
//    Close
//   </span>
//   </div>
//   </div>
//  )}
//   </Nav>
//  );
// };

// export default Nav;










import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart, FiUser, FiHeart, FiPackage, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useCartContext } from "../context/cart_context";
import { useWishlistContext } from "../context/wishlist_context";
import { useAuth } from "../context/auth_context";
import EditProfile from "./EditProfile";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const { total_item } = useCartContext();
  const { getWishlistCount } = useWishlistContext();
  const { logout, isAuthenticated, user } = useAuth();
  
  const wishlistCount = getWishlistCount();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const StyledNav = styled.nav`
    position: relative;
    
    /* Desktop Navigation */
    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 2rem;
      
      .nav-links {
        display: flex;
        gap: 2rem;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
        
        .nav-link {
          text-decoration: none;
          color: ${({ theme }) => theme.colors.black};
          font-size: 1.6rem;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 0.4rem;
          transition: all 0.3s ease;
          
          &:hover {
            background-color: ${({ theme }) => theme.colors.helper};
            color: white;
          }
        }
      }
      
      .nav-actions {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        
        .cart-link {
          position: relative;
          text-decoration: none;
          color: ${({ theme }) => theme.colors.black};
          
          .cart-icon {
            font-size: 2.4rem;
            transition: color 0.3s ease;
          }
          
          &:hover .cart-icon {
            color: ${({ theme }) => theme.colors.helper};
          }
          
          .cart-badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background: ${({ theme }) => theme.colors.helper};
            color: white;
            border-radius: 50%;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            font-weight: bold;
          }
        }
        
        .profile-container {
          position: relative;
          
          .profile-trigger {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            padding: 0.8rem 1.2rem;
            background: transparent;
            border: 1px solid #ddd;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            
            &:hover {
              background: #f8f9fa;
              border-color: ${({ theme }) => theme.colors.helper};
            }
            
            .profile-pic {
              width: 3rem;
              height: 3rem;
              border-radius: 50%;
              object-fit: cover;
            }
            
            .profile-info {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              
              .greeting {
                font-size: 1.2rem;
                color: #666;
                margin: 0;
              }
              
              .name {
                font-size: 1.4rem;
                font-weight: 600;
                color: ${({ theme }) => theme.colors.black};
                margin: 0;
                text-transform: capitalize;
              }
            }
            
            .user-icon {
              font-size: 2.4rem;
              color: ${({ theme }) => theme.colors.black};
            }
          }
          
          .profile-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 0.8rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            min-width: 280px;
            z-index: 1000;
            opacity: ${props => props.isProfileOpen ? '1' : '0'};
            visibility: ${props => props.isProfileOpen ? 'visible' : 'hidden'};
            transform: translateY(${props => props.isProfileOpen ? '0' : '-10px'});
            transition: all 0.3s ease;
            
            .profile-header {
              padding: 1.5rem;
              border-bottom: 1px solid #eee;
              
              .user-details {
                display: flex;
                align-items: center;
                gap: 1rem;
                
                .user-avatar {
                  width: 5rem;
                  height: 5rem;
                  border-radius: 50%;
                  object-fit: cover;
                }
                
                .user-info {
                  .user-name {
                    font-size: 1.8rem;
                    font-weight: 600;
                    margin: 0 0 0.3rem 0;
                    color: ${({ theme }) => theme.colors.black};
                  }
                  
                  .user-email {
                    font-size: 1.3rem;
                    color: #666;
                    margin: 0;
                  }
                }
              }
              
              .edit-profile-btn {
                width: 100%;
                margin-top: 1rem;
                padding: 0.8rem;
                background: ${({ theme }) => theme.colors.helper};
                color: white;
                border: none;
                border-radius: 0.4rem;
                font-size: 1.3rem;
                cursor: pointer;
                transition: background 0.3s ease;
                
                &:hover {
                  background: ${({ theme }) => theme.colors.btn};
                }
              }
            }
            
            .profile-menu {
              .menu-section {
                padding: 1rem 0;
                border-bottom: 1px solid #eee;
                
                &:last-child {
                  border-bottom: none;
                }
                
                .menu-item {
                  display: flex;
                  align-items: center;
                  gap: 1rem;
                  padding: 1rem 1.5rem;
                  text-decoration: none;
                  color: ${({ theme }) => theme.colors.black};
                  font-size: 1.4rem;
                  transition: background 0.3s ease;
                  
                  &:hover {
                    background: #f8f9fa;
                  }
                  
                  .menu-icon {
                    font-size: 1.8rem;
                    color: #666;
                  }
                  
                  .menu-text {
                    .title {
                      font-weight: 500;
                      margin: 0;
                    }
                    
                    .subtitle {
                      font-size: 1.2rem;
                      color: #888;
                      margin: 0;
                    }
                  }
                  
                  .badge {
                    margin-left: auto;
                    background: #ff4757;
                    color: white;
                    padding: 0.2rem 0.6rem;
                    border-radius: 1rem;
                    font-size: 1rem;
                    font-weight: bold;
                  }
                }
                
                .logout-btn {
                  width: 100%;
                  display: flex;
                  align-items: center;
                  gap: 1rem;
                  padding: 1rem 1.5rem;
                  background: none;
                  border: none;
                  color: #e74c3c;
                  font-size: 1.4rem;
                  cursor: pointer;
                  transition: background 0.3s ease;
                  
                  &:hover {
                    background: #fff5f5;
                  }
                  
                  .menu-icon {
                    font-size: 1.8rem;
                  }
                }
                
                .signin-button {
                  width: 100%;
                  display: flex;
                  align-items: center;
                  gap: 1rem;
                  padding: 1.2rem 1.5rem;
                  background: ${({ theme }) => theme.colors.helper};
                  color: white;
                  border: none;
                  border-radius: 0.6rem;
                  font-size: 1.4rem;
                  font-weight: 500;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  
                  &:hover {
                    background: ${({ theme }) => theme.colors.btn};
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                  }
                  
                  .signin-icon {
                    font-size: 1.8rem;
                  }
                }
              }
            }
          }
        }
      }
    }
    
    /* Mobile Hamburger */
    .mobile-nav {
      display: none;
      
      .hamburger-btn {
        background: none;
        border: none;
        font-size: 2.8rem;
        color: ${({ theme }) => theme.colors.black};
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 0.4rem;
        transition: background 0.3s ease;
        
        &:hover {
          background: #f0f0f0;
        }
      }
      
      .mobile-menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        opacity: ${props => props.isMenuOpen ? '1' : '0'};
        visibility: ${props => props.isMenuOpen ? 'visible' : 'hidden'};
        transition: all 0.3s ease;
        
        .menu-content {
          width: 300px;
          height: 100%;
          background: white;
          transform: translateX(${props => props.isMenuOpen ? '0' : '-100%'});
          transition: transform 0.3s ease;
          overflow-y: auto;
          
          .menu-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 2rem;
            background: ${({ theme }) => theme.colors.helper};
            color: white;
            
            .user-greeting {
              display: flex;
              align-items: center;
              gap: 1rem;
              
              .user-avatar {
                width: 4rem;
                height: 4rem;
                border-radius: 50%;
                object-fit: cover;
              }
              
              .user-info {
                .greeting {
                  font-size: 1.4rem;
                  margin: 0;
                }
                
                .name {
                  font-size: 1.6rem;
                  font-weight: 600;
                  margin: 0.2rem 0 0 0;
                }
              }
              
              .default-user {
                .user-icon {
                  font-size: 3rem;
                }
              }
            }
            
            .close-btn {
              background: none;
              border: none;
              color: white;
              font-size: 2.4rem;
              cursor: pointer;
              padding: 0.5rem;
              border-radius: 0.4rem;
              transition: background 0.3s ease;
              
              &:hover {
                background: rgba(255, 255, 255, 0.2);
              }
            }
          }
          
          .menu-body {
            .menu-section {
              border-bottom: 1px solid #eee;
              
              .menu-item {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                padding: 1.5rem 2rem;
                text-decoration: none;
                color: ${({ theme }) => theme.colors.black};
                font-size: 1.6rem;
                transition: background 0.3s ease;
                
                &:hover {
                  background: #f8f9fa;
                }
                
                .menu-icon {
                  font-size: 2rem;
                  color: #666;
                }
                
                .badge {
                  margin-left: auto;
                  background: #ff4757;
                  color: white;
                  padding: 0.3rem 0.8rem;
                  border-radius: 1rem;
                  font-size: 1.2rem;
                  font-weight: bold;
                }
              }
              
              .logout-btn {
                width: 100%;
                display: flex;
                align-items: center;
                gap: 1.5rem;
                padding: 1.5rem 2rem;
                background: none;
                border: none;
                color: #e74c3c;
                font-size: 1.6rem;
                cursor: pointer;
                transition: background 0.3s ease;
                
                &:hover {
                  background: #fff5f5;
                }
                
                .menu-icon {
                  font-size: 2rem;
                }
              }
            }
          }
        }
      }
    }
    
    /* Responsive breakpoints */
    @media (max-width: ${({ theme }) => theme.media.tab}) {
      .desktop-nav {
        display: none;
      }
      
      .mobile-nav {
        display: block;
      }
    }
  `;

  return (
    <StyledNav isMenuOpen={isMenuOpen} isProfileOpen={isProfileMenuOpen}>
      {/* Desktop Navigation */}
      <div className="desktop-nav">
        <ul className="nav-links">
          <li><NavLink to="/" className="nav-link">Home</NavLink></li>
          <li><NavLink to="/about" className="nav-link">About</NavLink></li>
          <li><NavLink to="/products" className="nav-link">Products</NavLink></li>
          <li><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
        </ul>
        
        <div className="nav-actions">
          {/* Cart */}
          <NavLink to="/cart" className="cart-link">
            <FiShoppingCart className="cart-icon" />
            {total_item > 0 && <span className="cart-badge">{total_item}</span>}
          </NavLink>
          
          {/* Profile */}
          <div className="profile-container">
            <button className="profile-trigger" onClick={toggleProfileMenu}>
              {isAuthenticated ? (
                <>
                  <img src={user.picture} alt={user.name} className="profile-pic" />
                  <div className="profile-info">
                    <p className="greeting">Hello,</p>
                    <p className="name">{user.name?.split(' ')[0]}</p>
                  </div>
                </>
              ) : (
                <>
                  <FiUser className="user-icon" />
                  <div className="profile-info">
                    <p className="greeting">Hello,</p>
                    <p className="name">Sign In</p>
                  </div>
                </>
              )}
            </button>
            
            {/* Profile Dropdown */}
            <div className="profile-dropdown">
              {isAuthenticated ? (
                <>
                  <div className="profile-header">
                    <div className="user-details">
                      <img src={user.picture} alt={user.name} className="user-avatar" />
                      <div className="user-info">
                        <h3 className="user-name">{user.name}</h3>
                        <p className="user-email">{user.email}</p>
                      </div>
                    </div>
                    <button 
                      className="edit-profile-btn" 
                      onClick={() => {
                        setIsEditProfileOpen(true);
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Edit Profile
                    </button>
                  </div>
                  
                  <div className="profile-menu">
                    <div className="menu-section">
                      <NavLink to="/orders" className="menu-item" onClick={closeMenus}>
                        <FiPackage className="menu-icon" />
                        <div className="menu-text">
                          <p className="title">Orders</p>
                          <p className="subtitle">Track, return, cancel</p>
                        </div>
                      </NavLink>
                      <NavLink to="/wishlist" className="menu-item" onClick={closeMenus}>
                        <FiHeart className="menu-icon" />
                        <div className="menu-text">
                          <p className="title">Wishlist</p>
                          <p className="subtitle">Your saved items</p>
                        </div>
                        {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
                      </NavLink>
                      <NavLink to="/profile" className="menu-item" onClick={closeMenus}>
                        <FiUser className="menu-icon" />
                        <div className="menu-text">
                          <p className="title">Payment History</p>
                          <p className="subtitle">All your transactions</p>
                        </div>
                      </NavLink>
                    </div>
                    
                    <div className="menu-section">
                      <NavLink to="/faq" className="menu-item" onClick={closeMenus}>
                        <FiHelpCircle className="menu-icon" />
                        <span>Help Center</span>
                      </NavLink>
                    </div>
                    
                    <div className="menu-section">
                      <button 
                        className="logout-btn" 
                        onClick={() => {
                          logout();
                          closeMenus();
                        }}
                      >
                        <FiLogOut className="menu-icon" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="profile-menu">
                  <div className="menu-section">
                    <button 
                      className="signin-button" 
                      onClick={() => {
                        navigate('/login');
                        closeMenus();
                      }}
                    >
                      <FiUser className="signin-icon" />
                      <span>Sign In / Register</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="mobile-nav">
        <button className="hamburger-btn" onClick={toggleMenu}>
          <HiMenuAlt3 />
        </button>
        
        {/* Mobile Menu Overlay */}
        <div className="mobile-menu" onClick={(e) => e.target.className.includes('mobile-menu') && toggleMenu()}>
          <div className="menu-content">
            <div className="menu-header">
              <div className="user-greeting">
                {isAuthenticated ? (
                  <>
                    <img src={user.picture} alt={user.name} className="user-avatar" />
                    <div className="user-info">
                      <p className="greeting">Hello,</p>
                      <p className="name">{user.name?.split(' ')[0]}</p>
                    </div>
                  </>
                ) : (
                  <div className="default-user">
                    <FiUser className="user-icon" />
                    <div className="user-info">
                      <p className="greeting">Hello,</p>
                      <p className="name">Sign In</p>
                    </div>
                  </div>
                )}
              </div>
              <button className="close-btn" onClick={toggleMenu}>
                <HiX />
              </button>
            </div>
            
            <div className="menu-body">
              <div className="menu-section">
                <NavLink to="/" className="menu-item" onClick={closeMenus}>
                  <span>Home</span>
                </NavLink>
                <NavLink to="/products" className="menu-item" onClick={closeMenus}>
                  <span>Products</span>
                </NavLink>
                <NavLink to="/about" className="menu-item" onClick={closeMenus}>
                  <span>About</span>
                </NavLink>
                <NavLink to="/contact" className="menu-item" onClick={closeMenus}>
                  <span>Contact</span>
                </NavLink>
              </div>
              
              {isAuthenticated && (
                <>
                  <div className="menu-section">
                    <NavLink to="/orders" className="menu-item" onClick={closeMenus}>
                      <FiPackage className="menu-icon" />
                      <span>Orders</span>
                    </NavLink>
                    <NavLink to="/wishlist" className="menu-item" onClick={closeMenus}>
                      <FiHeart className="menu-icon" />
                      <span>Wishlist</span>
                      <span className="badge">3</span>
                    </NavLink>
                    <NavLink to="/cart" className="menu-item" onClick={closeMenus}>
                      <FiShoppingCart className="menu-icon" />
                      <span>Cart</span>
                      {total_item > 0 && <span className="badge">{total_item}</span>}
                    </NavLink>
                  </div>
                  
                  <div className="menu-section">
                    <NavLink to="/faq" className="menu-item" onClick={closeMenus}>
                      <FiHelpCircle className="menu-icon" />
                      <span>Help Center</span>
                    </NavLink>
                  </div>
                  
                  <div className="menu-section">
                    <button 
                      className="logout-btn" 
                      onClick={() => {
                        logout();
                        closeMenus();
                      }}
                    >
                      <FiLogOut className="menu-icon" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
              
              {!isAuthenticated && (
                <div className="menu-section">
                  <button 
                    className="menu-item" 
                    onClick={() => {
                      navigate('/login');
                      closeMenus();
                    }}
                  >
                    <FiUser className="menu-icon" />
                    <span>Sign In / Register</span>
                  </button>
                  <NavLink to="/cart" className="menu-item" onClick={closeMenus}>
                    <FiShoppingCart className="menu-icon" />
                    <span>Cart</span>
                    {total_item > 0 && <span className="badge">{total_item}</span>}
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Backdrop for profile dropdown */}
      {isProfileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 999
          }} 
          onClick={closeMenus}
        />
      )}
      
      {/* Edit Profile Modal */}
      <EditProfile 
        isOpen={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)} 
      />
    </StyledNav>
  );
};

export default Nav;
