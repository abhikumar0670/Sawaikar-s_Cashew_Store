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
      transform: scale(1.02);
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
    }
  }
  
  .brand-text {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    fill: #2c3e50;
  }
  
  .store-text {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    fill: #34495e;
  }
  
  .tagline-text {
    font-family: 'Inter', sans-serif;
    font-size: 7px;
    fill: #7f8c8d;
    letter-spacing: 1px;
  }
  
  .cashew-primary {
    fill: #e67e22;
  }
  
  .cashew-secondary {
    fill: #d35400;
  }
  
  .cashew-accent {
    fill: #f39c12;
  }
  
  .nature-green {
    fill: #27ae60;
  }
  
  .nature-light {
    fill: #2ecc71;
  }
`;

const ModernLogo = ({ size = "large", showText = true, variant = "horizontal" }) => {
  const dimensions = {
    small: { width: 100, height: 50 },
    medium: { width: 150, height: 75 },
    large: { width: 250, height: 80 }
  };

  const { width, height } = dimensions[size];

  if (variant === "circular") {
    return (
      <LogoContainer>
        <svg 
          className="logo-svg"
          width={80} 
          height={80} 
          viewBox="0 0 80 80" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular Background */}
          <circle cx="40" cy="40" r="38" fill="#ffffff" stroke="#e74c3c" strokeWidth="2"/>
          <circle cx="40" cy="40" r="32" fill="#fef9e7" opacity="0.3"/>
          
          {/* Stylized Cashew in Circle */}
          <path 
            className="cashew-primary"
            d="M 25 35 Q 22 28 30 25 Q 45 22 55 30 Q 58 38 55 45 Q 50 55 40 58 Q 30 55 25 45 Q 22 38 25 35 Z"
          />
          
          {/* Inner Details */}
          <ellipse cx="40" cy="40" rx="10" ry="6" fill="#f39c12" opacity="0.6"/>
          
          {/* Leaf Elements */}
          <path className="nature-green" d="M 55 30 Q 60 25 65 30 Q 60 35 55 30 Z"/>
          
          {showText && (
            <text x="40" y="70" className="tagline-text" textAnchor="middle" fontSize="6">
              SAWAIKAR'S
            </text>
          )}
        </svg>
      </LogoContainer>
    );
  }

  return (
    <LogoContainer>
      <svg 
        className="logo-svg"
        width={width} 
        height={height} 
        viewBox="0 0 250 80" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Modern Cashew Icon */}
        <g transform="translate(10, 15)">
          {/* Background Shape */}
          <ellipse cx="25" cy="25" rx="20" ry="18" fill="#fff5ee" stroke="#e67e22" strokeWidth="1" opacity="0.3"/>
          
          {/* Main Cashew - Modern Geometric Style */}
          <path 
            className="cashew-primary"
            d="M 12 22 Q 8 15 18 12 Q 32 10 42 18 Q 45 25 42 32 Q 38 42 28 45 Q 18 42 12 32 Q 8 25 12 22 Z"
          />
          
          {/* Gradient Effect */}
          <defs>
            <linearGradient id="cashewGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f39c12" />
              <stop offset="50%" stopColor="#e67e22" />
              <stop offset="100%" stopColor="#d35400" />
            </linearGradient>
          </defs>
          
          <path 
            d="M 12 22 Q 8 15 18 12 Q 32 10 42 18 Q 45 25 42 32 Q 38 42 28 45 Q 18 42 12 32 Q 8 25 12 22 Z"
            fill="url(#cashewGradient)"
          />
          
          {/* Highlight */}
          <ellipse cx="25" cy="22" rx="6" ry="3" fill="#ffffff" opacity="0.4"/>
          
          {/* Leaf Accent */}
          <path 
            className="nature-green"
            d="M 40 18 Q 45 14 48 18 Q 50 24 48 26 Q 45 24 40 18 Z"
          />
          <path 
            className="nature-light"
            d="M 42 19 Q 44 17 46 19 Q 47 21 46 22 Q 44 21 42 19 Z"
          />
        </g>

        {showText && (
          <>
            {/* Main Brand Text */}
            <text x="70" y="35" className="brand-text" fontSize="22" fontWeight="700">
              Sawaikar's
            </text>
            
            {/* Store Text */}
            <text x="70" y="55" className="store-text" fontSize="14" fontWeight="400">
              Cashew Store
            </text>
            
            {/* Tagline */}
            <text x="70" y="70" className="tagline-text" fontSize="8">
              PREMIUM GOAN CASHEWS • EST. 2024
            </text>
            
            {/* Decorative Line */}
            <line x1="70" y1="42" x2="220" y2="42" stroke="#e67e22" strokeWidth="1" opacity="0.3"/>
            
            {/* Small Decorative Elements */}
            <circle cx="225" cy="35" r="2" fill="#e67e22" opacity="0.6"/>
            <circle cx="235" cy="42" r="1.5" fill="#27ae60" opacity="0.6"/>
            <circle cx="230" cy="50" r="1" fill="#f39c12" opacity="0.6"/>
          </>
        )}
      </svg>
    </LogoContainer>
  );
};

export default ModernLogo;
