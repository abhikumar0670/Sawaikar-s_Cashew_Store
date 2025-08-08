// import { useAuth0 } from "@auth0/auth0-react";
// import styled from "styled-components";

// const Contact = () => {
//   const { isAuthenticated, user } = useAuth0();

//   const Wrapper = styled.section`
//     padding: 9rem 0 5rem 0;
//     text-align: center;

//     .container {
//       margin-top: 6rem;

//       .contact-form {
//         max-width: 50rem;
//         margin: auto;

//         .contact-inputs {
//           display: flex;
//           flex-direction: column;
//           gap: 3rem;

//           input[type="submit"] {
//             cursor: pointer;
//             transition: all 0.2s;

//             &:hover {
//               background-color: ${({ theme }) => theme.colors.white};
//               border: 1px solid ${({ theme }) => theme.colors.btn};
//               color: ${({ theme }) => theme.colors.btn};
//               transform: scale(0.9);
//             }
//           }
//         }
//       }
//     }
//   `;

//   return (
//     <Wrapper>
//       <h2 className="common-heading">Contact page</h2>

//       <iframe
//          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.9710129813184!2d73.81429187415532!3d15.539684585065697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc1b3b2ada4bb%3A0xfc78326afeb77a6c!2sSawaikar&#39;s%20Goan%20Cashews%20And%20Dry%20Fruits-%20Best%20Cashews%20in%20Goa!5e0!3m2!1sen!2sin!4v1731958498680!5m2!1sen!2sin" 
//         width="100%"
//         height="400"
//         style={{ border: 0 }}
//         allowFullScreen=""
//         loading="lazy"
//         referrerPolicy="no-referrer-when-downgrade"></iframe>



//       <div className="container">
//         <div className="contact-form">
//           <form
//             action="https://formspree.io/f/xdojzzlj"
//             method="POST"
//             className="contact-inputs">
//             <input
//               type="text"
//               placeholder="username"
//               name="username"
//               value={isAuthenticated ? user.name : ""}
//               required
//               autoComplete="off"
//             />

//             <input
//               type="email"
//               name="Email"
//               placeholder="Email"
//               autoComplete="off"
//               value={isAuthenticated ? user.email : ""}
//               required
//             />

//             <textarea
//               name="Message"
//               cols="30"
//               rows="10"
//               required
//               autoComplete="off"
//               placeholder="Enter you message"></textarea>

//             <input type="submit" value="send" />
//           </form>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default Contact;




import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";

// No automatic formatting - let users type naturally

