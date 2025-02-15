import React from 'react';
import { getToken } from '../services/Auth';
import { jwtDecode } from 'jwt-decode';
import './WelcomeMessage.css';

const WelcomeMessage = () => {
    
  const capitalize = (str) => {
    if (!str) return '';
    
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

    const getUserInfo = () => {
    const token = getToken();
    
    if (!token) {
      return null;
    }
    
    try {
      const decoded = jwtDecode(token);
      
      return {
        name: capitalize(decoded.userName),
        lastName: capitalize(decoded.userLastName)
      };
    } catch (error) {
      console.error("Error decodificando el token:", error);
      return null;
    }
  };
  
  const userInfo = getUserInfo();
  
  if (!userInfo) {
    return null;
  }
  
  return (
    <div className="welcome-container">
      <p className="welcome-message">
        Welcome {userInfo.name} {userInfo.lastName}!
      </p>
    </div>
  );
};

export default WelcomeMessage;