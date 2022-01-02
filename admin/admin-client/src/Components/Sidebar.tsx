import React, { useState } from "react";
import logo from "../Assests/cs_white_logo.png";
import { School } from "@material-ui/icons";

export const Sidebar = () => {
  const options = [
    "Students",
    "Faculty",
    "Forums",
    "Halls",
    "Facilities",
    "Roles",
    "Admins",
  ];
  const [activeOption , setActiveOption] = useState<String>("Students")
  return (
    <div className="sticky w-max bg-arma-title h-screen pt-4 pb-4">
      <div className="flex gap-2 items-center px-4 mb-4">
        <img src={logo} alt="Logo" className="w-16 h-16" />
        <span className="text-white font-semibold text-xl">A.R.M.A</span>
      </div>
      <div className="bg-[#719db6]/50 p-2 py-3 mb-4">
        <span className="text-white">SITE ADMINISTRATION</span>
      </div>
      {options.map((value) => (
        <div className={`flex mb-3 mx-2 gap-2 px-4 py-1 cursor-pointer ${value === activeOption && "bg-[#57C3D8]"} `} onClick={() => setActiveOption(value)}>
          <School className="text-white" />
          <span className="text-white font-normal ">{value}</span>
        </div>
      ))}
    </div>
  );
};
