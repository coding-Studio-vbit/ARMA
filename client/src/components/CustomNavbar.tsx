import { AccountCircle, PowerSettingsNewTwoTone } from "@material-ui/icons";
import { useState } from "react";
import { useUser } from "../providers/user/UserProvider";
import { Sidebar } from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export interface NavItem {
  label: string;
  icon: string;
  path: string;
}

interface NavbarProps {
  navItems: NavItem[] | [];
}

const Navbar = ({ navItems }: NavbarProps) => {
  let nav = useNavigate();
  const location = useLocation();
  const { forum, faculty, logout } = useUser();
  const [showSideNav, setshowSideNav] = useState<boolean>(false);
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="flex h-20  flex-row bg-white z-[11] fixed w-full">
      {/* side navigation bar */}

      <Sidebar
        show={showSideNav}
        setShow={setshowSideNav}
        navItems={navItems}
      />
      <div className="flex-1 flex justify-between px-3 md:px-8 lg:px-16 shadow-md  items-center">
        {/* {ARMA Title} */}
        <div
          id="ARMA-Logo"
          className="text-xl md:text-2xl font-medium pl-2 text-arma-dark-blue cursor-pointer"
        >
          {navItems.length > 0 && (
            <span
              className="material-icons align-middle md:hidden mr-2 "
              onClick={() => setshowSideNav(!showSideNav)}
            >
              menu
            </span>
          )}
          A.R.M.A
        </div>

        {/* Navigation Items */}
        <div id="Nav-Items" className="hidden  md:justify-items-center gap-10	  sm:hidden md:flex flex-row ">
          {navItems.map((item: NavItem, index: Number) => {
            return (
              <NavLink 
              end
              to={item.path}
              className={({isActive})=>isActive?'border-b-4 border-arma-blue':'border-white'}
              
                key={item.label}
              >
                <div
                className=" h-20
                  flex justify-center items-center 
                  cursor-pointer border-b-4 border-white"
              >
                <span className="material-icons !text-[1.25rem] text-arma-icon ">
                  {item.icon}
                </span>
                <span className="text-black font-poppins  ml-1">
                  {item.label}
                </span>
              </div>
              </NavLink>
            );
          })}
        </div>
        {/* Profile Button */}
        <div
          id="profile-button"
          tabIndex={1}
          onBlur={() => {
            setShowLogout(false);
          }}
          className={`cursor-pointer relative `}
          onClick={() => {
            setShowLogout(!showLogout);
          }}
        >
          <span className="text-lg mr-2 align-middle ">
            Hi, {forum?.name ?? faculty?.name}
          </span>
          <span className="material-icons text-arma-dark-blue/70 md-48 align-middle text-3xl">
            account_circle
          </span>
          <AnimatePresence initial={false} exitBeforeEnter>
            {showLogout && (
              <motion.div
                initial={{ y: "-1vh", opacity: 0 }}
                animate={{ y: "0", opacity: 1 }}
                exit={{ y: "-0.5vh", opacity: 0 }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              >
                <div className="flex flex-col rounded-[12px]  shadow-xl bg-white absolute right-0">
                  {!location.pathname.includes("profile") && (
                    <div
                      onClick={() => {
                        if (faculty) nav("/faculty/profile");
                        else if (forum) nav("/forum/profile");
                      }}
                      className=" flex cursor-pointer gap-4 justify-center  rounded-[12px] z-10 py-4 hover:bg-[#eeeeee]  px-4 "
                    >
                      <AccountCircle />
                      <span className="my-auto h-[1.29rem] ">Profile</span>
                    </div>
                  )}
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
    </div>
  );
};

export default Navbar;
