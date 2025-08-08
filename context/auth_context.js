import { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        error: null,
      };
    case "REGISTRATION_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "REGISTRATION_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is logged in on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING" });
    
    try {
      // Simulate API call for login
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Check for valid credentials
      if (!email || !password) {
        throw new Error("Please provide both email and password");
      }
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please provide a valid email address");
      }
      
      // Password validation
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      
      // Check against registered users or demo credentials
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const demoCredentials = [
        { email: "admin@sawaikar.com", password: "admin123" },
        { email: "user@demo.com", password: "password123" },
        { email: "test@test.com", password: "test123" }
      ];
      
      // Check if user exists in registered users or demo credentials
      const existingUser = registeredUsers.find(user => user.email === email);
      const demoUser = demoCredentials.find(user => user.email === email && user.password === password);
      
      let userData;
      
      if (existingUser && existingUser.password === password) {
        // Existing registered user with correct password
        userData = {
          ...existingUser,
          lastLogin: new Date().toISOString()
        };
      } else if (demoUser) {
        // Demo user with correct credentials
        userData = {
          id: Date.now(),
          email: demoUser.email,
          name: demoUser.email.split('@')[0],
          picture: `https://ui-avatars.com/api/?name=${demoUser.email.split('@')[0]}&background=D2691E&color=fff&size=200`,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          isDemo: true
        };
      } else {
        // For security reasons, always show the same error message
        // whether the user doesn't exist or the password is wrong
        throw new Error("Invalid username/password. Please check your credentials and try again.");
      }
      
      // Save current user to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      
      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
      return { success: true };
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, confirmPassword) => {
    dispatch({ type: "SET_LOADING" });
    
    try {
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email || !password || !confirmPassword) {
        throw new Error("Please fill in all fields");
      }
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please provide a valid email address");
      }
      
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      
      // Check if user already exists
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const existingUser = registeredUsers.find(user => user.email === email);
      
      if (existingUser) {
        throw new Error("An account with this email already exists");
      }
      
      // Create new user account
      const newUser = {
        id: Date.now(),
        email: email,
        password: password, // In production, this should be hashed
        name: email.split('@')[0],
        picture: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=D2691E&color=fff&size=200`,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      // Add to registered users array
      registeredUsers.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
      
      // Registration successful - do NOT auto-login
      dispatch({ type: "REGISTRATION_SUCCESS" });
      return { 
        success: true, 
        message: "Registration completed successfully! Please login with your credentials.",
        user: {
          email: newUser.email,
          name: newUser.name
        }
      };
      
    } catch (error) {
      dispatch({ type: "REGISTRATION_FAILURE", payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const updateProfile = async (profileData) => {
    try {
      if (!state.user) {
        throw new Error("No user logged in");
      }

      console.log("Original profileData:", profileData);
      console.log("Current user:", state.user);

      // Handle profile picture field mapping
      const processedData = {
        ...profileData
      };
      
      // If profilePicture is provided, map it to picture field
      if (profileData.profilePicture) {
        processedData.picture = profileData.profilePicture;
        delete processedData.profilePicture;
      }

      console.log("Processed data:", processedData);

      // Update the user data
      const updatedUser = {
        ...state.user,
        ...processedData,
        updatedAt: new Date().toISOString()
      };

      console.log("Updated user:", updatedUser);

      // Update localStorage for current session
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // If it's a registered user (not demo), update the registeredUsers array too
      if (!state.user.isDemo) {
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        const userIndex = registeredUsers.findIndex(user => user.id === state.user.id);
        
        console.log("User index in registered users:", userIndex);
        
        if (userIndex !== -1) {
          const updatedRegisteredUser = {
            ...registeredUsers[userIndex],
            ...processedData,
            updatedAt: new Date().toISOString()
          };
          registeredUsers[userIndex] = updatedRegisteredUser;
          localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
          console.log("Updated registered user:", updatedRegisteredUser);
          console.log("All registered users:", registeredUsers);
        }
      }

      // Update the state
      dispatch({ type: "UPDATE_PROFILE", payload: processedData });
      
      return { success: true };
    } catch (error) {
      console.error("Profile update error:", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
