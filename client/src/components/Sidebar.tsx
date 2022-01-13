import ReactDOM from "react-dom";
import { NavItem } from "./CustomNavbar";


interface SidebarProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  navItems : NavItem[] | []
}

export const Sidebar = ({ show, setShow,navItems }: SidebarProps) => {
  return show
    ? ReactDOM.createPortal(
        <div  
        onClick={() => {
            setShow(false);
          }}
        className="bg-black/20 fixed top-0  w-full h-full flex bottom-0 left-0  z-20 "
        
        >
          
          
            <div onClick={(e) => {
              e.stopPropagation();
            }}  className=" w-64  bg-white   px-4 py-6">

              <div id="ARMA-Logo" className="flex  text-arma-title justify-between text-xl md:text-2xl font-medium pl-2 cursor-pointer">
                  A.R.M.A
                  <span className="material-icons align-middle md:hidden mr-2"
                  onClick={()=>setShow(!show)}
                  >menu_open</span>
              </div>

              <div className="py-6">
                  {
                    navItems.map((item: NavItem, index: Number) => {
                      return (
                        <div className="h-12 p-3 cursor-pointer flex justify-between items-center 
                        text-black
                        hover:bg-gray-400/20 hover:text-gray-800 hover:rounded-xl"  key={item.label}>  
                            <span className=" text-xl font-medium ml-1">{item.label}</span>
                            <span className="material-icons">{item.icon}</span>          
                        </div>
                      );
                    })
                  }
              </div>

            </div>
          
        </div>,
        document.body
      )
    : null;
};

