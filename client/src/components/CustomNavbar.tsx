import { useState } from "react";
import { useUser } from "../providers/user/UserProvider";

// import { useNavigate } from "react-router-dom";

interface NavItem {
  label: string;
  icon:string;
  path: string;
}

interface NavbarProps {
  navItems:NavItem[] | []
}

const Navbar = ({ navItems}: NavbarProps) => {
  // let nav = useNavigate();
  const {forum, faculty} = useUser()
  const [showSideNav, setshowSideNav] = useState<boolean>(false);

  return (
    <div className="flex flex-row">

        {/* side navigation bar */}
        <div>
          {
            showSideNav &&
            <div className="transition ease-in-out delay-150 h-screen w-64 bg-arma-dark-blue z-30 fixed px-4 py-6">

              <div id="ARMA-Logo" className="flex justify-between text-xl md:text-2xl font-medium pl-2 text-white cursor-pointer">
                  A.R.M.A
                  <span className="material-icons align-middle md:hidden mr-2"
                  onClick={()=>setshowSideNav(!showSideNav)}
                  >menu_open</span>
              </div>

              <div className="py-6">
                  {
                    navItems.map((item: NavItem, index: Number) => {
                      return (
                        <div className="h-12 p-3 flex justify-between items-center 
                        text-white
                        hover:bg-gray-400 hover:text-gray-800 hover:rounded-xl"  key={item.label}>  
                            <span className=" text-xl font-medium ml-1">{item.label}</span>
                            <span className="material-icons">{item.icon}</span>          
                        </div>
                      );
                    })
                  }
              </div>

            </div>
          }
        </div>

        <div className="flex-1 flex justify-between px-3 shadow-md h-20 items-center">

          {/* {ARMA Title} */}
          <div id="ARMA-Logo" className="text-xl md:text-2xl font-medium pl-2 text-arma-dark-blue cursor-pointer">
            <span className="material-icons align-middle md:hidden mr-2 " onClick={()=>setshowSideNav(!showSideNav)}>menu</span>
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
          <div id="profile-button" className="cursor-pointer">
              <span className="text-lg mr-2 align-middle ">Hi, {forum?.name ?? faculty?.name}</span>
              <span className="material-icons text-arma-dark-blue/70 md-48 align-middle text-3xl">account_circle</span>
          </div>      
        </div>
    </div>
  );
};

export default Navbar;
