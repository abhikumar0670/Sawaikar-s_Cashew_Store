import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "./context/auth_context";
import { Button } from "./styles/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, loading, error, isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component unmounts or when user starts typing
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Don't clear error immediately when typing - let user see the error
    // Error will be cleared when they submit the form again
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear any previous errors before attempting login
    clearError();
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate("/");
    }
    // Error will be displayed through the error state from context
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="login-form">
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to your account</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                autoCapitalize="none"
                autoComplete="email"
                spellCheck="false"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit" disabled={loading} className="login-btn">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="form-footer">
            <p>
              Don't have an account?{" "}
              <NavLink to="/register" className="link">
                Create one here
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  .container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .login-form {
    background: white;
    padding: 4rem 3rem;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    
    h2 {
      text-align: center;
      color: ${({ theme }) => theme.colors.heading};
      margin-bottom: 0.5rem;
      font-size: 3rem;
    }

    .subtitle {
      text-align: center;
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 3rem;
      font-size: 1.4rem;
    }
  }

  .form-group {
    margin-bottom: 2rem;

    label {
      display: block;
      margin-bottom: 0.8rem;
      color: ${({ theme }) => theme.colors.heading};
      font-weight: 500;
      font-size: 1.4rem;
    }

    input {
      width: 100%;
      padding: 1.2rem;
      border: 2px solid #e1e5e9;
      border-radius: 0.8rem;
      font-size: 1.4rem;
      transition: all 0.3s ease;
      background: #f8f9fa;

      &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.helper};
        background: white;
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.helper}20;
      }

      &::placeholder {
        color: #6c757d;
      }
      
      &[type="email"] {
        text-transform: none;
        autocapitalize: none;
      }
    }
  }

  .login-btn {
    width: 100%;
    padding: 1.4rem;
    font-size: 1.6rem;
    margin-bottom: 2rem;
    border-radius: 0.8rem;
    cursor: pointer;
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .error-message {
    background: #fee;
    color: #c53030;
    padding: 1.2rem;
    border-radius: 0.8rem;
    margin-bottom: 2rem;
    text-align: center;
    border: 1px solid #feb2b2;
    font-size: 1.4rem;
  }

  .form-footer {
    text-align: center;
    
    p {
      color: ${({ theme }) => theme.colors.text};
      font-size: 1.4rem;
      
      .link {
        color: ${({ theme }) => theme.colors.helper};
        text-decoration: none;
        font-weight: 500;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 2rem 0;
    
    .container {
      padding: 0 1rem;
    }
    
    .login-form {
      padding: 3rem 2rem;
      
      h2 {
        font-size: 2.4rem;
      }
    }
  }
`;

export default Login;
