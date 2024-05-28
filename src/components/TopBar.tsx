import React from "react";
import { FaRegSquarePlus } from "react-icons/fa6";

const TopBar = ({ onAddTab }) => {
  return (
      <div className="bg-secondary text-white font-bold text-[30px] h-[50px] flex justify-between items-center relative z-5">
      <div className="flex items-center gap-2 ml-2">
        <img src="./../../public/logo.png" className="w-[35px] h-[35px] mr-2 ml-2" />
        <div>IoT Configuration</div>
      </div>
      <div className="flex items-center mr-2">
        <FaRegSquarePlus className="w-[35px] h-[35px] cursor-pointer" onClick={onAddTab} />
      </div>
    </div>
  );
};

export default TopBar;
