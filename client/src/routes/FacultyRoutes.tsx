import { useUser } from "../providers/user/UserProvider";
import Navbar from "../components/CustomNavbar";
import Footer from "../components/CustomFooter";
import { Routes, Route } from "react-router-dom";
import StudentsList from "../features/faculty/students/StudentsList";

const FacultyRoutes = () => {
  const { faculty } = useUser();
  return (
    <div>
      <div>
        <Navbar navItems={[]} userName="coding.Studio();" />
        <Routes>
        <Route path="/students" element={<StudentsList/>} />
          
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default FacultyRoutes;
