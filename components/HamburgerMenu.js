import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth_context";
import { useCartContext } from "../context/cart_context";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <Wrapper>
      <div className="hamburger-icon" onClick={toggleMenu}>
        {isOpen ? <FiX /> : <FiMenu />}
      </div>

      {isOpen && <div className="overlay" onClick={closeMenu}></div>}

      <div className={`menu ${isOpen ? "open" : ""}`}>
        <div className="menu-header">
          <h3>Menu</h3>
          <button className="close-btn" onClick={closeMenu}>
            <FiX />
          </button>
        </div>

        <nav className="menu-nav">
          <NavLink to="/orders" onClick={closeMenu} className="menu-link">
            Orders
          </NavLink>
          <NavLink to="/wishlist" onClick={closeMenu} className="menu-link">
            Wishlist
          </NavLink>
          <NavLink to="/faq" onClick={closeMenu} className="menu-link">
            FAQ
          </NavLink>

          <div className="auth-section">
            {isAuthenticated ? (
              <>
                <div className="user-info">
                  <span>Hello, {user?.name}</span>
                </div>
                <button onClick={handleLogout} className="auth-btn logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={closeMenu} className="auth-btn login-btn">
                  Login
                </NavLink>
                <NavLink to="/register" onClick={closeMenu} className="auth-btn register-btn">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  .hamburger-icon {
    cursor: pointer;
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.black};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 0.4rem;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.helper};
      color: white;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }

  .menu {
    position: fixed;
    top: 0;
    right: -40rem;
    width: 35rem;
    height: 100vh;
    background: white;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    z-index: 999;
    transition: right 0.3s ease;
    overflow-y: auto;

    &.open {
      right: 0;
    }
  }

  .menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid #e1e5e9;
    background: ${({ theme }) => theme.colors.helper};
    color: white;

    h3 {
      margin: 0;
      font-size: 2rem;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 2.4rem;
      color: white;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.4rem;
      transition: background 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }

  .menu-nav {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .menu-link {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.black};
    font-size: 1.8rem;
    font-weight: 500;
    padding: 1.2rem 1.6rem;
    border-radius: 0.8rem;
    border: 1px solid transparent;
    transition: all 0.3s ease;

    &:hover,
    &.active {
      background: ${({ theme }) => theme.colors.helper};
      color: white;
      transform: translateX(5px);
    }
  }

  .auth-section {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e1e5e9;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .user-info {
    text-align: center;
    margin-bottom: 1rem;

    span {
      color: ${({ theme }) => theme.colors.text};
      font-weight: 500;
    }
  }

  .auth-btn {
    text-decoration: none;
    text-align: center;
    padding: 1.2rem 2rem;
    border-radius: 0.8rem;
    font-weight: 500;
    font-size: 1.6rem;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;

    &.login-btn {
      background: ${({ theme }) => theme.colors.helper};
      color: white;

      &:hover {
        background: ${({ theme }) => theme.colors.btn};
        transform: translateY(-2px);
      }
    }

    &.register-btn {
      background: transparent;
      color: ${({ theme }) => theme.colors.helper};
      border: 2px solid ${({ theme }) => theme.colors.helper};

      &:hover {
        background: ${({ theme }) => theme.colors.helper};
        color: white;
        transform: translateY(-2px);
      }
    }

    &.logout-btn {
      background: #dc3545;
      color: white;

      &:hover {
        background: #c82333;
        transform: translateY(-2px);
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .menu {
      width: 30rem;
      right: -30rem;
    }

    .menu-header h3 {
      font-size: 1.8rem;
    }

    .menu-link {
      font-size: 1.6rem;
    }
  }

  @media (max-width: 400px) {
    .menu {
      width: 100vw;
      right: -100vw;
    }
  }
`;

export default HamburgerMenu;
