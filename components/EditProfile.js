import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiX, FiCamera, FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { useAuth } from "../context/auth_context";

const EditProfile = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    profilePicture: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
        profilePicture: user.picture || ""
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profilePicture: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Use the auth context's updateProfile function
      const result = await updateProfile(formData);
      
      if (result.success) {
        setMessage("Profile updated successfully!");
        setTimeout(() => {
          onClose();
          setMessage("");
        }, 1500);
      } else {
        setMessage(result.error || "Failed to update profile. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Modal>
        <ModalHeader>
          <h2>Edit Profile</h2>
          <CloseButton onClick={onClose}>
            <FiX />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          <form onSubmit={handleSubmit}>
            {/* Profile Picture Section */}
            <ProfilePictureSection>
              <div className="profile-pic-container">
                <img
                  src={formData.profilePicture || `https://ui-avatars.com/api/?name=${formData.name}&background=D2691E&color=fff&size=200`}
                  alt="Profile"
                  className="profile-pic"
                />
                <label className="change-pic-btn" htmlFor="profile-pic-input">
                  <FiCamera />
                  <span>Change Photo</span>
                </label>
                <input
                  type="file"
                  id="profile-pic-input"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
            </ProfilePictureSection>

            {/* Form Fields */}
            <FormGrid>
              <FormGroup>
                <label>
                  <FiUser />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>
                  <FiMail />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>
                  <FiPhone />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </FormGroup>

              <FormGroup className="full-width">
                <label>
                  <FiMapPin />
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your full address"
                  rows="3"
                />
              </FormGroup>

              <FormGroup>
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                />
              </FormGroup>

              <FormGroup>
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter your state"
                />
              </FormGroup>

              <FormGroup>
                <label>Pin Code</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Enter pin code"
                />
              </FormGroup>
            </FormGrid>

            {message && (
              <Message className={message.includes("success") ? "success" : "error"}>
                {message}
              </Message>
            )}

            <ButtonGroup>
              <CancelButton type="button" onClick={onClose}>
                Cancel
              </CancelButton>
              <SaveButton type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </SaveButton>
            </ButtonGroup>
          </form>
        </ModalContent>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  padding: 2rem;
`;

const Modal = styled.div`
  background: white;
  border-radius: 1.2rem;
  width: 100%;
  max-width: 60rem;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem;
  border-bottom: 1px solid #eee;
  background: ${({ theme }) => theme.colors.helper};
  color: white;
  border-radius: 1.2rem 1.2rem 0 0;

  h2 {
    margin: 0;
    font-size: 2.4rem;
    font-weight: 600;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 2.4rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.4rem;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ModalContent = styled.div`
  padding: 3rem;
`;

const ProfilePictureSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;

  .profile-pic-container {
    position: relative;
    display: inline-block;

    .profile-pic {
      width: 12rem;
      height: 12rem;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid ${({ theme }) => theme.colors.helper};
    }

    .change-pic-btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background: ${({ theme }) => theme.colors.helper};
      color: white;
      border: none;
      border-radius: 50%;
      width: 4rem;
      height: 4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.4rem;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

      &:hover {
        background: ${({ theme }) => theme.colors.btn};
        transform: scale(1.1);
      }

      span {
        font-size: 0.8rem;
        margin-top: 0.2rem;
      }
    }
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  &.full-width {
    grid-column: 1 / -1;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.heading};
    font-size: 1.4rem;

    svg {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.helper};
    }
  }

  input, textarea {
    padding: 1.2rem 1.6rem;
    border: 2px solid #e1e5e9;
    border-radius: 0.8rem;
    font-size: 1.4rem;
    transition: all 0.3s ease;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.helper};
      box-shadow: 0 0 0 3px rgba(210, 105, 30, 0.1);
    }

    &::placeholder {
      color: #999;
    }
  }

  textarea {
    resize: vertical;
    min-height: 8rem;
  }
`;

const Message = styled.div`
  padding: 1rem 1.5rem;
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  font-weight: 500;

  &.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  &.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background: #6c757d;
  color: white;

  &:hover:not(:disabled) {
    background: #5a6268;
  }
`;

const SaveButton = styled(Button)`
  background: ${({ theme }) => theme.colors.helper};
  color: white;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.btn};
  }
`;

export default EditProfile;
