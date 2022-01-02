import { AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";

interface NavItem {
  label: string;
  path: string;
}

interface NavbarProps {
  navItems:(NavItem) [] | [],
  userName: string
}

const Navbar = ({ navItems, userName }: NavbarProps) => {
  return (
    <div className="flex justify-between p-2 shadow-md ">
      <div id="ARMA-Logo" className="text-2xl font-medium pl-2 text-arma-dark-blue">
        A.R.M.A
      </div>
      <div id="Nav-Items">
        {navItems.map((item: NavItem, index: Number) => {
          return (
            <div>
              <Link to={item.path}>
                <span className="text-gray-500 font-medium">{item.label}</span>
              </Link>
            </div>
          );
        })}
      </div>
      <div id="profile-button" className="pr-2">
          <span className="text-sm pr-2">Hi, {userName}</span>
          <AccountCircle fontSize="large" className="text-arma-dark-blue/70"/>
      </div>
    </div>
  );
};

export default Navbar;
