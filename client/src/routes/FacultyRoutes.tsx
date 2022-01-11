import { useUser } from "../providers/user/UserProvider";
import Navbar from "../components/CustomNavbar";
import Footer from "../components/CustomFooter";
import { Routes, Route } from "react-router-dom";
import StudentsList from "../features/faculty/students/StudentsList";
import ForumsList from "../features/faculty/forums/ForumsList";
import RequestsView from "../features/faculty/requests_view/RequestsView";

const FacultyRoutes = () => {
  const { faculty } = useUser();
  return (
    <div>
      <div>
        <Navbar navItems={[]} userName="coding.Studio();" />
        <Routes>
        <Route path="/studentsList" element={<StudentsList/>} />
        <Route path="/forumsList" element={<ForumsList/>} />
        <Route path="/requestsView" element={<RequestsView/>} />


        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default FacultyRoutes;
