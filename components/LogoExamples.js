import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import ModernLogo from './ModernLogo';

const ExampleContainer = styled.div`
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;

  .section {
    margin-bottom: 4rem;
    padding: 2rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #2c3e50;
    border-bottom: 2px solid #e67e22;
    padding-bottom: 1rem;
  }

  .logo-row {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .logo-description {
    color: #7f8c8d;
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  .color-palette {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .color-swatch {
    width: 50px;
    height: 50px;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  }
`;

const LogoExamples = () => {
  return (
    <ExampleContainer>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '3rem' }}>
        Sawaikar's Cashew Store - Logo Options
      </h1>

      {/* Classic Logo */}
      <div className="section">
        <h2 className="section-title">Classic Logo Design</h2>
        <p className="logo-description">
          Traditional design with warm, earthy colors. Perfect for a heritage feel.
        </p>
        
        <div className="logo-row">
          <Logo size="large" showText={true} />
        </div>
        
        <div className="logo-row">
          <Logo size="medium" showText={true} />
          <Logo size="small" showText={false} />
        </div>

        <div className="color-palette">
          <div className="color-swatch" style={{ backgroundColor: '#d4a574' }}>Cashew</div>
          <div className="color-swatch" style={{ backgroundColor: '#228b22' }}>Leaf</div>
          <div className="color-swatch" style={{ backgroundColor: '#2c5530' }}>Text</div>
          <div className="color-swatch" style={{ backgroundColor: '#ff6347' }}>Accent</div>
        </div>
      </div>

      {/* Modern Logo */}
      <div className="section">
        <h2 className="section-title">Modern Logo Design</h2>
        <p className="logo-description">
          Contemporary design with gradient effects and clean typography. Great for digital platforms.
        </p>
        
        <div className="logo-row">
          <ModernLogo size="large" showText={true} variant="horizontal" />
        </div>
        
        <div className="logo-row">
          <ModernLogo size="medium" showText={true} variant="horizontal" />
          <ModernLogo size="small" showText={false} variant="horizontal" />
        </div>

        <div className="color-palette">
          <div className="color-swatch" style={{ backgroundColor: '#e67e22' }}>Primary</div>
          <div className="color-swatch" style={{ backgroundColor: '#f39c12' }}>Accent</div>
          <div className="color-swatch" style={{ backgroundColor: '#27ae60' }}>Nature</div>
          <div className="color-swatch" style={{ backgroundColor: '#2c3e50' }}>Text</div>
        </div>
      </div>

      {/* Circular Variant */}
      <div className="section">
        <h2 className="section-title">Circular Logo (For Social Media)</h2>
        <p className="logo-description">
          Compact circular design perfect for profile pictures and social media.
        </p>
        
        <div className="logo-row">
          <ModernLogo variant="circular" showText={true} />
          <ModernLogo variant="circular" showText={false} />
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="section">
        <h2 className="section-title">Usage Examples</h2>
        <p className="logo-description">
          Here's how you can use these logos in your React components:
        </p>
        
        <pre style={{ 
          background: '#f8f9fa', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          fontSize: '1.2rem',
          overflow: 'auto'
        }}>
{`// Import the logo components
import Logo from './Logo';
import ModernLogo from './ModernLogo';

// Usage examples:
<Logo size="large" showText={true} />
<Logo size="medium" showText={true} />
<Logo size="small" showText={false} />

<ModernLogo size="large" showText={true} variant="horizontal" />
<ModernLogo variant="circular" showText={false} />

// In your header/navbar:
<ModernLogo size="medium" showText={true} />

// In your footer:
<Logo size="small" showText={false} />

// For social media:
<ModernLogo variant="circular" showText={false} />`}
        </pre>
      </div>
    </ExampleContainer>
  );
};

export default LogoExamples;
