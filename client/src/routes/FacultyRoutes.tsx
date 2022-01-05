import { useUser } from "../providers/user/UserProvider";
import Navbar from "../components/CustomNavbar";
import Footer from "../components/CustomFooter";
import { Routes, Route } from "react-router-dom";

const FacultyRoutes = () => {
  const { faculty } = useUser();
  return (
    <div>
      <div>
        <Navbar navItems={[]} userName="coding.Studio();" />
        <Routes></Routes>
        <Footer />
      </div>
    </div>
  );
};

export default FacultyRoutes;
