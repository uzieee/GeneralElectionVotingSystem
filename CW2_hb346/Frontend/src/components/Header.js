// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext';

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-logo">
            <span className="header-text">
              <Link to="/" className="header-text">
                <img src="./images/logo-header.png" alt="Product 1" width="120" height="120" />
              </Link>
            </span>
          </div>
          <div className="header-search">
            <div className="search-bar">
              <input type="text" placeholder="Search for Constituency" />
              <button>Search</button>
            </div>
          </div>
          <div className="header-actions">
            <div className="user-actions">
              {isLoggedIn ? (
                <>
                  
                  <button onClick={logout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/signin">Log In</Link>
                  <Link to="/signup">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
