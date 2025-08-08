import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  .logo-svg {
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  .logo-text {
    font-family: 'Georgia', serif;
    font-weight: bold;
    fill: #2c5530;
  }
  
  .logo-tagline {
    font-family: 'Arial', sans-serif;
    font-size: 8px;
    fill: #6b8e23;
    font-style: italic;
  }
  
  .cashew-shape {
    fill: #d4a574;
    stroke: #8b6914;
    stroke-width: 1;
  }
  
  .leaf {
    fill: #228b22;
  }
  
  .accent {
    fill: #ff6347;
  }
`;

const Logo = ({ size = "large", showText = true }) => {
  const dimensions = {
    small: { width: 80, height: 40 },
    medium: { width: 120, height: 60 },
    large: { width: 200, height: 100 }
  };

  const { width, height } = dimensions[size];

  return (
    <LogoContainer>
      <svg 
        className="logo-svg"
        width={width} 
        height={height} 
        viewBox="0 0 200 100" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle cx="50" cy="50" r="45" fill="#f8f8f0" stroke="#e6e6d9" strokeWidth="2" opacity="0.3"/>
        
        {/* Main Cashew Shape */}
        <path 
          className="cashew-shape"
          d="M 25 35 Q 20 25 35 20 Q 55 15 70 25 Q 75 35 70 50 Q 65 65 50 70 Q 35 65 25 50 Q 20 40 25 35 Z"
        />
        
        {/* Cashew Details/Texture */}
        <ellipse cx="45" cy="40" rx="8" ry="4" fill="#c19a6b" opacity="0.7"/>
        <ellipse cx="55" cy="50" rx="6" ry="3" fill="#c19a6b" opacity="0.5"/>
        
        {/* Leaf Decoration */}
        <path 
          className="leaf"
          d="M 70 25 Q 75 20 80 25 Q 85 35 80 40 Q 75 35 70 25 Z"
        />
        
        {/* Small Accent Dots */}
        <circle className="accent" cx="30" cy="30" r="2"/>
        <circle className="accent" cx="65" cy="55" r="1.5"/>
        
        {showText && (
          <>
            {/* Main Logo Text */}
            <text x="110" y="35" className="logo-text" fontSize="18" fontWeight="bold">
              Sawaikar's
            </text>
            <text x="110" y="55" className="logo-text" fontSize="16">
              Cashew Store
            </text>
            
            {/* Tagline */}
            <text x="110" y="75" className="logo-tagline">
              Premium Quality • Fresh & Natural
            </text>
            
            {/* Decorative Elements */}
            <line x1="110" y1="40" x2="190" y2="40" stroke="#d4a574" strokeWidth="1" opacity="0.5"/>
            <circle cx="195" cy="40" r="2" fill="#d4a574"/>
          </>
        )}
      </svg>
    </LogoContainer>
  );
};

export default Logo;
