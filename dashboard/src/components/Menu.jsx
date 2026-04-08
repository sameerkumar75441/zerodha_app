import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const frontendUrl = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173';
  const backendUrl = 'http://localhost:5000'; // Adjust to your backend URL
  const isAuthenticated = !!localStorage.getItem('token');

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${backendUrl}/api/auth/logout`, { withCredentials: true });
    } catch (e) {
      console.log('Logout API failed:', e);
    }
    localStorage.removeItem("token");
    window.location.href = frontendUrl + '/login'; // SPA navigate doesn't cross apps
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />

      <div className="menus">
        <ul>
          <li>
            <Link to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>

          <li>
            <Link to="/funds" onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>

          <li>
            <Link to="/apps" onClick={() => handleMenuClick(6)}>
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>

        <hr />

        {isAuthenticated && (
          <>
            <div className="profile" onClick={handleProfileClick}>
              <div className="avatar">ZU</div>
              <p className="username">USERID</p>
            </div>

            {isProfileDropdownOpen && (
              <div className="profile-dropdown">
                <p className="logout" onClick={handleLogout}>
                  Logout
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;