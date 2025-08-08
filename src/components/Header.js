import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";
import ModernLogo from "./ModernLogo";

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/" className="logo-link">
        <div className="logo-desktop">
          <ModernLogo size="medium" showText={true} variant="horizontal" />
        </div>
        <div className="logo-mobile">
          <ModernLogo size="small" showText={true} variant="horizontal" />
        </div>
      </NavLink>
      <div className="nav-section">
        <Nav />
      </div>
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 1rem 5rem;
  height: auto;
  min-height: 8rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .logo-link {
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }

  .logo-desktop {
    display: block;
  }

  .logo-mobile {
    display: none;
  }

  .nav-section {
    display: flex;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
    padding: 1rem 3rem;
    
    .logo-desktop {
      display: block;
    }
    
    .logo-mobile {
      display: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 1rem 2rem;
    flex-direction: column;
    gap: 1.5rem;
    min-height: auto;
    
    .logo-desktop {
      display: none;
    }
    
    .logo-mobile {
      display: block;
    }
    
    .nav-section {
      width: 100%;
      justify-content: center;
    }
  }
`;
export default Header;