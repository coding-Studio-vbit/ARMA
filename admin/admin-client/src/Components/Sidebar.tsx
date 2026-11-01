import React, { FC, useState } from "react";
import logo from "../Assests/cs_white_logo.png";
import { School, Close , Group, AccountBalance, Router, AccountTree,Security, FaceRounded } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: FC<SidebarProps> = ({ showSidebar, setShowSidebar }) => {
  let navigate = useNavigate();
  const options = [
    "Students",
    "Faculty",
    "Forums",
    "Halls",
    "Facilities",
    "Roles",
    "Admins",
  ];

  let active = localStorage.getItem("Active");
  const [activeOption, setActiveOption] = useState<String>(active ? active : "Students");

  const handleSelect = (value: string) => {
    setActiveOption(value);
    localStorage.setItem("Active", value);
    navigate(`/${value}/`);
    if (showSidebar) setShowSidebar(false);
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {showSidebar && (
        <div
          className="fixed inset-0 z-40 bg-black/40 sm:hidden transition-opacity"
          onClick={() => setShowSidebar(false)}
          aria-hidden="true"
        />
      )}

      {/* Navigation Sidebar */}
      <nav
        aria-label="Admin Navigation"
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-arma-title h-screen pt-4 pb-4 select-none transition-transform duration-200 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        } sm:block overflow-y-auto shadow-sm`}
      >
        <div className="sm:hidden flex justify-end mr-3 mb-2">
          <Close
            className="text-white !text-3xl !cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
            onClick={() => setShowSidebar(false)}
            aria-label="Close Sidebar"
            role="button"
            tabIndex={0}
          />
        </div>
        <div className="flex gap-3 items-center px-5 mb-5">
          <img src={logo} alt="ARMA Logo" className="w-12 h-12 object-contain" />
          <div>
            <span className="text-white font-semibold text-lg tracking-wide block">A.R.M.A</span>
            <span className="text-white/60 text-xs block">Governance Portal</span>
          </div>
        </div>
        <div className="bg-white/10 px-5 py-2 mb-4">
          <span className="text-white/70 text-xs font-medium tracking-normal">Site administration</span>
        </div>
        <div className="space-y-1 px-3">
          {options.map((value) => {
            const isActive = value === activeOption;
            return (
              <div
                key={value}
                role="button"
                tabIndex={0}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md cursor-pointer transition-colors text-sm ${
                  isActive
                    ? "bg-white/20 text-white font-medium shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                } focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none`}
                onClick={() => handleSelect(value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(value);
                  }
                }}
              >
                {value === "Students" && <School className="!text-xl" />}
                {value === "Faculty" && <FaceRounded className="!text-xl" />}
                {value === "Forums" && <Group className="!text-xl" />}
                {value === "Halls" && <AccountBalance className="!text-xl" />}
                {value === "Facilities" && <Router className="!text-xl" />}
                {value === "Roles" && <AccountTree className="!text-xl" />}
                {value === "Admins" && <Security className="!text-xl" />}
                <span>{value}</span>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
};