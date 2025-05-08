import React, { useState, useEffect, useRef, useContext } from "react";
import "./App.css";
import { IoMenu } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "./stateContext/stateContext";

export const Navbar = () => {
  const location = useLocation();
  const isNotFrontPage = location.pathname !== "/";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { authState, setAuthState, logout } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    document.cookie = "accessToken=; Max-Age=0"; // Clear token
    setAuthState({ id: null, email: null, status: false });
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`navbar ${isNotFrontPage ? "shop-navbar" : ""}`}>
      <IoMenu className="icon" />
      <h2>MYSHOES</h2>

      <div className="right">
        <div className="dropdown" ref={dropdownRef}>
          <IoPersonOutline className="icon" onClick={toggleDropdown} />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {!authState.status ? (
                <>
                  <Link to="/login" onClick={() => setIsDropdownOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setIsDropdownOpen(false)}>
                    Register
                  </Link>
                </>
              ) : (
                <button onClick={handleLogout}>Logout</button>
              )}
            </div>
          )}
        </div>
        <IoSearchOutline className="icon" />
        <Link to="/cart">
          <IoCartOutline className="icon" />
        </Link>
      </div>
    </div>
  );
};
