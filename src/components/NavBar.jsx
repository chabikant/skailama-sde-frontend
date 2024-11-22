import React from "react";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

  const navigate = useNavigate();
  
  return (
    <div className="header">
      <div className="company-logo">
        <img
          src="/QuesLogo 1.png"
          alt="icon"
          style={{ height: "30px", width: "120px" }}
        />
      </div>
      <div className="notification-setting">
        <IoMdSettings
          alt="settings"
          style={{ height: "2.3rem", width: "2.3rem" }}
        />

        <img
          src="/notificationsicon.svg"
          alt="notification"
          style={{ height: "2.3rem", width: "2.3rem" }}
        />
        <IoLogOutOutline
          style={{
            marginLeft: "auto",
            fontSize: "36px",
            cursor: "pointer",

          }}
          onClick={() => {
            localStorage.removeItem("skailamaAppToken");
            navigate("/login");
          }}
        />
      </div>
    </div>
  );
};

export default NavBar;
