

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContent } from "../context/AppContext";

function Navbar() {
  const { isLoggedin, logout, loading } = useContext(AppContent);

   
  if (loading) return null;

  return (
    <nav className="navbar navbar-expand-lg border-bottom bg-white">
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img src="media/image/logo.svg" width="120" />
        </Link>

        <ul className="navbar-nav ms-auto">
          {isLoggedin ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <button
                  onClick={logout}
                  className="btn btn-danger btn-sm"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login / Signup</Link>
            </li>
          )}

          <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/product">Product</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/pricing">Pricing</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/support">Support</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

