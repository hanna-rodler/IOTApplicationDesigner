import React from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const TopBar = ({ onAddTab, addButton }) => {
          return (
            <div className="bg-secondary text-white font-bold text-[30px] h-topBar flex justify-between items-center relative z-5">
              <NavLink className="flex items-center gap-2 ml-2"  to="/">
                <img src="./../../public/logo.png" className="w-[35px] h-[35px] mr-2 ml-2" />
                <div>IoT Configurator</div>
              </NavLink>
              <div className="flex items-center mr-2">
                  {addButton && (
                  <FaRegSquarePlus className="w-[35px] h-[35px] cursor-pointer" onClick={onAddTab} />
                  )}
          </div>
            </div>
          );
};

export default TopBar;
