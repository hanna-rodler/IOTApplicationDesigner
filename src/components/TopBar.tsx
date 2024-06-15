import React from "react";
import "../styles/top-bar.css";
import { FaRegSquarePlus } from "react-icons/fa6";

const TopBar = ({ onAddTab }) => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <img src="./../../public/logo.png" className="top-bar-logo" />
        <div className="top-bar-text">IoT Configuration</div>
      </div>
      <div className="top-bar-right">
        <FaRegSquarePlus className="top-bar-add" onClick={onAddTab} />
      </div>
    </div>
  );
};

export default TopBar;
