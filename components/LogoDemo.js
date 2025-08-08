import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Logo from './Logo';
import ModernLogo from './ModernLogo';

const DemoContainer = styled.div`
  padding: 2rem;
  background: #f8f9fa;

  .demo-section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .demo-title {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #2c3e50;
    text-align: center;
  }

  .logo-showcase {
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: 2rem 0;
  }

  .logo-item {
    padding: 1rem;
    border: 2px dashed #e0e0e0;
    border-radius: 0.5rem;
    text-align: center;
  }

  .logo-label {
    font-size: 1.2rem;
    color: #666;
    margin-top: 1rem;
  }
`;

const LogoDemo = () => {
  return (
    <DemoContainer>
      <h1 style={{ textAlign: 'center', marginBottom: '3rem', color: '#2c3e50' }}>
        🎉 Logo Integration Demo
      </h1>

      {/* Header Integration */}
      <div className="demo-section">
        <h2 className="demo-title">✅ Integrated Header with Logo</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
          Your logo is now integrated into the Header component
        </p>
        <Header />
      </div>

      {/* Logo Variations */}
      <div className="demo-section">
        <h2 className="demo-title">🎨 Logo Variations Available</h2>
        
        <div className="logo-showcase">
          <div className="logo-item">
            <ModernLogo size="large" showText={true} variant="horizontal" />
            <div className="logo-label">Large Modern Logo</div>
          </div>
          
          <div className="logo-item">
            <ModernLogo size="medium" showText={true} variant="horizontal" />
            <div className="logo-label">Medium Modern Logo</div>
          </div>
          
          <div className="logo-item">
            <ModernLogo size="small" showText={false} variant="horizontal" />
            <div className="logo-label">Small Icon Only</div>
          </div>
        </div>

        <div className="logo-showcase">
          <div className="logo-item">
            <Logo size="large" showText={true} />
            <div className="logo-label">Classic Large Logo</div>
          </div>
          
          <div className="logo-item">
            <Logo size="medium" showText={true} />
            <div className="logo-label">Classic Medium Logo</div>
          </div>
          
          <div className="logo-item">
            <ModernLogo variant="circular" showText={false} />
            <div className="logo-label">Circular Logo</div>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="demo-section">
        <h2 className="demo-title">📋 Usage Instructions</h2>
        <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '0.5rem' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>The logo is now integrated in your Header!</h3>
          <ul style={{ color: '#666', lineHeight: '1.8' }}>
            <li>✅ <strong>Desktop:</strong> Shows medium-sized logo with full text</li>
            <li>✅ <strong>Mobile:</strong> Shows smaller logo with text (responsive)</li>
            <li>✅ <strong>Hover Effect:</strong> Logo scales slightly on hover</li>
            <li>✅ <strong>Clickable:</strong> Links back to home page</li>
            <li>✅ <strong>Professional:</strong> Modern design with gradients</li>
          </ul>
          
          <h3 style={{ color: '#2c3e50', marginTop: '2rem', marginBottom: '1rem' }}>Available Logo Options:</h3>
          <pre style={{ 
            background: '#2c3e50', 
            color: '#fff', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            overflow: 'auto',
            fontSize: '1.2rem'
          }}>
{`// Import the logos
import Logo from './components/Logo';
import ModernLogo from './components/ModernLogo';

// Usage examples:
<ModernLogo size="large" showText={true} />     // Full logo
<ModernLogo size="medium" showText={true} />    // Header size
<ModernLogo size="small" showText={false} />    // Icon only
<ModernLogo variant="circular" />               // Social media
<Logo size="medium" showText={true} />          // Classic style`}
          </pre>
        </div>
      </div>
    </DemoContainer>
  );
};

export default LogoDemo;
