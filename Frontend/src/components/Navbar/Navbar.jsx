import React, { useContext, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { assets } from "../../assets/frontendImages";

const Navbar = ({ setLogin }) => {
  const { token, setToken, menu } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <nav className="nav-wrapper">
      {/* LOGO */}
      <div className="nav-logo" onClick={() => navigate("/")}>
        <img src="/image.png" alt="logo" />
      </div>

      {/* MENU */}
      <ul className="nav-links">
        <li onClick={() => navigate("/")}>Home</li>
        <li>AboutUs</li>
        <li>Contact</li>
        <li
          onClick={() =>
            menu === "students"
              ? navigate("/teachersmenu")
              : navigate("/studentsmenu")

          }
        >
          Dashboard
        </li>
      </ul>

      {/* NOTIFICATION */}
      <div className="nav-notification">
        <img src={assets.notification} alt="notification" />
        <span className="nav-dot" />
      </div>

      {/* AUTH / PROFILE */}
      <div className="nav-auth">
        {!token ? (
          <button className="nav-auth-btn" onClick={() => setLogin(true)}>
            SignUp
          </button>
        ) : (
          <div
            className="nav-profile"
            onClick={() => setShowMenu(!showMenu)}
          >
            <img src={assets.profile_icon} alt="profile" />

            {showMenu && (
  <ul className="nav-profile-menu">
    <li onClick={() => navigate("/profile")}>
      <span>Profile</span>
    </li>
    <li onClick={logout}>
      <span>Logout</span>
    </li>
  </ul>
)}

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