// Move Wrapper outside component to prevent re-creation
const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;

    .common-heading {
      font-size: 3.2rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.heading};
      margin-bottom: 2rem;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
    }

    /* Location Section Styles */
    .location-section {
      margin-bottom: 4rem;
      padding: 0 2rem;
      
      .location-content {
        max-width: 120rem;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        background: white;
        border-radius: 2rem;
        padding: 4rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        
        .location-info {
          h3 {
            color: ${({ theme }) => theme.colors.heading};
            font-size: 2.8rem;
            margin-bottom: 2rem;
            font-weight: 700;
          }
          
          .address, .hours {
            margin-bottom: 2.5rem;
            
            h4 {
              color: ${({ theme }) => theme.colors.helper};
              font-size: 1.8rem;
              margin-bottom: 1rem;
              font-weight: 600;
            }
            
            p {
              color: ${({ theme }) => theme.colors.text};
              font-size: 1.6rem;
              margin-bottom: 0.5rem;
              line-height: 1.6;
            }
          }
          
          .map-actions {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
            
            .map-btn {
              padding: 1.2rem 2rem;
              border-radius: 1rem;
              font-size: 1.4rem;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.3s ease;
              border: none;
              text-decoration: none;
              display: inline-flex;
              align-items: center;
              gap: 0.8rem;
              
              &.primary {
                background: ${({ theme }) => theme.colors.btn};
                color: white;
                
                &:hover {
                  background: ${({ theme }) => theme.colors.helper};
                  transform: translateY(-2px);
                  box-shadow: 0 8px 25px rgba(98, 84, 243, 0.3);
                }
              }
              
              &.secondary {
                background: white;
                color: ${({ theme }) => theme.colors.btn};
                border: 2px solid ${({ theme }) => theme.colors.btn};
                
                &:hover {
                  background: ${({ theme }) => theme.colors.btn};
                  color: white;
                  transform: translateY(-2px);
                  box-shadow: 0 8px 25px rgba(98, 84, 243, 0.3);
                }
              }
            }
          }
        }
        
        .location-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          
          .store-placeholder {
            text-align: center;
            padding: 3rem;
            background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%);
            border-radius: 2rem;
            border: 2px dashed ${({ theme }) => theme.colors.btn};
            width: 100%;
            
            .store-icon {
              font-size: 6rem;
              margin-bottom: 1.5rem;
            }
            
            h4 {
              color: ${({ theme }) => theme.colors.heading};
              font-size: 2rem;
              margin-bottom: 1rem;
              font-weight: 600;
            }
            
            p {
              color: ${({ theme }) => theme.colors.text};
              font-size: 1.4rem;
              margin-bottom: 1.5rem;
            }
            
            .coordinates {
              small {
                color: ${({ theme }) => theme.colors.helper};
                font-size: 1.2rem;
                font-weight: 500;
              }
            }
          }
        }
      }
    }

    .container {
      margin-top: 6rem;
      padding: 0 2rem;

      .contact-form {
        max-width: 60rem;
        margin: auto;
        background: white;
        padding: 4rem;
        border-radius: 2rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;

          .form-input,
          .form-textarea {
            padding: 1.8rem 2rem;
            border: 2px solid #e1e8ed;
            border-radius: 1.2rem;
            font-size: 1.6rem;
            font-family: inherit;
            background: #fafbfc;
            transition: all 0.3s ease;
            outline: none;
            color: ${({ theme }) => theme.colors.text};

            &::placeholder {
              color: #8899a6;
              font-weight: 400;
            }

            &:focus {
              border-color: ${({ theme }) => theme.colors.btn};
              background: white;
              box-shadow: 0 0 0 4px rgba(98, 84, 243, 0.1);
              transform: translateY(-2px);
            }

            &:hover {
              border-color: ${({ theme }) => theme.colors.helper};
              background: white;
            }
          }

          .email-input {
            text-transform: none !important;
            
            &:focus {
              text-transform: none !important;
            }
          }

          .form-textarea {
            resize: vertical;
            min-height: 15rem;
            font-family: inherit;
            line-height: 1.6;
          }

          .submit-btn {
            padding: 1.8rem 3rem;
            background: linear-gradient(135deg, ${({ theme }) => theme.colors.btn} 0%, ${({ theme }) => theme.colors.helper} 100%);
            color: white;
            border: none;
            border-radius: 1.2rem;
            font-size: 1.6rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(98, 84, 243, 0.3);

            &:hover {
              transform: translateY(-3px);
              box-shadow: 0 15px 35px rgba(98, 84, 243, 0.4);
              background: linear-gradient(135deg, ${({ theme }) => theme.colors.helper} 0%, ${({ theme }) => theme.colors.btn} 100%);
            }

            &:active {
              transform: translateY(-1px);
              box-shadow: 0 5px 15px rgba(98, 84, 243, 0.3);
            }
          }
        }
      }
      
      .direct-contact {
        margin-top: 4rem;
        padding: 3rem;
        background: white;
        border-radius: 2rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        
        h3 {
          color: ${({ theme }) => theme.colors.heading};
          font-size: 2.4rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        
        p {
          color: ${({ theme }) => theme.colors.text};
          font-size: 1.6rem;
          margin-bottom: 2.5rem;
        }
        
        .contact-options {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
          
          .contact-btn {
            padding: 1.5rem 2.5rem;
            border-radius: 1.2rem;
            font-size: 1.5rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.8rem;
            
            &.primary {
              background: ${({ theme }) => theme.colors.helper};
              color: white;
              
              &:hover {
                background: ${({ theme }) => theme.colors.btn};
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(210, 105, 30, 0.3);
              }
            }
            
            &.secondary {
              background: white;
              color: ${({ theme }) => theme.colors.helper};
              border: 2px solid ${({ theme }) => theme.colors.helper};
              
              &:hover {
                background: ${({ theme }) => theme.colors.helper};
                color: white;
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(210, 105, 30, 0.3);
              }
            }
          }
        }
      }
    }

    /* Responsive Design */
    @media (max-width: ${({ theme }) => theme.media.tab}) {
      padding: 6rem 0 3rem 0;
      
      .common-heading {
        font-size: 2.8rem;
      }
      
      .location-section {
        .location-content {
          grid-template-columns: 1fr;
          gap: 3rem;
          padding: 3rem;
          
          .location-info {
            text-align: left;
            
            h3 {
              font-size: 2.4rem;
            }
            
            .map-actions {
              justify-content: center;
              
              .map-btn {
                flex: 1;
                max-width: 20rem;
              }
            }
          }
          
          .location-visual {
            .store-placeholder {
              padding: 2.5rem;
              
              .store-icon {
                font-size: 5rem;
              }
              
              h4 {
                font-size: 1.8rem;
              }
            }
          }
        }
      }
      
      .container {
        margin-top: 3rem;
        
        .contact-form {
          padding: 3rem 2rem;
          max-width: 90%;
          
          .contact-inputs {
            gap: 2rem;
            
            .form-input,
            .form-textarea {
              padding: 1.5rem;
              font-size: 1.5rem;
            }
            
            .submit-btn {
              padding: 1.5rem 2.5rem;
              font-size: 1.5rem;
            }
          }
        }
        
        .direct-contact {
          padding: 2.5rem 2rem;
          
          .contact-options {
            flex-direction: column;
            gap: 1.5rem;
            
            .contact-btn {
              width: 100%;
              max-width: 30rem;
              margin: 0 auto;
            }
          }
        }
      }
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      padding: 4rem 0 2rem 0;
      
      .common-heading {
        font-size: 2.4rem;
        margin-bottom: 1.5rem;
      }
      
      iframe {
        height: 300px;
        margin-bottom: 2rem;
      }
      
      .container {
        margin-top: 2rem;
        padding: 0 1rem;
        
        .contact-form {
          padding: 2rem 1.5rem;
          border-radius: 1.5rem;
          
          .contact-inputs {
            gap: 1.5rem;
            
            .form-input,
            .form-textarea {
              padding: 1.4rem;
              font-size: 1.4rem;
              border-radius: 1rem;
            }
            
            .form-textarea {
              min-height: 12rem;
            }
            
            .submit-btn {
              padding: 1.4rem 2rem;
              font-size: 1.4rem;
              border-radius: 1rem;
            }
          }
        }
        
        .direct-contact {
          padding: 2rem 1.5rem;
          margin-top: 2rem;
          
          h3 {
            font-size: 2rem;
          }
          
          p {
            font-size: 1.4rem;
          }
          
          .contact-options {
            flex-direction: column;
            gap: 1.2rem;
            
            .contact-btn {
              width: 100%;
              padding: 1.4rem 2rem;
              font-size: 1.4rem;
              justify-content: center;
            }
          }
        }
      }
    }
  `;

const Contact = () => {
  const { isAuthenticated, user } = useAuth0();

  // State for managing form inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  // State to track if initial data has been set
  const [initialDataSet, setInitialDataSet] = useState(false);

  // Update form data when user authentication changes (only once)
  useEffect(() => {
    if (isAuthenticated && user && !initialDataSet) {
      setFormData({
        username: user.name || "",
        email: user.email || "",
        message: "",
      });
      setInitialDataSet(true);
    }
  }, [isAuthenticated, user, initialDataSet]);

  // Handle input changes with useCallback to prevent re-renders
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    // No formatting - keep exactly what user types
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback((e) => {
    // Don't prevent default - let Formspree handle the submission
    // Just ensure the form data is properly set
    console.log('Form submitted:', formData);
  }, [formData]);

  return (
    <Wrapper>
      <h2 className="common-heading">Contact page</h2>

      {/* Store Location Section */}
      <div className="location-section">
        <div className="location-content">
          <div className="location-info">
            <h3>🏪 Visit Our Store</h3>
            <div className="address">
              <h4>📍 Address:</h4>
              <p>Sawaikar's Goan Cashews And Dry Fruits</p>
              <p>Chogm Road, Porvorim</p>
              <p>Aradi Socorro, Goa</p>
              <p>India</p>
            </div>
            <div className="hours">
              <h4>⏰ Store Hours:</h4>
              <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
              <p>Sunday: 10:00 AM - 6:00 PM</p>
            </div>
            <div className="map-actions">
              <button 
                className="map-btn primary"
                onClick={() => window.open('https://www.google.com/maps/place/Sawaikar\'s+Goan+Cashews+And+Dry+Fruits-+Best+Cashews+in+Goa/@15.5396846,73.8142919,17z/data=!3m1!4b1!4m6!3m5!1s0x3bbfc1b3b2ada4bb:0xfc78326afeb77a6c!8m2!3d15.5396846!4d73.8168668!16s%2Fg%2F11r9vh_77l?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D', '_blank')}
              >
                🗺️ View on Google Maps
              </button>
              <button 
                className="map-btn secondary"
                onClick={() => window.open('https://www.google.com/maps/dir/31.2510281,75.700112/Sawaikar\'s+Goan+Cashews+And+Dry+Fruits-+Best+Cashews+in+Goa,+Chogm+Road,+Porvorim,+Aradi+Socorro,+Goa/@23.073346,64.8246177,5z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3bbfc1b3b2ada4bb:0xfc78326afeb77a6c!2m2!1d73.8168668!2d15.5396846?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D', '_blank')}
              >
                🧭 Get Directions
              </button>
            </div>
          </div>
          <div className="location-visual">
            <div className="store-placeholder">
              <div className="store-icon">🏪</div>
              <h4>Sawaikar's Cashew Store</h4>
              <p>Premium Quality Cashews & Dry Fruits</p>
              <div className="coordinates">
                <small>📍 15.5397°N, 73.8143°E</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="contact-form">
          <form
            action="https://formspree.io/f/xjkvedgg"
            method="POST"
            className="contact-inputs"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              required
              autoComplete="name"
              onChange={handleChange}
              className="form-input"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              value={formData.email}
              required
              onChange={handleChange}
              className="form-input email-input"
            />

            <textarea
              name="message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              className="form-textarea"
            ></textarea>

            <input 
              type="submit" 
              value="SEND" 
              className="submit-btn"
            />
          </form>
        </div>
        
        {/* Direct Contact Options */}
        <div className="direct-contact">
          <h3>Get in Touch Directly</h3>
          <p>Prefer other ways to reach us? We're here to help!</p>
          <div className="contact-options">
            <button 
              className="contact-btn primary"
              onClick={() => {
                if (window.Tawk_API) {
                  window.Tawk_API.toggle();
                } else {
                  window.open('https://tawk.to/chat/68903f04a34d1b1925281fe8/1j1pncatu', '_blank');
                }
              }}
            >
              💬 Live Chat
            </button>
            <button 
              className="contact-btn secondary"
              onClick={() => window.location.href = 'mailto:sawaikarcashewstore1980@gmail.com'}
            >
              📧 Email Us
            </button>
            <a 
              href="tel:+918123456789" 
              className="contact-btn secondary"
            >
              📞 Call: +91 81234 56789
            </a>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
