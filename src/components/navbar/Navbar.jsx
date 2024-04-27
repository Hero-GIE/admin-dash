
import React from "react";
import "./Navbar.scss";

const Navbar = () => { 
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="space"></div>
        <div className="items">
            <img
              src="https://st2.depositphotos.com/3695509/5337/i/450/depositphotos_53376063-stock-photo-portrait-of-a-tattooed-male.jpg"
              alt="Profile Avatar"
              className="avatar"
             
            />
        </div>
      </div>   
    </div>
  );
};

export default Navbar;
