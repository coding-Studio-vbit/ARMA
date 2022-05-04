import React, { FC, useState } from "react";
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
  const logout = () => {
    console.log("logout");
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="border-b-[0.3px] w-full border-[#898888] flex items-center sm:justify-end justify-between p-3 ">
      <Menu
        className="sm:!hidden cursor-pointer"
        onClick={() => setShowSidebar(!showSidebar)}
      />
      <div className="flex gap-2 items-center">
        <span>{user?.name}</span>
        <div
          onClick={() => {
            setShowLogout(!showLogout);
          }}
        >
          <AccountCircle className="!w-10 !h-10" />
        </div>
        <AnimatePresence initial={false} exitBeforeEnter>
          {showLogout && (
            <motion.div
              initial={{ y: "-1vh", opacity: 0 }}
              animate={{ y: "3.5vh", opacity: 1 }}
              exit={{ y: "-0.5vh", opacity: 0 }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            >
              <div className="flex flex-col rounded-[12px]  shadow-xl bg-white  absolute right-[-0.5rem]">
                <div
                  onClick={() => {
                    logout();
                  }}
                  className=" flex cursor-pointer gap-4 justify-center rounded-[12px]  z-10 py-4 hover:bg-[#eeeeee]  px-4 "
                >
                  <PowerSettingsNewTwoTone />
                  <span className="my-auto h-[1.29rem] ">Logout</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
