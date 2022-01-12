import { useUser } from "../providers/user/UserProvider";
import Navbar from "../components/CustomNavbar";
import Footer from "../components/CustomFooter";
import { Routes, Route } from "react-router-dom";
import StudentsList from "../features/faculty/students/StudentsList";
import ForumsList from "../features/faculty/forums/ForumsList";
import RequestsView from "../features/faculty/requests_view/RequestsView";
import FacultyDashBoard from "../features/faculty/dashboard/facultyDashBoard";

const FacultyRoutes = () => {
  const { faculty } = useUser();
  const navItems=[
    {  label:'Dashboard',icon:"home",path:'/'},
    {  label:'Forums',icon:"group",path:'/' },
    {  label:'Students',icon:"person",path:'/' },        
];
  return (
    <div>
      <div>
        <Navbar navItems={navItems}/>
        <Routes>
        <Route path="/studentsList" element={<StudentsList/>} />
        <Route path="/forumsList" element={<ForumsList/>} />
        <Route path="/" element={<FacultyDashBoard/>} />
        <Route path="/requestsView" element={<RequestsView/>} />


        </Routes>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default FacultyRoutes;
