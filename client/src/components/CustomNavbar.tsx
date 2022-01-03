import { useNavigate } from "react-router-dom";

interface NavItem {
  label: string;
  icon:string;
  path: string;
}

interface NavbarProps {
  navItems:NavItem[] | [],
  userName: string
}

const Navbar = ({ navItems, userName }: NavbarProps) => {
  let nav = useNavigate();
  return (
    <div className="flex justify-between px-3 shadow-md h-20 items-center">
      {/* {ARMA Title} */}
      <div id="ARMA-Logo" className="text-2xl font-medium pl-2 text-arma-dark-blue cursor-pointer">
        A.R.M.A
      </div>
      {/* Navigation Items */}
      <div id="Nav-Items" className="hidden sm:hidden md:flex flex-row ">
        {
          navItems.map((item: NavItem, index: Number) => {
            return (
              <div key={item.label} onClick={()=>nav(item.path)} className="w-36 mx-0 h-20 
              flex justify-center items-center 
              cursor-pointer hover:border-b-4 border-arma-blue">  
                  <span className="material-icons text-arma-icon ">{item.icon}</span>           
                  <span className="text-black text-xl font-medium ml-1">{item.label}</span>            
              </div>
            );
          })
        }
      </div>
      {/* Profile Button */}
      <div id="profile-button" className="cursor-pointer">
          <span className="text-lg mr-2 align-middle ">Hi, {userName}</span>
          <span className="material-icons text-arma-dark-blue/70 md-48 align-middle text-3xl">account_circle</span>
      </div>
    </div>
  );
};

export default Navbar;
