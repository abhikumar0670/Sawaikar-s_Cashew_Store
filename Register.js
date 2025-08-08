import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "./context/auth_context";
import { Button } from "./styles/Button";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const { register, loading, error, isAuthenticated, clearError } = useAuth();
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

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (password.length === 0) return "";
    if (password.length < 6) return "weak";
    if (password.length < 8) return "medium";
    if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return "strong";
    return "medium";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    // Check password strength
    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
    
    // Check password match
    if (name === "confirmPassword" || name === "password") {
      const passwordToCheck = name === "password" ? value : newFormData.password;
      const confirmPasswordToCheck = name === "confirmPassword" ? value : newFormData.confirmPassword;
      setPasswordMatch(passwordToCheck === confirmPasswordToCheck || confirmPasswordToCheck === "");
    }
    
    // Clear error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check password match before submitting
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please check your passwords.");
      return;
    }
    
    const result = await register(formData.email, formData.password, formData.confirmPassword);

    if (result.success) {
      // Show success message
      alert(result.message);
      // Redirect to login page instead of home
      navigate("/login");
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="register-form">
          <h2>Create Account</h2>
          <p className="subtitle">Sign up for a new account</p>

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
              {formData.password && (
                <div className={`password-strength ${passwordStrength}`}>
                  Password strength: {passwordStrength === "weak" && "Weak"}
                  {passwordStrength === "medium" && "Medium"}
                  {passwordStrength === "strong" && "Strong"}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
              {formData.confirmPassword && !passwordMatch && (
                <div className="password-mismatch">
                  Passwords do not match
                </div>
              )}
            </div>

            <Button type="submit" disabled={loading} className="register-btn">
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="form-footer">
            <p>
              Already have an account?{" "}
              <NavLink to="/login" className="link">
                Sign in here
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

  .register-form {
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

  .register-btn {
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

  .password-strength {
    margin-top: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.4rem;
    font-size: 1.2rem;
    font-weight: 500;
    
    &.weak {
      background: #fed7d7;
      color: #c53030;
      border: 1px solid #feb2b2;
    }
    
    &.medium {
      background: #fefcbf;
      color: #b7791f;
      border: 1px solid #f6e05e;
    }
    
    &.strong {
      background: #c6f6d5;
      color: #22543d;
      border: 1px solid #9ae6b4;
    }
  }

  .password-mismatch {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: #fed7d7;
    color: #c53030;
    border: 1px solid #feb2b2;
    border-radius: 0.4rem;
    font-size: 1.2rem;
    font-weight: 500;
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

    .register-form {
      padding: 3rem 2rem;

      h2 {
        font-size: 2.4rem;
      }
    }
  }
`;

export default Register;

