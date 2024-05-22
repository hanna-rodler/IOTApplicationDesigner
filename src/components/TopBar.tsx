import React from "react";
import "../styles/top-bar.css";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <img src="./../../public/logo.png" className="top-bar-logo" />
        <div className="top-bar-text">IoT Configuration</div>
      </div>
      <div className="top-bar-right">
        <img src="./../../public/add-new.png" className="top-bar-add" />
      </div>
    </div>
  );
};

export default TopBar;
