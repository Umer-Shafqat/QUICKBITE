import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img className="logo" src={assets.logo1} alt="Logo" />
        <p>Admin Panel</p>
      </div>

      <img
        className="profile_image"
        src={assets.profile_image}
        alt="Profile"
      />
    </div>
  );
}

export default Navbar;