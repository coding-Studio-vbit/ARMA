import { PowerSettingsNewTwoTone } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useUser } from "../providers/user/UserProvider";
import { Sidebar } from "./Sidebar";

// import { useNavigate } from "react-router-dom";

export interface NavItem {
  label: string;
  icon:string;
  path: string;
}

interface NavbarProps {
  navItems:NavItem[] | []
}

const Navbar = ({ navItems}: NavbarProps) => {
  // let nav = useNavigate();
  const {forum, faculty,logout} = useUser()
  const [showSideNav, setshowSideNav] = useState<boolean>(false);
  const [showLogout,setShowLogout ] = useState(false)

  return (
    <div className="flex flex-row bg-white z-[11] fixed w-full">

        {/* side navigation bar */}
        
        {showSideNav && <Sidebar show={showSideNav} setShow={setshowSideNav} navItems={navItems}  />}
        <div className="flex-1 flex justify-between px-3 md:px-8 lg:px-16 shadow-md h-20 items-center">

          {/* {ARMA Title} */}
          <div id="ARMA-Logo" className="text-xl md:text-2xl font-medium pl-2 text-arma-dark-blue cursor-pointer">
            {
              navItems.length > 0 && <span className="material-icons align-middle md:hidden mr-2 " onClick={()=>setshowSideNav(!showSideNav)}>menu</span>
            }
            A.R.M.A
          </div>

          {/* Navigation Items */}
          <div id="Nav-Items" className="hidden sm:hidden md:flex flex-row ">
            {
              navItems.map((item: NavItem, index: Number) => {
                return (
                  <div key={item.label}  className="w-36 mx-0 h-20 
                  flex justify-center items-center 
                  cursor-pointer border-b-4 hover:border-arma-blue border-white">  
                      <span className="material-icons text-arma-icon ">{item.icon}</span>           
                      <span className="text-black text-xl font-medium ml-1">{item.label}</span>            
                  </div>
                );
              })
            }
          </div>
          {/* Profile Button */}
          <div id="profile-button" 
          tabIndex={1}
          onBlur={()=>{
            
            setShowLogout(false)
          }}
          className={`cursor-pointer relative `} onClick={()=>{
            
            setShowLogout(!showLogout)
          }} 
             >
              <span  className="text-lg mr-2 align-middle ">Hi, {forum?.name ?? faculty?.name}</span>
              <span   className="material-icons text-arma-dark-blue/70 md-48 align-middle text-3xl">account_circle</span>
              {
                showLogout && (
                  <div onClick={()=>{
                    logout()
                    
                  }}  className="absolute flex cursor-pointer gap-4 justify-center   bg-white z-10 py-4 hover:bg-[#eeeeee] right-0 px-4 rounded-[12px] top-[3rem] shadow-xl" >
                <PowerSettingsNewTwoTone  />
               <span className="my-auto h-[1.29rem] " >LOGOUT</span>
              </div>
                )
              }
          </div>      
        </div>
    </div>
  );
};

export default Navbar;
