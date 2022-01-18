import { NavItem } from "./CustomNavbar";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: NavItem[] | [];
}

export const Sidebar = ({ show, setShow, navItems }: SidebarProps) => {
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
    exit: { opacity: 0 },
  };
  const sidebar = {
    visible: { x: "0" },
    hidden: { x: "-100vw" },
    exit: { x: "-100vw" },
  };
  const navigate = useNavigate()
  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {show && (
        <motion.div
        key={"kdbkjd.kdj"}
        variants={variants}
        animate="visible"
        transition={{duration:0.2}}
        exit="exit"
        initial="hidden"
      >
        <div
          onClick={() => {
            setShow(false);
          }}
          className="bg-black/20 fixed top-0  w-full h-screen bottom-0  z-20 "
        >
          <motion.div
            key={"dhjbuk"}
            variants={sidebar}
            animate="visible"
            exit="exit"
            transition={{ type: "tween",duration:0.25 ,ease:'easeOut'}}

            initial="hidden"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className=" w-64  bg-white h-screen  px-4 py-6  "
            >
              <div
                id="ARMA-Logo"
                className="flex  text-arma-title justify-between text-xl md:text-2xl font-medium pl-2 cursor-pointer"
              >
                A.R.M.A
                <span
                  className="material-icons align-middle md:hidden mr-2"
                  onClick={() => setShow(!show)}
                >
                  menu_open
                </span>
              </div>

              <div className="py-6">
                {navItems.map((item: NavItem, index: Number) => {
                  return (
                    <div
                      className="h-12 p-3 cursor-pointer flex justify-between items-center 
                        text-black
                        hover:bg-gray-400/20 hover:text-gray-800 hover:rounded-xl"
                      key={item.label}
                      onClick={()=>{
                        navigate(item.path)
                        setShow(false)
                      }}
                    >
                      <span className=" text-xl font-medium ml-1">
                        {item.label}
                      </span>
                      <span className="material-icons">{item.icon}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
        </motion.div>

      )}
    </AnimatePresence>
  );
};
