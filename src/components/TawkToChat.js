import React, { useEffect } from 'react';

const TawkToChat = () => {
  useEffect(() => {
    // Function to initialize Tawk.to if not already loaded
    const initTawkTo = () => {
      if (!window.Tawk_API) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://embed.tawk.to/68903f04a34d1b1925281fe8/1j1pncatu';
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');
        document.body.appendChild(script);
        
        // Adjust chat widget position after load
        script.onload = () => {
          // Apply styles immediately
          const applyStyles = () => {
            const style = document.createElement('style');
            style.id = 'tawk-positioning-fix';
            style.textContent = `
              #tawk-bubble-container,
              .tawk-flex-center,
              .tawk-chat-widget,
              div[id*="tawk"],
              iframe[src*="tawk.to"] {
                bottom: 150px !important;
                right: 20px !important;
                z-index: 998 !important;
              }
              
              /* Target the main tawk container */
              #tawk_5c808d8b361b3372892e9115 {
                bottom: 150px !important;
                right: 20px !important;
                z-index: 998 !important;
              }
              
              /* More specific targeting */
              div[style*="position: fixed"][style*="bottom"] {
                bottom: 150px !important;
                right: 20px !important;
              }
            `;
            
            // Remove existing style if present
            const existingStyle = document.getElementById('tawk-positioning-fix');
            if (existingStyle) {
              existingStyle.remove();
            }
            
            document.head.appendChild(style);
          };
          
          // Apply styles multiple times to ensure they stick
          applyStyles();
          
          setTimeout(() => {
            applyStyles();
            if (window.Tawk_API) {
              window.Tawk_API.onLoad = function() {
                applyStyles();
                // Keep reapplying styles periodically
                const interval = setInterval(() => {
                  applyStyles();
                }, 2000);
                
                // Stop after 10 seconds
                setTimeout(() => clearInterval(interval), 10000);
              };
            }
          }, 1000);
          
          // Also apply after a longer delay
          setTimeout(applyStyles, 3000);
        };
      }
    };

    // Initialize Tawk.to
    initTawkTo();

    // Cleanup function
    return () => {
      // Optionally hide the widget when component unmounts
      if (window.Tawk_API) {
        try {
          window.Tawk_API.hideWidget();
        } catch (e) {
          console.log('Tawk.to cleanup error:', e);
        }
      }
    };
  }, []);

  // Helper functions for controlling the chat widget
  const openChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.maximize();
    } else {
      // Fallback to direct link if widget is not loaded
      window.open('https://tawk.to/chat/68903f04a34d1b1925281fe8/1j1pncatu', '_blank');
    }
  };

  const toggleChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.toggle();
    } else {
      // Fallback to direct link if widget is not loaded
      window.open('https://tawk.to/chat/68903f04a34d1b1925281fe8/1j1pncatu', '_blank');
    }
  };

  // Expose functions to parent components or global scope
  React.useImperativeHandle(React.forwardRef(() => null), () => ({
    openChat,
    toggleChat
  }));

  // This component doesn't render anything visible
  // The Tawk.to widget will appear automatically
  return null;
};

// Export both the component and utility functions
export { TawkToChat as default };

// Utility functions that can be imported and used anywhere
export const tawkToHelpers = {
  openChat: () => {
    if (window.Tawk_API) {
      window.Tawk_API.maximize();
    } else {
      window.open('https://tawk.to/chat/68903f04a34d1b1925281fe8/1j1pncatu', '_blank');
    }
  },
  
  toggleChat: () => {
    if (window.Tawk_API) {
      window.Tawk_API.toggle();
    } else {
      window.open('https://tawk.to/chat/68903f04a34d1b1925281fe8/1j1pncatu', '_blank');
    }
  },
  
  hideChat: () => {
    if (window.Tawk_API) {
      window.Tawk_API.hideWidget();
    }
  },
  
  showChat: () => {
    if (window.Tawk_API) {
      window.Tawk_API.showWidget();
    }
  },
  
  isChatOnline: () => {
    return window.Tawk_API ? window.Tawk_API.getStatus() === 'online' : false;
  }
};
