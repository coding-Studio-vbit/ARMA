import React, { FC, useState, useEffect, useRef } from "react";
import {
  AccountCircle,
  Menu,
  PowerSettingsNewTwoTone,
} from "@material-ui/icons";
import { useUser } from "../Provider/userProvider";
import { motion, AnimatePresence } from "framer-motion";

interface TopnavProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Topnav: FC<TopnavProps> = ({ showSidebar, setShowSidebar }) => {
  const { user } = useUser();
  const [showLogout, setShowLogout] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showLogout) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowLogout(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowLogout(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogout]);

  const logout = () => {
    console.log("logout");
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="border-b w-full border-gray-200 bg-white flex items-center sm:justify-end justify-between px-6 py-3.5 shadow-xs">
      <Menu
        className="sm:!hidden cursor-pointer"
        onClick={() => setShowSidebar(!showSidebar)}
        aria-label="Toggle Navigation Sidebar"
      />
      <div className="flex gap-3 items-center relative" ref={dropdownRef}>
        <span className="text-sm font-medium text-gray-700">{user?.name}</span>
        <button
          className="focus-visible:ring-2 focus-visible:ring-sky-500 rounded-full cursor-pointer bg-transparent border-0 p-0"
          onClick={() => {
            setShowLogout(!showLogout);
          }}
          aria-haspopup="true"
          aria-expanded={showLogout}
          aria-label="User profile and menu"
        >
          <AccountCircle className="!w-9 !h-9 text-gray-500 hover:text-gray-700 transition-colors" />
        </button>
        <AnimatePresence initial={false} exitBeforeEnter>
          {showLogout && (
            <motion.div
              initial={{ y: "-1vh", opacity: 0 }}
              animate={{ y: "3.5vh", opacity: 1 }}
              exit={{ y: "-0.5vh", opacity: 0 }}
              transition={{ ease: "easeOut", duration: 0.1 }}
              className="absolute right-0 top-6 z-50"
            >
              <div className="flex flex-col rounded-lg shadow-lg border border-gray-200 bg-white min-w-[140px] py-1">
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors text-left bg-transparent border-0 cursor-pointer"
                  role="menuitem"
                >
                  <PowerSettingsNewTwoTone className="!text-lg text-gray-500" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};